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
import Users from '../components/Users';

const PrivateRoutes = ({ condition, component: Comp, ...rest }) => {
  return (
    <Route {...rest} component={(props) => condition ? <Comp {...props} /> : <Redirect to="/login" />}/>
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
      <PrivateRoutes condition={activeUser?.role === "admin"} component={Dashboard} path="/dashboard" exact />
      <PrivateRoutes condition={isAuth} component={Profile} path="/profile" exact />
      <PrivateRoutes condition={activeUser?.role === "admin"} component={Add} path="/panel/add/products" exact />
      <PrivateRoutes condition={activeUser?.role === "admin"} component={Users} path="/users" exact />
      <PrivateRoutes condition={activeUser?.role === "admin"} component={Add} path="/panel/edit/products/:id" exact />
      <PrivateRoutes condition={activeUser?.role === "admin"} component={AddCategory} path="/panel/add/category" exact />
    </Switch>
  );
};

export default Routes;