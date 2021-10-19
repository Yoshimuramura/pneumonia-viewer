import { Viewer } from "./viewer";
import { useState } from "react";
import { Selection } from "../parts/select";
import { Dcmupload } from "../parts/dcmUpload";
import { ToolState } from "./toolState";
import "./viewpage.css";
const cornerstoneTools: any = require("cornerstone-tools");

export const Viewpage = (): JSX.Element => {
  const [imageIds, setImageIds] = useState<string[] | null>(null);
  const [imageFiles, setImageFiles] = useState<any>(null);
  const [activeTool, setActiveTool] = useState<string>("Wwwc");
  const [toolstate, setToolstate] = useState<any>({});
  const [update, setUpdata] = useState<boolean>(false);
  // FORM
  console.log(toolstate);
  const SetImageIds = (images: string[]): void => {
    setImageIds(images);
  };

  const getToolState = () => {
    const toolstateinfo =
      cornerstoneTools.globalImageIdSpecificToolStateManager.saveToolState();
    setToolstate(toolstateinfo);
    setUpdata(update ? false : true);
  };

  const SetImageFiles = (imagefiles: any): void => {
    //initCornerstone();
    setImageFiles(imagefiles);
    setActiveTool("Wwwc");
  };

  const options: { value: string; name: string }[] = [
    { value: "Wwwc", name: "Wwwc" },
    { value: "Zoom", name: "Zoom" },
    { value: "Pan", name: "Pan" },
    { value: "RectangleRoi", name: "RectangleRoi" },
    { value: "Eraser", name: "Eraser" },
  ];

  const viewerprops = {
    activeTool: activeTool,
    imageIds: imageIds,
  };

  const toolstateprops = {
    imageIds: imageIds,
    imageFiles: imageFiles,
    toolstate: toolstate,
  };

  const uploadProps = {
    SetImageIds: SetImageIds,
    SetImageFiles: SetImageFiles,
  };

  return (
    <div>
      <h1>ViwePage</h1>
      {Dcmupload(uploadProps)}
      <div className="viewpage-main">
        <div onClick={getToolState}>{Viewer(viewerprops)}</div>
        {ToolState(toolstateprops)}
      </div>
      {Selection(
        "Active tool",
        activeTool,
        (evt) => setActiveTool(evt.target.value),
        options
      )}
    </div>
  );
};
