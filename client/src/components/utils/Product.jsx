import React, { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Product = ({ website, id, name, icon,description, minMembership,versions, category,votes }) => {
  const [voted,setVoted] = useState(false);
  const { updateData } = useData();
  const [error,setError] = useState(false)
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
      updateData("products",id,{votes},()=>{},err=>setError(err))
    } else{
      setError({message: <div>Please <Link to="/login" >Login</Link> Before Trying to vote</div>})
    }
  }
  return (
    <div className="container rounded shadow my-5">
      <div className="d-lg-flex d-block">
        <div className="icon mx-auto" style={{ backgroundImage: `url(${icon})` }}></div>
        <div className="container-fluid">
        <div>
          <div className="">
          <div className="row">
            <div className="col-lg-5 font-weight-bold py-3">
              <h4> <a className="text-decoration-none font-weight-bold text-dark" href={website}>{name}</a> </h4>
              <p className="mb-0 font-weight-light font_smaller">{description}</p>
            </div>
            <div className="col-lg-5 p-3">
              <p className="font-weight-bold mb-1">{minMembership}</p>
              <p className="mb-1">
                <span className="span_tag">{category}</span>
                {versions.map(el=> <span key={el} className="span_tag"> {el} </span>)}
              </p>
            </div>
            <div className="col-lg-2 py-2 text-center">
              <button onClick={toggleVote} className={voted ? "btn btn-primary" : "btn btn-outline-primary"}>
                <span className="voting_arrow"></span>
              </button> <br/>
              <span>{votes.length}</span>
            </div>
            <div className="w-100"></div>
            {error ? <div className="alert alert-danger">
                {error.message}
              </div> : "" }
          </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
