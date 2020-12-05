import React from "react";
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
          <td>{el.subcategory}</td>
          <td>{el.id}</td>
          <td>
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
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
  const showProducts = () => {
    const name = "products";
    if(data[name].length > 0){
      return data[name].map((el,i) => {
        return<tr key={i}>
          <th scope="row"> {i+1} </th>
          <td><img src={el.icon} style={{width: `50px`}} alt=""/></td>
          <td>{truncate(el.name)}</td>
          <td>{truncate(el.category)}</td>
          <td>
            <ul className="list-unstyled">
            {el.versions.map((el,i)=> <li key={i}> {el} </li>)}
            </ul>
          </td>
          <td>{truncate(el.minMembership)}</td>
          <td>{truncate(el.description)}</td>
          <td>{truncate(el.website)}</td>
          <td>{truncate(el.votes)}</td>
          <td> 
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
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
      <section className="pt-5">
      <div className="container">
        <div className="row">
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
        <Link to="/panel/add/category" style={{fontSize: `0.8rem`}} className="btn btn-primary text-capitalize">Add Category </Link>
          </div>
        </div>
      </div>
      </section>
      <section className="pt-5">
      <div className="container pb-5">
        <h1 className="font-weight-bold my-3 py-3">Products</h1>
        <table className="table table-responsive w-100">
          <thead>
            <tr>
              <th>#</th>
              <th>Icon</th>
              <th>Name</th>
              <th>Category</th>
              <th>Versions</th>
              <th>Min Membership</th>
              <th>Description</th>
              <th>website</th>
              <th>Votes</th>
              <th>Handlers</th>
            </tr>
          </thead>
          <tbody>
            {showProducts()}
          </tbody>
        </table>
        <Link to={"/panel/add/products"} style={{fontSize: `0.8rem`}} className="btn btn-primary text-capitalize">Add Products </Link>
        <button style={{fontSize: `0.8rem`}} className="btn btn-primary text-capitalize mx-5 d-inline-block" onClick={()=> firebase.auth().signOut()}> Logout </button>
      </div>
      </section>
    </div>
  );
};

export default Dashboard;
