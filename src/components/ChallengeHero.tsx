'use client'

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Check, Pause, Play, Share2, Sun } from 'lucide-react'
import { Bubbles } from './Bubbles'

const AUTOPLAY_MS = 9000
const DONE_KEY = 'ug-splnene-vyzvy'

// --- Splněné výzvy v localStorage (useSyncExternalStore kvůli hydrataci) ---
const doneListeners = new Set<() => void>()

function readDone() {
  try {
    return localStorage.getItem(DONE_KEY) ?? '[]'
  } catch {
    return '[]'
  }
}

function subscribeDone(callback: () => void) {
  doneListeners.add(callback)
  window.addEventListener('storage', callback)
  return () => {
    doneListeners.delete(callback)
    window.removeEventListener('storage', callback)
  }
}

function writeDone(list: string[]) {
  try {
    localStorage.setItem(DONE_KEY, JSON.stringify(list))
  } catch {
    // privátní režim – nevadí, jen se nic neuloží
  }
  doneListeners.forEach((l) => l())
}

function parseDone(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

// --- Míchání: zamíchaný „balíček“, ať se výzvy neopakují, dokud se neprojdou všechny ---
function shuffledDeck(length: number, exclude: number) {
  const deck = Array.from({ length }, (_, i) => i).filter((i) => i !== exclude)
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

interface Burst {
  id: number
  x: number
  y: number
  size: number
}

export function ChallengeHero({
  vyzvy,
  dailyIndex,
  dateLabel,
}: {
  vyzvy: string[]
  dailyIndex: number
  dateLabel: string
}) {
  const [index, setIndex] = useState(dailyIndex)
  // První vykreslení bez animace – text výzvy je hned vidět (rychlejší LCP pro Google).
  const [animate, setAnimate] = useState(false)
  const [history, setHistory] = useState<number[]>([])
  const [autoplay, setAutoplay] = useState(false)
  const [bursts, setBursts] = useState<Burst[]>([])
  const [copied, setCopied] = useState(false)
  const deckRef = useRef<number[]>([])

  const doneRaw = useSyncExternalStore(subscribeDone, readDone, () => '[]')
  const done = useMemo(() => parseDone(doneRaw), [doneRaw])

  const text = vyzvy[index] ?? ''
  const isDaily = index === dailyIndex
  const isDone = done.includes(text)
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text])

  const next = useCallback(() => {
    if (vyzvy.length < 2) return
    if (deckRef.current.length === 0) deckRef.current = shuffledDeck(vyzvy.length, index)
    const nextIndex = deckRef.current.pop()!
    setHistory((h) => [...h.slice(-30), index])
    setAnimate(true)
    setIndex(nextIndex)
  }, [index, vyzvy.length])

  const prev = useCallback(() => {
    if (history.length === 0) return
    setAnimate(true)
    setIndex(history[history.length - 1])
    setHistory(history.slice(0, -1))
  }, [history])

  const backToDaily = () => {
    setHistory((h) => [...h, index])
    setAnimate(true)
    setIndex(dailyIndex)
  }

  const toggleDone = () => {
    if (isDone) {
      writeDone(done.filter((t) => t !== text))
      return
    }
    writeDone([...done, text])
    const now = Date.now()
    const newBursts = Array.from({ length: 14 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 14 + Math.random() * 0.4
      const distance = 70 + Math.random() * 90
      return {
        id: now + i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 30,
        size: 8 + Math.random() * 22,
      }
    })
    setBursts(newBursts)
    setTimeout(() => setBursts([]), 1400)
  }

  const share = async () => {
    const shareText = `Dnešní úklidová výzva: „${text}“ ✨`
    const url = window.location.origin
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Úklidová Guru', text: shareText, url })
      } else {
        await navigator.clipboard.writeText(`${shareText}\n${url}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch {
      // uživatel sdílení zrušil
    }
  }

  // Automatické střídání
  useEffect(() => {
    if (!autoplay) return
    const id = setTimeout(next, AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [autoplay, index, next])

  // Klávesy ← →
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('input, textarea, [contenteditable]')) return
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  // Kratší výzvy můžou být větší
  const sizeClass =
    text.length < 40
      ? 'text-[clamp(2.6rem,7.5vw,6.5rem)]'
      : text.length < 80
        ? 'text-[clamp(2.2rem,5.8vw,5rem)]'
        : 'text-[clamp(1.9rem,4.4vw,3.8rem)]'

  return (
    <section id="vyzva" className="relative flex min-h-svh flex-col overflow-hidden">
      <Bubbles />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 pt-32 pb-12 text-center sm:px-6">
        <h1 className="mb-5 text-xs font-medium tracking-[0.25em] text-ink-soft uppercase">
          Úklidové výzvy na každý den
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-1.5 text-sm text-ink-soft"
        >
          <span className="flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 text-xs font-medium tracking-wide text-cream uppercase">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-sage opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-sage" />
            </span>
            {isDaily ? 'Výzva dne' : 'Další výzva'}
          </span>
          <span className="first-letter:uppercase">{dateLabel}</span>
        </motion.div>

        <div className="relative mt-10 flex min-h-[40vh] w-full items-center justify-center sm:min-h-[44vh]">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              className={`max-w-5xl font-serif leading-[1.02] tracking-[-0.02em] text-balance text-ink ${sizeClass}`}
              aria-live="polite"
              exit={{ opacity: 0, y: -16, filter: 'blur(10px)', transition: { duration: 0.3 } }}
            >
              {words.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  className="inline-block"
                  initial={animate ? { opacity: 0, y: 24, filter: 'blur(14px)' } : false}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                >
                  {i === words.length - 1 ? <em className="text-moss">{word}</em> : word}
                  {i < words.length - 1 && ' '}
                </motion.span>
              ))}
            </motion.p>
          </AnimatePresence>
        </div>

        <p className="mt-6 font-mono text-xs tracking-[0.2em] text-ink-soft/70 uppercase">
          № {String(index + 1).padStart(3, '0')} / {String(vyzvy.length).padStart(3, '0')}
        </p>

        {/* Ovládání */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            type="button"
            onClick={prev}
            disabled={history.length === 0}
            className="glass flex size-12 items-center justify-center rounded-full text-ink transition-all hover:scale-105 disabled:pointer-events-none disabled:opacity-40"
            aria-label="Předchozí výzva"
          >
            <ArrowLeft size={18} />
          </button>

          <button
            type="button"
            onClick={next}
            className="group flex h-12 items-center gap-3 rounded-full bg-ink pr-2 pl-6 text-cream shadow-[0_12px_30px_-10px_rgb(24_33_28/0.6)] transition-all hover:bg-moss hover:shadow-[0_16px_36px_-10px_rgb(44_70_54/0.7)]"
          >
            Další výzva
            <span className="flex size-8 items-center justify-center rounded-full bg-cream text-ink transition-transform duration-500 group-hover:rotate-[-45deg]">
              <ArrowRight size={16} />
            </span>
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={toggleDone}
              aria-pressed={isDone}
              className={`flex h-12 items-center gap-2 rounded-full px-5 transition-all hover:scale-[1.03] ${
                isDone ? 'bg-sage text-ink' : 'glass text-ink'
              }`}
            >
              <motion.span
                key={String(isDone)}
                initial={{ scale: 0.4, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className={`flex size-5 items-center justify-center rounded-full border ${
                  isDone ? 'border-ink bg-ink text-cream' : 'border-ink/40'
                }`}
              >
                {isDone && <Check size={12} strokeWidth={3} />}
              </motion.span>
              {isDone ? 'Splněno!' : 'Splněno'}
            </button>
            <AnimatePresence>
              {bursts.map((b) => (
                <motion.span
                  key={b.id}
                  className="bubble pointer-events-none absolute top-1/2 left-1/2"
                  style={{ width: b.size, height: b.size, marginLeft: -b.size / 2, marginTop: -b.size / 2 }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.3 }}
                  animate={{ x: b.x, y: b.y, opacity: 0, scale: 1 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              ))}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={share}
            className="glass relative flex size-12 items-center justify-center rounded-full text-ink transition-all hover:scale-105"
            aria-label="Sdílet výzvu"
          >
            {copied ? <Check size={18} /> : <Share2 size={18} />}
          </button>

          <button
            type="button"
            onClick={() => setAutoplay((a) => !a)}
            aria-pressed={autoplay}
            className="glass relative flex size-12 items-center justify-center rounded-full text-ink transition-all hover:scale-105"
            aria-label={autoplay ? 'Zastavit automatické střídání' : 'Spustit automatické střídání'}
            title={autoplay ? 'Zastavit střídání' : 'Střídat výzvy automaticky'}
          >
            {autoplay && (
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
                <motion.circle
                  key={index}
                  cx="24"
                  cy="24"
                  r="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-moss"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                />
              </svg>
            )}
            {autoplay ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </motion.div>

        <div className="mt-6 h-6 text-sm text-ink-soft">
          {!isDaily ? (
            <button
              type="button"
              onClick={backToDaily}
              className="inline-flex items-center gap-1.5 underline-offset-4 hover:text-ink hover:underline"
            >
              <Sun size={14} /> Zpět na výzvu dne
            </button>
          ) : done.length > 0 ? (
            <span>
              Splněných výzev: <strong className="font-semibold text-ink">{done.length}</strong> 🌿
            </span>
          ) : null}
        </div>
      </div>

      {/* Spodní lišta */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-end justify-center px-6 pb-8 sm:justify-between text-xs text-ink-soft">
        <Link href="/uklidove-vyzvy" className="hidden underline-offset-4 hover:text-ink hover:underline sm:block">
          Všech {vyzvy.length} výzev →
        </Link>
        <a href="#jak-to-funguje" className="group flex flex-col items-center gap-2 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
          <span className="tracking-[0.2em] uppercase">Scroll</span>
          <span className="flex h-9 w-5 justify-center rounded-full border border-ink/30 pt-1.5">
            <motion.span
              className="block h-2 w-1 rounded-full bg-ink/60"
              animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </a>
        <span className="hidden items-center gap-1.5 sm:flex">
          <kbd className="glass rounded-md px-1.5 py-0.5 font-sans">←</kbd>
          <kbd className="glass rounded-md px-1.5 py-0.5 font-sans">→</kbd>
          listování
        </span>
      </div>
    </section>
  )
}
