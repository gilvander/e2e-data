# Versionamento

Cada pipeline é guardado como um script (vê [Pipeline Scripts](editor.md)), e as alterações são guardadas como novas versões em vez de sobrescreverem as antigas.

## Editar um pipeline

1.  Em **DLT Pipelines Outputs**, abre o menu do pipeline (⋮) e escolhe **View Diagram** para o carregar no canvas. Escolhe **Use as template** para começar um pipeline *novo* a partir de um diagrama existente.
2.  Altera as definições dos nós ou as ligações.
3.  Clica em **Run & Save**. Como o pipeline já existe, o e2e-Data atualiza-o em vez de criar um novo.

## O que acontece na atualização

*   O script atual é mantido como `nome_vN.py` e o script atualizado passa a ser o ativo.
*   Apenas a secção de transformação do script é regenerada; o resto do script é reutilizado.
*   O diagrama guardado com o pipeline é atualizado, para reabrir como o deixaste.

## Onde encontrar versões antigas

As versões aparecem em **Pipeline Scripts** junto ao script ativo, onde as podes abrir ou descarregar.

## Ainda não disponível

*   Comparação visual (diff) entre versões
*   Rollback com um clique e promoção de uma versão para produção

Como alternativa, descarrega o script mais antigo, ou abre-o e copia o seu conteúdo para o script ativo.
