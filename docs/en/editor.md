# Pipeline Scripts & Code Editor

Every pipeline you create is turned into a Python script that uses [dltHub](https://dlthub.com/). The scripts live under **Pipeline Scripts** in the Primary Navigation.

## Viewing and editing a script

1.  Open **Pipeline Scripts**.
2.  Click the three dots (⋮) next to a script and choose **Open Editor** to read the code in the built-in editor.

!!! note
    In the current version, changes typed in the editor are not written back to the pipeline's script. To change how a pipeline behaves, edit its diagram (**View Diagram**) and click **Run & Save**, which stores a new version (see [Versioning](versioning.md)). To customise the Python itself, download the script, or use a **DLT Code** node.

## File names

The suffix of a script tells you how the pipeline was created:

| File name | Meaning |
| :--- | :--- |
| `name.py` | Regular pipeline with a DuckDB destination |
| `name__withmetadata__.py` | Pipeline with a SQL/code destination or code source; the engine registers its metadata for the [Data Catalog](data-catalog.md) |
| `name__toschedule__.py` | Pipeline that was **saved** without running it, so it can be scheduled later |
| `name_v2.py`, `name_v3.py`, ... | Previous versions of the same pipeline |

## Download

Each script can be downloaded from the same menu to run or deploy it outside e2e-Data.

## Safety rules

Code in DLT Code nodes (and the generated script itself) is checked before it is saved or run:

*   Only imports on the server's allowlist are accepted.
*   Dangerous calls and dunder attributes are rejected with *"Invalid code provided which might cause security breach"*.
*   Never put credentials in the code; reference them with the `__secrets` constant instead (see [Connections & Secrets](connections.md)).

Administrators can extend the allowlist as described in [Installation](installation.md#dlt-code-node-security).
