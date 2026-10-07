import type { Metadata, Viewport } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import { JsonLd } from '@/components/JsonLd'
import { absoluteUrl, site } from '@/data/site'
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

const ogImage = { url: '/images/paticka-domov.jpg', width: 1536, height: 1024, alt: 'Uklizený obývací pokoj v podvečerním světle' }

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Úklidové výzvy a tipy na úklid domácnosti | Úklidová Guru',
    template: '%s | Úklidová Guru',
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: 'Tereza – Úklidová Guru', url: site.instagram }],
  creator: site.author,
  publisher: site.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    title: 'Úklidové výzvy a tipy na úklid domácnosti',
    description: site.description,
    locale: 'cs_CZ',
    siteName: site.name,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Úklidové výzvy a tipy na úklid domácnosti',
    description: site.description,
    images: [ogImage.url],
  },
  manifest: '/site.webmanifest',
  // Kód z Google Search Console (metoda „Značka HTML“) – stačí nastavit proměnnou na Vercelu.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: '#f6f2ea',
}

const home = absoluteUrl('/')

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${inter.variable} ${instrument.variable}`}>
      <body className="grain font-sans">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                '@id': `${home}#website`,
                url: home,
                name: site.name,
                alternateName: 'Úklidové výzvy',
                description: site.description,
                inLanguage: 'cs',
                publisher: { '@id': `${home}#organizace` },
              },
              {
                '@type': 'Organization',
                '@id': `${home}#organizace`,
                name: site.name,
                url: home,
                logo: { '@type': 'ImageObject', url: absoluteUrl(site.logo), width: 512, height: 512 },
                sameAs: [site.instagram],
                founder: { '@id': `${home}#tereza` },
              },
              {
                '@type': 'Person',
                '@id': `${home}#tereza`,
                name: site.author,
                description: site.authorBio,
                url: `${home}/#o-mne`,
                sameAs: [site.instagram],
                knowsAbout: ['úklid domácnosti', 'ekologický úklid', 'přírodní čisticí prostředky', 'minimalismus'],
              },
            ],
          }}
        />
        {children}
      </body>
    </html>
  )
}
