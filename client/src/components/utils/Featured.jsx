import { Paper, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.paper,
    ["--color"]:  theme.palette.background.paper
  },
  color: {
    color: theme.palette.primary.main
  },
  before: {
    ["--color"]:  theme.palette.background.paper
  }
}));

const Featured = ({icon,tag,name,id,category,versions,description,minMembership}) => {
  const classes = useStyles();
  const [text,setText] = useState(null)
  const { categories } = useData();
  return (
    <Paper elevation={1} className="featured-free">
      <div className="trello-box">
        <div className="meta">
          <Link to="/">
            <div className="tool-img v-yes">
              {
                text ? <span className={"text " + classes.root}> {text} </span> : <img
                  src={icon}
                  className=" ls-is-cached lazyloaded"
                  alt="lazy"
                  onError={()=> setText(name?.[0])}
                />
              }
            </div>
          </Link>
          <div className="tool-meta">
            <span className={"span_tag " + classes.root}>{tag}</span>
            <h6>
              <Link to={`/product/${id}`} className="text-decoration-none font-weight-bold">{name}</Link>
            </h6>
            <div className="font_small">for <span className={classes.color}>{categories.find(el=> el.id === category).subcategory}</span></div>
          </div>
        </div>
        <div className="slide-text">
          <p className="font_small">
            <>
            <b>Min. Paid Membership: {minMembership}$</b> <br/>
              {description}
            </>
          </p>
        </div>
        <div className="tags-list">
          <ul className="pl-0">
            {versions.map(el=> <li className={"span_tag "+ classes.before} key={el}> {el} </li>)}
          </ul>
        </div>
      </div>
    </Paper>
  );
};

export default Featured;
