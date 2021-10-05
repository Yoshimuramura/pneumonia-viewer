import { useState, useEffect } from "react";

type postImageProps = {
  file:File
}

export function PostImage(props:postImageProps){


  const formData = new FormData();
  const fileField = props.file

  formData.append('avatar', fileField);

  const handleClick = () => {
    fetch('/api/', {
      method: 'POST',
      body: formData
    })
  .then(response => console.log(response))
  .then(result => {
    console.log('Success:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

  return (
    <div>
      <button onClick={handleClick}>AI判定</button>
    </div>
  );
}
