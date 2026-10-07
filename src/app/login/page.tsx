'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Lock } from 'lucide-react'
import { Bubbles } from '@/components/Bubbles'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (response.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const data = await response.json().catch(() => ({}))
        setError(data.error || 'Nesprávné přihlašovací údaje')
      }
    } catch {
      setError('Chyba při přihlašování')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full rounded-2xl border border-line bg-white/70 px-4 py-3 text-ink outline-none transition focus:border-moss focus:ring-4 focus:ring-sage/30'

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden p-4">
      <Bubbles dim />
      <div className="glass relative w-full max-w-md rounded-[2rem] p-8 sm:p-10">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-ink text-cream">
          <Lock size={20} />
        </span>
        <h1 className="mt-6 font-serif text-4xl tracking-tight">
          Administrace <em className="text-moss">výzev</em>
        </h1>
        <p className="mt-2 text-ink-soft">Úklidová Guru</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="username" className="mb-1.5 block text-sm text-ink-soft">
              Uživatelské jméno
            </label>
            <input
              id="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm text-ink-soft">
              Heslo
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          {error && <p className="rounded-xl bg-blush/70 px-4 py-2 text-sm text-[#7a3a27]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-ink py-3.5 text-cream transition hover:bg-moss disabled:opacity-50"
          >
            {loading ? 'Přihlašuji…' : 'Přihlásit se'}
          </button>
        </form>

        <Link href="/" className="mt-8 inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink">
          <ArrowLeft size={14} /> Zpět na web
        </Link>
      </div>
    </main>
  )
}
