# Final

## Known limitations
- Public S3 buckets only
- Script viewer is read‑only

## Planned features
- Cloud credentials (private buckets)
- Version rollback/rollout
- Additional connectors (BigQuery, GSheets, PostgreSQL)

## Security
- Do not store secrets in the repository
- Avoid logging credentials

## Performance
- Limits by file size/count
- Prefer columnar formats (Parquet)
