import { specialHandler } from 'lib/stores/state'
let $specialHandler: boolean
const unsubscribe = specialHandler.subscribe(
  (value) => ($specialHandler = value)
)

type State = {
  entrySet: Set<HTMLElement>
  tempToCBoxDom: HTMLElement | null
}
const state: State = { entrySet: new Set(), tempToCBoxDom: null }

export const isBrowser = () => typeof window !== 'undefined'

export function teleport(
  node: HTMLElement,
  { selector = '#teleport-container', method = 'append' }
) {
  let teleportContainer = document.querySelector(selector)
  switch (method) {
    case 'replace':
      teleportContainer?.replaceWith(node)
      break
    case 'append':
      teleportContainer?.append(node)
      break
    case 'insertFirst':
      teleportContainer?.insertBefore(node, teleportContainer.firstChild)
      break
  }
  // teleportContainer.focus() // optional
}

export function ToCHighlighting(
  node: HTMLElement,
  { ToCBoxSelector = '#ToCBox' }
) {
  const observer = new IntersectionObserver(
    (entries) => {
      const ToCBoxDom = document.querySelector(ToCBoxSelector) as HTMLElement

      for (const entry of entries) {
        const headingFragment = `#${entry.target.id}`
        const tocItem = ToCBoxDom.querySelector(
          `a[href="${headingFragment}"]`
        ) as HTMLElement
        if (entry.isIntersecting) {
          state.entrySet.add(tocItem)
          state.tempToCBoxDom = tocItem
        } else {
          state.entrySet.delete(tocItem)
        }
      }
      ToCBoxDom.querySelectorAll('.active-toc-item').forEach(
        (e) => e?.classList.remove('active-toc-item')
      )
      const highestHeading =
        state.entrySet.size > 0
          ? [...state.entrySet].reduce(
              (a, c) => {
                c.offsetTop < a.offsetTop && (a = c)
                return a
              },
              { offsetTop: Infinity } as HTMLElement
            )
          : state.tempToCBoxDom
      highestHeading?.classList.add('active-toc-item')
      // highestHeading?.scrollIntoView({
      //   behavior: 'smooth',
      //   block: 'end',
      //   inline: 'nearest'
      // })
      console.log($specialHandler)
      !$specialHandler &&
        ToCBoxDom.scroll({
          top: highestHeading?.offsetTop as number,
          behavior: 'smooth'
        })
      // console.log(highestHeading?.offsetTop)
    },
    { root: null, rootMargin: '0px' }
  )
  node.querySelectorAll('[id]').forEach((headingDiv: Element) => {
    let ToCBoxDom
    const interval = setInterval(() => {
      ToCBoxDom = document.querySelector(ToCBoxSelector)
      if (!!ToCBoxDom) {
        observer.observe(headingDiv)
        clearInterval(interval)
      }
    }, 500)
  })
}

// export function ToCHighlighting(
//   node: HTMLElement,
//   { articleSelector = 'article' }
// ) {
//   const ArticleBox = document.querySelector(articleSelector)
//   const observer = new IntersectionObserver(
//     (entries) => {
//       for (const entry of entries) {
//         const headingFragment = `#${entry.target.id}`
//         const tocItem = <HTMLElement>(
//           node.querySelector(`a[href="${headingFragment}"]`)
//         )
//         if (entry.isIntersecting) {
//           state.entrySet.add(tocItem)
//           // const previouslyActivatedItem = node.querySelector('.active-toc-item')
//           // previouslyActivatedItem?.classList.remove('active-toc-item')
//           // ;(<HTMLElement>tocItem).classList.add('active-toc-item')
//         } else {
//           state.entrySet.delete(tocItem)
//           // const isAnyOtherEntryIntersecting = entries.some(
//           //   (e) => e.target.id !== entry.target.id && e.isIntersecting
//           // )
//           // if (isAnyOtherEntryIntersecting) {
//           //   ;(<HTMLElement>tocItem).classList.remove('active-toc-item')
//           // }
//         }
//       }
//       node
//         .querySelectorAll('.active-toc-item')
//         .forEach((e) => e?.classList.remove('active-toc-item'))
//       const highestHeading = [...state.entrySet].reduce(
//         (a, c) => {
//           c.offsetTop < a.offsetTop && (a = c)
//           return a
//         },
//         { offsetTop: Infinity } as HTMLElement
//       )
//       highestHeading.classList.add('active-toc-item')
//       // state.entrySet.forEach((e) => {
//       //   console.log(e.offsetTop)
//       //   e.classList.add('active-toc-item')
//       // })
//     },
//     { root: null, rootMargin: '0px' }
//   )

//   ;(<HTMLElement>ArticleBox)
//     .querySelectorAll('[id]')
//     .forEach((headingDiv: Element) => {
//       observer.observe(headingDiv)
//     })
// }

// export function teleportAndToCHighlighting(
//   node: HTMLElement,
//   {
//     selector = '#teleport-container',
//     method = 'append',
//     articleSelector = 'article'
//   }
// ) {
//   ToCHighlighting(node, { articleSelector })
//   teleport(node, { selector, method })
// }
