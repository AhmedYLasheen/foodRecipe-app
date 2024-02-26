import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const appendToFormData=(data)=>{
    let formData = new FormData();
    formData.append("userName",data.userName );
    formData.append('email',data.email  );
    formData.append('country',data.country  );
    formData.append('phoneNumber',data.phoneNumber  );
    formData.append('profileImage',data.profileImage[0]);
    formData.append('password',data.password );
    formData.append('confirmPassword',data.confirmPassword  );
    return formData;
  };


  const [loding, setloding] = useState(false);

  const onSubmit =async (data) => { 
    setloding(true);
    let registerDataForm= appendToFormData(data);
    // let token = localStorage.getItem("adminToken");
    // console.log(data);
    try {
      let response = await axios.post(
        'https://upskilling-egypt.com:443/api/v1/Users/Register',registerDataForm  );
      console.log(response);
      setloding(false);
    // toast.success(addRecipese.data.message,{})
    //   navigate("/dashboard/recipes");


    } catch (error) {
      console.log(error);
      setloding(false);
    }


  };
  return (
    <>
      <div className="Auth-container vh-100 ">
        <div className="overlay container-fluid vh-100">
          {/* <ToastContainer /> */}
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-7   ">
              <div className="login bg-white py-4 px-5  rounded-4">
                <div className="logo-cont text-center mb-3 ">
                  <img src={logo} className="w-50" />
                </div>
                <h4 className="">Register</h4>
                <p>Welcome Back! Please enter your details</p>
                <form   onSubmit={handleSubmit(onSubmit)} className=""> 
                  <div className="row py-3 my-3 ">
                  <div className="col-md-6 p-3">
                  <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-user"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=" UserName "
                          {...register("userName", {
                            required: "userName is required",
                      
                          })}
                        />
                      </div>
                      <div>
                        {errors.userName && (
                          <p className="text-danger">
                            {errors.userName.message}
                          </p>
                        )}
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-earth-americas"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=" Country"
                          {...register("country", {
                            required: "country   is required",

                          })}
                        />
                      </div>
                      <div>
                        {errors.country  && (
                          <p className="text-danger">
                            {errors.country.message}
                          </p>
                        )}
                      </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-key"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    <span className="input-group-text">
                      <i className="fa-regular fa-eye"></i>
                    </span>
                  </div>
                  
                  <div>
                    {errors.password && (
                      <p className="text-danger ">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                    </div>
                    <div className="col-md-6 p-3 ">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa-regular fa-envelope"></i>
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter your E-mail"
                          {...register("email", {
                            required: "Email Addres is required",
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                              message: "Email Not Valid",
                            },
                          })}
                        />
                      </div>
                      <div>
                        {errors.email && (
                          <p className="text-danger">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-mobile"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="PhoneNumber "
                          {...register("phoneNumber", {
                            required: "phoneNumber   is required",
                           
                          })}
                        />
                      </div>
                      <div>
                        {errors.phoneNumber  && (
                          <p className="text-danger">
                            {errors.phoneNumber.message}
                          </p>
                        )}
                      </div>
                      <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-key"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="ConfirmPassword"
                      {...register("confirmPassword", {
                        required: "confirmPassword  is required",
                      })}
                    />
                    <span className="input-group-text">
                      <i className="fa-regular fa-eye"></i>
                    </span>
                  </div>
                  
                  <div>
                    {errors.confirmPassword  && (
                      <p className="text-danger ">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                    </div>
                    <div className="col-md-12">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                        <i className="fa-regular fa-images"></i>
                        </span>
                        <input
                          type="file"
                          className="form-control"
                          placeholder="profileImage"
                          {...register("profileImage")}
                        />
                      </div>
                    </div>
                  
                  </div>
                  <div className="d-flex justify-content-end pb-3">
                    <Link to={'/login'} className="text-success ">Back To Login </Link>
                  </div>
                  <button className="btn btn-success w-50 d-flex justify-content-center m-auto align-items-center">
                    {loding?<i className="fa fa-spinner fa-spin" aria-hidden="true"></i>:"Register"}
                    </button>
                </form >
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
