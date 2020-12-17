import React, { useRef } from "react";
import { useData } from "../../context/DataContext";

const Searchbar = () => {
  const { setFiltered, products } = useData();
  const search = useRef()
  const onSubmit =  e=>{
    e.preventDefault();
    setFiltered(products.filter(el => el.name.toLowerCase().includes(search.current.value.toLowerCase())),true)
  }
  return (
    <div className="p-4 rounded shadow container my-4">
      <h4 className="text-center pb-3 font-weight-bold">
        Search Your Products
      </h4>
      <form className="d-flex mx-auto" onSubmit={onSubmit} style={{maxWidth: `400px`}}>
        <input ref={search} className="form-control mr-sm-2" type="search" placeholder="Search" />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
