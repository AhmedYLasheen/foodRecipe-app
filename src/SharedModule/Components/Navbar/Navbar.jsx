import React from 'react'
import myImg from '../../../assets/images/myimg.png'

export default function Navbar({ adminData }) {
  // console.log(adminData);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light rounded-4 ">
        <div className="container-fluid  ">
          {/* <a className="navbar-brand" href="#">Navbar</a> */}

        
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              <div className='imgCon'>
                <img className=' myImg' src={myImg} alt="" />
              </div>

              <li className="nav-item  ">
                <h6 className="nav-link ">{adminData?.userName}</h6>
              </li>

            </ul>

          </div>
        </div>
      </nav>
    </>
  )
}


