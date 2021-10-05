import uvicorn
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, ORJSONResponse, RedirectResponse, FileResponse
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import numpy as np
import pydicom
from PIL import Image
from typing import List
import os

app = FastAPI()


class Item(BaseModel):
    name: str
    price: float
    is_offer: bool = None


class Result(BaseModel):
    code: int = 0
    message: str = ''
    items: List[Item] = None


class User(BaseModel):
    username: str
    hostname: str


@app.get("/api/user", response_model=User)
def read_user():
    import socket
    import getpass
    return {
        "username": getpass.getuser(),
        "hostname": socket.gethostname()
    }


@app.get("/api/")
def read_root():
    return {"Hello": "World"}


@app.get("/api/items/{item_id}", response_model=Result)
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}


@app.put("/api/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id}

@app.get("/api/fileupload/filelist", response_class=ORJSONResponse)
async def get_filelist(request: Request):
    '''docstring
    アップロードされたファイルの一覧を取得する
    '''

    def get_extention(filePath):
        '''docstring
        ファイルパスから拡張子を取得する
        '''
        ex = os.path.splitext(filePath)
        return ex[len(ex)-1]

    uploadedpath = "./uploads"
    files = os.listdir(uploadedpath)
    filelist = [{
        "filename":f, 
        "filesize": os.path.getsize(os.path.join(uploadedpath, f)),    
        "extention": get_extention(f),
    } for f in files if os.path.isfile(os.path.join(uploadedpath, f))]
    return filelist

@app.post("/api/",response_class=ORJSONResponse)
async def get_filelist(formData,):
    '''docstring
    ファイルを取得する
    '''
    filejson = formData.avatar
    filename = filejson.name
    uploadedpath = f"{os.getcwd()}/uploads/{filename}"
    data = pydicom.read_file(uploadedpath)
    img = data.pixel_array
    image_path = f"{os.getcwd()}/Image"
    try:
        os.makedirs(image_path)
    except FileExistsError:
        pass
    jpeg_img = img.astype('u1')
    save_img = Image.fromarray(jpeg_img).convert('L')
    save_path = image_path+'/'+'sample.jpg'
    save_img.save(save_path,quality=100)

    
    files = os.listdir(uploadedpath)
    filelist = [{
        "filename":f,
        "filesize": os.path.getsize(os.path.join(uploadedpath, f)),    
    } for f in files if os.path.isfile(os.path.join(uploadedpath, f))]
    return filelist



if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)
