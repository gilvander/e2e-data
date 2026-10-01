# A Interface do Workspace

## 1. Navegação Primária (A Gaveta Esquerda)

A faixa azul no extremo esquerdo pode ser expandida para revelar as principais áreas funcionais da plataforma. Esta gaveta permite-te mudar de contexto sem perderes o progresso no canvas.

*   **DLT Pipelines Outputs:** Vê os resultados, amostras de dados e esquemas de destino dos fluxos executados. O menu (⋮) de cada pipeline dá também acesso ao seu diagrama, agendamento e [Data Catalog](data-catalog.md).
*   **Data Viz:** Gráficos, tabelas dinâmicas e dashboards sobre os teus dados. Vê [Data Viz & Analytics](analytics.md).
*   **Pipeline Scripts:** Acede ao código Python e dltHub gerado automaticamente que alimenta os teus diagramas visuais.
*   **Connection Settings:** Gere centralmente as tuas credenciais, segredos e strings de ligação (por exemplo, parâmetros de ligação a bases de dados SQL).
*   **Data Files:** Gere ficheiros planos (por exemplo, Parquet, CSV, JSONL) usados como fontes de dados locais nos teus pipelines.
*   **API Catalog:** Documenta e gere endpoints REST externos a utilizar no workspace.
*   **Diagram:** O teu espaço de trabalho principal para construir e ligar nós no canvas.
*   **AI Agent:** Invoca o Arquiteto de IA para ajudar a esboçar diagramas ou explicar a lógica dos pipelines.

![Workspace Screenshot](../assets/primary-navigation.png){ width="25%" }

![Workspace Screenshot](../assets/workspace-overview.png){ width="80%" }

## 2. O Menu Secundário (Diagram - A Paleta de Nós)

Quando a vista **Diagram** está ativa, o menu secundário expande-se para mostrar a "caixa de ferramentas". Cada item aqui é um Nó Potenciado por Código que traz lógica otimizada para o canvas.

![Pipeline Design Menu](../assets/pipeline-design-menu.png){ width="50%" }

*   **Start/End:** Definem os limites lógicos de entrada e saída do teu processo.
*   **Sources:** Origens de entrada que podes arrastar e largar, como `Input - Bucket`, `Input - SQL DB`, `Input - API`, ou `DLT code` para o tipo de nó de puro código dltHub e Python.
*   **Transformations:** Acede a blocos funcionais como `Transformation` para manipular os dados a meio do fluxo.
*   **Outputs/Destinations:** Define a tua zona de aterragem, como `DuckDB`, uma Base de Dados centralizada, ou o output direto `DLT code`.

## 3. Menu DLT Pipeline Outputs

Este menu oferece uma visão transparente dos teus dados carregados e dos esquemas de destino.

![DLT Pipeline Outputs](../assets/dlt-pipelines-outputs.png){ width="25%" }

### Hierarquia Dinâmica
O menu adapta a sua estrutura consoante o destino:
*   **DuckDB:** Mostra uma hierarquia completa de três níveis, com o Nome do Pipeline no topo, seguido do Nome da Base de Dados e, por fim, as Tabelas individuais.
*   **Outros Cenários:** Para destinos que não DuckDB, o menu simplifica a vista e mostra apenas os Nomes das Tabelas sob o pipeline.

### Exemplo de Fluxo
Como se vê na interface, pipelines como `from_orcl_to_mssql` demonstram fluxos complexos, como extrair dados do Oracle e escrevê-los no SQL Server.

### Pesquisa & Filtro
*   **Filtrar por nome de pipeline:** Usa o campo de entrada para localizar rapidamente fluxos específicos numa lista densa.
*   **Alternar Vista Agendada:** Usa o interruptor "Scheduled pipeline only" para isolar e gerir apenas as tuas execuções automáticas ativas.

