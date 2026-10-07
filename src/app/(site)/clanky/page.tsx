import type { Metadata } from 'next'
import { ArticleCard } from '@/components/ArticleCard'
import { Bubbles } from '@/components/Bubbles'
import { Reveal } from '@/components/Reveal'
import { clanky } from '@/data/clanky'

export const metadata: Metadata = {
  title: 'Články o úklidu',
  description:
    'Praktické články o vědomém a ekologickém úklidu: přírodní čističe, rychlé rutiny, kuchyň krok za krokem a minimalismus bez výčitek.',
  alternates: { canonical: '/clanky' },
}

export default function ClankyPage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 pt-40 pb-16 sm:px-6">
        <Bubbles dim />
        <Reveal className="relative mx-auto max-w-4xl text-center">
          <p className="text-sm tracking-[0.2em] text-moss uppercase">Články</p>
          <h1 className="mt-4 font-serif text-6xl leading-[1] tracking-tight text-balance sm:text-8xl">
            Úklid, který dává <em className="text-moss">smysl</em>
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
