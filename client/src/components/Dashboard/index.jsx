import React from "react";
import firebase from "../../config/Firebase";
import { useData } from "../../context/DataContext";
import { Link } from "react-router-dom";
import { Button, ButtonGroup,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper } from "@material-ui/core";
import "./dashboard.css"
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const Dashboard = () => {
  const data = useData();
  const classes = useRowStyles();

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
                  <ButtonGroup className="btn-group">
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{fontSize: `0.6rem`}}
                      onClick={()=> ()=> data.delete("categories",row.id)}
                    ><DeleteIcon /></Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        <Link to="/panel/add/category" style={{fontSize: `0.8rem`}} className="btn btn-primary text-capitalize">Add Category </Link>
        </div>
      </section>
      <section className="pt-5">
      <div className="container pb-5">
        <h1 className="font-weight-bold my-3 py-3">Products</h1>
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
              <TableCell>Handlers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{fontSize: `0.6rem`}}>
            {data.products.map((el,i) => (
              <TableRow key={i} className={classes.root}>
                <TableCell style={{fontSize: `0.8rem` ,minWidth: 70}} component="th" scope="row">
                  {i+1}
                </TableCell>
                <TableCell style={{fontSize: `0.8rem` ,minWidth: 100}}><img src={el.icon} style={{width: `50px`}} alt=""/></TableCell>
                <TableCell style={{fontSize: `0.8rem` ,minWidth: 100}}>{el.name}</TableCell>
                <TableCell style={{fontSize: `0.8rem` ,minWidth: 100}}>{el.category}</TableCell>
                <TableCell style={{fontSize: `0.8rem` ,minWidth: 200}}>
                  <ul className="list-unstyled">
                  {el.versions.map((el,i)=> <li key={i}> {el} </li>)}
                  </ul>
                </TableCell>
                <TableCell style={{fontSize: `0.8rem`}}>{el.minMembership}</TableCell>
                <TableCell style={{fontSize: `0.8rem` ,minWidth: 300}}>{el.description}</TableCell>
                <TableCell style={{fontSize: `0.8rem` ,minWidth: 100}}>{el.website}</TableCell>
                <TableCell style={{fontSize: `0.8rem` ,minWidth: 100}}>{el.votes.length}</TableCell>
                <TableCell>
                  <ButtonGroup className="btn-group">
                    <Button variant="contained" color="secondary" style={{fontSize: `0.6rem`}} onClick={()=> data.delete("products",el.id)}><DeleteIcon /></Button>
                    <Button component={Link} variant="contained" style={{fontSize: `0.6rem`}}  to={`/panel/edit/products/${el.id}`}><CreateIcon /></Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        <Button component={Link} to={"/panel/add/products"} style={{fontSize: `0.8rem`}} className="text-white" variant="contained" color="primary">Add Businesses</Button>
        <Button style={{fontSize: `0.8rem`}} className="mx-5 d-inline-block" variant="contained" color="secondary" onClick={()=> firebase.auth().signOut()}> Logout </Button>
      </div>
      </section>
    </div>
  );
};

export default Dashboard;
