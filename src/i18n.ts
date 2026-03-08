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
        heroBody: "e2e-Data is an Open Source Data Platform that simplifies the ETL/ELT lifecycle by bridging the gap between high-level visualization and low-level Python engineering. Leveraging dltHub, we provide a high-performance engine wrapped in an intuitive low-code interface where pipelines are built by drawing diagrams and connecting nodes.",
        ctaDocs: "Read documentation",
        featuresTitle: "Why use e2e‑Data?",
        features: {
          e2eTitle: "Visual Engineering",
          e2eDesc: "Architect complex data flows on an interactive canvas. The diagram is the logic.",
          docsTitle: "Code-Powered Nodes",
          docsDesc: "Every node is backed by optimized Python logic and dltHub, ensuring high performance without the overhead of manual coding.",
          chatTitle: "AI-Architect",
          chatDesc: "Describe your goal in plain language, and the AI will draft the diagram for you—selecting the appropriate nodes and establishing the flow."
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
          collect: "Receive data from public S3 buckets, local files, or SQL Databases.",
          transform: "Apply visual transformations or custom Python logic.",
          validate: "Ensure data integrity with dltHub schema management.",
          store: "Efficient storage in DuckDB or external warehouses.",
          visualize: "Explore results with SQL Editor or AI Agent.",
          analyze: "Get fast, actionable insights."
        },
        cycleOutro: "e2e‑Data combines simplicity with technical power, enabling companies to build complete data solutions without hassle."
      },
      product: {
        title: "Product",
        lead: "e2e‑Data was born to simplify modern data engineering.",
        body1: "In a context where companies need to transform data quickly, integrate heterogeneous sources and create repeatable processes, the platform offers a clear approach:",
        body2: "visual design, code power.",
        pills: { mission: "Mission", platform: "Platform", transparency: "Transparency", audience: "Target audience" },
        missionTitle: "Our mission",
        missionBody: "Bridge the gap between engineering and analysis, enabling any team to build production-ready pipelines with the robustness of Python and the simplicity of low-code.",
        missionCta: "See documentation",
        platformTitle: "What the platform offers",
        platform: {
          pipelinesVisualTitle: "Visual pipelines",
          pipelinesVisualDesc: "Build data pipelines by dragging nodes. The platform generates the underlying Python/dlt code for you.",
          supportMultipleTitle: "Support for multiple data sources",
          supportMultipleItems: ["Public S3 buckets", "Local files (CSV, Parquet, JSONL)", "SQL Databases (Postgres, Oracle, etc.)"],
          transformIntelligentTitle: "Intelligent transformations",
          transformIntelligentItems: ["No-code visual transformations", "Custom Python scripts", "Schema evolution handling"],
          storageEfficientTitle: "Flexible storage",
          storageEfficientDesc: "Data flows into DuckDB for local analytics or can be routed to external warehouses via dltHub destinations.",
          intelligenceAssistiveTitle: "Assistive intelligence",
          intelligenceAssistiveIntro: "The AI Agent helps with:",
          intelligenceAssistiveItems: ["Pipeline drafting", "SQL queries", "Schema explanations", "Data exploration"]
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
            "AI Agent",
            "dltHub integration",
            "Open Source"
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
        heroBody: "e2e-Data é uma Plataforma de Dados Open Source que simplifica o ciclo de vida ETL/ELT ao preencher a lacuna entre a visualização de alto nível e a engenharia Python de baixo nível. Ao alavancar o dltHub, fornecemos um motor de alto desempenho envolvido numa interface intuitiva low-code onde os pipelines são construídos desenhando diagramas e ligando nós.",
        ctaDocs: "Ler documentação",
        featuresTitle: "Porquê usar a e2e‑Data?",
        features: {
          e2eTitle: "Engenharia Visual",
          e2eDesc: "Arquiteta fluxos de dados complexos numa tela interativa. O diagrama é a lógica.",
          docsTitle: "Nós Potenciados por Código",
          docsDesc: "Cada nó é suportado por lógica otimizada em Python e dltHub, garantindo alto desempenho sem a sobrecarga de codificação manual.",
          chatTitle: "AI-Architect",
          chatDesc: "Descreve o teu objetivo em linguagem simples, e a IA fará o esboço do diagrama para ti—selecionando os nós apropriados e estabelecendo o fluxo."
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
          collect: "Recebe dados de buckets S3 públicos, ficheiros locais ou Bases de Dados SQL.",
          transform: "Aplica transformações visuais ou lógica Python personalizada.",
          validate: "Garante integridade dos dados com gestão de esquema do dltHub.",
          store: "Armazenamento eficiente em DuckDB ou warehouses externos.",
          visualize: "Explora resultados com SQL Editor ou Agente de IA.",
          analyze: "Obtém insights rápidos e acionáveis."
        },
        cycleOutro: "A e2e‑Data combina simplicidade com poder técnico, permitindo às empresas construir soluções de dados completas sem complicações."
      },
      product: {
        title: "Produto",
        lead: "A e2e‑Data nasceu para simplificar a engenharia de dados moderna.",
        body1: "Num contexto onde as empresas precisam de transformar dados rapidamente, integrar fontes heterogéneas e criar processos repetíveis, a plataforma oferece uma abordagem clara:",
        body2: "design visual, poder de código.",
        pills: { mission: "Missão", platform: "Plataforma", transparency: "Transparência", audience: "Público-alvo" },
        missionTitle: "A nossa missão",
        missionBody: "Preencher a lacuna entre engenharia e análise, permitindo a qualquer equipa construir pipelines prontos para produção com a robustez do Python e a simplicidade do low-code.",
        missionCta: "Ver documentação",
        platformTitle: "O que a plataforma oferece",
        platform: {
          pipelinesVisualTitle: "Pipelines visuais",
          pipelinesVisualDesc: "Constrói pipelines arrastando nós. A plataforma gera o código Python/dlt subjacente por ti.",
          supportMultipleTitle: "Suporte para múltiplas fontes de dados",
          supportMultipleItems: ["Buckets S3 públicos", "Ficheiros locais (CSV, Parquet, JSONL)", "Bases de Dados SQL (Postgres, Oracle, etc.)"],
          transformIntelligentTitle: "Transformações inteligentes",
          transformIntelligentItems: ["Transformações visuais no-code", "Scripts Python personalizados", "Gestão de evolução de esquema"],
          storageEfficientTitle: "Armazenamento flexível",
          storageEfficientDesc: "Os dados fluem para DuckDB para análise local ou podem ser encaminhados para warehouses externos via destinos dltHub.",
          intelligenceAssistiveTitle: "Inteligência assistiva",
          intelligenceAssistiveIntro: "O Agente de IA ajuda com:",
          intelligenceAssistiveItems: ["Esboço de pipeline", "Queries SQL", "Explicações de esquema", "Exploração de dados"]
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
            "Criar pipeline",
            "Conectores suportados",
            "Transformações",
            "Armazenamento DuckDB",
            "Logs e transparência",
            "API Reference",
            "Visão geral da arquitetura",
            "Orquestração",
            "Monitorização",
            "Fontes de dados",
            "Instalação",
            "Agente de IA",
            "Integração dltHub",
            "Open Source"
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
