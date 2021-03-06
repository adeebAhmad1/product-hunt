import React, { useEffect,useRef,useState } from "react";
import EditIcon from '@material-ui/icons/Edit';
import { Paper, TextField,IconButton,makeStyles } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import moment from "moment";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";

const useStyles = makeStyles(theme=>({
  paper: {
    border: `3px solid ${theme.palette.background.paper}`
  },
  top: {
    background: theme.palette.action.disabledBackground
  },
  span: {
    color: theme.palette.action.disabled
  }
}))

const Comment = ({reply = false,update,userDocId,deleteData,id,uid,comment,time = Date.now(),...props}) => {
  const [replies,setReply] = useState([]);
  const [edit, setEdit] = useState(false);
  const [dp,setImg] = useState(null);
  const [name,setName] = useState(null);
  const classes = useStyles();
  const { updateReply,setReplies,getReplies,getUser,deleteReply } = useData();
  useEffect(()=>{
    !reply && getReplies(id,setReply);
  },[getReplies,id,reply]);
  useEffect(()=>{
    getUser(userDocId,setImg,setName)
  },[getUser,uid]);
  const { user,isAuth,activeUser } = useAuth();
  const replyInput = useRef();
  const editInput = useRef();
  const onSubmit = (event)=>{
    event.preventDefault();
    const value = {
      commentId: id,
      uid: user.uid,
      userDocId: activeUser.id,
      comment: replyInput.current.value,
      time: Date.now(),
    };
    setReplies(id,value,() => replyInput.current.value = "")
  }
  const showReplies = ()=>{
    return replies.map((el,i)=>{
      return <Comment update={updateReply} deleteData={deleteReply} {...el} key={i} reply={true} />
    })
  }
  return (
    <li>
      <div className="comment-main-level">
        <Paper elevation={2} className={"comment-avatar "+ classes.paper}>
          {dp ? <img src={dp} alt={name} /> : <div className="w-100 h-100 h2 bg-light d-flex justify-content-center align-items-center">{name?.[0]}</div>}
        </Paper>
        <Paper elevation={2} className="comment-box">
          <div className={"comment-head d-flex justify-content-between align-items-center "+ classes.top}>
            <div>
              <h5 className="comment-name">
                {name}
              </h5>
              <span className={classes.span}>{moment(time).fromNow()}</span>
            </div>
            {uid === user.uid && <div>
              <IconButton onClick={()=> setEdit(e=> !e)}>
                {edit ? <CloseIcon /> : <EditIcon />}
              </IconButton>
                <IconButton onClick={()=> {
                  if(!reply) deleteData("comments",id)
                  else if(reply) deleteData(props.commentId,id)
                }}>
                  <DeleteIcon />
                </IconButton>
            </div>}
          </div>
          <div className="comment-content">
            {edit ? <form onSubmit={(event)=>{
              event.preventDefault();
              const resolve = ()=> setEdit(false)
              if(!reply) update("comments",id,{comment: editInput.current.value},resolve)
              else if(reply) update(props.commentId,id,{comment: editInput.current.value},resolve)
            }} className="reply-list py-3 px-0 d-flex">
              <TextField defaultValue={comment} inputRef={editInput} variant="filled" id="rep" className="w-100" label="Reply" multiline />
              <div className="px-lg-3">
              <IconButton type="submit" color="primary">
                <SendIcon />
              </IconButton>
              </div>
            </form> : comment}
          </div>
        </Paper>
      </div>
      {
        replies.length > 0 && !reply && <ul className="comments-list reply-list list-unstyled">
          {showReplies()}
        </ul>
      }
      {isAuth && !reply && <form className="reply-list py-3 d-flex" onSubmit={onSubmit}>
        <TextField inputRef={replyInput} variant="filled" required className="w-100" label="Reply" multiline />
        <div className="px-lg-3">
        <IconButton type="submit" color="primary">
          <SendIcon />
        </IconButton>
        </div>
      </form>}
    </li>
  );
};

export default Comment;
