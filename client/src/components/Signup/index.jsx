import React, { useRef, useState } from "react";
import firebase, { db,googleProvider,facebookProvider } from "../../config/Firebase";
import { useAuth } from "../../context/AuthContext";
import Input from "../utils/Input";

const Signup = () => {
  const { signup,user } = useAuth();
  const [error,setError] = useState(null)
  const email = useRef();
  const password = useRef();
  const name = useRef();
  const cpassword = useRef();
  const get = a=>a.current.value
  const reject = error=>setError(error);
  const onSubmit = (e)=>{
    e.preventDefault();
    if(get(password) === get(cpassword)){
      signup(get(email),get(password),()=>{
        user.updateProfile({displayName: get(name)});
        db.collection("users").add({email: get(email),name: get(name),uid: user.uid,role: "user"})
      },reject);
    } else setError({message: "Password Didn't match"})
  };
  const googleLogin = (provider)=>{
    firebase.auth().signInWithPopup(provider).then(result=>{
      console.log(result)
      db.collection("users").add({email: result.user.email,name: result.user.displayName,uid: result.user.uid,role: "user"})
    })
  }
  return (
    <div className="d-flex justify-content-center align-items-center py-5" >
      <button onClick={()=>googleLogin(googleProvider)} className="btn btn-primary">Signup With Google</button>
      <button onClick={()=>googleLogin(facebookProvider)} className="btn btn-primary">Signup With Facebook</button>
      <form onSubmit={onSubmit} className="form pt-3 pb-5">
      <div className="title">Welcome !</div>
      <Input name="Email"ref={email} id="email" type="email" />
      <Input name="Name"ref={name} id="name" type="text" />
      <Input name="Password"ref={password} id="password" type="password" />
      <Input name="Confirm Password"ref={cpassword} id="conpassword" type="password" />
      <button type="text" className="submit">
        submit
      </button>
      {error ? <div className="alert font_small alert-danger mt-4">
        {error.message}
      </div>: ""}
    </form>
    </div>
  );
};

export default Signup;