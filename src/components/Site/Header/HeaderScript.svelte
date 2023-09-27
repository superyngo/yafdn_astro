<script lang="ts">
  import { isBrowser } from '@lib/utils/utils'
  import { hideControlPanel, windowsScrollY } from '@lib/stores/state'
  let ScrollTop: number
  let lastScrollTop = 0
  let header: HTMLElement
  let headerHeight: number

  isBrowser() &&
    (header = <HTMLElement>document.querySelector('.headerWrapper')) &&
    (headerHeight = +getComputedStyle(header)
      .getPropertyValue('height')
      .replace('px', ''))

  $: {
    if (isBrowser()) {
      if (ScrollTop > lastScrollTop && $hideControlPanel)
        (<HTMLElement>header).style.height = '0px'
      if (ScrollTop < lastScrollTop)
        (<HTMLElement>header).style.height = 'var(--header-height)'
      if (ScrollTop < headerHeight)
        (<HTMLElement>header).style.height = 'var(--header-height)'
      lastScrollTop = ScrollTop
      $windowsScrollY = ScrollTop
    }
  }
</script>

<svelte:window bind:scrollY={ScrollTop} />
