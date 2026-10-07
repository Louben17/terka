import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual, createHash } from 'node:crypto'
import { SESSION_COOKIE, SESSION_MAX_AGE, createSessionToken } from '@/lib/session'

// Porovnání v konstantním čase (hashování srovná délky vstupů).
function safeEqual(a: string, b: string) {
  const ha = createHash('sha256').update(a).digest()
  const hb = createHash('sha256').update(b).digest()
  return timingSafeEqual(ha, hb)
}

export async function POST(request: NextRequest) {
  const expectedUser = process.env.ADMIN_USERNAME || 'uklidovaguru'
  const expectedPassword = process.env.ADMIN_PASSWORD

  if (!expectedPassword) {
    return NextResponse.json(
      { error: 'Administrace není nastavená – chybí proměnná ADMIN_PASSWORD.' },
      { status: 503 }
    )
  }

  try {
    const { username, password } = await request.json()
    const ok =
      typeof username === 'string' &&
      typeof password === 'string' &&
      safeEqual(username, expectedUser) &&
      safeEqual(password, expectedPassword)

    if (!ok) {
      return NextResponse.json({ error: 'Nesprávné přihlašovací údaje' }, { status: 401 })
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set(SESSION_COOKIE, await createSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: SESSION_MAX_AGE,
      path: '/',
    })
    return response
  } catch {
    return NextResponse.json({ error: 'Chyba serveru' }, { status: 500 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete(SESSION_COOKIE)
  return response
}
