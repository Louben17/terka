'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [citaty, setCitaty] = useState([])
  const [aktualniCitat, setAktualniCitat] = useState(null)
  const [loading, setLoading] = useState(true)

  // Načtení všech citátů z databáze
  const nactiCitaty = async () => {
    try {
      const { data, error } = await supabase
        .from('citaty')
        .select('*')
      
      if (error) throw error
      
      setCitaty(data || [])
      if (data && data.length > 0) {
        zobrazNahodnyC(data)
      }
    } catch (error) {
      console.error('Chyba při načítání citátů:', error)
    } finally {
      setLoading(false)
    }
  }

  // Zobrazení náhodného citátu
  const zobrazNahodnyC = (citatyArray = citaty) => {
    if (citatyArray.length > 0) {
      const nahodnyIndex = Math.floor(Math.random() * citatyArray.length)
      setAktualniCitat(citatyArray[nahodnyIndex])
    }
  }

  // Načtení citátů při prvním načtení
  useEffect(() => {
    nactiCitaty()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Načítám tipy...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            🏠 Úklidové tipy pro domácnost
          </h1>
          
          {aktualniCitat && (
            <div className="mb-8">
              <div className="bg-indigo-50 rounded-lg p-6 mb-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {aktualniCitat.text}
                </p>
              </div>
              
              <button 
                onClick={() => zobrazNahodnyC()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                ✨ Další tip
              </button>
            </div>
          )}
          
          <div className="text-sm text-gray-500 mt-8">
            Celkem tipů: {citaty.length}
          </div>
        </div>
      </div>
    </div>
  )
}