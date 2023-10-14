const lists = [
  { level: 5 },
  { level: 1 },
  { level: 3 },
  { level: 2 },
  { level: 4 },
  { level: 3 },
  { level: 2 },
  { level: 1 },
  { level: 2 },
  { level: 3 }
]
const result = lists.reduce((newList, list) => {
  let headMark = true
  newList.temp = newList.temp || []
  for (let i = list.level - 1; i > 0; i--) {
    if (newList.temp[i]) {
      newList.temp[i].subNodes = newList.temp[i].subNodes || []
      newList.temp[i].subNodes.push(list)
      headMark = false
      break
    }
  }
  if (headMark) newList.push(list)
  newList.temp[list.level] = list
  newList.temp.splice(list.level + 1)
  return newList
}, [])
