import React, { useRef, useState } from "react";
import { Paper, Button, Container,TextField } from "@material-ui/core"
import { Alert } from "@material-ui/lab"

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
          setTimeout(() => setSuccess(false), 4000);
        } else if(res.status >= 400){
          setloading(false);
          setError("There was a problem in loading the email. Please check your email again.");
          setTimeout(() => setError(false), 4000);
        } else{
          console.log(res)
        }
      })
      .catch((err) => {
        setloading(false);
        console.log(err)
        setError("There was a problem in loading the email. Please check your email again.");
        setTimeout(() => setError(false), 4000);
      });
    }
  };
  return (
    <Paper maxWidth="sm" component={Container} elevation={1} className="text-center rounded my-5">
      <div className="pt-5">
        <h1 className="font-weight-bold">Tech Kit</h1>
        <h5 className="font-weight-light">The largest directory of products, tools and resources for your next startup, project or side hustle.</h5>
        <h6 className="font-weight-bold">Join 19,706+ entrepreneurs, intrapreneurs, makers and side hustlers to get the best new tools, every week</h6>
      </div>
      <form onSubmit={onSubmit} className="d-lg-flex d-block d-sm-block pb-5">
      <div className="col-lg-8 my-1">
        <TextField type="email" required={true} variant="outlined" className="w-100" color="primary" placeholder="Your Email" inputRef={email} id="email" />
      </div>
      <div className="col-lg-4 my-1 text-center px-lg-0"><Button disabled={loading} type="submit" variant="contained" className="px-0 h-100 w-100" color="primary" > Subscribe Now </Button></div>
      </form>
      {
        success || error ? <div className="px-3 py-2">
        {success ? <Alert severity="success">
          {success}
        </Alert> : ""}
        {error ? <Alert severity="error">
          {error}
        </Alert> : ""}
      </div> : "" 
      }
    </Paper>
  );
};

export default Form;
