# Designer de Pipelines e Referência de Nós

O **menu de Design de Pipeline** serve como a tua caixa de ferramentas visual. Fornece os Nós funcionais que arrastas para o espaço de trabalho para arquitetar o teu fluxo de dados. O menu está estruturado em categorias lógicas distintas.

## 1. Nós de Fluxo de Trabalho (Core)

Localizados no topo (não dobráveis), estes nós definem o ciclo de vida do teu pipeline:

*   **Nó Start:** O ponto de "gatilho" obrigatório.
*   **Nó End:** O ponto de terminação que confirma que o pipeline completou a sua sequência.

## 2. 📥 Sources (Fontes) (Dobrável)

Esta secção contém os componentes de "Extração" do teu ETL/ELT.

### 🪣 Nó Source Bucket
Quando arrastas o nó Source Bucket para o canvas, ele serve como porta de entrada para ingestão baseada em ficheiros. Este nó é altamente adaptável, suportando tanto armazenamento local no servidor como ambientes cloud.

![Source Bucket Node](../assets/source-bucket-node.png){ width="25%" }

#### Localização de Armazenamento (Dropdown Primário)
O primeiro menu suspenso define o ambiente onde os teus ficheiros residem:
*   **From FS Folder:** Esta opção carrega ficheiros diretamente do servidor e2e-Data. Atualmente, aponta para a pasta específica do tenant atribuída à tua conta. Atualizações futuras expandirão isto para permitir ligações a sistemas de ficheiros externos e outros fornecedores cloud.

![Source Bucket FS](../assets/source-bucket-fs.png){ width="30%" }

*   **Cloud URL:** Isto permite a ingestão a partir de um bucket alojado na cloud. Ao selecionar isto, podes especificar um caminho direto para os teus dados.

#### Configuração Cloud e Segredos
Quando a opção **Cloud URL** é selecionada, aparece uma camada de configuração adicional:

![Source Bucket Cloud](../assets/source-bucket-cloud.png){ width="30%" }

*   **Nome do Segredo do Bucket:** É apresentado um novo menu suspenso, listando todas as credenciais especificamente criadas para buckets no Catálogo de Ligações.
*   **Suporte de Fornecedor:** Atualmente, a plataforma suporta Amazon S3, com as credenciais (chave de acesso e chave secreta) guardadas no Catálogo de Ligações. O suporte para fornecedores de armazenamento cloud adicionais será integrado à medida que a plataforma evolui ou conforme surjam necessidades específicas.

#### Gestão de Ficheiros e Deduplicação
Independentemente do tipo de armazenamento selecionado, o nó fornece controlo granular sobre os objetos de dados específicos:
*   **Padrão de Ficheiro (Dropdown Secundário):** Esta lista dinâmica preenche-se automaticamente com todos os ficheiros detetados dentro da pasta FS ou bucket S3 escolhido.
*   **Chave Primária do Recurso:** Este campo permite-te especificar manualmente a chave primária para as linhas dentro do teu ficheiro. Definir isto é uma melhor prática para lidar com a deduplicação de dados, garantindo que o teu destino permanece limpo mesmo que o mesmo ficheiro seja processado múltiplas vezes.

### Nó SQL DB v2 Source
O nó SQL DB v2 é o componente standard para ingestão de bases de dados relacionais. Foi desenhado para ser altamente interativo, obtendo metadados em tempo real da tua base de dados para simplificar o processo de configuração.

![Source SQL DB](../assets/source-sql-db.png){ width="30%" }

#### Configuração Principal e Metadados
Uma vez arrastado o nó para o canvas, a configuração começa com as tuas credenciais de segurança pré-definidas:
*   **Seleção de Segredo:** O menu suspenso primário lista todos os segredos de base de dados existentes do teu Catálogo de Ligações.
*   **Informação Dinâmica:** Imediatamente após selecionar um segredo, o nó valida a ligação e apresenta detalhes chave da infraestrutura diretamente na face do nó:
    *   **Endereço do Host:** Mostrado no topo para verificação rápida.
    *   **Motor de Base de Dados:** Mostra o tipo de motor específico (ex: Oracle, Postgres).
    *   **Nome da Base de Dados:** Mostra a instância específica ou nome do esquema.
    *   **Branding do Motor:** Para fácil identificação visual, o logótipo específico do motor de base de dados (ex: o "O vermelho" da Oracle) é apresentado no canto superior esquerdo do nó.

