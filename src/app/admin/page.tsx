'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Edit2, Trash2, LogOut, Save, X } from 'lucide-react'

interface Vyzva {
  text: string
  autor: string | null
  // Bez ID - budeme používat text jako identifikátor
}

export default function AdminPage() {
  const [vyzvy, setVyzvy] = useState<Vyzva[]>([])
  const [loading, setLoading] = useState(true)
  const [newVyzva, setNewVyzva] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState('')
  const [editingOriginalText, setEditingOriginalText] = useState('') // Pro identifikaci při editaci
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  // Načtení výzev
  const loadVyzvy = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/vyzvy')
      if (response.status === 401) {
        router.push('/login')
        return
      }
      if (response.ok) {
        const data = await response.json()
        setVyzvy(data)
      }
    } catch {
      console.error('Chyba při načítání výzev')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    loadVyzvy()
  }, [loadVyzvy])

  // Přidání nové výzvy
  const handleAddVyzva = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newVyzva.trim() || saving) return

    setSaving(true)
    try {
      const response = await fetch('/api/admin/vyzvy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newVyzva }),
      })

      if (response.ok) {
        setNewVyzva('')
        loadVyzvy()
      } else {
        alert('Chyba při přidávání výzvy')
      }
    } catch {
      alert('Chyba při přidávání výzvy')
    } finally {
      setSaving(false)
    }
  }

  // Editace výzvy
  const handleEditVyzva = async (originalText: string) => {
    if (!editingText.trim() || saving) return

    setSaving(true)
    try {
      const response = await fetch('/api/admin/vyzvy', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          originalText: originalText, 
          newText: editingText 
        }),
      })

      if (response.ok) {
        setEditingId(null)
        setEditingText('')
        setEditingOriginalText('')
        loadVyzvy()
      } else {
        const errorData = await response.json()
        alert(`Chyba při aktualizaci výzvy: ${errorData.error || 'Neznámá chyba'}`)
      }
    } catch {
      alert('Chyba při aktualizaci výzvy')
    } finally {
      setSaving(false)
    }
  }

  // Smazání výzvy
  const handleDeleteVyzva = async (text: string) => {
    console.log('Delete clicked, text:', text)
    if (!confirm('Opravdu chcete smazat tuto výzvu?')) return

    try {
      const response = await fetch(`/api/admin/vyzvy`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text })
      })

      console.log('Delete response:', response.status)

      if (response.ok) {
        loadVyzvy()
      } else {
        const errorData = await response.json()
        console.error('Delete error response:', errorData)
        alert(`Chyba při mazání výzvy: ${errorData.error || 'Neznámá chyba'}`)
      }
    } catch {
      alert('Chyba při mazání výzvy')
    }
  }

  // Odhlášení
  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' })
      router.push('/login')
    } catch {
      router.push('/login')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        <div className="text-center">
          <div className="animate-pulse text-gray-400 text-lg font-serif">
            Načítám administraci...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-serif text-gray-800 mb-2">
                🌿 Administrace výzev
              </h1>
              <p className="text-gray-600 font-serif">
                Úklidová Guru - {vyzvy.length} výzev celkem
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/"
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg font-serif text-gray-700 transition-colors"
              >
                Zobrazit web
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg font-serif transition-colors"
              >
                <LogOut size={16} />
                Odhlásit se
              </button>
            </div>
          </div>
        </div>

        {/* Formulář pro přidání nové výzvy */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-xl font-serif text-gray-800 mb-4 flex items-center gap-2">
            <Plus size={20} />
            Přidat novou výzvu
          </h2>
          
          <form onSubmit={handleAddVyzva} className="space-y-4">
            <textarea
              value={newVyzva}
              onChange={(e) => setNewVyzva(e.target.value)}
              placeholder="Zadejte text nové výzvy..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent font-serif resize-none"
              rows={3}
              required
            />
            <button
              type="submit"
              disabled={saving || !newVyzva.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-serif hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Ukládám...' : 'Přidat výzvu'}
            </button>
          </form>
        </div>

        {/* Seznam existujících výzev */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-serif text-gray-800 mb-6">
            Existující výzvy
          </h2>

          {vyzvy.length === 0 ? (
            <p className="text-gray-500 font-serif text-center py-8">
              Zatím nejsou žádné výzvy.
            </p>
          ) : (
            <div className="space-y-4">
              {vyzvy.map((vyzva, index) => (
                <div
                  key={`${vyzva.text}-${index}`}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  {editingId === vyzva.text ? (
                    // Editační režim
                    <div className="space-y-3">
                      <textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 font-serif resize-none"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditVyzva(editingOriginalText)}
                          disabled={saving}
                          className="flex items-center gap-1 bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded font-serif text-sm transition-colors"
                        >
                          <Save size={14} />
                          Uložit
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null)
                            setEditingText('')
                            setEditingOriginalText('')
                          }}
                          className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded font-serif text-sm transition-colors"
                        >
                          <X size={14} />
                          Zrušit
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Zobrazovací režim
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-gray-800 font-serif leading-relaxed mb-2">
                          &ldquo;{vyzva.text}&rdquo;
                        </p>
                        <p className="text-xs text-gray-500 font-serif">
                          Pozice: {index + 1}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => {
                            setEditingId(vyzva.text)
                            setEditingText(vyzva.text)
                            setEditingOriginalText(vyzva.text)
                          }}
                          className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded font-serif text-sm transition-colors"
                        >
                          <Edit2 size={14} />
                          Editovat
                        </button>
                        <button
                          onClick={() => handleDeleteVyzva(vyzva.text)}
                          className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded font-serif text-sm transition-colors"
                        >
                          <Trash2 size={14} />
                          Smazat
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}