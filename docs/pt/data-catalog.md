# Data Catalog & Modelo Semântico

O **Data Catalog** mantém um registo ao nível da coluna de tudo o que os teus pipelines carregam, e sugere o que cada coluna *significa* (por exemplo `email`, `customer_identifier` ou `financial_value`). Também alimenta os [agentes de IA](ai-agent.md) e os seletores de campos do [Data Viz](analytics.md).

!!! info "Requer a extensão LanceDB"
    O catálogo precisa da extensão `lance` do DuckDB, instalada pelo `make install` (vê [Instalação](installation.md)). Se faltar, o workspace mostra o aviso *"LanceDB Extension Not Found"*.

## Abrir o catálogo

1.  Abre **DLT Pipelines Outputs**.
2.  Clica nos três pontos (⋮) junto a um pipeline.
3.  Escolhe **Data catalog**.

Abre-se uma janela com os separadores **Catalog** e **Rules**. Escolhe um pipeline no seletor no topo e depois uma tabela na lista à esquerda.

## Como o catálogo é construído

Sempre que um pipeline carrega dados, o e2e-Data compara o esquema carregado com o que o catálogo já conhece:

*   Uma **coluna nova** é adicionada na versão 1.
*   Uma **alteração de tipo de dados** cria uma nova versão da coluna.
*   Uma **coluna que desapareceu** da origem é marcada como eliminada (fica no histórico, nunca é removida).
*   As colunas inalteradas não acrescentam nada.

Isto dá-te o histórico completo da evolução do esquema, sem trabalho manual. Uma falha no catálogo nunca faz falhar uma execução de pipeline.

## O separador Catalog

Os contadores no topo mostram, para o pipeline selecionado: **Total Columns**, **Active**, **Deleted** e **Evolved** (colunas com versão acima de 1).

Para a tabela selecionada, a grelha lista:

| Coluna | Significado |
| :--- | :--- |
| Column Name | Nome no destino |
| Data Type | Tipo detetado pelo motor |
| Version | Aumenta quando o tipo muda ou a coluna é removida |
| Status | Ativa ou eliminada |
| Semantic Concept | Significado sugerido da coluna |
| Semantic Description | Uma explicação curta da coluna |
| Source | Como a sugestão foi produzida (regra ou IA) |

Usa a caixa de pesquisa para encontrar colunas e os filtros **All / Active / Deleted / Evolved / Pending Semantic**. **Export** descarrega a vista atual em CSV.

### Rever as sugestões semânticas

Edita um conceito ou descrição diretamente na grelha e clica em **Save** para guardar as alterações e marcá-las como validadas. **Pending Semantic** mostra as colunas que ainda precisam de revisão.

## Como as sugestões são geradas

1.  **Regras primeiro.** Os nomes das colunas são comparados com padrões, o que é instantâneo e não precisa de IA. Exemplos: `*_id` → identificador, `*email*` → email, `*phone*` → número de telefone, `*amount*`/`*price*`/`*total*` → valor financeiro, `*status*` → estado, `*date*`/`*_at*` → data.
2.  **IA como alternativa.** As colunas que não coincidem com nenhuma regra são classificadas pelo modelo de IA (requer `GROQ_API_KEY`), que devolve também uma pontuação de confiança e uma descrição.
3.  **Embeddings.** É guardado um vetor por coluna, para os agentes de IA pesquisarem o catálogo por significado (multilingue, por isso as perguntas podem ser em português ou inglês).

Só as colunas **novas** recebem sugestões, por isso as tuas edições validadas nunca são sobrescritas por execuções posteriores.

## O separador Rules

Mostra as regras de padrões usadas no passo 1, com o respetivo conceito semântico e confiança. Na versão atual a lista é **só de leitura** (*+ Add Rule* ainda não está disponível).

## Resolução de problemas

*   **Catálogo vazio:** executa o pipeline pelo menos uma vez depois de ativares o catálogo.
*   **Sem descrições semânticas:** verifica `GROQ_API_KEY`; os conceitos baseados em regras aparecem mesmo sem ela.
*   **Banner de aviso sobre o LanceDB:** executa `make install` em `backend/` e reinicia.
