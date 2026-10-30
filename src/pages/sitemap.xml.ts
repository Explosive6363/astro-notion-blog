import { generateSitemap } from '../lib/generate-sitemap'
import { getAllPosts } from '../lib/notion/client'
import { getPostLink, getNavLink } from '../lib/blog-helpers'

export const prerender = true

// トップページと固定ページ。タグページは noindex のためサイトマップには含めない。
const STATIC_PAGES = ['/', '/about', '/privacy']

export async function GET() {
  const [posts] = await Promise.all([getAllPosts()])

  const sitemapItems = [
    ...STATIC_PAGES.map((path) => ({
      loc: new URL(getNavLink(path), import.meta.env.SITE).toString(),
    })),
    ...posts.map((post) => ({
      loc: new URL(getPostLink(post.Slug), import.meta.env.SITE).toString(),
      lastmod: new Date(post.Date),
    })),
  ]

  const sitemap = generateSitemap(sitemapItems)

  const res = new Response(sitemap)
  res.headers.set('Content-Type', 'application/xml; charset=utf-8')

  return res
}
