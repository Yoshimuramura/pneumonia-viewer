import { PostModal, SuccessModal, ErrorModal } from "./aiJudge";
import { useState } from "react";

type postImageProps = {
  file: File;
  GetAiInfo: (data: any) => void;
};

export function PostImage(props: postImageProps) {
  const [postmodalshow, setPostmodalShow] = useState(false);
  const [successmodalshow, setSuccessmodalShow] = useState(false);
  const [errormodalshow, setErrormodalShow] = useState(false);
  const [error, setError] = useState<string>("");
  const [update, setUpdata] = useState<boolean>(false);

  const SetSuccessmodalShow = (showjudge: boolean): void => {
    setSuccessmodalShow(showjudge);
    setUpdata(update ? false : true);
  };

  const SetErrormodalShow = (showjudge: boolean): void => {
    setErrormodalShow(showjudge);
  };

  const handleClick = () => {
    setPostmodalShow(true);
    const formData = new FormData();
    formData.append("file", props.file);
    console.log(props.file);

    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, 5 * 60 * 1000); // will time out after 5minutes

    fetch("/api/", {
      signal: controller.signal,
      method: "POST",
      body: formData,
    })
      .then((response) => {
        response.json().then((data) => {
          console.log("Success:", data);
          props.GetAiInfo(data);
          setPostmodalShow(false);
          setSuccessmodalShow(true);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        setPostmodalShow(false);
        setErrormodalShow(true);
        setError(error);
      })
      .finally(() => {
        clearTimeout(timeout);
      });
  };

  return (
    <div>
      <button onClick={handleClick}>AI判定</button>
      <PostModal show={postmodalshow} />
      <SuccessModal
        SetSuccessmodalShow={SetSuccessmodalShow}
        show={successmodalshow}
      />
      <ErrorModal
        SetErrormodalShow={SetErrormodalShow}
        show={errormodalshow}
        error={error}
      />
    </div>
  );
}
