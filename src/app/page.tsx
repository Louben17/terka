'use client'

import { useState, useEffect, useCallback } from 'react'
import { Instagram, X } from 'lucide-react'
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
  const [showModal, setShowModal] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detekce mobilního zařízení
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  // Zobrazení náhodného citátu
  const zobrazNahodnyC = useCallback((citatyArray: Citat[] = citaty) => {
    if (citatyArray.length > 0) {
      const nahodnyIndex = Math.floor(Math.random() * citatyArray.length)
      setAktualniCitat(citatyArray[nahodnyIndex])
    }
  }, [])

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
  }, [])

  // Načtení citátů při prvním načtení
  useEffect(() => {
    nactiCitaty()
  }, [nactiCitaty])

  const handleMainClick = () => {
    window.location.reload()
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
            Klikni pro nový citát
          </div>
          
          <div className="fixed bottom-8 left-8 text-sm text-gray-400 font-serif">
            {citaty.length} citátů
          </div>

          {/* Desktop - tlačítko pro více informací */}
          {!isMobile && (
            <button
              onClick={handleInfoClick}
              className="fixed top-8 right-8 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 text-gray-700 hover:bg-white hover:shadow-lg transition-all duration-200 text-sm font-serif"
            >
              Více informací
            </button>
          )}
        </div>
      </div>

      {/* Modal pro desktop */}
      {showModal && !isMobile && (
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