import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  console.log(useAuth());
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
    <div id="login-card" className="card">
      <div className="card-body">
        <h2 className="text-center">Login form</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email" ref={email} 
              placeholder="Enter email"
              name="email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="email" ref={password}
              placeholder="Enter password"
              name="pswd"
            />
          </div>
          <button
            type="submit"
            id="button"
            className="btn btn-primary deep-purple btn-block "
          >
            Submit
          </button>
          {error ? <div className="alert alert-danger mt-4">
        {error.message}
      </div>: ""}
        </form>
      </div>
    </div>
  );
};

export default Login;
