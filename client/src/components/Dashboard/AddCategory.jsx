import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import Input from '../utils/Input';

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
      <h1 className="my-4">Add Category</h1>
      <form action="" onSubmit={onSubmit} className="form">
        <Input ref={name} id="name" name="Category" type="text"/>
        <Input ref={main} id="main" name="Main Category" type="text"/>
        <button disabled={loading} type="text" className="submit text-uppercase">submit</button>
        {error ? <div className="alert alert-danger"> {error.message} </div> : "" }
      </form>
    </div>
  );
};

export default AddCategory;