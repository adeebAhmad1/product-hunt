import React, { Component, createContext, useContext } from "react";
import { db } from "../config/Firebase";
const DataContext = createContext();

export const useData = ()=> useContext(DataContext);

class DataContextProvider extends Component {
  state = {
    products: [],
    productsLoaded: false,
    comments: [],
    commentsLoaded: false,
    categories: [],
    categoriesLoaded: false,
    filteredproducts: [],
    filteredproductsLoaded: false,
    pageLoaded: false,
    allLoaded: false
  };
  getData = (type,typeLoaded,isProducts)=>{
    this.setState({[typeLoaded]: false});
    const onSnapshot = snapShot=>{
      const array = [];
      snapShot.forEach(doc=>{
        const data = doc.data();
        data.id = doc.id;
        array.push(data);
      });
      this.setState({[type]: array,[typeLoaded]: true});
      if(isProducts) this.setFiltered(array,true)
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
    if(name) return db.collection("products").where("name", "==", name).onSnapshot(onSnapshot);
    if(versions) return db.collection("products").where("versions", "array-contains", versions).onSnapshot(onSnapshot);
    if(category) return db.collection("products").where("category", "==", category).onSnapshot(onSnapshot);
    else return db.collection("products").onSnapshot(onSnapshot);
  }
  setFiltered = (filteredproducts,filteredproductsLoaded)=> this.setState({filteredproducts,filteredproductsLoaded});
  updateData = (type,id,update,resolve,reject)=>{
    db.collection(type).doc(id).update(update).then(resolve).catch(reject);
  }
  addData = (type,add,resolve,reject)=>{
    db.collection(type).add(add).then(resolve).catch(reject);
  }
  componentDidMount(){
    this.getData("products","productsLoaded",true);
    this.getData("categories","categoriesLoaded");
    window.addEventListener("load", () => this.setState({pageLoaded: true}));
  }
  delete = (collection,id,reject)=>{
    db.collection(collection).doc(id).delete().catch(reject)
  }
  UNSAFE_componentWillUpdate(prevProps, prevState){
    const { categoriesLoaded, productsLoaded, pageLoaded, allLoaded } = prevState;
    if( categoriesLoaded && productsLoaded && pageLoaded && !allLoaded){
      setTimeout(() => this.setState({allLoaded: true}), 100);
    }
  }
  getComment = (productId)=>{
    this.setState({commentsLoaded:false})
    db.collection("comments").where("productId","==",productId).onSnapshot(snapShot=>{
      const comments = [];
      snapShot.forEach(doc=>{
        const comment = doc.data();
        comments.push(comment)
      })
      this.setState({comments,commentsLoaded:true});
    })
  }
  nameToUrl=(name)=> name.split(' ').join('_').toLowerCase();
  render() {
    return (
      <DataContext.Provider value={{...this.state,nameToUrl: this.nameToUrl,setFiltered: this.setFiltered,getComment: this.getComment,getFiltered:this.getFiltered,getData: this.getData,delete: this.delete,updateData: this.updateData,addIcon:this.addIcon,deleteIcon:this.deleteIcon,getIcon: this.getIcon,addData: this.addData}}>
        {this.state.allLoaded ? this.props.children : <div style={{minHeight: `100vh`}} className="d-flex justify-content-center align-items-center"><div className="lds-ripple"><div></div><div></div></div></div>}
      </DataContext.Provider>
    );
  }
}

export default DataContextProvider;
