<script lang="ts">
  import { ControlPanelToggleHandler } from '@lib/stores/state'
  import ControlPanelBtns from './Preference/ControlPanelBtns.svelte'
  import ControlPanel from './Preference/ControlPanel.svelte'
  import MyPopover from '@/components/UIs/MyPopover.svelte'
  import Searchbar from './Preference/Searchbar.svelte'
</script>

<div class="preferenceWrapper container">
  <div class="searchbarInPreference"><Searchbar /></div>

  <MyPopover
    bind:showPopover={$ControlPanelToggleHandler}
    popoverSelector=".controlPanel"
  >
    <span slot="btnContent" class="ControlPanelBtns">
      <ControlPanelBtns bind:showPopover={$ControlPanelToggleHandler} />
    </span>
    <div slot="popPanel">
      <ControlPanel bind:show={$ControlPanelToggleHandler} />
    </div>
  </MyPopover>
</div>

<style scoped>
  .preferenceWrapper {
    display: grid;
    place-items: center;
    grid-template-columns: auto auto;
    gap: 1rem;
    & .searchbarInPreference {
      display: none;
    }
    & button {
      margin: auto;
    }
  }

  @media (min-width: 768px) {
    .searchbarInPreference {
      display: block !important;
    }
  }
</style>
