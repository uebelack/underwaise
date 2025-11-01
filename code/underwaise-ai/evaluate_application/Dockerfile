FROM python:3.13-slim

WORKDIR /app

RUN pip install uv

COPY pyproject.toml ./
COPY uv.lock ./

RUN uv sync

COPY src/ ./src/

ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

CMD ["uv", "run", "fastapi", "run", "src/main.py"]