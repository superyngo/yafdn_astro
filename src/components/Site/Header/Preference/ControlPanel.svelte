<script lang="ts">
  import Navigation from '../Navigation.svelte'
  import { teleport } from '@lib/utils/svelte/teleport'
  import ThemeToggle from './ControlPanel/ThemeToggle.svelte'
  import MyRange from './ControlPanel/myRange.svelte'
  import Gtranslate from './ControlPanel/Gtranslate.svelte'
  import { isBrowser } from '@lib/utils/utils'

  export let hide = true
  let controlConfig = {
    fontSize: (isBrowser() && localStorage.fontSize) || '20',
    lineHeight: (isBrowser() && localStorage.lineHeight) || '30',
    theme: (isBrowser() && localStorage.theme) || 'dark'
  }

  const setToDefault = function () {
    if (window) {
      controlConfig.fontSize = '20'
      controlConfig.lineHeight = '30'
      controlConfig.theme = 'dark'
      document.querySelector('.gt_selector').value = 'zh-TW|zh-TW'
      window.doGTranslate('zh-TW|zh-TW')
    }
  }
</script>

<div class="controlPanel" use:teleport={'controlPanel-container'} class:hide>
  <div class="navInControlPanel">
    <Navigation />
  </div>
  <div class="searchbarWrapper">
    <a href="#" class="searchbar">searchbar</a>
  </div>
  <div class="menuItem">
    <Gtranslate />
  </div>
  <div class="menuItem">
    <ThemeToggle bind:theme={controlConfig.theme} />
  </div>
  <div class="menuItem">
    <MyRange
      min="16"
      max="24"
      bind:value={controlConfig.fontSize}
      id="fontSizeRange"
      cssVarName="--font-size"
    ></MyRange>
  </div>
  <div class="menuItem">
    <MyRange
      min="24"
      max="48"
      bind:value={controlConfig.lineHeight}
      id="lineHeightRange"
      cssVarName="--line-height"
    ></MyRange>
  </div>
  <button on:click={setToDefault}>Set to defalut</button>
</div>

<style>
  .controlPanel {
    position: static;
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
      inset: 0;
      margin-right: var(--aside-width);
      width: 20rem;
      height: auto;
      border: 3px solid var(--color);
      border-radius: 1rem;
    }
    .navInControlPanel,
    .searchbarWrapper {
      display: none;
    }
  }

  .hide {
    display: none;
  }
</style>
