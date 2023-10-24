<script lang="ts">
  import { isBrowser, camelize } from '@lib/utils/utils'
  export let min: string,
    max: string,
    value: string,
    id: string,
    cssVarName: string = '',
    text: string = ''

  $: {
    if (isBrowser() && cssVarName) {
      document.documentElement.style.setProperty(cssVarName, value + 'px')
      localStorage[camelize(cssVarName)] = value
    }
  }
</script>

<label for={id}><span>{text} : {value}px</span></label>
<input type="range" {min} {max} {id} bind:value />
