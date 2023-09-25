<script lang="ts">
  import { isBrowser } from '@lib/utils/utils'
  export let min: string,
    max: string,
    value: string,
    id: string,
    cssVarName: string
  let cssValue: string = value
  $: {
    isBrowser() &&
      document.documentElement.style.setProperty(cssVarName, cssValue + 'px')
  }
</script>

<label for="fontSizeRange">Font size : {cssValue}px</label>
<input type="range" {min} {max} {id} bind:value={cssValue} />
