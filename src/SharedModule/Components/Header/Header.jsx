import React from 'react'
import GroupImg from '../../../assets/images/Group.png'

export default function Header({title,description}) {
  return (
    <>
      <div className='container-fluid  header-container p-4'>
        <div className="row justify-content-between ">
          <div className="col-md-5 d-flex align-items-center ">
            <div className="header-content">
            
              <h2>{title}</h2>
              <p>{description}</p>
            </div>

          </div>
          <div className="col-md-3 ">
            <div className="header-img text-center">
              <img src={GroupImg} alt="" srcSet="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
