import React from "react";
import ReplyIcon from '@material-ui/icons/Reply';
import { Paper, TextField,IconButton } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import moment from "moment";

const Comment = ({name,id,comment,dp,replies=[],time = Date.now()}) => {
  const showReplies = ()=>{
    return replies.map(({name,comment,dp,time = Date.now()},i)=>{
      return <li key={i}>
        <div className="comment-main-level">
          <Paper elevation={2} className="comment-avatar">
            <img src={dp} alt={name} />
          </Paper>
          <Paper elevation={2} className="comment-box">
            <div className="comment-head">
              <h6 className="comment-name">
                {name}
              </h6>
              <span>{moment(time).fromNow()}</span>
            </div>
            <div className="comment-content" children={comment} />
          </Paper>
        </div>
      </li>
    })
  }
  return (
    <li>
      <div className="comment-main-level">
        <Paper elevation={2} className="comment-avatar">
          <img src={dp} alt={name} />
        </Paper>
        <Paper elevation={2} className="comment-box">
          <div className="comment-head">
            <h6 className="comment-name">
              {name}
            </h6>
            <span>{moment(time).fromNow()}</span>
            <ReplyIcon />
          </div>
          <div className="comment-content">
            {comment}
          </div>
        </Paper>
      </div>
      {/* {
        replies.length > 0 && <ul className="comments-list reply-list list-unstyled">
          {showReplies()}
        </ul>
      }
      <div className="reply-list py-3 d-flex">
        <TextField variant="filled" id="comment" className="w-100" label="Comment" multiline />
        <div className="px-lg-3">
        <IconButton color="primary">
          <SendIcon />
        </IconButton>
        </div>
      </div> */}
    </li>
  );
};

export default Comment;
