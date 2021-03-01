import React, { Component, createContext, useContext } from "react";
import firebase, { db,storage } from "../config/Firebase";
const DataContext = createContext();

export const useData = ()=> useContext(DataContext);

class DataContextProvider extends Component {
  state = {
    products: [],
    productsLoaded: false,
    comments: [],
    commentsLoaded: false,
    replies: [],
    repliesLoaded: false,
    categories: [],
    categoriesLoaded: false,
    filteredproducts: [],
    filteredproductsLoaded: false,
    pageLoaded: false,
    allLoaded: false
  };
  addDp = (email,file,id,resolve,reject)=>{
    storage.ref().child(`/users/${email}`).put(file).then(()=>{
    storage.ref().child(`/users/${email}`).getDownloadURL().then(dp=>{
      firebase.auth().currentUser.updateProfile({photoURL: dp});
      db.collection("users").doc(id).update({dp}).then(resolve);
    })
    }).catch(reject)
  }
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
  getFiltered = (versions=null,category=null)=>{
    if(versions) return this.setFiltered(this.state.products.filter(el=> el.versions.includes(versions)),true)
    if(category) return this.setFiltered(this.state.products.filter(el=> el.category === category),true)
    else return this.setFiltered(this.state.products,true)
  }
  getUserProducts =(id)=>this.setFiltered(this.state.products.filter(el=> el.votes.includes(id)))
  setFiltered = (filteredproducts,filteredproductsLoaded)=> this.setState({filteredproducts,filteredproductsLoaded});
  updateData = (type,id,update,resolve,reject)=>db.collection(type).doc(id).update(update).then(resolve).catch(reject);
  addData = (type,add,resolve,reject)=>db.collection(type).add(add).then(resolve).catch(reject);
  componentDidMount(){
    console.log(db);
    this.getData("products","productsLoaded",true);
    this.getData("categories","categoriesLoaded");
    window.addEventListener("load", () => this.setState({pageLoaded: true}));
  }
  delete = (collection,id,resolve,reject)=>{
    db.collection(collection).doc(id).delete().then(e=> resolve(e)).catch(reject)
  }
  UNSAFE_componentWillUpdate(prevProps, prevState){
    const { categoriesLoaded, pageLoaded, allLoaded } = prevState;
    if( categoriesLoaded && pageLoaded && !allLoaded){
      setTimeout(() => this.setState({allLoaded: true}), 100);
    }
  }
  getComment = (productId)=>{
    this.setState({commentsLoaded:false})
    db.collection("comments").where("productId","==",productId).onSnapshot(snapShot=>{
      const comments = [];
      snapShot.forEach(doc=>{
        const comment = doc.data();
        comment.id = doc.id
        comments.push(comment)
      })
      comments.sort((a,b)=> b.time - a.time);
      this.setState({comments,commentsLoaded:true});
    })
  }
  getReplies = (commentId,setReplies)=>{
    db.collection("comments").doc(commentId).collection("replies").onSnapshot(snapShot=>{
      console.log(snapShot)
      const replies = [];
      snapShot.forEach(doc=>{
        const reply = doc.data();
        reply.id = doc.id
        replies.push(reply)
      })
      replies.sort((a,b)=> a.time - b.time);
      setReplies(replies)
    })
  }
  setReplies = (commentId,value,resolve,reject)=>{
    db.collection("comments").doc(commentId).collection("replies").add(value).then(resolve).catch(reject)
  }
  getUser = (uid,setImg,setName)=>{
    db.collection("users").doc(uid).onSnapshot(doc=>{
      const data = doc.data();
      setName(`${data.firstname} ${data.lastname}`);
      setImg(data.dp);
    })
  }
  updateReply = (commentId,replyId,value,resolve,reject)=>{
    db.collection("comments").doc(commentId).collection("replies").doc(replyId).update(value).then(resolve).catch(reject)
  }
  deleteReply = (commentId,replyId,resolve,reject)=>{
    db.collection("comments").doc(commentId).collection("replies").doc(replyId).delete().then(resolve).catch(reject)
  }
  nameToUrl=(name)=> name.split(' ').join('_').toLowerCase();
  render() {
    return (
      <DataContext.Provider value={{...this.state,getUser: this.getUser,addDp:this.addDp,getUserProducts:this.getUserProducts,deleteReply: this.deleteReply,updateReply: this.updateReply,setReplies: this.setReplies,getReplies: this.getReplies,nameToUrl: this.nameToUrl,setFiltered: this.setFiltered,getComment: this.getComment,getFiltered:this.getFiltered,getData: this.getData,delete: this.delete,updateData: this.updateData,addIcon:this.addIcon,deleteIcon:this.deleteIcon,getIcon: this.getIcon,addData: this.addData}}>
        {this.state.allLoaded ? this.props.children : <div style={{minHeight: `100vh`}} className="d-flex justify-content-center align-items-center"><div className="lds-ripple"><div></div><div></div></div></div>}
      </DataContext.Provider>
    );
  }
}

export default DataContextProvider;
