<script lang="ts">
  import { state } from '@lib/stores/state'
  import ControlPanelBtns from './Preference/ControlPanelBtns.svelte'
  import ControlPanel from './Preference/ControlPanel.svelte'
  import MyPopover from '@components/UIs/MyPopover.svelte'

  let popover = { hide: true }
  $: {
    state.popover = popover
  }
</script>

<div class="wrapper">
  <a href="#" class="searchbar">searchbar</a>

  <MyPopover bind:popover={state.popover} popoverSelector=".controlPanel">
    <span slot="btnContent">
      <ControlPanelBtns bind:popover={state.popover} />
    </span>
    <div slot="popPanel">
      <ControlPanel bind:hide={popover.hide} />
    </div>
  </MyPopover>
</div>

<style scoped>
  .wrapper {
    display: grid;
    grid-template-columns: repeat(2, auto);
    place-items: center;
    gap: 1rem;
    & .searchbar {
      display: none;
    }
  }

  @media (min-width: 768px) {
    .searchbar {
      display: block !important;
    }
  }
</style>
