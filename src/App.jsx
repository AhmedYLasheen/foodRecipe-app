import { useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter, json } from 'react-router-dom'
import './App.css'

import { jwtDecode } from 'jwt-decode'
import Home from '../src/HomeModule/Components/Home/Home'
import ForgotPass from './AuthModule/Components/ForgotPass/ForgotPass'
import Login from './AuthModule/Components/Login/Login'
import Register from './AuthModule/Components/Register/Register'
import ResetPass from './AuthModule/Components/ResetPass/ResetPass'
import VerifyRegister from './AuthModule/Components/VerifyRegister/VerifyRegister'
import CategoriesLists from './CategoriesModule/Component/CategoriesLists/CategoriesLists'
import FavouritesList from './FavouritesModule/FavouritesList'
import RecipesData from './RecipesModule/Components/RecipesData/RecipesData'
import RecipesList from './RecipesModule/Components/RecipesList/RecipesList'
import AuthLayout from './SharedModule/AuthLayout/AuthLayout'
import Notfound from './SharedModule/Components/Notfound/Notfound'
import ProtectedRoute from './SharedModule/Components/ProtectedRoute/ProtectedRoute'
import MasterLayout from './SharedModule/MasterLayout/MasterLayout'
import UsersList from './UserModule/Components/UsersList/UsersList'



function App() {

  const [adminData, setAdminData] = useState(null);
  let saveAdminData = () => {
    let encodedToken = localStorage.getItem("adminToken");
    let decodedToken = jwtDecode(encodedToken);
    localStorage.setItem("loginData",JSON.stringify(decodedToken))
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
        { path: 'verifyRegiste', element: <VerifyRegister /> },
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
        { path: 'categorie', element: <CategoriesLists /> },
        { path: 'favourites', element: <FavouritesList/> },
        
      ],
    },
  ]);

  
  return  < RouterProvider router={routes} /> 
  
  

  
  
}

export default App
