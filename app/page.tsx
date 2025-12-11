'use client'

import { useState, useEffect } from 'react'
import { Todo, CreateTodoPayload } from '@/types'
import TodoForm from '@/components/TodoForm'
import TodoItem from '@/components/TodoItem'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

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
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">Minhas Tarefas</h1>
          <p className="text-gray-400 text-lg">Organize suas tarefas de forma inteligente e elegante</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-300 p-4 rounded-xl mb-6 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl shadow-2xl p-6 mb-8 border border-gray-700/50 backdrop-blur-sm">
          <TodoForm onSubmit={handleAddTodo} />
        </div>

        {/* Stats */}
        {!loading && (
          <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 rounded-2xl shadow-lg p-5 mb-8 border border-indigo-500/20 backdrop-blur-sm">
            <div className="flex flex-wrap gap-6 justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-400"></div>
                <span className="text-gray-300">
                  Total: <strong className="text-indigo-300">{todos.length}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-gray-300">
                  Concluídas: <strong className="text-green-300">{completedCount}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                <span className="text-gray-300">
                  Restantes: <strong className="text-orange-300">{todos.length - completedCount}</strong>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Filter Buttons */}
        {!loading && todos.length > 0 && (
          <div className="flex gap-3 mb-8 justify-center">
            {['all', 'active', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as 'all' | 'active' | 'completed')}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                  filter === f
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:border-gray-600'
                }`}
              >
                {f === 'all' ? 'Todas' : f === 'active' ? 'Ativas' : 'Concluídas'}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="w-12 h-12 rounded-full border-2 border-indigo-500 border-t-purple-500 animate-spin"></div>
            </div>
            <p className="text-gray-400 mt-4">Carregando suas tarefas...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredTodos.length === 0 && (
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl shadow-lg p-12 text-center border border-gray-700/50 backdrop-blur-sm">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg">
              {filter === 'all' ? 'Nenhuma tarefa encontrada' : filter === 'active' ? 'Parabéns! Todas as tarefas concluídas!' : 'Você ainda não completou nenhuma tarefa'}
            </p>
            {filter !== 'all' && (
              <button onClick={() => setFilter('all')} className="mt-4 text-indigo-400 hover:text-indigo-300 transition">
                Ver todas as tarefas →
              </button>
            )}
          </div>
        )}

        {/* Todo List */}
        {!loading && filteredTodos.length > 0 && (
          <div className="space-y-3">
            {filteredTodos.map((todo) => (
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
