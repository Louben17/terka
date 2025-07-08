'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

interface Citat {
  id: number
  text: string
  autor: string | null
  created_at: string
}

export default function Home() {
  const [citaty, setCitaty] = useState<Citat[]>([])
  const [aktualniCitat, setAktualniCitat] = useState<Citat | null>(null)
  const [loading, setLoading] = useState(true)

  // Zobrazení náhodného citátu
  const zobrazNahodnyC = useCallback((citatyArray: Citat[] = citaty) => {
    if (citatyArray.length > 0) {
      const nahodnyIndex = Math.floor(Math.random() * citatyArray.length)
      setAktualniCitat(citatyArray[nahodnyIndex])
    }
  }, [citaty])

  // Načtení všech citátů z databáze
  const nactiCitaty = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('terka')
        .select('*')
      
      if (error) throw error
      
      const citatyData = data as Citat[] || []
      setCitaty(citatyData)
      if (citatyData && citatyData.length > 0) {
        zobrazNahodnyC(citatyData)
      }
    } catch (error) {
      console.error('Chyba při načítání citátů:', error)
    } finally {
      setLoading(false)
    }
  }, [zobrazNahodnyC])

  // Načtení citátů při prvním načtení
  useEffect(() => {
    nactiCitaty()
  }, [nactiCitaty])



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        <div className="text-center">
          <div className="animate-pulse text-gray-400 text-lg font-serif">
            Načítám...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center p-8 cursor-pointer"
      onClick={() => window.location.reload()}
    >
      <div className="max-w-4xl w-full text-center">
        {aktualniCitat && (
          <div className="transition-all duration-1000 ease-in-out">
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif text-gray-700 leading-relaxed mb-8 italic">
              &ldquo;{aktualniCitat.text}&rdquo;
            </blockquote>
            
            {aktualniCitat.autor && (
              <cite className="text-lg md:text-xl font-serif text-gray-500 not-italic">
                — {aktualniCitat.autor}
              </cite>
            )}
          </div>
        )}
        
        <div className="fixed bottom-8 right-8 text-sm text-gray-400 font-serif">
          Klikni kamkoliv pro nový citát
        </div>
        
        <div className="fixed bottom-8 left-8 text-sm text-gray-400 font-serif">
          {citaty.length} citátů
        </div>
      </div>
    </div>
  )
}