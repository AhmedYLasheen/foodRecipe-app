import React from 'react'
import logo from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePass({ handleClose }) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSupmit = (data) => {
    let token = localStorage.getItem('adminToken');
    // console.log(data);
    axios
      .put("https://upskilling-egypt.com:443/api/v1/Users/ChangePassword", data, { headers: { Authorization: token } })
      .then((response) => {
        
        // console.log(response);
        toast.success("Change success",{
          position:"top-right"
        }),

      

        handleClose();
        navigate("/login");

      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.response.data.message, {
            position: "top-center",
            theme: "colored",
        });
      });
  };

  return (
    <>
      <div className="row justify-content-center align-items-center">
        <ToastContainer  autoClose={2000}/>
        <div className="col-md-12  ">
          <div className="login bg-white px-4 py-5  rounded-4">
            <div className="logo-cont text-center mb-3 ">
              <img src={logo} className="w-50" />
            </div>
            <h5 className="">Change Your Password</h5>
            <p>Enter your details below</p>
            <form className="d-flex flex-column" onSubmit={handleSubmit(onSupmit)}>


              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-key"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="old Password"
                  {...register("oldPassword", {
                    required: "oldPassword is required",
                  })}
                />
                <span className="input-group-text">
                  <i className="fa-regular fa-eye"></i>
                </span>

              </div>
              {errors.oldPassword && (
                <p className="text-danger ">
                  {errors.oldPassword.message}
                </p>
              )}
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-key"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="New Password"
                  {...register("newPassword", {
                    required: "newPassword is required",
                  })}
                />
                <span className="input-group-text">
                  <i className="fa-regular fa-eye"></i>
                </span>

              </div>
              {errors.newPassword && (
                <p className="text-danger  ">
                  {errors.newPassword.message}
                </p>
              )}


              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-key"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm New Password"
                  {...register("confirmNewPassword", {
                    required: "confirmNewPassword is required",
                  })}
                />
                <span className="input-group-text">
                  <i className="fa-regular fa-eye"></i>
                </span>

              </div>
              {errors.confirmNewPassword && (
                <p className="text-danger  ">
                  {errors.confirmNewPassword.message}
                </p>
              )}


              <button className="btn btn-success w-100 button">CHange Password</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

