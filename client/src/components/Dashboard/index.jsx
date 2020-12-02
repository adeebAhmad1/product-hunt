import React from "react";
import Crumb from "../utils/Crumb";
import firebase from "../../config/Firebase";
import { useData } from "../../context/DataContext";
import { Link } from "react-router-dom";
import "./dashboard.css"
const Dashboard = () => {
  const data = useData();
  const truncate = (text)=>{
    const myText = text || "";
    if(myText.length > 15){
      return myText.slice(0,15) + "...";
    }
    return myText;
  }
  const showData = (name) => {
    const array = data[name]
    if(array.length > 0){
      return array.map((el,i) => {
        return<tr key={i}>
          <th scope="row">{i+1}</th>
          <td>{el.name}</td>
          <td>{el.id}</td>
          <td>
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <Link to={`/panel/edit/${name}/${el.id}`}  style={{fontSize: `0.8rem`}} className="btn btn-primary">
              Edit
            </Link>
            <button onClick={()=> data.delete(name,el.id)} style={{fontSize: `0.8rem`}} className="btn btn-danger">
              Delete
            </button>
          </div>
          </td>
        </tr>;
      });
    } else{
      return<tr>
        <th colSpan="6">No Items to Show.... <Link to={"/panel/add/"+name} style={{fontSize: `0.8rem`}} className="btn btn-primary text-capitalize">Add {name} </Link></th>
      </tr>
    }
  };
  const showBusinesses = () => {
    const name = "businesses";
    if(data[name].length > 0){
      return data[name].map((el,i) => {
        return<tr key={i}>
          <th scope="row"> {i+1} </th>
          <td>{truncate(el.name)}</td>
          <td>{truncate(el.address)}</td>
          <td>{truncate(el.category)}</td>
          <td>{truncate(el.location)}</td>
          <td>{truncate(el.phone)}</td>
          <td>{truncate(el.fax)}</td>
          <td>{truncate(el.subcategory)}</td>
          <td>{truncate(el.website)}</td>
          <td> 
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <Link to={{pathname: `/dashboard/business`,state: el}} style={{fontSize: `0.8rem`}} className="btn btn-dark">
              Show Details
            </Link>
            <Link to={`/panel/edit/${name}/${el.id}`} style={{fontSize: `0.8rem`}} className="btn d-flex justify-content-center align-items-center btn-primary">
              Edit
            </Link>
            <button onClick={()=>data.delete(name,el.id)} style={{fontSize: `0.8rem`}} className="btn btn-danger">
              Delete
            </button>
          </div>
          </td>
        </tr>;
      });
    } else{
      return<tr>
        <th colSpan="6">No Items to Show.... <Link to={"/panel/add/"+name}  style={{fontSize: `0.8rem`}} className="btn btn-primary text-capitalize">Add {name} </Link> </th>
      </tr>
    }
  };
  return (
    <div style={{fontSize: `0.8rem`}}>
      <Crumb name="dashboard" />
      <section className="pt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="font-weight-bold my-3 py-3">Locations</h1>
          <table className="table table-responsive w-100">
          <thead>
            <tr>
              <th>#</th>
              <th>Location</th>
              <th>ID</th>
              <th>Handlers</th>
            </tr>
          </thead>
          <tbody>
            {showData("location")}
          </tbody>
        </table>
        <Link to={"/panel/add/location"}  style={{fontSize: `0.8rem`}} className="btn btn-primary text-capitalize">Add Location </Link>
          </div>
          <div className="col-lg-6">
            <h1 className="font-weight-bold my-3 py-3">Categories</h1>
          <table className="table table-responsive w-100">
          <thead>
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>ID</th>
              <th>Handlers</th>
            </tr>
          </thead>
          <tbody>
            {showData("categories")}
          </tbody>
        </table>
        <Link to={"/panel/add/categories"}  style={{fontSize: `0.8rem`}} className="btn btn-primary text-capitalize">Add categories </Link>
          </div>
        </div>
      </div>
      </section>
      <section className="pt-5">
      <div className="container pb-5">
        <h1 className="font-weight-bold my-3 py-3">Business</h1>
        <table className="table table-responsive w-100">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Category</th>
              <th>Location</th>
              <th>Phone</th>
              <th>Fax</th>
              <th>Subcategory</th>
              <th>Website</th>
              <th>Handlers</th>
            </tr>
          </thead>
          <tbody>
            {showBusinesses()}
          </tbody>
        </table>
        <Link to={"/panel/add/businesses"} style={{fontSize: `0.8rem`}} className="btn btn-primary text-capitalize">Add Businesses </Link>
        <button style={{fontSize: `0.8rem`}} className="btn btn-primary text-capitalize mx-5 d-inline-block" onClick={()=> firebase.auth().signOut()}> Logout </button>
      </div>
      </section>
    </div>
  );
};

export default Dashboard;
