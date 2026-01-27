# Scheduling

## Open schedule options
- In the pipeline editor, open the scheduling panel

## Options
- Every minute
- Every hour

## How it works
- Scheduler runs periodic executions
- Executions are queued; avoids races between instances

## Monitoring
- List of runs with start/end time and state
- Logs per run

## Late files
- For buckets/directories receiving new files:
  - Use stable file pattern (e.g., `*.csv`)
  - Consider `primary key` for upsert without duplicates
