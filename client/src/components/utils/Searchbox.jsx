import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import Dropdown from "./Dropdown";
import Paper from '@material-ui/core/Paper';

const Searchbar = () => {
  const [by, setby] = useState({});
  const [open, setopen] = useState(0);
  const { setFiltered,products:old } = useData();
  const products = JSON.parse(JSON.stringify(old));
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
        case(1): setFiltered(products.sort((a,b)=> a.votes.length-b.votes.length),true);
        break;
        case(0): setFiltered(products.sort((a,b)=> b.votes.length-a.votes.length),true);
        break;
        default: setFiltered([],true);
      }
    }
  };
  const orders = [{type: "asc",name: "&upharpoonleft;"},{type: "desc",name: "&downharpoonright;"}]
  return (
    <div className="py-3">
      <Paper elevation={2} className="container bg-white ">
      <div className="row">
        <div className="col-lg-9">
          <div className="input-group">
            <Dropdown
              subheading="Ex: Name, Most Featured"
              set={setby}
              class2="mt-0"
              order={false}
              heading={by.name || "Filter By"}
              options={[{type: "name",name:"name"},{type: "votes",name:"Most Featured"}]}
            />
            <div className="col-lg-4 py-2 text-right">
              <div className="d-inline-block" style={{cursor: `pointer`,userSelect: `none`}} onClick={()=> setopen(o=> o ? 0 : 1)}>
                {orders.map((el,i)=>(
                  <span key={i} dangerouslySetInnerHTML={{__html: el.name}} className={`display-4 ${open === i ? "text-primary" : ""}`}></span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2">
          <button
            onClick={onClick}
            className="w-100 border-0 rounded-0 h-100 btn header_link align-items-center d-flex justify-content-center btn-primary"
          >
            Search
          </button>
        </div>
      </div>
    </Paper>
    </div>
  );
};

export default Searchbar;
