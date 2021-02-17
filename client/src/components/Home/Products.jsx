import React from 'react';
import { useData } from '../../context/DataContext';
import Product from '../utils/Product';
import { Paper } from "@material-ui/core"

const Products = () => {
  const { filteredproducts,filteredproductsLoaded } = useData();
  const show = ()=> filteredproducts.length > 0 ? filteredproducts.map((el,i)=> <Product key={i} {...el} /> ): <Paper className="container p-4">No products of The Related Category</Paper>
  return (
    <div>
      {filteredproductsLoaded && show()}
    </div>
  );
};

export default Products;