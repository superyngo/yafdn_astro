<script lang="ts">
  import { isBrowser } from '@lib/utils/utils'
  export let tag = 'form'
  import DOMPurify from 'dompurify'
  export let clean: string
  export let value: string
  export let ref: HTMLElement

  $: {
    isBrowser() && (clean = DOMPurify.sanitize(value))
  }

  const handleSubmit = function (e) {
    e.preventDefault()
    if (!clean || clean.length === 0) return
    const url = new URL('search', window.location.origin)
    url.searchParams.set('q', clean)
    window.location.assign(url)
  }
</script>

<aside>
  <svelte:element this={tag} on:submit={handleSubmit}>
    <label for="searchbarInput"></label>
    <input
      type="search"
      bind:value
      required
      minlength="1"
      maxlength="30"
      id="searchbarInput"
      name="searchbar"
      bind:this={ref}
    />
  </svelte:element>
</aside>

<style scoped>
  aside {
  }
  form {
    padding: 30px 0 0 0;
  }
  #searchbar {
    margin: 0;
  }
</style>
