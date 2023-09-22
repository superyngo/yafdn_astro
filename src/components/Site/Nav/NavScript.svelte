<script lang="ts">
  import { onMount } from 'svelte'
  import { state } from '@lib/stores/state'
  import GetWindowsWidth from '@components/Tools/svelte/GetWindowsWidth.svelte'

  export let windowWidth: number
  // function googleTranslateElementInit() {
  //   new google.translate.TranslateElement(
  //     { pageLanguage: 'zh-TW' },
  //     'google_translate_element'
  //   )
  // }
  // googleTranslateElementInit()

  onMount(() => {
    const nav = document.querySelector('.nav')
    // const navHeight = getComputedStyle(
    //   document.documentElement
    // ).getPropertyValue('--nav-height')
    let lastScrollTop = 0
    window.addEventListener('scroll', (e) => {
      let ScrollTop = window.pageYOffset || document.documentElement.scrollTop
      if (ScrollTop > lastScrollTop && state.popover.hide)
        (<HTMLElement>nav).style.position = 'absolute'
      if (ScrollTop < lastScrollTop)
        (<HTMLElement>nav).style.position = 'sticky'
      lastScrollTop = ScrollTop
    })
  })
</script>

<GetWindowsWidth bind:windowWidth />
