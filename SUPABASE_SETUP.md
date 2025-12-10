# Guia de Configuração do Supabase

Este documento guia você através da configuração do Supabase para o To-Do List App.

## 1. Criar uma Conta Supabase

1. Visite [supabase.com](https://supabase.com)
2. Clique em "Sign up"
3. Use seu email ou GitHub para criar uma conta
4. Verifique seu email

## 2. Criar um Novo Projeto

1. Na página de projetos, clique em "New project"
2. Preencha os detalhes:
   - **Name**: `todo-list-app` (ou nome de sua escolha)
   - **Database Password**: Crie uma senha segura
   - **Region**: Selecione a região mais próxima a você
3. Clique em "Create new project"
4. Aguarde 2-3 minutos para inicializar

## 3. Obter as Credenciais

1. Após a criação, vá para "Settings" > "API"
2. Você verá:
   - **Project URL** -https://mybpllaviqmkqfkylzua.supabase.co 
   - **public (anon) key** -eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15YnBsbGF2aXFta3Fma3lsenVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNTAzODgsImV4cCI6MjA4MDkyNjM4OH0.MJQfUISRlwC71pGY2qV9VXVcPXDcIjz6BDdibmd2PNY 
   - **service_role key** - Copie este valor (guarde com segurança!)

## 4. Criar a Tabela de Tarefas

1. Vá para "SQL Editor"
2. Clique em "New query"
3. Cole o seguinte SQL:

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

-- Habilitar RLS (Row Level Security) - opcional
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
```

4. Clique em "Run"
5. Você deve ver uma mensagem de sucesso

## 5. Configurar as Variáveis de Ambiente

### Local (Desenvolvimento)

1. Na raiz do projeto, abra/crie `.env.local`
2. Adicione:

```env
NEXT_PUBLIC_SUPABASE_URL=  https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_chave_de_servico
```

### Vercel (Produção)

1. Na dashboard Vercel do seu projeto
2. Vá para "Settings" > "Environment Variables"
3. Adicione as mesmas variáveis

## 6. Testar a Conexão

No seu terminal local:

```bash
npm run dev
```

Acesse `http://localhost:3000` e teste:
1. Criar uma tarefa
2. Marcar como concluída
3. Deletar a tarefa

Se tudo funcionar, a conexão com Supabase está OK!

## Segurança

### Importante: Nunca compartilhe

- `SUPABASE_SERVICE_ROLE_KEY` - Guarde como um segredo
- Nunca faça push de `.env.local` para GitHub

### Políticas de Segurança (RLS)

Para adicionar Row Level Security (proteção por usuário):

1. Adicione autenticação Supabase à sua app
2. Crie políticas RLS na tabela `todos`
3. Exemplo de política para usuários:

```sql
CREATE POLICY "Users can only see their own todos" ON todos
  FOR SELECT
  USING (auth.uid() = user_id);
```

## Troubleshooting

### Erro: "Cannot connect to database"
- Verifique se as variáveis de ambiente estão corretas
- Verifique se o projeto Supabase ainda está ativo
- Aguarde alguns minutos e tente novamente

### Erro: "Table todos does not exist"
- Execute novamente o SQL para criar a tabela
- Verifique se não há erros na execução

### Erro: "Invalid API key"
- Copie novamente as chaves do Supabase
- Certifique-se de que não há espaços extras

## Próximas Melhorias

- [ ] Adicionar autenticação de usuário
- [ ] Implementar RLS (Row Level Security)
- [ ] Adicionar temas por usuário
- [ ] Implementar compartilhamento de listas
