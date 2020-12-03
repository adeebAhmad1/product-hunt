import React, { useEffect, useState } from "react";

const Product = ({ name, icon, minMembership,versions, category,votes:votesPrev }) => {
  const [voted,setVoted] = useState(0);
  const [votes,setVotes] = useState(votesPrev);
  
  useEffect(()=>{
    const voted = JSON.parse(localStorage.getItem(name)) || 0;
    setVoted(+voted.voted);
    setVotes(votesPrev)
  },[name,votesPrev]);
  const toggleVote = ()=>{
    localStorage.setItem(name,JSON.stringify({voted: voted ? 0 : 1}));
    setVoted(v=> v ? 0 : 1);
    setVotes(voted ? votes - 1 : votes + 1)
  }
  return (
    <div className="container rounded shadow my-5">
      <div className="d-lg-flex d-block">
        <div className="icon mx-auto" style={{ backgroundImage: `url(${icon})` }}></div>
        <div className="container-fluid">
        <div>
          <div className="">
          <div className="row">
            <div className="col-lg-4 font-weight-bold py-4 h3">{name}</div>
            <div className="col-lg-6 p-3">
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
              <span>{votes}</span>
            </div>
          </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
