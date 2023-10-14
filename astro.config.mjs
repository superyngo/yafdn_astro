import { defineConfig } from 'astro/config'
import remarkToc from 'remark-toc'
// import netlify from '@astrojs/netlify/functions'

import svelte from '@astrojs/svelte'

import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  markdown: {
    // Applied to .md and .mdx files
    // remarkPlugins: [[remarkToc, { ordered: true, tight: false }]]
  },
  integrations: [svelte(), mdx()]
  // output: 'server',
  // adapter: netlify()
})
