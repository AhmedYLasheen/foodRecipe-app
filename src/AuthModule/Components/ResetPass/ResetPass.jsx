import React from 'react'
import logo from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPass() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const onSupmit = (data) => {
        axios
            .post("https://upskilling-egypt.com:443/api/v1/Users/Reset", data)
            .then((response) => {
                setTimeout(() => toast.success("Reset success", {
                    position: "bottom-right"
                }), 100);

                // console.log(response.data.token);
                navigate("/login");

            })
            .catch((error) => {
                // toast.success(error.response.data.message);
                toast.error(error.response.data.message, {
                    position: "top-center",
                    theme: "colored",
                });
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
                                <h5 className=""> Reset  Password</h5>
                                <p>Please Enter Your Otp  or Check Your Inbox</p>
                                <form className="d-flex flex-column" onSubmit={handleSubmit(onSupmit)}>
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
                                            <i className="fa-solid fa-lock"></i>
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="OTP"
                                            {...register("seed", {
                                                required: "OTP is required",
                                            })}
                                        />


                                    </div>
                                    {errors.seed && (
                                        <span className="alert alert-danger ">
                                            {errors.seed.message}
                                        </span>
                                    )}

                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">
                                            <i className="fa-solid fa-key"></i>
                                        </span>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="New Password"
                                            {...register("password", {
                                                required: "Password is required",
                                            })}
                                        />
                                        <span className="input-group-text">
                                            <i className="fa-regular fa-eye"></i>
                                        </span>

                                    </div>
                                    {errors.password && (
                                        <span className="alert alert-danger ">
                                            {errors.password.message}
                                        </span>
                                    )}
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">
                                            <i className="fa-solid fa-key"></i>
                                        </span>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Confirm New Password"
                                            {...register("confirmPassword", {
                                                required: "confirmPassword is required",
                                            })}
                                        />
                                        <span className="input-group-text">
                                            <i className="fa-regular fa-eye"></i>
                                        </span>

                                    </div>
                                    {errors.confirmPassword && (
                                        <span className="alert alert-danger ">
                                            {errors.confirmPassword.message}
                                        </span>
                                    )}
                                    <div className="d-flex justify-content-end  pb-3">
                                        <Link to={'/login'} className="text-success ">Back To Login </Link>
                                    </div>

                                    <button className="btn btn-success w-100">Reset Password</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
