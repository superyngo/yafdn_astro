<script lang="ts">
  import { isBrowser } from '@lib/utils/utils'
  let theme: string
  const handleTheme = (e) => {
    document.documentElement.dataset.theme = e.target.value
    localStorage.theme = e.target.value
  }
  isBrowser() && (theme = localStorage.theme)
</script>

<label for="theme"><span>Theme</span></label>
<select on:change={handleTheme} id="theme" bind:value={theme}>
  <option selected value="dark">Dark</option>
  <option value="light">Light</option>
</select>
