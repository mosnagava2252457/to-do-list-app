import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'To-Do List App',
  description: 'Um aplicativo moderno de lista de tarefas construído com Next.js e Supabase',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
