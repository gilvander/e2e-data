# Agendamento de Pipelines

## Abrir opções de schedule
- No editor do pipeline, abre o painel de agendamento

## Opções disponíveis
- Cada minuto
- Cada hora

## Funcionamento
- O Scheduler agenda execuções periódicas do pipeline
- Execuções são enfileiradas; evita corrida entre instâncias

## Monitorização
- Lista de execuções com hora de início/fim e estado
- Logs por execução

## Ficheiros que entram posteriormente
- Para buckets/diretórios com novos ficheiros:
  - Usa file pattern estável (ex.: `*.csv`)
  - Considera `primary key` para upsert sem duplicação
