export function getElementCSSProperty(selector: string, property: string) {
  return getComputedStyle(document.querySelector(selector)).getPropertyValue(
    property
  )
}
