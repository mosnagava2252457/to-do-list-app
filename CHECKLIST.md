# Setup Checklist ✅

Use este checklist para garantir que tudo está configurado corretamente.

## Antes do Desenvolvimento

### Instalação Local
- [ ] Node.js 18+ instalado (`node --version`)
- [ ] npm instalado (`npm --version`)
- [ ] Repositório clonado
- [ ] `npm install` executado com sucesso

### Configuração Supabase
- [ ] Conta Supabase criada (supabase.com)
- [ ] Projeto Supabase criado
- [ ] Tabela `todos` criada via SQL
- [ ] `.env.local` criado com credenciais
- [ ] Credenciais verificadas (test-api.sh passou)

### Variáveis de Ambiente
- [ ] `NEXT_PUBLIC_SUPABASE_URL` preenchido
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` preenchido
- [ ] `SUPABASE_SERVICE_ROLE_KEY` preenchido
- [ ] `.env.local` está em `.gitignore`

## Desenvolvimento

### Servidor Local
- [ ] `npm run dev` executa sem erros
- [ ] App aberto em `http://localhost:3000`
- [ ] Interface carrega corretamente
- [ ] Tailwind CSS estilos aplicados

### Funcionalidades
- [ ] Criar tarefa funciona
- [ ] Listar tarefas funciona
- [ ] Marcar como concluída funciona
- [ ] Deletar tarefa funciona
- [ ] Descrição opcional funciona

### TypeScript
- [ ] `npm run build` executa sem erros
- [ ] Sem erros de tipo no editor
- [ ] Intellisense funciona

## Testes

### API
- [ ] `./test-api.sh` executa sem erros
- [ ] GET /api/todos retorna 200
- [ ] POST /api/todos cria tarefa
- [ ] PUT /api/todos/[id] atualiza
- [ ] DELETE /api/todos/[id] deleta

### Frontend
- [ ] Criar tarefa vazia não é permitido
- [ ] Form limpa após envio
- [ ] Loading states funcionam
- [ ] Erro messages aparecem
- [ ] Responsivo em mobile

## Deploy

### GitHub
- [ ] Repositório criado em GitHub
- [ ] Código feito push para `main`
- [ ] `.env.local` não está no repositório

### Vercel
- [ ] Conta Vercel criada
- [ ] Repositório importado
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy bem-sucedido
- [ ] App funciona em produção

### Após Deploy
- [ ] URL de produção funciona
- [ ] HTTPS ativado
- [ ] API funciona em produção
- [ ] Domínio personalizado (opcional)

## Monitoramento (Produção)

- [ ] Verificar logs Vercel regularmente
- [ ] Monitorar performance
- [ ] Backups Supabase habilitados
- [ ] Alertas configurados

## Segurança

- [ ] `.env.local` não está tracked
- [ ] `SUPABASE_SERVICE_ROLE_KEY` nunca foi compartilhado
- [ ] HTTPS ativado em produção
- [ ] Credenciais rotacionadas periodicamente

## Documentação

- [ ] README.md lido
- [ ] QUICKSTART.md seguido
- [ ] ARCHITECTURE.md entendido
- [ ] DEPLOYMENT.md consultado
- [ ] SUPABASE_SETUP.md utilizado

## Próximos Passos

Quando tudo passar:
- [ ] Adicionar autenticação Supabase
- [ ] Implementar RLS (Row Level Security)
- [ ] Adicionar mais features (tags, prioridades, etc)
- [ ] Escrever testes
- [ ] Implementar CI/CD
- [ ] Adicionar Analytics
- [ ] Modo dark (opcional)

---

**Parabéns! Seu To-Do List App está pronto! 🎉**
