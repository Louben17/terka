import { cookies } from 'next/headers'

export function isAuthenticated(): boolean {
  const cookieStore = cookies()
  const session = cookieStore.get('admin-session')
  return session?.value === 'authenticated'
}

export function requireAuth() {
  if (!isAuthenticated()) {
    throw new Error('Unauthorized')
  }
}