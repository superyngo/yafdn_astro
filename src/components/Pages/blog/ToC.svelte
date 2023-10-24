<script lang="ts">
  import { onMount } from 'svelte'
  import { teleport } from '@lib/utils/svelte/svelteUtils'
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
  use:teleport={{
    selector: '#MaskOfMain',
    method: 'append'
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
      width: 50px;
      aspect-ratio: 1/1;
      padding: 0;
    }
  }

  :global(.active-toc-item) {
    font-weight: bold;
  }
</style>
