import React, { useContext, useEffect, useState } from 'react';
// import { Authcontext } from '../../AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import defaultPic from '../../assets/defaultProfile2.jpg'
import axios from 'axios';
import {  useUpdateUserProfilesMutation } from '../../Redux/api/baseApi';
import { useDispatch, useSelector } from 'react-redux';
import { setImage, setUsers, updateUsers,  } from '../../Redux/feature/updateProfileSlice/userProfileSlice';
import toast, { Toaster } from "react-hot-toast";

import auth from '../../FirebaseConfig/firebaseConfig';
import { Navigate, useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';


const UpdateProfile = () => {

    const token = import.meta.env.VITE_imgbbToken
    const imageHoistingURL = `https://api.imgbb.com/1/upload?key=${token}`



    const {userEmail,userLoading:loader , userImage, userName,iscreateUserError,createUserError}=useSelector((state)=>state. userProfileSlice)


    const { data: userInfo, isError, error: userError, isLoading, refetch } = useGetOneUserQuery()

    const [updateUserProfiles, { data: formdata, error, isSuccess ,}] = useUpdateUserProfilesMutation()

    const dispatch = useDispatch()


    ////console.log(data, error)

    const [liveImage, setLiveImage] = useState(null)
    const [imageFile, setImageFile] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const newLiveImage = URL.createObjectURL(file)
        setLiveImage(newLiveImage)
        setImageFile(file)
    }


    const uploadImage = () => {
        const formData = new FormData()
        formData.append('image', imageFile);
        axios.post(imageHoistingURL, formData)
            .then(res => {

                
                if (res.data.status) {

                  
                    const data3 = { name: userName || '', mobile: userInfo?.mobile || '', address: userInfo?.address || '', image: res.data.data.display_url || '' }

                    updateUserProfiles({ email: userEmail, data3 })
                    dispatch(setImage(res.data.data.display_url))

                    updateProfile(auth.currentUser, {
                        displayName: userInfo?.name, photoURL: res.data.data.display_url
                    })

                    toast.success('Image Update Successfully')
                }
            
            })
            .catch((error)=>{
              if(error.message){
                //console.log(error.message)
                toast('Select An Image')
              }
            })
      
        setLiveImage(null)


    }
    const {
        register,
        formState: { errors },
        handleSubmit, reset
    } = useForm()


    const onSubmit = (data) => {
        if (data.name == '' && data.address == '' && data.mobile == '') {

            toast('Empty Data Field')

   
        }
        else {
            updateProfile(auth.currentUser,{displayName:data.name || userName, photoURL:userInfo.image})

            const data3 = { name: data.name || userName, mobile: data.mobile || userInfo?.mobile, address: data?.address || userInfo?.address, image: userInfo?.image }
            //console.log(data3)
            updateUserProfiles({ email: userEmail, data3 })

            reset()

            if (data) {
                dispatch(updateUsers({name:data.name||userName,mobile:data.mobile || userInfo?.mobile,address:data?.address || userInfo?.address}))
                toast.success('Profile Update Successfully')
                refetch()
            }
        }

    }

useEffect(()=>{

    if(isSuccess){
        //console.log(isSuccess,'116')
        refetch()
       //console.log(formdata,'117')
    }

},[isSuccess])
    //console.log(isLoading, loader)
    return (
        <>
            {
                (isLoading || loader) ?
                    <div>Loading...</div>
                    :
                    <div className='max-w-[1480px] mx-auto my-10 md:my-20'>
                        <div className='flex justify-around w-full  '>
                            <Toaster></Toaster>
                            <div className='grid gap-5 md:gap-20 lg:grid-cols-2 items-center  '>

                                <div className="form-control w-full">
                                    <div className='flex justify-center rounded-2xl border-2 border-orange-400 p-2'>
                                        <img className='w-[240px] rounded-xl h-[240px] object-cover sm:w-[300px] sm:h-[300px] md:w-[340px] md:h-[340px]rounded-2xl' src={liveImage || defaultPic} alt="sss" />
                                    </div>

                                    <input name='image' onChange={handleFileChange} type="file" placeholder="Select Iamge" className="file-input file-input-bordered mt-4" />

                                    <button className='btn btn-sm btn-primary mt-2' onClick={uploadImage}>Upload Image</button>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)} className='w-auto h-auto'>
                                    <div className='flex flex-col items-center mx-2'>

                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">Name:</span>
                                            </label>
                                            <input type="text" {...register("name")} placeholder={formdata?.name || "Name"} className="input w-full input-bordered" />
                                        </div>


                                        <div className="form-control w-full  ">
                                            <label className="label">
                                                <span className="label-text">Address</span>
                                            </label>
                                            <input type="text" {...register("address")} placeholder={formdata?.address || "Address"} className="input  w-full  input-bordered" />

                                        </div>

                                        <div className="form-control w-full  ">
                                            <label className="label">
                                                <span className="label-text">Mobile</span>
                                            </label>
                                            <input {...register("mobile")} type="text" placeholder={formdata?.mobile || "Mobile"} className="input  w-full  input-bordered" />

                                        </div>

                                        <div className="form-control w-full mt-6 ">
                                            <button type='submit' className="btn btn-primary ">Update Information</button>
                                        </div>

                                    </div>
                                </form>
                            </div>

                        </div>
                    </div >
            }
        </>
    );
};

export default UpdateProfile;