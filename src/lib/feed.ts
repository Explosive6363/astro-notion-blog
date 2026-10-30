import rss from '@astrojs/rss'
import { getAllPosts, getDatabase } from './notion/client'
import { getPostLink } from './blog-helpers'

export const buildFeed = async () => {
  const [posts, database] = await Promise.all([getAllPosts(), getDatabase()])

  return rss({
    title: database.Title,
    description: database.Description,
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      link: new URL(getPostLink(post.Slug), import.meta.env.SITE).toString(),
      title: post.Title,
      description: post.Excerpt,
      pubDate: new Date(post.Date),
    })),
    customData: '<language>ja</language>',
  })
}
