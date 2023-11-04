import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAddReviewsMutation, useModifyOrderStatusMutation } from '../../Redux/api/baseApi';
import toast, { Toaster } from 'react-hot-toast';


import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { resetReviewData, setItemsInfo, setPaymentId, setRating, setReviewMessage, setSelectedValue, showReviews } from '../../Redux/feature/userReviewsSlice/userReviewsSlice';

const OrderdetailsTable = ({ isComplete, data, isAdmin, userEmail }) => {

    const dispatch = useDispatch()

    const { reviewMessage, rating, itemsInfo, selectedValue, paymentId } = useSelector((state) => state.userReviewsSlice)


    //console.log(rating, reviewMessage, itemsInfo, 'k', selectedValue, paymentId,userEmail,isComplete)

    const [modifyOrderStatus, { data: orderStatus, isSuccess }] = useModifyOrderStatusMutation()



    const modifyStatus = (isAdmin, paymentID, email) => {

        if (isAdmin == true) {
            modifyOrderStatus({ status: 'Delivered', paymentID, email })
        }

    }

    useEffect(() => {
        if (isSuccess) {
            toast.success('Status Updated')
        }
    }, [isSuccess])



    const handleRatingChange = (newRating) => {
        dispatch(setRating(newRating));
    };
    const handleReviewMessageChange = (e) => {
        console.log('l')
        dispatch(setReviewMessage(e.target.value));
    };

    const handleSelectChange = (e) => {
        dispatch(setSelectedValue(e.target.value));
    }

    const resetReviewDatas = () => {
        console.log('hit')
        dispatch(resetReviewData())
    }




    const [addReviews, { data: reviewPostData, isSuccess: isPostReviewSuccess, isLoading: isPostReviewLoading }] = useAddReviewsMutation()

    const postUserReview = (selectedValue, userEmail, rating, reviewMessage, paymentId) => {
        addReviews({ selectedValue, userEmail, rating, reviewMessage, paymentId })
    }

    useEffect(() => {
      
        dispatch(resetReviewData())

        if (isPostReviewSuccess && reviewPostData?.result !== 'duplicate' ) {
            toast.success('Review Added')
        }

        if (reviewPostData?.result == 'duplicate') {
            toast.error('Review Already Added')
            
        }

    }, [isPostReviewSuccess, reviewPostData])


    console.log(reviewPostData)

    return (
        <>
            <table className="table table-zebra">
                {/* head */} <Toaster />
                <thead>
                    <tr className='text-orange-400 text-center'>
                        <th>Menu Item</th>
                        <th>Total Price</th>
                        <th>PaymentId/OrderId</th>
                        <th>User</th>
                        <th>Date</th>
                        {isComplete && <>
                            <th>Delevery Date</th>
                        </>}
                        <th >Delivary Status</th>

                    </tr>
                </thead>
                <tbody className='text-center'>
                    {/* row 1 */}
                    {
                        data?.map((order, index) => {
                            return <tr className='shadow-md ' key={index}>
                                <td className=''> {
                                    order?.cartItem?.map((item, index) => <div className='grid my-2 grid-cols-1' key={index}>
                                        <h1>Name: <span className='text-orange-400'>{item?.name}</span></h1>
                                        <p>Size/Quantity: <span className='text-orange-400'>{item.size ? `${item.size}"` : 'Reguler'}</span></p>
                                        <p>Amount: <span className='text-orange-400'>{item?.amount}</span></p>
                                    </div>)
                                }</td>
                                <td>{order?.totalPrice} Tk.</td>
                                <td className='text-green-500'>{order?.paymentID}</td>
                                <td>{order?.userEmail}</td>
                                <td>{order?.date} {order?.time}</td>
                                {isComplete && <>
                                    <td>{order?.deliveryDate} {order?.deliveryTime}</td>
                                </>}
                                <td className=' grid grid-cols-1 items-center'>{isAdmin && order.status == 'Pending' ? <button onClick={() => modifyStatus(isAdmin, order?.paymentID, userEmail)} className='btn btn-sm bg-orange-400 hover:bg-orange-500'>{order?.status}</button> : order?.status} {(!isAdmin && order?.status == 'Delivered') && <button className='btn btn-sm bg-orange-400 text-white'
                                    onClick={() => {
                                        document.getElementById('my_modal_3').showModal()

                                        dispatch(setPaymentId(order?.paymentID))

                                        dispatch(setItemsInfo(order?.cartItem))
                                    }}>Give Review</button>}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>




            <dialog id="my_modal_3" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button onClick={() => resetReviewDatas()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <div className='mt-3 grid grid-cols-1 gap-3 items-center'>

                        <div>


                            <select onClick={handleSelectChange} className="select select-warning w-full max-w-xs">
                                <option value={'none'} >Pick an Item</option>
                                {
                                    itemsInfo?.map(menu => <option key={menu?.menuID} value={menu?.menuID}>{menu?.name}</option>)
                                }
                            </select>
                        </div>

                        <div className='flex justify-center'>
                            <Rating style={{ maxWidth: 150 }} value={rating} onChange={handleRatingChange} />
                        </div>
                        <textarea value={reviewMessage} onChange={handleReviewMessageChange} placeholder="Write Your Review" className="textarea mt-3 textarea-bordered textarea-md w-full" ></textarea>
                        <button disabled={selectedValue == '' || selectedValue == 'none'} onClick={() => postUserReview(selectedValue, userEmail, rating, reviewMessage, paymentId)} className='btn btn-sm bg-orange-400 text-white'>Add Review</button>

                    </div>
                </div>
            </dialog>
        </>

    );
};

export default OrderdetailsTable;




