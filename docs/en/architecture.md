# Architecture

e2e-Data turns a visual diagram into a [dltHub](https://dlthub.com/) Python script, runs it, and lands the data in your destination.

```
Browser (Still.js UI)  ──HTTP──►  Backend (Flask)  ──►  Pipeline script (Python + dlt)  ──►  Destination
         ▲                            │   │                       │
         └────── live logs (Socket.IO)┘   └── HashiCorp Vault     └── Sources (files, S3, SQL, APIs, code)
                                          └── DuckDB / LanceDB (workspace, logs, catalog)
```

## Components

| Component | Role |
| :--- | :--- |
| **Frontend** | Static Still.js app: canvas, menus, editors, Data Viz. Served by Nginx or the Still CLI. |
| **Backend** | Flask API. Converts the diagram to a script, runs it as a separate process, streams output to the UI. |
| **Node templates** | Each node type fills a script template (file/bucket, SQL, API, DLT code, outputs). |
| **Vault** | Stores database, API and cloud credentials per user. Scripts read them at run time. |
| **DuckDB** | Default destination; also stores workspace data, schedules and logs. |
| **LanceDB** | Stores the [Data Catalog](data-catalog.md) and its vector embeddings. |
| **Scheduler** | Background thread that runs saved pipelines every N minutes/hours. |
| **AI agents** | Groq-powered assistants for pipelines, data queries and catalog search. |

## What happens when you click Run & Save

1.  The UI sends the diagram to the backend with your user (namespace) and a live-log connection id.
2.  Transformations are converted to code and each node validates its settings.
3.  The node templates are merged into a Python script, which is checked against the code-safety rules.
4.  The script is saved under your user's folder and started as its own process.
5.  Its output is streamed to the **Monitor** and stored as logs; each node reports success or error.
6.  On success, the diagram is saved, pipeline metadata is recorded, and the Data Catalog is updated.

## Multi-user isolation

Each user has a namespace that scopes uploaded files, generated scripts, DuckDB outputs, Vault secrets and AI agent sessions.

## Deeper reference

Developers can find the API reference, storage layout and internal design in the repository under `docs/` of the `dlt-client` project.
