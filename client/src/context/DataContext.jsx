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
    allLoaded: false,
    firstTime: true
  };
  addDp = async (email,file,id,resolve,reject)=>{
    try {
      await storage.ref().child(`/users/${email}`).put(file)
      const dp = await storage.ref().child(`/users/${email}`).getDownloadURL()
      firebase.auth().currentUser.updateProfile({photoURL: dp});
      await db.collection("users").doc(id).update({dp});
      resolve();
    }
    catch(err){
      reject(err);
    }
  }
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
    }
    db.collection(type).onSnapshot(onSnapshot);
  }
  getFiltered = (versions=null,category=null)=>{
    this.setState({filteredproductsLoaded: false,firstTime: false});
    const onSnapshot = snapShot=>{
      const filteredproducts = [];
      snapShot.forEach(doc=>{
        const data = doc.data();
        data.id = doc.id;
        filteredproducts.push(data);
      });
      this.setState({filteredproducts,filteredproductsLoaded: true});
    }
    if(versions) db.collection("products").where("versions", "array-contains", versions).onSnapshot(onSnapshot);
    else if(category) db.collection("products").where("category", "==", category).onSnapshot(onSnapshot);
    else db.collection("products").onSnapshot(onSnapshot);
  }
  getUserProducts =(id,set)=>{
    db.collection("products").where("votes","array-contains",id).onSnapshot(snapShot=>{
      const filteredproducts = [];
      snapShot.forEach(doc=>{
        const data = doc.data();
        data.id = doc.id;
        filteredproducts.push(data);
      });
      set(filteredproducts)
    })
  }
  setFiltered = (filteredproducts,filteredproductsLoaded)=> this.setState({filteredproducts,filteredproductsLoaded});
  updateData = (type,id,update,resolve,reject)=>db.collection(type).doc(id).update(update).then(resolve).catch(reject);
  addData = (type,add,resolve,reject)=>db.collection(type).add(add).then(resolve).catch(reject);
  componentDidMount(){
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
    db.collection("comments").doc(commentId).collection("replies").orderBy("time","asc").onSnapshot(snapShot=>{
      console.log(snapShot)
      const replies = [];
      snapShot.forEach(doc=>{
        const reply = doc.data();
        reply.id = doc.id
        replies.push(reply)
      })
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
