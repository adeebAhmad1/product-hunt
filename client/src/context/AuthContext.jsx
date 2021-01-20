import firebase,{ db,googleProvider } from "../config/Firebase";
import React, { useState, useEffect, createContext,useContext } from 'react';
const AuthContext = createContext();

export const useAuth = () =>  useContext(AuthContext);

const AuthContextProvider = ({children}) => {
  const [user,setUser] = useState({});
  const [isAuth,setIsAuth] = useState(false);
  const [activeUser,setactiveUser] = useState({});
  useEffect(()=>{
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        setUser(user);
        db.collection("users").where("uid", "==", user.uid ).onSnapshot(snap=>{
          const users = []
          snap.forEach(doc=>{
            const user = doc.data();
            user.id = doc.id;
            users.push(user);
          })
          if(users.length > 0){
            setIsAuth(true);
          } else{
            setIsAuth(false)
          }
          setactiveUser(users[0]);
        });
      } else{
        setUser({});
        setactiveUser({});
        setIsAuth(false);
      }
    });
  },[]);
  const login = (email,password,resolve,reject)=>{
    firebase.auth().signInWithEmailAndPassword(email,password).then(a=>resolve(a)).catch(err=> reject(err));
  }
  const currentUser = ()=> firebase.auth().currentUser;
  const signup = (email,password,firstname,lastname,resolve,reject)=>{
    firebase.auth().createUserWithEmailAndPassword(email,password).then(a=>{
      if(a.additionalUserInfo.isNewUser){
        db.collection("users").doc(a.uid).set({email: email,time: Date.now(),firstname,lastname,uid: a.user.uid,role: "user"}).then(()=>resolve(a))
      }
    }).catch(err=> reject(err));
  }
  const logout = (resolve)=>{
    firebase.auth().signOut().then(resolve);
  }
  const googleLogin = ()=>{
    firebase.auth().signInWithPopup(googleProvider).then(result=>{
      console.log(result)
      if(result.additionalUserInfo.isNewUser){
        db.collection("users").doc(result.uid).set({email: result.user.email,dp: result.user.photoURL,time: Date.now(),firstname: result.additionalUserInfo.profile.given_name,lastname: result.additionalUserInfo.profile.family_name,uid: result.user.uid,role: "user"})
      }
    })
  }
  const reset = (email,res,rej)=>{
    firebase.auth().sendPasswordResetEmail(email).then(el=>res(el)).catch(err=> rej(err))
  }
  const verify = (res,rej)=>{
    firebase.auth().currentUser.sendEmailVerification().then((e)=>res(e)).catch((e)=> rej(e))
  }
  const value = {user,reset,verify,isAuth,setIsAuth,login,signup,currentUser,activeUser,logout,googleLogin};
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;