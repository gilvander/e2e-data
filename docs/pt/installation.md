# Instalação & Configuração

O e2e-Data tem três partes: o **backend** (API Python/Flask que executa os teus pipelines), o **frontend** (uma app estática [Still.js](https://stilljs.dev/)) e o **HashiCorp Vault** (armazenamento de segredos). Podes correr tudo com Docker Compose ou configurar cada parte localmente.

## Requisitos

*   Python 3.12+ (instalação local)
*   Docker (necessário para o Vault e para a instalação Docker completa)
*   `make` (instalação local; no macOS `xcode-select --install`, no Linux `build-essential`, no Windows usa `choco`/`scoop`/`winget` ou WSL)
*   Node.js e NPM, para instalar o CLI do Still.js (`npm install -g @stilljs/cli`)
*   Opcional: o CLI do DuckDB e o [`uv`](https://docs.astral.sh/uv/) (o Makefile usa o `uv` automaticamente quando está instalado)

## Opção A: Docker Compose

Na raiz do repositório:

```bash
docker compose up --build
```

Isto inicia:

| Serviço | Porta | Descrição |
| :--- | :--- | :--- |
| `backend` | 8000 | A API e o motor de pipelines |
| `nginx` | 8080 | Serve a UI |
| `vault` | 8200 | Vault em **modo dev** (token root `root`, os dados perdem-se ao reiniciar) |

Abre `http://localhost:8080`. As pastas do backend (`backend/dbs`, `backend/destinations`) são montadas no contentor, por isso os teus ficheiros e pipelines gerados ficam na tua cópia de trabalho.

!!! warning "Vault em modo dev"
    O Vault incluído serve apenas para uso local. Para ambientes partilhados ou de produção, usa um Vault real (HashiCorp Cloud ou self-hosted) e um token restrito.

## Opção B: Instalação local

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

O `make install` instala as dependências Python e depois executa o `setup_extensions.py`, que instala a extensão **lance** do DuckDB, necessária para o [Data Catalog](data-catalog.md). Se instalares as dependências manualmente com `pip install -r requirements.txt`, executa `python setup_extensions.py` a seguir; caso contrário o Data Catalog não funciona e o workspace mostra o aviso *"LanceDB Extension Not Found"*.

!!! note "Atualizar um ambiente existente"
    Sempre que o `requirements.txt` muda (por exemplo quando o Data Catalog foi introduzido), volta a executar `make install` antes de iniciar o backend.

### 3. Frontend

```bash
cd ui
st serve
```

Depois abre o endereço mostrado pelo CLI (normalmente `http://localhost:8080`). Esse endereço tem de constar em `ALLOW_ORIGINS` no backend.

## Configuração do backend (`backend/src/.env`)

#### Servidor da aplicação

*   **APP_SRV_ADDR:** O endereço do próprio backend (ex.: `http://localhost:8000`). A porta é lida daqui e o agendador também o usa.
*   **ALLOW_ORIGINS:** Lista separada por vírgulas dos endereços da UI autorizados a ligar-se (ex.: `http://127.0.0.1:8080, http://localhost:8080`).
*   **GROQ_API_KEY:** Chave de API da Groq, usada pelos [agentes de IA](ai-agent.md) e pelas sugestões semânticas do Data Catalog.

#### Limites (ambientes de teste / demonstração)

*   **TOTAL_ALLOWED_UPLOADS:** Número máximo de ficheiros carregados por utilizador. `-1` significa ilimitado. Tem de estar definido.
*   **CONVERSATION_TURN_LIMIT:** Número diário de mensagens que cada utilizador pode enviar ao agente de IA. `-1` significa ilimitado. Tem de estar definido.

#### Vault

*   **HASHICORP_HOST:** Endereço do Vault. Valor dev: `http://127.0.0.1:8200`.
*   **HASHICORP_TOKEN:** Token do Vault. Valor dev: `root`.
*   **HASHICORP_CERTIF_PATH:** *(opcional)* Certificado CA para ligações TLS ao Vault.

Com Docker Compose, `VAULT_ADDR` e `VAULT_TOKEN` são definidos por ti e têm prioridade.

#### Analytics

*   **AN_TOTAL_THREADS / AN_MAX_MEMORY:** Número de threads e limite de memória do DuckDB usados pelas consultas de analytics por trás do [Data Viz](analytics.md).

## Segurança dos nós DLT Code

Para impedir a execução de código não autorizado, os nós DLT Code só aceitam importações que estejam numa lista permitida, e chamadas/atributos considerados perigosos são rejeitados.

*   **Localização:** `backend/src/utils/code_node_util.py`
*   **Variável:** `valid_imports` (uma lista de linhas de importação exatas).
*   **Ação:** Adiciona a linha exata `import ...` / `from ... import ...` de que precisas a esta lista e reinicia o backend.

## Configuração do frontend (`ui/config/settings`)

A UI escolhe o ficheiro de configuração automaticamente: `default.json` quando servida a partir de `mvp2.e2e-data.com` (ou `dlt-c.cloud`), `dev.json` em todos os outros casos.

| Chave | Descrição |
| :--- | :--- |
| **httpClient.baseUrl** | URL do backend. Tem de coincidir com `APP_SRV_ADDR` (ex.: `http://localhost:8000`). |
| **websocketAddr** | Endereço websocket do backend, com o caminho `/pipeline` (ex.: `ws://localhost:8000/pipeline`, ou `wss://` atrás de TLS). |
| **anonymousLogin** | `true` permite iniciar sessão sem autenticação (uso local). |
| **auth0.domain / auth0.clientId** | Definições Auth0 para início de sessão social. Usadas quando `anonymousLogin` é `false`. |
| **fileUploadSizeLimit** | Tamanho máximo de upload mostrado/aplicado pela UI (ex.: `500m`). |
| **maxAgentConversationTurns** | Limite de mensagens ao agente de IA na UI (`null` = sem limite). |

## Checklist do primeiro arranque

1.  O Vault está a correr e `HASHICORP_*` (ou `VAULT_*`) apontam para ele.
2.  O backend arrancou sem erros e mostra `Running on http://127.0.0.1:8000`.
3.  O frontend abre e aparece o ecrã de início de sessão (usa o início de sessão anónimo para testes locais).
4.  Nenhum aviso *LanceDB Extension Not Found* no workspace.
5.  Segue o [Guia Rápido](getting-started.md) para executar o teu primeiro pipeline.
