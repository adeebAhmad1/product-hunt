import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container px-3">
        <div className="mb-4 text-center">
          <ul className="list-inline">
            <li className="px-3 list-inline-item">
              <a className="font-weight-bold text-white text-decoration-none text-uppercase footer_link" href="#home">Home</a>
            </li>
            <li className="px-3 list-inline-item">
              <a className="font-weight-bold text-white text-decoration-none text-uppercase footer_link" href="#home">Twitter</a>
            </li>
            <li className="px-3 list-inline-item">
              <a className="font-weight-bold text-white text-decoration-none text-uppercase footer_link" href="#home">Get Added</a>
            </li>
            <li className="px-3 list-inline-item">
              <a className="font-weight-bold text-white text-decoration-none text-uppercase footer_link" href="#home">SPONSORSHIP</a>
            </li>
          </ul>
        </div>
        <div className="py-4 text-center">
          &copy; 2020 All Rights Reverved By Productify
        </div>
      </div>
    </footer>
  );
};

export default Footer;
