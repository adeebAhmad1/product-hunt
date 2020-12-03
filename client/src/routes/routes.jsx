import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Add from '../components/Dashboard/Add';
import Home from "../components/Home";
import Login from "../components/Login";
import Panel from '../components/Panel';
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
      <PrivateRoutes user={isAuth} component={Dashboard} path="/dashboard" exact />
      <PrivateRoutes user={isAuth} component={Add} path="/panel/add/products" exact />
    </Switch>
  );
};

export default Routes;