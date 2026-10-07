'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Check, ExternalLink, LogOut, Pencil, Plus, Search, Trash2, X } from 'lucide-react'

interface Vyzva {
  text: string
  autor: string | null
}

// Tabulka nemá ID sloupec, výzvy se proto identifikují svým textem.
export default function AdminPage() {
  const [vyzvy, setVyzvy] = useState<Vyzva[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [newVyzva, setNewVyzva] = useState('')
  const [editing, setEditing] = useState<{ original: string; text: string } | null>(null)
  const [query, setQuery] = useState('')
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const api = useCallback(
    async (method: string, body?: unknown) => {
      const response = await fetch('/api/admin/vyzvy', {
        method,
        headers: body ? { 'Content-Type': 'application/json' } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      })
      if (response.status === 401) {
        router.push('/login')
        throw new Error('Nepřihlášeno')
      }
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || 'Neznámá chyba')
      return data
    },
    [router]
  )

  const load = useCallback(async () => {
    try {
      setVyzvy(await api('GET'))
      setError('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Chyba při načítání')
    } finally {
      setLoading(false)
    }
  }, [api])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- načtení dat při otevření stránky
    load()
  }, [load])

  const run = async (action: () => Promise<unknown>) => {
    setSaving(true)
    try {
      await action()
      await load()
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Chyba')
    } finally {
      setSaving(false)
    }
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newVyzva.trim()) return
    run(async () => {
      await api('POST', { text: newVyzva })
      setNewVyzva('')
    })
  }

  const handleSave = () => {
    if (!editing?.text.trim()) return
    run(async () => {
      await api('PUT', { originalText: editing.original, newText: editing.text })
      setEditing(null)
    })
  }

  const handleDelete = (text: string) => {
    if (!confirm('Opravdu chcete smazat tuto výzvu?')) return
    run(() => api('DELETE', { text }))
  }

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' }).catch(() => {})
    router.push('/login')
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return vyzvy.map((v, i) => ({ ...v, poradi: i + 1 })).filter((v) => !q || v.text.toLowerCase().includes(q))
  }, [vyzvy, query])

  const textareaClass =
    'w-full resize-none rounded-2xl border border-line bg-white px-4 py-3 outline-none transition focus:border-moss focus:ring-4 focus:ring-sage/30'

  return (
    <main className="min-h-svh px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <header className="flex flex-col gap-4 rounded-[2rem] bg-moss-deep p-6 text-cream sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h1 className="font-serif text-4xl tracking-tight">
              Administrace <em className="text-sage">výzev</em>
            </h1>
            <p className="mt-1 text-cream/70">{loading ? 'Načítám…' : `${vyzvy.length} výzev celkem`}</p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 rounded-full bg-cream/10 px-4 py-2 text-sm transition hover:bg-cream/20"
            >
              <ExternalLink size={14} /> Web
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm text-ink transition hover:bg-white"
            >
              <LogOut size={14} /> Odhlásit
            </button>
          </div>
        </header>

        {error && <p className="mt-6 rounded-2xl bg-blush px-5 py-3 text-sm text-[#7a3a27]">{error}</p>}

        <form onSubmit={handleAdd} className="mt-6 rounded-[2rem] border border-line bg-paper p-6 sm:p-8">
          <h2 className="flex items-center gap-2 font-serif text-2xl">
            <Plus size={20} /> Nová výzva
          </h2>
          <textarea
            value={newVyzva}
            onChange={(e) => setNewVyzva(e.target.value)}
            placeholder="Např. Vytři prach na parapetech a zalij květiny."
            className={`${textareaClass} mt-4`}
            rows={2}
            required
          />
          <button
            type="submit"
            disabled={saving || !newVyzva.trim()}
            className="mt-3 rounded-full bg-ink px-6 py-2.5 text-cream transition hover:bg-moss disabled:opacity-40"
          >
            {saving ? 'Ukládám…' : 'Přidat výzvu'}
          </button>
        </form>

        <section className="mt-6 rounded-[2rem] border border-line bg-paper p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-serif text-2xl">Všechny výzvy</h2>
            <label className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm">
              <Search size={14} className="text-ink-soft" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Hledat…"
                className="w-40 bg-transparent outline-none"
              />
            </label>
          </div>

          {loading ? (
            <div className="mt-6 space-y-3">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="h-16 animate-pulse rounded-2xl bg-line/60" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="py-10 text-center text-ink-soft">Žádné výzvy.</p>
          ) : (
            <ul className="mt-6 divide-y divide-line">
              {filtered.map((v) => (
                <li key={`${v.text}-${v.poradi}`} className="py-4">
                  {editing?.original === v.text ? (
                    <div className="space-y-3">
                      <textarea
                        value={editing.text}
                        onChange={(e) => setEditing({ ...editing, text: e.target.value })}
                        className={textareaClass}
                        rows={2}
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSave}
                          disabled={saving}
                          className="flex items-center gap-1.5 rounded-full bg-moss px-4 py-1.5 text-sm text-cream disabled:opacity-50"
                        >
                          <Check size={14} /> Uložit
                        </button>
                        <button
                          onClick={() => setEditing(null)}
                          className="flex items-center gap-1.5 rounded-full bg-line px-4 py-1.5 text-sm"
                        >
                          <X size={14} /> Zrušit
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="group flex items-start gap-4">
                      <span className="mt-0.5 w-8 shrink-0 font-mono text-xs text-ink-soft/60">{v.poradi}</span>
                      <p className="flex-1 leading-relaxed">{v.text}</p>
                      <div className="flex shrink-0 gap-1 opacity-60 transition group-hover:opacity-100">
                        <button
                          onClick={() => setEditing({ original: v.text, text: v.text })}
                          className="rounded-full p-2 hover:bg-mint"
                          aria-label="Upravit"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(v.text)}
                          className="rounded-full p-2 text-[#a4533b] hover:bg-blush"
                          aria-label="Smazat"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}
