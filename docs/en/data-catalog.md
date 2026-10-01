# Data Catalog & Semantic Model

The **Data Catalog** keeps a column-level record of everything your pipelines load, and suggests what each column *means* (for example `email`, `customer_identifier` or `financial_value`). It also feeds the [AI agents](ai-agent.md) and the [Data Viz](analytics.md) field pickers.

!!! info "Requires the LanceDB extension"
    The catalog needs the DuckDB `lance` extension, installed by `make install` (see [Installation](installation.md)). If it is missing, the workspace shows a *"LanceDB Extension Not Found"* warning.

## Opening the catalog

1.  Open **DLT Pipelines Outputs**.
2.  Click the three dots (⋮) next to a pipeline.
3.  Choose **Data catalog**.

A window opens with the **Catalog** and **Rules** tabs. Pick a pipeline in the selector at the top, then a table in the left list.

## How the catalog is built

Each time a pipeline loads data, e2e-Data compares the loaded schema with what the catalog already knows:

*   A **new column** is added at version 1.
*   A **changed data type** creates a new version of the column.
*   A **column that disappeared** from the source is marked as deleted (it is kept in the history, never removed).
*   Unchanged columns add nothing.

This gives you a full history of how your schema evolved, without any manual work. A catalog failure never makes a pipeline run fail.

## The Catalog tab

The top counters show, for the selected pipeline: **Total Columns**, **Active**, **Deleted** and **Evolved** (columns with version above 1).

For the selected table, the grid lists:

| Column | Meaning |
| :--- | :--- |
| Column Name | Name in the destination |
| Data Type | Type detected by the engine |
| Version | Increases when type changes or a column is removed |
| Status | Active or deleted |
| Semantic Concept | Suggested meaning of the column |
| Semantic Description | A short explanation of the column |
| Source | How the suggestion was produced (rule or AI) |

Use the search box to find columns and the **All / Active / Deleted / Evolved / Pending Semantic** chips to filter. **Export** downloads the current view as CSV.

### Reviewing semantic suggestions

Edit a concept or description directly in the grid and click **Save** to store your changes and mark them as validated. **Pending Semantic** shows columns that still need review.

## How suggestions are generated

1.  **Rules first.** Column names are matched against patterns, which is instant and needs no AI. Examples: `*_id` → identifier, `*email*` → email, `*phone*` → phone number, `*amount*`/`*price*`/`*total*` → financial value, `*status*` → status, `*date*`/`*_at` → date.
2.  **AI fallback.** Columns that match no rule are classified by the AI model (requires `GROQ_API_KEY`), which also returns a confidence score and a description.
3.  **Embeddings.** A vector is stored for each column so the AI agents can search the catalog by meaning (multilingual, so questions can be in Portuguese or English).

Only **new** columns receive suggestions, so your validated edits are never overwritten by later runs.

## The Rules tab

Shows the pattern rules used in step 1, with their semantic concept and confidence. In the current version the list is **read-only** (*+ Add Rule* is not available yet).

## Troubleshooting

*   **Empty catalog:** run the pipeline at least once after enabling the catalog.
*   **No semantic descriptions:** check `GROQ_API_KEY`; rule-based concepts still appear without it.
*   **Warning banner about LanceDB:** run `make install` in `backend/` and restart.
