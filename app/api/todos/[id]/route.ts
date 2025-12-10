import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseServer'
import { UpdateTodoPayload } from '@/types'

interface Params {
  params: {
    id: string
  }
}

export async function GET(_request: Request, { params }: Params) {
  try {
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
    const body: UpdateTodoPayload = await request.json()

    const { data, error } = await supabaseAdmin
      .from('todos')
      .update({
        ...(body.title && { title: body.title }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.completed !== undefined && { completed: body.completed }),
        updated_at: new Date().toISOString(),
      })
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

export async function DELETE(request: Request, { params }: Params) {
  try {
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
