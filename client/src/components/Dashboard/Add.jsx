import React, { useRef, useState } from 'react';
import Input from '../utils/Input';
import { useHistory, useParams } from "react-router-dom";
import { useData } from "../../context/DataContext";
const Add = () => {
  const { goBack } = useHistory();
  const [loading,setloading] = useState(false);
  const [error,seterror] = useState(false);
  const data = useData();
  const name = useRef(null);
  const website = useRef(null);
  const category = useRef(null);
  const icon = useRef(null);
  const description = useRef(null);
  const version = useRef(null);
  const minMembership = useRef(null);
  const get = (name) => name.current.value;
  const pattern = new RegExp('^(https?:\\/\\/)?'+ '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ '((\\d{1,3}\\.){3}\\d{1,3}))'+ '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ '(\\?[;&a-z\\d%_.~+=-]*)?'+ '(\\#[-a-z\\d_]*)?$','i');
  const onSubmit = (e)=>{
    if(pattern.test(get(website))){
      if(pattern.test(get(icon))){
        setloading(true)
        const item = { icon: get(icon),versions: get(version).split(","),description: get(description) ,minMembership: get(minMembership), name: get(name), website: get(website), category: category.current.selectedOptions[0].value, votes: 0 }
        e.preventDefault();
        data.addData("products",item,()=>{
          goBack();
          setloading(false);
        },err=>seterror(err))
      } else{
        seterror({message: "Please Enter a valid image URL"})
      }
    } else{
      seterror({message: "Please Enter a valid website URL"})
    }
  };
  const map = (array)=> array.map((el,i)=> <option key={i} value={el.name}>{el.name}</option>)
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <form onSubmit={onSubmit} className="form">
        <Input ref={name} required={true} id="name" name="Name" type="text"/>
        <Input ref={minMembership} required={true} id="minMembership" name="Minimum Paid Membership" type="text"/>
        <Input ref={description} required={true} id="description" name="Description" type="text"/>
        <Input ref={website} id="website" name="website" type="text"/>
        <Input ref={version} id="version" name="version" type="text"/>
        <Input ref={icon} id="icon" name="icon" type="text"/>
        <div className="input-container ic">
          <select name="category" defaultValue="disabled" required={true} ref={category} className="input" id="select">
            <option value="disabled" disabled>Select Category</option>
            {map(data.categories)}
          </select>
          <div className="cut"></div>
          <label htmlFor="select" className="placeholder text-capitalize">
            categories
          </label>
        </div>
        <button disabled={loading} type="text" className="submit">submit</button>
        {
          error ? <div className="alert alert-danger">
            {error.message}
          </div> : ""
        }
      </form>
    </div>
  );
};

export default Add;