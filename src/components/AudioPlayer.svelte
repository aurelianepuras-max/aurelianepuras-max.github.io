<script>
  import { onMount } from 'svelte';

  export let tracks = [];

  let currentTrackIndex = 0;
  let audio;
  let isPlaying = false;
  let currentTime = 0;
  let duration = 0;
  let volume = 1;

  $: currentTrack = tracks[currentTrackIndex];

  onMount(() => {
    audio = new Audio();
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', () => {
      duration = audio.duration;
    });
    audio.addEventListener('ended', playNext);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('ended', playNext);
      audio.pause();
    };
  });

  function updateProgress() {
    currentTime = audio.currentTime;
  }

  function togglePlay() {
    if (isPlaying) {
      audio.pause();
    } else {
      if (audio.src !== currentTrack.audioUrl) {
        audio.src = currentTrack.audioUrl;
      }
      audio.play();
    }
    isPlaying = !isPlaying;
  }

  function playTrack(index) {
    currentTrackIndex = index;
    audio.src = tracks[index].audioUrl;
    audio.play();
    isPlaying = true;
  }

  function playNext() {
    if (currentTrackIndex < tracks.length - 1) {
      playTrack(currentTrackIndex + 1);
    } else {
      playTrack(0);
    }
  }

  function playPrevious() {
    if (currentTrackIndex > 0) {
      playTrack(currentTrackIndex - 1);
    } else {
      playTrack(tracks.length - 1);
    }
  }

  function seek(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = x / rect.width;
    audio.currentTime = percentage * duration;
  }

  function changeVolume(event) {
    volume = parseFloat(event.target.value);
    audio.volume = volume;
  }

  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
</script>

<div class="max-w-4xl mx-auto bg-ivory-light dark:bg-dark-secondary rounded-2xl shadow-xl overflow-hidden border border-crem-taupe dark:border-dark-border">
  <div class="md:flex">
    <div class="md:w-1/3 bg-gradient-to-br from-ivory to-crem dark:from-dark-primary dark:to-dark-elevated flex items-center justify-center p-8">
      {#if currentTrack?.coverArt}
        <img src={currentTrack.coverArt} alt={currentTrack.title} class="w-full rounded-2xl shadow-lg object-cover" />
      {:else}
        <div class="w-full rounded-2xl shadow-lg bg-gradient-to-br from-ivory to-crem dark:from-dark-primary dark:to-dark-elevated flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark">
          <span class="text-2xl">🎵</span>
        </div>
      {/if}
    </div>

    <div class="md:w-2/3 p-8">
      <div class="mb-6">
        <h3 class="text-2xl font-serif font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
          {currentTrack?.title || 'Selectează o piesă'}
        </h3>
        <p class="text-text-secondary-light dark:text-text-secondary-dark">
          {currentTrack?.artist || 'Aurelian Epuraș'}
          {#if currentTrack?.album}
            <span class="mx-2">•</span>
            {currentTrack.album}
          {/if}
        </p>
      </div>

      <div class="mb-6">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-sm text-text-secondary-light dark:text-text-secondary-dark">{formatTime(currentTime)}</span>
          <button
            on:click={seek}
            class="flex-1 h-2 bg-crem dark:bg-dark-primary rounded-full overflow-hidden cursor-pointer"
          >
            <div
              class="h-full bg-bronze-gold transition-all"
              style="width: {duration ? (currentTime / duration) * 100 : 0}%"
            ></div>
          </button>
          <span class="text-sm text-text-secondary-light dark:text-text-secondary-dark">{formatTime(duration)}</span>
        </div>
      </div>

      <div class="flex items-center justify-center mb-6 gap-4">
        <button
          on:click={playPrevious}
          class="p-3 rounded-full hover:bg-ivory dark:hover:bg-dark-primary transition-colors text-text-primary-light dark:text-text-primary-dark"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          on:click={togglePlay}
          class="p-4 bg-olive hover:bg-olive-deep dark:bg-olive-light dark:hover:bg-olive text-ivory-light rounded-full hover:shadow-lg transition-all"
        >
          {#if isPlaying}
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          {:else}
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          {/if}
        </button>

        <button
          on:click={playNext}
          class="p-3 rounded-full hover:bg-ivory dark:hover:bg-dark-primary transition-colors text-text-primary-light dark:text-text-primary-dark"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div class="flex items-center gap-3">
        <svg class="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          on:input={changeVolume}
          class="w-24 h-1 bg-crem dark:bg-dark-primary rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  </div>

  <div class="border-t border-crem-taupe dark:border-dark-border p-6">
    <h4 class="text-lg font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">Playlist</h4>
    <div class="space-y-2">
      {#each tracks as track, index}
        <button
          on:click={() => playTrack(index)}
          class="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-ivory dark:hover:bg-dark-primary transition-colors text-left {currentTrackIndex === index ? 'bg-ivory dark:bg-dark-primary border-l-2 border-bronze-gold dark:border-olive-light' : ''}"
        >
          <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark font-medium">
            {#if currentTrackIndex === index && isPlaying}
              <svg class="w-4 h-4 text-bronze-gold dark:text-olive-light" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            {:else}
              <span class="text-sm">{index + 1}</span>
            {/if}
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-text-primary-light dark:text-text-primary-dark truncate {currentTrackIndex === index ? 'text-bronze-gold dark:text-olive-light' : ''}">{track.title}</p>
            <p class="text-sm text-text-secondary-light dark:text-text-secondary-dark truncate">{track.artist}</p>
          </div>
          {#if track.duration}
            <span class="text-sm text-text-secondary-light dark:text-text-secondary-dark">{track.duration}</span>
          {/if}
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #C9A961;
    cursor: pointer;
  }

  input[type="range"]::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #C9A961;
    cursor: pointer;
    border: none;
  }
</style>
