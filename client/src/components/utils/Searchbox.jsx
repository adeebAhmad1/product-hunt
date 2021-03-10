import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import Dropdown from "./Dropdown";
import {Paper} from '@material-ui/core';

const Searchbar = () => {
  const [by, setby] = useState({});
  const [open, setopen] = useState(0);
  const { setFiltered,filteredproducts } = useData();
  const products = JSON.parse(JSON.stringify(filteredproducts));
  const onClick = e=> {
    if(by.type === "name"){
      switch(open){
        case(1): setFiltered(products.sort((a,b)=> a.name.localeCompare(b.name)),true);
        break;
        case(0): setFiltered(products.sort((a,b)=> b.name.localeCompare(a.name)),true);
        break;
        default: setFiltered([],true)
      }
    } else if(by.type === "votes"){
      switch(open){
        case(1): setFiltered(products.sort((a,b)=> (a.votes?.length|| 0)-(b.votes?.length|| 0)),true);
        break;
        case(0): setFiltered(products.sort((a,b)=> (b.votes?.length|| 0)-(a.votes?.length|| 0)),true);
        break;
        default: setFiltered([],true);
      }
    }
  };
  const orders = [{type: "asc",name: "&upharpoonleft;"},{type: "desc",name: "&downharpoonright;"}]
  return (
    <div className="py-3">
      <div className="container">
      <Paper elevation={2} className="row">
        <div className="col-lg-10">
          <div className="input-group">
            <Dropdown
              subheading="Ex: Name, Most Featured"
              set={setby}
              class2="mt-0"
              order={false}
              heading={by.name || "Filter By"}
              options={[{type: "name",name:"name"},{type: "votes",name:"Most Featured"}]}
            />
            <div className="col-3 py-2 text-right">
              <div className="d-inline-block" style={{cursor: `pointer`,userSelect: `none`}} onClick={()=> setopen(o=> o ? 0 : 1)}>
                {orders.map((el,i)=>(
                  <span key={i} dangerouslySetInnerHTML={{__html: el.name}} className={`display-4 ${open === i ? "text-primary" : ""}`}/>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button
            onClick={onClick}
            className="col-lg-2 rounded-0 btn header_link align-items-center d-flex justify-content-center btn-primary"
          >
            Filter
          </button>
      </Paper>
    </div>
    </div>
  );
};

export default Searchbar;
