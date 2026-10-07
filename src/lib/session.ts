// Podepsaná admin session (HMAC-SHA256 přes Web Crypto) – funguje v proxy i v route handlerech.
// Cookie má tvar `<expirace>.<podpis>`, takže ji nejde podvrhnout bez znalosti tajného klíče.

export const SESSION_COOKIE = 'admin-session'
export const SESSION_MAX_AGE = 60 * 60 * 24 // 24 hodin (v sekundách)

const encoder = new TextEncoder()

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || ''
}

async function getKey(secret: string) {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  )
}

function toBase64Url(buf: ArrayBuffer) {
  let bin = ''
  for (const b of new Uint8Array(buf)) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(str: string) {
  const bin = atob(str.replace(/-/g, '+').replace(/_/g, '/'))
  return Uint8Array.from(bin, (c) => c.charCodeAt(0))
}

export async function createSessionToken() {
  const secret = getSecret()
  if (!secret) throw new Error('Chybí ADMIN_SESSION_SECRET.')
  const expires = String(Date.now() + SESSION_MAX_AGE * 1000)
  const signature = await crypto.subtle.sign('HMAC', await getKey(secret), encoder.encode(expires))
  return `${expires}.${toBase64Url(signature)}`
}

export async function verifySessionToken(token: string | undefined) {
  const secret = getSecret()
  if (!token || !secret) return false

  const [expires, signature] = token.split('.')
  if (!expires || !signature || Number(expires) < Date.now()) return false

  try {
    return await crypto.subtle.verify(
      'HMAC',
      await getKey(secret),
      fromBase64Url(signature),
      encoder.encode(expires)
    )
  } catch {
    return false
  }
}
