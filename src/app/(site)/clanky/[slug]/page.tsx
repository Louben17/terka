import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AlertTriangle, ArrowLeft, ArrowRight, Clock, Lightbulb } from 'lucide-react'
import { ArticleCard, ArticleCover } from '@/components/ArticleCard'
import { Reveal } from '@/components/Reveal'
import { type Blok, clanky, formatDatum, getClanek } from '@/data/clanky'
import { site } from '@/data/site'

export function generateStaticParams() {
  return clanky.map((c) => ({ slug: c.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps<'/clanky/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const clanek = getClanek(slug)
  if (!clanek) return {}
  return {
    title: clanek.titulek,
    description: clanek.perex,
    alternates: { canonical: `/clanky/${clanek.slug}` },
    openGraph: {
      type: 'article',
      title: clanek.titulek,
      description: clanek.perex,
      publishedTime: clanek.datum,
      authors: [site.author],
    },
  }
}

function BlokView({ blok }: { blok: Blok }) {
  switch (blok.typ) {
    case 'odstavec':
      return <p>{blok.text}</p>
    case 'nadpis':
      return <h2 className="!mt-14 font-serif text-4xl leading-tight tracking-tight text-ink">{blok.text}</h2>
    case 'seznam': {
      const List = blok.cislovany ? 'ol' : 'ul'
      return (
        <List className="space-y-3">
          {blok.polozky.map((p, i) => (
            <li key={p} className="flex gap-4">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-mint text-xs font-semibold text-moss">
                {blok.cislovany ? i + 1 : '✦'}
              </span>
              <span>{p}</span>
            </li>
          ))}
        </List>
      )
    }
    case 'tip':
    case 'varovani': {
      const tip = blok.typ === 'tip'
      const Icon = tip ? Lightbulb : AlertTriangle
      return (
        <aside className={`rounded-3xl p-6 sm:p-7 ${tip ? 'bg-mint/70' : 'bg-blush/70'}`}>
          <p className="flex items-center gap-2 font-semibold text-ink">
            <Icon size={18} className={tip ? 'text-moss' : 'text-[#a4533b]'} />
            {blok.titulek}
          </p>
          <p className="mt-2 text-base">{blok.text}</p>
        </aside>
      )
    }
  }
}

export default async function ClanekPage({ params }: PageProps<'/clanky/[slug]'>) {
  const { slug } = await params
  const clanek = getClanek(slug)
  if (!clanek) notFound()

  const dalsi = clanky.filter((c) => c.slug !== clanek.slug).slice(0, 2)

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: clanek.titulek,
            description: clanek.perex,
            datePublished: clanek.datum,
            inLanguage: 'cs',
            author: { '@type': 'Person', name: site.author, url: site.instagram },
            publisher: { '@type': 'Organization', name: site.name, url: site.url },
            mainEntityOfPage: `${site.url}/clanky/${clanek.slug}`,
          }),
        }}
      />

      <header className="mx-auto max-w-4xl px-4 pt-36 sm:px-6">
        <Reveal>
          <Link
            href="/clanky"
            className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
          >
            <ArrowLeft size={16} /> Všechny články
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-ink-soft">
            <span className="rounded-full bg-mint px-3 py-1 font-medium text-moss">{clanek.kategorie}</span>
            <time dateTime={clanek.datum}>{formatDatum(clanek.datum)}</time>
            <span className="flex items-center gap-1">
              <Clock size={14} /> {clanek.minutCteni} min čtení
            </span>
          </div>
          <h1 className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight text-balance sm:text-7xl">
            {clanek.titulek}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-soft">{clanek.perex}</p>
        </Reveal>
      </header>

      <Reveal className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
        <ArticleCover clanek={clanek} className="aspect-[21/9] rounded-[2rem]" />
      </Reveal>

      <div className="mx-auto max-w-2xl space-y-6 px-4 py-16 text-lg leading-[1.75] text-ink-soft sm:px-6">
        {clanek.obsah.map((blok, i) => (
          <BlokView key={i} blok={blok} />
        ))}
      </div>

      <aside className="mx-auto max-w-2xl px-4 sm:px-6">
        <Link
          href="/#vyzva"
          className="group flex items-center justify-between gap-6 rounded-[2rem] bg-moss-deep p-8 text-cream transition-transform hover:-translate-y-1"
        >
          <span>
            <span className="text-sm tracking-[0.2em] text-sage uppercase">Teorie stačí</span>
            <span className="mt-2 block font-serif text-3xl sm:text-4xl">
              Vyzkoušej dnešní <em className="text-sage">výzvu</em>
            </span>
          </span>
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-cream text-ink transition-transform duration-500 group-hover:-rotate-45">
            <ArrowRight size={20} />
          </span>
        </Link>
      </aside>

      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <h2 className="font-serif text-4xl tracking-tight sm:text-5xl">
          Další <em className="text-moss">čtení</em>
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {dalsi.map((c) => (
            <ArticleCard key={c.slug} clanek={c} />
          ))}
        </div>
      </section>
    </article>
  )
}
