<script lang="ts">
  import { isBrowser } from '@lib/utils/utils'
  import {
    ControlPanelToggleHandler,
    windowsScrollY,
    ToCToggleHandler,
    headerToggleHandler
  } from '@lib/stores/state'
  let lastScrollTop = 0
  let header: HTMLElement, headerHeight: number

  if (isBrowser()) {
    header = <HTMLElement>document.querySelector('.headerWrapper')
    headerHeight = +getComputedStyle(header)
      .getPropertyValue('height')
      .replace('px', '')
  }

  function headerToggle(toggle: boolean) {
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
      if (
        $ToCToggleHandler ||
        $ControlPanelToggleHandler ||
        $windowsScrollY < lastScrollTop ||
        $windowsScrollY < headerHeight
      )
        //open header
        $headerToggleHandler = true
      else if ($windowsScrollY > lastScrollTop)
        //close header
        $headerToggleHandler = false
      lastScrollTop = $windowsScrollY
      headerToggle($headerToggleHandler)
    }
  }
</script>

<svelte:window bind:scrollY={$windowsScrollY} />
