<script lang="ts">
  import Xsvg from '@assets/X.svg'
  import Hamburgsvg from '@assets/hamburg.svg'
  export let hidePopover
</script>

<embed src={Xsvg.src} type="image/svg+xml" class:hide={hidePopover} />
<embed src={Hamburgsvg.src} type="image/svg+xml" class:hide={!hidePopover} />

<style>
  embed {
    background: transparent;
  }
</style>
