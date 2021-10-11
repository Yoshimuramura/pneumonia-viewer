FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt
RUN apt update
RUN apt-get install -y libgl1-mesa-dev


COPY ./app /app

ENV MAX_WORKERS=2
ENV TIMEOUT=300

ENV PORT=8080
