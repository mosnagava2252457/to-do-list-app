#!/bin/bash

# Script para testar os endpoints da API
# Use este script para validar que a API está funcionando corretamente

BASE_URL="http://localhost:3000/api/todos"

echo "=== To-Do List API Test Suite ==="
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para imprimir resultados
print_result() {
  local status=$1
  local message=$2
  
  if [ $status -eq 0 ]; then
    echo -e "${GREEN}✓ PASSOU${NC}: $message"
  else
    echo -e "${RED}✗ FALHOU${NC}: $message"
  fi
}

# 1. Testar GET /api/todos (listar tarefas)
echo -e "${YELLOW}1. Testando GET /api/todos${NC}"
response=$(curl -s "$BASE_URL")
if echo "$response" | grep -q "data"; then
  echo "$response" | jq .
  print_result 0 "Listar tarefas"
else
  echo "$response"
  print_result 1 "Listar tarefas"
fi
echo ""

# 2. Testar POST /api/todos (criar tarefa)
echo -e "${YELLOW}2. Testando POST /api/todos${NC}"
todo_data='{"title":"Teste da API","description":"Esta é uma tarefa de teste"}'
response=$(curl -s -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d "$todo_data")

if echo "$response" | grep -q "id"; then
  echo "$response" | jq .
  # Extrair o ID da primeira tarefa para testes posteriores
  TODO_ID=$(echo "$response" | jq -r '.data[0].id')
  print_result 0 "Criar tarefa"
  echo "ID gerado: $TODO_ID"
else
  echo "$response"
  print_result 1 "Criar tarefa"
fi
echo ""

# Se conseguimos criar uma tarefa, testar os endpoints de ID
if [ ! -z "$TODO_ID" ] && [ "$TODO_ID" != "null" ]; then
  
  # 3. Testar GET /api/todos/[id]
  echo -e "${YELLOW}3. Testando GET /api/todos/$TODO_ID${NC}"
  response=$(curl -s "$BASE_URL/$TODO_ID")
  if echo "$response" | grep -q "id"; then
    echo "$response" | jq .
    print_result 0 "Buscar tarefa específica"
  else
    echo "$response"
    print_result 1 "Buscar tarefa específica"
  fi
  echo ""

  # 4. Testar PUT /api/todos/[id]
  echo -e "${YELLOW}4. Testando PUT /api/todos/$TODO_ID${NC}"
  update_data='{"title":"Tarefa Atualizada","completed":true}'
  response=$(curl -s -X PUT "$BASE_URL/$TODO_ID" \
    -H "Content-Type: application/json" \
    -d "$update_data")
  if echo "$response" | grep -q "completed"; then
    echo "$response" | jq .
    print_result 0 "Atualizar tarefa"
  else
    echo "$response"
    print_result 1 "Atualizar tarefa"
  fi
  echo ""

  # 5. Testar DELETE /api/todos/[id]
  echo -e "${YELLOW}5. Testando DELETE /api/todos/$TODO_ID${NC}"
  response=$(curl -s -X DELETE "$BASE_URL/$TODO_ID")
  if echo "$response" | grep -q "sucesso"; then
    echo "$response" | jq .
    print_result 0 "Deletar tarefa"
  else
    echo "$response"
    print_result 1 "Deletar tarefa"
  fi
  echo ""

else
  echo -e "${RED}Não foi possível extrair o ID da tarefa. Saltando testes de ID específico.${NC}"
fi

echo -e "${GREEN}=== Testes Concluídos ===${NC}"
