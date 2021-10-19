import { useState, useEffect } from "react";
import "./toolState.css";
import { PostImage } from "../parts/restapi";
import toolData from "../parts/toolData.json";
const cornerstoneTools: any = require("cornerstone-tools");
const { v4: uuidv4 } = require("uuid");

type toolStateProps = {
  imageIds: string[] | null;
  imageFiles: any;
  toolstate: any;
};

export function ToolState(props: toolStateProps): JSX.Element {
  const [toolState, setToolState] = useState<any>({});
  const [imageId, setImageId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const GetAiInfo = (data: any[]): void => {
    if (data.length > 0) {
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
          defaultdata.config = dataarray.conf;
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
    }
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
      setImageFile(imageFilesInfo[0]);
      console.log(imageFilesInfo[0]);
    }
  }, [props.imageFiles]);

  useEffect(() => {
    const toolstateinfo = props.toolstate;
    setToolState(toolstateinfo);
  }, [props.toolstate]);

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
      toolState[imageId!]["RectangleRoi"]["data"].length === 0 ? (
        <div>No Rows to Show</div>
      ) : (
        <div className="annotation-box">
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
              <div className="annotations">
                {array.color === undefined ? (
                  <div className="annotation-info">
                    <h3>
                      x座標:{Math.round(x * 100) / 100}　 y座標:
                      {Math.round(y * 100) / 100}　 幅:
                      {Math.round(width * 100) / 100}　 高さ:
                      {Math.round(height * 100) / 100}　
                    </h3>
                  </div>
                ) : (
                  <div className="ai-info">
                    <h3>
                      x座標:{Math.round(x * 100) / 100}　 y座標:
                      {Math.round(y * 100) / 100}　 幅:
                      {Math.round(width * 100) / 100}　 高さ:
                      {Math.round(height * 100) / 100}
                      　確率:{Math.round(array.config * 100) / 100}
                    </h3>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
