// Remote image optimization helpers.
//
// Images hosted on services that accept resize parameters in the URL are
// rewritten at build time so that the browser does not have to download
// multi-megabyte originals.

const UNSPLASH_HOSTS = new Set(['images.unsplash.com', 'plus.unsplash.com'])

export const optimizeRemoteImageUrl = (url: string, width = 1600): string => {
  try {
    const parsed = new URL(url)

    if (UNSPLASH_HOSTS.has(parsed.hostname)) {
      parsed.searchParams.set('w', String(width))
      parsed.searchParams.set('q', '70')
      parsed.searchParams.set('auto', 'format')
      parsed.searchParams.set('fit', 'max')
      return parsed.toString()
    }
  } catch {
    // Not an absolute URL: leave it untouched.
  }

  return url
}
