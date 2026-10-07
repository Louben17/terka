import type { MetadataRoute } from 'next'
import { clanky } from '@/data/clanky'
import { absoluteUrl } from '@/data/site'

const galerie = ['loznice', 'pomocnici', 'okno', 'pradlo', 'koupelna'].map((f) => absoluteUrl(`/images/galerie-${f}.jpg`))
const posledniClanek = clanky.map((c) => c.upraveno).sort().at(-1)

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
      images: [absoluteUrl('/images/paticka-domov.jpg'), ...galerie],
    },
    {
      url: absoluteUrl('/uklidove-vyzvy'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/clanky'),
      lastModified: posledniClanek,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...clanky.map((c) => ({
      url: absoluteUrl(`/clanky/${c.slug}`),
      lastModified: c.upraveno,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      images: [absoluteUrl(c.obrazek)],
    })),
  ]
}
