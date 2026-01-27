# Transformations

## Enable transformation
- Add the `Transform` node to the pipeline
- Define selection of files/tables to transform

## Select files
- By `file pattern` (e.g., `*.csv`)
- By source (S3/local)

## Types
- Code: language inspired by Python with custom keywords
  - Basic structure:
    ```text
    INPUT table people
    SET column region = UPPER(region)
    FILTER country IN ["PK", "IN", "BD"]
    OUTPUT table people_transformed
    ```
  - Common keywords: `INPUT`, `SET`, `FILTER`, `OUTPUT`
- Change case: alter uppercase/lowercase
  - Example: `region → UPPER(region)`

## Real examples
- Normalize regions: “Pakistan → Europe” and apply `UPPERCASE`
  ```text
  INPUT table locations
  SET region = CASE WHEN region = "Pakistan" THEN "Europe" ELSE region END
  SET region = UPPER(region)
  OUTPUT table locations_norm
  ```

## Best practices
- Isolate transformations per table
- Document intent in the output name
- Test with samples before mass applying
