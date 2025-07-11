'use client'

import { useState, useEffect, useCallback } from 'react'
import { Instagram, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Vyzva {
  id: number
  text: string
  autor: string | null
  created_at: string
}

export default function Home() {
  const [vyzvy, setVyzvy] = useState<Vyzva[]>([])
  const [aktualniVyzva, setAktualniVyzva] = useState<Vyzva | null>(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  // Zobrazení náhodné výzvy
  const zobrazNahodnouVyzvu = useCallback((vyzvaArray?: Vyzva[]) => {
    const poleKPoužití = vyzvaArray || vyzvy
    if (poleKPoužití.length > 0) {
      const nahodnyIndex = Math.floor(Math.random() * poleKPoužití.length)
      setAktualniVyzva(poleKPoužití[nahodnyIndex])
    }
  }, [vyzvy])

  // Načtení všech výzev z databáze
  const nactiVyzvy = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('terka')
        .select('*')
      
      if (error) throw error
      
      const vyzvaData = data as Vyzva[] || []
      setVyzvy(vyzvaData)
      if (vyzvaData && vyzvaData.length > 0) {
        const nahodnyIndex = Math.floor(Math.random() * vyzvaData.length)
        setAktualniVyzva(vyzvaData[nahodnyIndex])
      }
    } catch (error) {
      console.error('Chyba při načítání výzev:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Načtení výzev při prvním načtení
  useEffect(() => {
    nactiVyzvy()
  }, [nactiVyzvy])

  const handleMainClick = () => {
    zobrazNahodnouVyzvu()
  }

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowModal(true)
  }

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const closeModal = () => {
    setShowModal(false)
  }

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
    <>
      <div 
        className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center p-8 cursor-pointer"
        onClick={handleMainClick}
      >
        <div className="max-w-4xl w-full text-center">
          {aktualniVyzva && (
            <div className="transition-all duration-1000 ease-in-out">
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif text-gray-700 leading-relaxed mb-8 italic">
                &ldquo;{aktualniVyzva.text}&rdquo;
              </blockquote>
              
              {aktualniVyzva.autor && (
                <cite className="text-lg md:text-xl font-serif text-gray-500 not-italic">
                  — {aktualniVyzva.autor}
                </cite>
              )}
            </div>
          )}
          
          <div className="fixed bottom-8 right-8 text-sm text-gray-400 font-serif">
            Klikni pro novou výzvu
          </div>
          
          <div className="fixed bottom-8 left-8 text-sm text-gray-400 font-serif">
            {vyzvy.length} výzev
          </div>

          {/* Tlačítka pro více informací a Instagram */}
          <div className="fixed top-8 right-8 flex items-center gap-3">
            <button
              onClick={handleInfoClick}
              className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 text-gray-700 hover:bg-white hover:shadow-lg transition-all duration-200 text-sm font-serif"
            >
              Více informací
            </button>
            
            <a
              href="https://www.instagram.com/uklidovaguru/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full p-2 text-gray-700 hover:bg-white hover:shadow-lg transition-all duration-200"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Modal pro desktop i mobil */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-gray-100"
            onClick={handleModalClick}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="text-center mb-6">
              <h2 className="text-3xl font-serif text-gray-800 mb-4">
                🌿 Úklidová Guru
              </h2>
              
              <div className="text-lg font-serif text-gray-700 leading-relaxed space-y-4">
                <p className="font-semibold">
                  Vítejte na místě, kde se úklid, ekologie a radost z pořádku setkávají v dokonalé harmonii.
                </p>
                
                <p>
                  Jsem Tereza a mám vášeň pro úklidová videa, zkoumání složení čisticích prostředků a hledání způsobů, jak udržet domov čistý s minimálním dopadem na přírodu. Nejsem perfektní hospodyňka, ale milovník pořádku, vůně čerstvě uklizeného prostoru a pocitu, že dělám něco dobrého pro sebe i pro naši planetu.
                </p>
                
                <p>
                  Na Instagramu mě možná znáte jako @uklidovaguru, kde sdílím malé krůčky vedoucí k velkým změnám. Testuji přírodní čističe, vytvářím jednoduché rutiny a sdílím, co opravdu funguje. Úklid není jen o lesku a třpytu – je to cesta k vytvoření prostředí, kde se cítíme skvěle.
                </p>
                
                <p>
                  Tento web není e-shop ani nekonečný blog. Je to útočiště pro všechny, kdo chtějí uklízet vědomě a s radostí. Vyberte si, co vás osloví, a udělejte si doma krásně. Jedna myšlenka. Jedna výzva. Jedna malá změna, která má smysl. Rozhlédněte se a nechte se inspirovat.
                </p>
              </div>
              
              <div className="mt-8">
                <a
                  href="https://www.instagram.com/uklidovaguru/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-serif hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
                >
                  <Instagram size={20} />
                  @uklidovaguru
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}