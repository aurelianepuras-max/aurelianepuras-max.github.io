<script lang="ts">
	import { onMount } from 'svelte';

	const EMAILJS_CONFIG = {
		PUBLIC_KEY: 'lZidu1JoU7KP7T3Kz',
		SERVICE_ID: 'service_22tebfa',
		TEMPLATE_ID: 'template_0d9uihj'
	};

	onMount(() => {
		loadEmailJS();
	});

	function loadEmailJS() {
		const script = document.createElement('script');
		script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
		script.onload = () => {
			if (window.emailjs) {
				window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
				initContactForm();
			}
		};
		document.head.appendChild(script);
	}

	function sanitizeInput(input: string): string {
		const stripped = input.replace(/<[^>]*>/g, '');
		const escaped = stripped
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#x27;')
			.replace(/\//g, '&#x2F;');
		return escaped;
	}

	function checkRateLimit(formMessage: HTMLElement | null): boolean {
		const RATE_LIMIT_KEY = 'contact_form_last_submit';
		const RATE_LIMIT_DURATION = 60000;

		const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
		if (lastSubmit) {
			const timeSinceLastSubmit = Date.now() - parseInt(lastSubmit);
			if (timeSinceLastSubmit < RATE_LIMIT_DURATION) {
				const remainingSeconds = Math.ceil((RATE_LIMIT_DURATION - timeSinceLastSubmit) / 1000);
				if (formMessage) {
					formMessage.textContent = `Vă rugăm să așteptați ${remainingSeconds} secunde înainte de a trimite un alt mesaj.`;
					formMessage.className = 'p-4 rounded-xl bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
					formMessage.classList.remove('hidden');
				}
				return false;
			}
		}
		return true;
	}

	function setLoadingState(isLoading: boolean, submitBtn: HTMLButtonElement | null, submitText: HTMLElement | null, submitIcon: HTMLElement | null) {
		if (submitBtn && submitText && submitIcon) {
			submitBtn.disabled = isLoading;
			if (isLoading) {
				submitText.textContent = 'Se trimite...';
				submitIcon.innerHTML = `
					<svg class="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
				`;
			} else {
				submitText.textContent = 'Trimite mesajul';
				submitIcon.innerHTML = `
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
					</svg>
				`;
			}
		}
	}

	function initContactForm() {
		const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;
		if (!contactForm) return;

		const nameInput = document.getElementById('name') as HTMLInputElement | null;
		const emailInput = document.getElementById('email') as HTMLInputElement | null;
		const subjectInput = document.getElementById('subject') as HTMLInputElement | null;
		const messageTextarea = document.getElementById('message') as HTMLTextAreaElement | null;
		const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement | null;
		const submitText = document.getElementById('submit-text') as HTMLElement | null;
		const submitIcon = document.getElementById('submit-icon') as HTMLElement | null;
		const formMessage = document.getElementById('form-message') as HTMLElement | null;

		contactForm.addEventListener('submit', async (e) => {
			e.preventDefault();

			if (!checkRateLimit(formMessage)) {
				return;
			}

			if (!nameInput || !emailInput || !subjectInput || !messageTextarea) {
				return;
			}

			const name = sanitizeInput(nameInput.value.trim());
			const email = sanitizeInput(emailInput.value.trim());
			const subject = sanitizeInput(subjectInput.value.trim());
			const message = sanitizeInput(messageTextarea.value.trim());

			if (!name || !email || !subject || !message) {
				if (formMessage) {
					formMessage.textContent = 'Vă rugăm să completați toate câmpurile.';
					formMessage.className = 'p-4 rounded-xl bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
					formMessage.classList.remove('hidden');
				}
				return;
			}

			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				if (formMessage) {
					formMessage.textContent = 'Vă rugăm să introduceți o adresă de email validă.';
					formMessage.className = 'p-4 rounded-xl bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
					formMessage.classList.remove('hidden');
				}
				return;
			}

			setLoadingState(true, submitBtn, submitText, submitIcon);

			if (formMessage) {
				formMessage.classList.add('hidden');
			}

			try {
				if (!window.emailjs) {
					throw new Error('EmailJS not loaded');
				}

				const templateParams = {
					name: name,
					email: email,
					title: subject,
					message: message
				};

				await window.emailjs.send(
					EMAILJS_CONFIG.SERVICE_ID,
					EMAILJS_CONFIG.TEMPLATE_ID,
					templateParams
				);

				localStorage.setItem('contact_form_last_submit', Date.now().toString());

				if (formMessage) {
					formMessage.textContent = 'Mulțumesc pentru mesaj! Vă voi răspunde în cel mai scurt timp.';
					formMessage.className = 'p-4 rounded-xl bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
					formMessage.classList.remove('hidden');
				}

				contactForm.reset();
			} catch (error) {
				console.error('Form submission error:', error);
				if (formMessage) {
					formMessage.textContent = 'A apărut o eroare. Vă rugăm să încercați din nou.';
					formMessage.className = 'p-4 rounded-xl bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
					formMessage.classList.remove('hidden');
				}
			} finally {
				setLoadingState(false, submitBtn, submitText, submitIcon);
			}
		});
	}
</script>
