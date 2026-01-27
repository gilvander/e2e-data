# e2e‑Data / DTC — Documentação Oficial

## Introdução

O e2e‑Data (Data‑to‑Cloud, DTC) é uma plataforma para criação de pipelines de dados end‑to‑end: ingestão, transformação, armazenamento, visualização e análise. O MVP1 foca em fluxos simples, seguros e rápidos, integrando fontes públicas e sistema de ficheiros com execução local em DuckDB, suporte a transformações e um agente de IA para consultas.

### Principais funcionalidades
- Pipelines visuais com nós pré‑definidos
- Ingestão de dados a partir de S3 público e sistema de ficheiros
- Transformações no‑code e com linguagem de script
- Armazenamento local em DuckDB
- Logs detalhados e histórico de execuções
- SQL Editor e AI Agent para exploração
- Agendamento simples (minutário/horário)
- Versionamento de pipelines

### Conceitos
- Pipeline: gráfico de nós que define o fluxo de dados
- Ingestão: entrada de dados (S3, sistema de ficheiros)
- Transformação: aplicação de regras/alterações
- Agendamento: execução periódica do pipeline
- AI Agent: assistente para consultas e explicações
- S3 bucket: armazenamento de objetos (público no MVP1)
- File system: diretório local do servidor
- DuckDB: base de dados embebida para armazenamento e análise
- DT core: motor interno de execução de nós (Data Tool)
- Tenant/namespace: escopo lógico para separar dados/recursos

### Estrutura da documentação
- Guia do Utilizador (primeiros passos)
- Pipelines e nós disponíveis
- Transformações
- Agendamento
- Versionamento
- Editor de Código (DT Script Viewer)
- Instalação (ambiente de desenvolvimento)
- AI Agent
- Secção final (limitações, roadmap, segurança, performance)
