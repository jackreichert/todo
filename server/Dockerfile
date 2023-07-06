FROM python:3.11-slim-buster

WORKDIR /app

COPY poetry.lock pyproject.toml /app/
RUN pip install poetry && poetry config virtualenvs.create false && poetry install --no-dev

COPY dist/*.whl /app/
RUN pip install *.whl

COPY server/* /app/

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "wsgi:application"]
