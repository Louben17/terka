import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Úklidová Guru - Inspirace pro čistý domov a ekologické úklidy',
  description: 'Objevte radost z úklidu s Úklidovou Guru Terezou. Inspirativní citáty, ekologické čisticí prostředky a praktické tipy pro čistý domov. Sledujte @uklidovaguru na Instagramu.',
  keywords: 'úklid, ekologický úklid, čisticí prostředky, domácnost, pořádek, úklidová guru, tereza, instagram, motivace, citáty',
  authors: [{ name: 'Úklidová Guru Tereza' }],
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
  themeColor: '#f9fafb',
  alternates: {
    canonical: 'https://uklidovaguru.cz',
  },
  openGraph: {
    type: 'website',
    url: 'https://uklidovaguru.cz',
    title: 'Úklidová Guru - Inspirace pro čistý domov a ekologické úklidy',
    description: 'Objevte radost z úklidu s Úklidovou Guru Terezou. Inspirativní citáty, ekologické čisticí prostředky a praktické tipy pro čistý domov.',
    images: [
      {
        url: 'https://uklidovaguru.cz/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Úklidová Guru - Inspirace pro čistý domov',
      },
    ],
    locale: 'cs_CZ',
    siteName: 'Úklidová Guru',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Úklidová Guru - Inspirace pro čistý domov a ekologické úklidy',
    description: 'Objevte radost z úklidu s Úklidovou Guru Terezou. Inspirativní citáty, ekologické čisticí prostředky a praktické tipy pro čistý domov.',
    images: ['https://uklidovaguru.cz/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Úklidová Guru",
              "description": "Inspirace pro čistý domov a ekologické úklidy",
              "url": "https://uklidovaguru.cz",
              "author": {
                "@type": "Person",
                "name": "Tereza",
                "sameAs": ["https://www.instagram.com/uklidovaguru/"]
              },
              "potentialAction": {
                "@type": "ReadAction",
                "target": "https://uklidovaguru.cz"
              }
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}