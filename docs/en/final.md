# Final Notes

## Current limitations

*   Scheduling supports *every N minutes/hours* only.
*   Version comparison and rollback are not available yet.
*   Direct SQL querying from the workspace is available for DuckDB destinations only.
*   The Code Transformation node is still in development.
*   Allowed imports for code nodes are managed in server configuration, not in the UI.
*   Cloud buckets: Amazon S3 is supported (anonymous or with credentials stored in the Connections Catalog); other providers are not yet.
*   Data Catalog **Rules** are shown read-only (adding rules is not available yet).
*   Queries from Data Viz run with the permissions of the connection you configured; use a read-only database user.

## What is available beyond the basics

*   Private S3 buckets via the Connections Catalog
*   BigQuery, Databricks, Kafka, MongoDB and Airtable through **DLT Code** nodes and templates
*   [Data Catalog](data-catalog.md) with semantic concepts
*   [Data Viz & Analytics](analytics.md)
*   [Monitoring and log analysis](monitoring.md)

## Security

*   Store credentials only in the Connections Catalog (Vault), never in the repository or in code nodes.
*   Use a real Vault (not dev mode) and a non-root token outside of local testing.
*   Do not expose the backend to the internet without authentication in front of it.
*   Keep `.env` files and API keys out of version control.

## Performance

*   Set limits on file size and count (`TOTAL_ALLOWED_UPLOADS`, `fileUploadSizeLimit`).
*   Prefer columnar formats (Parquet) for large files.
*   Use Primary Keys so reruns merge instead of duplicating.
