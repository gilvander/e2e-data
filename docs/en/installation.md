# Installation & Configuration

e2e-Data has three parts: the **backend** (Python/Flask API that runs your pipelines), the **frontend** (a static [Still.js](https://stilljs.dev/) app) and **HashiCorp Vault** (secret storage). You can run everything with Docker Compose or set each part up locally.

## Requirements

*   Python 3.12+ (local setup)
*   Docker (needed for Vault, and for the all-in-one Docker setup)
*   `make` (local setup; on macOS `xcode-select --install`, on Linux `build-essential`, on Windows use `choco`/`scoop`/`winget` or WSL)
*   Node.js and NPM, to install the Still.js CLI (`npm install -g @stilljs/cli`)
*   SQL Server only: Microsoft ODBC Driver 18 and unixODBC (see [SQL Server dependencies](#sql-server-dependencies))
*   Optional: the DuckDB CLI and [`uv`](https://docs.astral.sh/uv/) (the Makefile uses `uv` automatically when it is installed)

## Option A: Docker Compose

From the repository root:

```bash
docker compose up --build
```

This starts:

| Service | Port | Description |
| :--- | :--- | :--- |
| `backend` | 8000 | The API and pipeline engine |
| `nginx` | 8080 | Serves the UI |
| `vault` | 8200 | Vault in **dev mode** (root token `root`, data is lost on restart) |

Open `http://localhost:8080`. The backend folders (`backend/dbs`, `backend/destinations`) are mounted into the container, so your files and generated pipelines stay in your working copy.

!!! warning "Dev-mode Vault"
    The bundled Vault is meant for local use only. For anything shared or production, use a real Vault deployment (HashiCorp Cloud or self-hosted) and a restricted token.

## Option B: Local setup

### 1. Vault

```bash
docker compose -f vault/docker-compose.yml up -d
```

### 2. Backend

```bash
cd backend
make install
python src/app.py
```

`make install` installs the Python dependencies and then runs `setup_extensions.py`, which installs the DuckDB **lance** extension required by the [Data Catalog](data-catalog.md). If you install dependencies manually with `pip install -r requirements.txt`, run `python setup_extensions.py` afterwards, otherwise the Data Catalog will not work and the workspace shows a *"LanceDB Extension Not Found"* warning.

!!! note "Updating an existing environment"
    Whenever `requirements.txt` changes (for example when the Data Catalog was introduced), re-run `make install` before starting the backend.

### 3. Frontend

```bash
cd ui
st serve
```

Then open the address printed by the CLI (normally `http://localhost:8080`). That address must be listed in `ALLOW_ORIGINS` on the backend.

## Nginx: serving the UI

The frontend is a set of static files, so any web server can host it. The Docker Compose setup uses the `nginx:alpine` image.

| Item | Value |
| :--- | :--- |
| Image | `nginx:alpine` (service `nginx`) |
| Port | `8080` |
| Web root | the `ui/` folder, mounted at `/usr/share/nginx/html` |
| Configuration | `nginx/default.conf`, mounted at `/etc/nginx/conf.d/default.conf` |

The configuration listens on 8080, serves `ui/` and falls back to `index.html` for any path that is not a file:

```nginx
server {
    listen 8080;

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri /index.html;
    }
}
```

Things to know:

*   **No proxy is required.** The browser talks to the backend directly, using `httpClient.baseUrl` and `websocketAddr` from `ui/config/settings`. Update both if the backend runs on another host or port.
*   **CORS:** the address you open in the browser (for example `http://localhost:8080`) must be listed in `ALLOW_ORIGINS` on the backend.
*   **Running without Docker:** point your own Nginx (or Apache) at the `ui/` folder with the same `try_files` rule, or use `st serve` for development.
*   **Production:** terminate TLS in Nginx and use `https://` for `httpClient.baseUrl` and `wss://` for `websocketAddr`.

## SQL Server dependencies

To read from or write to **Microsoft SQL Server**, the backend needs an ODBC driver on the machine where it runs (the Python package `pyodbc` is already included in `requirements.txt`):

*   **Microsoft ODBC Driver 18 for SQL Server** (`msodbcsql18`)
*   **unixODBC** (`unixodbc`) on Linux and macOS

How to get them:

*   **Docker Compose:** nothing to do. The backend image installs both (Debian 12, with the Microsoft package repository).
*   **Local setup:** install the driver following Microsoft's instructions for your operating system, then restart the backend. On Debian/Ubuntu, for example, install `unixodbc` and `msodbcsql18` (accepting the Microsoft EULA).

If the driver is missing, testing a SQL Server connection in **Connection Settings** fails with an ODBC driver error. Other engines (Oracle, PostgreSQL, MySQL/MariaDB) do not need this driver. See [Source Integration](source-integration.md).

## Backend configuration (`backend/src/.env`)

#### Application server

*   **APP_SRV_ADDR:** The address of the backend itself (e.g. `http://localhost:8000`). The port is read from it, and it is also used by the scheduler.
*   **ALLOW_ORIGINS:** Comma-separated list of UI addresses allowed to connect (e.g. `http://127.0.0.1:8080, http://localhost:8080`).
*   **GROQ_API_KEY:** Groq API key, used by the [AI agents](ai-agent.md) and by the Data Catalog's semantic suggestions.

#### Limits (testing / demo environments)

*   **TOTAL_ALLOWED_UPLOADS:** Maximum number of uploaded files per user. `-1` means unlimited. Must be set.
*   **CONVERSATION_TURN_LIMIT:** Daily number of messages each user can send to the AI agent. `-1` means unlimited. Must be set.

#### Vault

*   **HASHICORP_HOST:** Vault address. Dev default: `http://127.0.0.1:8200`.
*   **HASHICORP_TOKEN:** Vault token. Dev default: `root`.
*   **HASHICORP_CERTIF_PATH:** *(optional)* CA certificate for TLS connections to Vault.

When running with Docker Compose, `VAULT_ADDR` and `VAULT_TOKEN` are set for you and take precedence.

#### Analytics

*   **AN_TOTAL_THREADS / AN_MAX_MEMORY:** DuckDB thread count and memory limit used by the analytics queries behind [Data Viz](analytics.md).

## DLT Code node security

To prevent unauthorized code execution, DLT Code nodes and code cells only accept imports that are on an allowlist, and calls/attributes considered dangerous are rejected.

*   **Location:** `backend/src/utils/code_node_util.py`
*   **Variable:** `valid_imports` (a list of exact import lines).
*   **Action:** Add the exact `import ...` / `from ... import ...` line you need to this list and restart the backend.

## Frontend configuration (`ui/config/settings`)

The UI picks the settings file automatically: `default.json` when served from `mvp2.e2e-data.com` (or `dlt-c.cloud`), `dev.json` everywhere else.

| Key | Description |
| :--- | :--- |
| **httpClient.baseUrl** | Backend URL. Must match `APP_SRV_ADDR` (e.g. `http://localhost:8000`). |
| **websocketAddr** | Websocket address of the backend, using the `/pipeline` path (e.g. `ws://localhost:8000/pipeline`, or `wss://` behind TLS). |
| **anonymousLogin** | `true` lets anyone log in without authentication (local use). |
| **auth0.domain / auth0.clientId** | Auth0 settings for social login. Used when `anonymousLogin` is `false`. |
| **fileUploadSizeLimit** | Maximum upload size shown/enforced by the UI (e.g. `500m`). |
| **maxAgentConversationTurns** | Message limit for the AI agent in the UI (`null` = no limit). |

## First run checklist

1.  Vault is running and `HASHICORP_*` (or `VAULT_*`) point to it.
2.  Backend started without errors and shows `Running on http://127.0.0.1:8000`.
3.  Frontend opens and the log-in screen appears (use anonymous login for local testing).
4.  No *LanceDB Extension Not Found* warning in the workspace.
5.  Follow the [Quick Start](getting-started.md) to run your first pipeline.
