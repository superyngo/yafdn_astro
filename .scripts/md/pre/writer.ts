import path from 'path'
import { mkdirSync, promises, stat } from 'fs'
import type { DiscussionsType, LabelsType } from './types.js'
import config from '../lib/config.js'
import { log } from '../../../lib/utils/logger.js'

const { CONFIG_PATH, POST_PATH, PAGE_PATH, LIST_PATH, MD_EXTENSION } = config

if (!CONFIG_PATH || !POST_PATH || !PAGE_PATH || !LIST_PATH)
  log('config missing', 'red')

export const cleanAll = async () => {
  ;[POST_PATH, PAGE_PATH].forEach((path) => {
    stat(path, async (err, stats) => {
      if (err) {
        if (err.code === 'ENOENT') {
          log(`${path} directory does not exist.`)
        } else {
          console.error('An error occurred:', err)
        }
      } else {
        if (stats.isDirectory()) {
          log(`${path} path deleted`)
          await promises.rm(path, { recursive: true })
        } else {
          log(`${path} path exists, but it is not a directory.`)
        }
      }
    })
  })
}

export const writeLabelsList = async (labelsList: LabelsType[]) => {
  const dir = path.join(LIST_PATH)
  mkdirSync(dir, { recursive: true })
  const p = path.resolve(dir, 'labelsList.json')
  await promises.writeFile(p, JSON.stringify(labelsList))
  log(`${labelsList.length} Labels list written`)
}

export const writePostsMetaList = async (list: DiscussionsType[]) => {
  list.sort(
    (a, b) =>
      -new Date(a.publishedAt).getTime() + new Date(b.publishedAt).getTime()
  )
  const dir = path.join(LIST_PATH)
  mkdirSync(dir, { recursive: true })
  const p = path.resolve(dir, 'postsMetaList.json')
  await promises.writeFile(p, JSON.stringify(list))
  log(`${list.length} PostsMetaList lists written`)
}

export const writePosts = async (list: DiscussionsType[]) => {
  const dir = path.join(POST_PATH)
  mkdirSync(dir, { recursive: true })
  await Promise.all(
    list.map(({ number, body }) => {
      const p = path.resolve(dir, number + '.' + MD_EXTENSION)
      return promises.writeFile(p, body as string)
    })
  )
  log(`${list.length} posts written`)
}

export const writePages = async (list: DiscussionsType[]) => {
  const dir = path.join(PAGE_PATH)
  mkdirSync(dir, { recursive: true })
  await Promise.all(
    list.map(({ title, body }) => {
      const p = path.resolve(dir, title + '.' + MD_EXTENSION)
      return promises.writeFile(p, body as string)
    })
  )
  log(`${list.length} pages written`)
}

export const writeSiteConfig = async (config: Record<string, string>) => {
  const content = Object.entries(config)
    .map(([key, value]) => `BLOG_${key}=${value}`)
    .join('\n')
  return promises.writeFile(CONFIG_PATH, content)
}
