import { Button, withStyles } from "@material-ui/core";
import React, { forwardRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Slide from '@material-ui/core/Slide';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DeleteButton = withStyles((theme) => ({
  root: {
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
    fontWeight: `bold`
  },
}))(Button);

const Popup = ({ open=false, handleClose,handleDelete }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
    >
      <DialogTitle>
        Are You Sure You Want to Delete this Category?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please Make sure that any product is not related to this category. If
          so please delete the product first else the website may throw error or
          will crash in realtime.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <DeleteButton onClick={handleDelete}>
          Delete
        </DeleteButton>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