#### Tabela Interativa e Seleção de Chave Primária
Em vez de escrita manual, o nó fornece uma experiência de "auto-complete" para mapear os teus dados:
*   **Lista de Tabelas:** Podes adicionar múltiplas tabelas a um único nó ao clicar no botão verde **(+ Table field)**.

![Source SQL Tables](../assets/source-sql-tables.png){ width="30%" }

*   **Descoberta Inteligente:**
    *   **Listar Tudo:** Coloca o cursor no campo "Enter table name" e prime a tecla **Control (Ctrl)** para ver uma lista completa de todas as tabelas disponíveis nessa base de dados.
    *   **Auto-complete:** Começa a escrever um nome, e o nó filtrará as tabelas disponíveis em tempo real.
*   **Mapeamento de Chave Primária (PK):** Uma vez selecionada uma tabela, o menu suspenso **PK Field** fica ativo. Podes usar a mesma abordagem (escrever ou premir Control) para selecionar a coluna correta para deduplicação e carregamento incremental.

![Source SQL PK](../assets/source-sql-pk.png){ width="30%" }

### 🌐 Nó API Source
O nó API foi desenhado para integração rápida de serviços web no teu pipeline. Abstrai a complexidade técnica de chamadas RESTful obtendo todos os metadados necessários diretamente das tuas definições pré-configuradas no catálogo de APIs.

![Source API Node](../assets/source-api-node.png){ width="30%" }

#### Configuração Sem Esforço
Configurar o nó API no canvas é um processo de um só passo:
*   **Seleção de Segredo:** A única ação necessária é selecionar o Segredo da API do menu suspenso. Esta lista é preenchida a partir das configurações únicas que definiste anteriormente no Catálogo de APIs.

![Source API Select](../assets/source-api-select.png){ width="30%" }

*   **Apresentação Automática de Metadados:** Uma vez selecionado um segredo, o nó obtém e apresenta dinamicamente informações chave para confirmação visual:
    *   **Host:** O URL base associado ao segredo é mostrado no topo.
    *   **Total de Endpoints:** O nó indica exatamente quantos endpoints estão incluídos nesta configuração (ex: "Total Endpoints: 3").

#### Lógica Integrada
Porque este nó está ligado ao Catálogo de APIs, ele herda automaticamente toda a lógica de backend sem mais introdução manual:
*   **Segurança:** A autenticação (API Keys ou Bearer Tokens) é gerida de forma segura via HashiCorp Vault.
*   **Estrutura de Dados:** Quaisquer Seletores de Dados ou Chaves Primárias definidos no catálogo são aplicados ao fluxo de ingestão.
*   **Paginação:** Se "Use pagination" foi ativado no catálogo, o nó tratará automaticamente a lógica de offset e limit durante a execução.
    *   *Nota:* Quando este nó é executado, o pipeline acionará simultaneamente pedidos para todos os endpoints definidos sob o segredo selecionado, agregando os dados no teu fluxo.

### Nó DLT Code Source
O nó DLT Code é o componente de ingestão mais flexível no e2e-Data, desenhado para programadores que precisam de implementar lógica personalizada usando a framework dltHub e Python.

![Source DLT Node](../assets/source-dlt-node.png){ width="30%" }

#### O Editor de Código Integrado
Ao clicar no link "See Code" no nó, abre-se um editor de código dedicado, permitindo-te definir a tua lógica de ingestão:

![Source DLT Editor](../assets/source-dlt-editor.png){ width="70%" }

*   **Suporte a Templates:** O editor inclui um menu suspenso contendo todos os modelos de código guardados anteriormente. Isto permite-te injetar rapidamente código boilerplate ou lógica reutilizável sem escrita manual.

![Source DLT Template](../assets/source-dlt-template.png){ width="70%" }

*   **Desenvolvimento Personalizado:** Podes escrever e refinar o teu código Python diretamente dentro do editor para lidar com estruturas de dados complexas ou fontes não-padrão.
*   **Templates de Fontes Incluídos:** Além do template de código genérico, o menu oferece pontos de partida prontos para **Airtable**, **Kafka**, **Kafka + SASL** e **MongoDB**. Substitui os `<marcadores>` (tópico, servidor, ...) pelos teus valores e move as credenciais para o Catálogo de Ligações.
*   **Melhores Práticas:** Para garantir compatibilidade com o motor do pipeline, usa sempre os decoradores `@dlt.source` e `@dlt.resource` para anotar a tua lógica corretamente, e o recurso precisa de ser retornado ao nível da fonte.

