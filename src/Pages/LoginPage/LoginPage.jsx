
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
                        <div className=" flex justify-center lg:justify-normal  md:w-1/2 ">
                            <img src={logo} className=" w-5/6 rounded-lg " alt="" />
                        </div>
                        <div className="md:w-1/2">
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
