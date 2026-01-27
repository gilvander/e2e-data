# Instalação — Ambiente de Desenvolvimento

## Requisitos
- Python 3.12+
- DuckDB instalado
- SteelJS CLI
- NPM

## Passos
1. Clonar repositório
2. Criar ambiente virtual
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```
3. Instalar dependências do backend
   ```bash
   pip install -r requirements.txt
   ```
4. Executar backend
   ```bash
   python app.py
   ```
5. Executar frontend com SteelJS
   ```bash
   stl serve
   ```
6. Configurar login anónimo
7. Upload local de ficheiros
8. Criar pipelines locais
9. Testar ingestão e consultas

## Notas
- Usa DuckDB local por padrão
- Ajusta paths de diretórios conforme o SO
