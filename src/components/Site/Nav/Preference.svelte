<script lang="ts">
  import { onMount } from 'svelte'
  import Navigation from './Navigation.svelte'
  import Xsvg from '@assets/X.svg'
  import Hamburgsvg from '@assets/hamburg.svg'
  let windowWidth: number
  let hideControlPanel = true
  function handleClick(e) {
    if (!e.target.closest('.controlMenu')) hideControlPanel = true
  }
  onMount(() => document.addEventListener('click', handleClick, true))
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="wrapper">
  {#if windowWidth > 768}
    <a href="#" class="searchbar">searchbar</a>
  {/if}
  <div class="controlMenu">
    <a
      href="#"
      role="button"
      on:click={() => (hideControlPanel = !hideControlPanel)}
    >
      <embed src={Xsvg.src} type="image/svg+xml" class:hideControlPanel />
      <embed
        src={Hamburgsvg.src}
        type="image/svg+xml"
        class={hideControlPanel ? '' : 'hideControlPanel'}
      />
    </a>
    <div class="controlPanel" class:hideControlPanel>
      {#if windowWidth < 768}
        <Navigation />
        <a href="#" class="searchbar">searchbar</a>
      {/if}
      <div class="menuItem">
        <label for="language"><span>Language</span></label>
        <select id="language">
          <option selected value="">繁體中文</option>
          <option>English</option>
          <option>Japanese</option>
        </select>
      </div>
      <div class="menuItem">
        <label for="theme"><span>Theme</span></label>
        <select id="theme">
          <option selected value="">Light</option>
          <option>Dark</option>
        </select>
      </div>
      <div class="menuItem">
        <label for="fontSizeRange">Font size : 20px</label>
        <input
          type="range"
          min="16"
          max="24"
          value="20"
          id="fontSizeRange"
          name="fontSizeRange"
        />
      </div>
      <div class="menuItem">
        <label for="lineHeightRange">Line height : 40px</label>
        <input
          type="range"
          min="32"
          max="48"
          value="40"
          id="lineHeightRange"
          name="lineHeightRange"
        />
      </div>
      <a href="#" role="button">Set to defalut</a>
    </div>
  </div>
</div>

<style scoped>
  .wrapper {
    display: grid;
    grid-template-columns: repeat(2, auto);
    place-items: center;
    gap: 1rem;
  }

  .controlPanel {
    position: absolute;
    inset: auto 0 0 0;
    padding: var(--nav-padding);
    display: grid;
    width: 100%;
    height: calc(100vh - var(--nav-height));
    background: var(--background-color);
    overflow: auto;
    & .menuItem {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      place-items: center;
    }
  }

  .hideControlPanel {
    display: none;
  }

  @media (min-width: 768px) {
    .controlPanel {
      inset: var(--nav-height) var(--aside-width) auto auto;
      width: 20rem;
      height: auto;
      border: 3px solid var(--color);
      border-radius: 1rem;
    }
    .searchbar {
      display: block;
    }
  }

  embed {
    pointer-events: none;
  }
</style>
