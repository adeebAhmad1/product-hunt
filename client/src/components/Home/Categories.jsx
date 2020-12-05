import React from 'react';
import { useData } from '../../context/DataContext';
import CategoryCard from '../utils/CategoryCard';

const Categories = () => {
  const { categories,getFiltered } = useData();
  const showCategories = ()=>{
    const main = categories.map(el=> el.category).filter((item, pos,a) => a.indexOf(item) === pos);
    const myCategories = main.map(category=>{
      const obj = {category};
      obj.categories = [];
      categories.forEach(el=>{
        if(category === el.category) return obj.categories.push(el.subcategory)
      });
      return obj
    })
    return myCategories.map((el,i)=> <CategoryCard key={i} {...el} />)
  };
  return (
    <div>
      <div className="container">
      <button onClick={()=>getFiltered()} style={{verticalAlign: `top`}} className="btn btn-category my-2 btn-outline-primary text-capitalize font-weight-bold">
        All
      </button>
        {showCategories()}
      </div>
    </div>
  );
};

export default Categories;