import React, { forwardRef } from "react";

const Input = ({ type, id, name,...rest }, ref) => {
  return (
    <div className="input-container ic">
      <input ref={ref} id={id} {...rest} className="input" type={type} placeholder=" " />
      <div className="cut"></div>
      <label htmlFor={id} className="placeholder text-capitalize">
        {name}
      </label>
    </div>
  );
};

export default forwardRef(Input);