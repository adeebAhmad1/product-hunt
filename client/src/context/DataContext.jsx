import React, { Component, createContext, useContext } from "react";
import { db,storage } from "../config/Firebase";
const DataContext = createContext();

export const useData = ()=> useContext(DataContext);

class DataContextProvider extends Component {
  state = {
    businesses: [],
    businessesLoaded: false,
    filteredBusinesses: [],
    filteredBusinessesLoaded: false,
    categories : [],
    categoriesLoaded: false,
    location: [],
    locationLoaded: false,
    pageLoaded: false,
    allLoaded: false
  };
  getData = (type,typeLoaded,location=null,category=null)=>{
    this.setState({[typeLoaded]: false});
    const onSnapshot = snapShot=>{
      const array = [];
      snapShot.forEach(doc=>{
        const data = doc.data();
        data.id = doc.id;
        array.push(data);
      });
      this.setState({[type]: array,[typeLoaded]: true});
    }
    db.collection(type).onSnapshot(onSnapshot);
  }
  getFiltered = (type,typeLoaded,location=null,category=null)=>{
    this.setState({[typeLoaded]: false});
    const onSnapshot = snapShot=>{
      const array = [];
      snapShot.forEach(doc=>{
        const data = doc.data();
        data.id = doc.id;
        array.push(data);
      });
      this.setState({[type]: array,[typeLoaded]: true});
    }
    if(location && category) db.collection("businesses").where("location", "==", location).where("category", "==", category).onSnapshot(onSnapshot);
    else if(location && !category) db.collection("businesses").where("location", "==", location).onSnapshot(onSnapshot);
    else if(!location && category) db.collection("businesses").where("category", "==", category).onSnapshot(onSnapshot);
    else db.collection("businesses").onSnapshot(onSnapshot);
  }
  updateData = (type,id,update,resolve,reject)=>{
    db.collection(type).doc(id).update(update).then(resolve).catch(reject);
  }
  addData = (type,add,resolve,reject)=>{
    db.collection(type).add(add).then(resolve).catch(reject);
  }
  componentDidMount(){
    this.getData("categories","categoriesLoaded");
    this.getData("location","locationLoaded");
    this.getData("businesses","businessesLoaded");
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
    const { categoriesLoaded, locationLoaded, pageLoaded, allLoaded} = prevState;
    if(categoriesLoaded && locationLoaded && pageLoaded && !allLoaded){
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
