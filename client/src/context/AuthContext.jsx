import firebase from "../config/Firebase";
import React, { useState, useEffect, createContext,useContext } from 'react';


const AuthContext = createContext();

export const useAuth = () =>  useContext(AuthContext);

const AuthContextProvider = ({children}) => {
  const [user,setUser] = useState({});
  const [isAuth,setIsAuth] = useState(false);
  useEffect(()=>{
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        setUser(user);
        setIsAuth(true);
      } else{
        setUser({});
        setIsAuth(false);
      }
    });
  },[]);
  const login = (email,password,resolve,reject)=>{
    firebase.auth().signInWithEmailAndPassword(email,password).then(a=>resolve(a)).catch(err=> reject(err));
  }
  const currentUser = ()=> firebase.auth().currentUser;
  const signup = (email,password,resolve,reject)=>{
    firebase.auth().createUserWithEmailAndPassword(email,password).then(a=>resolve(a)).catch(err=> reject(err));
  }
  const value = {user,isAuth,login,signup,currentUser};
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;