# Scripts de Pipeline & Editor de Código

Cada pipeline que crias é transformado num script Python que usa o [dltHub](https://dlthub.com/). Os scripts ficam em **Pipeline Scripts** na Navegação Primária.

## Ver e editar um script

1.  Abre **Pipeline Scripts**.
2.  Clica nos três pontos (⋮) junto a um script e escolhe **Open Editor** para ler o código no editor integrado.

!!! note
    Na versão atual, as alterações escritas no editor não são gravadas de volta no script do pipeline. Para mudar o comportamento de um pipeline, edita o seu diagrama (**View Diagram**) e clica em **Run & Save**, o que guarda uma nova versão (vê [Versionamento](versioning.md)). Para personalizar o próprio Python, descarrega o script ou usa um nó **DLT Code**.

## Nomes de ficheiro

O sufixo de um script indica como o pipeline foi criado:

| Nome do ficheiro | Significado |
| :--- | :--- |
| `nome.py` | Pipeline normal com destino DuckDB |
| `nome__withmetadata__.py` | Pipeline com destino SQL/código ou fonte de código; o motor regista os seus metadados para o [Data Catalog](data-catalog.md) |
| `nome__toschedule__.py` | Pipeline que foi **guardado** sem ser executado, para poder ser agendado mais tarde |
| `nome_v2.py`, `nome_v3.py`, ... | Versões anteriores do mesmo pipeline |

## Download

Cada script pode ser descarregado a partir do mesmo menu para ser executado ou instalado fora do e2e-Data.

## Regras de segurança

O código dos nós DLT Code (e o próprio script gerado) é verificado antes de ser guardado ou executado:

*   Só são aceites importações que estejam na lista permitida do servidor.
*   Chamadas perigosas e atributos dunder são rejeitados com *"Invalid code provided which might cause security breach"*.
*   Nunca ponhas credenciais no código; referencia-as com a constante `__secrets` (vê [Ligações & Segredos](connections.md)).

Os administradores podem alargar a lista permitida como descrito em [Instalação](installation.md#seguranca-dos-nos-dlt-code).
