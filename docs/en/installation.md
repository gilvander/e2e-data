# Installation & Configuration

## Configuration & Environment Setup

Setting up e2e-Data requires configuring both the backend (API) and the frontend (UI). While some of the default settings are tied to the Development environment, the principles apply across all stages.

### 1. Backend: Environment Variables (`.env`)

The `.env` file in the application root controls server behavior, security, and external integrations.

#### Application Server Connectivity
*   **ALLOW_ORIGINS:** A comma-separated list of IPs or domains (typically the UI address) permitted to connect to the API. The IPs are separated by commas.
*   **APP_SRV_ADDR:** The actual backend IP, which is used in specific scenarios such as pipeline scheduling.
*   **GROQ_API_KEY:** The API key for Groq. This powers the AI agents by using LLM models through Groq's infrastructure.

#### Resource Constraints (Testing/Staging)
These variables help manage costs and performance in limited environments:
*   **TOTAL_ALLOWED_UPLOADS:** Sets a limit on how many files can be uploaded. If set to `-1`, it will be unlimited.
*   **CONVERSATION_TURN_LIMIT:** Specifies how many messages can be sent to the AI agent daily. If set to `-1`, it will be unlimited.

#### Security: HashiCorp Vault
e2e-Data uses Vault for sensitive secret management:
*   **HASHICORP_HOST:** The host address/IP of your Vault server.
    *   **Dev Default:** `http://127.0.0.1:8200` (Assigned via the Docker container located inside the `/vault` folder).
*   **HASHICORP_TOKEN:** The vault authentication token.
    *   **Dev Default:** `root`.

### 2. DLT-Code Node Security

To prevent unauthorized code execution, the platform uses a Python import allowlist.

*   **Location:** `backend/src/utils/code_node_util.py`
*   **Variable:** `valid_imports` (a list).
*   **Action:** You must explicitly add any library or statement you want to be allowed in the DLT-code node here.

### 3. Frontend Configuration

The UI determines which settings to load based on the environment flag in `ui/config/app-setup.js`.

#### Environment Switching
*   **isCloud Flag:** This flag determines which setting (`dev` or `default`) to load.
*   **Production Logic:** The code verifies if the address is `dlt-c.cloud` or `mvp2.e2e-data.com`; if so, the `default.json` is loaded.

#### Settings Structure (`default.json` / `dev.json`)
The following parameters define the production behavior:

| Key | Description |
| :--- | :--- |
| **httpClient.baseUrl** | The base URL of your API (e.g., `https://e2e-data.com:443`). |
| **websocketAddr** | The address where the application websocket is served (`wss://`) using the `/pipeline` path. |
| **auth0** | Receives the `domain` and `clientId` for authentication. |
| **fileUploadSizeLimit** | The maximum file size for uploads (e.g., `5m`). |
| **maxAgentConversationTurns** | The limit of messages that can be sent to the AI agent. |

## Development Environment Setup

### Requirements
*   Python 3.12+
*   DuckDB installed
*   SteelJS CLI
*   NPM

### Steps
1.  Clone repository
2.  Create virtual environment
    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    ```
3.  Install backend dependencies
    ```bash
    pip install -r requirements.txt
    ```
4.  Run backend
    ```bash
    python app.py
    ```
5.  Run frontend with SteelJS
    ```bash
    stl serve
    ```
6.  Configure anonymous login
7.  Local file uploads
8.  Create local pipelines
9.  Test ingestion and queries
