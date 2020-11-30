// import logo from './logo.svg';
import React, { useRef } from "react";
import "./App.css";

function App() {
  const email = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/memberAdd?email=${email.current.value}`)
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <form action="/" method="POST" onSubmit={onSubmit}>
        <input type="email" ref={email} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
