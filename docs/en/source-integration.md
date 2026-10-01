# Data Source Integration

This page shows how to connect e2e-Data to your data and bring it into a pipeline. The general flow is always the same:

1.  **Create the connection** in **Connection Settings** (or the **API Catalog**) and test it. Credentials are stored in HashiCorp Vault.
2.  **Drag the matching source node** onto the canvas and select the connection.
3.  **Choose what to load** (files, tables, endpoints) and connect the node to a destination.
4.  **Run & Save** and follow the live logs in the **Monitor**.

Credentials never appear on the canvas or in the generated script. See [Connections & Secrets](connections.md).

## Supported sources

| Source | Node | Connection you create first |
| :--- | :--- | :--- |
| Files (CSV, JSON/JSONL, Parquet) | `Input - Bucket` (From FS Folder) | None. Upload the file in **Data Files**. |
| Amazon S3 | `Input - Bucket` (Cloud URL) | **Secrets group**, type *S3 Access and Secret Keys* |
| SQL databases: Oracle, SQL Server, PostgreSQL, MySQL/MariaDB | `Input - SQL DB` | **Database** setting |
| REST APIs | `Input - API` | **API Catalog** entry |
| Kafka, MongoDB, Airtable and other dltHub sources | `DLT code` | Optional **Secrets group** referenced with `__secrets` |

## Files

1.  Open **Data Files** and upload your file (browse or drag and drop).
2.  In the diagram, add `Start` → `Input - Bucket`, and keep **From FS Folder**.
3.  In **File pattern**, pick the file. The list shows every file in your workspace, and a pattern such as `*.csv` loads all matching files.
4.  Optionally set **Resource Primary Key**, so re-running the pipeline merges rows instead of duplicating them.

## Amazon S3

1.  In **Connection Settings**, create a **Secrets group** of type *S3 Access and Secret Keys* and fill in the keys and the bucket URL.
2.  Click **Test connection**. The indicator turns green when the keys and bucket are valid. Then save.
3.  In the `Input - Bucket` node choose **Cloud URL**, select the **Bucket Secret Name** and then the **File pattern** from the objects found in the bucket.

Amazon S3 is the only cloud storage provider supported for now.

## SQL databases

1.  In **Connection Settings**, create a **Database** setting: connection name, engine, host, port, database name, user and password.
    *   **Oracle:** fill in host, port and service name, then tick the box next to **Params** to generate the Connection Descriptor automatically.
    *   **SQL Server:** the backend needs the Microsoft ODBC driver. See [SQL Server dependencies](installation.md#sql-server-dependencies).
2.  Click **Test connection** (grey circle becomes green or red), then save.
3.  In the diagram, add `Input - SQL DB` and select the connection. The node shows the host, engine and database name.
4.  Add tables with **+ Table field**. Type to filter, or press **Ctrl** inside the field to list every table. The node checks that each table exists.
5.  For each table choose the **PK Field** used for deduplication and incremental loading.

You can load several tables in one node, and add a [Transformation](transformations.md) node before the destination.

## REST APIs

1.  Open the **API Catalog** and register the API: unique name, **Base URL** and one or more endpoints (**+ Endpoint**).
2.  For each endpoint set the **Data Selector** when the response is wrapped in a field, a **Primary Key**, and optional **offset pagination** (offset field, limit field, records per page).
3.  If needed, enable **Use Authentication** and choose **X-API-Key** or **Bearer Token**.
4.  Click **Test connection**. Every endpoint is tested, and the indicator is green only if all of them pass.
5.  In the diagram, add `Input - API` and select the API. All its endpoints are loaded together.

## Custom code and other sources

The `DLT code` node accepts your own dltHub code. Start from the built-in templates for **Airtable**, **Kafka**, **Kafka + SASL** or **MongoDB**:

*   Use `@dlt.source` and `@dlt.resource`, and return the resources from the source.
*   Never type credentials in the code. Create them in Connection Settings and reference them with `__secrets`.
*   Only imports on the server's allowlist are accepted. See [Installation](installation.md#dlt-code-node-security).

## Destinations

| Destination | Node |
| :--- | :--- |
| DuckDB (default) | `DuckDB` output |
| SQL databases | `Database Output`, choosing the connection |
| BigQuery, Databricks and other dltHub destinations | `DLT code` output, with templates for BigQuery and Databricks |

See [Pipeline Designer](pipelines.md) for the details of every node.

## After the first load

*   Check the data in **DLT Pipelines Outputs** and query it from the workspace.
*   Review the columns and suggested meanings in the [Data Catalog](data-catalog.md).
*   [Schedule](scheduling.md) the pipeline and follow its runs in [Monitoring & Logs](monitoring.md).

## Troubleshooting

| Problem | What to check |
| :--- | :--- |
| **Test connection** is red for SQL Server | The Microsoft ODBC driver is installed on the backend machine. |
| Oracle connection fails | Host, port and service name are correct; generate the Connection Descriptor in **Params**. |
| API test is red | At least one endpoint failed; the test is all-or-nothing. Check the base URL, endpoint paths and authentication. |
| A table is rejected in the SQL node | The table name does not exist in that database or the user has no access. |
| The S3 file list is empty | The keys, bucket URL and file pattern, and that the keys can list the bucket. |
| No file in the **File pattern** list | The file was not uploaded to **Data Files**, or the page needs a refresh. |
