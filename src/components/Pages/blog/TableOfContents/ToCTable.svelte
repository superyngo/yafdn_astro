<script lang="ts">
  import type { MarkdownHeading } from 'astro'
  type HeadingWithSubheadings = MarkdownHeading & {
    subheadings?: MarkdownHeading[]
  }
  export let groupedHeadings: HeadingWithSubheadings[]
</script>

<div>
  {#each groupedHeadings as h}
    <p>
      <a href={`#${h.slug}`}>{h.text}</a>
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
