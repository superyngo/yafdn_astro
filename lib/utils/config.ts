export const siteConfig = {
  title: 'YA前開筆',
  description: 'Yet Another 前端開發筆記',
  url:
    import.meta.env.MODE === 'development'
      ? 'http://localhost:5173'
      : 'https://yafdn.vercel.app'
}
export const navItems = [
  {
    href: '/blog',
    name: 'Blog'
  },
  {
    href: '/projects',
    name: 'Projects'
  },
  {
    href: '/about',
    name: 'About'
  }
]
export const teleportID = 'teleport-container'

export const gtranslateSettings = {
  default_language: 'zh-TW',
  native_language_names: true,
  detect_browser_language: true,
  languages: ['zh-TW', 'en', 'ja'],
  wrapper_selector: '.gtranslate_wrapper'
}
