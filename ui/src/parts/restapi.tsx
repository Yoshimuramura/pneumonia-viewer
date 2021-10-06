
type postImageProps = {
  file: File;
}

export function PostImage(props:postImageProps){

  const handleClick = () => {
    const formData = new FormData();
    formData.append('file', props.file);
    console.log(props.file)
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
