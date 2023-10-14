<script lang="ts">
  import { teleport } from 'lib/utils/svelte/teleport'
  import type { MarkdownHeading } from 'astro'

  import ToCTable from './TableOfContents/ToCTable.svelte'
  import { groupList } from '@lib/utils/utils'
  type HeadingWithSubheadings = MarkdownHeading & {
    subheadings: MarkdownHeading[]
  }

  export let headings: MarkdownHeading[]
  const groupedHeadings = groupList(headings) as HeadingWithSubheadings[]
</script>

<aside class="ToCBox" use:teleport={{ selector: '#screen', method: 'replace' }}>
  <!-- <div id="table-of-contents" aria-label="Table Of Contents"> -->
  <p>Table of Contents</p>
  <ToCTable {groupedHeadings} />
  <!-- </div> -->
</aside>

<!-- 
<nav id='table-of-contents' aria-label='Table Of Contents'>
  <ol>
    {
      grouppedHeadings.map((h) => (
        <li>
          <a href={`#${h.slug}`}>{h.text}</a>
          {h.subheadings?.length > 0 && (
            <ol>
              {h.subheadings.map((sub) => (
                <li>
                  <a href={`#${sub.slug}`}>{sub.text}</a>
                </li>
              ))}
            </ol>
          )}
        </li>
      ))
    }
  </ol>
</nav> -->
<!-- <script is:inline>
  // This script tag is useful only if you want to display the TOC alongside the blog post...
  // ... and highlight the section that the user is currently reading through.
  // Feel free to remove this tag if you don't need this type of functionality.

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const headingFragment = `#${entry.target.id}`
        const tocItem = document.querySelector(`a[href="${headingFragment}"]`)

        if (entry.isIntersecting) {
          const previouslyActivatedItem =
            document.querySelector('.active-toc-item')

          previouslyActivatedItem?.classList.remove('active-toc-item')
          tocItem.classList.add('active-toc-item')
        } else {
          const isAnyOtherEntryIntersecting = entries.some(
            (e) => e.target.id !== entry.target.id && e.isIntersecting
          )

          if (isAnyOtherEntryIntersecting) {
            tocItem.classList.remove('active-toc-item')
          }
        }
      }
    },
    { root: null, rootMargin: '0px', threshold: [1] }
  )

  const sectionHeadings = document.querySelectorAll(
    'article > h2, article > h3'
  )

  for (const heading of sectionHeadings) {
    observer.observe(heading)
  }
</script> -->
<style scoped>
  .ToCBox {
    position: sticky;
    float: right;
    top: var(--header-height);
    width: var(--aside-width);
    height: calc(100vh - var(--header-height));
    border: 5px solid green;
    padding: var(--header-padding) var(--header-padding) var(--header-padding) 0;
    overflow-x: hidden;
    overflow-y: auto;
  }
  /* .active-toc-item {
    font-weight: bold;
  }
  nav {
    position: absolute;
    right: 0;
    display: flex;
    background: var(--background-color);
    inset: 0;
    border: 5px solid red;
    & * {
      padding: 0;
    }
  } */
</style>
