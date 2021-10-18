import { useState, useEffect } from "react";
const cornerstoneWADOImageLoader = require("cornerstone-wado-image-loader");

type uploadProps = {
  SetImageIds: (images: string[]) => void;
  SetImageFiles: (files: any[]) => void;
  SetToolcash: (status: boolean) => void;
  toolcash: boolean;
};

export function Dcmupload(props: uploadProps) {
  const [fileInput, setFileInput] = useState<any>(null);
  // input要素

  useEffect(() => {
    const fileInputs: any = document.getElementById("upload");
    setFileInput(fileInputs);
  }, []);

  const onFileInputChange = () => {
    if (fileInput != null) {
      const files = fileInput.files;
      props.SetImageFiles(files);
      const filenames: string[] = [];
      console.log(files);
      for (let i = 0; i < files.length; i++) {
        const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(
          files[i]
        );
        filenames.push(imageId);
        console.log(filenames);
        console.log(files[i].name); // 1つ1つのファイルデータはfiles[i]で取得できる
      }
      props.SetImageIds(filenames);
    }
  };
  return (
    <input
      type="file"
      id="upload"
      accept="*.dcm"
      onChange={onFileInputChange}
    ></input>
  );
}
