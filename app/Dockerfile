FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt
RUN apt update
RUN apt-get install -y libgl1-mesa-dev


COPY ./app /app
RUN mkdir /app/yolov5/uploads
RUN mkdir /app/yolov5/images

ENV PORT=8080
