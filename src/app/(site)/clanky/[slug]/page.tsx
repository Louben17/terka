import type { Metadata } from 'next'
import { openGraph } from '@/lib/seo'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AlertTriangle, ArrowRight, Check, Clock, Lightbulb } from 'lucide-react'
import { ArticleCard, ArticleCover } from '@/components/ArticleCard'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { InstagramIcon } from '@/components/InstagramIcon'
import { JsonLd } from '@/components/JsonLd'
import { Reveal } from '@/components/Reveal'
import { type Blok, clanky, formatDatum, getClanek } from '@/data/clanky'
import { absoluteUrl, site } from '@/data/site'
import { souvisejiciVyzvy } from '@/lib/kategorie'
import { getVyzvy } from '@/lib/vyzvy'

export function generateStaticParams() {
  return clanky.map((c) => ({ slug: c.slug }))
}

export const dynamicParams = false
export const revalidate = 3600

export async function generateMetadata({ params }: PageProps<'/clanky/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const clanek = getClanek(slug)
  if (!clanek) return {}
  const url = `/clanky/${clanek.slug}`
  return {
    // Bez přípony značky – titulek by byl delší než ~60 znaků a Google by ho zkrátil.
    title: { absolute: clanek.seoTitulek },
    description: clanek.seoPopis,
    alternates: { canonical: url },
    openGraph: openGraph({
      type: 'article',
      url,
      title: clanek.seoTitulek,
      description: clanek.seoPopis,
      publishedTime: clanek.datum,
      modifiedTime: clanek.upraveno,
      authors: [site.instagram],
      section: clanek.kategorie,
      images: [{ url: clanek.obrazek, width: 1536, height: 1024, alt: clanek.obrazekAlt }],
    }),
    twitter: {
      card: 'summary_large_image',
      title: clanek.seoTitulek,
      description: clanek.seoPopis,
      images: [clanek.obrazek],
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

  const url = absoluteUrl(`/clanky/${clanek.slug}`)
  const vyzvy = souvisejiciVyzvy(await getVyzvy(), clanek.vyzvyFiltr)
  const dalsi = clanky.filter((c) => c.slug !== clanek.slug).slice(0, 2)
  const slova = clanek.obsah.reduce(
    (n, b) => n + ('text' in b ? b.text : 'polozky' in b ? b.polozky.join(' ') : '').split(/\s+/).length,
    0
  )

  return (
    <article>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          '@id': `${url}#clanek`,
          headline: clanek.titulek,
          alternativeHeadline: clanek.seoTitulek,
          description: clanek.seoPopis,
          image: [absoluteUrl(clanek.obrazek)],
          datePublished: clanek.datum,
          dateModified: clanek.upraveno,
          inLanguage: 'cs',
          articleSection: clanek.kategorie,
          wordCount: slova,
          author: { '@id': `${absoluteUrl('/')}#tereza` },
          publisher: { '@id': `${absoluteUrl('/')}#organizace` },
          mainEntityOfPage: url,
          isPartOf: { '@id': `${absoluteUrl('/')}#website` },
        }}
      />

      <header className="mx-auto max-w-4xl px-4 pt-36 sm:px-6">
        <Breadcrumbs
          items={[
            { name: 'Články', href: '/clanky' },
            { name: clanek.titulek, href: `/clanky/${clanek.slug}` },
          ]}
        />
        <Reveal>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-ink-soft">
            <span className="rounded-full bg-mint px-3 py-1 font-medium text-moss">{clanek.kategorie}</span>
            <time dateTime={clanek.datum}>{formatDatum(clanek.datum)}</time>
            <span className="flex items-center gap-1">
              <Clock size={14} /> {clanek.minutCteni} min čtení
            </span>
            <span>
              Autorka:{' '}
              <Link href="/#o-mne" rel="author" className="text-ink underline-offset-4 hover:underline">
                {site.author}
              </Link>
            </span>
          </div>
          <h1 className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight text-balance sm:text-7xl">
            {clanek.titulek}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-soft">{clanek.perex}</p>
        </Reveal>
      </header>

      <Reveal className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
        <ArticleCover
          clanek={clanek}
          className="aspect-[4/3] rounded-[2rem] sm:aspect-[21/9]"
          sizes="(min-width: 1152px) 1104px, 100vw"
          priority
        />
      </Reveal>

      <div className="mx-auto max-w-2xl space-y-6 px-4 py-16 text-lg leading-[1.75] text-ink-soft sm:px-6">
        <aside aria-labelledby="ve-zkratce" className="rounded-3xl border border-line bg-paper p-6 sm:p-8">
          <h2 id="ve-zkratce" className="font-serif text-3xl text-ink">
            Ve zkratce
          </h2>
          <ul className="mt-4 space-y-2 text-base">
            {clanek.shrnuti.map((s) => (
              <li key={s} className="flex gap-3">
                <Check size={18} className="mt-1 shrink-0 text-moss" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </aside>

        {clanek.obsah.map((blok, i) => (
          <BlokView key={i} blok={blok} />
        ))}

        {vyzvy.length > 0 && (
          <section aria-labelledby="vyzvy-k-clanku" className="!mt-16 rounded-3xl bg-mint/60 p-6 sm:p-8">
            <h2 id="vyzvy-k-clanku" className="font-serif text-3xl text-ink">
              Vyzkoušejte rovnou
            </h2>
            <p className="mt-1 text-base">Úklidové výzvy, které k tomuhle tématu sedí:</p>
            <ul className="mt-4 space-y-2 text-base text-ink">
              {vyzvy.map((v) => (
                <li key={v} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-moss" />
                  {v}
                </li>
              ))}
            </ul>
            <Link
              href="/uklidove-vyzvy"
              className="mt-5 inline-flex items-center gap-2 text-base font-medium text-moss underline-offset-4 hover:underline"
            >
              Všechny úklidové výzvy <ArrowRight size={16} />
            </Link>
          </section>
        )}

        {/* Autorka – E-E-A-T */}
        <aside className="!mt-12 flex gap-5 rounded-3xl border border-line p-6 sm:p-8">
          <Image src={site.logo} alt="" width={64} height={64} className="size-16 shrink-0 rounded-full" />
          <div>
            <p className="font-serif text-2xl text-ink">O autorce</p>
            <p className="mt-2 text-base">{site.authorBio}</p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer me"
              className="mt-3 inline-flex items-center gap-2 text-base text-moss hover:underline"
            >
              <InstagramIcon size={16} /> {site.instagramHandle}
            </a>
          </div>
        </aside>
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
