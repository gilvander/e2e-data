# 🤖 Agente de IA & Prompts de Exemplo

O lado de IA do e2e-Data fornece um conjunto poderoso de assistentes desenhados para acelerar as tuas tarefas de engenharia de dados. Atualmente, a plataforma apresenta três agentes especializados que aproveitam **modelos inferidos pela Groq** para fornecer respostas quase instantâneas.

## Capacidades Centrais de IA

*   **Agente de Consulta de Dados:** Foca-se em interagir com os resultados do teu pipeline. Por agora, está otimizado para destinos **DuckDB**, permitindo-te consultar esquemas e dados usando linguagem natural (ex: "Que tabelas conheces do Esquema da Base de Dados?").
*   **Agente de Pipeline:** Assiste no esboço arquitetural. Podes usá-lo para construir pipelines descrevendo a tua intenção—como extrair do Oracle e escrever para Postgres—ou para fazer perguntas sobre que nós são atualmente suportados.
*   **Bot de Ambiente (v1):** Ajuda-te a manteres-te organizado recuperando informação sobre a configuração atual do teu workspace, como ver segredos configurados ou definições de API.

## Configuração: Ativar a IA

Para ativar estas funcionalidades de IA, deves configurar o teu ambiente para usar a Groq:

1.  **Conta:** Garante que tens uma conta [Groq](https://groq.com/) válida.
2.  **Chave de API:** Gera um token de API a partir do dashboard da Groq.
3.  **Configuração de Ambiente:** Adiciona a seguinte variável ao teu ficheiro `.env` no diretório raiz:
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
