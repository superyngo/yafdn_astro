<script lang="ts">
  import { isBrowser } from '@lib/utils/utils'
  import {
    ControlPanelToggleHandler,
    windowsScrollY,
    headerHeight,
    ToCToggleHandler,
    headerToggleHandler,
    specialHandler
  } from 'lib/stores/state'
  let lastScrollTop = 0
  let header: HTMLElement

  if (isBrowser()) {
    header = <HTMLElement>document.querySelector('.headerWrapper')
    $headerHeight = +getComputedStyle(header)
      .getPropertyValue('height')
      .replace('px', '')
    window.addEventListener('scroll', handleScroll, true)
    window.addEventListener(
      'scrollend',
      () => {
        $specialHandler = false
      },
      true
    )
  }

  function handleScroll() {
    if (
      $specialHandler ||
      $ToCToggleHandler ||
      $ControlPanelToggleHandler ||
      $windowsScrollY < $headerHeight
    )
      return ($headerToggleHandler = true)
    if ($windowsScrollY < lastScrollTop)
      //open header
      $headerToggleHandler = true
    else if ($windowsScrollY > lastScrollTop) {
      //close header
      $headerToggleHandler = false
    }
    lastScrollTop = $windowsScrollY
  }

  function toggleHeader(toggle: boolean) {
    switch (toggle) {
      case true:
        ;(<HTMLElement>header).style.height = 'var(--header-height)'
        break
      case false:
        ;(<HTMLElement>header).style.height = '0px'
    }
  }

  $: {
    if (isBrowser()) {
      toggleHeader($headerToggleHandler)
    }
  }
</script>

<svelte:window bind:scrollY={$windowsScrollY} />
