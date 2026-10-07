import type { Metadata } from 'next'
import { openGraph } from '@/lib/seo'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { JsonLd } from '@/components/JsonLd'
import { Reveal } from '@/components/Reveal'
import { Shapes } from '@/components/Shapes'
import { absoluteUrl } from '@/data/site'
import { rozdelDoKategorii } from '@/lib/kategorie'
import { getVyzvy } from '@/lib/vyzvy'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const pocet = (await getVyzvy()).length
  const title = `Úklidové výzvy: ${pocet} tipů na úklid domácnosti`
  const description = `Seznam ${pocet} úklidových výzev na každý den – kuchyň, koupelna, obývák, podlahy i třídění věcí. Vyberte si jednu a za 10 minut máte hotovo.`
  return {
    title,
    description,
    alternates: { canonical: '/uklidove-vyzvy' },
    openGraph: openGraph({ title, description, url: '/uklidove-vyzvy', images: ['/images/galerie-pomocnici.jpg'] }),
  }
}

export default async function VyzvyPage() {
  const vyzvy = await getVyzvy()
  const skupiny = rozdelDoKategorii(vyzvy)

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Úklidové výzvy',
          url: absoluteUrl('/uklidove-vyzvy'),
          inLanguage: 'cs',
          isPartOf: { '@id': `${absoluteUrl('/')}#website` },
          about: skupiny.map((s) => s.nazev),
        }}
      />

      <section className="px-2 pt-2 pb-12 sm:px-3 sm:pt-3">
        <div className="relative overflow-hidden rounded-[2rem] bg-mint px-4 pt-32 pb-12 sm:rounded-[2.5rem] sm:px-6">
          <Shapes variant="subtle" />
          <div className="relative mx-auto max-w-6xl">
            <Breadcrumbs items={[{ name: 'Úklidové výzvy', href: '/uklidove-vyzvy' }]} />
            <Reveal className="mt-10 max-w-3xl">
              <h1 className="font-serif text-6xl leading-[1] tracking-tight text-balance sm:text-8xl">
                Všechny úklidové výzvy <em className="text-moss">na jednom místě</em>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
                {vyzvy.length} malých úkolů, které zvládnete zhruba za deset minut. Vyberte si jeden podle nálady, nebo
                nechte rozhodnout{' '}
                <Link href="/#vyzva" className="text-moss underline underline-offset-4">
                  výzvu dne
                </Link>
                . Krátké pravidelné dávky udrží domov v pořádku líp než jeden velký víkendový úklid.
              </p>
            </Reveal>

            <nav aria-label="Kategorie výzev" className="mt-10 flex flex-wrap gap-2">
              {skupiny.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-full bg-paper px-4 py-2 text-sm transition-colors hover:bg-white"
                >
                  {s.nazev} <span className="text-ink-soft">({s.vyzvy.length})</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-20 px-4 pb-16 sm:px-6">
        {skupiny.map((s) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-nadpis`}>
            <div className="flex flex-col gap-2 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 id={`${s.id}-nadpis`} className="font-serif text-4xl tracking-tight sm:text-5xl">
                  {s.nazev}
                </h2>
                <p className="mt-2 text-ink-soft">{s.popis}</p>
              </div>
              <span className="text-sm text-ink-soft">{s.vyzvy.length} výzev</span>
            </div>
            <ul className="mt-6 grid gap-x-10 gap-y-1 md:grid-cols-2">
              {s.vyzvy.map((v) => (
                <li key={v} className="flex gap-3 border-b border-line/60 py-3 leading-relaxed">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-sage" />
                  {v}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <Link
          href="/#vyzva"
          className="group flex items-center justify-between gap-6 rounded-[2rem] bg-moss-deep p-8 text-cream transition-transform hover:-translate-y-1 sm:p-10"
        >
          <span className="font-serif text-3xl sm:text-4xl">
            Nevíte, kde začít? Zkuste <em className="text-sage">výzvu dne</em>
          </span>
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-cream text-ink transition-transform duration-500 group-hover:-rotate-45">
            <ArrowRight size={20} />
          </span>
        </Link>
      </div>
    </>
  )
}
