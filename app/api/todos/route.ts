import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseServer'
import { CreateTodoPayload } from '@/types'

export async function GET(_request: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { data, error } = await supabaseAdmin
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ data })
  } catch (err) {
    return NextResponse.json(
      { error: 'Erro ao buscar tarefas' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const body: CreateTodoPayload = await request.json()

    if (!body.title) {
      return NextResponse.json(
        { error: 'Título é obrigatório' },
        { status: 400 }
      )
    }

    const { data, error } = await (supabaseAdmin
      .from('todos') as any)
      .insert([
        {
          title: body.title,
          description: body.description || null,
          completed: false,
        },
      ])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (err) {
    return NextResponse.json(
      { error: 'Erro ao criar tarefa' },
      { status: 500 }
    )
  }
}
