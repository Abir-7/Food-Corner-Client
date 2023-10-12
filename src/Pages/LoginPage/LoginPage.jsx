import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Authcontext } from "../../AuthProvider/AuthProvider";


const LoginPage = () => {
    const {  loginUser} = useContext(Authcontext)

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()
    const onSubmit = (data) => {
        loginUser(data.email, data.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            // navigate(from, { replace: true })
            // ...
        })
        .catch((error) => {

            const errorMessage = error.message;
            console.log(errorMessage)
        });
        console.log(data)
    }

    return (
        <div>
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>

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


            </form>
        </div>
    );
};

export default LoginPage;
