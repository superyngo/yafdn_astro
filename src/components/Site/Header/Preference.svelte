<script lang="ts">
  import { hideControlPanel } from '@lib/stores/state'
  import ControlPanelBtns from './Preference/ControlPanelBtns.svelte'
  import ControlPanel from './Preference/ControlPanel.svelte'
  import MyPopover from '@components/UIs/MyPopover.svelte'
</script>

<div class="wrapper">
  <a href="#" class="searchbar">searchbar</a>

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
