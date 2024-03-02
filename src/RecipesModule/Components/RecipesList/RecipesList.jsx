import React, { useEffect } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import axios from "axios";
import { useState } from "react";
import noData from "../../../assets/images/nullItem1.png";
import Modal from "react-bootstrap/Modal";
import DeleteModal from "../../../SharedModule/Components/DeleteModal/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

export default function RecipesList() {
  const [show, setShow] = useState(false);
  let token = localStorage.getItem("adminToken");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [RecipesId, setcategoriesId] = useState(0);

  let loginData = JSON.parse(localStorage.getItem('loginData'));
  // console.log(loginData);

  const navigate = useNavigate();

  const navigateToRecipeData = () => {
    navigate("/dashboard/recipe-data");
  };

  const [searchName, setsearchName] = useState("");
  const [selectTagId, setselectTagId] = useState(0);
  const [selectCatId, setselectCatId] = useState(0);
  const [pagesArray, setpagesArray] = useState([]);

  const [recipesList, setrecipesList] = useState([]);
  const getList = async (pageNo, pageSize, name, tagId, catId) => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Recipe/",
        {
          headers: { Authorization: token },
          params: {
            pageNumber: pageNo,
            pageSize: pageSize,
            name: name,
            tagId: tagId,
            categoryId: catId,
          },
        }
      );
      setpagesArray(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setrecipesList(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleDelete = (id) => {
    
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

  const [categoriesList, setcategoriesList] = useState([]);
  const getCategoriesList = async () => {
    try {
      let categoriesList = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Category/?pageSize=100&pageNumber=1",
        { headers: { Authorization: token } }
      );
      setcategoriesList(categoriesList.data.data);
      //   console.log(categoriesList.data.data);
    } catch (error) {
      // console.log(error);
      toast.error(error);
    }
  };
  const sddToFav = async (recipeId) => {
    try {
      let response = await axios.post(
        `https://upskilling-egypt.com:443/api/v1/userRecipe/`,
        {"recipeId":recipeId},
        { headers: { Authorization: token } }
      );
    
        console.log(response);
    } catch (error) {
      console.log(error);
      // toast.error(error);
    }
  };

  const [tagsList, setTagsList] = useState([]);
  const getTagsList = async () => {
    try {
      let categoriesList = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/tag/",
        { headers: { Authorization: token } }
      );
      setTagsList(categoriesList.data);
      // console.log(categoriesList.data);
    } catch (error) {
      // console.log(error);
      toast.error(error);
    }
  };

  const getNameValue = (input) => {
    setsearchName(input.target.value);
    getList(1, 5, input.target.value, selectTagId, selectCatId);
  };
  const getCatValue = (select) => {
    setselectCatId(select.target.value);
    getList(1, 5, searchName, selectTagId, select.target.value);
  };
  const getTagValue = (select) => {
    setselectTagId(select.target.value);
    getList(1, 5, searchName, select.target.value, selectCatId);
  };

  useEffect(() => {
    getList(1, 7);
    getCategoriesList();
    getTagsList();
  }, []);
  return (
    <>
      <ToastContainer />
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

      <div className="row p-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="search by Name"
            onChange={getNameValue}
          />
        </div>
        <div className="col-md-3">
          <select className="form-select" onChange={getCatValue}>
            <option>search by Category</option>
            {categoriesList?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select" onChange={getTagValue}>
            <option>search by tag</option>
            {tagsList?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>{" "}
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
                  <td>{recipe.category[0]?.name}</td>
                  <td>
                    {loginData?.userGroup=='SuperAdmin'?
                    <>
                       <Link to={`/dashboard/recipe-data/${recipe.id}`}>
                       <i className="fas fa-edit text-warning mx-2 "></i>
                     </Link>
    
                       <i
                         onClick={() => {
                           handleShow(), setcategoriesId(recipe.id);
                         }}
                         className="fas fa-trash text-danger  "
                         aria-hidden="true"
                       ></i>
                       </>
                        :<i onClick={()=> sddToFav(recipe.id)} className="fa-regular fa-heart fa-2x  text-danger"></i> }
                        
                 
                    
                  </td>
                </tr>
              ))}
            </tbody>
           
          </table>
        ) : (
          <img src={noData} className="" />
        )}
         <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {pagesArray.map((pageNo) => 
                  <li onClick={()=>getList(pageNo,5)} key={pageNo} className="page-item">
                    <a className="page-link" >
                      {pageNo}
                    </a>
                  </li>
                )}

                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
      </div>
    </>
  );
}
