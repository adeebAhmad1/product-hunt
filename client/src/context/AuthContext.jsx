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
  const signup = (email,password,name,resolve,reject)=>{
    firebase.auth().createUserWithEmailAndPassword(email,password).then(a=>{
      if(a.additionalUserInfo.isNewUser){
        db.collection("users").doc(a.uid).set({email: email,name: name,uid: a.user.uid,role: "user"}).then(()=>resolve(a))
      }
    }).catch(err=> reject(err));
  }
  const logout = ()=>{
    firebase.auth().signOut();
  }
  const googleLogin = ()=>{
    firebase.auth().signInWithPopup(googleProvider).then(result=>{
      if(result.additionalUserInfo.isNewUser){
        db.collection("users").doc(result.uid).set({email: result.user.email,name: result.user.displayName,uid: result.user.uid,role: "user"})
      }
    })
  }
  const value = {user,isAuth,setIsAuth,login,signup,currentUser,activeUser,logout,googleLogin};
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;