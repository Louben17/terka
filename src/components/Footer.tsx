import Link from 'next/link'
import { navLinks, site } from '@/data/site'
import { InstagramIcon } from './InstagramIcon'

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pt-24 pb-10 sm:px-6">
      <p className="font-serif text-[clamp(3rem,9vw,8rem)] leading-[0.95] tracking-tight text-balance">
        Jedna výzva. <em className="text-moss">Jedna malá změna.</em>
      </p>

      <div className="mt-16 flex flex-col gap-8 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="bubble block size-7" />
          <span className="font-serif text-xl">
            úklidová <em className="text-moss">guru</em>
          </span>
        </Link>

        <nav aria-label="Patička">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-ink"
              >
                <InstagramIcon size={14} /> Instagram
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <p className="mt-8 text-xs text-ink-soft/70">
        © {new Date().getFullYear()} Úklidová Guru · Tereza · Uklízej vědomě a s radostí.
      </p>
    </footer>
  )
}
