# Scheduling

Scheduling runs a saved pipeline automatically at a fixed interval.

## Schedule a pipeline

1.  Build the pipeline and click **Save** (no need to run it first).
2.  With the diagram open, use **Schedule a job** next to the pipeline name.
3.  Choose the periodicity **Every**, enter a number and pick **Min** or **Hour**.
4.  Click **Schedule Job**.

!!! note
    **Daily**, **Weekly** and **Monthly** appear in the form but are not enabled yet. Only *every N minutes* and *every N hours* are supported.

## Manage schedules

*   The **Schedule** button in the Action Center lists scheduled pipelines.
*   In **DLT Pipelines Outputs**, enable **Scheduled pipeline only** to filter the list.
*   In a pipeline's menu (⋮), the **Schedule** entry shows **Pause** or **Resume**. Pausing stops future runs immediately; resuming registers the job again.
*   The time of the last run is stored with each schedule.

## How it works

*   Schedules are saved in the workspace database and loaded when the backend starts, so they survive restarts.
*   Jobs run inside the backend process, in the background. Each run starts the pipeline script as a separate process and sends its output to the **Monitor** and to the stored [logs](monitoring.md).
*   The DuckDB output of a pipeline can only be written by one process at a time. While a run is in progress the pipeline is locked, and a run that finds the database locked fails instead of waiting.
*   Scheduled runs read credentials from Vault at run time, so secrets never need to be stored in the script.

## Tips

*   For folders or buckets that receive new files, use a stable **File pattern** (for example `*.csv`) and define a **Primary Key** so reruns merge records instead of duplicating them.
*   Avoid intervals shorter than the time a run usually takes.
*   The backend must be running for scheduled jobs to execute.
