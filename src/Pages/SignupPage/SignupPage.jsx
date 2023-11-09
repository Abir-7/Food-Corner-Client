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
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    
  
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  
  })

const SignupPage = () => {

    const MySwal = withReactContent(Swal)

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

            MySwal.fire({
                position: "top-center",
                icon: "success",
                title: "Signup Success",
                showConfirmButton: false,
                timer: 2000
              })

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
                        <div data-aos="fade-right" className=" flex justify-center lg:justify-normal  md:w-1/2 ">
                            <img src={logo} className=" w-5/6 rounded-lg " alt="" />
                        </div>
                        <div className="md:w-1/2" data-aos="fade-left">
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