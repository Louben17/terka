import type { Metadata, Viewport } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import { site } from '@/data/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

const instrument = Instrument_Serif({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Úklidová Guru – Denní úklidové výzvy a tipy pro čistý domov',
    template: '%s · Úklidová Guru',
  },
  description: site.description,
  keywords: ['úklid', 'úklidové výzvy', 'úklidové tipy', 'přírodní čističe', 'ekologický úklid', 'pořádek', 'úklidová guru'],
  authors: [{ name: 'Tereza – Úklidová Guru', url: site.instagram }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: site.url,
    title: 'Úklidová Guru – Denní úklidové výzvy',
    description: site.description,
    locale: 'cs_CZ',
    siteName: site.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Úklidová Guru – Denní úklidové výzvy',
    description: site.description,
  },
  icons: { icon: '/favicon.ico' },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#f6f2ea',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${inter.variable} ${instrument.variable}`}>
      <body className="grain font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: site.name,
              description: site.description,
              url: site.url,
              inLanguage: 'cs',
              author: { '@type': 'Person', name: site.author, sameAs: [site.instagram] },
            }),
          }}
        />
        {children}
      </body>
    </html>
  )
}
