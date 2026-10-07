import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Clock } from 'lucide-react'
import { type Clanek, formatDatum } from '@/data/clanky'

export function ArticleCover({
  clanek,
  className = '',
  sizes = '(min-width: 1024px) 560px, 100vw',
  priority = false,
}: {
  clanek: Clanek
  className?: string
  sizes?: string
  priority?: boolean
}) {
  return (
    <div className={`cover-${clanek.motiv} relative overflow-hidden ${className}`}>
      <Image
        src={clanek.obrazek}
        alt={clanek.obrazekAlt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  )
}

export function ArticleCard({
  clanek,
  featured = false,
  horizontal = false,
}: {
  clanek: Clanek
  featured?: boolean
  horizontal?: boolean
}) {
  return (
    <Link
      href={`/clanky/${clanek.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-paper transition-colors duration-500 hover:border-sage ${
        horizontal ? 'sm:flex-row' : ''
      }`}
    >
      <div
        className={`overflow-hidden ${horizontal ? 'sm:w-2/5 sm:shrink-0' : ''} ${featured ? 'lg:min-h-80 lg:flex-1' : ''}`}
      >
        <ArticleCover
          clanek={clanek}
          className={`transition-transform duration-700 group-hover:scale-105 ${
            featured
              ? 'aspect-[16/9] lg:aspect-auto lg:h-full'
              : horizontal
                ? 'aspect-[4/3] sm:aspect-auto sm:h-full'
                : 'aspect-[4/3]'
          }`}
        />
      </div>
      <div className={`flex flex-col p-6 sm:p-7 ${featured ? 'flex-1 lg:flex-none' : 'flex-1'}`}>
        <div className="flex items-center gap-3 text-xs text-ink-soft">
          <span className="rounded-full bg-mint px-3 py-1 font-medium text-moss">{clanek.kategorie}</span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {clanek.minutCteni} min
          </span>
        </div>
        <h3
          className={`mt-4 font-serif leading-[1.1] tracking-tight text-balance ${featured ? 'text-4xl sm:text-5xl' : 'text-3xl'}`}
        >
          {clanek.titulek}
        </h3>
        <p className="mt-3 leading-relaxed text-ink-soft">{clanek.perex}</p>
        <div className="mt-auto flex items-center justify-between pt-6 text-sm">
          <time dateTime={clanek.datum} className="text-ink-soft">
            {formatDatum(clanek.datum)}
          </time>
          <span className="flex size-10 items-center justify-center rounded-full bg-ink text-cream transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </Link>
  )
}
