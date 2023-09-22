export function teleport(node, name = 'teleport-container') {
  let teleportContainer = document.getElementById(name)
  teleportContainer?.replaceWith(node)
  // teleportContainer.focus() // optional
}
