import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import SideDrawer from './SideDrawer';

const Header = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  return (
      <AppBar position="sticky" className="py-2">
        <Toolbar className="d-flex">
        <IconButton color="inherit" onClick={handleNavCollapse}>
            <MenuIcon/>
          </IconButton>
          <Link to="/" className="text-light text-white text-decoration-none mb-0 font-weight-bold h1">
            Tech Kit
          </Link>
          <SideDrawer open={isNavCollapsed} onClose={handleNavCollapse}/>
        </Toolbar>
      </AppBar>
  );
};

export default Header;
