import { Paper,TextField,Button,withStyles } from "@material-ui/core";
import React, { useRef } from "react";
import { db } from "../../config/Firebase";
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
    setFiltered([],false)
    db.collection("products").orderBy("name").startAt(search.current.value)
    .endAt(search.current.value+"\uf8ff").onSnapshot(snapShot=>{
      const array = [];
      snapShot.forEach(doc=>{
        const data = doc.data();
        data.id = doc.id;
        array.push(data);
      });
      setFiltered(array,true)
    })
  }
  return (
    <Paper className="p-4 rounded container my-4">
      <h4 className="text-center pb-3 font-weight-bold">
        Search Your Products
      </h4>
      <form className="d-flex mx-auto" onSubmit={onSubmit} style={{maxWidth: `400px`}}>
        <SearchField required variant="outlined" inputRef={search} className="mr-2 mr-md-0" type="search" label="Search" />
        <SearchButton variant="outlined" className="my-lg-2" type="submit">
          Search
        </SearchButton>
      </form>
    </Paper>
  );
};

export default Searchbar;
