<script>
  export let photos = [];

  let selectedPhoto = null;
  let selectedIndex = -1;

  function openLightbox(photo, index) {
    selectedPhoto = photo;
    selectedIndex = index;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    selectedPhoto = null;
    selectedIndex = -1;
    document.body.style.overflow = 'auto';
  }

  function nextPhoto() {
    if (selectedIndex < photos.length - 1) {
      selectedIndex++;
      selectedPhoto = photos[selectedIndex];
    }
  }

  function prevPhoto() {
    if (selectedIndex > 0) {
      selectedIndex--;
      selectedPhoto = photos[selectedIndex];
    }
  }

  function handleKeydown(event) {
    if (!selectedPhoto) return;

    if (event.key === 'Escape') {
      closeLightbox();
    } else if (event.key === 'ArrowRight') {
      nextPhoto();
    } else if (event.key === 'ArrowLeft') {
      prevPhoto();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
  {#each photos as photo, index}
    <button
      on:click={() => openLightbox(photo, index)}
      class="break-inside-avoid block w-full group cursor-pointer"
    >
      <div class="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
        <img
          src={photo.image}
          alt={photo.title}
          class="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
      </div>
      {#if photo.title}
        <p class="mt-2 text-sm text-text-secondary-light dark:text-text-secondary-dark text-center">{photo.title}</p>
      {/if}
    </button>
  {/each}
</div>

{#if selectedPhoto}
  <div
    class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
    on:click={closeLightbox}
  >
    <button
      on:click={closeLightbox}
      class="absolute top-4 right-4 p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors z-50"
      aria-label="Închide"
    >
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    {#if selectedIndex > 0}
      <button
        on:click={(e) => { e.stopPropagation(); prevPhoto(); }}
        class="absolute left-4 p-3 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors z-50"
        aria-label="Anterior"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    {/if}

    {#if selectedIndex < photos.length - 1}
      <button
        on:click={(e) => { e.stopPropagation(); nextPhoto(); }}
        class="absolute right-4 p-3 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors z-50"
        aria-label="Următor"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    {/if}

    <div
      class="max-w-7xl max-h-[90vh] mx-4"
      on:click={(e) => e.stopPropagation()}
    >
      <img
        src={selectedPhoto.image}
        alt={selectedPhoto.title}
        class="max-w-full max-h-[80vh] object-contain rounded-2xl"
      />
      {#if selectedPhoto.title || selectedPhoto.description}
        <div class="mt-4 text-center text-white">
          {#if selectedPhoto.title}
            <h3 class="text-2xl font-serif font-bold mb-2">{selectedPhoto.title}</h3>
          {/if}
          {#if selectedPhoto.description}
            <p class="text-gray-300">{selectedPhoto.description}</p>
          {/if}
        </div>
      {/if}
    </div>
  </div>
{/if}
