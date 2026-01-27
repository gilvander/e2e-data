# Secção Final

## Limitações conhecidas
- Apenas buckets S3 públicos suportados
- Editor de código em modo leitura

## Funcionalidades planeadas
- Credenciais cloud (buckets privados)
- Rollback/rollout de versões
- Conectores adicionais (BigQuery, GSheets, PostgreSQL)

## Segurança
- Não guardar segredos no repositório
- Evitar logs com credenciais

## Performance
- Limites por tamanho/quantidade de ficheiros
- Preferir formatos colunares (Parquet)
