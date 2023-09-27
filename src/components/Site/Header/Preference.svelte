<script lang="ts">
  import { hideControlPanel } from '@lib/stores/state'
  import ControlPanelBtns from './Preference/ControlPanelBtns.svelte'
  import ControlPanel from './Preference/ControlPanel.svelte'
  import MyPopover from '@components/UIs/MyPopover.svelte'
  import Searchbar from './Preference/ControlPanel/Searchbar.svelte'
</script>

<div class="wrapper container">
  <div class="searchbar">
    <Searchbar />
  </div>

  <MyPopover
    bind:hidePopover={$hideControlPanel}
    popoverSelector=".controlPanel"
  >
    <span slot="btnContent">
      <ControlPanelBtns bind:hidePopover={$hideControlPanel} />
    </span>
    <div slot="popPanel">
      <ControlPanel bind:hide={$hideControlPanel} />
    </div>
  </MyPopover>
</div>

<style scoped>
  .wrapper {
    display: grid;
    place-items: center;
    grid-template-columns: auto auto;
    gap: 1rem;
    & .searchbar {
      display: none;
    }
    & button {
      margin: auto;
    }
  }

  @media (min-width: 768px) {
    .searchbar {
      display: block !important;
    }
  }
</style>
