import { useState, useEffect } from 'react';
import './viewer.css'


const CornerstoneViewport: any = require('react-cornerstone-viewport').default;



export type Props = {
    activeTool: string
    imageIds: string[] | null
}

export function Viewer(props: Props): JSX.Element {
    // Declare a new state variable, which we'll call "count"
    const tools:any = [
        // Mouse
        {
            name: 'Wwwc',
            mode: 'active',
            modeOptions: { mouseButtonMask: 1 },
        },
        {
            name: 'Zoom',
            mode: 'active',
            modeOptions: { mouseButtonMask: 2 },
        },
        {
            name: 'Pan',
            mode: 'active',
            modeOptions: { mouseButtonMask: 4 },
        },
        //annotation
        { name: 'Length', mode: 'active' },
        { name: 'Angle', mode: 'active' },
        { name: 'Bidirectional', mode: 'active' },
        { name: 'FreehandRoi', mode: 'active' },
        { name: 'Eraser', mode: 'active' },
        { name: 'ArrowAnnotate', mode: 'active' },
        { name: 'CircleRoi', mode: 'active' },
        { name: 'RectangleRoi', mode: 'active' },
        // Scroll
        { name: 'StackScrollMouseWheel', mode: 'active' },
        // Touch
        { name: 'PanMultiTouch', mode: 'active' },
        { name: 'ZoomTouchPinch', mode: 'active' },
        { name: 'StackScrollMultiTouch', mode: 'active' },
        { name: 'Rotate', mode: 'active' },
    ]
    const [imageIds, setImageIds] = useState<any>(null);
    console.log(imageIds)
    // FORM
    const [activeTool, setActiveTool] = useState<any>("Wwwc")

    useEffect(() => {
        const imageIds = props.imageIds;
        setImageIds(imageIds);
    }, [props.imageIds])

    useEffect(() => {
        const activeTool = props.activeTool;
        setActiveTool(activeTool);
    }, [props.activeTool])

    return (
        <div className='viewer'>
            {imageIds == null ?
                <div><p>画像が選択されていません</p>
                    <p>{activeTool}</p></div> :
                <div className='cornerstone-viewer'>
                    <CornerstoneViewport
                    tools={tools}
                    imageIds={imageIds}
                    activeTool={activeTool}/>
                </div>
            }
        </div>
    );
}

