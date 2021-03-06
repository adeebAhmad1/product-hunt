import React from 'react';
import { useData } from '../../context/DataContext';
import CategoryCard from '../utils/CategoryCard';
import { Button,Divider,Paper } from "@material-ui/core"

const Categories = () => {
  const { categories,getFiltered,products } = useData();
  const showCategories = ()=>{
    const main = categories.map(el=> el.category).filter((item, pos,a) => a.indexOf(item) === pos);
    const myCategories = main.map(category=>{
      const obj = {category};
      obj.categories = [];
      categories.forEach(el=>{
        if(category === el.category) return obj.categories.push({...el})
      });
      return obj
    })
    return myCategories.map((el,i)=> <CategoryCard key={i} {...el} />)
  };
  const showVersions = ()=> ["Free","Paid","Freemium"].map(el=> <Button variant="contained" color="primary" onClick={()=> getFiltered(el)} key={el} style={{verticalAlign: `top`}} className="m-2">{el}</Button>);
  return (
    <div>
      <Paper className="container py-3">
        {showCategories()}
        <Divider />
        {showVersions()}
      </Paper>
    </div>
  );
};

export default Categories;