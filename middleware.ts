import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Ochrana admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const session = request.cookies.get('admin-session')
    
    if (!session || session.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Ochrana API admin routes
  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    const session = request.cookies.get('admin-session')
    
    if (!session || session.value !== 'authenticated') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ]
}