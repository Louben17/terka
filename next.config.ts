import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Původní adresy článků → nové SEO slugy (trvalé přesměrování přenese hodnotu odkazů).
  async redirects() {
    return [
      { source: '/clanky/prirodni-cistice-ocet-soda-citron', destination: '/clanky/ocet-jedla-soda-citron-na-uklid', permanent: true },
      { source: '/clanky/desetiminutovy-uklid', destination: '/clanky/rychly-uklid-za-10-minut', permanent: true },
      { source: '/clanky/kuchyn-krok-za-krokem', destination: '/clanky/jak-uklidit-kuchyn', permanent: true },
      { source: '/clanky/minimalismus-bez-vycitek', destination: '/clanky/jak-se-zbavit-veci', permanent: true },
      { source: '/vyzvy', destination: '/uklidove-vyzvy', permanent: true },
    ]
  },

  // Náhledové domény Vercelu (*.vercel.app) nesmí soutěžit s hlavní doménou ve vyhledávání.
  async headers() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: '(?<host>.*\\.vercel\\.app)' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ]
  },
}

export default nextConfig
