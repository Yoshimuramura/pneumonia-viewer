import { useState, useEffect } from "react";
const cornerstoneWADOImageLoader = require('cornerstone-wado-image-loader');

type uploadProps = {
    SetImageIds: (images: string[]) => void
    SetImageFiles: (files: any[]) => void
}

export function Dcmupload(props: uploadProps) {

    const [fileInput, setFileInput] = useState<any>(null)
    // input要素

    useEffect(() => {
        const fileInputs: any = document.getElementById('upload');
        setFileInput(fileInputs)
    }, [])
    useEffect(() => {
        if (fileInput != null) {
            // changeイベントで呼び出す関数
            const handleFileSelect = () => {
                const files = fileInput.files;
                props.SetImageFiles(files);
                const filenames: string[] = []
                for (let i = 0; i < files.length; i++) {
                    const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(files[i]);
                    filenames.push(imageId);
                    console.log(filenames);
                    console.log(files[i].name);　// 1つ1つのファイルデータはfiles[i]で取得できる
                }
                props.SetImageIds(filenames)
            }
            // ファイル選択時にhandleFileSelectを発火
            fileInput.addEventListener('change', handleFileSelect);
        }
    })
    return (<input type="file" id="upload" accept="*.dcm" multiple></input>)
}
