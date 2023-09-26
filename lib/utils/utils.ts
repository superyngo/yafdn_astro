export const isBrowser = () => typeof window !== 'undefined'

export function camelize(str: string) {
  let firstWord = 0
  return str.replace(/(?:^\w|[A-Z]|\b\w|\W+)/g, function (match) {
    if (/\W+/.test(match)) return '' // or if (/\s+/.test(match)) for white spaces
    if (/\w/.test(match)) firstWord++
    return firstWord < 2 ? match.toLowerCase() : match.toUpperCase()
  })
}