#### Segurança e Gestão de Segredos
Para manter a segurança, nunca incluas credenciais sensíveis como chaves de API ou palavras-passe diretamente no editor.
*   **A Constante `__secrets`:** Em vez de palavras-passe em texto simples, referencia as tuas credenciais armazenadas de forma segura usando a constante `__secrets` no teu código.
*   **Integração com Vault:** A plataforma obtém automaticamente estes valores do HashiCorp Vault (configurado no Catálogo de Ligações) e injeta-os em tempo de execução, mantendo-os ocultos da UI.

#### Segurança de Execução e Restrições de Importação
Para segurança do ambiente do servidor, o e2e-Data impõe políticas de segurança no código Python executado dentro destes nós:
*   **Declarações Restritas:** Certas declarações de importação e comandos de sistema estão desativados por defeito para prevenir acesso não autorizado ao sistema.
*   **Allowlisting:** Se a tua lógica específica requer uma biblioteca restrita, ela pode ser permitida manualmente na configuração central da aplicação antes de o servidor e2e-Data ser instalado.
*   **Atualizações Futuras:** Uma secção de UI dedicada está planeada para lançamentos futuros para permitir que administradores giram estas permissões de execução de código diretamente dentro da plataforma.

## 3. 🔄 Transformation (Transformação) (Dobrável)

Onde os dados são refinados, limpos e modelados.
*   **Transformação Visual:** Uma interface point-and-click para alterações estruturais.
*   **Client Script:** Suporta a linguagem personalizada do e2e-Data para lógica específica.
*   **Pré-visualização ao Vivo:** Vê instantaneamente o impacto das tuas alterações nos dados antes de guardar.
*   **Nota:** O nó Code Transformation está atualmente em desenvolvimento.

*(Vê a secção Transformações para utilização detalhada).*

## 4. 📤 Destinations (Destinos) (Dobrável)

A fase de "Carga" do teu pipeline.

### Nó DuckDB Output
O nó DuckDB Output é um componente de destino de alto desempenho que te permite armazenar dados processados diretamente no servidor e2e-Data. É desenhado para simplicidade, frequentemente requerendo configuração manual mínima ao herdar detalhes de nós anteriores no pipeline.

![DuckDB Output Node](../assets/output-duckdb-node.png){ width="30%" }

#### Campos de Configuração
Quando arrastas o nó DuckDB Output para o canvas, defines a sua identidade através de dois campos principais:
*   **Nome da Base de Dados:** Atribui um nome lógico para identificar o conjunto de dados dentro do sistema.
*   **Nome da Tabela:** Um nome para a tabela de saída para manter os teus destinos organizados.
*   **Geração Automática de Ficheiro:** Não precisas de especificar um caminho de ficheiro; o ficheiro de base de dados DuckDB é criado automaticamente usando o mesmo nome do teu Pipeline, garantindo consistência em todo o teu workspace.

![DuckDB Output Config](../assets/output-duckdb-config.png){ width="50%" }

#### Herança Inteligente de Esquema
O nó possui adaptação inteligente de UI baseada na fonte do teu pipeline:
*   **Integração com Fonte SQL:** Se a fonte do teu pipeline é uma Base de Dados SQL, o nó DuckDB herda automaticamente os nomes das tabelas da seleção da fonte.
*   **UI Dinâmica:** Para prevenir erros de configuração e poupar tempo, o campo de nome da tabela é automaticamente ocultado quando uma fonte SQL é detetada, uma vez que o sistema já sabe que tabelas criar no ficheiro DuckDB.

### Nó Database Output
O nó Database Output é o destino primário para dados estruturados no teu pipeline. Desenhado para uma experiência "plug-and-play", minimiza a configuração manual tirando partido do teu catálogo de segredos existente.

![Database Output Node](../assets/output-db-node.png){ width="30%" }

