import { useState, useEffect } from "react";

type uploadProps = {
    SetImageIds: (images: string[]) => void
}

export function Dcmupload(props: uploadProps) {

    const [fileInput, setFileInput] = useState<any>(null)
    // input要素

    useEffect(() => {
        const fileInput: any = document.getElementById('upload');
        setFileInput(fileInput)
    }, [])
    useEffect(() => {
        if (fileInput != null) {

            // changeイベントで呼び出す関数
            const handleFileSelect = () => {
                const files = fileInput.files;
                const filenames: any[] = []
                for (let i = 0; i < files.length; i++) {
                    filenames.push("dicomweb:" + files[i].name);
                    console.log(filenames);
                    console.log(files[i].name);　// 1つ1つのファイルデータはfiles[i]で取得できる
                }
                props.SetImageIds(filenames)
            }
            // ファイル選択時にhandleFileSelectを発火
            fileInput.addEventListener('change', handleFileSelect);
        }
    })
    return (<input type="file" id="upload" accept="image/dcm" multiple></input>)
}