import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({ saveAdminData }) {
  const [loding, setloding] = useState(false);
  const [showPass, setshowPass] = useState('password')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSupmit = (data) => {
    setloding(true);
    axios
      .post("https://upskilling-egypt.com:443/api/v1/Users/Login", data)
      .then((response) => {
        setTimeout(
          () =>
            toast.success("LogIn success", {
              position: "bottom-right",
            }),
          100
        );
        localStorage.setItem("adminToken", response.data.token);
        setloding(false);
        saveAdminData();
        // console.log(response.data.token);
        navigate("/dashboard");
      })
      .catch((error) => {
        // console.log(error.response.data.message);
        toast.error(error.response.data.message, {
          position: "top-center",
          theme: "colored",
        });
        setloding(false);
      });
  };
  return (
    <>
      <div className="Auth-container vh-100 ">
        <div className="overlay container-fluid vh-100">
          <ToastContainer />
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-5   ">
              <div className="login bg-white py-4 px-5  rounded-4">
                <div className="logo-cont text-center mb-3 ">
                  <img src={logo} className="w-50" />
                </div>
                <h4 className="">Log In</h4>
                <p>Welcome Back! Please enter your details</p>
                <form
                  className="d-flex flex-column"
                  onSubmit={handleSubmit(onSupmit)}
                >
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
                  {errors.email && (
                    <span className="alert alert-danger">
                      {errors.email.message}
                    </span>
                  )}
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-key"></i>
                    </span>
                    <input
                      type={showPass}
                      className="form-control"
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    <span onClick={() => { setshowPass(showPass==='password'?'text':'password') }} className="input-group-text">
                     
                      <i className="fa-regular fa-eye"></i>
                    </span>
                  </div>
                  {errors.password && (
                    <span className="alert alert-danger ">
                      {errors.password.message}
                    </span>
                  )}
                  <div className="d-flex justify-content-between pb-4">
                    <div className="">
                      <Link to={"/register"} className="text-black ">
                        {" "}
                        Register Now
                      </Link>
                    </div>
                    <div className=" ">
                      <Link to={"/forgot-Pass"} className="text-success ">
                        Forgot Password
                      </Link>
                    </div>
                  </div>

                  {/* <button   className="btn btn-success w-100">Login</button> */}
                  <button className=" button btn btn-success w-100 d-flex justify-content-center m-auto align-items-center">
                    {loding?<i className="fa fa-spinner fa-spin" aria-hidden="true"></i>:"Login"}
                    
                    </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
