import { writable } from 'svelte/store'
export const windowsScrollY = writable(0)
export const headerToggleHandler = writable(true)
export const ControlPanelToggleHandler = writable(false)
export const ToCToggleHandler = writable(false)
export const ArticleBox = writable({})
// export const windowsWidth = writable(0)
