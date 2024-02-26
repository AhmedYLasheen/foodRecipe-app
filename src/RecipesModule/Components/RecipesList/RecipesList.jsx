import React, { useEffect } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import axios from "axios";
import { useState } from "react";
import noData from "../../../assets/images/nullItem1.png";
import Modal from "react-bootstrap/Modal";
import DeleteModal from "../../../SharedModule/Components/DeleteModal/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function RecipesList() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [RecipesId, setcategoriesId] = useState(0);

  const navigate = useNavigate();

  const navigateToRecipeData = () => {
    navigate("/dashboard/recipe-data");
  };

  const [recipesList, setrecipesList] = useState([]);
  const getList = async () => {
    let token = localStorage.getItem("adminToken");

    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Recipe/?pageSize=10&pageNumber=1",
        { headers: { Authorization: token } }
      );
      setrecipesList(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    let token = localStorage.getItem("adminToken");
    // console.log(id);
    // console.log(token);
    axios
      .delete(`https://upskilling-egypt.com:443/api/v1/Recipe/${id}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        getList();
        handleClose();
        toast.success("Delete success", {
          position: "top-right",
        });
        // console.log(response);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getList();
  }, []);
  return (
    <>
      <ToastContainer autoClose={2000} />
      <Header
        title={"Recipes Items"}
        description="You can now add your items that any user can order it from the Application and you can edit"
      />

      <div className="title-info d-flex justify-content-between align-items-center py-4">
        <div className="title">
          <h5>Recipes Table Details</h5>
          <h6>You can check all details</h6>
        </div>
        <div className="btn-container">
          <button className="btn btn-success" onClick={navigateToRecipeData}>
            Add new Recipe
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <DeleteModal
            title={`Delete This Recipes !?`}
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

      <div className="table-container px-4 my-3 text-center">
        {recipesList.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col"> Name</th>
                <th scope="col">Image</th>
                <th scope="col">Category</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>

            <tbody className="">
              {recipesList.map((recipe) => (
                <tr className="" key={recipe.id}>
                  <th scope="row">{recipe.id}</th>
                  <td>{recipe.name}</td>
                  <td className="">
                    {recipe.imagePath ? (
                      <img
                        src={`https://upskilling-egypt.com/${recipe.imagePath}`}
                        className=" table-user-img "
                      />
                    ) : (
                      <img src={noData} className=" table-user-img" />
                    )}
                  </td>
                  <td>{recipe.category[0].name}</td>
                  <td>
                    <i
                      className="fas fa-edit text-warning mx-2 "
                      aria-hidden="true"
                    ></i>
                    <i
                      onClick={() => {
                        handleShow(), setcategoriesId(recipe.id);
                      }}
                      className="fas fa-trash text-danger mx-2 "
                      aria-hidden="true"
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <img src={noData} className="" />
        )}
      </div>
    </>
  );
}
