import React from "react";

const Searchbar = () => {
  return (
    <div className="p-4 rounded shadow container my-4">
      <h4 className="text-center pb-3 font-weight-bold">
        Search Your Products
      </h4>
      <form className="d-flex mx-auto" style={{maxWidth: `400px`}}>
        <input className="form-control mr-sm-2" type="search" placeholder="Search" />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
