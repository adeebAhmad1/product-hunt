import React, { useRef,useState } from "react";
import { motion } from "framer-motion";
import "./login.css";
import LoginSignupSide from "../utils/LoginSignupSide";
import Input from "../utils/Input";
import { Paper,makeStyles } from "@material-ui/core";
import { useAuth } from "../../context/AuthContext";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles(theme=>({
  root: {
    ["--color"]: theme.palette.text.disabled,
    ["--color-1"]: theme.palette.text.primary
  }
}))

const Login = () => {
  const { login,googleLogin,facebookLogin } = useAuth();
  const reject = error=>setError(error);
  const [error,setError] = useState(null)
  const classes = useStyles();
  const email = useRef();
  const password = useRef();
  const onSubmit = (e)=>{
    e.preventDefault();
    login(email.current.value,password.current.value,()=>{},reject)
  }
  return (
    <div className={classes.root} style={{minHeight: `100vh`}}>
      <div className="login_outer login">
      <div className="login_container">
        <motion.div
          className="login_content py-5"
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: window.innerWidth > 768 ? 432 : window.innerWidth, opacity: 0 }}
          initial={{ x: window.innerWidth > 768 ? 432 : window.innerWidth, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper className="login_inner">
            <h1 className="font-weight-bold mt-4">Login to Your Account</h1>
            <p>Login using social networks</p>
            <div className="form_icons">
              <div onClick={facebookLogin} className="login_icon facebook">
                <svg
                  width="9"
                  height="15"
                  viewBox="0 0 9 15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.324 3.18306C5.209 3.34006 5.147 3.52606 5.147 3.74506L5.144 5.15106H8.23L7.201 8.10306H5.144V14.9931H2.057V8.10306L0.011 8.14206L0 5.15106L2.147 5.13806V3.77306C2.147 3.27106 2.23 2.79906 2.397 2.36006C2.563 1.92006 3.082 1.64006 3.4 1.31006C3.718 0.98006 4.09 0.719061 4.518 0.527061C4.945 0.334061 5.4 0.237061 5.886 0.237061H8.246L8.229 3.18306H5.324Z" />
                </svg>
              </div>
              <div onClick={googleLogin} className="login_icon gmail">
                <svg viewBox="0 -91 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m166 60c34.667969 0 66.027344 17.789062 84 42.300781l42.597656-42.902343c-25.476562-33.128907-74.511718-59.398438-126.597656-59.398438-91.199219 0-166 73.800781-166 165s74.800781 165 166 165c75.601562 0 139.199219-50.699219 158.699219-120 4.199219-14.402344 6.300781-29.402344 6.300781-45v-15h-150v59.988281h79.5c-16.5 35.402344-52.800781 60.011719-94.5 60.011719-57.898438 0-106-47.101562-106-105s48.101562-105 106-105zm0 0"/><path d="m466 90h-60v45h-45v60h45v45h60v-45h46v-60h-46zm0 0"/></svg>
              </div>
            </div>
            <form onSubmit={onSubmit} className="login_form">
              <div className="w-100 mb-3 d-flex justify-content-center align-items-center">
                <div className="line"></div>
                <p className="mb-0 font-smaller px-3">OR</p>
                <div className="line"></div>
              </div>
              <div className="fields">
                <Input type="email" ref={email} placeholder="Email" />
                <Input password={true} ref={password} type="password" placeholder="Password" />
              </div>
              <button className="button_login">Login</button>
            </form>
            {
              error && <Alert severity="error">
                {error.message}
              </Alert>
            }
          </Paper>
        </motion.div>
        <LoginSignupSide
          type="signup_page"
          heading="New Here?"
          text="Sign up and discover a great amount of new opportunities!"
          link="/signup"
          linkText="Sign Up"
          x={-1}
        />
      </div>
    </div>
    </div>
  );
};

export default Login;
