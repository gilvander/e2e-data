# Notas Finais

## Limitações atuais

*   O agendamento suporta apenas *de N em N minutos/horas*.
*   A comparação de versões e o rollback ainda não estão disponíveis.
*   A consulta SQL direta a partir do workspace só está disponível para destinos DuckDB.
*   O nó Code Transformation ainda está em desenvolvimento.
*   As importações permitidas nos nós de código são geridas na configuração do servidor, não na UI.
*   Buckets cloud: o Amazon S3 é suportado (anónimo ou com credenciais guardadas no Catálogo de Ligações); outros fornecedores ainda não.
*   As **Rules** do Data Catalog são mostradas só de leitura (ainda não é possível adicionar regras).
*   As consultas do Data Viz correm com as permissões da ligação que configuraste; usa um utilizador de base de dados só de leitura.

## O que existe para além do básico

*   Buckets S3 privados através do Catálogo de Ligações
*   BigQuery, Databricks, Kafka, MongoDB e Airtable através de nós e templates **DLT Code**
*   [Data Catalog](data-catalog.md) com conceitos semânticos
*   [Data Viz & Analytics](analytics.md)
*   [Monitorização e análise de logs](monitoring.md)

## Segurança

*   Guarda as credenciais apenas no Catálogo de Ligações (Vault), nunca no repositório nem em nós de código.
*   Usa um Vault real (não em modo dev) e um token não-root fora de testes locais.
*   Não exponhas o backend à internet sem autenticação à frente.
*   Mantém ficheiros `.env` e chaves de API fora do controlo de versões.

## Desempenho

*   Define limites de tamanho e número de ficheiros (`TOTAL_ALLOWED_UPLOADS`, `fileUploadSizeLimit`).
*   Prefere formatos colunares (Parquet) para ficheiros grandes.
*   Usa Primary Keys para que as reexecuções façam merge em vez de duplicar.