#### Configuração de Destino Otimizada
A configuração para este nó é focada inteiramente em identificar o sistema alvo:
*   **Seleção de Segredo:** A única ação requerida é selecionar o Nome da Ligação DB pré-configurado do menu suspenso. Isto liga o nó às credenciais e strings de ligação armazenadas no teu catálogo.

![Database Output Select](../assets/output-db-select.png){ width="30%" }

*   **Reflexo Automático de Metadados:** Tal como o nó de fonte, uma vez selecionado um segredo, o nó preenche e apresenta automaticamente campos de confirmação visual:
    *   **Host:** O endereço do servidor de destino.
    *   **Motor de Base de Dados:** O tipo de base de dados para onde se está a escrever (ex: Oracle, MySQL).
    *   **Nome da Base de Dados:** A base de dados ou esquema alvo específico.
*   **Interface Unificada:** Porque o nome do nó é intencionalmente genérico, serve como um componente único e consistente para várias arquiteturas de dados.

#### Compatibilidade Pronta para o Futuro
O nó é construído para ser um destino abrangente para dados estruturados e semi-estruturados:
*   **Suporte SQL:** Atualmente suporta os mesmos motores disponíveis na fonte SQL DB v2 (Oracle, MySQL, MariaDB, Postgres e MSSQL).
*   **Integração NoSQL:** Embora focado atualmente em sistemas relacionais, o nó Database Output está desenhado para integrar bases de dados NoSQL em lançamentos futuros, permitindo-te alternar entre diferentes paradigmas de base de dados simplesmente mudando o segredo selecionado.

### Nó DLT Code Output
O nó DLT Code Output é a contraparte da versão de entrada, fornecendo um alto grau de personalização para como os dados são escritos num destino final. Enquanto a interface é idêntica ao nó de entrada, o seu foco funcional é exclusivamente na fase de "Carga" do teu pipeline.

![DLT Output Node](../assets/output-dlt-node.png){ width="30%" }

#### O Editor de Saída e Templates
Ao clicar no link "See Code", acedes a um ambiente especializado para definir a tua lógica de escrita:
*   **Templates de Saída Exclusivos:** O menu suspenso neste nó contém modelos desenhados especificamente para entrega de dados. Estes modelos focam-se em especificar onde e como os dados são materializados no teu sistema alvo.
*   **Lógica Flexível:** Podes usar um modelo existente para configurar rapidamente um destino padrão, modificá-lo para se ajustar às tuas necessidades, ou criar e guardar os teus próprios modelos personalizados. Isto elimina a necessidade de reescrever a mesma lógica de ligação ou carregamento em múltiplos pipelines.
*   **Templates de Destino Incluídos:** Existem templates prontos para **Google BigQuery** e **Databricks**. Preenche os detalhes do projeto/workspace (e referencia segredos com `__secrets`) para carregar dados nesses armazéns.

#### Segurança via `__secrets`
Tal como o nó de entrada, a segurança é gerida através de abstração:
*   **Proteção de Credenciais:** Nunca deves incluir palavras-passe em bruto ou chaves secretas nos teus scripts de saída.
*   **Referenciação Segura:** Cria os teus segredos no Catálogo de Ligações primeiro, depois referencia-os usando a constante `__secrets`. Isto garante que o teu código permanece limpo e as tuas credenciais encriptadas dentro do HashiCorp Vault.

#### Execução e Ambiente
*   **Restrições de Importação:** Para segurança do servidor, certas declarações Python e importações estão restritas por defeito.
*   **UI de Configuração Futura:** Embora estas restrições sejam atualmente geridas ao nível do servidor (antes da instalação), uma futura atualização de UI permitir-te-á gerir importações e bibliotecas permitidas diretamente das definições da plataforma.

## 5. Opções ao nível do pipeline

Junto ao nome do pipeline no canvas:

*   **Analytics Optimized:** constrói o pipeline para uso em BI (camada bronze + "big table" gold achatada). No nó DuckDB Output, **Target Datawarehouse** permite criar um novo armazém ou adicionar tabelas a um existente. Vê [Data Viz & Analytics](analytics.md).
*   **Run & Save / Save:** *Run & Save* gera e executa o script; *Save* apenas o guarda (como `__toschedule__`) para o [agendares](scheduling.md) mais tarde.
*   Após uma execução bem-sucedida, as colunas do pipeline ficam registadas no [Data Catalog](data-catalog.md).
