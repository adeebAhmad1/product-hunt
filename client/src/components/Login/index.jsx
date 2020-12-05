import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Input from "../utils/Input";

const Login = () => {
  const { login } = useAuth();
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
      <form onSubmit={onSubmit} className="form pt-3 pb-5">
      <div className="title">Welcome !</div>
      <Input name="Email"ref={email} id="email" type="email" />
      <Input name="Password"ref={password} id="password" type="password" />
      <button type="text" className="submit">
        submit
      </button>
      {error ? <div className="alert alert-danger mt-4">
        {error.message}
      </div>: ""}
    </form>
    </div>
  );
};

export default Login;
