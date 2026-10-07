import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { isAuthenticated } from '@/lib/auth'
import { adminVyzvy, isSupabaseConfigured } from '@/lib/supabase'

async function guard() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!isSupabaseConfigured('service')) {
    return NextResponse.json(
      { error: 'Chybí SUPABASE_SERVICE_ROLE_KEY nebo NEXT_PUBLIC_SUPABASE_URL.' },
      { status: 503 }
    )
  }
  return null
}

function fail(error: unknown) {
  console.error('Admin API error:', error)
  const message = error instanceof Error ? error.message : 'Neznámá chyba'
  return NextResponse.json({ error: message }, { status: 500 })
}

// Po každé změně zneplatníme cache, aby se nové výzvy hned ukázaly na webu.
function refresh() {
  revalidateTag('vyzvy', { expire: 0 })
}

export async function GET() {
  const denied = await guard()
  if (denied) return denied
  try {
    return NextResponse.json(await adminVyzvy.list())
  } catch (error) {
    return fail(error)
  }
}

export async function POST(request: NextRequest) {
  const denied = await guard()
  if (denied) return denied
  try {
    const { text } = await request.json()
    if (typeof text !== 'string' || !text.trim()) {
      return NextResponse.json({ error: 'Text výzvy je povinný' }, { status: 400 })
    }
    const [created] = await adminVyzvy.insert(text.trim())
    refresh()
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    return fail(error)
  }
}

export async function PUT(request: NextRequest) {
  const denied = await guard()
  if (denied) return denied
  try {
    const { originalText, newText } = await request.json()
    if (typeof originalText !== 'string' || typeof newText !== 'string' || !newText.trim()) {
      return NextResponse.json({ error: 'Původní i nový text jsou povinné' }, { status: 400 })
    }
    const updated = await adminVyzvy.update(originalText, newText.trim())
    if (updated.length === 0) {
      return NextResponse.json({ error: 'Výzva nenalezena' }, { status: 404 })
    }
    refresh()
    return NextResponse.json(updated[0])
  } catch (error) {
    return fail(error)
  }
}

export async function DELETE(request: NextRequest) {
  const denied = await guard()
  if (denied) return denied
  try {
    const { text } = await request.json()
    if (typeof text !== 'string' || !text) {
      return NextResponse.json({ error: 'Text výzvy je povinný' }, { status: 400 })
    }
    await adminVyzvy.remove(text)
    refresh()
    return NextResponse.json({ success: true })
  } catch (error) {
    return fail(error)
  }
}
