import { Viewer } from "./viewer";
import { useState } from 'react';
import { Selection } from '../parts/select';
import { Dcmupload } from '../parts/dcmUpload';
//@ts-ignore
import sampledcm from '../images/80_65.dcm';

type imageIds = (any[] | null);
type activetool = string

export const Viewpage = (): JSX.Element => {
    const [imageIds, setImageIds] = useState<imageIds>(null);
    const [activeTool, setActiveTool] = useState<activetool>('Wwwc');
    // FORM

    const SetImageIds = (images: string[]): void => {
        setImageIds(images)
    }

    const options: { value: string, name: string }[] = [
        { value: "Wwwc", name: "Wwwc" },
        { value: "Zoom", name: "Zoom" },
        { value: "Pan", name: "Pan" },
        { value: "Length", name: "Length" },
        { value: "Angle", name: "Angle" },
        { value: "RectangleRoi", name: "RectangleRoi" },
        { value: "Eraser", name: "Eraser" },
    ]

    const props = {
        activeTool: activeTool,
        imageIds: imageIds,
    }

    const uploadProps = {
        SetImageIds: SetImageIds,
    }

    return (
        <div>
            <h1>ViwePage</h1>
            {Dcmupload(uploadProps)}
            {Viewer(props)}
            {Selection('Active tool', activeTool, evt => setActiveTool(evt.target.value), options)}
            <button
                className="body_btn"
                type="button"
                onClick={() => {
                    setImageIds(["dicomweb:" + sampledcm])
                }}
            >
                web上のものを選択
            </button>
        </div>
    );
}