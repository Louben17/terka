import Link from 'next/link'
import Image from 'next/image'
import { navLinks, site } from '@/data/site'
import { InstagramIcon } from './InstagramIcon'
import { LogoMark } from './LogoMark'

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pt-16 pb-10 sm:px-6">
      <div className="relative flex min-h-[28rem] items-end overflow-hidden rounded-[2.5rem] bg-moss-deep p-8 sm:min-h-[36rem] sm:p-14">
        <Image
          src="/images/paticka-domov.jpg"
          alt="Uklizený obývací pokoj v podvečerním světle"
          fill
          sizes="(min-width: 1152px) 1104px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/45 via-ink/10 to-transparent" />
        <div className="relative">
          <p className="font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] tracking-tight text-balance text-cream">
            Jedna výzva. <em className="text-mint">Jedna malá změna.</em>
          </p>
          <Link
            href="/#vyzva"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-ink transition hover:bg-white"
          >
            Ukaž mi dnešní výzvu
          </Link>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-8 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark className="size-8 text-lg" />
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
