import React, { useEffect, useState } from 'react';
import { useData } from '../../context/DataContext';
import Featured from '../utils/Featured';
import { makeStyles } from "@material-ui/core"
import { db } from "../../config/Firebase"

const useStyles = makeStyles(theme=>({
  h1: {
    color: theme.palette.text.primary
  }
}))

const Features = () => {
  const { featuredProducts,setFeatured } = useData(); 
  const classes = useStyles()
  useEffect(()=>{
    db.collection("products").orderBy("votesLength","desc").limit(3).onSnapshot(docs=>{
      if(docs.empty) return;
      const featuredProducts = []
      docs.forEach(doc=>{
        const featuredProduct = doc.data();
        featuredProduct.id = doc.id;
        featuredProducts.push(featuredProduct);
      })
      setFeatured(featuredProducts)
    })
  },[])
  return (
    <div className="py-5">
      <div className="container">
        <h1 className={"font-weight-bold my-3 "+ classes.h1}>Featured Products</h1>
        <div className="row">
        {featuredProducts.map(el=> <div key={el.id} className="col-lg-4 my-3"><Featured tag="Featured" {...el}/></div> )}
        </div>
      </div>
    </div>
  );
};

export default Features;