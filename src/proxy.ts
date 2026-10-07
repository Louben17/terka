import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session'

// Ochrana administrace – bez platné podepsané session přesměrujeme na přihlášení.
export async function proxy(request: NextRequest) {
  const valid = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)
  if (valid) return NextResponse.next()

  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
