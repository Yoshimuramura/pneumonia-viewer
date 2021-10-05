import uvicorn
from fastapi import FastAPI, File, UploadFile
import numpy as np
import shutil
import pydicom
from PIL import Image
from typing import List
import os

app = FastAPI()


@app.post("/api/")
async def get_filelist(file: UploadFile = File(...)):
    '''docstring
    ファイルを取得する
    '''
    filename = file.filename
    uploadedpath = f"{os.getcwd()}/uploads/{filename}"
    with open(uploadedpath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    data = pydicom.read_file(uploadedpath)
    img = data.pixel_array
    image_path = f"{os.getcwd()}/images"
    jpeg_img = img.astype('u1')
    save_img = Image.fromarray(jpeg_img).convert('L')
    save_path = image_path + '/' + 'sample.jpg'
    save_img.save(save_path, quality=100)

    files = os.listdir(image_path)
    filelist = [{
        "filename": f,
        "filesize": os.path.getsize(os.path.join(image_path, f)),
    } for f in files if os.path.isfile(os.path.join(image_path, f))]
    return filelist


if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)
