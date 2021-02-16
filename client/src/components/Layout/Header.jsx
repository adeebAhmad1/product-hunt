import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import SideDrawer from './SideDrawer';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { useTheme } from "../../App";

const Header = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const {setDarkMode,darkMode} = useTheme()
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  return (
      <AppBar position="sticky" className="py-2">
        <Toolbar className="d-flex justify-content-between">
          <div className="d-flex">
            <IconButton className="text-white" onClick={handleNavCollapse}>
              <MenuIcon/>
            </IconButton>
            <Link to="/" className="text-light text-white text-decoration-none mb-0 font-weight-bold h1">
              Tech Kit
            </Link>
          </div>
          <IconButton className="text-white" onClick={()=> setDarkMode(d=> !d)}>
            {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
          <SideDrawer open={isNavCollapsed} onClose={handleNavCollapse}/>
        </Toolbar>
      </AppBar>
  );
};

export default Header;
