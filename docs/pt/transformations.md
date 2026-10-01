# Transformações

O **Nó de Transformação Visual** é o motor onde os dados são limpos, modelados e enriquecidos. Apresenta uma interface "point-and-click" desenhada para mudanças estruturais sem exigir codificação externa complexa, enquanto ainda oferece uma opção de "Client Script" para lógica de precisão.

![Visão Geral do Nó de Transformação](../assets/transformation-node-overview.png){ width="70%" }

## Inferência de Esquema e Mapeamento

O nó é altamente inteligente e reconhece automaticamente a estrutura dos teus dados de entrada:
*   **Fontes Suportadas:** Atualmente compatível com Bases de Dados SQL e Sistemas de Ficheiros/Bucket (suportando formatos CSV, JSONL e Parquet). O suporte para outras fontes está a ser implementado.
*   **Descoberta Automática:** Infere automaticamente o esquema do teu nó de fonte ligado, listando dinamicamente todas as tabelas disponíveis e os seus campos correspondentes.

## Fluxo de Trabalho de Transformação

Para aplicar uma mudança, segues uma seleção de linha lógica, passo-a-passo:

1.  **Selecionar Tabela:** Escolhe em que tabela de fonte estás a trabalhar.

![Selecionar Tabela](../assets/transformation-table-selection.png){ width="50%" }

2.  **Selecionar Campo:** Escolhe a coluna/campo específico a ser modificado.

![Selecionar Campo](../assets/transformation-field-selection.png){ width="50%" }

3.  **Tipo de Transformação:** Seleciona um dos 8 tipos disponíveis (7 listados no menu suspenso primário mais a ação "Add New Field").

![Selecionar Tipo](../assets/transformation-type-selection.png){ width="50%" }

4.  **Definir Lógica:** Especifica a transformação exata (ex: converter texto para maiúsculas, aplicar uma operação matemática, ou aplicar lógica de negócio personalizada através de Client Script).

![Lógica de Transformação](../assets/transformation-logic-examples.png){ width="70%" }

### Barra de Ferramentas de Ação (Botões Superiores)

Os botões no topo do nó fornecem três ações administrativas essenciais:
*   **Add Transformation Row:** Adiciona uma nova linha à lista para transformar um campo de fonte existente.
*   **Add New Field:** Cria uma coluna inteiramente nova que aparecerá no teu destino. Ao adicionar um campo, deves nomeá-lo e especificar a sua lógica, tal como:
    *   **Fórmula:** Para cálculos padrão.
    *   **Client Script:** Para escrever lógica personalizada usando a linguagem proprietária do e2e-Data.
*   **Preview Transformations:** Permite-te ver uma pré-visualização ao vivo de todas as transformações adicionadas, garantindo que os resultados estão corretos antes de o pipeline correr.

## Tipos de Transformação

O nó de Transformação Visual suporta atualmente **8 tipos de transformação poderosos**. Estes permitem-te moldar os teus dados, impor qualidade e derivar novos insights através de uma interface simples.

### 1. Calculate (Numérico)
Usado para operações matemáticas em campos numéricos. Podes referenciar campos existentes para criar novos valores ou atualizar os atuais.
*   **Exemplo:** Aplicar um desconto de 10% a um catálogo de produtos.
*   **Lógica:** `LIST_PRICE - (LIST_PRICE * 0.1)`
*   **Resultado:** A coluna `LIST_PRICE` é atualizada para refletir o valor descontado.

### 2. Change Case (String)
Uma ferramenta de formatação rápida para colunas baseadas em texto.
*   **Opções:** Converter valores para **MAIÚSCULAS** ou **minúsculas**.
*   **Caso de Uso:** Normalizar dados introduzidos pelo utilizador (como emails ou nomes) para junção e relatórios consistentes.

### 3. Code (Client Script) (Lógica e Qualidade de Dados)
Isto fornece o nível mais alto de flexibilidade tanto para lógica simples como complexa usando o script personalizado do e2e-Data. Usa uma sintaxe limpa e legível para lógica condicional e tratamento de qualidade de dados.
*   **Exemplo:** Identificar senioridade com base num prefixo de nome.
*   **Lógica:** `LAST_NAME.starts_with('Senior') then 'Senior Employee' else JOB_TITLE`
*   **Regra de Sintaxe:** Nota que todas as strings no script devem ser envolvidas em aspas simples (`'`), não aspas duplas.
*   **Tratamento de Erros:** Se houver um erro de sintaxe ou tempo de execução no teu script, ele é detetado automaticamente e será claramente visível na UI para que o possas corrigir imediatamente.

### 4. Split (Parsing de String)
Permite-te dividir um único campo em múltiplas novas colunas com base num carácter específico (delimitador).
*   **Exemplo:** Extrair informação de um endereço de e-mail usando o carácter `@`.

![Exemplo de Split de Transformação](../assets/transformation-split-example.png){ width="50%" }

*   **Resultado:** Um campo torna-se dois: o lado esquerdo torna-se um campo de nome e o lado direito torna-se um campo de domínio.

### 5. Filter Logic (Controlo de Linha)
Ao contrário de outras transformações, esta não modifica o conteúdo de uma coluna; em vez disso, controla que linhas são passadas para o destino.
*   **Exemplo:** Filtrar por nomes específicos.
*   **Lógica:** `FIRST_NAME.contains('M')`
*   **Resultado:** A saída incluirá apenas registos onde o `FIRST_NAME` contém o carácter `'M'`.

### 6. Deduplicate (Qualidade de Dados)
Garante que o teu conjunto de dados é único com base num campo específico.
*   **Função:** Identifica e remove linhas duplicadas com base na coluna que selecionares (ex: remover múltiplas entradas para o mesmo `STUDENT_ID`).

### 7. Drop (Gestão de Esquema)
Usado para limpar o teu esquema de destino removendo colunas desnecessárias.
*   **Função:** Elimina o campo especificado do conjunto de dados para que não seja escrito na saída final.

### 8. Add New Field (Estrutural)
Permite-te criar uma coluna completamente nova do zero.
*   **Configuração:** Defines o **Nome do Novo Campo** e depois atribuis a sua lógica usando um dos outros tipos, como uma **Fórmula** ou um **Code - Client Script**.
