import { defineConfig } from 'astro/config'
// import remarkToc from 'remark-toc'
import path from 'path'
// import netlify from '@astrojs/netlify/functions'
import * as url from 'url'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

import svelte from '@astrojs/svelte'

import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  },
  markdown: {
    // Applied to .md and .mdx files
    // remarkPlugins: [[remarkToc, { ordered: true, tight: false }]]
  },
  integrations: [svelte(), mdx()]
  // output: 'server',
  // adapter: netlify()
})
