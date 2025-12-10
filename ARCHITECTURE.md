# Documentação Técnica

## Visão Geral da Arquitetura

Este aplicativo é uma aplicação full-stack moderna construída com tecnologias serverless, permitindo escalabilidade automática e custos mínimos.

```
┌─────────────────────────────────────────────────────────────┐
│                   Browser do Usuário                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                    React 18 + Next.js
                         │
┌────────────────────────▼────────────────────────────────────┐
│              Next.js 14 (Vercel Edge)                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │        Frontend (App Router)                          │ │
│  │  - Page.tsx (Client Component)                        │ │
│  │  - Components (TodoForm, TodoItem)                    │ │
│  │  - Tailwind CSS (Estilização)                         │ │
│  └────────────────────┬───────────────────────────────────┘ │
│                       │                                     │
│  ┌────────────────────▼───────────────────────────────────┐ │
│  │        Backend (API Routes)                           │ │
│  │  - /api/todos (GET, POST)                             │ │
│  │  - /api/todos/[id] (GET, PUT, DELETE)                 │ │
│  └────────────────────┬───────────────────────────────────┘ │
└────────────────────────┼───────────────────────────────────┘
                         │
                         │ HTTPS REST API
                         │
┌────────────────────────▼───────────────────────────────────┐
│            Supabase (PostgreSQL + Auth)                     │
│  - Tabela: todos (id, title, description, completed, ...)  │
│  - Autenticação (pronta para usar)                          │
│  - Row Level Security (RLS)                                 │
└─────────────────────────────────────────────────────────────┘
```

## Stack de Tecnologia

### Frontend
- **React 18**: Biblioteca UI de componentes
- **Next.js 14**: Framework React com SSR, SSG e API Routes
- **TypeScript**: Tipagem estática para JavaScript
- **Tailwind CSS**: Framework CSS utilitário
- **Axios**: Cliente HTTP (opcional, usando fetch native)

### Backend
- **Next.js API Routes**: Serverless functions
- **Node.js/Vercel Runtime**: Ambiente de execução

### Database
- **Supabase**: PostgreSQL gerenciado na nuvem
- **PostgREST**: API REST automática
- **Realtime**: Sincronização em tempo real (opcional)

### Deployment
- **Vercel**: Plataforma de deployment para Next.js
- **GitHub**: Controle de versão e CI/CD

## Fluxo de Dados

### Criar Tarefa
```
User Input → TodoForm → handleAddTodo() → POST /api/todos
                                              ↓
                                    API Route (/api/todos)
                                              ↓
                                    supabaseAdmin.insert()
                                              ↓
                                    Supabase Database
                                              ↓
                                    Response JSON → setTodos()
                                              ↓
                                    Re-render + Nova tarefa
```

### Listar Tarefas
```
useEffect() → fetchTodos() → GET /api/todos
                                 ↓
                         API Route (select all)
                                 ↓
                         Supabase Query
                                 ↓
                         Response JSON → setTodos()
```

### Atualizar Tarefa
```
Checkbox Click → handleToggleTodo(id, completed)
                 → PUT /api/todos/[id]
                        ↓
                 supabaseAdmin.update()
                        ↓
                 Supabase Database
                        ↓
                 Response → setTodos()
```

### Deletar Tarefa
```
Delete Button → handleDeleteTodo(id)
                → DELETE /api/todos/[id]
                        ↓
                 supabaseAdmin.delete()
                        ↓
                 Supabase Database
                        ↓
                 Response → setTodos()
```

## Estrutura de Arquivos

```
app/
├── api/
│   └── todos/
│       ├── route.ts           # GET: listar, POST: criar
│       └── [id]/
│           └── route.ts       # GET, PUT, DELETE por ID
├── layout.tsx                 # Layout raiz (metadata, providers)
├── page.tsx                   # Página principal (Client Component)
└── globals.css                # Estilos globais

components/
├── TodoForm.tsx               # Formulário de criação (Client Component)
└── TodoItem.tsx               # Item individual (Client Component)

lib/
├── supabaseClient.ts          # Cliente JS (frontend)
└── supabaseServer.ts          # Cliente Admin (backend)

types/
└── index.ts                   # Interfaces TypeScript

public/
└── favicon.svg                # Ícone da aplicação
```

