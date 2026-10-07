'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { navLinks, site } from '@/data/site'
import { InstagramIcon } from './InstagramIcon'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`glass mx-auto flex max-w-5xl items-center justify-between rounded-full py-2 pr-2 pl-5 transition-all duration-500 ${
          scrolled ? 'shadow-lg' : 'shadow-none'
        }`}
        aria-label="Hlavní navigace"
      >
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="bubble block size-7 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
          <span className="font-serif text-xl tracking-tight text-ink">
            úklidová <em className="text-moss">guru</em>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-ink-soft transition-colors hover:bg-white/70 hover:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm text-cream transition-all hover:bg-moss hover:shadow-lg"
          >
            <InstagramIcon size={16} />
            <span className="hidden sm:inline">{site.instagramHandle}</span>
            <span className="sr-only sm:hidden">Instagram</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-white/70 md:hidden"
            aria-label={open ? 'Zavřít menu' : 'Otevřít menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="glass mx-auto mt-2 max-w-5xl rounded-3xl p-3 md:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 font-serif text-2xl text-ink transition-colors hover:bg-white/70"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
