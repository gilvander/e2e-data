import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

const resources = {
  en: {
    translation: {
      brand: { logoAlt: "e2e‑Data logo", logoAria: "e2e‑Data logo" },
      nav: { home: "Home", product: "Product", developers: "Developers", docs: "Documentation", help: "Help", whatsapp: "WhatsApp", openMenu: "Open menu" },
      language: { label: "Language" },
      theme: { label: "Theme" },
      common: { demoUrlLabel: "Try the live demo", docs: "Read documentation", illustrative: "Illustrative example" },
      home: {
        title: "e2e‑Data",
        lead: "End‑to‑end support from collection to visualization",
        heroBody: "An open-source data platform that turns diagrams into production-ready dltHub pipelines: from ingestion to catalog, BI and AI-assisted queries, with credentials kept in HashiCorp Vault.",
        ctaDemo: "Try the live demo",
        ctaDocs: "Read documentation",
        trust: ["Open source", "Self-hosted or cloud", "Secrets in HashiCorp Vault", "Built on dltHub and DuckDB"],
        previewTitle: "From diagram to data in minutes",
        previewCaption: "Illustrative example: a CSV file loaded into DuckDB. Every node is real Python/dlt code behind the scenes.",
        featuresTitle: "Why use e2e‑Data?",
        features: {
          e2eTitle: "Visual Engineering",
          e2eDesc: "Architect complex data flows on an interactive canvas. The diagram is the logic.",
          docsTitle: "Code-Powered Nodes",
          docsDesc: "Every node is backed by optimized Python logic and dltHub, ensuring high performance without the overhead of manual coding.",
          chatTitle: "AI-Architect",
          chatDesc: "Describe your goal in plain language, and the AI will draft the diagram for you, selecting the appropriate nodes and establishing the flow.",
          catalogTitle: "Data Catalog",
          catalogDesc: "Every load is cataloged column by column, with schema history and AI-suggested semantic meaning you can review and validate.",
          biTitle: "Built-in BI",
          biDesc: "Explore data with charts, pivot tables and dashboards on analytics-optimized (bronze/gold) pipelines, without leaving the workspace.",
          secureTitle: "Secure and observable",
          secureDesc: "Credentials live in Vault, runs are logged with an execution id, and you can monitor them live or analyse past runs."
        },
        seriousTitle: "Built for serious data work",
        serious: {
          securityTitle: "Security and governance",
          securityItems: ["Credentials stored in HashiCorp Vault, never in diagrams or scripts", "Isolated namespace per user: files, secrets and outputs", "Allowlist for custom Python code", "Execution logs with unique ids for auditing"],
          connectorsTitle: "Connectors",
          connectorsItems: ["Oracle, SQL Server, PostgreSQL, MySQL/MariaDB", "Files and Amazon S3 buckets (public or private)", "REST APIs with pagination and authentication", "Kafka, MongoDB, Airtable and more via dltHub code"],
          destinationsTitle: "Destinations",
          destinationsItems: ["DuckDB (default)", "SQL databases", "Google BigQuery", "Databricks"],
          deployTitle: "Deployment",
          deployItems: ["Open source", "Docker Compose in a single command", "Self-host on-prem or in your own cloud/VPC", "Bring your own Vault (cloud or self-hosted)"]
        },
        architectureTitle: "Architecture at a glance",
        architectureAlt: "e2e-Data architecture diagram: Still.js UI, backend engine with dltHub, Polars, DuckDB and pandas, Vault for secrets and Groq for AI",
        architectureCaption: "Still.js interface, a Python backend powered by dltHub and DuckDB, secrets in Vault, and LLMs for assisted workflows.",
        arch: {
          uiTitle: "UI (Still.js)",
          uiItems: ["Data ingestion with schema inference", "Diagrammed and scheduled pipelines", "Pipeline execution logs", "AI-assisted guidance", "Query DuckDB ingested data"],
          engineTitle: "Backend Engine",
          thirdTitle: "Third party",
          vaultDesc: "Secret management · cloud or self-hosted",
          groqDesc: "LLM inference · provided from the cloud",
          note: "Illustrative: the highlighted path changes as each capability is used."
        },
        cycleTitle: "How the data cycle works",
        cycleLabels: {
          collect: "Extract",
          transform: "Transform",
          validate: "Validate",
          store: "Load",
          visualize: "Visualize",
          analyze: "Analyze"
        },
        cycleDesc: {
          collect: "Receive data from files, S3 buckets (public or private), SQL databases, REST APIs or custom code.",
          transform: "Apply visual transformations or custom Python logic, with a live preview.",
          validate: "Keep data consistent with dltHub schema management and a column-level catalog.",
          store: "Efficient storage in DuckDB, SQL databases, BigQuery or Databricks.",
          visualize: "Explore results with the SQL editor, charts, pivots and dashboards.",
          analyze: "Ask questions in natural language and get fast, actionable insights."
        },
        cycleOutro: "e2e‑Data combines simplicity with technical power, enabling companies to build complete data solutions without hassle.",
        finalTitle: "Ready to build your first pipeline?",
        finalBody: "Try the live demo or run it yourself with a single Docker Compose command."
      },
      product: {
        title: "Product",
        lead: "e2e‑Data was born to simplify modern data engineering.",
        body1: "In a context where companies need to transform data quickly, integrate heterogeneous sources and create repeatable processes, the platform offers a clear approach:",
        body2: "visual design, code power.",
        pills: { mission: "Mission", platform: "Platform", transparency: "Transparency", audience: "Target audience", roadmap: "Roadmap" },
        missionTitle: "Our mission",
        missionBody: "Bridge the gap between engineering and analysis, enabling any team to build production-ready pipelines with the robustness of Python and the simplicity of low-code.",
        missionCta: "See documentation",
        platformTitle: "What the platform offers",
        platform: {
          pipelinesVisualTitle: "Visual pipelines",
          pipelinesVisualDesc: "Build data pipelines by dragging nodes. The platform generates the underlying Python/dlt code for you, which you can download and run anywhere.",
          supportMultipleTitle: "Sources and destinations",
          supportMultipleItems: ["Files and Amazon S3 buckets (public or private)", "SQL databases: Oracle, SQL Server, PostgreSQL, MySQL/MariaDB", "REST APIs, Kafka, MongoDB and more via dltHub code", "Load into DuckDB, SQL databases, BigQuery or Databricks"],
          transformIntelligentTitle: "Intelligent transformations",
          transformIntelligentItems: ["No-code visual transformations with live preview", "Custom Python scripts", "Schema evolution handling"],
          catalogTitle: "Catalog and analytics",
          catalogItems: ["Column-level data catalog with schema history", "AI-suggested semantic concepts, reviewed by you", "Charts, pivot tables and dashboards", "Analytics-optimized pipelines (bronze and gold layers)"],
          intelligenceAssistiveTitle: "Assistive intelligence",
          intelligenceAssistiveIntro: "The AI Agent helps with:",
          intelligenceAssistiveItems: ["Pipeline drafting", "SQL queries in natural language", "Catalog search by meaning", "Data exploration"],
          secureTitle: "Secure by design",
          secureItems: ["Credentials stored in HashiCorp Vault", "Isolated namespace per user", "Allowlist for custom code", "Bring your own Vault"]
        },
        transparencyTitle: "Operational transparency",
        transparencyItems: [
          { title: "Detailed logs", desc: "Access complete logs for every step of your pipeline execution, ensuring full auditability." },
          { title: "Visualized steps", desc: "Monitor data flow in real time with our visual interface, node by node." },
          { title: "Run history", desc: "Analyse past executions, success rates, durations and records loaded over time." },
          { title: "Pipeline versions", desc: "Each update keeps the previous version of the pipeline script. Version diff and rollback are on the roadmap." }
        ],
        audienceTitle: "Who is it for?",
        audienceItems: ["Data teams", "Analysts", "Data engineers", "Startups", "Small businesses without a fixed technical team"],
        roadmapTitle: "Roadmap",
        roadmapIntro: "What exists today and what we are building next.",
        roadmapNow: "Available today",
        roadmapNext: "Planned",
        roadmapNowItems: ["Visual pipelines with live monitoring", "Private S3, SQL, API and code sources", "Data catalog with semantic model", "Analytics and BI (charts, pivots, dashboards)", "Scheduling every N minutes or hours", "Vault-backed secrets"],
        roadmapNextItems: ["Daily, weekly and monthly schedules", "Pipeline version diff and rollback", "More cloud storage providers", "Public REST API and SDKs", "Admin UI for code permissions and catalog rules", "Read-only validation for BI queries"],
        closing: "e2e‑Data removes friction, accelerates processes and democratizes access to professional data engineering."
      },
      docs: { title: "Documentation" },
      developers: {
        title: "Developers",
        lead: "Open source, self-hostable and documented from the UI to the engine.",
        sections: {
          docs: {
            title: "Documentation",
            desc: "User guides for every node and menu, plus installation and configuration for your own environment.",
            cta: "Open documentation"
          },
          demo: {
            title: "Live demo",
            desc: "Explore the platform in the cloud sandbox with social login, no installation needed.",
            cta: "Try the demo"
          },
          community: {
            title: "Community",
            desc: "Join our Discord server to ask questions, share feedback, and connect with other developers.",
            cta: "Join Discord"
          },
          opensource: {
            title: "Open Source",
            desc: "Contribute to our core components and connectors on GitHub.",
            cta: "View on GitHub"
          }
        }
      },
      help: {
        title: "Help",
        lead: "Here you will find answers to frequently asked questions, quick guides, and solutions to common problems.",
        docsLink: "Browse the full documentation",
        cards: {
          faq: {
            title: "Frequently Asked Questions (FAQ)",
            items: [
              { q: "How do I log in?", a: "Use social login on the cloud version, or anonymous login when running it locally." },
              { q: "What data can I ingest?", a: "CSV, JSON and Parquet files, Amazon S3 buckets, SQL databases (Oracle, SQL Server, PostgreSQL, MySQL/MariaDB), REST APIs and custom dltHub code." },
              { q: "Can I use private buckets?", a: "Yes. Save the access keys in Connection Settings (they are stored in Vault) and pick that secret in the Bucket node." },
              { q: "Where does my data go?", a: "To DuckDB by default. You can also load into SQL databases, BigQuery or Databricks." },
              { q: "Can I run pipelines automatically?", a: "Yes. Save the pipeline and schedule it to run every N minutes or hours." }
            ]
          },
          pipeline: {
            title: "How to create my first pipeline?",
            steps: [
              "Open <1>Data Files</1> and upload a CSV file.",
              "Open <1>Diagram</1> and drag <1>Start</1>, <1>Input - Bucket</1> and <1>Duckdb</1> onto the canvas, then connect them.",
              "In the Bucket node pick your file; in the DuckDB node enter a database and table name.",
              "Click <1>Run & Save</1> and follow the live logs. Check the result in <1>DLT Pipelines Outputs</1>."
            ]
          },
          env: {
            title: "Run it yourself",
            steps: [
              "Install <1>Docker</1>.",
              "From the project folder, run <1>docker compose up --build</1>.",
              "Open <1>http://localhost:8080</1> and log in anonymously.",
              "Add your GROQ_API_KEY to <1>backend/src/.env</1> to enable the AI agents."
            ]
          }
        }
      },
      footer: {
        top: "e2e‑Data helps teams build complete data pipelines with simplicity and speed.",
        rights: "© {{year}} e2e‑Data. All rights reserved."
      },
        chat: {
          hint: "Docs Assistant",
          close: "Close",
          placeholder: "Search docs...",
          send: "Send",
          sending: "Sending",
          typing: "Typing…",
          welcome: "Hi! I'm the docs assistant. I can help you find topics in the manuals.",
          errorSend: "Failed to send",
          sendToDiscord: "Send to Discord",
          discordSent: "Message sent to Discord",
          discordNotConfigured: "Discord channel is not configured.",
          channel: { discord: "Discord", support: "support" },
          fallbackNoAnswer: "I couldn't find anything in the docs. Try rephrasing or using more specific keywords.",
          replyIntro: "Here is a brief guidance based on the documentation:",
          stepsIntro: "Follow these steps:",
          copy: "Copy",
          copied: "Copied!",
          useful: "Useful",
          notUseful: "Not useful",
          showTopics: "Show topics",
          hideTopics: "Hide topics",
          suggestions: [
            "Create my first pipeline",
            "Connections and secrets",
            "Sources and destinations",
            "Transformations",
            "Data Catalog",
            "Data Viz and analytics",
            "Scheduling",
            "Monitoring and logs",
            "Versioning",
            "AI Agent",
            "Architecture",
            "Installation"
          ]
          ,
          followUps: [
            { label: "Explain in more detail", action: "explain" },
            { label: "Give an example", action: "example" },
            { label: "Summarize", action: "summary" },
            { label: "Open documentation", action: "openDoc" }
          ]
        }
    }
  },
  pt: {
    translation: {
      brand: { logoAlt: "logotipo e2e‑Data", logoAria: "logotipo e2e‑Data" },
      nav: { home: "Início", product: "Produto", developers: "Programadores", docs: "Documentação", help: "Ajuda", whatsapp: "WhatsApp", openMenu: "Abrir menu" },
      language: { label: "Idioma" },
      theme: { label: "Tema" },
      common: { demoUrlLabel: "Experimentar a demo", docs: "Ler documentação", illustrative: "Exemplo ilustrativo" },
      home: {
        title: "e2e‑Data",
        lead: "Suporte end‑to‑end da recolha à visualização",
        heroBody: "Uma plataforma de dados open source que transforma diagramas em pipelines dltHub prontos para produção: da ingestão ao catálogo, BI e consultas assistidas por IA, com as credenciais guardadas no HashiCorp Vault.",
        ctaDemo: "Experimentar a demo",
        ctaDocs: "Ler documentação",
        trust: ["Open source", "Self-hosted ou cloud", "Segredos no HashiCorp Vault", "Construído sobre dltHub e DuckDB"],
        previewTitle: "Do diagrama aos dados em minutos",
        previewCaption: "Exemplo ilustrativo: um ficheiro CSV carregado para DuckDB. Cada nó é código Python/dlt real por trás.",
        featuresTitle: "Porquê usar a e2e‑Data?",
        features: {
          e2eTitle: "Engenharia Visual",
          e2eDesc: "Arquiteta fluxos de dados complexos num canvas interativo. O diagrama é a lógica.",
          docsTitle: "Nós Potenciados por Código",
          docsDesc: "Cada nó é suportado por lógica otimizada em Python e dltHub, garantindo alto desempenho sem a sobrecarga de codificação manual.",
          chatTitle: "AI-Architect",
          chatDesc: "Descreve o teu objetivo em linguagem simples, e a IA fará o esboço do diagrama por ti, selecionando os nós apropriados e estabelecendo o fluxo.",
          catalogTitle: "Data Catalog",
          catalogDesc: "Cada carga é catalogada coluna a coluna, com histórico de esquema e significado semântico sugerido por IA que podes rever e validar.",
          biTitle: "BI integrado",
          biDesc: "Explora os dados com gráficos, tabelas dinâmicas e dashboards em pipelines otimizados para analytics (bronze/gold), sem sair do workspace.",
          secureTitle: "Seguro e observável",
          secureDesc: "As credenciais ficam no Vault, cada execução é registada com um id e podes monitorizá-la em direto ou analisar execuções passadas."
        },
        seriousTitle: "Pensada para trabalho de dados a sério",
        serious: {
          securityTitle: "Segurança e governação",
          securityItems: ["Credenciais no HashiCorp Vault, nunca em diagramas ou scripts", "Namespace isolado por utilizador: ficheiros, segredos e outputs", "Lista de permissões para código Python personalizado", "Logs de execução com ids únicos para auditoria"],
          connectorsTitle: "Conectores",
          connectorsItems: ["Oracle, SQL Server, PostgreSQL, MySQL/MariaDB", "Ficheiros e buckets Amazon S3 (públicos ou privados)", "APIs REST com paginação e autenticação", "Kafka, MongoDB, Airtable e mais via código dltHub"],
          destinationsTitle: "Destinos",
          destinationsItems: ["DuckDB (por defeito)", "Bases de dados SQL", "Google BigQuery", "Databricks"],
          deployTitle: "Instalação",
          deployItems: ["Open source", "Docker Compose com um só comando", "Self-host on-prem ou na tua cloud/VPC", "Traz o teu Vault (cloud ou self-hosted)"]
        },
        architectureTitle: "Arquitetura num relance",
        architectureAlt: "Diagrama de arquitetura da e2e-Data: UI Still.js, motor backend com dltHub, Polars, DuckDB e pandas, Vault para segredos e Groq para IA",
        architectureCaption: "Interface Still.js, backend Python assente em dltHub e DuckDB, segredos no Vault e LLMs para fluxos assistidos.",
        arch: {
          uiTitle: "UI (Still.js)",
          uiItems: ["Ingestão de dados com inferência de esquema", "Pipelines desenhados e agendados", "Logs de execução dos pipelines", "Assistência com IA", "Consulta aos dados ingeridos em DuckDB"],
          engineTitle: "Motor Backend",
          thirdTitle: "Terceiros",
          vaultDesc: "Gestão de segredos · cloud ou self-hosted",
          groqDesc: "Inferência de LLMs · fornecida a partir da cloud",
          note: "Ilustrativo: o caminho realçado muda consoante cada capacidade é usada."
        },
        cycleTitle: "Como funciona o ciclo de dados",
        cycleLabels: {
          collect: "Extrair",
          transform: "Transformar",
          validate: "Validar",
          store: "Carregar",
          visualize: "Visualizar",
          analyze: "Analisar"
        },
        cycleDesc: {
          collect: "Recebe dados de ficheiros, buckets S3 (públicos ou privados), bases de dados SQL, APIs REST ou código personalizado.",
          transform: "Aplica transformações visuais ou lógica Python personalizada, com pré-visualização em direto.",
          validate: "Mantém os dados consistentes com a gestão de esquema do dltHub e um catálogo ao nível da coluna.",
          store: "Armazenamento eficiente em DuckDB, bases de dados SQL, BigQuery ou Databricks.",
          visualize: "Explora resultados com o editor SQL, gráficos, pivots e dashboards.",
          analyze: "Faz perguntas em linguagem natural e obtém insights rápidos e acionáveis."
        },
        cycleOutro: "A e2e‑Data combina simplicidade com poder técnico, permitindo às empresas construir soluções de dados completas sem complicações.",
        finalTitle: "Pronto para construir o teu primeiro pipeline?",
        finalBody: "Experimenta a demo online ou corre-a tu mesmo com um único comando Docker Compose."
      },
      product: {
        title: "Produto",
        lead: "A e2e‑Data nasceu para simplificar a engenharia de dados moderna.",
        body1: "Num contexto onde as empresas precisam de transformar dados rapidamente, integrar fontes heterogéneas e criar processos repetíveis, a plataforma oferece uma abordagem clara:",
        body2: "design visual, poder de código.",
        pills: { mission: "Missão", platform: "Plataforma", transparency: "Transparência", audience: "Público-alvo", roadmap: "Roadmap" },
        missionTitle: "A nossa missão",
        missionBody: "Preencher a lacuna entre engenharia e análise, permitindo a qualquer equipa construir pipelines prontos para produção com a robustez do Python e a simplicidade do low-code.",
        missionCta: "Ver documentação",
        platformTitle: "O que a plataforma oferece",
        platform: {
          pipelinesVisualTitle: "Pipelines visuais",
          pipelinesVisualDesc: "Constrói pipelines ao arrastar nós. A plataforma gera o código Python/dlt subjacente por ti, que podes descarregar e executar em qualquer lado.",
          supportMultipleTitle: "Fontes e destinos",
          supportMultipleItems: ["Ficheiros e buckets Amazon S3 (públicos ou privados)", "Bases de dados SQL: Oracle, SQL Server, PostgreSQL, MySQL/MariaDB", "APIs REST, Kafka, MongoDB e mais via código dltHub", "Carga em DuckDB, bases de dados SQL, BigQuery ou Databricks"],
          transformIntelligentTitle: "Transformações inteligentes",
          transformIntelligentItems: ["Transformações visuais no-code com pré-visualização", "Scripts Python personalizados", "Gestão de evolução de esquema"],
          catalogTitle: "Catálogo e analytics",
          catalogItems: ["Catálogo de dados ao nível da coluna, com histórico de esquema", "Conceitos semânticos sugeridos por IA e revistos por ti", "Gráficos, tabelas dinâmicas e dashboards", "Pipelines otimizados para analytics (camadas bronze e gold)"],
          intelligenceAssistiveTitle: "Inteligência assistiva",
          intelligenceAssistiveIntro: "O Agente de IA ajuda com:",
          intelligenceAssistiveItems: ["Esboço de pipelines", "Consultas SQL em linguagem natural", "Pesquisa no catálogo por significado", "Exploração de dados"],
          secureTitle: "Segura por desenho",
          secureItems: ["Credenciais no HashiCorp Vault", "Namespace isolado por utilizador", "Lista de permissões para código personalizado", "Traz o teu próprio Vault"]
        },
        transparencyTitle: "Transparência operacional",
        transparencyItems: [
          { title: "Logs detalhados", desc: "Acede a logs completos de cada etapa da execução, garantindo auditabilidade total." },
          { title: "Passos visualizados", desc: "Acompanha o fluxo de dados em tempo real na interface visual, nó a nó." },
          { title: "Histórico de execuções", desc: "Analisa execuções passadas, taxas de sucesso, durações e registos carregados ao longo do tempo." },
          { title: "Versões de pipelines", desc: "Cada atualização mantém a versão anterior do script do pipeline. Comparação e rollback de versões estão no roadmap." }
        ],
        audienceTitle: "Para quem foi criada?",
        audienceItems: ["Equipas de dados", "Analistas", "Engenheiros de dados", "Startups", "Pequenas empresas sem equipa técnica fixa"],
        roadmapTitle: "Roadmap",
        roadmapIntro: "O que já existe hoje e o que estamos a construir a seguir.",
        roadmapNow: "Disponível hoje",
        roadmapNext: "Planeado",
        roadmapNowItems: ["Pipelines visuais com monitorização em direto", "Fontes S3 privadas, SQL, API e código", "Data catalog com modelo semântico", "Analytics e BI (gráficos, pivots, dashboards)", "Agendamento de N em N minutos ou horas", "Segredos no Vault"],
        roadmapNextItems: ["Agendamentos diários, semanais e mensais", "Comparação e rollback de versões de pipelines", "Mais fornecedores de armazenamento cloud", "API REST pública e SDKs", "UI de administração para permissões de código e regras do catálogo", "Validação só de leitura nas consultas de BI"],
        closing: "A e2e‑Data remove fricção, acelera processos e democratiza o acesso à engenharia de dados profissional."
      },
      docs: { title: "Documentação" },
      developers: {
        title: "Programadores",
        lead: "Open source, self-hosted e documentada da interface ao motor.",
        sections: {
          docs: {
            title: "Documentação",
            desc: "Guias de utilizador para cada nó e menu, mais instalação e configuração para o teu próprio ambiente.",
            cta: "Abrir a documentação"
          },
          demo: {
            title: "Demo online",
            desc: "Explora a plataforma na sandbox cloud com início de sessão social, sem instalar nada.",
            cta: "Experimentar a demo"
          },
          community: {
            title: "Comunidade",
            desc: "Junta-te ao nosso servidor no Discord para tirar dúvidas e ligar-te a outros programadores.",
            cta: "Entrar no Discord"
          },
          opensource: {
            title: "Open Source",
            desc: "Contribui para os nossos componentes principais e conectores no GitHub.",
            cta: "Ver no GitHub"
          }
        }
      },
      help: {
        title: "Ajuda",
        lead: "Aqui encontras respostas a perguntas frequentes, guias rápidos e soluções para problemas comuns.",
        docsLink: "Ver a documentação completa",
        cards: {
          faq: {
            title: "Perguntas Frequentes (FAQ)",
            items: [
              { q: "Como inicio sessão?", a: "Usa o início de sessão social na versão cloud, ou o anónimo quando a executas localmente." },
              { q: "Que dados posso ingerir?", a: "Ficheiros CSV, JSON e Parquet, buckets Amazon S3, bases de dados SQL (Oracle, SQL Server, PostgreSQL, MySQL/MariaDB), APIs REST e código dltHub personalizado." },
              { q: "Posso usar buckets privados?", a: "Sim. Guarda as chaves de acesso em Connection Settings (ficam no Vault) e escolhe esse segredo no nó Bucket." },
              { q: "Para onde vão os meus dados?", a: "Para DuckDB por defeito. Também podes carregar para bases de dados SQL, BigQuery ou Databricks." },
              { q: "Posso executar pipelines automaticamente?", a: "Sim. Guarda o pipeline e agenda-o para correr de N em N minutos ou horas." }
            ]
          },
          pipeline: {
            title: "Como criar o meu primeiro pipeline?",
            steps: [
              "Abre <1>Data Files</1> e carrega um ficheiro CSV.",
              "Abre <1>Diagram</1> e arrasta <1>Start</1>, <1>Input - Bucket</1> e <1>Duckdb</1> para o canvas, e liga-os.",
              "No nó Bucket escolhe o teu ficheiro; no nó DuckDB indica o nome da base de dados e da tabela.",
              "Clica em <1>Run & Save</1> e acompanha os logs em direto. Confirma o resultado em <1>DLT Pipelines Outputs</1>."
            ]
          },
          env: {
            title: "Corre-a tu mesmo",
            steps: [
              "Instala o <1>Docker</1>.",
              "Na pasta do projeto executa <1>docker compose up --build</1>.",
              "Abre <1>http://localhost:8080</1> e inicia sessão de forma anónima.",
              "Acrescenta a tua GROQ_API_KEY a <1>backend/src/.env</1> para ativar os agentes de IA."
            ]
          }
        }
      },
      footer: {
        top: "A e2e‑Data ajuda equipas a construir pipelines de dados completos com simplicidade e velocidade.",
        rights: "© {{year}} e2e‑Data. Todos os direitos reservados."
      },
        chat: {
          hint: "Assistente de Docs",
          close: "Fechar",
          placeholder: "Pesquisa na documentação...",
          send: "Enviar",
          sending: "A enviar",
          typing: "A escrever…",
          welcome: "Olá! Sou o assistente da documentação. Posso ajudar a encontrar tópicos nos manuais.",
          errorSend: "Falha ao enviar",
          sendToDiscord: "Enviar ao Discord",
          discordSent: "Mensagem enviada para o Discord",
          discordNotConfigured: "O canal de Discord não está configurado.",
          channel: { discord: "Discord", support: "suporte" },
          fallbackNoAnswer: "Não encontrei nada na documentação sobre isso. Tenta reformular a pergunta ou usar palavras-chave mais específicas.",
          replyIntro: "Aqui fica uma orientação resumida, baseada na documentação:",
          stepsIntro: "Segue estes passos:",
          copy: "Copiar",
          copied: "Copiado!",
          useful: "Útil",
          notUseful: "Não útil",
          showTopics: "Mostrar tópicos",
          hideTopics: "Ocultar tópicos",
          suggestions: [
            "Criar o meu primeiro pipeline",
            "Ligações e segredos",
            "Fontes e destinos",
            "Transformações",
            "Data Catalog",
            "Data Viz e analytics",
            "Agendamento",
            "Monitorização e logs",
            "Versionamento",
            "Agente de IA",
            "Arquitetura",
            "Instalação"
          ]
          ,
          followUps: [
            { label: "Explicar melhor", action: "explain" },
            { label: "Dar exemplo", action: "example" },
            { label: "Resumo", action: "summary" },
            { label: "Abrir documentação", action: "openDoc" }
          ]
        }
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "pt",
    supportedLngs: ["en", "pt"],
    detection: {
      order: ["querystring", "localStorage", "navigator"],
      lookupQuerystring: "lang",
      caches: ["localStorage"]
    },
    interpolation: { escapeValue: false }
  })

export default i18n
