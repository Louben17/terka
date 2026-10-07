import 'server-only'

// Tenký klient nad Supabase REST API (PostgREST) – bez SDK, funguje s cache v Next.js.

const TABLE = 'terka'

export interface Vyzva {
  text: string
  autor: string | null
}

function config(role: 'anon' | 'service') {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    role === 'service'
      ? process.env.SUPABASE_SERVICE_ROLE_KEY
      : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return { url: `${url.replace(/\/$/, '')}/rest/v1/${TABLE}`, key }
}

export function isSupabaseConfigured(role: 'anon' | 'service' = 'anon') {
  return config(role) !== null
}

async function request<T>(
  role: 'anon' | 'service',
  query: string,
  init: RequestInit & { next?: { revalidate?: number; tags?: string[] } } = {}
): Promise<T> {
  const cfg = config(role)
  if (!cfg) throw new Error('Supabase není nakonfigurovaná (chybí env proměnné).')

  const res = await fetch(`${cfg.url}${query}`, {
    ...init,
    headers: {
      apikey: cfg.key,
      Authorization: `Bearer ${cfg.key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      ...init.headers,
    },
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Supabase ${res.status}: ${body}`)
  }
  return (await res.json()) as T
}

/** Veřejné čtení výzev (anon klíč), cachované a invalidované tagem `vyzvy`. */
export function fetchVyzvyPublic() {
  return request<Vyzva[]>('anon', '?select=text,autor', {
    next: { revalidate: 300, tags: ['vyzvy'] },
  })
}

/** Admin operace (service role klíč) – nikdy necachované. */
export const adminVyzvy = {
  list: () => request<Vyzva[]>('service', '?select=text,autor', { cache: 'no-store' }),

  insert: (text: string) =>
    request<Vyzva[]>('service', '', {
      method: 'POST',
      body: JSON.stringify([{ text, autor: null }]),
      cache: 'no-store',
    }),

  update: (originalText: string, newText: string) =>
    request<Vyzva[]>('service', `?text=eq.${encodeURIComponent(originalText)}`, {
      method: 'PATCH',
      body: JSON.stringify({ text: newText }),
      cache: 'no-store',
    }),

  remove: (text: string) =>
    request<Vyzva[]>('service', `?text=eq.${encodeURIComponent(text)}`, {
      method: 'DELETE',
      cache: 'no-store',
    }),
}
