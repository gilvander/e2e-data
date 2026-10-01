# Data Viz & Analytics

e2e-Data includes a built-in BI suite to explore the data your pipelines produce: charts, pivot tables and dashboards, without leaving the workspace. It is a self-contained engine, so it can also be embedded in other platforms (it has been validated inside Odoo).

## Analytics Optimized pipelines

Next to the **Pipeline Name** at the top of the canvas there is an **Analytics Optimized** checkbox. When it is ticked, the pipeline is built for analytical use in two phases:

1.  **Bronze:** raw data lands in standardised tables.
2.  **Gold ("big table"):** data is flattened into wide tables optimised for fast, concurrent BI queries.

If the source schema changes (new columns, for instance), the gold layer is updated automatically so your charts keep working.

In the **DuckDB Output** node, **Target Datawarehouse** lets you create a new warehouse (default) or append the pipeline's tables to an existing one.

Only Analytics Optimized pipelines appear as datasets in Data Viz.

## Opening Data Viz

Click **Data Viz** in the Primary Navigation. A **Data Visualization and BI** window opens.

## Building a chart

1.  Select a pipeline/warehouse and **Load data**. The available **Tables** and **Dataset Fields** (from the [Data Catalog](data-catalog.md)) are listed.
2.  Choose a **Chart Type**.
3.  Select the fields for **X Axis / Labels** and **Y Axis / Values**, and pick an **Aggregation** (for example Count, Average, or *None (raw values)*).
4.  Optionally add **Global Filters** (**ADD NEW FILTER**); date ranges are suggested from the data. **Apply to All Tiles** applies a filter to every chart on a dashboard.
5.  Check the **Chart Preview**, set a **Chart Title** and **Color**, then **Build Chart**.
6.  **Save Chart** to reuse it later (listed under **Saved Charts**), or **Publish to Dashboard**: pick an existing dashboard under **Select Dashboard** or create a new one.

## Pivot tables

The pivot builder lets you choose **Rows**, **Cols** and values, with aggregations and filters, and save the result (**Saved Pivots**). Large datasets are processed in a background worker so the page stays responsive.

## Dashboards

Dashboards group saved charts as tiles. Create or update them from *Publish to Dashboard*; they are stored per user.

## Database schema tree and query builder

For connected relational databases the BI suite can draw a live **schema tree** of tables and relations, and run SQL from a query editor attached to it. This is helpful to explore a source before modelling it.

!!! warning
    Queries run with the permissions of the connection you pick. The current version does not restrict them to `SELECT`, so use a **read-only database user** for BI connections.

## Odoo integration

For Odoo (PostgreSQL) databases, e2e-Data can list the business modules and their tables with relations, so the first model can be set up quickly. Technical Odoo modules (IR, BASE, MAIL, ...) are filtered out.

## Performance settings

Administrators can tune DuckDB with `AN_TOTAL_THREADS` and `AN_MAX_MEMORY` in the backend `.env` (see [Installation](installation.md)).
