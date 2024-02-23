import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function RecipesHeader() {
    
  let navigate =useNavigate();
  const navigateToRecipes =()=>{
    navigate('/dashboard/recipes')}
  return (
    <>
     <div className=' px-5 py-5 my-3 home-container '>
          <div className="row align-items-center">
            <div className="col-md-8">
              <h3>Fill the <span className='text-success'>Recipes</span> !</h3>
              <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
            </div>
            <div className="col-md-4 d-flex justify-content-end ">
              <div className=''>
                  <button onClick={navigateToRecipes} className='btn btn-success '>Fill Recipes  <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
              </div>
            </div>
          </div>
       </div>
    </>
  )
}
