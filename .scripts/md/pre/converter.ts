import config from '../lib/config.js'

import YAML from 'yaml'
import type { DiscussionsType, FilteredDiscussionObject } from './types'

const { CONFIG_CATEGORY, POST_CATEGORY, PAGE_CATEGORY, BASE_LAYOUTS_PATH } =
  config

const splitMdx = (mdx: string) => {
  const arr = mdx.split(/^(?:-{3}[\n\r]([\w\W]+?)[\n\r]-{3})/)
  if (arr.length === 1) return [mdx]
  const frontMatter = YAML.parse(arr[1].trim())
  return [arr[2], frontMatter]
}

// export const convertFrontMatter = (list: DiscussionsType[]) =>
//   list.reduce((newList: DiscussionsType[], node) => {
//     if (
//       node.category.name === POST_CATEGORY &&
//       !node.labels.nodes.some(
//         (label, index, arr) => label.name === 'isPublic' && arr.splice(index, 1) //filter out not public and spice the isPublic label
//       )
//     )
//       return newList

//     const [md, originalFrontMatter] = splitMdx(node.body as string)

//     if (originalFrontMatter) {
//       Object.entries(originalFrontMatter).forEach(([key, value]) => {
//         node[key] = value
//       })
//     }
//     const date = new Date(node.publishedAt)
//     node.year = date.getFullYear()
//     node.month = date.getMonth() + 1
//     node.date = date.getDate()
//     node.layout = BASE_LAYOUTS_PATH

//     delete node.body

//     const frontMatterText = `---\n${YAML.stringify(node)}---\n`
//     node.body = frontMatterText + md
//     return [...newList, node]
//   }, [])

const addPostFrontMatter = (post: DiscussionsType) => {
  const date = new Date(post.publishedAt)
  post.year = date.getFullYear()
  post.month = date.getMonth() + 1
  post.date = date.getDate()
  post.layout = BASE_LAYOUTS_PATH
  return post
}

const convertFrontMatter = (
  post: DiscussionsType,
  postList: DiscussionsType[]
) => {
  const [md, originalFrontMatter] = splitMdx(post.body as string)

  //add originalFrontMatter to post property
  if (originalFrontMatter) {
    Object.entries(originalFrontMatter).forEach(([key, value]) => {
      post[key] = value
    })
  }

  //add FrontMatter
  post = addPostFrontMatter(post)

  delete post.body

  //fill in the post list
  post.category.name === POST_CATEGORY && postList.unshift(post)

  const frontMatterText = `---\n${YAML.stringify(post)}---\n`
  post.body = frontMatterText + md
  return post
}

export const arrangeDiscussions = (arrangedList: DiscussionsType[]) => {
  let arrangedDiscussions: FilteredDiscussionObject = {
    [CONFIG_CATEGORY]: [],
    [POST_CATEGORY]: [],
    [PAGE_CATEGORY]: [],
    postList: []
  }

  for (let i = 0; i < arrangedList.length; i++) {
    let post = arrangedList[i]
    //filter out not public and splice the isPublic label
    if (
      post.category.name === POST_CATEGORY &&
      !post.labels.nodes.some(
        (label, index, arr) => label.name === 'isPublic' && arr.splice(index, 1)
      )
    )
      continue

    //convert original FrontMatter and add frontMatter and fill in the post list
    post = convertFrontMatter(post, arrangedDiscussions.postList)

    arrangedDiscussions[post.category.name].push(post)
  }

  return arrangedDiscussions
}
