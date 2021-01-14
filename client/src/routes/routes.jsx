import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Add from '../components/Dashboard/Add';
import AddCategory from '../components/Dashboard/AddCategory';
import Details from '../components/Details';
import Home from "../components/Home";
import Login from "../components/Login";
import Signup from '../components/Signup';
import Forgot from '../components/Forgot';
import { useAuth } from "../context/AuthContext";
import Verification from '../components/Verification';
import Profile from '../components/Profile';

const PrivateRoutes = ({ role, component: Comp, ...rest }) => {
  return (
    <Route {...rest} component={(props) => role === "admin" ? <Comp {...props} /> : <Redirect to="/login" />}/>
  );
};

const PublicRoutes = ({ user, component: Comp, ...rest }) => {
  return (
    <Route {...rest} component={(props) => rest.restricted ? (user ? (<Redirect to="/" />) : (<Comp {...props} />)) : (<Comp {...props} />)}/>
  );
};

const Routes = () => {
  const { isAuth,activeUser,user } = useAuth();
  return (
    activeUser.role && !user.emailVerified ? 
    <Switch>
      <Route path="*" component={Verification} exact />
    </Switch> :
    <Switch>
      <PublicRoutes restricted={false} user={isAuth} component={Home} path="/" exact />
      <PublicRoutes restricted={false} user={isAuth} component={Details} path="/product/:id" exact />
      <PublicRoutes restricted={true} user={isAuth} component={Login} path="/login" exact />
      <PublicRoutes restricted={true} user={isAuth} component={Forgot} path="/forgot" exact />
      <PublicRoutes restricted={true} user={isAuth} component={Signup} path="/signup" exact />
      <PrivateRoutes role={activeUser ? activeUser.role : "user"} component={Dashboard} path="/dashboard" exact />
      <PrivateRoutes role={ activeUser?.role} component={Profile} path="/profile" exact />
      <PrivateRoutes role={activeUser ? activeUser.role : "user"} component={Add} path="/panel/add/products" exact />
      <PrivateRoutes role={activeUser ? activeUser.role : "user"} component={Add} path="/panel/edit/products/:id" exact />
      <PrivateRoutes role={activeUser ? activeUser.role : "user"} component={AddCategory} path="/panel/add/category" exact />
    </Switch>
  );
};

export default Routes;