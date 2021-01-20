import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Table,TableBody,TableHead,TableCell,TableContainer,TableFooter,TablePagination,TableRow,Paper} from '@material-ui/core';
import { db } from '../../config/Firebase';
import TablePaginationActions from '../utils/TablePagination';
import moment from 'moment';

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

const Users = ()=> {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rows, setUsers] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  useEffect(()=>{
    db.collection("users").onSnapshot(snapShot=>{
      const row = []
      snapShot.forEach(doc=>{
        const user = doc.data();
        user.id = doc.id;
        row.push(user);
      })
      setUsers(row)
    })
  },[])
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="container pt-5 mt-5">
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell className="font-weight-bold">First Name</TableCell>
            <TableCell className="font-weight-bold">Last Name</TableCell>
            <TableCell className="font-weight-bold" align="right">Email</TableCell>
            <TableCell className="font-weight-bold" align="right">Role</TableCell>
            <TableCell className="font-weight-bold" align="right">Time Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row,i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {row.firstname}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.lastname}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.email}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.role}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {moment(row.time).fromNow()}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </div>
  );
}

export default Users;