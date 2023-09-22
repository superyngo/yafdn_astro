<script lang="ts">
  import Navigation from '../Navigation.svelte'
  import { teleport } from '@lib/utils/svelte/teleport'
  export let windowWidth: number
  export let hide = true
</script>

<svelte:head>
  <script>
    window.gtranslateSettings = {
      default_language: 'zh-TW',
      native_language_names: true,
      detect_browser_language: true,
      languages: ['zh-TW', 'en', 'ja'],
      wrapper_selector: '.gtranslate_wrapper'
    }
  </script>
  <script
    src="https://cdn.gtranslate.net/widgets/latest/dropdown.js"
    defer
  ></script>
</svelte:head>

<div class="controlPanel" use:teleport={'controlPanel-container'} class:hide>
  {#if windowWidth < 768}
    <Navigation />
    <a href="#" class="searchbar">searchbar</a>
  {/if}
  <div class="menuItem">
    <label for="language"><span>Language</span></label>
    <div class="gtranslate_wrapper"></div>
    <!-- <select id="language">
      <option selected value="">繁體中文</option>
      <option>English</option>
      <option>Japanese</option>
    </select> -->
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

<style>
  .controlPanel {
    z-index: 10;
    inset: 0;
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

  @media (min-width: 768px) {
    .controlPanel {
      float: right;
      inset: 0 var(--aside-width) 0 auto;
      width: 20rem;
      height: auto;
      border: 3px solid var(--color);
      border-radius: 1rem;
    }
  }

  .hide {
    display: none;
  }
</style>
