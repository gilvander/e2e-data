# Versioning

Every pipeline is stored as a script (see [Pipeline Scripts](editor.md)), and changes are saved as new versions instead of overwriting the old ones.

## Edit a pipeline

1.  In **DLT Pipelines Outputs**, open the pipeline's menu (⋮) and choose **View Diagram** to load it on the canvas. Choose **Use as template** to start a *new* pipeline from an existing diagram.
2.  Change node settings or connections.
3.  Click **Run & Save**. Because the pipeline already exists, e2e-Data updates it instead of creating a new one.

## What happens on update

*   The current script is kept as `name_vN.py` and the updated script becomes the active one.
*   Only the transformation section of the script is regenerated; the rest of the script is reused.
*   The diagram stored with the pipeline is updated so it reopens as you left it.

## Where to find old versions

Versions appear in **Pipeline Scripts** next to the active script, where you can open or download them.

## Not available yet

*   Visual comparison (diff) between versions
*   One-click rollback and promotion of a version to production

As a workaround, download the older script, or open it and copy its content into the active script.
