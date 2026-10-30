import { getStaticFilePath } from '../lib/blog-helpers'

export const prerender = true

export async function GET() {
  // サイトマップは絶対URLでしか認識されないため、Astro の site 設定から組み立てる。
  const site = new URL(getStaticFilePath('/'), import.meta.env.SITE)
    .toString()
    .replace(/\/+$/, '')

  const body = `User-agent: *
Allow: /

Sitemap: ${site}/sitemap.xml
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
