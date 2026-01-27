# e2e‑Data / DTC — Official Documentation

## Introduction

e2e‑Data (Data‑to‑Cloud, DTC) is a platform to build end‑to‑end data pipelines: ingestion, transformation, storage, visualization and analysis. MVP1 focuses on simple, safe and fast flows, integrating public sources and local filesystem with local execution on DuckDB, transformations and an AI agent for queries.

### Key features
- Visual pipelines with predefined nodes
- Data ingestion from public S3 and local filesystem
- No‑code and script‑based transformations
- Local storage on DuckDB
- Detailed logs and execution history
- SQL Editor and AI Agent for data exploration
- Simple scheduling (minutely/hourly)
- Pipeline versioning

### Concepts
- Pipeline: graph of nodes defining the data flow
- Ingestion: data input (S3, filesystem)
- Transformation: applying rules/changes
- Scheduling: periodic pipeline execution
- AI Agent: assistant for queries and explanations
- S3 bucket: object storage (public in MVP1)
- File system: local server directory
- DuckDB: embedded database for storage and analysis
- DT core: internal engine for node execution (Data Tool)
- Tenant/namespace: logical scope to separate data/resources

### Documentation structure
- User Guide (getting started)
- Pipelines and available nodes
- Transformations
- Scheduling
- Versioning
- Script Viewer (DT Script Viewer)
- Installation (development environment)
- AI Agent
- Final section (limitations, roadmap, security, performance)
