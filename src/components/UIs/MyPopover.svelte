<script lang="ts">
  import { onMount } from 'svelte'

  export let popover = { hide: true }
  export let popoverSelector = '#myPopPanel'
  function handleClick(e: MouseEvent) {
    e.target.id != 'myPopBtn' &&
      !e.target.closest(popoverSelector) &&
      (popover.hide = true)
  }
  onMount(() => document.addEventListener('click', handleClick, true))
</script>

<div class="myPopover">
  <button id="myPopBtn" on:click={() => (popover.hide = !popover.hide)}>
    <slot name="btnContent">
      <span class="defalutBtn">///</span>
    </slot>
  </button>

  <div id="myPopPanel" class:hide={popover.hide}>
    <slot name="popPanel">
      <div class="defaultPanel">stuff</div>
    </slot>
  </div>
</div>

<style>
  /* :global(.hide) {
    display: none;
  } */
  #myPopBtn :global(*) {
    pointer-events: none;
  }
</style>
