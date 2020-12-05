import React from "react";
import { Link } from "react-router-dom";

const Featured = ({icon,name,category,versions,description,minMembership}) => {
  return (
    <div className="featured-free bg-light">
      <div className="trello-box">
        <div className="meta">
          <Link to="/">
            <div className="tool-img v-yes">
              <img
                src={icon}
                className=" ls-is-cached lazyloaded"
              />
            </div>
          </Link>
          <div className="tool-meta">
            <span className="span_tag">Featured</span>
            <h6>
              <Link to="/" className="text-decoration-none font-weight-bold">{name}</Link>
            </h6>
            <div className="cate font_small">for <span className="text-primary">Finance</span></div>
            <div className="cate">
              <span className="span_tag">{category}</span>
            </div>
          </div>
        </div>
        <div className="slide-text">
          <p className="font_small">
            <>
              {minMembership} <br/>
              {description}
            </>
          </p>
        </div>
        <div className="tags-list">
          <ul>
            {versions.map(el=> <li className="span_tag" key={el}> {el} </li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Featured;
