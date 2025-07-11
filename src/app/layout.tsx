import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Úklidová Guru - Motivační výzvy pro čistý domov',
  description: 'Denní inspirace pro úklid a pořádek. Objevte radost z úklidu s motivačními výzvami od Terezy @uklidovaguru.',
  keywords: 'úklid, motivace, výzvy, domácnost, pořádek, úklidová guru',
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
    title: 'Úklidová Guru - Motivační výzvy pro čistý domov',
    description: 'Denní inspirace pro úklid a pořádek. Objevte radost z úklidu s motivačními výzvami.',
    images: [
      {
        url: 'https://uklidovaguru.cz/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Úklidová Guru - Motivační výzvy pro úklid',
      },
    ],
    locale: 'cs_CZ',
    siteName: 'Úklidová Guru',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Úklidová Guru - Motivační výzvy pro čistý domov',
    description: 'Denní inspirace pro úklid a pořádek. Objevte radost z úklidu s motivačními výzvami.',
    images: ['https://uklidovaguru.cz/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico?v=2',
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
              "description": "Motivační výzvy a inspirace pro úklid domácnosti",
              "url": "https://uklidovaguru.cz",
              "author": {
                "@type": "Person",
                "name": "Tereza",
                "sameAs": ["https://www.instagram.com/uklidovaguru/"]
              },
              "mainEntity": {
                "@type": "Article",
                "headline": "Denní motivační výzvy pro úklid",
                "description": "Získejte každý den novou inspiraci pro úklid a pořádek v domácnosti",
                "author": {
                  "@type": "Person",
                  "name": "Tereza"
                }
              },
              "potentialAction": {
                "@type": "ReadAction",
                "target": "https://uklidovaguru.cz"
              }
            })
          }}
        />
      </head>
      <body>
        <header style={{ display: 'none' }}>
          <h1>Úklidová Guru - Motivační výzvy pro čistý domov</h1>
          <nav>
            <a href="https://www.instagram.com/uklidovaguru/">Instagram @uklidovaguru</a>
          </nav>
        </header>
        <main>
          {children}
        </main>
        <footer style={{ display: 'none' }}>
          <p>© 2025 Úklidová Guru Tereza - Motivace pro čistý domov</p>
        </footer>
      </body>
    </html>
  )
}