# Pipelines

## Montar o diagrama
- Arrasta nós para o canvas
- Liga com setas direcionais (esquerda→direita)
- Usa nomes descritivos para cada nó

## Nós disponíveis
- `Start`: início do fluxo
- `Bucket Input`: ingestão de S3 público
- `Local File Input`: ingestão de diretórios locais
- `Transform`: aplica regras no‑code ou script
- `DuckDB Output`: gravação em base DuckDB

## Configurações de cada nó
- Start: sem parâmetros
- Bucket Input: `bucket`, `path`, `file pattern`
- Local File Input: `directory`, `file pattern`
- Transform: `type` (code/change‑case), `selection` (por ficheiro/tabela)
- DuckDB Output: `database`, `table`, `primary key`, `mode` (append/upsert)

## Mapeamento DT (Data Load Tool)
- Inputs → coletores de ficheiros
- Transform → operadores de transformação
- Output → carregadores DuckDB

## File pattern e primary key
- `file pattern`: filtro de ficheiros (wildcards), exemplos:
  - `*.csv`, `*.parquet`, `people_*.csv`
- `primary key`: colunas únicas para upsert (evitar duplicação)

## Bases de dados e tabelas
- DuckDB é criado automaticamente se não existir
- Tabelas são geradas no primeiro carregamento

## Execução e visualização
- Clica **Salvar e Executar**
- Acompanha estados: Pendente, Em execução, Falhou, Concluído
- Abre logs por nó para diagnóstico
