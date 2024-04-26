import React from "react";
import myImg from "../../../assets/images/avtar.png";
import logo from "../../../assets/images/logo.png";

export default function Navbar({ adminData }) {
  // console.log(adminData);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light rounded-4 m-1">
        <div className="container-fluid  ">
          {/* <a className="navbar-brand" href="#">Navbar</a> */}
          <div>
            <img src={logo} className="w-50" />
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex justify-content-center align-items-center">
              <div className="imgCon">
                <img className=" myImg rounded-5" src={myImg} alt="" />
              </div>

              <li className="nav-item mx-3 ">
                <h6 className="nav-link "> {adminData?.userName}</h6>
              </li>

              <li className="nav-item  mx-3">
                <i className="fa-solid fa-bell "></i>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
