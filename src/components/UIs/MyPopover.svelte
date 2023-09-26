<script lang="ts">
  import { isBrowser } from '@lib/utils/utils'

  export let hidePopover = true
  export let popoverSelector = '#myPopPanel'

  function handleClick(e: MouseEvent) {
    e.target.id != 'myPopBtn' &&
      !e.target.closest(popoverSelector) &&
      (hidePopover = true)
  }

  isBrowser() && document.addEventListener('click', handleClick, true)
</script>

<div class="myPopover">
  <button id="myPopBtn" on:click={() => (hidePopover = !hidePopover)}>
    <slot name="btnContent">
      <span class="defalutBtn">///</span>
    </slot>
  </button>

  <div id="myPopPanel" class:hide={hidePopover}>
    <slot name="popPanel">
      <div class="defaultPanel">stuff</div>
    </slot>
  </div>
</div>

<style scoped>
  /* :global(.hide) {
    display: none;
  } */
  #myPopBtn :global(*) {
    pointer-events: none;
  }
</style>
