# Quick Start: Your First Pipeline

This guide will walk you through building a fundamental data pipeline: extracting data from a CSV file and loading it into a DuckDB database.

## Step 0: Setup your Environment

Before building, ensure you have access to the e2e-Data workspace. You have two options:

*   **Local Setup:** Configure e2e-Data in your local dev environment for full control.
*   **Cloud Sandbox:** Create a limited online account to start building immediately without installation.

!!! info "Watch: Setting up the e2e-Data Dev Environment"
    [Video Placeholder: Setting up the e2e-Data Dev Environment for local testing](https://www.google.com/search?q=https://your-video-link&authuser=2)

## Creating a CSV to DuckDB Pipeline

Follow these steps to architect your first flow.

### 1. Prepare your Data File

Before building the diagram, you need to make your data available to the platform.

1.  Open the **Primary Navigation** (Blue Ribbon) and select **Data Files**.
2.  **Upload:** You can click to browse or simply drag and drop your file directly into the upload area.

![Data Files Upload](../assets/data-files-upload.png){ width="25%" }

### 2. Architect the Diagram

Switch to the **Diagram** view in the Primary Navigation to begin designing.

1.  **Place Nodes:** Drag the following nodes from the **Secondary Menu** onto the canvas:
    *   `Start` node (from the **Start/End** category).
    *   `Input - Bucket` (from the **Sources** category).
    *   `Duckdb (.duckdb)` (from the **Outputs/Destinations** category).
2.  **Connect them:** Click the output port of one node and drag a line to the input port of the next to establish the flow: `Start` ➔ `Source Bucket` ➔ `Duckdb Output`.

![Pipeline Nodes Unconfigured](../assets/pipeline-nodes-step1.png){ width="50%" }

### 3. Configure the Nodes

Once connected, you must tell the nodes which specific data to handle.

1.  **Select a file:** Click on the `Source Bucket` node on the canvas.
2.  **File Pattern:** In the node's dropdown menu, you will see a list of all your uploaded files. Select your `.csv` file.
3.  **Define Destination:** Click the `Duckdb Output` node and enter your desired **Database name** and **Table name**.

![Pipeline Nodes Configured](../assets/pipeline-nodes-step2.png){ width="50%" }

### 4. Run and Monitor

1.  **Execute:** Click **Run & Save** in the top right Action Center.
2.  **Real-time Logs:** The **Monitor** display will open automatically, showing you the real-time execution logs. e2e-Data generates the necessary Python/dlt logic and processes your file instantly.

![Pipeline Execution](../assets/pipeline-execution.png){ width="25%" }

!!! info "Watch: Basic CSV to DuckDB Tutorial"
    [Video Placeholder: Basic CSV to DuckDB Tutorial](https://www.google.com/search?q=https://your-video-link&authuser=2)

## ✅ Verify your Data

After the logs confirm a successful run, navigate to **DLT Pipelines Outputs** in the Primary Navigation. Here, you can inspect the final data preview and ensure the DuckDB table was created with the correct schema.
