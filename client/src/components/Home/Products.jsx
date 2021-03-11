import React from "react";
import { useData } from "../../context/DataContext";
import Product from "../utils/Product";
import { Paper } from "@material-ui/core";

const Products = () => {
  const { filteredproducts, filteredproductsLoaded, firstTime } = useData();
  return (
    <div>
      {filteredproductsLoaded ? (
        filteredproducts.map((el, i) => <Product key={i} {...el} />)
      ) : (
        <Paper className="container p-4">
          {firstTime && !filteredproductsLoaded
            ? "Please select a category or search for a product's name."
            : "No products of The Related Category."}
        </Paper>
      )}
    </div>
  );
};

export default Products;
