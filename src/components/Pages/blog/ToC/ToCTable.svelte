<script lang="ts">
  import {
    ToCToggleHandler,
    headerToggleHandler,
    specialHandler
  } from 'lib/stores/state'

  import type { MarkdownHeading } from 'astro'
  type HeadingWithSubheadings = MarkdownHeading & {
    subheadings?: MarkdownHeading[]
  }
  export let groupedHeadings: HeadingWithSubheadings[]
  function anchorClick() {
    $ToCToggleHandler = false
    $headerToggleHandler = false
    $specialHandler = true
  }
  function locationHref(href: string) {
    location.href = href
  }
  let timeoutId: number
</script>

<div>
  {#each groupedHeadings as h}
    <p>
      <a
        on:click={anchorClick}
        on:mouseenter={() =>
          (timeoutId = setTimeout(() => {
            locationHref(`#${h.slug}`)
          }, 300))}
        on:mouseleave={() => clearTimeout(timeoutId)}
        on:focus={() => {
          void 0
        }}
        class="ToCEntries"
        href={`#${h.slug}`}>{h.text}</a
      >
      {#if h.subheadings}
        <svelte:self groupedHeadings={h.subheadings} />
      {/if}
    </p>
  {/each}
</div>

<style scoped>
  div {
    padding-left: var(--header-padding);
    /* display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start; */
    & a {
      word-break: break-all;
    }
  }
</style>
