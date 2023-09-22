<script lang="ts">
  import Xsvg from '@assets/X.svg'
  import Hamburgsvg from '@assets/hamburg.svg'
  export let popover
</script>

<embed src={Xsvg.src} type="image/svg+xml" class:hide={popover.hide} />
<embed src={Hamburgsvg.src} type="image/svg+xml" class:hide={!popover.hide} />
