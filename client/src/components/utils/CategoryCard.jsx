import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Button } from "@material-ui/core"

const CategoryCard = ({category,categories}) => {
  const [show, setShow] = useState(false);
  const { getFiltered } = useData();
  return (
    <div style={{verticalAlign: `top`}} className="d-inline-block">
      <Button variant={show ? "contained" : "outlined"} color="primary" onClick={()=> setShow(i=> !i)} className="m-2">
        {category}
      </Button>
      {show ? <ul className="list-unstyled ml-3">
        {categories.map((el,i)=> <li> <Button key={i} color="primary" variant="outlined" onClick={()=> getFiltered(null,el.id)} className="my-2"> {el.subcategory} </Button> </li> )}
      </ul> : "" }
    </div>
  );
};

export default CategoryCard;