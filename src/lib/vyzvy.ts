import 'server-only'
import { fallbackVyzvy } from '@/data/fallback-vyzvy'
import { fetchVyzvyPublic, isSupabaseConfigured } from './supabase'

/** Vrátí texty všech výzev. Když Supabase selže nebo není nastavená, použije záložní seznam. */
export async function getVyzvy(): Promise<string[]> {
  if (!isSupabaseConfigured()) return fallbackVyzvy

  try {
    const data = await fetchVyzvyPublic()
    const texts = data.map((v) => v.text?.trim()).filter((t): t is string => Boolean(t))
    return texts.length > 0 ? texts : fallbackVyzvy
  } catch (error) {
    console.error('Načtení výzev ze Supabase selhalo, používám záložní seznam:', error)
    return fallbackVyzvy
  }
}

/** Datum v Praze ve tvaru YYYY-MM-DD – podle něj se vybírá „výzva dne“. */
export function pragueDateKey(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Prague' }).format(date)
}
