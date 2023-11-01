import { useForm } from "react-hook-form";
// import { Authcontext } from "../../AuthProvider/AuthProvider";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createUser } from "../../Redux/feature/updateProfileSlice/userProfileSlice";


const SignupPage = () => {
    const dispatch=useDispatch()
    const [loading,setLoading]=useState(false)
    // const { googleSignin, createUser:createUsers, updateUserProfile } = useContext(Authcontext)

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()
    const onSubmit = (data) => {
        setLoading(true)
        //createUser(data.email, data.password)
        dispatch(createUser(data.email,data.password,data.name,data.mobile))
        // .then((userCredential) => {
        //     const user = userCredential.user;
        //     updateUserProfile(data.name,"") //default Propic
        //     //console.log(user)
        //     if (user) {
        //     fetch('http://localhost:4000/users', {
        //         method: "POST",
        //         headers: {
        //             "content-type": "application/json"
        //         },
        //         body: JSON.stringify({email:data?.email.toLowerCase(),name:data?.name,mobile:data?.mobile,role:'user'})
        //     })
        //         .then(res => res.json())
        //         .then(data => {
        //             //console.log(data)
        //             if (data.insertedId) {
        //                 toast.success('User Created Successfully')
        //                 setLoading(false)
        //             }
                
        //         })
                
        //     }
        // })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message
        //     //console.log(errorMessage)
        //     toast.error(errorMessage)
        // })
        // setLoading(false)
    }

    //toast.error('hi')

    return (
        <div>


            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        className="input input-bordered"
                        {...register("name", { required: true })}
                        aria-invalid={errors.name ? "true" : "false"}
                    />
                    {errors.name?.type === "required" && (
                        <p className='text-red-500 mt-1' role="alert">Name is required</p>
                    )}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
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
                        <span className="label-text">Mobile:</span>
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
                        <span className="label-text">Password</span>
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
                    <input className="btn btn-primary" type="submit" />
                </div>
                <Toaster />
            </form>
        </div>
    );
};

export default SignupPage;