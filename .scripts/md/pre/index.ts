import { arrangeDiscussions } from './converter.js'
import { fetchUser, fetchAllDiscussions, fetchAllLabels } from './fetcher.js'
import {
  cleanAll,
  writePosts,
  writePages,
  writeSiteConfig,
  writeLabelsList,
  writePostsMetaList
} from './writer.js'
import dotenv from 'dotenv'
import { log } from '../../../lib/utils/logger.js'
import config from '../lib/config.js'
const { POST_CATEGORY, PAGE_CATEGORY } = config

await cleanAll()

const { login: owner, url: githubUrl, bio } = await fetchUser()
const Labels = await fetchAllLabels(owner)
let Mds = await fetchAllDiscussions(owner)

const arrangedPost = await arrangeDiscussions(Mds)

const siteConfig = arrangedPost.config[0]
  ? dotenv.parse(arrangedPost.config[0].body as string)
  : {}
const configList: string[][] = [
  ['PAGE_SIZE'],
  ['BLOG_NAME'],
  ['BIO', bio],
  ['OWNER', owner],
  ['GITHUB_URL', githubUrl],
  ['EMAIL'],
  ['TWITTER'],
  ['DOMAIN'],
  ['DESCRIPTION'],
  ['KEYWORDS'],
  ['REPOSITORY'],
  ['LANGUAGE'],
  ['COMMENT'],
  ['TIMEZONE']
]
configList.forEach(([key, value]) => {
  const finalValue = siteConfig[key] || process.env[key] || value
  if (!finalValue) return
  siteConfig[key] = finalValue
})

await writeSiteConfig(siteConfig)
await writeLabelsList(Labels)
await writePostsMetaList(arrangedPost.postList)
await writePosts(arrangedPost[POST_CATEGORY])
await writePages(arrangedPost[PAGE_CATEGORY])

log(`done`)
