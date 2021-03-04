import React,{useEffect,useState} from "react";
import firebase, { db } from "../../config/Firebase";
import { useData } from "../../context/DataContext";
import { Link } from "react-router-dom";
import { Button, ButtonGroup,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper } from "@material-ui/core";
import "./dashboard.css"
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import moment from 'moment';
import { StarOutlineOutlined } from "@material-ui/icons";

const useRowStyles = makeStyles(theme=>({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  h1: {
    color: theme.palette.text.primary
  }
}));

const Dashboard = () => {
  const data = useData();
  const classes = useRowStyles();
  const [products,setProducts] = useState([]);
  const [start,setstart] = useState(0);
  const [first,setfirst] = useState(true);
  useEffect(()=>{
    setfirst(false)
    db.collection("products").orderBy("name").startAt(start).endAt(start+10).onSnapshot(snapShot=>{
      console.log(snapShot)
      const array = [];
      snapShot.forEach(doc=>{
        console.log(doc.data())
        const data = doc.data();
        data.id = doc.id;
        array.push(data);
      });
      setProducts(array)
    })
  },[start])
  return (
    <div style={{fontSize: `0.8rem`}}>
      <section className="pt-5">
        <div className="container">
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell> Sr # </TableCell>
              <TableCell align="right">Main Category</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.categories.map((row,i) => (
              <TableRow key={i} className={classes.root}>
                <TableCell component="th" scope="row">
                  {i+1}
                </TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">{row.subcategory}</TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">
                    {
                      !products.find(el=> el.category === row.id) && <Button
                      variant="contained"
                      color="secondary"
                      style={{fontSize: `0.6rem`}}
                      onClick={()=> data.delete("categories",row.id)}
                    ><DeleteIcon />
                  </Button>
                    }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        <Button to="/panel/add/category" variant="contained" color="primary" className="text-white mont font-weight-light my-3" component={Link}>Add Category</Button>
        </div>
      </section>
      <section className="pt-5">
      <div className="container pb-5">
        <h1 className={"font-weight-bold my-3 py-3 "+ classes.h1}>Products</h1>
        <TableContainer className="my-4" component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Sr#</TableCell>
              <TableCell>Icon</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Versions</TableCell>
              <TableCell>Min Membership</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>website</TableCell>
              <TableCell>Votes</TableCell>
              <TableCell>Time Created</TableCell>
              <TableCell>Handlers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{fontSize: `0.6rem`}}>
            {products.map((el,i) => (
              <TableRow key={i} className={classes.root}>
                <TableCell style={{fontSize: `0.8rem` ,minWidth: 70}} component="th" scope="row">
                  {i+1}
                </TableCell>
                <TableCell style={{fontSize: `0.8rem` ,minWidth: 100}}><img src={el.icon} style={{width: `50px`}} alt=""/></TableCell>
                <TableCell style={{fontSize: `0.8rem` ,minWidth: 100}}>{el.name}</TableCell>
                <TableCell style={{fontSize: `0.8rem` ,minWidth: 100}}>{ data.categories?.find(row=> row.id === el.category)?.subcategory }</TableCell>
                <TableCell style={{fontSize: `0.8rem` ,minWidth: 200}}>
                  <ul className="list-unstyled">
                  {el.versions.map((el,i)=> <li key={i}> {el} </li>)}
                  </ul>
                </TableCell>
                <TableCell style={{fontSize: `0.8rem`}}>{el.minMembership}</TableCell>
                <TableCell style={{fontSize: `0.8rem` ,minWidth: 300}}>{el.description}</TableCell>
                <TableCell style={{fontSize: `0.8rem` ,minWidth: 100}}>{el.website}</TableCell>
                <TableCell style={{fontSize: `0.8rem` ,minWidth: 100}}>{el.votes?.length || 0}</TableCell>
                <TableCell style={{fontSize: `0.8rem` ,minWidth: 100}}>{moment(el.time).fromNow()}</TableCell>
                <TableCell>
                  <ButtonGroup className="btn-group">
                    <Button variant="contained" color="secondary" onClick={()=> data.delete("products",el.id)}><DeleteIcon /></Button>
                    <Button component={Link} variant="contained"  to={`/panel/edit/products/${el.id}`}><CreateIcon /></Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!first && <Button onClick={()=>setstart(s=> s<0 ? s-10 : s)}>Previous 10 Products</Button>}
        {!first && products.length < 10 && <Button onClick={()=>setstart(s=> products.length < 10 ? s+10 : s)}>Next 10 Products</Button>}
      </TableContainer>
        <Button component={Link} to={"/panel/add/products"} className="text-white mont font-weight-light" variant="contained" color="primary">Add Businesses</Button>
        <Button className="mx-5 d-inline-block mont font-weight-light" variant="contained" color="secondary" onClick={()=> firebase.auth().signOut()}> Logout </Button>
      </div>
      </section>
    </div>
  );
};

export default Dashboard;
