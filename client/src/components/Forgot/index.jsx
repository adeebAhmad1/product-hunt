import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../utils/Input';

const Forgot = () => {
  const [error,setError] = useState();
  const [success,setSuccess] = useState();
  const { reset } = useAuth();
  const email = useRef();
  const onSubmit = e=>{
    e.preventDefault();
    reset(email.current.value,()=>{
      setSuccess({message: "Password Reset Email Has Been Successfully Sent Check Your Inbox for further details"});
      setError(false)
    },(err)=>{
      setError(err)
      setSuccess(false)
    })
  }
  return (
    <div className="d-flex justify-content-center align-items-center py-5" >
      <form onSubmit={onSubmit} action="/" className="form pt-3 pb-5">
        <h1 className="title">Find your account</h1>
        <Input required name="Email" ref={email} id="email" type="email" />
        <button className="btn submit btn-primary">Search</button>
        {
          success ? <div className="alert mt-3 alert-success">
            {success.message}
            <br/>
            Go Back to Login? <Link to="/login">Login Now</Link>
          </div> : ""
        }
        {
          error ? <div className="alert mt-3 alert-danger">
            {error.message}
          </div> : ""
        }
        {success ? "" : <p className="text-white mt-3">Go Back to Login? <Link to="/login">Login Now</Link></p>}
      </form>
    </div>
  );
};

export default Forgot;