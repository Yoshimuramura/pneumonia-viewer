# 肺炎検出ビジュアライザ

## 全体をお試ししたい時

```
docker-compose up --build
```

## バックエンドだけの実行について

### イメージをビルド

```
docker build -t name:tag {Dockerfileがある場所のディレクトリのパス}
```

例：

```
docker build -t backend:latest .
```

### イメージの起動

```
docker run -it -p 8080:8080 backend
```

## その他

dockerfile の元のイメージ（uvicorn-gunicorn+fastapi)

[uvicorn-gunicorn-fastapi-docker](https://github.com/tiangolo/uvicorn-gunicorn-fastapi-docker)

yolov5 を app の中に入れて、requirements.txt をコピーしてインストールするように、dockerfile を以下を参考に書き換える。

```Dockerfile
FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9
COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt
COPY ./app /app
```
