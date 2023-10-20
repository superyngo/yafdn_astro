<script lang="ts">
  import { teleport } from 'lib/utils/svelte/teleport'
  import type { MarkdownHeading } from 'astro'

  import LeftArrow from '@/assets/leftArrow.svelte'

  import ToCTable from './ToC/ToCTable.svelte'
  import { groupList, isBrowser } from '@lib/utils/utils'
  type HeadingWithSubheadings = MarkdownHeading & {
    subheadings: MarkdownHeading[]
  }
  export let headings: MarkdownHeading[]
  import { ToCToggleHandler, headerToggleHandler } from '@lib/stores/state'

  let ToCToggleButtonSvg: SVGAnimateElement
  const groupedHeadings = groupList(headings) as HeadingWithSubheadings[]

  isBrowser() && document.addEventListener('click', handleClick, true)
  let ToCBox

  function toggleToC() {
    $ToCToggleHandler && ($headerToggleHandler = false)
    $ToCToggleHandler = !$ToCToggleHandler
    document.documentElement.style.setProperty(
      '--aside-width',
      $ToCToggleHandler ? '400px' : '0px'
    )
    ToCToggleButtonSvg.style.setProperty(
      '--rotateDegree',
      $ToCToggleHandler ? '540deg' : '0deg'
    )
  }

  function handleClick(e: MouseEvent) {
    e.target.id != 'ToCButton' && $ToCToggleHandler && toggleToC()
  }

  $: {
  }
</script>

<aside
  id="ToCBox"
  aria-label="Table Of Contents"
  use:teleport={{ selector: '#MaskOfMain', method: 'append' }}
  bind:this={ToCBox}
>
  {#if $ToCToggleHandler}
    <p>Table of Contents</p>
    <ToCTable {groupedHeadings} />
  {/if}
</aside>

<aside
  id="ToCButtonBox"
  use:teleport={{ selector: '#MaskOfMain', method: 'append' }}
>
  <button id="ToCButton" class="svgButton" on:click={() => toggleToC()}
    ><LeftArrow bind:thisElement={ToCToggleButtonSvg} /></button
  >
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
  aside {
    position: sticky;
    float: right;
    top: var(--header-height);
    height: calc(100vh - var(--header-height));
    overflow-x: hidden;
    overflow-y: auto;
    pointer-events: auto;
    transition: width ease 200ms;

    &#ToCBox {
      width: var(--aside-width);
      /* padding: var(--header-padding) var(--header-padding) var(--header-padding)
        0; */
      backdrop-filter: blur(5px) brightness(1);
    }
    &#ToCButtonBox {
      display: grid;
      place-items: center;
    }
    & p {
      text-align: center;
    }
    & button {
      /* translate: 100px; */
      width: 30px;
      aspect-ratio: 1/1;
      padding: 0;
    }
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
