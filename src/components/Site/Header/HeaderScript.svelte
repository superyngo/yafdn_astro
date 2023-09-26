<script lang="ts">
  import { isBrowser } from '@lib/utils/utils'
  import { hideControlPanel, windowsScrollY } from '@lib/stores/state'
  let ScrollTop: number
  let lastScrollTop = 0
  let header: HTMLElement

  isBrowser() &&
    (header = <HTMLElement>document.querySelector('.headerOutline'))

  $: {
    if (isBrowser()) {
      if (ScrollTop > lastScrollTop && $hideControlPanel)
        (<HTMLElement>header).style.position = 'absolute'
      if (ScrollTop < lastScrollTop)
        (<HTMLElement>header).style.position = 'sticky'
      lastScrollTop = ScrollTop
      $windowsScrollY = ScrollTop
    }
  }
</script>

<svelte:window bind:scrollY={ScrollTop} />