## Componentes

### TodoForm
- **Tipo**: Client Component
- **Responsabilidade**: Renderizar formulário e capturar entrada do usuário
- **Props**: `onSubmit` (callback)
- **Estado**: `title`, `description`, `isLoading`

### TodoItem
- **Tipo**: Client Component
- **Responsabilidade**: Renderizar item individual com ações
- **Props**: `todo`, `onToggle`, `onDelete`
- **Ações**: Marcar como concluída, deletar

### Page
- **Tipo**: Client Component
- **Responsabilidade**: Gerenciar lista completa e estado global
- **Estado**: `todos`, `loading`, `error`
- **Funções**: `fetchTodos`, `handleAddTodo`, `handleToggleTodo`, `handleDeleteTodo`

## API Routes

### GET /api/todos
```
Request:
  Método: GET
  Headers: -

Response (200):
  {
    "data": [
      {
        "id": "uuid",
        "title": "string",
        "description": "string|null",
        "completed": boolean,
        "created_at": "timestamp",
        "updated_at": "timestamp"
      }
    ]
  }

Response (400/500):
  {
    "error": "string"
  }
```

### POST /api/todos
```
Request:
  Método: POST
  Headers: Content-Type: application/json
  Body: {
    "title": "string",
    "description": "string?" (opcional)
  }

Response (201):
  {
    "data": [{ todo object }]
  }

Response (400/500):
  {
    "error": "string"
  }
```

### GET /api/todos/[id]
```
Request:
  Método: GET
  Path: /api/todos/{uuid}

Response (200):
  {
    "data": { todo object }
  }

Response (404/500):
  {
    "error": "string"
  }
```

### PUT /api/todos/[id]
```
Request:
  Método: PUT
  Path: /api/todos/{uuid}
  Body: {
    "title": "string?",
    "description": "string?",
    "completed": boolean?
  }

Response (200):
  {
    "data": { updated todo object }
  }

Response (400/500):
  {
    "error": "string"
  }
```

### DELETE /api/todos/[id]
```
Request:
  Método: DELETE
  Path: /api/todos/{uuid}

Response (200):
  {
    "message": "Tarefa deletada com sucesso"
  }

Response (400/500):
  {
    "error": "string"
  }
```

## Variáveis de Ambiente

| Variável | Tipo | Descrição |
|----------|------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Chave anônima (usada no frontend) |
| `SUPABASE_SERVICE_ROLE_KEY` | Private | Chave de serviço (backend only) |

## Performance Otimizações

1. **Client Components**: Usados para componentes interativos
2. **Lazy Loading**: Componentes carregam sob demanda
3. **Image Optimization**: Next.js Image component (quando aplicável)
4. **CSS Minification**: Tailwind remove CSS não utilizado
5. **API Caching**: (Pode ser adicionado com revalidate)

## Segurança

1. **Validação**: Validação básica no backend
2. **CORS**: Automático com Next.js
3. **HTTPS**: Enforçado em produção
4. **Secrets**: Variáveis sensíveis em .env.local
5. **SQL Injection**: Protegido via Supabase parameterized queries

## Próximas Melhorias

- [ ] Adicionar autenticação com Supabase Auth
- [ ] Implementar RLS (Row Level Security)
- [ ] Adicionar testes (Jest, React Testing Library)
- [ ] Implementar React Query para caching
- [ ] Adicionar validação com Zod
- [ ] Implementar WebSocket para updates em tempo real
- [ ] Adicionar analytics
- [ ] Modo dark mode
- [ ] PWA (Progressive Web App)

## Links Úteis

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
