<script lang="ts">
  import Xsvg from '@/assets/X.svelte'
  import Hamburgsvg from '@/assets/hamburg.svelte'
  export let showPopover: boolean
</script>

{#if showPopover}
  <Xsvg />
{:else}
  <Hamburgsvg />
{/if}
