export const isBrowser = () => typeof window !== 'undefined'

export function camelize(str: string) {
  let firstWord = 0
  return str.replace(/(?:^\w|[A-Z]|\b\w|\W+)/g, function (match) {
    if (/\W+/.test(match)) return '' // or if (/\s+/.test(match)) for white spaces
    if (/\w/.test(match)) firstWord++
    return firstWord < 2 ? match.toLowerCase() : match.toUpperCase()
  })
}

export function groupList(
  lists: any[],
  levelPropertyName: string = 'depth',
  subListName: string = 'subheadings'
) {
  const cloneLists = structuredClone(lists)
  const result = cloneLists.reduce((newList, list) => {
    let headMark = true
    newList.temp = newList.temp || []
    for (let i = list[levelPropertyName] - 1; i > 0; i--) {
      if (!!newList.temp[i]) {
        newList.temp[i][subListName] = newList.temp[i][subListName] || []
        newList.temp[i][subListName].push(list)
        headMark = false
        break
      }
    }
    if (headMark) newList.push(list)
    newList.temp[list[levelPropertyName]] = list
    newList.temp.splice(list[levelPropertyName] + 1)
    return newList
  }, [])
  delete result.temp
  return result
}
