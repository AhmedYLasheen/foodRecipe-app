import React, { useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import toggler from '../../../assets/images/3.png';
import Modal from 'react-bootstrap/Modal';
import ChangePass from '../../../AuthModule/Components/ChangePass/ChangePass';





export default function SideBar() {

  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // const {isCollapsed,setisCollapsed}=useState(false);
  // const changeCollapse = ()=> {
  //   setisCollapsed(!isCollapsed);
  // };

  let navigate = useNavigate();

  let logOut = () => {
    localStorage.removeItem("adminToken");
    navigate("/login")
  }
  return (
    <>
    <div className="sidebar-container ">
      
  
      <Modal show={show} onHide={handleClose}>
       
        <Modal.Body>
            <ChangePass handleClose={handleClose}/>
        </Modal.Body>    
      </Modal>


    <Sidebar collapsed={isCollapsed}>
        <Menu>
          <MenuItem className='togglerImg'
            onClick={toggleCollapse}
            icon={<img className='w-100' src={toggler} />}
          ></MenuItem>

          <MenuItem icon={<i className="fa fa-home" ></i>} component={<Link to="/dashboard" />}> Home</MenuItem>
          <MenuItem icon={<i className="fa fa-user" ></i>} component={<Link to="/dashboard/users" />}> Users</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-clipboard"></i>} component={<Link to="/dashboard/recipes" />}> Recipes</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-rectangle-list"></i>} component={<Link to="/dashboard/categories" />}> Categories</MenuItem>
          <MenuItem onClick={handleShow} icon={<i className="fa-solid fa-unlock-keyhole"></i>} > Change Password</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-right-from-bracket"></i>} onClick={logOut}> LogOut</MenuItem>
        </Menu>
        {/* <button onClick={logOut} className='btn  btn-info'>LogOut</button> */}
      </Sidebar>
    </div>
    


    </>
  )
}
