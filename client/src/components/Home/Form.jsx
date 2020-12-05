import React, { useRef } from "react";

const Form = () => {
  const email = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/memberAdd?email=${email.current.value}`)
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <form action="/" method="POST" style={{minWidth: `300px`}} className="text-center w-50 mx-auto rounded shadow my-5" onSubmit={onSubmit}>
      <div className="px-5 pt-5">
        <h1 className="font-weight-bold">Productify</h1>
        <h3 className="font-weight-light">700+ Resources for your next Startup or Side Project</h3>
        <h6 className="font-weight-bold">Join other 1k+ Makers for the best Tools every week</h6>
      </div>
      <div className="d-lg-flex d-block d-sm-block px-4 pb-5">
      <div className="col-lg-9 my-2">
      <input type="email" className="form-control h-auto py-2 px-3" placeholder="Your Email" ref={email} id="email" />
      </div>
      <div className="col-lg-3 my-2 text-center"><button className="btn btn-primary shadow"> Subscribe&nbsp;Now </button></div>
      </div>
    </form>
  );
};

export default Form;
