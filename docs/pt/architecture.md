# Arquitetura

O e2e-Data transforma um diagrama visual num script Python [dltHub](https://dlthub.com/), executa-o e coloca os dados no teu destino.

```
Browser (UI Still.js)  ──HTTP──►  Backend (Flask)  ──►  Script do pipeline (Python + dlt)  ──►  Destino
         ▲                            │   │                       │
         └──── logs em direto (Socket.IO)┘   └── HashiCorp Vault  └── Fontes (ficheiros, S3, SQL, APIs, código)
                                          └── DuckDB / LanceDB (workspace, logs, catálogo)
```

## Componentes

| Componente | Função |
| :--- | :--- |
| **Frontend** | App estática Still.js: canvas, menus, editores, Data Viz. Servida pelo Nginx ou pelo CLI do Still. |
| **Backend** | API Flask. Converte o diagrama em script, executa-o como processo separado e envia o output para a UI. |
| **Templates de nós** | Cada tipo de nó preenche um template de script (ficheiro/bucket, SQL, API, DLT code, outputs). |
| **Vault** | Guarda credenciais de bases de dados, APIs e cloud por utilizador. Os scripts leem-nas no momento da execução. |
| **DuckDB** | Destino por defeito; também guarda dados do workspace, agendamentos e logs. |
| **LanceDB** | Guarda o [Data Catalog](data-catalog.md) e os seus embeddings vetoriais. |
| **Agendador** | Thread em segundo plano que executa pipelines guardados de N em N minutos/horas. |
| **Agentes de IA** | Assistentes com Groq para pipelines, consultas de dados e pesquisa no catálogo. |

## O que acontece quando clicas em Run & Save

1.  A UI envia o diagrama ao backend com o teu utilizador (namespace) e um id de ligação para logs em direto.
2.  As transformações são convertidas em código e cada nó valida as suas definições.
3.  Os templates dos nós são combinados num script Python, que é verificado face às regras de segurança de código.
4.  O script é guardado na pasta do teu utilizador e iniciado como processo próprio.
5.  O seu output é enviado para o **Monitor** e guardado como logs; cada nó reporta sucesso ou erro.
6.  Em caso de sucesso, o diagrama é guardado, os metadados do pipeline são registados e o Data Catalog é atualizado.

## Isolamento entre utilizadores

Cada utilizador tem um namespace que delimita os ficheiros carregados, scripts gerados, outputs DuckDB, segredos no Vault e sessões dos agentes de IA.

## Referência técnica

Os programadores encontram a referência da API, o layout de armazenamento e o desenho interno na pasta `docs/` do repositório do projeto `dlt-client`.
