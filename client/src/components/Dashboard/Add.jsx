import React, { useRef, useState, useEffect } from 'react';
import Input from '../utils/Input';
import { useHistory,useParams } from "react-router-dom";
import { useData } from "../../context/DataContext";
const Add = () => {
  const { goBack } = useHistory();
  const { id } = useParams();
  const [loading,setloading] = useState(false);
  const [error,seterror] = useState(false);
  const data = useData();
  const name = useRef(null);
  const website = useRef(null);
  const [category,setCategory] = useState("");
  const icon = useRef(null);
  const description = useRef(null);
  const version = useRef(null);
  const minMembership = useRef(null);
  const get = (name) => name.current.value;
  useEffect(()=>{
    if(id){
      const product = data.products.find(el=> el.id === id);
      if(product){
        name.current.value = product.name;
        website.current.value = product.website;
        icon.current.value = product.icon;
        description.current.value = product.description;
        version.current.value = product.versions.join(",");
        minMembership.current.value = product.minMembership;
        setCategory(product.category)
      } else{
        seterror({message: `Product Must be deleted or not available in the database`});
      }
    }
  },[data.products,id])
  const pattern = new RegExp(`^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$`,'i');
  const onSubmit = (e)=>{
    e.preventDefault();
    if(pattern.test(get(website))){
      if(pattern.test(get(icon))){
        setloading(true)
        const item = { icon: get(icon),versions: get(version).split(","),description: get(description) ,minMembership: +get(minMembership), name: get(name), website: get(website), category, votes: [] }
        if(id){
          data.updateData("products",id,item,()=>{
            goBack();
            setloading(false);
          },err=>seterror(err))
        } else{
          data.addData("products",item,()=>{
            goBack();
            setloading(false);
          },err=>seterror(err))
        }
      } else{
        seterror({message: "Please Enter a valid image URL"})
      }
    } else{
      seterror({message: "Please Enter a valid website URL"})
    }
  };
  const map = (array)=> array.map((el,i)=> <option key={i} value={el.subcategory}>{el.subcategory}</option>)
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <form onSubmit={onSubmit} className="form">
        <Input ref={name} required={true} id="name" name="Name" type="text"/>
        <Input ref={minMembership} required={true} id="minMembership" name="Minimum Paid Membership" type="number"/>
        <Input ref={description} required={true} id="description" name="Description" type="text"/>
        <Input ref={website} id="website" name="website" type="text"/>
        <Input ref={version} id="version" name="version" type="text"/>
        <Input ref={icon} id="icon" name="icon" type="text"/>
        <div className="input-container ic">
          <select name="category" value={category} required={true} onChange={e=>setCategory(e.target.selectedOptions[0].value)} className="input" id="select">
            <option value="" disabled>Select Category</option>
            {map(data.categories)}
          </select>
          <div className="cut"></div>
          <label htmlFor="select" className="placeholder text-capitalize">
            categories
          </label>
        </div>
        <button disabled={loading} type="text" className="submit">submit</button>
        {
          error ? <div className="alert font_small alert-danger">
            {error.message}
          </div> : ""
        }
      </form>
    </div>
  );
};

export default Add;