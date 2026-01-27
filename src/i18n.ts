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
      home: {
        title: "e2e‑Data",
        lead: "End‑to‑end support from collection to visualization",
        heroBody: "e2e‑Data is a data platform that streamlines the entire flow — from ingesting files and buckets, through smart transformations, to storage and final analysis. Built for teams that need fast, secure and easy‑to‑maintain pipelines.",
        ctaDocs: "Read documentation",
        featuresTitle: "Why use e2e‑Data?",
        features: {
          e2eTitle: "End‑to‑end pipelines",
          e2eDesc: "From ingestion to analysis in a single, coherent flow. Creating pipelines has never been so simple — drag, configure and run.",
          docsTitle: "Clear documentation",
          docsDesc: "Detailed guides and structured documentation with MkDocs. Ideal for both technical teams and non‑technical users.",
          chatTitle: "Assistive chat",
          chatDesc: "An AI agent able to answer questions, explain data, suggest queries and assist analysis. Coming soon: full WhatsApp integration."
        },
        cycleTitle: "How the data cycle works",
        cycleLabels: {
          collect: "Collect",
          transform: "Transform",
          validate: "Validate",
          store: "Store",
          visualize: "Visualize",
          analyze: "Analyze"
        },
        cycleDesc: {
          collect: "Receive data from public S3 buckets or local files.",
          transform: "Apply rules, normalizations and no‑code transformations.",
          validate: "Ensure data integrity, format and consistency.",
          store: "Efficient storage in DuckDB.",
          visualize: "Explore results with SQL Editor or AI Agent.",
          analyze: "Get fast, actionable insights."
        },
        cycleOutro: "e2e‑Data combines simplicity with technical power, enabling companies to build complete data solutions without hassle."
      },
      product: {
        title: "Product",
        lead: "e2e‑Data was born to simplify modern data engineering.",
        body1: "In a context where companies need to transform data quickly, integrate heterogeneous sources and create repeatable processes, the platform offers a clear approach:",
        body2: "less code, more results.",
        pills: { mission: "Mission", platform: "Platform", transparency: "Transparency", audience: "Target audience" },
        missionTitle: "Our mission",
        missionBody: "Enable any team — technical or not — to build complete data pipelines, from ingestion to analysis, with maximum efficiency and transparency.",
        missionCta: "See documentation",
        platformTitle: "What the platform offers",
        platform: {
          pipelinesVisualTitle: "Visual pipelines",
          pipelinesVisualDesc: "Build data pipelines by dragging nodes, connecting steps and configuring each phase intuitively.",
          supportMultipleTitle: "Support for multiple data sources",
          supportMultipleItems: ["Public S3 buckets", "Local files", "Future connectors (BigQuery, GSheets, PostgreSQL)"],
          transformIntelligentTitle: "Intelligent transformations",
          transformIntelligentItems: ["Normalizations", "Conditions", "Format changes", "Code transformations", "Chained transformation pipelines"],
          storageEfficientTitle: "Efficient storage",
          storageEfficientDesc: "All data flows into DuckDB, ensuring speed, low cost and local or cloud analysis.",
          intelligenceAssistiveTitle: "Assistive intelligence",
          intelligenceAssistiveIntro: "The AI Agent helps with:",
          intelligenceAssistiveItems: ["SQL queries", "Schema explanations", "Data exploration", "Report generation"]
        },
        transparencyTitle: "Operational transparency",
        transparencyItems: [
          { title: "Detailed logs", desc: "Access complete logs for every step of your pipeline execution, ensuring full auditability." },
          { title: "Visualized steps", desc: "Monitor data flow in real-time with our intuitive visual interface for each transformation node." },
          { title: "Run history", desc: "Keep track of all past executions, success rates, and performance metrics over time." },
          { title: "Version control", desc: "Manage pipeline versions with built-in rollback capabilities and change tracking." }
        ],
        audienceTitle: "Who is it for?",
        audienceItems: ["Data teams", "Analysts", "Data scientists", "Startups", "Small businesses without a fixed technical team"],
        closing: "e2e‑Data removes friction, accelerates processes and democratizes access to professional data engineering."
      },
      docs: { title: "Documentation" },
      developers: {
        title: "Developers",
        lead: "Build powerful integrations with our APIs and SDKs.",
        sections: {
          api: {
            title: "API Reference",
            desc: "Our REST API is under development and will soon allow you to programmatically manage pipelines, data sources, and executions.",
            cta: "View API Docs"
          },
          sdk: {
            title: "SDKs & Tools",
            desc: "Official libraries to accelerate your development in Python and JavaScript.",
            cta: "Browse SDKs"
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
        cards: {
          faq: {
            title: "Frequently Asked Questions (FAQ)",
            items: [
              { q: "How do I log in?", a: "Use social login via Google or anonymous login in development mode." },
              { q: "What data types can I ingest?", a: "CSV, JSON, Parquet, and public S3 buckets." },
              { q: "Can I use private buckets?", a: "Not yet, but we are working on it." }
            ]
          },
          pipeline: {
            title: "How to create my first pipeline?",
            steps: [
              "Click on <1>New Pipeline</1>.",
              "Add nodes: Start, Bucket Input or Local File, Transform (optional), and DuckDB Output.",
              "Configure each node and save.",
              "Watch steps turning green upon completion."
            ]
          },
          env: {
            title: "Setup environment",
            steps: [
              "Install <1>Node.js LTS (18+)</1> and <3>npm</3>.",
              "In the project folder, install dependencies: <1>npm install</1>.",
              "Development environment: <1>npm run dev</1>.",
              "Production build: <1>npm run build</1>.",
              "Preview build: <1>npm run preview</1>.",
              "Code quality (optional): <1>npm run lint</1>."
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
            "Create pipeline",
            "Supported connectors",
            "Transformations",
            "DuckDB storage",
            "Logs and transparency",
            "API Reference",
            "Architecture overview",
            "Orchestration",
            "Monitoring",
            "Data sources",
            "Installation",
            "AI Agent"
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
      nav: { home: "Início", product: "Produto", developers: "Desenvolvedores", docs: "Documentação", help: "Ajuda", whatsapp: "WhatsApp", openMenu: "Abrir menu" },
      language: { label: "Idioma" },
      theme: { label: "Tema" },
      home: {
        title: "e2e‑Data",
        lead: "Suporte end‑to‑end da coleta à visualização",
        heroBody: "A e2e‑Data é uma plataforma de dados que simplifica todo o fluxo — desde a ingestão de ficheiros e buckets, passando por transformações inteligentes, até ao armazenamento e análise final. Foi criada para equipas que precisam de pipelines rápidos, seguros e fáceis de manter.",
        ctaDocs: "Ler documentação",
        featuresTitle: "Porquê usar a e2e‑Data?",
        features: {
          e2eTitle: "Pipelines end‑to‑end",
          e2eDesc: "Da ingestão à análise num fluxo único e coerente. Criar pipelines nunca foi tão simples — arraste, configure e execute.",
          docsTitle: "Documentação clara",
          docsDesc: "Guias detalhados e documentação estruturada com MkDocs. Ideal tanto para equipas técnicas como para utilizadores não técnicos.",
          chatTitle: "Chat assistivo",
          chatDesc: "Chatbot integrado à documentação para tirar dúvidas na hora. Basta perguntar e receber respostas com contexto."
        },
        architectureTitle: "Arquitetura da Plataforma",
        architectureAlt: "Diagrama de Arquitetura da Plataforma e2e-Data",
        cycleTitle: "O ciclo do dado",
        cycleLabels: {
          collect: "Coletar",
          transform: "Transformar",
          validate: "Validar",
          store: "Armazenar",
          visualize: "Visualizar",
          analyze: "Analisar"
        },
        cycleDesc: {
          collect: "Receba dados de buckets S3 públicos ou ficheiros locais.",
          transform: "Aplique regras, normalizações e transformações no‑code.",
          validate: "Garanta integridade, formato e coerência dos dados.",
          store: "Armazenamento eficiente em DuckDB.",
          visualize: "Explore resultados com SQL Editor ou AI Agent.",
          analyze: "Obtenha insights rápidos e acionáveis."
        },
        cycleOutro: "A e2e‑Data combina simplicidade com potência técnica, permitindo que empresas criem soluções de dados completas sem complicações."
      },
      product: {
        title: "Produto",
        lead: "A e2e‑Data nasceu com o propósito de simplificar a engenharia de dados moderna.",
        body1: "Num contexto onde empresas precisam de transformar dados rapidamente, integrar fontes heterogéneas e criar processos repetíveis, a plataforma oferece uma abordagem clara:",
        body2: "menos código, mais resultados.",
        pills: { mission: "Missão", platform: "Plataforma", transparency: "Transparência", audience: "Público‑alvo" },
        missionTitle: "A nossa missão",
        missionBody: "Permitir que qualquer equipa — técnica ou não — consiga criar pipelines de dados completos, desde a ingestão à análise, com a máxima eficiência e transparência.",
        missionCta: "Ver documentação",
        platformTitle: "O que a plataforma oferece",
        platform: {
          pipelinesVisualTitle: "Pipelines visuais",
          pipelinesVisualDesc: "Construa pipelines de dados arrastando nós, ligando etapas e configurando cada fase de forma intuitiva.",
          supportMultipleTitle: "Suporte a múltiplas origens de dados",
          supportMultipleItems: ["Buckets S3 públicos", "Ficheiros locais", "Futuros conectores (BigQuery, GSheets, PostgreSQL)"],
          transformIntelligentTitle: "Transformações inteligentes",
          transformIntelligentItems: ["Normalizações", "Condições", "Alterações de formato", "Code transformations", "Cadeias de transformação encadeadas"],
          storageEfficientTitle: "Armazenamento eficiente",
          storageEfficientDesc: "Todos os dados fluem para DuckDB, garantindo rapidez, baixo custo e análise local ou cloud.",
          intelligenceAssistiveTitle: "Inteligência assistiva",
          intelligenceAssistiveIntro: "O AI Agent ajuda com:",
          intelligenceAssistiveItems: ["consultas SQL", "explicações do esquema", "exploração de dados", "geração de relatórios"]
        },
        transparencyTitle: "Transparência operacional",
        transparencyItems: [
          { title: "Logs detalhados", desc: "Aceda a logs completos para cada etapa da execução, garantindo auditabilidade total." },
          { title: "Passos visualizados", desc: "Acompanhe o fluxo de dados em tempo real com a nossa interface visual intuitiva." },
          { title: "Histórico de execuções", desc: "Mantenha o registo de todas as execuções passadas, taxas de sucesso e métricas." },
          { title: "Controlo de versões", desc: "Gerencie versões dos pipelines com capacidades integradas de rollback e tracking." }
        ],
        audienceTitle: "Para quem foi criada?",
        audienceItems: ["Equipas de dados", "Analistas", "Engenheiros de dados", "Startups", "Pequenas empresas sem equipa técnica fixa"],
        closing: "A e2e‑Data remove fricção, acelera processos e democratiza o acesso a engenharia de dados profissional."
      },
      docs: { title: "Documentação" },
      developers: {
        title: "Desenvolvedores",
        lead: "Construa integrações poderosas com as nossas APIs e SDKs.",
        sections: {
          api: {
            title: "Referência da API",
            desc: "A nossa API REST está em desenvolvimento e em breve permitirá gerir pipelines, fontes de dados e execuções de forma programática.",
            cta: "Ver Documentação da API"
          },
          sdk: {
            title: "SDKs e Ferramentas",
            desc: "Bibliotecas oficiais para acelerar o desenvolvimento em Python e JavaScript.",
            cta: "Explorar SDKs"
          },
          community: {
            title: "Comunidade",
            desc: "Junte-se ao nosso servidor no Discord para tirar dúvidas e conectar-se com outros devs.",
            cta: "Entrar no Discord"
          },
          opensource: {
            title: "Open Source",
            desc: "Contribua para os nossos componentes principais e conectores no GitHub.",
            cta: "Ver no GitHub"
          }
        }
      },
      help: {
        title: "Ajuda",
        lead: "Aqui você encontrará respostas para perguntas frequentes, guias rápidos e soluções para problemas comuns.",
        cards: {
          faq: {
            title: "Perguntas Frequentes (FAQ)",
            items: [
              { q: "Como faço login?", a: "Utilize login social via Google ou login anônimo no modo de desenvolvimento." },
              { q: "Quais tipos de dados posso ingerir?", a: "CSV, JSON, Parquet e buckets S3 públicos." },
              { q: "Posso usar buckets privados?", a: "Ainda não, mas estamos trabalhando nisso." }
            ]
          },
          pipeline: {
            title: "Como criar meu primeiro pipeline?",
            steps: [
              "Clique em <1>Novo Pipeline</1>.",
              "Adicione os nós: Start, Bucket Input ou Local File, Transform (opcional) e DuckDB Output.",
              "Configure cada nó e salve.",
              "Veja os passos se tornando verdes ao completar."
            ]
          },
          env: {
            title: "Configurar o ambiente",
            steps: [
              "Instale o <1>Node.js LTS (18+)</1> e <3>npm</3>.",
              "Na pasta do projeto, instale dependências: <1>npm install</1>.",
              "Ambiente de desenvolvimento: <1>npm run dev</1>.",
              "Build de produção: <1>npm run build</1>.",
              "Pré‑visualizar build: <1>npm run preview</1>.",
              "Qualidade de código (opcional): <1>npm run lint</1>."
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
          placeholder: "Pesquise na documentação...",
          send: "Enviar",
          sending: "Enviando",
          typing: "Digitando…",
          welcome: "Olá! Sou o assistente da documentação. Posso ajudar a encontrar tópicos nos manuais.",
          errorSend: "Falha ao enviar",
          sendToDiscord: "Enviar ao Discord",
          discordSent: "Mensagem enviada para o Discord",
          discordNotConfigured: "O canal de Discord não está configurado.",
          channel: { discord: "Discord", support: "suporte" },
          fallbackNoAnswer: "Não encontrei nada na documentação sobre isso. Tente reformular a pergunta ou usar palavras-chave mais específicas.",
          replyIntro: "Aqui vai uma orientação resumida baseada na documentação:",
          stepsIntro: "Segue estes passos:",
          copy: "Copiar",
          copied: "Copiado!",
          useful: "Útil",
          notUseful: "Não útil",
          showTopics: "Mostrar tópicos",
          hideTopics: "Ocultar tópicos",
          suggestions: [
            "Como criar pipeline",
            "Conectores suportados",
            "Transformações",
            "Armazenamento DuckDB",
            "Logs e transparência",
            "Referência de API",
            "Visão da arquitetura",
            "Orquestração",
            "Monitorização",
            "Fontes de dados",
            "Instalação",
            "AI Agent"
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
