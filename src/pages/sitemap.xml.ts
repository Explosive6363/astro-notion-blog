import { generateSitemap } from '../lib/generate-sitemap'
import { getAllPosts } from '../lib/notion/client'
import { getPostLink } from '../lib/blog-helpers'

export const prerender = true

export async function GET() {
  const [posts] = await Promise.all([getAllPosts()])

  const sitemapItems = posts.map((post) => {
    return {
      loc: new URL(getPostLink(post.Slug), import.meta.env.SITE).toString(),
      lastmod: new Date(post.Date),
    }
  })

  const sitemap = generateSitemap(sitemapItems)

  const res = new Response(sitemap)
  res.headers.set('Content-Type', 'text/xml')

  return res
}
