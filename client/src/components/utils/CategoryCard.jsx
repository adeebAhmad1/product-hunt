import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

const CategoryCard = ({category,categories}) => {
  const [show, setShow] = useState(false);
  const { getFiltered } = useData();
  return (
    <div style={{verticalAlign: `top`}} className="d-inline-block">
      <button onClick={()=> setShow(i=> !i)} className="btn btn-category my-2 btn-outline-primary text-capitalize font-weight-bold">
        {category}
      </button>
      {show ? <ul className="list-unstyled ml-3">
        {categories.map((el,i)=> <li> <button key={i} onClick={()=> getFiltered(null,el)} className="btn btn-category my-2 btn-outline-primary text-capitalize font-weight-bold"> {el} </button> </li> )}
      </ul> : "" }
    </div>
  );
};

export default CategoryCard;