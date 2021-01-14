import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  InputAdornment,
  TextField,
  IconButton,
  Button,
  Paper
} from "@material-ui/core";
import { Alert } from "@material-ui/lab"
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import MailIcon from "@material-ui/icons/Mail";

const Signup = () => {
  const { signup, googleLogin } = useAuth();
  const [error, setError] = useState();
  const [showp, setshowp] = useState();
  const [showcp, setshowcp] = useState();
  const email = useRef();
  const password = useRef();
  const firstname = useRef();
  const lastname = useRef();
  const cpassword = useRef();
  const get = (a) => a.current.value;
  const reject = (error) => setError(error);
  const onSubmit = (e) => {
    e.preventDefault();
    if (get(password) === get(cpassword)) {
      signup(
        get(email),
        get(password),
        get(firstname),
        get(lastname),
        () => {},
        reject
      );
    } else setError({ message: "Password Didn't match" });
  };
  return (
    <div className="container pt-3 pb-5 ">
      <Paper elevation={5}
        className="form bg-white text-center mx-auto"
        style={{ width: `450px`, minWidth: 250 }}
      >
        <h1 className="mt-2 mb-3">Welcome !</h1>
        <div className="mb-3">
          <Button
            color="secondary"
            variant="contained"
            startIcon={<MailIcon />}
            onClick={googleLogin}
          >
            Signup With Google
          </Button>
        </div>
        <form onSubmit={onSubmit} className="row justify-content-center">
          <div className="col-sm-6 py-2">
            <TextField
              label="Email"
              className="w-100"
              inputRef={email}
              required
              id="email"
              type="email"
            />
          </div>
          <div className="col-sm-6 py-2">
            <TextField
              label="First Name"
              className="w-100"
              inputRef={firstname}
              required
              id="firstname"
              type="text"
            />
          </div>
          <div className="col-sm-6 py-2">
            <TextField
              label="Last Name"
              className="w-100"
              inputRef={lastname}
              required
              id="lastname"
              type="text"
            />
          </div>
          <div className="col-sm-6 py-2">
            <TextField
              required
              id="password"
              label="Password"
              type={showp ? "text" : "password"}
              className="w-100"
              inputRef={password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setshowp((a) => !a)}>
                      {showp ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="col-sm-6 py-2">
            <TextField
              required
              id="cp"
              label="Confirm Password"
              type={showcp ? "text" : "password"}
              className="w-100"
              inputRef={cpassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setshowcp((a) => !a)}>
                      {showcp ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="w-100"></div>
          <Button variant="contained" color="primary" type="submit">
            Signup
          </Button>
        </form>
        <p className="mt-2">
          Back to{" "}
          <Link to="/login" className="text-primary text-decoration-none">
            Login
          </Link>
        </p>
        {error ? (
          <Alert severity="error" className="mt-4">
            {error.message}
          </Alert>
        ) : (
          ""
        )}
      </Paper>
    </div>
  );
};

export default Signup;
