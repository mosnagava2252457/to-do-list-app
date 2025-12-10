# To-Do List App

Um aplicativo moderno de lista de tarefas construído com **Next.js 14**, **TypeScript**, **Tailwind CSS** e **Supabase**, pronto para deploy na Vercel.

## 🚀 Características

- ✅ Criar, ler, atualizar e deletar tarefas (CRUD completo)
- 🎨 Interface moderna e responsiva com Tailwind CSS
- ☁️ Backend serverless com Next.js API Routes
- 🗄️ Banco de dados gerenciado com Supabase
- 📱 Totalmente responsivo
- ⚡ Construído com performance em mente
- 🔄 Integração em tempo real com Supabase

## 🛠️ Stack Tecnológico

- **Frontend**: React 18, Next.js 14, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes (Serverless)
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Authentication**: Supabase Auth (pronto para adicionar)

## 📦 Instalação Local

### Pré-requisitos

- Node.js 18.x ou superior
- npm ou yarn
- Conta Supabase gratuita

### Passos de Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/to-do-list-app.git
   cd to-do-list-app
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   - Crie um arquivo `.env.local` na raiz do projeto
   - Adicione suas credenciais Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
   SUPABASE_SERVICE_ROLE_KEY=sua_chave_de_servico
   ```

4. **Configure o banco de dados no Supabase**

   Na página SQL Editor do Supabase, execute:
   ```sql
   CREATE TABLE IF NOT EXISTS todos (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     title TEXT NOT NULL,
     description TEXT,
     completed BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Índice para melhor performance
   CREATE INDEX idx_todos_created_at ON todos(created_at DESC);
   ```

5. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

6. **Abra no navegador**
   - Acesse `http://localhost:3000`

## 🚀 Deploy na Vercel

### Opção 1: Deploy com Git (Recomendado)

1. **Faça push do projeto para GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/seu-usuario/to-do-list-app.git
   git push -u origin main
   ```

2. **Vá para [vercel.com](https://vercel.com)**
   - Clique em "New Project"
   - Selecione seu repositório GitHub
   - Clique em "Import"

3. **Configure as variáveis de ambiente**
   - Na seção "Environment Variables", adicione:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`

4. **Clique em "Deploy"**

### Opção 2: Deploy com Vercel CLI

1. **Instale a Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Configure as variáveis de ambiente durante o deploy**

## 📝 Estrutura do Projeto

```
to-do-list-app/
├── app/
│   ├── api/
│   │   └── todos/
│   │       ├── route.ts          # GET: listar, POST: criar
│   │       └── [id]/
│   │           └── route.ts      # GET, PUT, DELETE individual
│   ├── layout.tsx                # Layout raiz
│   ├── page.tsx                  # Página principal
│   └── globals.css               # Estilos globais
├── components/
│   ├── TodoForm.tsx              # Formulário de nova tarefa
│   └── TodoItem.tsx              # Componente de item individual
├── lib/
│   ├── supabaseClient.ts         # Cliente Supabase (frontend)
│   └── supabaseServer.ts         # Cliente Supabase (backend)
├── types/
│   └── index.ts                  # Tipos TypeScript
├── public/                       # Arquivos estáticos
├── .env.local                    # Variáveis de ambiente (não comitar)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
└── vercel.json
```

## 🔌 Endpoints da API

### GET `/api/todos`
- Retorna todas as tarefas
- Resposta: `{ data: Todo[] }`

### POST `/api/todos`
- Cria uma nova tarefa
- Body: `{ title: string, description?: string }`
- Resposta: `{ data: Todo[] }`

### GET `/api/todos/[id]`
- Retorna uma tarefa específica
- Resposta: `{ data: Todo }`

### PUT `/api/todos/[id]`
- Atualiza uma tarefa
- Body: `{ title?: string, description?: string, completed?: boolean }`
- Resposta: `{ data: Todo }`

### DELETE `/api/todos/[id]`
- Deleta uma tarefa
- Resposta: `{ message: string }`

## 🔐 Configuração do Supabase

### Criar Conta e Projeto

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "Sign Up"
3. Use sua conta GitHub ou email
4. Crie um novo projeto
5. Aguarde a inicialização

### Copiar Credenciais

1. Vá para Project Settings > API
2. Copie:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

## 🔄 Próximas Melhorias Possíveis

- [ ] Autenticação com Supabase Auth
- [ ] Categorias/Tags para tarefas
- [ ] Prioridade de tarefas
- [ ] Prazos (due dates)
- [ ] Repetição de tarefas
- [ ] Modo escuro
- [ ] Busca e filtros avançados
- [ ] Sincronização em tempo real com WebSockets
- [ ] Testes automatizados

## 📄 Licença

MIT

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## 📞 Suporte

Se encontrar problemas:
1. Verifique as variáveis de ambiente
2. Consulte a documentação do [Supabase](https://supabase.com/docs)
3. Abra uma issue no GitHub

---

**Desenvolvido com ❤️ usando Next.js e Supabase**
