'use client'

import { useState } from 'react'
import { CreateTodoPayload } from '@/types'

interface TodoFormProps {
  onSubmit: (payload: CreateTodoPayload) => Promise<void>
}

export default function TodoForm({ onSubmit }: TodoFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    try {
      setIsLoading(true)
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
      })
      setTitle('')
      setDescription('')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-gray-200 mb-2">
          Título da Tarefa
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite uma nova tarefa..."
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-gray-100 placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200 backdrop-blur-sm"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-gray-200 mb-2">
          Descrição (opcional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Adicione mais detalhes..."
          rows={3}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-gray-100 placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200 resize-none backdrop-blur-sm"
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={!title.trim() || isLoading}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-lg disabled:shadow-none"
      >
        {isLoading ? '⏳ Adicionando...' : '➕ Adicionar Tarefa'}
      </button>
    </form>
  )
}
