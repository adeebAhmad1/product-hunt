import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import Input from '../utils/Input';
import { Alert } from "@material-ui/lab"
import { Paper } from "@material-ui/core"
const AddCategory = () => {
  const { addData } = useData();
  const { goBack } = useHistory()
  const name = useRef(null);
  const main = useRef(null);
  const [loading,setloading] = useState(false)
  const [error,seterror] = useState(false)
  const onSubmit = (e)=>{
    e.preventDefault();
    setloading(true);
    addData("categories",{category: main.current.value.toLowerCase(),subcategory:name.current.value},()=>{
      goBack();
      setloading(false)
    },err=>seterror(err))
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5">
      <Paper component="form" onSubmit={onSubmit} className="form p-4">
        <h1 className="my-4">Add Category</h1>
        <Input ref={name} id="name" placeholder="Category" type="text"/>
        <Input ref={main} id="main" placeholder="Main Category" type="text"/>
        <button disabled={loading} type="text" className="button_login">submit</button>
        {error && <Alert severity="error"> {error.message} </Alert>}
      </Paper>
    </div>
  );
};

export default AddCategory;