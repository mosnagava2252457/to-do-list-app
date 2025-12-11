'use client'

import { Todo } from '@/types'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string, completed: boolean) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="group bg-gradient-to-r from-gray-900/60 to-gray-800/60 rounded-xl shadow-lg p-5 hover:shadow-2xl transition-all duration-300 border border-gray-700/50 backdrop-blur-sm hover:border-indigo-500/30">
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <label className="relative flex items-center cursor-pointer mt-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id, todo.completed)}
            className="w-5 h-5 rounded border-2 border-gray-600 bg-gray-800/50 appearance-none checked:bg-gradient-to-r checked:from-indigo-500 checked:to-purple-600 checked:border-indigo-500 transition-all duration-200 cursor-pointer"
          />
          {todo.completed && (
            <svg className="w-3 h-3 text-white absolute left-1 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </label>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-semibold transition-all duration-300 ${
              todo.completed
                ? 'line-through text-gray-500'
                : 'text-gray-100 group-hover:text-white'
            }`}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p className={`text-sm mt-2 transition-colors duration-300 ${
              todo.completed ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {todo.description}
            </p>
          )}
          <p className="text-gray-500 text-xs mt-3">
            <svg className="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.5 2a1 1 0 00-1 1v1H3a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1.5V3a1 1 0 00-1-1h-1a1 1 0 00-1 1v1h-3V3a1 1 0 00-1-1h-1zm0 4a1 1 0 100 2 1 1 0 000-2zM8.5 6a1 1 0 100 2 1 1 0 000-2zM12 6a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
            </svg>
            {new Date(todo.created_at).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(todo.id)}
          className="flex-shrink-0 text-gray-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
          title="Deletar tarefa"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
