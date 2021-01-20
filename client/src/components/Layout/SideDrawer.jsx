import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import LanguageIcon from '@material-ui/icons/Language';
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Typography } from '@material-ui/core';
import icon from '../../resources/icon.png';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: `0.9rem`
  },
  main: {
    paddingLeft: theme.spacing(2),
    minWidth: `250px`,
    width: `280px`,
    height: `60px`
  }
}));


const SideDrawer = (props) => {
  const classes = useStyles();
  const { isAuth,logout,activeUser,user } = useAuth();
  const [open,setOpen] = useState(false);

  return (
      <Drawer anchor="left" open={props.open} onClose={props.onClose}>
        <Typography variant="h4" className="d-flex py-3 px-2">
          <Avatar className="mr-3" variant="square" src={icon} alt="Tech Kit" />Tech Kit
        </Typography>
        <List component="nav">
          <ListItem component={NavLink} onClick={props.onClose} to="/" exact activeClassName="bg-light" button className={classes.main}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component="a" href="https://roioverload.com" button className={classes.main}>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary="ROIOverload.com" />
          </ListItem>
          <ListItem component="a" href="https://forms.gle/7arehbmitp5ZVgGG7" button className={classes.main}>
          <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add A Product" />
          </ListItem>
          {activeUser?.role === "admin" && <ListItem component={NavLink} onClick={props.onClose} to="/users" exact activeClassName="bg-light" button className={classes.main}>
          <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>}
          {activeUser?.role === "admin" &&<ListItem component={NavLink} onClick={props.onClose} to="/dashboard" exact activeClassName="bg-light" button className={classes.main}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>}
          {isAuth ? <>
            <ListItem button className={classes.main} onClick={()=>setOpen(!open)}>
              <ListItemIcon>
                {user?.photoURL ?<Avatar className={classes.small} src={user.photoURL} alt={activeUser.firstname} /> : <Avatar className={classes.small}> {activeUser?.firstname?.[0]} </Avatar>}
              </ListItemIcon>
              <ListItemText primary={activeUser.firstname} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={NavLink} onClick={props.onClose} to="/profile" activeClassName="bg-light" className={classes.nested}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem onClick={()=>logout(props.onClose)} button className={classes.nested}>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            </Collapse>
          </>  : <ListItem exact component={NavLink} onClick={props.onClose} to="/login" activeClassName="bg-light" button className={classes.main}>
            <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
          </ListItem>}
        </List>
      </Drawer>
  );
};

export default SideDrawer;