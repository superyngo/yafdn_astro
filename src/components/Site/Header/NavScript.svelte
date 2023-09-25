<script lang="ts">
  import { onMount } from 'svelte'
  import { isBrowser } from '@lib/utils/utils'
  import { state } from '@lib/stores/state'

  // function googleTranslateElementInit() {
  //   new google.translate.TranslateElement(
  //     { pageLanguage: 'zh-TW' },
  //     'google_translate_element'
  //   )
  // }
  // googleTranslateElementInit()
  let ScrollTop
  if (isBrowser()) {
    const nav = document.querySelector('.nav')
    // const navHeight = getComputedStyle(
    //   document.documentElement
    // ).getPropertyValue('--nav-height')
    let lastScrollTop = 0
    // window.addEventListener('scroll', (e) => {
    //   ScrollTop = window.pageYOffset || document.documentElement.scrollTop
    //   if (ScrollTop > lastScrollTop && state.popover.hide)
    //     (<HTMLElement>nav).style.position = 'absolute'
    //   if (ScrollTop < lastScrollTop)
    //     (<HTMLElement>nav).style.position = 'sticky'
    //   lastScrollTop = ScrollTop
    // })
  }
  $: {
    isBrowser() &&
      (ScrollTop = window.pageYOffset || document.documentElement.scrollTop) &&
      console.log(ScrollTop)
  }
</script>

<!-- <svelte:window bind:borderBoxSize={}> -->
