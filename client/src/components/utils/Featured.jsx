import React from "react";
import { Link } from "react-router-dom";

const Featured = ({icon,name,category,versions,description,minMembership}) => {
  return (
    <div className="featured-free bg-light my-3">
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
            <span className="span_tag featured">Featured</span>
            <h6>
              <Link to="/" className="text-decoration-none font-weight-bold">{name}</Link>
            </h6>
            <div className="cate font_small">for <span className="text-primary">{category}</span></div>
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
            {versions.map(el=> <li className="span_tag" key={el}> {el} </li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Featured;
