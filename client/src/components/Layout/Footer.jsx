import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container px-3">
        <div className="mb-4 text-center">
          <ul className="list-inline d-inline-block text-left">
            <li className="px-3 py-2 list-inline-item">
              <Link className="font-weight-bold text-white text-decoration-none text-uppercase footer_link" to="/">Home</Link>
            </li>
            <li className="px-3 py-2 list-inline-item">
              <a href="https://roioverload.com" className="font-weight-bold text-white text-decoration-none text-uppercase footer_link">
                ROIOverload.com
              </a>
            </li>
            <li className="px-3 py-2 list-inline-item">
              <a className="font-weight-bold text-white text-decoration-none text-uppercase footer_link" href="https://forms.gle/7arehbmitp5ZVgGG7">Add A Product</a>
            </li>
            <li className="px-3 py-2 list-inline-item">
              <a href="mailto:admin@roioverload.com" className="font-weight-bold text-white text-decoration-none text-uppercase footer_link">Advertise With Us</a>
            </li>
          </ul>
        </div>
        <div className="py-4 row">
          <div className="col-lg-6 py-2">
            © {new Date().getFullYear()} ROI Overload | <a href="https://scottdclary.com/terms" className="font-weight-bold text-white text-decoration-none text-uppercase footer_link">Terms of Service</a> | <a href="https://scottdclary.com/privacy" className="font-weight-bold text-white text-decoration-none text-uppercase footer_link">Privacy Policy</a>
          </div>
          <div className="col-lg-6 text-right py-2">
          <ul className="list-inline">
            <li className="list-inline-item px-3">
            <a href="https://facebook.com/roioverload" className="footer_link pb-2">
              <svg height="18" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.324 3.18306C5.209 3.34006 5.147 3.52606 5.147 3.74506L5.144 5.15106H8.23L7.201 8.10306H5.144V14.9931H2.057V8.10306L0.011 8.14206L0 5.15106L2.147 5.13806V3.77306C2.147 3.27106 2.23 2.79906 2.397 2.36006C2.563 1.92006 3.082 1.64006 3.4 1.31006C3.718 0.98006 4.09 0.719061 4.518 0.527061C4.945 0.334061 5.4 0.237061 5.886 0.237061H8.246L8.229 3.18306H5.324Z" fill="#fff"></path></svg>
            </a>
            </li>
            <li className="list-inline-item px-3">
            <a href="https://instagram.com/roioverload" className="footer_link pb-2">
              <svg height="18" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path fillule="evenodd" clipRule="evenodd" d="M11.461 14.992H4.65C2.274 14.992 0.339996 13.142 0.339996 10.869V4.35298C0.339996 2.07998 2.273 0.22998 4.65 0.22998H11.461C13.837 0.22998 15.771 2.07998 15.771 4.35298V10.869C15.771 13.142 13.838 14.992 11.461 14.992ZM14.32 4.35298C14.32 2.84498 13.037 1.61798 11.461 1.61798H4.65C3.073 1.61798 1.791 2.84598 1.791 4.35298V10.869C1.791 12.377 3.073 13.603 4.65 13.603H11.461C13.037 13.603 14.32 12.376 14.32 10.869V4.35298ZM8.056 11.773C5.657 11.773 3.705 9.90598 3.705 7.61098C3.705 5.31598 5.657 3.44898 8.056 3.44898C10.455 3.44898 12.406 5.31598 12.406 7.61098C12.406 9.90598 10.455 11.773 8.056 11.773ZM8.056 4.83698C6.457 4.83698 5.15599 6.08098 5.15599 7.61098C5.15599 9.13998 6.457 10.384 8.056 10.384C9.655 10.384 10.955 9.13998 10.955 7.61098C10.956 6.08098 9.655 4.83698 8.056 4.83698ZM10.724 3.49498C10.724 2.70898 11.392 2.06998 12.214 2.06998C13.035 2.06998 13.704 2.70898 13.704 3.49498C13.704 4.28098 13.036 4.92098 12.214 4.92098C11.392 4.91998 10.724 4.27998 10.724 3.49498ZM12.214 3.45798C12.193 3.45798 12.174 3.47498 12.174 3.49498C12.174 3.51498 12.192 3.53298 12.214 3.53298C12.235 3.53298 12.253 3.51598 12.253 3.49498C12.253 3.47398 12.235 3.45798 12.214 3.45798Z" fill="#fff"></path></svg>
            </a>
            </li>
            <li className="list-inline-item px-3">
            <a href="https://www.linkedin.com/company/72264234/" className="footer_link pb-2">
              <svg fill="#fff" height="18" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m23.994 24v-.001h.006v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07v-2.185h-4.773v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243v7.801z"/><path d="m.396 7.977h4.976v16.023h-4.976z"/><path d="m2.882 0c-1.591 0-2.882 1.291-2.882 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909c-.001-1.591-1.292-2.882-2.882-2.882z"/></svg>
            </a>
            </li>
            <li className="list-inline-item px-3">
            <a href="https://instagram.com/roioverload" className="footer_link pb-2">
              <svg height="18" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg"><path d="M15.986 1.879C15.698 2.013 15.401 2.126 15.094 2.221C14.788 2.316 14.464 2.382 14.122 2.422C14.788 1.966 15.265 1.339 15.553 0.541005C15.247 0.712005 14.914 0.873005 14.554 1.025C14.194 1.177 13.834 1.281 13.474 1.338C13.168 1.015 12.817 0.754005 12.421 0.554005C12.026 0.355005 11.584 0.255005 11.099 0.255005C10.649 0.255005 10.23 0.346005 9.843 0.526005C9.456 0.707005 9.115 0.954005 8.817 1.267C8.52 1.58 8.287 1.951 8.116 2.378C7.944 2.806 7.85899 3.257 7.85899 3.732C7.85899 3.998 7.886 4.245 7.94 4.473C6.59 4.416 5.338 4.07 4.187 3.433C3.035 2.797 2.055 1.946 1.245 0.882005C0.956995 1.433 0.811996 2.013 0.811996 2.62C0.811996 3.229 0.938002 3.779 1.19 4.273C1.442 4.767 1.802 5.166 2.27 5.47C1.964 5.47 1.69001 5.432 1.44701 5.356C1.20401 5.28 0.975003 5.185 0.759003 5.071V5.1C0.759003 5.936 1.00601 6.663 1.50101 7.28C1.99601 7.898 2.62201 8.29101 3.37801 8.46301C3.23301 8.5 3.093 8.53001 2.959 8.54801C2.825 8.56601 2.67601 8.57601 2.51401 8.57601C2.33401 8.57601 2.136 8.54801 1.92 8.49001C2.117 9.17401 2.49099 9.74 3.03999 10.186C3.58899 10.632 4.22299 10.864 4.94299 10.884C3.80999 11.853 2.46901 12.337 0.921005 12.337H0.516006C0.390006 12.337 0.264 12.328 0.138 12.309C0.876 12.803 1.663 13.188 2.5 13.462C3.337 13.738 4.215 13.876 5.133 13.876C6.626 13.876 7.944 13.581 9.088 12.992C10.231 12.403 11.194 11.638 11.977 10.698C12.76 9.75801 13.354 8.704 13.759 7.535C14.163 6.367 14.366 5.213 14.366 4.073V3.674C15.013 3.143 15.553 2.544 15.986 1.879Z" fill="#fff"></path></svg>
            </a>
            </li>
            <li className="list-inline-item px-3">
            <a href="https://medium.com/roi-overload" className="footer_link pb-2">
              <svg height="18" viewBox="0 0 256 203" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M256 29.867h-10.125c-3.759 0-9.075 5.423-9.075 8.894v125.826c0 3.475 5.316 8.213 9.075 8.213H256v29.867h-91.733V172.8h19.2V40.533h-.941L137.69 202.667h-34.712L58.72 40.533H57.6V172.8h19.2v29.867H0V172.8h9.835c4.049 0 9.365-4.738 9.365-8.213V38.76c0-3.471-5.316-8.894-9.365-8.894H0V0h96.034l31.53 117.333h.87L160.253 0H256v29.867" fill="#fff"/></svg>
            </a>
            </li>
          </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
