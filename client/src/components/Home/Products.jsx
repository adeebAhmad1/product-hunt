import React from 'react';
import { useData } from '../../context/DataContext';
import Product from '../utils/Product';

const Products = () => {
  const { filteredproducts,filteredproductsLoaded } = useData();
  const show = ()=> filteredproducts.length > 0 ? filteredproducts.map((el,i)=> <Product key={i} {...el} /> ): <div className="container">No products of The Related Category</div>
  return (
    <div>
      {filteredproductsLoaded ? show() : <div className="py-5">
        <div className="py-5 position-relative">
          <div className="indicator"> 
            <svg width="16px" height="12px">
              <polyline id="back" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
              <polyline id="front" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
            </svg>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default Products;