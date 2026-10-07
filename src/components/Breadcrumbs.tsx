import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { absoluteUrl } from '@/data/site'
import { JsonLd } from './JsonLd'

export interface Crumb {
  name: string
  href: string
}

// Viditelná drobečková navigace + BreadcrumbList pro Google.
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: 'Úvod', href: '/' }, ...items]
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: all.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.name,
            item: absoluteUrl(c.href),
          })),
        }}
      />
      <nav aria-label="Drobečková navigace">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-soft">
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={14} className="text-ink-soft/50" aria-hidden="true" />}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-ink">
                  {c.name}
                </span>
              ) : (
                <Link href={c.href} className="transition-colors hover:text-ink">
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
