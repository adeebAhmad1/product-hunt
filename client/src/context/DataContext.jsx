import React, { Component, createContext, useContext } from "react";
import { db,storage } from "../config/Firebase";
const DataContext = createContext();

export const useData = ()=> useContext(DataContext);

class DataContextProvider extends Component {
  state = {
    products: [],
    productsLoaded: false,
    categories: [],
    categoriesLoaded: false,
    filteredproducts: [],
    filteredproductsLoaded: false,
    pageLoaded: false,
    allLoaded: false
  };
  getData = (type,typeLoaded)=>{
    this.setState({[typeLoaded]: false});
    const onSnapshot = snapShot=>{
      const array = [];
      snapShot.forEach(doc=>{
        const data = doc.data();
        data.id = doc.id;
        array.push(data);
      });
      this.setState({[type]: array,[typeLoaded]: true});
      console.log(array)
    }
    db.collection(type).onSnapshot(onSnapshot);
  }
  getFiltered = (versions=null,category=null,name=null)=>{
    this.setState({filteredproductsLoaded: false});
    const onSnapshot = snapShot=>{
      const filteredproducts = [];
      snapShot.forEach(doc=>{
        const data = doc.data();
        data.id = doc.id;
        filteredproducts.push(data);
      });
      this.setState({filteredproducts,filteredproductsLoaded: true});
    }
    if(name) return db.collection("products").where("name", "==", name.toLowerCase()).onSnapshot(onSnapshot);
    if(versions) return db.collection("products").where("versions", "array-contains", versions.toLowerCase()).onSnapshot(onSnapshot);
    if(category) return db.collection("products").where("category", "array-contains", category.toLowerCase()).onSnapshot(onSnapshot);
    else return db.collection("products").onSnapshot(onSnapshot);
  }
  updateData = (type,id,update,resolve,reject)=>{
    db.collection(type).doc(id).update(update).then(resolve).catch(reject);
  }
  addData = (type,add,resolve,reject)=>{
    db.collection(type).add(add).then(resolve).catch(reject);
  }
  componentDidMount(){
    this.getData("products","productsLoaded");
    this.getData("categories","categoriesLoaded");
    window.addEventListener("load", () => this.setState({pageLoaded: true}));
  }
  delete = (collection,id,reject)=>{
    db.collection(collection).doc(id).delete().catch(reject)
  }
  addIcon = (icon,name,resolve,reject)=>{
    storage.ref(`/icons/${name}`).put(icon).then(resolve).catch(reject)
  }
  getIcon = (name,resolve,reject)=>{
    storage.ref(`/icons/${name}`).getDownloadURL().then(resolve).catch(reject)
  }
  deleteIcon = (url,resolve,reject)=>{
    storage.refFromURL(url).delete().then(resolve).catch(reject)
  }
  UNSAFE_componentWillUpdate(prevProps, prevState){
    const { categoriesLoaded, productsLoaded, pageLoaded, allLoaded } = prevState;
    if( categoriesLoaded && productsLoaded && pageLoaded && !allLoaded){
      console.log(prevState)
      setTimeout(() => this.setState({allLoaded: true}), 100);
    }
  }
  nameToUrl=(name)=> name.split(' ').join('_').toLowerCase();
  render() {
    return (
      <DataContext.Provider value={{...this.state,nameToUrl: this.nameToUrl,getFiltered:this.getFiltered,getData: this.getData,delete: this.delete,updateData: this.updateData,addIcon:this.addIcon,deleteIcon:this.deleteIcon,getIcon: this.getIcon,addData: this.addData}}>
        {this.state.allLoaded ? this.props.children : ""}
      </DataContext.Provider>
    );
  }
}

export default DataContextProvider;
