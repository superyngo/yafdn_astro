<script lang="ts">
  import { isBrowser } from '@lib/utils/utils'
  export let theme: string
  $: {
    if (isBrowser()) {
      document.documentElement.dataset.theme = theme
      localStorage.theme = theme
    }
  }
</script>

<label for="theme"><span>Theme</span></label>
<select id="theme" bind:value={theme}>
  <option selected value="dark">Dark</option>
  <option value="light">Light</option>
</select>
