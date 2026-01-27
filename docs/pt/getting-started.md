# Guia do Utilizador

## Login
- Social via Google (Auth0)
- Modo anónimo para desenvolvimento local

## Painel inicial
- Botão “Novo Pipeline”
- Lista de pipelines existentes (status, data, versão)

## Criar um pipeline básico
1. Clica em **Novo Pipeline**
2. Adiciona os nós: `Start` → `Bucket Input` ou `Local File Input` → `Transform` (opcional) → `DuckDB Output`
3. Liga os nós com o rato
4. Abre as configurações de cada nó e preenche os campos
5. Clica em **Salvar e Executar**

## Ingestão a partir de S3 público
- Define o `Bucket` e `Path` (prefixo)
- Usa `file pattern` para filtrar ficheiros (ex.: `*.csv`, `people_*.parquet`)
- Apenas buckets públicos são suportados no MVP1

## Ingestão a partir do sistema de ficheiros
- Seleciona diretórios locais disponibilizados pelo servidor
- Define o `file pattern` e valida permissões

## Visualização de logs
- Acompanha execução em tempo real
- Filtra por nó (Start, Input, Transform, Output)
- Limpa logs quando necessário

## Consulta de dados com SQL Editor
- Abre o editor
- Executa `SELECT * FROM tabela LIMIT 10`
- Usa o histórico para repetir consultas

## Utilizar o AI Agent
- Exemplos:
  - “What tables exist in the database?”
  - “Get the top 10 rows from the people table.”
  - “Explain the schema in simple terms.”
- Nota: valida sempre queries quando necessário
