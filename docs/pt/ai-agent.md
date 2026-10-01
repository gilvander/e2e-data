# 🤖 Agente de IA & Prompts de Exemplo

O lado de IA do e2e-Data fornece um conjunto poderoso de assistentes desenhados para acelerar as tuas tarefas de engenharia de dados. Atualmente, a plataforma apresenta agentes especializados que aproveitam **modelos inferidos pela Groq** para fornecer respostas quase instantâneas.

## Capacidades Centrais de IA

*   **Agente de Consulta de Dados:** Foca-se em interagir com os resultados do teu pipeline. Por agora, está otimizado para destinos **DuckDB**, permitindo-te consultar esquemas e dados usando linguagem natural (ex: "Que tabelas conheces do Esquema da Base de Dados?").
*   **Agente de Pipeline:** Assiste no esboço arquitetural. Podes usá-lo para construir pipelines descrevendo a tua intenção—como extrair do Oracle e escrever para Postgres—ou para fazer perguntas sobre que nós são atualmente suportados.
*   **Pesquisa no Data Catalog (fluxo Analytics):** Traduz perguntas em SQL usando o [Data Catalog](data-catalog.md) (nomes de colunas, conceitos semânticos e descrições), por isso consegue encontrar as tabelas certas mesmo quando não sabes os seus nomes. Usa um modelo Groq, ou um modelo offline servido pelo Ollama (`qwen2.5-coder:3b` em `localhost:11434`) quando corre localmente.
*   **Bot de Ambiente (v1):** Ajuda-te a manteres-te organizado recuperando informação sobre a configuração atual do teu workspace, como ver segredos configurados ou definições de API.

## Configuração: Ativar a IA

Para ativar estas funcionalidades de IA, deves configurar o teu ambiente para usar a Groq:

1.  **Conta:** Garante que tens uma conta [Groq](https://groq.com/) válida.
2.  **Chave de API:** Gera um token de API a partir do dashboard da Groq.
3.  **Configuração de Ambiente:** Adiciona a seguinte variável ao ficheiro `.env` do backend (`backend/src/.env`):
    ```bash
    GROQ_API_KEY=a_tua_token_aqui
    ```

## Guiar o Teu Fluxo de Trabalho com Prompts de Exemplo

A interface fornece **Prompts de Exemplo** para ajudar a guiar-te sobre como interagir com os agentes eficazmente. Estes servem como modelos para tarefas comuns:

| Tipo de Agente | Exemplos de Prompt |
| :--- | :--- |
| **Consulta de Dados** | "Dá-me o top 10 de 'nome_esquema.nome_tabela'" |
| **Pipeline** | "Cria um pipeline que extraia do Kafka e despeje para SQL Server" |
| **Ambiente** | "Mostra-me os segredos que tenho configurados" |

## Limites e comportamento

*   **Limite diário de mensagens:** `CONVERSATION_TURN_LIMIT` (`.env` do backend) limita as mensagens que cada utilizador pode enviar por dia; `-1` desativa o limite.
*   **Sessões:** o histórico da conversa fica na memória do backend, por isso é reposto quando o backend reinicia.
*   **Requer dados:** o agente de Consulta de Dados só arranca quando o teu namespace já tem output de pipelines; caso contrário pede-te para criares dados primeiro.
