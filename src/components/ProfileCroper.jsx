import React, { useEffect, useState } from 'react'
import DialogBox from './DialogBox'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const type = "image/jpeg"
const ProfileCroper = ({ open, setOpen, setFile, file, setAvatar }) => {

  
  const [Img, setImg] = useState(null);//croper state
  const [image, setImage] = useState(null);//croper state
  const [crop, setCrop] = useState({aspect: 1/1});//croper state
  const [result, setResult] = useState(null);//croper state


  useEffect(()=>{
    if(file){
      setImg(URL.createObjectURL(file))
    }
  },[file])

  function getCroppedImg() {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
  
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );
    setResult(canvas.toDataURL(type));
}

const onCancel = () => {
  setFile(null)
  setAvatar(null)
}

const onSubmit =async(e) =>{
  e.preventDefault();
  const file = await urlToFile(result);
  setFile(file);
  setAvatar(result);
  setOpen(false);
}

  return (
    <DialogBox  buttonName="Crop" isModalOpen={open} setIsModalOpen={setOpen} maxWidth='lg' onClickFunction={onSubmit} onCancel={onCancel}>
      <div className='flex flex-wrap'>
      { Img && <>
                    <ReactCrop src={Img} onImageLoaded={setImage} crop={crop} onChange={(e)=>{setCrop(e); getCroppedImg()}} style={{maxWidth: "600px",minWidth: "600px" }} />
                </> }
            { result && <div className='flex flex-col m-auto'>
                            <p className='text-xl font-semibold '>Preview</p>
                            <img src={result} alt="" style={{borderRadius:"50%",border:"solid 1px", width: "300px", height:"300px"}} />
                            {/* <button className='btn btn-outline-danger' onClick={()=>{urlToFile(result)}}>download Coped</button> */}
                        </div> } 
      </div>
    </DialogBox>
  )
}

const ImageResizer = async(file) => {
  let newfile = file;
  let count = 0
  let WIDTH = 2000
  const ResizeImmage =(img, WIDTH)=>{
    return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
      let img_url = reader.result;
      let image = document.createElement('img');
      image.src = img_url;

      image.onload = async (e) => {
        let canvas = document.createElement('canvas');
        let ratio = WIDTH / e.target.width;
        canvas.width = WIDTH;
        canvas.height = e.target.height * ratio;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        let new_Img_Url = context.canvas.toDataURL('image/jpeg', 100);
        const genfile = await urlToFile(new_Img_Url);
        console.log(genfile);
        resolve(genfile);
      };
    };
  });
}
  while (newfile.size > 1048576){
        WIDTH = count==0?WIDTH: WIDTH-100
        newfile = await ResizeImmage(newfile, WIDTH)
  }
  return(newfile)

}

const urlToFile = (Url) => {
  let arr = Url.split(",");
  let data = arr[1];
  let dataStr = atob(data)
  let n = dataStr.length
  let dataArr = new Uint8Array(n)
  while(n--){
      dataArr[n] = dataStr.charCodeAt(n)
  }
  let file = new File([dataArr], 'CropedImage.jpg', {type:type})
  // const url = URL.createObjectURL(file);
  // const link = document.createElement('a');
  // link.href = url;
  // link.download = 'image.jpg';
  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link);
  // URL.revokeObjectURL(url); 
  return(file)
  
}

export { ImageResizer }
export default ProfileCroper 