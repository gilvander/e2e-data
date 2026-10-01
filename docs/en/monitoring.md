# Monitoring & Logs

e2e-Data records what happens in every pipeline run, so you can follow a run live and analyse past runs.

## Live monitor

*   Click **Monitor** in the Action Center to toggle the live log of the current run.
*   Nodes change state on the canvas as each step finishes, and failed nodes show the error.
*   Scheduled runs send their output to the monitor too, when your browser session is open.

## Log menu

In the header, the logs icon opens two options:

*   **Pipeline Real time logs:** the live output described above.
*   **Log analysis:** a dashboard over the stored logs.

## Log analysis

Filter by **Pipeline** (or *All Pipelines*), **Run** (execution id), **Level** (INFO, ERROR, ...) and period (for example *Last 7 Days*), then **Apply**. You get:

*   **Run Status Summary:** total runs, successes and failures.
*   **Pipeline leaderboard:** pipelines ranked by runs, average duration and error count.
*   **Pipeline Run Summary:** status, duration and **Records Loaded** per run.
*   The full log lines with message, namespace and extra data.

Every run gets a unique **Execution ID**, which links all of its log lines, so you can open exactly one run.

## What is stored

Logs (pipeline output, warnings, errors and application events) are kept in a local DuckDB database on the server, with timestamp, pipeline, execution id, level and message.

## Health endpoints (for administrators)

The backend also exposes read-only endpoints that external tools can poll:

| Endpoint | Purpose |
| :--- | :--- |
| `GET /health/pivot` | Health summary across pipelines |
| `GET /health/stuck?timeout=1` | Runs that started but did not finish (hours) |
| `GET /metrics/performance` | Duration metrics |
| `GET /metrics/errors` | Error hotspots |
| `GET /timeline/<execution_id>` | Ordered events of one run |
| `GET /logs/volume?interval=5 minutes&hours=6` | Log volume over time |
