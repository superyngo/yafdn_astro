<script lang="ts">
  import { state } from '@lib/stores/state'
  import ControlPanelBtns from './Preference/ControlPanelBtns.svelte'
  import ControlPanel from './Preference/ControlPanel.svelte'
  import MyPopover from '@components/UIs/MyPopover.svelte'
  import NavScript from '../Nav/NavScript.svelte'

  let popover = { hide: true }
  $: {
    state.popover = popover
  }
  let windowWidth: number
</script>

<NavScript bind:windowWidth />

<div class="wrapper">
  {#if windowWidth > 768}
    <a href="#" class="searchbar">searchbar</a>
  {/if}

  <MyPopover bind:popover={state.popover}>
    <span slot="btnContent">
      <ControlPanelBtns bind:popover={state.popover} />
    </span>
    <div slot="popPanel">
      <ControlPanel bind:windowWidth bind:hide={popover.hide} />
    </div>
  </MyPopover>
</div>

<style scoped>
  .wrapper {
    display: grid;
    grid-template-columns: repeat(2, auto);
    place-items: center;
    gap: 1rem;
  }

  @media (min-width: 768px) {
    .searchbar {
      display: block;
    }
  }
</style>
