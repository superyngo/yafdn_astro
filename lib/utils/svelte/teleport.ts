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
  }
  // teleportContainer.focus() // optional
}
