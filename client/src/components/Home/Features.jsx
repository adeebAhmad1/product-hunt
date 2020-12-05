import React, { useEffect, useState } from 'react';
import { useData } from '../../context/DataContext';
import Featured from '../utils/Featured';

const Features = () => {
  const {products} = useData(); 
  const [top,settop] = useState(products); 
  useEffect(()=>{
    top.sort((a,b)=> b.votes - a.votes)
    settop(t=> t.slice(0,3));
  },[])
  return (
    <div className="py-5">
      <div className="container">
        <h1 className="font-weight-bold my-3">Featured Products</h1>
        <div className="row">
        {top.map(el=> <div key={el.id} className="col-lg-4"><Featured {...el}/></div> )}
        </div>
      </div>
    </div>
  );
};

export default Features;