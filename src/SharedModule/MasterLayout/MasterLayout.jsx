import React from 'react'
import SideBar from '../Components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import Header from '../Components/Header/Header'


export default function MasterLayout({adminData}) {
  return (
    <> 
    
      <div className='d-flex'>
        <div className='sidebar' >
          <SideBar adminData={adminData}/>
        </div>
        <div className="w-100 p-4">
          <Navbar adminData={adminData}/>
          <Outlet/>
        </div>
      </div>
   
    </>
  )
}
