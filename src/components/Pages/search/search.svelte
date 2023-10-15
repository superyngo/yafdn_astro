<script lang="ts">
  import { onMount } from 'svelte'
  import Searchbar from '@/components/Site/Header/Preference/Searchbar.svelte'
  let value: string
  let clean: string
  let ref: HTMLElement
  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search).get('q')
    value = urlParams as string
    ref.focus()
  })
</script>

<svelte:head>
  <title>{clean ? `Search results for "${clean}"` : ''}</title>
</svelte:head>

<Searchbar tag="div" bind:value bind:clean bind:ref />
<span>{clean ? `Search results for "${clean}"` : ''}</span>
test
