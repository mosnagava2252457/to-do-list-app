# Vercel Deployment Guide

Este projeto está configurado para deploy automático na Vercel.

## Pré-requisitos

- Conta GitHub com o repositório do projeto
- Conta Vercel (grátis em [vercel.com](https://vercel.com))
- Conta Supabase com projeto criado

## Passos para Deployment

### 1. Preparar o Repositório GitHub

```bash
# Inicializar git (se não estiver iniciado)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit inicial
git commit -m "Initial commit: To-Do List App"

# Adicionar remote (substitua seu-usuario)
git remote add origin https://github.com/seu-usuario/to-do-list-app.git

# Push para main
git push -u origin main
```

### 2. Conectar com Vercel

1. Vá para [vercel.com](https://vercel.com)
2. Clique em "Sign up" ou "Log in"
3. Clique em "New Project"
4. Clique em "Import Git Repository"
5. Procure por "to-do-list-app" e selecione

### 3. Configurar Variáveis de Ambiente

Na tela de configuração do projeto Vercel:

1. Vá até "Environment Variables"
2. Adicione as seguintes variáveis:

```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_chave_de_servico
```

**Onde encontrar essas chaves:**
- Acesse [supabase.com](https://supabase.com)
- Vá para seu projeto
- Clique em "Settings" > "API"
- Copie os valores correspondentes

### 4. Deploy

1. Clique em "Deploy"
2. Aguarde o build completar (geralmente 2-3 minutos)
3. Seu app estará disponível em um URL fornecido por Vercel

## Após o Deploy

### Atualizar seu domínio

Para adicionar um domínio personalizado:
1. Na dashboard Vercel, clique em seu projeto
2. Vá para "Settings" > "Domains"
3. Digite seu domínio e clique "Add"
4. Siga as instruções de DNS

### Monitorar Deployments

1. Toda vez que fizer push para `main`, Vercel fará deploy automático
2. Você pode ver o status dos deployments na aba "Deployments"
3. Clique em qualquer deployment para ver logs detalhados

## Troubleshooting

### Erro: "Build failed"
- Verifique os logs no Vercel
- Certifique-se de que `npm run build` funciona localmente

### Erro: "Cannot find Supabase"
- Verifique as variáveis de ambiente
- Certifique-se que todas estão configuradas corretamente

### API não funciona
- Verifique se a tabela `todos` foi criada no Supabase
- Verifique as credenciais do Supabase

## Próximos Passos

Após deployment bem-sucedido:
1. Teste a aplicação
2. Configure um domínio personalizado
3. Configure CI/CD adicional conforme necessário
4. Implemente autenticação com Supabase Auth
