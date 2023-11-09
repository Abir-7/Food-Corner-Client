
import { useForm } from "react-hook-form";
// import { Authcontext } from "../../AuthProvider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../Redux/feature/updateProfileSlice/userProfileSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../FirebaseConfig/firebaseConfig";
import bg1 from "../../assets/login.jpg"
import logo from "../../assets/login3.jpg"
import { FaArrowLeft } from "react-icons/fa";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";

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

const LoginPage = () => {
    const dispatch = useDispatch()
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()
    const onSubmit = (data) => {
        dispatch(setLoading(true))
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                    if(user){
                        MySwal.fire({
                            position: "top-center",
                            icon: "success",
                            title: "Login Success",
                            showConfirmButton: false,
                            timer: 2000
                          })
                    }

                navigate(from, { replace: true })
                // ...
            })
            .catch((error) => {

                const errorMessage = error.message;
                //console.log(errorMessage)
            });
        // //console.log(data)
    }

    return (
        <div className="  min-w-full   " style={{ backgroundImage: `url(${bg1})`, minHeight: '100vh' }} >
            <div className="backdrop-blur-sm   w-[100%] min-h-screen p-5 ">
                <Link className='flex  items-center gap-1 text-orange-400' to='/'><FaArrowLeft />Back to Home</Link>
                <div className="flex items-center justify-center p-10 md:p-16">

                    <div className="flex flex-col-reverse lg:flex-row  items-center w-[100%]  lg:w-3/4  " >
                        <div data-aos="fade-right" className=" flex justify-center lg:justify-normal  md:w-1/2 ">
                            <img src={logo} className=" w-5/6 rounded-lg " alt="" />
                        </div>
                        <div className="md:w-1/2"  data-aos="fade-left">
                            <h1 className="text-5xl text-orange-400 font-semibold text-center">Login</h1>
                            <form className="card-body  w-full z-40 " onSubmit={handleSubmit(onSubmit)}>

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
                                    <p className="text-white mt-1 text-center">No Account? <Link className="hover:link" to='/user/signup'>Click Here</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>


        </div>

    );
};

export default LoginPage;
