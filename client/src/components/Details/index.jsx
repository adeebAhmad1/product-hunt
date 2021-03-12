import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import Comments from './Comments';
import Product from './Product';

const Details = () => {
  const { id } = useParams();
  const [product,setProduct] = useState(null)
  const { filteredproducts,userProducts,featuredProducts } = useData();
  const [products] = useState([...filteredproducts,...userProducts,...featuredProducts])
  useEffect(()=>{
    if(id) {
      const product = products.find(el=> el.id === id);
      if(product) setProduct(product);
    }
  },[id,products])
  return (
    <div>
      <Product {...product} />
      {product && <Comments id={id} />}
    </div>
  );
};

export default Details;