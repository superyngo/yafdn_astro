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
  let timeoutId: number
</script>

<div class="wrapper">
  {#each groupedHeadings as h}
    <p>
      <a
        on:click={anchorClick}
        on:mouseenter={() =>
          (timeoutId = setTimeout(() => {
            location.href = `#${h.slug}`
          }, 450))}
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

<style>
  .wrapper {
    padding-left: var(--header-padding);
    /* display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start; */
    & a {
      word-break: break-all;
    }
    & p {
      text-align: left;
    }
  }
</style>
