import { Paper,TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
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
      <Paper component="form" onSubmit={onSubmit} action="/" className="form pt-5 pb-5">
        <h2>Find your account</h2>
        <TextField required label="Email" className="w-100" name="email" inputRef={email} id="email" type="email" />
        <button className="btn submit btn-primary">Search</button>
        {
          success ? <Alert severity="success">
            {success.message}
            <br/>
            Go Back to Login? <Link to="/login">Login Now</Link>
          </Alert> : ""
        }
        {
          error ? <Alert severity="error">
            {error.message}
          </Alert> : ""
        }
        {success ? "" : <p className="mt-3">Go Back to Login? <Link to="/login">Login Now</Link></p>}
      </Paper>
    </div>
  );
};

export default Forgot;