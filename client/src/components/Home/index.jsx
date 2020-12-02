import React from 'react';
import Categories from './Categories';
import Form from './Form';
import Products from './Products';
import Searchbar from './Searchbar';

const Home = () => {
  return (
    <div>
      <Form />
      <Categories />
      <Searchbar />
      <Products />
    </div>
  );
};

export default Home;