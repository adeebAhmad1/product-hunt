import { InputAdornment, TextField, IconButton,Button } from "@material-ui/core";
import React, { useRef,useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MailIcon from '@material-ui/icons/Mail';
import "./login.css"

const Login = () => {
  const { login,googleLogin } = useAuth();
  const [error,setError] = useState(null)
  const [show,setShow] = useState(null)
  const email = useRef(null);
  const password = useRef(null);
  const reject = error=>setError(error);
  useEffect(()=>{
    console.log({email,password})
  },[])
  const onSubmit = (e)=>{
    e.preventDefault();
    console.log({email,password})
    login(email.current.value,password.current.value,()=>{},reject)
  }

  return (
    <div className="d-flex justify-content-center align-items-center py-5" >
      <div className="form bg-white shadow-lg pt-3 pb-5">
      <h1 className="h1 mt-2 mb-4">Welcome Back !</h1>
      <Button color="secondary" variant="contained" startIcon={<MailIcon />} onClick={()=>googleLogin(true)} >Login With Google</Button>
      <form onSubmit={onSubmit}>
      <div className="py-2">
        <TextField label="Email" className="w-100" required inputRef={email} id="email" type="email" />
      </div>
      <div className="py-2">
        <TextField inputRef={password} required
            id="password"
            label="Password"
            type={show ? 'text' : 'password'}
            className="w-100"
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton onClick={()=> setShow(a=>!a) }>
                  {show ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }}
          />
      </div>
      <Button variant="contained" color="primary" type="submit">Login</Button>
      <p className="mt-3">
        <Link to="/forgot" className="text-primary text-decoration-none">Forgot Password?</Link>
      </p>
      <p className="mt-2">
        Don’t have an account? <Link to="/signup" className="text-primary text-decoration-none">Sign Up</Link>
      </p>
      {error ? <div className="alert alert-danger mt-4">
        {error.message}
      </div>: ""}
    </form>
      </div>
    </div>
  );
};

export default Login;
