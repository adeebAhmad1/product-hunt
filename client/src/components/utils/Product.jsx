import React, { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Paper,Button,makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {ChevronRight} from '@material-ui/icons';

const useStyles = makeStyles(theme=>({
  color: {
    color: theme.palette.text.primary
  }
}))

const Product = ({ website, id, name, icon,versions, category,votes=[] }) => {
  const [voted,setVoted] = useState(false);
  const { updateData,categories } = useData();
  const classes = useStyles();
  const [error,setError] = useState(false);
  const {user: {uid}} = useAuth()
  useEffect(()=>{
    setVoted(votes.includes(uid))
  },[uid,votes]);
  const toggleVote = ()=>{
    if(uid){
      const i = votes.indexOf(uid);
      if(i >= 0){
        votes.splice(i, 1);
      } else{
        votes.push(uid)
      }
      updateData("products",id,{votes,votedLength: votes.length+1},()=>{},err=>setError(err))
    } else{
      setError({message: <div>Please <Link to="/login" >Login</Link> Before Trying to vote</div>})
    }
  }
  return (
    <Paper elevation={3} className="container rounded my-5">
      <div className="d-lg-flex d-block">
        <Paper elevation={2} className="icon rounded-circle mx-auto" style={{ backgroundImage: `url(${icon})` }}></Paper>
        <div className="container-fluid">
        <div>
          <div className="">
          <div className="row">
            <div className="col-lg-7 col-12 font-weight-bold py-2">
              <h4> <a className={"text-decoration-none font-weight-bold my_link "+ classes.color} href={website}>{name}</a> </h4>
              <p className="mb-1">
                <span className="span_tag">{categories.find(el=> el.id === category).subcategory}</span>
                {versions.map(el=> <span key={el} className="span_tag"> {el} </span>)}
              </p>
            </div>
            <div className="col-lg-3 col-6 p-3">
              <Button component={Link} to={`/product/${id}`} className="text-white" color="primary" variant="contained">
                Learn More <ChevronRight />
              </Button>
            </div>
            <div className="col-lg-2 col-6 py-2 d-flex text-center">
              <div>
                <Button onClick={toggleVote} className="p-2" color="primary" variant={voted ? "contained" : "outlined"}>
                  <span className="voting_arrow"></span>
                </Button> <br/>
                <span>{votes.length}</span>
              </div>
            </div>
            <div className="w-100"></div>
            {error ? <Alert severity="error" className="alert alert-danger">
                {error.message}
              </Alert> : "" }
          </div>
          </div>
        </div>
        </div>
      </div>
    </Paper>
  );
};

export default Product;
