import React, { useRef, useState, useEffect } from 'react';
import Input from '../utils/Input';
import { useHistory,useParams } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { Paper,makeStyles,Select,MenuItem,InputBase  } from '@material-ui/core';
import { Alert } from "@material-ui/lab"
import { db } from "../../config/Firebase"

const useStyles = makeStyles(()=>({
  select: {
    borderBottom: `none`
  }
}))

const Add = () => {
  const { goBack } = useHistory();
  const { id } = useParams();
  const classes = useStyles();
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
      db.collection("products").doc(id).onSnapshot(doc=>{
        if(doc.exists){
          const product = doc.data();
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
      })
    }
  },[data.products,id])
  const pattern = new RegExp(`^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$`,'i');
  const onSubmit = (e)=>{
    e.preventDefault();
    if(pattern.test(get(website))){
      if(pattern.test(get(icon))){
        setloading(true)
        const item = { icon: get(icon),versions: get(version).split(","),description: get(description) ,minMembership: +get(minMembership), name: get(name), website: get(website), category, votes: [],votesLength: 0 }
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
  const map = (array)=> array.map((el,i)=> <MenuItem key={i} value={el.id}>{el.subcategory}</MenuItem>)
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <Paper component="form" onSubmit={onSubmit} className="form p-5">
        <Input ref={name} required id="name" placeholder="Name" type="text"/>
        <Input ref={minMembership} required step=".01" id="minMembership" placeholder="Minimum Paid Membership" type="number"/>
        <Input ref={description} required id="description" placeholder="Description" type="text"/>
        <Input ref={website} id="website" placeholder="Website" type="text"/>
        <Input ref={version} id="version" placeholder="Version" type="text"/>
        <Input ref={icon} id="icon" placeholder="Icon" type="text"/>
        <div className="field">
          <Select component={InputBase} name="category" displayEmpty value={category} required onChange={e=>setCategory(e.target.value)} className={"field_input "+ classes.select} id="select">
            <MenuItem value="" disabled>Select Category</MenuItem>
            {map(data.categories)}
          </Select>
          <button disabled={loading} type="text" className="button_login">submit</button>
        </div>
        {
          error ? <Alert severity="error">
            {error.message}
          </Alert> : ""
        }
      </Paper>
    </div>
  );
};

export default Add;