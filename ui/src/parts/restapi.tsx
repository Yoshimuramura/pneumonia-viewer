import cornerstone from "cornerstone-core";
const cornerstoneTools: any = require("cornerstone-tools");

type postImageProps = {
  file: File;
  GetAiInfo: (data: any) => void;
};

export function PostImage(props: postImageProps) {
  // Try pasting this block into the allImageTools example:
  var element = document.getElementById("cornerstone-viewer");
  var toolDataString =
    '{"angle":{"data":[{"visible":true,"handles":{"start":{"x":92.40628941112809,"y":109.38908238107877,"highlight":true,"active":false},"end":{"x":112.40628941112809,"y":99.64666043201174,"highlight":true,"active":false,"eactive":false},"start2":{"x":92.40628941112809,"y":109.38908238107877,"highlight":true,"active":false},"end2":{"x":112.40628941112809,"y":119.38908238107877,"highlight":true,"active":false}}}]},"length":{"data":[{"visible":true,"handles":{"start":{"x":30.63388210486889,"y":77.14351868515968,"highlight":true,"active":false},"end":{"x":57.46755322260141,"y":154.21895700205096,"highlight":true,"active":false,"eactive":false}}}]}}';

  // --- To put the tool data back ---
  /*
var allToolData = JSON.parse(toolDataString);
for (var toolType in allToolData) {
    if (allToolData.hasOwnProperty(toolType)) {
        for (var i = 0; i < allToolData[toolType].data.length; i++) {
            var toolData = allToolData[toolType].data[i];
            cornerstoneTools.addToolState(element, toolType, toolData);
        }
    }
}
// Update the canvas
cornerstone.updateImage(element!);
*/
  const handleClick = () => {
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
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        clearTimeout(timeout);
      });
  };

  return (
    <div>
      <button onClick={handleClick}>AI判定</button>
    </div>
  );
}
