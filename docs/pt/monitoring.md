# Monitorização & Logs

O e2e-Data regista o que acontece em cada execução de pipeline, para poderes acompanhar uma execução em direto e analisar execuções passadas.

## Monitor em direto

*   Clica em **Monitor** no Centro de Ação para mostrar/ocultar o log em direto da execução atual.
*   Os nós mudam de estado na tela à medida que cada passo termina, e os nós que falham mostram o erro.
*   As execuções agendadas também enviam o seu output para o monitor, quando a tua sessão no browser está aberta.

## Menu de logs

No cabeçalho, o ícone de logs abre duas opções:

*   **Pipeline Real time logs:** o output em direto descrito acima.
*   **Log analysis:** um dashboard sobre os logs guardados.

## Análise de logs

Filtra por **Pipeline** (ou *All Pipelines*), **Run** (execution id), **Level** (INFO, ERROR, ...) e período (por exemplo *Last 7 Days*), e clica em **Apply**. Obténs:

*   **Run Status Summary:** total de execuções, sucessos e falhas.
*   **Leaderboard de pipelines:** pipelines ordenados por execuções, duração média e número de erros.
*   **Pipeline Run Summary:** estado, duração e **Records Loaded** por execução.
*   As linhas de log completas com mensagem, namespace e dados extra.

Cada execução tem um **Execution ID** único, que liga todas as suas linhas de log, para poderes abrir exatamente uma execução.

## O que é guardado

Os logs (output do pipeline, avisos, erros e eventos da aplicação) ficam numa base de dados DuckDB local no servidor, com timestamp, pipeline, execution id, nível e mensagem.

## Endpoints de saúde (para administradores)

O backend expõe também endpoints só de leitura que ferramentas externas podem consultar:

| Endpoint | Finalidade |
| :--- | :--- |
| `GET /health/pivot` | Resumo de saúde dos pipelines |
| `GET /health/stuck?timeout=1` | Execuções que começaram mas não terminaram (horas) |
| `GET /metrics/performance` | Métricas de duração |
| `GET /metrics/errors` | Pontos críticos de erro |
| `GET /timeline/<execution_id>` | Eventos ordenados de uma execução |
| `GET /logs/volume?interval=5 minutes&hours=6` | Volume de logs ao longo do tempo |
