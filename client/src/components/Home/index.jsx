import React from 'react';
import Categories from './Categories';
import Features from './Features';
import Form from './Form';
import Products from './Products';
import Searchbar from './Searchbar';
import Searchbox from '../utils/Searchbox';

const Home = () => {
  return (
    <div>
      <Form />
      <Features />
      <Categories />
      <Searchbar />
      <Searchbox />
      <Products />
    </div>
  );
};

export default Home;