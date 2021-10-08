import uvicorn
from fastapi import FastAPI, File, UploadFile
import numpy as np
import shutil
import pydicom
from PIL import Image
from typing import List
import subprocess
import os

app = FastAPI()


@app.post("/api/")
async def get_filelist(file: UploadFile = File(...)):
    '''docstring
    ファイルを取得する
    '''
    filename = file.filename

    os.chdir('./yolov5')
    uploadedpath = f"./uploads/{filename}"
    with open(uploadedpath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    data = pydicom.read_file(uploadedpath)
    img = data.pixel_array
    img_x = img.shape[1]
    img_y = img.shape[0]
    image_path = "./images"
    jpeg_img = img.astype('u1')
    save_img = Image.fromarray(jpeg_img).convert('L')
    save_path = image_path + '/' + 'sample.jpg'
    save_img.save(save_path, quality=100)

    weights = [
        f"./runs/train/exp{i}3/weights/best.pt" for i in range(5)]
    we = " " . join(weights)

    # コマンドを定義して、変数を挿入するdo
    cmd = f"python ./detect.py --weights {we} --img 512 --conf 0.2 --iou 0.4 --source {save_path} --save-txt --save-conf"

    result = subprocess.run(cmd, shell=True)
    print(result)

    textfile = './runs/detect/exp/labels/sample.txt'
    with open(textfile) as f:
        l_strip = [s.strip() for s in f.readlines()]

    annolist = [l.split() for l in l_strip]
    anno_json = [{
        'x': float(anno[1])*img_x-(float(anno[3])*img_x)/2,
        'y':float(anno[2])*img_y-(float(anno[4])*img_x)/2,
        'w':float(anno[3])*img_x,
        'h':float(anno[4])*img_y,
        'conf':float(anno[5])
    } for anno in annolist]

    os.remove(uploadedpath)
    os.remove(save_path)
    try:
        shutil.rmtree("./runs/detect/exp")
    except:
        pass

    return anno_json


if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)
