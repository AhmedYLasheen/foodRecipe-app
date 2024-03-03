import React, { useEffect, useState } from "react";
import RecipesHeader from "../../../UserModule/Components/RecipesHeader/RecipesHeader";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RecipesData() {
  let token = localStorage.getItem("adminToken");
  let pass = useParams();
  // console.log(pass.id);

  const getRecipeList = async () => {
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:443/api/v1/Recipe/${
          pass.id ? pass.id : ""
        }`,
        { headers: { Authorization: token } }
      );
      //  setrecipesList(response.data);
      // console.log(response.data.tag.name);

      setValue("name", response.data.name);
      setValue("price", response.data.price);
      setValue("description", response.data.description);
      setValue("tagId", response.data.tag.id);
      setValue("categoriesIds", response.data.category[0].id);
      setValue("recipeImage", response.data.recipeImage[0]);

      // console.log(recipesList.name);
    } catch (error) {
      // console.log(error);
      toast.error(error);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const appendToFormData = (data) => {
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("tagId", data.tagId);
    formData.append("recipeImage", data.recipeImage[0]);
    formData.append("categoriesIds", data.categoriesIds);
    return formData;
  };
  const onSubmitAdd = async (data) => {
    let recipeDataForm = appendToFormData(data);

    // console.log(data);
    try {
      let addRecipese = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Recipe/",
        recipeDataForm,
        { headers: { Authorization: token } }
      );
      // console.log(addRecipese.data.message);
      setTimeout(() => toast.success(addRecipese.data.message, {}), 100);
      navigate("/dashboard/recipes");
    } catch (error) {
      // console.log(error);
      toast.error(error);
    }
  };

  const onSubmitUpdate = async (data) => {
    let recipeDataForm = appendToFormData(data);
    // console.log(data);
    try {
      let updateRecipese = await axios.put(
        `https://upskilling-egypt.com:443/api/v1/Recipe/${pass.id}`,
        recipeDataForm,
        { headers: { Authorization: token } }
      );
      console.log(updateRecipese.data.message);
      setTimeout(() => toast.success("Update success", {}), 100);
      navigate("/dashboard/recipes");
    } catch (error) {
      // console.log(error);
      toast.error(error);
    }
  };

  const [categoriesList, setcategoriesList] = useState([]);
  const getCategoriesList = async () => {
    try {
      let categoriesList = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Category/?pageSize=10&pageNumber=1",
        { headers: { Authorization: token } }
      );
      setcategoriesList(categoriesList.data.data);
      //   console.log(categoriesList.data.data);
    } catch (error) {
      // console.log(error);
      toast.error(error);
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

  useEffect(() => {
    getRecipeList();
    getCategoriesList();
    getTagsList();
  }, []);

  return (
    <>
      <ToastContainer />
      <RecipesHeader />
      <div className="container">
        <form onSubmit={handleSubmit(pass.id ? onSubmitUpdate : onSubmitAdd)}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Recipe Name"
              {...register("name", {
                required: "Recipes Name is required",
              })}
            />
          </div>
          <div>
            {errors.name && (
              <span className="text-danger">{errors.name.message}</span>
            )}
          </div>
          <div className="input-group mb-3">
            <select
              className="form-select"
              aria-label="Default select example"
              {...register("tagId", {
                required: "tag  is required",
              })}
            >
              <option>tag</option>
              {tagsList?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <div>
              {errors.tagId && (
                <span className="text-danger">{errors.tagId.message}</span>
              )}
            </div>
          </div>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              {...register("price", {
                required: "price  is required",
              })}
            />
          </div>
          <div>
            {errors.price && (
              <span className="text-danger">{errors.price.message}</span>
            )}
          </div>

          <div className="input-group mb-3">
            <select
              className="form-select"
              aria-label="Default select example"
              {...register("categoriesIds", {
                required: "categories is required",
              })}
            >
              <option>Category</option>
              {categoriesList?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <div>
              {errors.categoriesIds && (
                <span className="text-danger">
                  {errors.categoriesIds.message}
                </span>
              )}
            </div>
          </div>

          <div className="input-group mb-3 d-flex justify-content-center">
            <div class="input-div">
             
                 <input
              type="file"
              className="form-control input"
              
              {...register("recipeImage",{})}
            />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                stroke-linejoin="round"
                stroke-linecap="round"
                viewBox="0 0 24 24"
                stroke-width="2"
                fill="none"
                stroke="currentColor"
                className="icon"
              >
                <polyline points="16 16 12 12 8 16"></polyline>
                <line y2="21" x2="12" y1="12" x1="12"></line>
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                <polyline points="16 16 12 12 8 16"></polyline>
              </svg>
              
            </div>
          
             
            <span className="d-flex justify-content-center align-items-center px-4">Click to upload image</span>
            
         
          </div>
          <div>
            {errors.recipeImage && (
              <span className="text-danger">{errors.recipeImage.message}</span>
            )}
          </div>

          <div className="input-group mb-3">
            <textarea
              className="form-control"
              placeholder="description  "
              {...register("description", {
                required: "description is required",
              })}
            ></textarea>
            <div>
              {errors.description && (
                <span className="text-danger">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button className="btn btn-success">
              {pass.id ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
