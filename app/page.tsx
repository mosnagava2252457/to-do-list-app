'use client'

import { useState, useEffect } from 'react'
import { Todo, CreateTodoPayload } from '@/types'
import TodoForm from '@/components/TodoForm'
import TodoItem from '@/components/TodoItem'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/todos')
      if (!response.ok) throw new Error('Erro ao buscar tarefas')
      const json = await response.json()
      setTodos(json.data || [])
      setError(null)
    } catch (err) {
      setError('Erro ao carregar tarefas')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTodo = async (payload: CreateTodoPayload) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error('Erro ao criar tarefa')
      const json = await response.json()
      setTodos([json.data[0], ...todos])
      setError(null)
    } catch (err) {
      setError('Erro ao criar tarefa')
      console.error(err)
    }
  }

  const handleToggleTodo = async (id: string, completed: boolean) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      })
      if (!response.ok) throw new Error('Erro ao atualizar tarefa')
      const json = await response.json()
      setTodos(todos.map((todo) => (todo.id === id ? json.data : todo)))
      setError(null)
    } catch (err) {
      setError('Erro ao atualizar tarefa')
      console.error(err)
    }
  }

  const handleDeleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Erro ao deletar tarefa')
      setTodos(todos.filter((todo) => todo.id !== id))
      setError(null)
    } catch (err) {
      setError('Erro ao deletar tarefa')
      console.error(err)
    }
  }

  const completedCount = todos.filter((t) => t.completed).length

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Minhas Tarefas</h1>
          <p className="text-blue-100">Organize suas tarefas de forma simples e eficiente</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <TodoForm onSubmit={handleAddTodo} />
        </div>

        {/* Stats */}
        {!loading && (
          <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">
                Total de tarefas: <strong>{todos.length}</strong>
              </span>
              <span className="text-green-600">
                Concluídas: <strong>{completedCount}</strong>
              </span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center text-white">
            <p>Carregando tarefas...</p>
          </div>
        )}

        {/* Todo List */}
        {!loading && todos.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-500 text-lg">
              Nenhuma tarefa ainda. Crie uma para começar! 🚀
            </p>
          </div>
        )}

        {!loading && todos.length > 0 && (
          <div className="space-y-3">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
