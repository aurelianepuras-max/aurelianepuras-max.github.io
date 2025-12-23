<script>
  import { onMount } from 'svelte';

  let visible = false;

  onMount(() => {
    const handleScroll = () => {
      visible = window.scrollY > 300;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

{#if visible}
  <button
    on:click={scrollToTop}
    class="fixed bottom-8 right-8 w-14 h-14 bg-olive hover:bg-olive-deep dark:bg-olive-light dark:hover:bg-olive text-ivory-light rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 flex items-center justify-center"
    aria-label="Înapoi sus"
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  </button>
{/if}
