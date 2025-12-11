import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseServer'
import { UpdateTodoPayload } from '@/types'

interface Params {
  params: {
    id: string
  }
}

export async function GET(_request: Request, { params }: Params) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { data, error } = await supabaseAdmin
      .from('todos')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Tarefa não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data })
  } catch (err) {
    return NextResponse.json(
      { error: 'Erro ao buscar tarefa' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const body: UpdateTodoPayload = await request.json()

    const updateData: any = {
      updated_at: new Date().toISOString(),
    }

    if (body.title) {
      updateData.title = body.title
    }
    if (body.description !== undefined) {
      updateData.description = body.description
    }
    if (body.completed !== undefined) {
      updateData.completed = body.completed
    }

    const { data, error } = await (supabaseAdmin
      .from('todos') as any)
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Erro ao atualizar tarefa' },
        { status: 400 }
      )
    }

    return NextResponse.json({ data })
  } catch (err) {
    return NextResponse.json(
      { error: 'Erro ao atualizar tarefa' },
      { status: 500 }
    )
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { error } = await supabaseAdmin
      .from('todos')
      .delete()
      .eq('id', params.id)

    if (error) {
      return NextResponse.json(
        { error: 'Erro ao deletar tarefa' },
        { status: 400 }
      )
    }

    return NextResponse.json({ message: 'Tarefa deletada com sucesso' })
  } catch (err) {
    return NextResponse.json(
      { error: 'Erro ao deletar tarefa' },
      { status: 500 }
    )
  }
}
