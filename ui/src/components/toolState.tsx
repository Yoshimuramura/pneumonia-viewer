import { useState,useEffect } from "react";
import './toolState.css';
import { PostImage } from "../parts/restapi";
const cornerstoneTools:any = require('cornerstone-tools');

type toolStateProps ={
    imageIds: string[]|null,
    imageFiles:any,
}

export function ToolState(props:toolStateProps): JSX.Element{
    const [toolState,setToolState] = useState<any>({})
    const [imageIds, setImageIds] = useState<string|null>(null);
    const [imageFile, setImageFile] = useState<any>(null);
    const [showstatus,setShowstatus] = useState<boolean>(false);

    console.log(toolState)

    useEffect(() => {
        const imageIdsInfo = props.imageIds;
        if (imageIdsInfo != null){
        setImageIds(imageIdsInfo[0]);
        }
    }, [props.imageIds])

    useEffect(() => {
        const imageFilesInfo = props.imageFiles;
        if (imageFilesInfo != null){
        setImageFile(imageFilesInfo[0]);
        }
    }, [props.imageFiles])


    useEffect(()=>{
        const viewerelemwnt = document.getElementById("viewer-element");
        function set(){
            const toolstateinfo = cornerstoneTools.globalImageIdSpecificToolStateManager.saveToolState();
            setToolState(toolstateinfo)
            if (imageIds !== null && toolstateinfo[imageIds] !== undefined){
                setShowstatus(true)
            }else{
                setShowstatus(false)
            }
        }
        viewerelemwnt!.addEventListener("click", function(){set()}, false)
    });

    return(
    <div className='toolstate-box'>
        <h1>アノテーション情報</h1>
        {imageFile !== null?
        <div>{PostImage(imageFile)}</div>:<div></div>}
        {showstatus === false?
        <div>
        No Rows to Show
        </div>:
        <div>
            {toolState[imageIds!]['RectangleRoi']['data'].length === 0?
            <div>
                No Rows to Show
            </div>:
            <div>
                {toolState[imageIds!]['RectangleRoi']['data'].map((array:any)=>{
                      const x = Math.min(array['handles']['start']['x'],array['handles']['end']['x']);
                      const y = Math.min(array['handles']['start']['y'],array['handles']['end']['y']);
                      const width = Math.abs(array['handles']['start']['x'] - array['handles']['end']['x']);
                      const height = Math.abs(array['handles']['start']['y'] - array['handles']['end']['y']);
                      return(
                          <div className='annotation-info'>
                              <h3>
                              x座標:{(Math.round(x*100))/100}　
                              y座標:{(Math.round(y*100))/100}　
                              幅:{(Math.round(width*100))/100}　
                              高さ:{(Math.round(height*100))/100}　
                              </h3>
                        　　</div>
                      )
                })}
            </div>}
        </div>}
    </div>
    )
}