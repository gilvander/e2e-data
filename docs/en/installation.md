# Installation — Development Environment

## Requirements
- Python 3.12+
- DuckDB installed
- SteelJS CLI
- NPM

## Steps
1. Clone repository
2. Create virtual environment
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```
3. Install backend dependencies
   ```bash
   pip install -r requirements.txt
   ```
4. Run backend
   ```bash
   python app.py
   ```
5. Run frontend with SteelJS
   ```bash
   stl serve
   ```
6. Configure anonymous login
7. Local file uploads
8. Create local pipelines
9. Test ingestion and queries

## Notes
- Uses local DuckDB by default
- Adjust directory paths according to OS
