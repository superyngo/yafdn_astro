<script lang="ts">
  import { isBrowser } from '@lib/utils/utils'
  import {
    hideControlPanel,
    windowsScrollY,
    windowsWidth
  } from '@lib/stores/state'
  let lastScrollTop = 0
  let header: HTMLElement, headerHeight: number

  if (isBrowser()) {
    header = <HTMLElement>document.querySelector('.headerWrapper')
    headerHeight = +getComputedStyle(header)
      .getPropertyValue('height')
      .replace('px', '')
  }

  $: {
    if (isBrowser()) {
      if ($windowsScrollY > lastScrollTop && $hideControlPanel)
        (<HTMLElement>header).style.height = '0px'
      if ($windowsScrollY < lastScrollTop)
        (<HTMLElement>header).style.height = 'var(--header-height)'
      if ($windowsScrollY < headerHeight)
        (<HTMLElement>header).style.height = 'var(--header-height)'
      lastScrollTop = $windowsScrollY
    }
  }
</script>

<svelte:window bind:scrollY={$windowsScrollY} bind:innerWidth={$windowsWidth} />
