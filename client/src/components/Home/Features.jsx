import React, { useEffect, useState } from 'react';
import { useData } from '../../context/DataContext';
import Featured from '../utils/Featured';
import { Typography,makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme=>({
  h1: {
    color: theme.palette.text.primary
  }
}))

const Features = () => {
  const {products} = useData(); 
  const classes = useStyles()
  const [top,settop] = useState(products);
  useEffect(()=>{
    settop(JSON.parse(JSON.stringify(products)).sort((a,b)=> b?.votes?.length - a?.votes?.length).slice(0,3));
  },[products])
  return (
    <div className="py-5">
      <div className="container">
        <h1 className={"font-weight-bold my-3 "+ classes.h1}>Featured Products</h1>
        <div className="row">
        {top.map(el=> <div key={el.id} className="col-lg-4 my-3"><Featured tag="Featured" {...el}/></div> )}
        </div>
      </div>
    </div>
  );
};

export default Features;