import React from 'react';
import Product from '../utils/Product';

const Products = () => {
  const dummy = [
    {
      name: "iContact",
      icon: "https://i.pinimg.com/280x280_RS/84/3f/26/843f262e2a80c3e51ac001c1689a7c7f.jpg",
      minMembership: "Min. Paid Membership: $31 per month",
      freeVersion: ["😊 free trail","❌️ no free version"],
      category: "✉️ email marketing",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      votes: 10
    },
    {
      name: "Dummy",
      icon: "https://jotformapps.s3.amazonaws.com/1562180873869275687273_AWeber.png",
      minMembership: "Min. Paid Membership: $5000 per month",
      freeVersion: ["😊 free trail","❌️ no free version"],
      category: "✉️ email marketing",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      votes: 10
    }
  ];
  const show = ()=> dummy.map((el,i)=> <Product key={i} {...el} />)
  return (
    <div>
      {show()}
    </div>
  );
};

export default Products;