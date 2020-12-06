import React, { useRef, useState } from "react";

const Form = () => {
  const email = useRef();
  const [error,setError] = useState(false);
  const [success,setSuccess] = useState(false);
  const [loading,setloading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    setSuccess(false);
    setError(false);
    if(email.current.value){
      fetch(`/api/memberAdd?email=${email.current.value}`)
      .then((res) => res.json())
      .then((res) => {
        if(res.statusCode < 300){
          setloading(false);
          email.current.value = "";
          setSuccess("Email Successfully Registered")
          setTimeout(() => setSuccess(false), 2000);
        } else if(res.status >= 400){
          setloading(false);
          setError("There was a problem in loading the email. Please check your email again.");
          setTimeout(() => setError(false), 2000);
        }
      })
      .catch((err) => {
        setloading(false);
        console.log(err)
        setError("There was a problem in loading the email. Please check your email again.");
        setTimeout(() => setError(false), 2000);
      });
    }
  };
  return (
    <form action="/" method="POST" style={{minWidth: `300px`}} className="text-center w-50 mx-auto rounded shadow my-5" onSubmit={onSubmit}>
      <div className="px-5 pt-5">
        <h1 className="font-weight-bold">Productify</h1>
        <h3 className="font-weight-light">700+ Resources for your next Startup or Side Project</h3>
        <h6 className="font-weight-bold">Join other 1k+ Makers for the best Tools every week</h6>
      </div>
      <div className="d-lg-flex d-block d-sm-block px-4 pb-5">
      <div className="col-lg-9 my-1">
      <input type="email" required={true} className="form-control h-auto py-2 px-3" placeholder="Your Email" ref={email} id="email" />
      </div>
      <div className="col-lg-3 my-1 text-center"><button disabled={loading} className="btn btn-primary shadow"> Subscribe&nbsp;Now </button></div>
      </div>
      {
        success || error ? <div className="px-3 py-2">
        {success ? <div className="alert alert-success">
          {success}
        </div> : ""}
        {error ? <div className="alert alert-danger">
          {error}
        </div> : ""}
      </div> : "" 
      }
    </form>
  );
};

export default Form;
