# Agendamento

O agendamento executa automaticamente um pipeline guardado, a intervalos fixos.

## Agendar um pipeline

1.  Constrói o pipeline e clica em **Save** (não precisas de o executar primeiro).
2.  Com o diagrama aberto, usa **Schedule a job** junto ao nome do pipeline.
3.  Escolhe a periodicidade **Every**, introduz um número e seleciona **Min** ou **Hour**.
4.  Clica em **Schedule Job**.

!!! note
    **Daily**, **Weekly** e **Monthly** aparecem no formulário mas ainda não estão ativos. Só são suportados *de N em N minutos* e *de N em N horas*.

## Gerir agendamentos

*   O botão **Schedule** no Centro de Ação lista os pipelines agendados.
*   Em **DLT Pipelines Outputs**, ativa **Scheduled pipeline only** para filtrar a lista.
*   No menu de um pipeline (⋮), a entrada **Schedule** mostra **Pause** ou **Resume**. Pausar interrompe as execuções futuras de imediato; retomar regista o job novamente.
*   A hora da última execução fica guardada com cada agendamento.

## Como funciona

*   Os agendamentos são guardados na base de dados do workspace e carregados quando o backend arranca, por isso sobrevivem a reinícios.
*   Os jobs correm dentro do processo do backend, em segundo plano. Cada execução inicia o script do pipeline como um processo separado e envia o seu output para o **Monitor** e para os [logs](monitoring.md) guardados.
*   O output DuckDB de um pipeline só pode ser escrito por um processo de cada vez. Enquanto uma execução decorre o pipeline fica bloqueado, e uma execução que encontre a base de dados bloqueada falha em vez de esperar.
*   As execuções agendadas leem as credenciais do Vault no momento da execução, por isso os segredos nunca precisam de ficar no script.

## Dicas

*   Para pastas ou buckets que recebem novos ficheiros, usa um **File pattern** estável (por exemplo `*.csv`) e define uma **Primary Key** para que as reexecuções façam merge dos registos em vez de os duplicarem.
*   Evita intervalos mais curtos do que o tempo que uma execução normalmente demora.
*   O backend tem de estar a correr para os jobs agendados serem executados.
