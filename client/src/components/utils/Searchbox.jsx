import React, { useState } from "react";
import { db } from "../../config/Firebase";
import { useData } from "../../context/DataContext";
import Dropdown from "./Dropdown";

const Searchbar = () => {
  const [by, setby] = useState({});
  const [open, setopen] = useState(0);
  const { setFiltered } = useData();
  const onClick = e=> {
    setFiltered([],false);
    if(by.type){
      db.collection("products").orderBy(by.type, by.type === "votes" && orders[open].type === "asc" ? "desc" : orders[open].type).get().then(snapShot=>{
        const filteredProducts = [];
        snapShot.forEach(doc=>{
          const item = doc.data();
          filteredProducts.push(item);
        });
        setFiltered(filteredProducts,true);
        setby({});
      })
    }
  };
  const orders = [{type: "asc",name: "&upharpoonleft;"},{type: "desc",name: "&downharpoonright;"}]
  return (
    <div className="py-3">
      <div className="container shadow bg-white ">
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
    </div>
    </div>
  );
};

export default Searchbar;