### Menu do Pipeline (⋮)
Junto a cada pipeline:
*   **View Diagram:** Carrega o pipeline no canvas.
*   **Schedule → Pause/Resume:** Pára ou reinicia um pipeline agendado (só aparece para pipelines agendados).
*   **Use as template:** Começa um novo pipeline a partir deste diagrama.
*   **Data catalog:** Abre o [Data Catalog](data-catalog.md) do pipeline.

### Consultas DuckDB
Para destinos DuckDB, podes interagir com os teus dados diretamente no workspace.
1.  Clica nos três pontos (⋮) junto a uma tabela para abrir o menu de ações.
2.  Seleciona **Query** para executar comandos SQL diretamente a partir do e2e-Data.

> **Nota:** Embora a consulta direta seja atualmente exclusiva do DuckDB, está planeada para versões futuras a possibilidade de consultar outros destinos.

## 4. Menu Pipeline Scripts

O menu Pipeline Scripts dá acesso direto ao código Python e dltHub gerado automaticamente que alimenta os teus diagramas visuais.

![Pipeline Scripts](../assets/pipeline-scripts.png){ width="80%" }

*   **Inventário de Scripts:** Este menu lista os ficheiros de script de todos os pipelines criados no teu workspace (por exemplo, `oracle_to_duckdb.py`).
*   **Visualizador/Editor de Código Integrado:** Podes abrir o código diretamente no e2e-Data (vê [Pipeline Scripts](editor.md) para saber o que é guardado). Para isso:
    1.  Clica nos três pontos (⋮) junto ao script pretendido.
    2.  Seleciona **Open Editor** no menu suspenso para abrir o editor de código integrado.
*   **Descarregar Scripts:** Para desenvolvimento local ou instalação externa, cada script pode ser descarregado diretamente a partir deste menu.
*   **Pesquisa & Filtro:** Localiza facilmente scripts específicos a escrever no campo "Filter by name" no topo do menu.

## 5. Menu Data Files

O menu Data Files permite-te gerir as fontes locais usadas nos teus diagramas.

![Data Files List](../assets/data-files-list.png){ width="25%" }

*   **Interface de Upload:** Podes adicionar ficheiros ao teu workspace usando o botão "Choose File" para navegar, ou simplesmente a arrastar e largar o ficheiro diretamente na área de upload.
*   **Gestão de Ficheiros:** Organiza e filtra os teus ficheiros planos, como Parquet, CSV e JSONL, para serem usados como fontes de dados locais.
*   **Integração com o Canvas:** Depois de carregados, estes ficheiros ficam disponíveis no menu suspenso **File pattern** dos teus **nós de Origem** do tipo `Bucket` no canvas interativa.

## 6. O Canvas Interativo & Operações

A grelha central é um espaço de design infinito onde arquitetas o fluxo.

### Ferramentas do Canvas
Usa os ícones no canto inferior direito para **bloquear** (Lock) o teu diagrama (evitando movimentos acidentais) ou **ampliar** (Zoom) para ver melhor pipelines de grande escala.

### Nome do pipeline e opções (barra superior)
*   **Pipeline Name:** Clica para mudar o nome do pipeline ativo.
*   **Analytics Optimized:** Constrói o pipeline para uso em BI (bronze + "big table" gold). Vê [Data Viz & Analytics](analytics.md).
*   **Schedule a job:** Executa o pipeline de N em N minutos/horas. Vê [Agendamento](scheduling.md).

### Centro de Ação (Canto Superior Direito)
*   **📊 Monitor:** Mostra/oculta os logs de execução em tempo real.
*   **📅 Schedule:** Acede à lista de pipelines agendados.
*   **Ícone de logs (cabeçalho):** Abre *Pipeline Real time logs* ou *Log analysis*. Vê [Monitorização](monitoring.md).

### Ações do Pipeline
*   **🚀 Run & Save:** Executa e guarda o pipeline.
*   **Save:** Guarda o pipeline para poder ser agendado mais tarde.
*   **Clear:** Limpa o canvas se houver algum diagrama ativo.
