# User Guide

## Login
- Social via Google (Auth0)
- Anonymous mode for local development

## Dashboard
- “New Pipeline” button
- List of pipelines (status, date, version)

## Create a basic pipeline
1. Click **New Pipeline**
2. Add nodes: `Start` → `Bucket Input` or `Local File Input` → `Transform` (optional) → `DuckDB Output`
3. Connect nodes with the mouse
4. Open each node’s settings and fill required fields
5. Click **Save & Run**

## Ingestion from public S3
- Set `Bucket` and `Path` (prefix)
- Use `file pattern` to filter files (e.g., `*.csv`, `people_*.parquet`)
- MVP1 supports public buckets only

## Ingestion from filesystem
- Select local directories exposed by the server
- Define `file pattern` and check permissions

## Logs
- Follow execution in real time
- Filter by node (Start, Input, Transform, Output)
- Clear logs when needed

## SQL Editor
- Open the editor
- Run `SELECT * FROM table LIMIT 10`
- Use query history to repeat executions

## AI Agent
- Examples:
  - “What tables exist in the database?”
  - “Get the top 10 rows from the people table.”
  - “Explain the schema in simple terms.”
- Note: always validate queries when needed
