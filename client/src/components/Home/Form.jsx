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
    <form action="/" method="POST" className="text-center w-50 mx-auto rounded shadow my-5" onSubmit={onSubmit}>
      <div className="px-5 pt-5">
        <h1 className="font-weight-bold">Startup Mate</h1>
        <h3 className="font-weight-light">700+ Resources for your next Startup or Side Project</h3>
        <h6 className="font-weight-bold">Join other 1k+ Makers for the best Tools every week</h6>
      </div>
      <div className="d-flex px-4 pb-5">
      <div className="col-lg-9">
      <input type="email" className="form-control h-auto py-2 px-3" placeholder="Your Email" ref={email} id="email" />
      </div>
      <button className="btn btn-primary shadow col-lg-3"> Subscribe Now </button>
      </div>
    </form>
  );
};

export default Form;
