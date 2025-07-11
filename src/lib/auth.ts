import { cookies } from 'next/headers'

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin-session')
  return session?.value === 'authenticated'
}

export async function requireAuth() {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    throw new Error('Unauthorized')
  }
}