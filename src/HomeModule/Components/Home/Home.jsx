import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Header from '../../../SharedModule/Components/Header/Header';
import { useNavigate } from 'react-router-dom';
import RecipesHeader from '../../../UserModule/Components/RecipesHeader/RecipesHeader';



export default function Home( {adminData}) {

  let navigate =useNavigate();
const navigateToRecipes =()=>{
  navigate('recipes')
}
  return (
    <div>
       <ToastContainer />
       <Header
        title={`Welcome ${adminData?.userName}`}  
        description="This is a welcoming screen for the entry of the application , you can now see the options"
       />
      <RecipesHeader/>
    </div>
  )
}
