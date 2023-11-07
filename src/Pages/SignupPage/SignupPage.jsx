import { useForm } from "react-hook-form";
// import { Authcontext } from "../../AuthProvider/AuthProvider";
import { useContext, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createUser, setIsSignupSuccessfull } from "../../Redux/feature/updateProfileSlice/userProfileSlice";
import bg1 from "../../assets/login.jpg"
import logo from "../../assets/signup.jpg"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Helmet } from "react-helmet";




const SignupPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userEmail, userLoading, userImage, userName, iscreateUserError, createUserError, isAdmin, isAdminLoading, isSignupSuccessfull } = useSelector((state) => state.userProfileSlice)





    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        dispatch(createUser({ email: data.email, password: data.password, name: data.name, mobile: data.mobile }))
    }


    useEffect(() => {

        if (!userLoading && userEmail) {

            dispatch(setIsSignupSuccessfull(true))
            navigate('/')
        }

    }, [userLoading])

    return (
        <div className="  min-w-full  min-h-screen " style={{ backgroundImage: `url(${bg1})`, backgroundSize: '100% 100%' }} >
            <Helmet><title>Food-Corner | Signup</title></Helmet>
            <div className="backdrop-blur-sm   w-[100%] min-h-screen p-5 ">
                <Link className='flex  items-center gap-1 text-orange-400' to='/'><FaArrowLeft />Back to Home</Link>
                <div className="flex items-center justify-center p-10 md:p-16">

                    <div className="flex flex-col-reverse lg:flex-row  items-center w-[100%]  lg:w-3/4  " >
                        <div className=" flex justify-center lg:justify-normal  md:w-1/2 ">
                            <img src={logo} className=" w-5/6 rounded-lg " alt="" />
                        </div>
                        <div className="md:w-1/2">
                            <h1 className="text-5xl text-orange-400 font-semibold text-center">Signup</h1>
                            <form className="card-body w-full" onSubmit={handleSubmit(onSubmit)}>

                                <div className="form-control">
                                    <label className="label ">
                                        <span className="label-text text-white text-md font-semibold">Name</span>
                                    </label>
                                    <input
                                        className="input input-bordered "
                                        {...register("name", { required: true })}
                                        aria-invalid={errors.name ? "true" : "false"}
                                    />
                                    {errors.name?.type === "required" && (
                                        <p className='text-red-500 mt-1' role="alert">Name is required</p>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white text-md font-semibold">Email</span>
                                    </label>
                                    <input
                                        className="input input-bordered"
                                        {...register("email", { required: true })}
                                        aria-invalid={errors.email ? "true" : "false"}
                                    />
                                    {errors.email?.type === "required" && (
                                        <p className='text-red-500 mt-1' role="alert">Email is required</p>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white text-md font-semibold">Mobile:</span>
                                    </label>
                                    <input
                                        className="input input-bordered"
                                        {...register("mobile", { required: true })}
                                        aria-invalid={errors.mobile ? "true" : "false"}
                                    />
                                    {errors.mobile?.type === "required" && (
                                        <p className='text-red-500 mt-1' role="alert">Mobile is required</p>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white text-md font-semibold">Password</span>
                                    </label>
                                    <input
                                        className="input input-bordered"
                                        {...register("password", { required: true })}
                                        aria-invalid={errors.password ? "true" : "false"}
                                    />
                                    {errors.password?.type === "required" && (
                                        <p className='text-red-500 mt-1' role="alert">Password is required</p>
                                    )}
                                </div>

                                <div className="form-control mt-6">
                                    <input className="btn outline-none border-none text-white bg-orange-400 hover:bg-orange-500" type="submit" />
                                    <p className="text-white mt-1 text-center">Already have account? <Link className="hover:link" to='/user/login'>Click Here</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SignupPage;