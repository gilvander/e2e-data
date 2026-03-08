# 🤖 AI Agent & Sample Prompts

The AI side of e2e-Data provides a powerful suite of assistants designed to accelerate your data engineering tasks. Currently, the platform features three specialized agents that leverage **Groq-inferred models** to provide near-instant responses.

## Core AI Capabilities

*   **Data Query Agent:** Focuses on interacting with your pipeline results. For now, this is optimized for **DuckDB** destinations, allowing you to query schemas and data using natural language (e.g., "What tables do you know from the Database Schema?").
*   **Pipeline Agent:** Assists in architectural drafting. You can use it to build pipelines by describing your intent—such as pulling from Oracle and writing to Postgres—or to ask questions about which nodes are currently supported.
*   **Environment Bot (v1):** Helps you stay organized by retrieving information about your current workspace configuration, such as viewing configured secrets or API settings.

## Configuration: Enabling the AI

To activate these AI features, you must configure your environment to use Groq:

1.  **Account:** Ensure you have a valid [Groq](https://groq.com/) account.
2.  **API Key:** Generate an API token from the Groq dashboard.
3.  **Environment Setup:** Add the following variable to your `.env` file in the root directory:
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
