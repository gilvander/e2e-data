# Pipelines

## Build the diagram
- Drag nodes to the canvas
- Connect with directional arrows (left→right)
- Use descriptive names for each node

## Available nodes
- `Start`: flow start
- `Bucket Input`: ingest public S3
- `Local File Input`: ingest local directories
- `Transform`: apply no‑code or script rules
- `DuckDB Output`: write to DuckDB

## Node settings
- Start: no parameters
- Bucket Input: `bucket`, `path`, `file pattern`
- Local File Input: `directory`, `file pattern`
- Transform: `type` (code/change‑case), `selection` (by file/table)
- DuckDB Output: `database`, `table`, `primary key`, `mode` (append/upsert)

## DT (Data Load Tool) mapping
- Inputs → file collectors
- Transform → transformation operators
- Output → DuckDB loaders

## File pattern and primary key
- `file pattern`: file filter (wildcards), examples:
  - `*.csv`, `*.parquet`, `people_*.csv`
- `primary key`: unique columns for upsert (avoid duplicates)

## Databases and tables
- DuckDB is created automatically if missing
- Tables are generated on first load

## Execution and visualization
- Click **Save & Run**
- Track states: Pending, Running, Failed, Completed
- Open node logs for diagnostics
