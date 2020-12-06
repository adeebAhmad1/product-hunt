import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Input from "../utils/Input";

const Login = () => {
  const { login,googleLogin } = useAuth();
  const [error,setError] = useState(null)
  const email = useRef(null);
  const password = useRef(null);
  const reject = error=>setError(error);
  const onSubmit = (e)=>{
    e.preventDefault()
    login(email.current.value,password.current.value,()=>{},reject)
  }
  return (
    <div className="d-flex justify-content-center align-items-center py-5" >
      <div className="form pt-3 pb-5">
      <div className="title">Welcome Back !</div>
      <button onClick={()=>googleLogin(true)} className="btn submit btn-primary">Login With Google</button>
      <form onSubmit={onSubmit}>
      <Input name="Email"ref={email} id="email" type="email" />
      <Input name="Password"ref={password} id="password" type="password" />
      <button type="text" className="submit">
        Login
      </button>
      <p className="text-white mt-2">
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
