import { useState, useEffect } from "react";
import "./toolState.css";
import { PostImage } from "../parts/restapi";
import toolData from "../parts/toolData.json";
const cornerstoneTools: any = require("cornerstone-tools");
const { v4: uuidv4 } = require("uuid");

type toolStateProps = {
  imageIds: string[] | null;
  imageFiles: any;
  SetToolcash: (status: boolean) => void;
};

export function ToolState(props: toolStateProps): JSX.Element {
  const [toolState, setToolState] = useState<any>({});
  const [imageId, setImageId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showstatus, setShowstatus] = useState<boolean>(false);
  const [aiInfo, setAiInfo] = useState<any[] | null>(null);

  const GetAiInfo = (data: any[]): void => {
    setAiInfo(data);
    console.log(data);
    data.forEach((dataarray) => {
      const defaultdata = JSON.parse(
        JSON.stringify(toolData.RectangleRoi.data[0])
      );
      if (dataarray.x !== undefined) {
        defaultdata.handles.start.x = dataarray.x;
        defaultdata.handles.start.y = dataarray.y;
        defaultdata.handles.end.x = dataarray.x + dataarray.w;
        defaultdata.handles.end.y = dataarray.y + dataarray.h;
        defaultdata.handles.textBox.x = dataarray.x + dataarray.w;
        defaultdata.handles.textBox.y = dataarray.y + dataarray.h / 2;
        defaultdata.cachedStats = dataarray.cachedStats;
        defaultdata.uuid = uuidv4();
        console.log(defaultdata);
        cornerstoneTools.globalImageIdSpecificToolStateManager.addImageIdToolState(
          imageId,
          "RectangleRoi",
          defaultdata
        );
      } else {
      }
    });
  };

  useEffect(() => {
    const imageIdsInfo = props.imageIds;
    if (imageIdsInfo != null) {
      setImageId(imageIdsInfo[0]);
    }
  }, [props.imageIds]);

  useEffect(() => {
    const imageFilesInfo = props.imageFiles;
    if (imageFilesInfo != null) {
      setToolState({});
      setShowstatus(false);
      setImageFile(imageFilesInfo[0]);
      console.log(imageFilesInfo[0]);
    }
  }, [props.imageFiles]);
  //cornerstonetool の状態を変更の度に取り出す。
  useEffect(() => {
    const viewerelemwnt = document.getElementById("viewer-element");
    function set() {
      const toolstateinfo =
        cornerstoneTools.globalImageIdSpecificToolStateManager.saveToolState();
      setToolState(toolstateinfo);
      props.SetToolcash(true);
      console.log(toolstateinfo);
      if (imageId !== null && toolstateinfo[imageId] !== undefined) {
        if ("RectangleRoi" in toolstateinfo[imageId]) {
          if (toolstateinfo[imageId]["RectangleRoi"]["data"].length > 0) {
            setShowstatus(true);
          } else {
            setShowstatus(false);
          }
        } else {
          setShowstatus(false);
        }
      } else {
        setShowstatus(false);
      }
    }
    viewerelemwnt!.addEventListener(
      "click",
      function () {
        set();
      },
      false
    );
  });

  return (
    <div className="toolstate-box">
      <h1>アノテーション情報</h1>
      {imageFile !== null ? (
        <div>
          <PostImage file={imageFile} GetAiInfo={GetAiInfo} />
        </div>
      ) : (
        <div></div>
      )}
      {toolState[imageId!] === undefined ||
      toolState[imageId!]["RectangleRoi"]["data"].length == 0 ? (
        <div>No Rows to Show</div>
      ) : (
        <div>
          {toolState[imageId!]["RectangleRoi"]["data"].map((array: any) => {
            const x = Math.min(
              array["handles"]["start"]["x"],
              array["handles"]["end"]["x"]
            );
            const y = Math.min(
              array["handles"]["start"]["y"],
              array["handles"]["end"]["y"]
            );
            const width = Math.abs(
              array["handles"]["start"]["x"] - array["handles"]["end"]["x"]
            );
            const height = Math.abs(
              array["handles"]["start"]["y"] - array["handles"]["end"]["y"]
            );
            return (
              <div className="annotation-info">
                <h3>
                  x座標:{Math.round(x * 100) / 100}　 y座標:
                  {Math.round(y * 100) / 100}　 幅:
                  {Math.round(width * 100) / 100}　 高さ:
                  {Math.round(height * 100) / 100}　
                </h3>{" "}
                　　
              </div>
            );
          })}
        </div>
      )}
      {aiInfo !== null ? (
        <div>
          {aiInfo.map((infoArray) => {
            return (
              <h3>
                x座標:{Math.round(infoArray.x * 100) / 100}　 y座標:
                {Math.round(infoArray.y * 100) / 100}　 幅:
                {Math.round(infoArray.w * 100) / 100}　 高さ:
                {Math.round(infoArray.h * 100) / 100}
                　確率:{Math.round(infoArray.conf * 100) / 100}
              </h3>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
