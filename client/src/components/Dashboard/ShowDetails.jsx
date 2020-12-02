import React, { useEffect } from "react";
import Dashboard from ".";

const ShowDetails = ({ location: { state }, history }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);
  return (
    <div className="back">
      <Dashboard />
      <div className="outer">
        <div className="outer_back" onClick={() => history.goBack()}></div>
        <div className="inner" style={{minWidth: `50%`}}>
          <div>
            <h2 className="text-capitalize"> {state.name} {state.icon ? <img src={state.icon} width="100" className="float-right " alt={state.name}/> : undefined} </h2>
            <table className="table table-responsive">
              <tbody>
                {state.address ? <tr>
                  <th>Address:</th>
                  <td>{state.address}</td>
                </tr>: undefined}
                {state.category ?
                <tr>
                  <th>Category:</th>
                  <td>{state.category}</td>
                </tr> : undefined}
                {state.location ?
                <tr>
                  <th>Location:</th>
                  <td>{state.location}</td>
                </tr> : undefined}
                {state.phone ? 
                <tr>
                  <th>Phone:</th>
                  <td>{state.phone}</td>
                </tr> : undefined}
                {state.fax ? 
                <tr>
                  <th>Fax:</th>
                  <td>{state.fax}</td>
                </tr> : undefined}
                {state.subcategory ? 
                <tr>
                  <th>Subcategory:</th>
                  <td>{state.subcategory}</td>
                </tr> : undefined}
                {state.website ? 
                <tr>
                  <th>Website:</th>
                  <td>{state.website}</td>
                </tr> : undefined}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
