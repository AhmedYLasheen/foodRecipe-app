import React, { useEffect } from "react";
import Header from "../SharedModule/Components/Header/Header";
import { useState } from "react";
import axios from "axios";
import noData from "../../src/assets/images/nullItem1.png";
import Modal from "react-bootstrap/Modal";
import DeleteModal from "../SharedModule/Components/DeleteModal/DeleteModal";

export default function FavouritesList() {
  const [favList, setfavList] = useState([]);
  const [RecipesId, setcategoriesId] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let token = localStorage.getItem("adminToken");

  

  const getListFav = async () => {
   
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/userRecipe/",
        { headers: { Authorization: token } }
      );

      setfavList(response?.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/userRecipe/${id}`,
        {  headers: { Authorization: token }}
      );
      handleClose();
      // console.log(response.data);
      getListFav();

    } catch (error) {
      console.log(error);
    }
  };

 

  useEffect(() => {
    getListFav();
  }, []);

  return (
    <>
      <Header
        title={"Favourites Items"}
        description="You can now add your items that any user can order it from the Application and you can edit and Remove"
      />

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <DeleteModal
            title={`Delete This favorites Recipe !?`}
            description={`are you sure you want to delete this item ? if you are sure just click on delete it`}
          />
        </Modal.Body>
        <div className="delete-button d-flex justify-content-end p-3">
          <button
            onClick={() => {
              handleDelete(RecipesId);
            }}
            className="btn btn-danger"
          >
            Delete this item
          </button>
        </div>
      </Modal>

      <div className="row p-4 justify-content-center">
        {favList?.length > 0 ? (
          favList.map((fav) => (
            <div key={fav.id} className="col-md-4 p-4 ">
              <div className="fav-card card m-3 rounded-4 position-relative">
              <button className="border-0"  onClick={() => {
                           handleShow(), setcategoriesId(fav.id);
                         }}>
              <i  className="unFavItem fa-solid fa-heart-circle-minus text-danger  
               d-flex justify-content-end"></i>
              </button>
              
              {fav.recipe.imagePath ? (
                      <img
                        src={`https://upskilling-egypt.com/${fav.recipe?.imagePath}`}
                        className=" w-100 rounded-4"
                      />
                    ) : (
                      <img src={noData} className="w-100" />
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
