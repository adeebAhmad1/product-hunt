import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Button } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const CategoryCard = ({category,categories}) => {
  const [show, setShow] = useState(false);
  const { getFiltered } = useData();
  const classes = useStyles();

  const handleClose = () => setShow(false)

  const handleListItemClick = (value) => {
    getFiltered(null,value,handleClose)
  };

  return (
    <div style={{verticalAlign: `top`}} className="d-inline-block">
      <Button variant={show ? "contained" : "outlined"} color="primary" onClick={()=> setShow(i=> !i)} className="m-2">
        {category}
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={show}>
      <DialogTitle id="simple-dialog-title">{category}</DialogTitle>
      <List>
        {categories.map((el) => (
          <ListItem button onClick={() => handleListItemClick(el.id)} key={el.id}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                {el?.subcategory[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={el?.subcategory} />
          </ListItem>
        ))}
      </List>
    </Dialog>
    </div>
  );
};

export default CategoryCard;