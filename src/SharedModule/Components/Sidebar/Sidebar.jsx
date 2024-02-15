import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import toggler from '../../../assets/images/3.png'




export default function SideBar() {
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
    <div className="sidebar-container">
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
          <MenuItem icon={<i className="fa-solid fa-unlock-keyhole"></i>} component={<Link to="/calendar" />}> Change Password</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-right-from-bracket"></i>} onClick={logOut}> LogOut</MenuItem>
        </Menu>
        {/* <button onClick={logOut} className='btn  btn-info'>LogOut</button> */}
      </Sidebar>
    </div>
    


    </>
  )
}
