import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { clanky } from '@/data/clanky'
import { ArticleCard } from './ArticleCard'
import { Reveal } from './Reveal'

export function ArticlesSection() {
  const [featured, ...rest] = clanky

  return (
    <section id="clanky" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm tracking-[0.2em] text-moss uppercase">Články</p>
          <h2 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight sm:text-7xl">
            Čtení ke <em className="text-moss">kafi</em>
          </h2>
        </div>
        <Link
          href="/clanky"
          className="group surface flex items-center gap-2 rounded-full px-5 py-3 text-sm transition-colors hover:bg-mint"
        >
          Všechny články
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        <Reveal className="lg:row-span-2">
          <ArticleCard clanek={featured} featured />
        </Reveal>
        {rest.slice(0, 2).map((clanek, i) => (
          <Reveal key={clanek.slug} delay={0.1 * (i + 1)}>
            <ArticleCard clanek={clanek} horizontal />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
