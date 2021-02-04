import React from 'react';
import { useData } from '../../context/DataContext';
import CategoryCard from '../utils/CategoryCard';

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
  const showVersions = ()=>{
    const versions = [].concat.apply([], products.map(el=> el.versions)).filter((item, pos,a)=>  a.indexOf(item) === pos);
    return versions.map(el=> <button onClick={()=> getFiltered(el)} key={el} style={{verticalAlign: `top`}} className="btn btn-category my-2 btn-outline-primary text-capitalize font-weight-bold">{el}</button>)
  }
  return (
    <div>
      <div className="container">
      <button onClick={()=>getFiltered()} style={{verticalAlign: `top`}} className="btn btn-category my-2 btn-outline-primary text-capitalize font-weight-bold">
        All
      </button>
        {showCategories()}
        {showVersions()}
      </div>
    </div>
  );
};

export default Categories;