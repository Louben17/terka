import type { Metadata } from 'next'
import { site } from '@/data/site'

type OpenGraph = NonNullable<Metadata['openGraph']>

// Next.js openGraph z layoutu a stránky neslučuje – stránka ho přepíše celý.
// Proto každá stránka skládá kompletní sadu přes tuhle funkci.
export function openGraph(og: OpenGraph & { url: string; images: string[] | OpenGraph['images'] }): OpenGraph {
  return {
    type: 'website',
    siteName: site.name,
    locale: 'cs_CZ',
    ...og,
  } as OpenGraph
}
