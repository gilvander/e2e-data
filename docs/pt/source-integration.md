# Integração de Fontes de Dados

Esta página mostra como ligar o e2e-Data aos teus dados e trazê-los para um pipeline. O fluxo geral é sempre o mesmo:

1.  **Cria a ligação** em **Connection Settings** (ou no **API Catalog**) e testa-a. As credenciais ficam guardadas no HashiCorp Vault.
2.  **Arrasta o nó de origem** correspondente para o canvas e seleciona a ligação.
3.  **Escolhe o que carregar** (ficheiros, tabelas, endpoints) e liga o nó a um destino.
4.  Clica em **Run & Save** e acompanha os logs em direto no **Monitor**.

As credenciais nunca aparecem no canvas nem no script gerado. Vê [Ligações & Segredos](connections.md).

## Fontes suportadas

| Fonte | Nó | Ligação a criar primeiro |
| :--- | :--- | :--- |
| Ficheiros (CSV, JSON/JSONL, Parquet) | `Input - Bucket` (From FS Folder) | Nenhuma. Carrega o ficheiro em **Data Files**. |
| Amazon S3 | `Input - Bucket` (Cloud URL) | **Secrets group**, tipo *S3 Access and Secret Keys* |
| Bases de dados SQL: Oracle, SQL Server, PostgreSQL, MySQL/MariaDB | `Input - SQL DB` | Definição de **Database** |
| APIs REST | `Input - API` | Entrada no **API Catalog** |
| Kafka, MongoDB, Airtable e outras fontes dltHub | `DLT code` | **Secrets group** opcional, referenciado com `__secrets` |

## Ficheiros

1.  Abre **Data Files** e carrega o teu ficheiro (escolhe-o ou arrasta e larga).
2.  No diagrama, adiciona `Start` → `Input - Bucket` e mantém **From FS Folder**.
3.  Em **File pattern**, escolhe o ficheiro. A lista mostra todos os ficheiros do teu workspace, e um padrão como `*.csv` carrega todos os ficheiros que o cumprem.
4.  Opcionalmente define a **Resource Primary Key**, para que voltar a executar o pipeline faça merge das linhas em vez de as duplicar.

## Amazon S3

1.  Em **Connection Settings**, cria um **Secrets group** do tipo *S3 Access and Secret Keys* e preenche as chaves e o URL do bucket.
2.  Clica em **Test connection**. O indicador passa a verde quando as chaves e o bucket são válidos. Depois guarda.
3.  No nó `Input - Bucket` escolhe **Cloud URL**, seleciona o **Bucket Secret Name** e depois o **File pattern** entre os objetos encontrados no bucket.

O Amazon S3 é, por agora, o único fornecedor de armazenamento cloud suportado.

## Bases de dados SQL

1.  Em **Connection Settings**, cria uma definição **Database**: nome da ligação, motor, host, porta, nome da base de dados, utilizador e palavra-passe.
    *   **Oracle:** preenche host, porta e service name e assinala a caixa junto a **Params** para gerar o Connection Descriptor automaticamente.
    *   **SQL Server:** o backend precisa do driver ODBC da Microsoft. Vê [Dependências do SQL Server](installation.md#dependencias-do-sql-server).
2.  Clica em **Test connection** (o círculo cinzento passa a verde ou vermelho) e guarda.
3.  No diagrama, adiciona `Input - SQL DB` e seleciona a ligação. O nó mostra o host, o motor e o nome da base de dados.
4.  Adiciona tabelas com **+ Table field**. Escreve para filtrar, ou carrega em **Ctrl** dentro do campo para listar todas as tabelas. O nó verifica se cada tabela existe.
5.  Para cada tabela escolhe o **PK Field** usado na deduplicação e na carga incremental.

Podes carregar várias tabelas num só nó e acrescentar um nó de [Transformação](transformations.md) antes do destino.

## APIs REST

1.  Abre o **API Catalog** e regista a API: nome único, **Base URL** e um ou mais endpoints (**+ Endpoint**).
2.  Para cada endpoint define o **Data Selector** quando a resposta vem dentro de um campo, uma **Primary Key** e, se quiseres, **paginação por offset** (campo de offset, campo de limit, registos por página).
3.  Se for preciso, ativa **Use Authentication** e escolhe **X-API-Key** ou **Bearer Token**.
4.  Clica em **Test connection**. Todos os endpoints são testados, e o indicador só fica verde se todos passarem.
5.  No diagrama, adiciona `Input - API` e seleciona a API. Todos os seus endpoints são carregados em conjunto.

## Código personalizado e outras fontes

O nó `DLT code` aceita o teu próprio código dltHub. Parte dos templates incluídos para **Airtable**, **Kafka**, **Kafka + SASL** ou **MongoDB**:

*   Usa `@dlt.source` e `@dlt.resource`, e devolve os recursos a partir da source.
*   Nunca escrevas credenciais no código. Cria-as em Connection Settings e referencia-as com `__secrets`.
*   Só são aceites importações que estejam na lista permitida do servidor. Vê [Instalação](installation.md#seguranca-dos-nos-dlt-code).

## Destinos

| Destino | Nó |
| :--- | :--- |
| DuckDB (por defeito) | Output `DuckDB` |
| Bases de dados SQL | `Database Output`, escolhendo a ligação |
| BigQuery, Databricks e outros destinos dltHub | Output `DLT code`, com templates para BigQuery e Databricks |

Vê o [Pipeline Designer](pipelines.md) para os detalhes de cada nó.

## Depois da primeira carga

*   Confirma os dados em **DLT Pipelines Outputs** e consulta-os a partir do workspace.
*   Revê as colunas e os significados sugeridos no [Data Catalog](data-catalog.md).
*   [Agenda](scheduling.md) o pipeline e acompanha as execuções em [Monitorização & Logs](monitoring.md).

## Resolução de problemas

| Problema | O que verificar |
| :--- | :--- |
| **Test connection** vermelho no SQL Server | O driver ODBC da Microsoft está instalado na máquina do backend. |
| A ligação Oracle falha | Host, porta e service name estão corretos; gera o Connection Descriptor em **Params**. |
| O teste da API fica vermelho | Pelo menos um endpoint falhou; o teste é tudo-ou-nada. Verifica o base URL, os caminhos dos endpoints e a autenticação. |
| Uma tabela é rejeitada no nó SQL | O nome da tabela não existe nessa base de dados ou o utilizador não tem acesso. |
| A lista de ficheiros S3 está vazia | As chaves, o URL do bucket e o file pattern, e se as chaves conseguem listar o bucket. |
| Nenhum ficheiro na lista **File pattern** | O ficheiro não foi carregado em **Data Files**, ou a página precisa de ser atualizada. |
