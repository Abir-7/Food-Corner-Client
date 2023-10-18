import React, { useContext } from 'react';
import defaultPic from '../../assets/defaultProfile.jpg'
// import { Authcontext } from '../../AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';
import { useGetOneUserQuery } from '../../Redux/api/baseApi';
import { useSelector } from 'react-redux';
const UserProfilePage = () => {


    const {userEmail,userLoading:loader, userImage, userName,mobile,address,iscreateUserError,createUserError}=useSelector((state)=>state. userProfileSlice)

    const { data: userInfo, isError, error: userError, isLoading, refetch } = useGetOneUserQuery()

    return (
        <>
            {
                loader ?
                    <div>Loading...</div>
                    :
                    <div className='max-w-[1080px] mx-auto my-10 md:my-20'>
                        <div className='flex justify-center '>
                            <div className='grid gap-5 lg:grid-cols-2 items-center  '>
                                <div className='flex justify-center rounded-2xl border-2 border-orange-400 p-2'>
                                    <img className='max-w-[240px] sm:max-w-[300px] md:max-w-[340px] rounded-2xl' src={userImage || defaultPic} alt="" />
                                </div>
                                <div className='flex flex-col items-center mx-2'>

                                    <div className='flex gap-2 items-center my-2  w-full max-w-md '>
                                        <h1 className='text-orange-400 font-bold w-[80px] '>Name:</h1>
                                        <p className='input font-bold input-sm input-bordered w-full  '>{userName ||userInfo?.name }</p>
                                    </div>
                                    <div className='flex gap-2 items-center my-2 w-full max-w-md'>
                                        <h1 className='text-orange-400 font-bold  w-[80px]'>Email:</h1>
                                        <p className='input font-bold input-sm input-bordered w-full '>{userEmail}</p>
                                    </div>
                                    <div className='flex gap-2 items-center my-2 w-full max-w-md'>
                                        <h1 className='text-orange-400 font-bold   w-[80px]'>Address:</h1>
                                        <p className='input font-bold input-sm input-bordered w-full  '>{address||userInfo?.address || 'add Address'}</p>
                                    </div>
                                    <div className='flex gap-2 items-center my-2 w-full max-w-md'>
                                        <h1 className='text-orange-400 font-bold  w-[80px]'>Mobile:</h1>
                                        <p className='input font-bold input-sm input-bordered w-full  '>{ mobile ||userInfo?.mobile || 'add Mobile'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                       <div className='text-center mt-10 mb-4 w-full'>
                       <Link className='btn btn-sm '  to='/updateProfile'>Update Profile</Link>
                       </div>
                    </div>
            }
        </>
    );
};

export default UserProfilePage;