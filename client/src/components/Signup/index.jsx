import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import Input from "../utils/Input";

const Signup = () => {
  const { signup,googleLogin } = useAuth();
  const [error,setError] = useState(null)
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const cpassword = useRef(null);
  const get = a=>a.current.value
  const reject = error=>setError(error);
  const onSubmit = (e)=>{
    e.preventDefault();
    if(get(password) === get(cpassword)){
      signup(get(email),get(password),get(name),()=>{},reject);
    } else setError({message: "Password Didn't match"})
  };
  return (
    <div className="d-flex justify-content-center align-items-center py-5" >
      <div className="form pt-3 pb-5">
      <div className="title ">Welcome to Tech Kit!</div>
      <button onClick={googleLogin} className="btn submit btn-primary">Signup With Google</button>
      <form onSubmit={onSubmit}>
      <Input name="Email" ref={email} id="email" type="email" />
      <Input name="Name" ref={name} id="name" type="text" />
      <Input name="Password"ref={password} id="password" type="password" />
      <Input name="Confirm Password"ref={cpassword} id="conpassword" type="password" />
      <button type="text" className="submit">
        Signup
      </button>
      <p className="text-white mt-2">
        Back to <Link to="/login" className="text-primary text-decoration-none">
          Login
        </Link>
      </p>
      {error ? <div className="alert font_small alert-danger mt-4">
        {error.message}
      </div>: ""}
    </form>
      </div>
    </div>
  );
};

export default Signup;