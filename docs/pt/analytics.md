# Data Viz & Analytics

O e2e-Data inclui uma suite de BI integrada para explorar os dados que os teus pipelines produzem: gráficos, tabelas dinâmicas (pivot) e dashboards, sem saíres do workspace. É um motor autónomo, por isso também pode ser incorporado noutras plataformas (foi validado dentro do Odoo).

## Pipelines Analytics Optimized

Junto ao **Pipeline Name**, no topo do canvas, existe a caixa **Analytics Optimized**. Quando está marcada, o pipeline é construído para uso analítico em duas fases:

1.  **Bronze:** os dados em bruto chegam a tabelas padronizadas.
2.  **Gold ("big table"):** os dados são achatados em tabelas largas otimizadas para consultas de BI rápidas e concorrentes.

Se o esquema da origem mudar (por exemplo, novas colunas), a camada gold é atualizada automaticamente para os teus gráficos continuarem a funcionar.

No nó **DuckDB Output**, **Target Datawarehouse** permite criar um novo armazém (por defeito) ou acrescentar as tabelas do pipeline a um existente.

Só os pipelines Analytics Optimized aparecem como datasets no Data Viz.

## Abrir o Data Viz

Clica em **Data Viz** na Navegação Primária. Abre-se uma janela **Data Visualization and BI**.

## Construir um gráfico

1.  Seleciona um pipeline/armazém e **Load data**. As **Tables** e os **Dataset Fields** (vindos do [Data Catalog](data-catalog.md)) ficam listados.
2.  Escolhe um **Chart Type**.
3.  Seleciona os campos para **X Axis / Labels** e **Y Axis / Values**, e escolhe uma **Aggregation** (por exemplo Count, Average, ou *None (raw values)*).
4.  Opcionalmente adiciona **Global Filters** (**ADD NEW FILTER**); os intervalos de datas são sugeridos a partir dos dados. **Apply to All Tiles** aplica um filtro a todos os gráficos de um dashboard.
5.  Confirma o **Chart Preview**, define um **Chart Title** e uma **Color**, e clica em **Build Chart**.
6.  **Save Chart** para reutilizar mais tarde (listado em **Saved Charts**), ou **Publish to Dashboard**: escolhe um dashboard existente em **Select Dashboard** ou cria um novo.

## Tabelas dinâmicas (pivot)

O construtor de pivots permite escolher **Rows**, **Cols** e valores, com agregações e filtros, e guardar o resultado (**Saved Pivots**). Datasets grandes são processados num worker em segundo plano para a página continuar fluida.

## Dashboards

Os dashboards agrupam gráficos guardados como blocos. Cria-os ou atualiza-os através de *Publish to Dashboard*; ficam guardados por utilizador.

## Árvore de esquema e construtor de consultas

Para bases de dados relacionais ligadas, a suite de BI pode desenhar uma **árvore de esquema** em direto com tabelas e relações, e executar SQL a partir de um editor de consultas associado. É útil para explorar uma origem antes de a modelar.

!!! warning
    As consultas correm com as permissões da ligação escolhida. A versão atual não as restringe a `SELECT`, por isso usa um **utilizador de base de dados só de leitura** nas ligações de BI.

## Integração com Odoo

Para bases de dados Odoo (PostgreSQL), o e2e-Data consegue listar os módulos de negócio e as suas tabelas com relações, para configurares rapidamente o primeiro modelo. Os módulos técnicos do Odoo (IR, BASE, MAIL, ...) são filtrados.

## Definições de desempenho

Os administradores podem afinar o DuckDB com `AN_TOTAL_THREADS` e `AN_MAX_MEMORY` no `.env` do backend (vê [Instalação](installation.md)).
