# Secrets Manager: Connections & API Catalogs

The **Secrets Manager** in e2e-Data is a robust security layer built on top of [HashiCorp Vault](https://www.vaultproject.io/). It is designed to be highly flexible, supporting either the HashiCorp Cloud version or self-hosted instances (on-prem or in your own cloud VPC). This system ensures that sensitive credentials—from database passwords to API tokens—are abstracted from the visual canvas and securely injected into the dltHub engine at runtime.

## 1. Connections Catalog (Infrastructure Secrets)

The **Connections Catalog** handles the core credentials for your data environment.

![Connections Catalog](../assets/connections-catalog.png){ width="25%" }

*   **Visibility:** For Database or Platform Secret Groups, the interface displays the **Connection Name** and the **Host address**.
*   **Non-Host Secrets:** For general secrets where a host doesn’t exist, the field displays `None`.

### Creating New Database Settings

When selecting the **Database** type in the "Create New Settings" form, you can configure SQL environments like Oracle, MSSQL, Postgres, MySQL/MariaDB.

![Create New Settings - Database](../assets/create-new-settings-db.png){ width="40%" }

#### Configuration Fields
*   **Connection Name:** A unique identifier used to reference these credentials in your pipeline code.
*   **DB Engine:** Dropdown to select the target database type.
*   **Host/Port/Database Name:** Standard network and schema identifiers.
*   **Database User/Secrets (Password):** Secure credentials for access.
*   **Params:** Used for additional parameters.

#### Oracle-Specific: Auto-Generated Connection Descriptor (CD)
For Oracle databases, e2e-Data simplifies complex configurations by automatically generating the Connection Descriptor when necessary (e.g., using Oracle on OCI).

![Create New Settings - Oracle](../assets/create-new-settings-oracle.png){ width="40%" }

1.  Fill in the standard fields (Host, Port, Service Name) first.
2.  **Generation:** Click the checkbox located beside the **Params** label.
3.  **Result:** The system will automatically populate the Params field.

### Verification & Certainty
*   **Test Connection:** Always click the blue **Test connection** button before saving. This validates the handshake (including the generated CD in case it exists).
    *   The grey circle will turn **green** in case of success, and **red** in case of failure.
*   **Save:** Once validated, commit the settings to HashiCorp Vault.

## 2. Creating Secrets Groups (KV & Provider Keys)

The **Secrets group** option allows you to manage non-database credentials, such as environment variables or cloud provider keys.

![Create New Settings - Key Value](../assets/create-new-settings-kv.png){ width="40%" }

*   **Naming Convention:** It is a best practice to set secret keys in **ALL UPPERCASE** (e.g., `ACCESS_KEY`).
*   **Value (masked):** For security, secret values are masked by default in the UI.
*   **Provider Templates:** Use the "Secret type" dropdown to select pre-configured templates.
    *   **S3 Implementation:** Selecting S3 Access and Secret Keys automatically provides fields for `ACCESS_KEY`, `ACCESS_SECRET_KEY`, and the Bucket URL.

![Create New Settings - S3](../assets/create-new-settings-s3.png){ width="40%" }

*   **Integrated Validation:** Just like Database settings, Provider Keys also feature a **Test connection** button. This allows you to verify that the credentials and Bucket URL are correct before the secret is saved to the Vault.

## 3. API Catalog (Web Service Secrets)

The **API Catalog** is a specialized secret manager within e2e-Data, designed specifically for handling RESTful acquisitions. It centralizes complex parameters required for web service communication while keeping authentication tokens secure.

![API Catalog](../assets/api-catalog.png){ width="25%" }

### Registering New API Settings

When creating a new API configuration, you are presented with a form that manages both the accessibility and the structure of the data you wish to pull.

![Register New API](../assets/register-new-api.png){ width="40%" }

*   **Unique Name:** Just like infrastructure secrets, every API configuration requires a unique name.
*   **Base URL:** The root address of the API service (e.g. `https://api.mycompany.com`).
*   **Multi-Endpoint Support:** By default, "Endpoint 1" is provided. By clicking the green **(+ Endpoint)** button, you can add multiple endpoints to a single configuration.
    *   **Effect:** When this API setting is assigned to a pipeline source node, all configured endpoints will be included in the data request.

### Data Structure & Deduplication

For each endpoint, you can define how e2e-Data should interpret the incoming JSON response:

*   **Data Selector:** Use this if the API response is "wrapped" in a specific field.
    *   *Example:* If the response is `{"students": [{"name": "Mario"}]}`, entering `students` as the selector ensures the system pulls the list directly.
*   **Primary Key:** Used to handle data deduplication scenarios, ensuring that unique records are correctly identified and not duplicated in your destination.

### Offset Pagination Configuration

If your endpoint supports it, you can handle large datasets by selecting **Yes** under "Use pagination". This reveals specific fields to manage the flow:

*   **Offset field name:** The parameter the API uses to skip records (e.g., `offset`).
*   **Limit field name:** The parameter the API uses to define page size (e.g., `limit`).
*   **Records p/ page:** The value assigned to the Limit field (e.g., `100`).
*   **Note:** The Offset field defaults to 0, but you can override this for custom starts. For example, `pokemon=20` would start the data pull from record 20.

### Authentication & Security

Securely manage how e2e-Data proves its identity to the API provider. By checking **Use Authentication**, you can choose from the Auth type dropdown:
*   **X-API-Key:** For header-based key authentication.
*   **Bearer Token:** For standard token-based security.
*   **Vault Protection:** These values are masked in the UI and stored securely in your HashiCorp Vault instance.

![API Authentication Type](../assets/api-auth-type.png){ width="40%" }

### Verification & Connection Testing

To ensure your configuration is functional before saving, use the blue **Test connection** button. This will perform a validation check for every single configured endpoint.

![API Test Connection](../assets/api-test-connection.png){ width="40%" }

![API Test Success](../assets/api-test-success.png){ width="25%" }

*   **Success:** If all endpoints are valid, the status indicator turns green and a JSON summary appears for each endpoint.
*   **Failure Logic:** If any single endpoint fails validation, the indicator turns red—even if the rest are valid. This all-or-nothing approach prevents deployment with partially broken endpoints.
