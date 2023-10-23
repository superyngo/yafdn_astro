<script lang="ts">
  import { onMount } from 'svelte'
  import {
    teleport,
    ToCHighlighting,
    teleportAndToCHighlighting
  } from '@lib/utils/svelte/svelteUtils'
  import type { MarkdownHeading } from 'astro'

  import LeftArrow from '@/assets/leftArrow.svelte'

  import ToCTable from './ToC/ToCTable.svelte'
  import { groupList } from '@lib/utils/utils'
  type HeadingWithSubheadings = MarkdownHeading & {
    subheadings: MarkdownHeading[]
  }
  export let headings: MarkdownHeading[]
  import {
    ToCToggleHandler,
    ArticleBox,
    windowsScrollY,
    headerHeight,
    ToCBox,
    headerToggleHandler
  } from '@lib/stores/state'

  let ToCToggleButtonSvg: SVGAnimateElement
  const groupedHeadings = groupList(headings) as HeadingWithSubheadings[]

  onMount(async () => {
    document.addEventListener('click', handleClick, true)
  })
  function toggleToC() {
    $windowsScrollY > $headerHeight &&
      ($headerToggleHandler = $ToCToggleHandler)
    document.documentElement.style.setProperty(
      '--aside-width',
      $ToCToggleHandler ? 'var(--aside-width-default)' : '0px'
    )
    ToCToggleButtonSvg.style.setProperty(
      '--rotateDegree',
      $ToCToggleHandler ? '540deg' : '0deg'
    )
  }

  function handleClick(e: MouseEvent) {
    if (
      !(<HTMLElement>e.target).closest('#ToCBox') &&
      !(<HTMLElement>e.target).closest('#ToCButtonBox') &&
      !(<HTMLElement>e.target).closest('.myPopover') &&
      !(<HTMLElement>e.target).closest('.controlPanel') &&
      $ToCToggleHandler
    ) {
      $ToCToggleHandler = !$ToCToggleHandler
    }
  }

  let scrollToY: number
  $: {
    if ($ArticleBox && $ToCBox) {
      $ToCToggleHandler, toggleToC()
    }
  }
  $: {
    // if ($ArticleBox && $ToCBox) {
    //   scrollToY =
    //     (($windowsScrollY - $ArticleBox.offsetTop) / $ArticleBox.scrollHeight) *
    //     $ToCBox.scrollHeight
    //   // setTimeout(() => {
    //   //   $ToCBox.scroll({ top: scrollToY, behave: 'smooth' })
    //   // }, 300)
    //   // console.log($ToCBox.scrollTop, scrollToY)
    //   $ArticleBox.querySelectorAll('[id]')
    //   // .forEach((heading) => console.log(heading))
    // }
  }
</script>

<aside
  id="ToCBox"
  aria-label="Table Of Contents"
  use:teleportAndToCHighlighting={{
    selector: '#MaskOfMain',
    method: 'append',
    articleSelector: 'article'
  }}
  bind:this={$ToCBox}
>
  <!-- {#if $ToCToggleHandler} -->
  <p>Table of Contents</p>
  <ToCTable {groupedHeadings} />
  <!-- {/if} -->
</aside>

<aside
  id="ToCButtonBox"
  use:teleport={{ selector: '#MaskOfMain', method: 'append' }}
>
  <button
    id="ToCButton"
    class="svgButton"
    on:click={() => {
      $ToCToggleHandler = !$ToCToggleHandler
    }}><LeftArrow bind:thisElement={ToCToggleButtonSvg} /></button
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
    { root: null, rootMargin: '0px', threshold: [1]
  
  
  
  
  }
  )

  const sectionHeadings = document.querySelectorAll(
    'article > h2, article > h3'
  )

  for (const heading of sectionHeadings) {
    observer.observe(heading)
  }
</script> -->
<style>
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

  :global(.active-toc-item) {
    font-weight: bold;
    background: red;
  }
</style>
