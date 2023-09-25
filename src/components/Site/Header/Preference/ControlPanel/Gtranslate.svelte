<script lang="ts">
  import { gtranslateSettings } from '@lib/utils/config'
  import { isBrowser } from '@lib/utils/utils'
  isBrowser() && (window.gtranslateSettings = gtranslateSettings)
</script>

<svelte:head>
  <script
    src="https://cdn.gtranslate.net/widgets/latest/dropdown.js"
    defer
  ></script>
</svelte:head>

<label for="language"><span>Language</span></label>
<div class={'gtranslate_wrapper'}></div>

<style scoped>
  * {
    width: 100%;
  }
</style>
