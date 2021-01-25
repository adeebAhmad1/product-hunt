import React, { useEffect, useRef, useState } from "react";
import Comment from "../utils/Comment";
import { Container, TextField, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { Alert } from "@material-ui/lab";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
const Comments = ({ id }) => {
  const { updateData,addData, comments,commentsLoaded,delete: deleteData, getComment } = useData();
  const { user,isAuth,activeUser } = useAuth();
  const [error, setError] = useState();
  const comment = useRef();
  useEffect(() => {
    getComment(id);
  }, [getComment,id]);
  const onSubmit = (e) => {
    e.preventDefault();
    const value = {
      name: user.displayName,
      productId: id,
      uid: user.uid,
      userDocId: activeUser.id,
      comment: comment.current.value,
      time: Date.now(),
      dp: user.photoURL,
    };
    addData("comments",value,() => comment.current.value = "",(error) => setError(error));
  };
  return (
    <Container maxWidth="md">
      {
        isAuth && <form onSubmit={onSubmit} className="px-lg-5 py-3 d-flex">
          <TextField id="comment" inputRef={comment} required variant="filled" className="w-100" label="Comment" multiline />
          <div className="px-lg-3">
            <IconButton type="submit" color="primary">
              <SendIcon />
            </IconButton>
          </div>
        </form>
      }
      {error && <Alert severity="error">{error.message}</Alert>}
      {commentsLoaded && <ul id="comments-list" className="comments-list list-unstyled">
        {comments?.map((el, i) => (
          <Comment update={updateData} deleteData={deleteData} key={i} {...el} />
        ))}
      </ul>}
    </Container>
  );
};

export default Comments;
