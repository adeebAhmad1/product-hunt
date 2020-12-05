import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Add from '../components/Dashboard/Add';
import AddCategory from '../components/Dashboard/AddCategory';
import Home from "../components/Home";
import Login from "../components/Login";
import Signup from '../components/Signup';
import { useAuth } from "../context/AuthContext";

const PrivateRoutes = ({ user, component: Comp, ...rest }) => {
  return (
    <Route {...rest} component={(props) => user ? <Comp {...props} /> : <Redirect to="/login" />}/>
  );
};

const PublicRoutes = ({ user, component: Comp, ...rest }) => {
  return (
    <Route {...rest} component={(props) => rest.restricted ? (user ? (<Redirect to="/dashboard" />) : (<Comp {...props} />)) : (<Comp {...props} />)}/>
  );
};

const Routes = () => {
  const { isAuth } = useAuth();
  return (
    <Switch>
      <PublicRoutes restricted={false} user={isAuth} component={Home} path="/" exact />
      <PublicRoutes restricted={true} user={isAuth} component={Login} path="/login" exact />
      <PublicRoutes restricted={true} user={isAuth} component={Signup} path="/signup" exact />
      <PrivateRoutes user={isAuth} component={Dashboard} path="/dashboard" exact />
      <PrivateRoutes user={isAuth} component={Add} path="/panel/add/products" exact />
      <PrivateRoutes user={isAuth} component={AddCategory} path="/panel/add/category" exact />
    </Switch>
  );
};

export default Routes;