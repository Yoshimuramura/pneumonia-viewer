import { Viewer } from "./viewer";
import { useState } from "react";
import { Selection } from "../parts/select";
import { Dcmupload } from "../parts/dcmUpload";
import { ToolState } from "./toolState";
import initCornerstone from "../initCornerstone";
import "./viewpage.css";

const sampledcm: any = require("../images/80_65.dcm").default;

export const Viewpage = (): JSX.Element => {
  const [imageIds, setImageIds] = useState<string[] | null>(null);
  const [imageFiles, setImageFiles] = useState<any>(null);
  const [activeTool, setActiveTool] = useState<string>("Wwwc");
  const [toolcash, setToolcash] = useState<boolean>(false);
  // FORM

  const SetImageIds = (images: string[]): void => {
    setImageIds(images);
  };

  const SetImageFiles = (imagefiles: any): void => {
    initCornerstone();
    setImageFiles(imagefiles);
    setActiveTool("Wwwc");
  };

  const SetToolcash = (status: boolean): void => {
    setToolcash(status);
  };

  const options: { value: string; name: string }[] = [
    { value: "Wwwc", name: "Wwwc" },
    { value: "Zoom", name: "Zoom" },
    { value: "Pan", name: "Pan" },
    { value: "Length", name: "Length" },
    { value: "Angle", name: "Angle" },
    { value: "RectangleRoi", name: "RectangleRoi" },
    { value: "Eraser", name: "Eraser" },
  ];

  const props = {
    activeTool: activeTool,
    imageIds: imageIds,
  };

  const toolstateprops = {
    imageIds: imageIds,
    imageFiles: imageFiles,
    SetToolcash: SetToolcash,
  };

  const uploadProps = {
    SetImageIds: SetImageIds,
    SetImageFiles: SetImageFiles,
    SetToolcash: SetToolcash,
    toolcash: toolcash,
  };

  return (
    <div>
      <h1>ViwePage</h1>
      {Dcmupload(uploadProps)}
      <div className="viewpage-main">
        {Viewer(props)}
        {ToolState(toolstateprops)}
      </div>
      {Selection(
        "Active tool",
        activeTool,
        (evt) => setActiveTool(evt.target.value),
        options
      )}
      <button
        className="body_btn"
        type="button"
        onClick={() => {
          setImageIds(["dicomweb:" + sampledcm]);
        }}
      >
        web上のものを選択
      </button>
    </div>
  );
};
