import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetReviewsQuery } from '../../Redux/api/baseApi';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { FaArrowRight, FaComment, FaCommentAlt } from 'react-icons/fa';

const UsersReviews = ({ id, canReview }) => {
    console.log(id, canReview)

    const { userEmail, userLoading, userImage, userName, iscreateUserError, createUserError } = useSelector((state) => state.userProfileSlice)



    const addReviewAction = (userEmail, id)

    const { data, error } = useGetReviewsQuery(id && id)
    console.log(data)
    return (
        <div className=''>
           
           {
            data?.length==0?<>
            <h1 className='text-orange-400 text-2xl text-center'>No Reviews</h1>
            </>:
            <div className='overflow-y-auto h-full p-2'>
            {
                data?.map(info => <div className='shadow-md bg-orange-100 p-3 rounded-xl my-2' key={info?._id}>
                    <h1 ><span className='font-bold'>Email:</span> <span>{info?.email}</span></h1>
                    <div>
                        <p className='text-gray-700 flex items-center gap-2 '><span className='font-bold mt-1'><FaArrowRight /></span> {info?.reviewMessage}</p>
                        <div className='flex gap-1 items-center'>
                            <h1 className='font-bold'>Rating: </h1>
                            <Rating readOnly style={{ maxWidth: 100 }} value={info?.rating} />
                        </div>
                    </div>
                </div>)
            }
        </div>
           }

        </div>
    );
};

export default UsersReviews;