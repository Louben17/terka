import type { MetadataRoute } from 'next'
import { clanky } from '@/data/clanky'
import { site } from '@/data/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: 'daily', priority: 1 },
    { url: `${site.url}/clanky`, changeFrequency: 'weekly', priority: 0.8 },
    ...clanky.map((c) => ({
      url: `${site.url}/clanky/${c.slug}`,
      lastModified: c.datum,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
