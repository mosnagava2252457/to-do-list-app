# Quick Start Guide 🚀

Comece com seu To-Do List App em 5 minutos!

## Pré-requisitos

- Node.js 18+ instalado
- Git
- Conta Supabase (gratuita)

## 1. Clonar e Instalar (2 min)

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/to-do-list-app.git
cd to-do-list-app

# Instale as dependências
npm install
```

## 2. Configurar Supabase (2 min)

### 2.1 Criar Projeto Supabase
1. Vá para [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Preencha os dados e crie

### 2.2 Criar Tabela de Dados
No SQL Editor do Supabase, execute:
```sql
CREATE TABLE IF NOT EXISTS todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_todos_created_at ON todos(created_at DESC);
```

### 2.3 Copiar Credenciais
Em Settings > API, copie:
- Project URL → `NEXT_PUBLIC_SUPABASE_URL`
- anon key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- service_role key → `SUPABASE_SERVICE_ROLE_KEY`

## 3. Configurar Ambiente (1 min)

Crie arquivo `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_chave_de_servico
```

## 4. Rodar Localmente

```bash
npm run dev
```

Abra `http://localhost:3000` e pronto! 🎉

## Próximos Passos

### Testar a API
```bash
./test-api.sh
```

### Deploy na Vercel
1. Faça push para GitHub
2. Conecte seu repositório em [vercel.com](https://vercel.com)
3. Configure as variáveis de ambiente
4. Clique em "Deploy"

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor local

# Build
npm run build        # Cria versão de produção
npm run start        # Inicia versão de produção

# Linting
npm run lint         # Verifica erros de código

# Testes da API
./test-api.sh        # Testa todos os endpoints
```

## Troubleshooting

### "Cannot find Supabase"
- Verifique `.env.local`
- Certifique-se que as credenciais estão corretas

### "Table does not exist"
- Execute novamente o SQL para criar a tabela
- Aguarde alguns segundos e atualize

### Porta 3000 em uso
```bash
npm run dev -- -p 3001  # Use outra porta
```

## Documentação Completa

- [README.md](./README.md) - Documentação principal
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Guia Supabase
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guia de deploy
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitetura técnica

## Suporte

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Happy coding! 💻**
