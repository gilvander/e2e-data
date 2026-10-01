# 🤖 AI Agent & Sample Prompts

The AI side of e2e-Data provides a powerful suite of assistants designed to accelerate your data engineering tasks. Currently, the platform features specialized agents that leverage **Groq-inferred models** to provide near-instant responses.

## Core AI Capabilities

*   **Data Query Agent:** Focuses on interacting with your pipeline results. For now, this is optimized for **DuckDB** destinations, allowing you to query schemas and data using natural language (e.g., "What tables do you know from the Database Schema?").
*   **Pipeline Agent:** Assists in architectural drafting. You can use it to build pipelines by describing your intent—such as pulling from Oracle and writing to Postgres—or to ask questions about which nodes are currently supported.
*   **Data Catalog Search (Analytics flow):** Translates questions into SQL using the [Data Catalog](data-catalog.md) (column names, semantic concepts and descriptions), so it can find the right tables even when you do not know their names. It uses a Groq model, or an offline model served by Ollama (`qwen2.5-coder:3b` on `localhost:11434`) when run locally.
*   **Environment Bot (v1):** Helps you stay organized by retrieving information about your current workspace configuration, such as viewing configured secrets or API settings.

## Configuration: Enabling the AI

To activate these AI features, you must configure your environment to use Groq:

1.  **Account:** Ensure you have a valid [Groq](https://groq.com/) account.
2.  **API Key:** Generate an API token from the Groq dashboard.
3.  **Environment Setup:** Add the following variable to the backend `.env` file (`backend/src/.env`):
    ```bash
    GROQ_API_KEY=your_token_here
    ```

## Guiding Your Workflow with Sample Prompts

The interface provides **Sample Prompts** to help guide you on how to interact with the agents effectively. These serve as templates for common tasks:

| Agent Type | Sample Prompt Examples |
| :--- | :--- |
| **Data Query** | "Get me the top 10 from 'schema_name.table_name'" |
| **Pipeline** | "Create a pipeline that pulls from Kafka and dumps to SQL Server" |
| **Environment** | "Show me the secrets I have configured" |

## Limits and behaviour

*   **Daily message limit:** `CONVERSATION_TURN_LIMIT` (backend `.env`) caps how many messages each user can send per day; `-1` disables the limit.
*   **Sessions:** conversation history is kept in the backend's memory, so it resets when the backend restarts.
*   **Needs data:** the Data Query agent starts only when your namespace already has pipeline output; otherwise it asks you to create data first.
