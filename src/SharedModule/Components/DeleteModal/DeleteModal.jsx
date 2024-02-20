import React from 'react'
import noData from '../../../assets/images/no-data.png';


export default function DeleteModal({title,description}) {
  return (
    <>
    <div className='delete-container  px-5 '>
        <div className='text-center'>
            <img src={noData}  />
            <div className='p-3'>
            <h5>{title}</h5>
            <p>{description}</p>
            </div>
           
        </div>
       
        </div>
    </>
  )
}
