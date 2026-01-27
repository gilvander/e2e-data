# Transformações

## Ativar transformação
- Adiciona o nó `Transform` ao pipeline
- Define seleção de ficheiros/tabelas a transformar

## Selecionar ficheiros
- Por `file pattern` (ex.: `*.csv`)
- Por origem (S3/local)

## Tipos de transformação
- Code: linguagem inspirada em Python com palavras‑chave customizadas
  - Estrutura básica:
    ```text
    INPUT table people
    SET column region = UPPER(region)
    FILTER country IN ["PK", "IN", "BD"]
    OUTPUT table people_transformed
    ```
  - Palavras‑chave comuns: `INPUT`, `SET`, `FILTER`, `OUTPUT`
- Change case: alterar maiúsculas/minúsculas
  - Exemplo: `region → UPPER(region)`

## Exemplos reais
- Normalizar regiões: “Paquistão → Europa” e aplicar `UPPERCASE`
  ```text
  INPUT table locations
  SET region = CASE WHEN region = "Paquistão" THEN "Europa" ELSE region END
  SET region = UPPER(region)
  OUTPUT table locations_norm
  ```

## Boas práticas
- Isola transformações por tabela
- Documenta intenções no nome da saída
- Testa com amostras antes de aplicar em massa
