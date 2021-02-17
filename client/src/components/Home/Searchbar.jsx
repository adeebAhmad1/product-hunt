import { Paper,TextField,Button,withStyles } from "@material-ui/core";
import React, { useRef } from "react";
import { useData } from "../../context/DataContext";

const SearchField = withStyles(theme=>({
  root: {
    '& label.Mui-focused': {
      color: theme.palette.success.main,
    },
    
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.success.main,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.success.main,
      },
    },
  },
}))(TextField);

const SearchButton = withStyles(theme=>({
  root:{
    borderColor: theme.palette.success.main,
    color: theme.palette.success.main,
  }
}))(Button)

const Searchbar = () => {
  const { setFiltered, products } = useData();
  const search = useRef()
  const onSubmit =  e=>{
    e.preventDefault();
    setFiltered(products.filter(el => el.name.toLowerCase().includes(search.current.value.toLowerCase())),true)
  }
  return (
    <Paper className="p-4 rounded container my-4">
      <h4 className="text-center pb-3 font-weight-bold">
        Search Your Products
      </h4>
      <form className="d-flex mx-auto" onSubmit={onSubmit} style={{maxWidth: `400px`}}>
        <SearchField variant="outlined" inputRef={search} className="mr-sm-2" type="search" label="Search" />
        <SearchButton variant="outlined" className="my-2 my-sm-0" type="submit">
          Search
        </SearchButton>
      </form>
    </Paper>
  );
};

export default Searchbar;
