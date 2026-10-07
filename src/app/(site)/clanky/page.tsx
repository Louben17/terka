import type { Metadata } from 'next'
import { openGraph } from '@/lib/seo'
import { ArticleCard } from '@/components/ArticleCard'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Bubbles } from '@/components/Bubbles'
import { JsonLd } from '@/components/JsonLd'
import { Reveal } from '@/components/Reveal'
import { clanky } from '@/data/clanky'
import { absoluteUrl } from '@/data/site'

const popis =
  'Praktické návody na úklid domácnosti: jak uklízet octem a jedlou sodou, rychlý úklid za 10 minut, úklid kuchyně krok za krokem a jak se zbavit věcí.'

export const metadata: Metadata = {
  title: 'Články o úklidu: rady a návody pro čistý domov',
  description: popis,
  alternates: { canonical: '/clanky' },
  openGraph: openGraph({
    url: '/clanky',
    title: 'Články o úklidu: rady a návody pro čistý domov',
    description: popis,
    images: ['/images/clanek-kuchyn.jpg'],
  }),
}

export default function ClankyPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Články o úklidu',
          url: absoluteUrl('/clanky'),
          inLanguage: 'cs',
          isPartOf: { '@id': `${absoluteUrl('/')}#website` },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: clanky.map((c, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: absoluteUrl(`/clanky/${c.slug}`),
              name: c.titulek,
            })),
          },
        }}
      />
      <section className="relative overflow-hidden px-4 pt-36 pb-16 sm:px-6">
        <Bubbles dim />
        <div className="relative mx-auto max-w-6xl">
          <Breadcrumbs items={[{ name: 'Články', href: '/clanky' }]} />
        </div>
        <Reveal className="relative mx-auto mt-10 max-w-4xl text-center">
          <p className="text-sm tracking-[0.2em] text-moss uppercase">Rady a návody</p>
          <h1 className="mt-4 font-serif text-6xl leading-[1] tracking-tight text-balance sm:text-8xl">
            Články o úklidu, které dávají <em className="text-moss">smysl</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-soft">
            Tipy, postupy a malé příběhy o tom, jak uklízet šetrně k sobě, domovu i planetě.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 pb-16 sm:px-6 md:grid-cols-2">
        {clanky.map((clanek, i) => (
          <Reveal key={clanek.slug} delay={(i % 2) * 0.1}>
            <ArticleCard clanek={clanek} />
          </Reveal>
        ))}
      </section>
    </>
  )
}
