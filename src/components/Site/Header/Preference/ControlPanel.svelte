<script lang="ts">
  import Navigation from '../Navigation.svelte'
  import { teleport } from '@lib/utils/svelte/teleport'

  import ThemeToggle from './ControlPanel/ThemeToggle.svelte'
  import MyRange from './ControlPanel/myRange.svelte'
  import Gtranslate from './ControlPanel/Gtranslate.svelte'

  export let hide = true
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
    <ThemeToggle />
  </div>
  <div class="menuItem">
    <MyRange
      min="16"
      max="24"
      value="20"
      id="fontSizeRange"
      cssVarName="--font-size"
    ></MyRange>
  </div>
  <div class="menuItem">
    <MyRange
      min="24"
      max="48"
      value="30"
      id="lineHeightRange"
      cssVarName="--line-height"
    ></MyRange>
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
    .navInControlPanel,
    .searchbarWrapper {
      display: none;
    }
  }

  .hide {
    display: none;
  }
</style>
