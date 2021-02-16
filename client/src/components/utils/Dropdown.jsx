import React, { useState } from "react";
import { Typography,makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme=> ({
  root: {
    ["--color"]: theme.palette.background.default
  },
  svg: {
    fill: theme.palette.text.primary
  },
  text: {
    color: theme.palette.text.primary
  }
}))

const Dropdown = ({class2,heading,options,subheading,set}) => {
  const [open,setOpen] = useState(false);
  const classes = useStyles();
  const showOptions = ()=> options.map((el,i)=>{
    return <li key={i} className={"drop-down__item text-capitalize "+ classes.text } onClick={()=> {
      set(el);
      setOpen(false)
    }}>
    {el.name}
  </li>
  })
  return (
        <div className={ (open ? "drop-down--active" : "")+ " drop-down px-0 col-9 "+ class2}>
          <div id="dropDown" onClick={()=> setOpen(o=> !o)} className={"drop-down__button w-100 d-flex py-3 px-4 "}>
            <div className="drop-down__name">
              <Typography variant="h5" className="font-weight-bold mont">{heading}</Typography>
              <Typography variant="caption" className="mont">{subheading}</Typography>
            </div>
            <div className="text-right col">
            <svg version="1.1" className={"drop-down__icon "+ classes.svg} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 451.847 451.847" xmlSpace="preserve"><g><path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
		c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
		c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"/></g></svg>
            </div>
          </div>
          <div className={"drop-down__menu-box " + classes.root}>
            <ul className="drop-down__menu">
              {showOptions()}
            </ul>
          </div>
      </div>
  );
};

export default Dropdown;
