import React, { useEffect } from "react";
import Header from "../SharedModule/Components/Header/Header";
import { useState } from "react";
import axios from "axios";
import noData from "../../src/assets/images/nullItem.png";

export default function FavouritesList() {
  const [favList, setfavList] = useState([]);
  // console.log(favList);

  const getList = async () => {
    let token = localStorage.getItem("adminToken");
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/userRecipe/",
        { headers: { Authorization: token } }
      );

      setfavList(response?.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    let token = localStorage.getItem('adminToken');
    
   
    axios.delete(`https://upskilling-egypt.com:443/api/v1/userRecipe/${id}`,
     { headers: { Authorization: token } })
      .then((response) => {

        // toast.success("Delete From Favourites success", {
        //   position: "top-right"
        // });
        getList();
        // console.log(response);
      })
      .catch((error) => 
      console.log(error))
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <Header
        title={"Favourites Items"}
        description="You can now add your items that any user can order it from the Application and you can edit and Remove"
      />

      <div className="row p-4 justify-content-center">
        {favList?.length > 0 ? (
          favList.map((fav) => (
            <div key={fav.id} className="col-md-4">
              <div className="card m-3 position-relative">
              
              <i onClick={()=>handleDelete(fav.recipe?.id)} className="unFavItem fa-solid fa-heart-circle-minus text-danger   d-flex justify-content-end"></i>
              {fav.recipe.imagePath ? (
                      <img
                        src={`https://upskilling-egypt.com/${fav.recipe?.imagePath}`}
                        className=" w-100 "
                      />
                    ) : (
                      <img src={noData} className="" />
                    )}
               
                <div className="card-body">
                  <h5 className="card-title">{fav.recipe?.name}</h5>
                  <p className="card-text">
                  {fav.recipe?.description}
                  </p>
                
                </div>
              </div>

            </div>
          ))
        ) : (
          <img className="w-50" src={noData} />
        )}
      </div>
    </>
  );
}
