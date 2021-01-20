import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import Featured from "../utils/Featured";
import { Paper,Button } from '@material-ui/core';

const Profile = () => {
  const { activeUser,user } = useAuth();
  const { getUserProducts,addDp } = useData();
  const [likedProducts,setLikedProducts] = useState([]);
  const [img,setImg] = useState(null);
  const [fileSelected,setfileSelected] = useState(null);
  const [blob,setblob] = useState(null);
  useEffect(()=>{
    setImg(activeUser?.dp);
    getUserProducts(activeUser?.uid,setLikedProducts)
  },[activeUser,getUserProducts]);
  const crop = (url, aspectRatio = 1) => {
    return new Promise(resolve => {
      // this image will hold our source image data
      const inputImage = new Image();
      inputImage.src = url;
      // we want to wait for our image to load
      inputImage.onload = () => {
        // let's store the width and height of our image
        const inputWidth = inputImage.naturalWidth;
        const inputHeight = inputImage.naturalHeight;
  
        // get the aspect ratio of the input image
        const inputImageAspectRatio = inputWidth / inputHeight;
  
        // if it's bigger than our target aspect ratio
        let outputWidth = inputWidth;
        let outputHeight = inputHeight;
        if (inputImageAspectRatio > aspectRatio) {
          outputWidth = inputHeight * aspectRatio;
        } else if (inputImageAspectRatio < aspectRatio) {
          outputHeight = inputWidth / aspectRatio;
        }
  
        // calculate the position to draw the image at
        const outputX = (outputWidth - inputWidth) * .5;
        const outputY = (outputHeight - inputHeight) * .5;
  
        // create a canvas that will present the output image
        const outputImage = document.createElement('canvas');
        // set it to the same size as the image
        outputImage.width = outputWidth;
        outputImage.height = outputHeight;
        // draw our image at position 0, 0 on the canvas
        const ctx = outputImage.getContext('2d');
        ctx.drawImage(inputImage, outputX, outputY);
        outputImage.toBlob(blob=> setblob(blob))
        resolve(outputImage);
      };
    });
  };
  const handleFileChange = e=>{
    const file = e.target?.files?.[0];
    if(file){
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setTimeout(() => crop(reader.result).then(img=>{
        setfileSelected(true)
        setImg(img.toDataURL())
      }), 1000);
    }
  }
  return (
    <div className="py-5">
      <div className="container emp-profile mt-5">
      <div>
        <div className="row">
          <div className="col-md-4 text-center">
            <div className="profile-img mb-3">
              {activeUser.dp ? <Paper component="img" elevation={3} style={{width: `200px`}} className="rounded-circle" src={img} alt={user.displayName} /> : <Paper elevation={3} className="bg-light rounded-circle d-flex justify-content-center align-items-center display-2 border" style={{width: `200px`,height: `200px`}}> {activeUser.firstname[0]} </Paper>}
            </div>
            {fileSelected ? 
              <div className="d-flex" style={{justifyContent: `space-evenly`}}>
                <Button variant="contained" onClick={()=>{
                  setfileSelected(false);
                  setImg(activeUser.dp)
                }} color="default">Cancel</Button>
                <Button variant="contained" onClick={()=>{
                  addDp(activeUser?.email,blob,activeUser.id,()=>{
                    setfileSelected(false);
                    setImg(activeUser.dp)
                  })
                }} color="secondary">Ok</Button>
              </div> :
              <>
                <input type="file" onChange={handleFileChange} hidden id="file"/>
                <Button component="label" htmlFor="file" variant="contained" color="primary" >Upload File</Button>
              </>}
          </div>
          <div className="col-md-6">
            <div className="profile-head">
              <h3>{activeUser.firstname} {activeUser.lastname}</h3>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <Link to="/profile" className="nav-link active">About</Link>
                </li>
              </ul>
            </div>
            <div className="w-100"></div>
            <div className="tab-content profile-tab" id="myTabContent">
              <div className="tab-pane fade show active" id="home">
                <div className="row">
                  <div className="col-md-6">
                    <label>First Name</label>
                  </div>
                  <div className="col-md-6">
                    <p>{activeUser.firstname}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Last Name</label>
                  </div>
                  <div className="col-md-6">
                    <p>{activeUser.lastname}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                    <p>{activeUser.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        {likedProducts.map((el,i)=> <div className="col-lg-4"><Paper><Featured tag="Liked Products" {...el} key={i} /></Paper></div>)}
      </div>
    </div>
    </div>
  );
};

export default Profile;
