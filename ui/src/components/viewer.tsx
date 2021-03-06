import { useState, useEffect } from "react";
import "./viewer.css";
const CornerstoneViewport: any = require("react-cornerstone-viewport").default;

export type Props = {
  activeTool: string;
  imageIds: string[] | null;
};

export function Viewer(props: Props): JSX.Element {
  // Declare a new state variable, which we'll call "count"
  const tools: any = [
    // Mouse
    {
      name: "Wwwc",
      mode: "active",
      modeOptions: { mouseButtonMask: 1 },
    },
    {
      name: "Zoom",
      mode: "active",
      modeOptions: { mouseButtonMask: 2 },
    },
    {
      name: "Pan",
      mode: "active",
      modeOptions: { mouseButtonMask: 4 },
    },
    //annotation
    { name: "Length", mode: "active" },
    { name: "Angle", mode: "active" },
    { name: "Bidirectional", mode: "active" },
    { name: "FreehandRoi", mode: "active" },
    { name: "Eraser", mode: "active" },
    { name: "ArrowAnnotate", mode: "active" },
    { name: "CircleRoi", mode: "active" },
    { name: "RectangleRoi", mode: "active" },
  ];
  const [imageIds, setImageIds] = useState<string[] | null>(null);
  // FORM
  const [activeTool, setActiveTool] = useState<string>("Wwwc");

  useEffect(() => {
    const imageIds = props.imageIds;
    setImageIds(imageIds);
  }, [props.imageIds]);

  useEffect(() => {
    const activeTool = props.activeTool;
    setActiveTool(activeTool);
  }, [props.activeTool]);

  return (
    <div className="viewer" id="viewer-element">
      {imageIds == null ? (
        <div>
          <p>画像が選択されていません</p>
        </div>
      ) : (
        <div className="cornerstone-viewer">
          <CornerstoneViewport
            tools={tools}
            imageIds={imageIds}
            activeTool={activeTool}
          />
        </div>
      )}
    </div>
  );
}
