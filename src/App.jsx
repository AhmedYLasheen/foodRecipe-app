import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from '../src/HomeModule/Components/Home/Home'
import AuthLayout from './SharedModule/AuthLayout/AuthLayout'
import MasterLayout from './SharedModule/MasterLayout/MasterLayout'
import Login from './AuthModule/Components/Login/Login'
import ForgotPass from './AuthModule/Components/ForgotPass/ForgotPass'
import RecipesList from './RecipesModule/Components/RecipesList/RecipesList'
import UsersList from './UserModule/Components/UsersList/UsersList'
import Notfound from './SharedModule/Components/Notfound/Notfound'
import CategoriesLists from './CategoriesModule/Component/CategoriesLists/CategoriesLists'
import { jwtDecode } from 'jwt-decode'
import ProtectedRoute from './SharedModule/Components/ProtectedRoute/ProtectedRoute'
import ResetPass from './AuthModule/Components/ResetPass/ResetPass'
import RecipesData from './RecipesModule/Components/RecipesData/RecipesData'
import Register from './AuthModule/Components/Register/Register'



function App() {

  const [adminData, setAdminData] = useState(null);
  let saveAdminData = () => {
    let encodedToken = localStorage.getItem("adminToken");
    let decodedToken = jwtDecode(encodedToken);
    setAdminData(decodedToken);
    // console.log(adminData);
  }

  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      saveAdminData();
    }
  }, [])
  const routes = createBrowserRouter([
    {
      path: '/',
      element:  <AuthLayout /> ,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Login saveAdminData={saveAdminData} /> },
        { path: 'login', element: <Login saveAdminData={saveAdminData} /> },
        { path: 'forgot-Pass', element: <ForgotPass /> },
        { path: 'reset-Pass', element: <ResetPass/> },
        { path: 'register', element: <Register/> },
      ],
    },
    {
      path: 'dashboard',
      element: (
        <ProtectedRoute adminData={adminData}>
          <MasterLayout adminData={adminData} />
        </ProtectedRoute>
      ),
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Home  adminData={adminData}  /> },
        { path: 'recipes', element: <RecipesList /> },
        { path: 'recipe-data/:id?', element: <RecipesData /> },
        { path: 'users', element: <UsersList /> },
        { path: 'categories', element: <CategoriesLists /> },
      ],
    },
  ]);

  
  return  < RouterProvider router={routes} /> 
  
  

  
  
}

export default App
