<script lang="ts">
  import Xsvg from '@/assets/X.svelte'
  import Hamburgsvg from '@/assets/hamburg.svelte'
  export let hidePopover
</script>

{#if hidePopover}
  <Hamburgsvg />
{:else}
  <Xsvg />
{/if}
