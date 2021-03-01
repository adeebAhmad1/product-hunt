import React, { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { Alert } from '@material-ui/lab';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Typography,Container,Paper,Button,Avatar,Chip,Breadcrumbs } from '@material-ui/core';
import { Link } from "react-router-dom";
const Product = ({icon,votes=[],id,name,minMembership,website,description,versions,category}) => {
  const [error,setError] = useState(false);
  const [imageReplacement,setErr] = useState(false);
  const [voted,setVoted] = useState(false);
  const { updateData,categories } = useData();
  const {user: {uid}} = useAuth()
  useEffect(()=>{
    setVoted(votes.includes(uid))
  },[uid,votes]);
  const toggleVote = ()=>{
    if(uid){
      const i = votes.indexOf(uid)
      if(i >= 0)votes.splice(i, 1)
      else votes.push(uid);
      updateData("products",id,{votes},()=>{},err=>setError(err));
    } else setError({message: <div>Please <Link to="/login" >Login</Link> Before Trying to vote</div>})
  }
  return (
    <section className="section_product py-5"> 
      <Container maxWidth="md" className="px-3">
        <div  className="row align-items-center rounded">
          <div className="col-lg-3 ">
            <Paper className="rounded py-2">
              {imageReplacement ? <div className="height h3"> {imageReplacement} </div> : <img src={icon} onError={()=> setErr(name[0])} alt={name} className="w-100"/>}
            </Paper>
          </div>
          <div className="col-lg-9">
            <Paper className="row mx-0 align-items-center">
              <div className="col-lg-9 pl-lg-4 pr-lg-5 py-3">
                <Typography className="mont font-weight-normal" variant="h2">{name}</Typography>
                <Typography variant="h6" className="font-weight-light mont">{description}</Typography>
              </div>
              <div className="col-lg-3">
                <Button onClick={toggleVote} className="px-4 py-2 d-block" color="primary" variant={voted ? "contained" : "outlined"}>
                  <span className="voting_arrow"></span> <br/>
                  <span className="d-inline-block w-100">{votes.length}</span> 
                </Button>
              </div>
            </Paper>
            <div className="row my-3">
              {versions?.map(el=> <div className="col-lg-4"><Paper className="py-3 text-center rounded"><Chip variant="outlined" color="primary" label={el} avatar={<Avatar>{el[0]}</Avatar>} /></Paper></div>)}
              <div className="col-lg-4"><Paper className="py-3 text-center rounded"><Chip variant="outlined" color="primary" label={categories.find(el=> el.id === category)?.subcategory} avatar={<Avatar>{categories.find(el=> el.id === category)?.subcategory?.[0]}</Avatar>} /></Paper></div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            {error ? <Alert severity="error" className="alert alert-danger">{error.message}</Alert> : "" }
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
          <Paper className="p-3">
            Minimum Paid Membership is ${minMembership} per month
          </Paper>
          </div>
          <div className="col-lg-4">
          <Paper className="p-3">
            <Button variant="contained" component="a" href={website} color="primary" >Visit Website</Button> 
          </Paper>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Product;