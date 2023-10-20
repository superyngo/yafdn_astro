<script lang="ts">
  import { isBrowser } from '@lib/utils/utils'

  export let showPopover = false
  export let popoverSelector = '#myPopPanel'

  function handleClick(e: MouseEvent) {
    e.target.id != 'myPopBtn' &&
      !e.target.closest(popoverSelector) &&
      (showPopover = false)
  }

  isBrowser() && document.addEventListener('click', handleClick, true)
</script>

<div class="myPopover">
  <button
    id="myPopBtn"
    class="svgButton"
    on:click={() => (showPopover = !showPopover)}
  >
    <slot name="btnContent">
      <span class="defalutBtn">///</span>
    </slot>
  </button>

  <div id="myPopPanel" class:hide={!showPopover}>
    <slot name="popPanel">
      <div class="defaultPanel">stuff</div>
    </slot>
  </div>
</div>

<style scoped>
  /* :global(.hide) {
    display: none;
  } */
</style>
