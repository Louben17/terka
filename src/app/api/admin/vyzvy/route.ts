import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireAuth } from '../../../../lib/auth'

// Pro admin operace používáme service_role klíč s plnými právy
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Service role pro admin
)

// GET - načtení všech výzev
export async function GET() {
  try {
    await requireAuth()

    const { data, error } = await supabase
      .from('terka')
      .select('*')

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('GET error:', error)
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json(
      { error: `Detailed error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}

// POST - přidání nové výzvy
export async function POST(request: NextRequest) {
  try {
    await requireAuth()

    const { text } = await request.json()

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text výzvy je povinný' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('terka')
      .insert([
        {
          text: text.trim(),
          autor: null
          // Odebereme created_at - Supabase ho přidá automaticky pokud existuje
        }
      ])
      .select()

    if (error) throw error

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json(
      { error: 'Chyba při přidávání výzvy' },
      { status: 500 }
    )
  }
}

// PUT - aktualizace výzvy
export async function PUT(request: NextRequest) {
  try {
    await requireAuth()

    const { originalText, newText } = await request.json()

    console.log('PUT request - Original:', originalText, 'New:', newText)

    if (!originalText || !newText || newText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Původní text a nový text jsou povinné' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('terka')
      .update({ text: newText.trim() })
      .eq('text', originalText)
      .select()

    console.log('Update result:', { data, error })

    if (error) {
      console.error('Update error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Výzva nenalezena' },
        { status: 404 }
      )
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error('PUT error:', error)
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json(
      { error: `Update error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}

// DELETE - smazání výzvy
export async function DELETE(request: NextRequest) {
  try {
    await requireAuth()

    const { text } = await request.json()

    console.log('DELETE request - Text:', text)

    if (!text) {
      return NextResponse.json(
        { error: 'Text výzvy je povinný' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('terka')
      .delete()
      .eq('text', text)

    console.log('Delete result:', { error })

    if (error) {
      console.error('Delete error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE error:', error)
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json(
      { error: `Delete error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}