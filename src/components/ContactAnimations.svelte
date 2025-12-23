<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const animatedElements = document.querySelectorAll(
			'.animate-slide-left, .animate-slide-right, .animate-slide-up'
		);

		if (animatedElements.length === 0) return;

		// Add 'will-animate' class to prepare elements
		animatedElements.forEach(element => {
			element.classList.add('will-animate');
		});

		// Small delay to let the browser apply the hidden state
		setTimeout(() => {
			animatedElements.forEach((element, index) => {
				// Stagger animations
				setTimeout(() => {
					element.classList.add('active');
				}, index * 100);
			});
		}, 50);
	});
</script>
