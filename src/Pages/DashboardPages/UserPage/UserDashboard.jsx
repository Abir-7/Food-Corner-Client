import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAddFeedbackMutation, useGetOrderInfoQuery, useGetUserQuery } from '../../../Redux/api/baseApi';
import { Link } from 'react-router-dom';
import LinkBanner from '../../../Components/Common/LinkBanner';
import { HiMiniClipboardDocumentCheck, HiMiniClipboardDocumentList } from 'react-icons/hi2';

import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { resetReviewData, setRating, setReviewMessage } from '../../../Redux/feature/userReviewsSlice/userReviewsSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';

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

const UserDashboard = () => {
    const dispatch=useDispatch()
    const { userEmail, userName ,userLoading, userImage } = useSelector((state) => state.userProfileSlice)
    const { data, isSuccess, isLoading } = useGetOrderInfoQuery(!userLoading && userEmail)
    const { reviewMessage,rating} = useSelector((state) => state.userReviewsSlice)

    const handleRatingChange = (newRating) => {
        dispatch(setRating(newRating));
    };
    const handleReviewMessageChange = (e) => {
        console.log('l')
        dispatch(setReviewMessage(e.target.value));
    };
    const resetReviewDatas = () => {
        console.log('hit')
        dispatch(resetReviewData())
    }
    console.log(userImage,userName)

    const[ addFeedback,{data:feedbackData,error,isSuccess:postFeedbackSuccess}]=useAddFeedbackMutation()

   const postUserFeedback=(userEmail,rating,reviewMessage,userImage,userName)=>{
    addFeedback({userEmail,rating,reviewMessage,userImage,userName})
    }

useEffect(()=>{
    dispatch(resetReviewData())

    if(postFeedbackSuccess){
        dispatch(resetReviewData())
        toast.success('Feedback Added')
    }
  

},[postFeedbackSuccess])

    return (
        <div>
                  <Helmet><title>Food-Corner | User Dashboard</title></Helmet>
<ToastContainer/>
            {
                userLoading || isLoading ? <></>
                    :
                    <>
                        <div>
                            <LinkBanner text='User Dashboard'></LinkBanner>
                        </div>
                        <div data-aos="fade-up">
                            <div className="  w-full shadow-sm  grid grid-cols-1 md:grid-cols-2">

                                <div className="stat border ">
                                    <div className="stat-figure text-primary">
                                        <span className='text-green-500 text-5xl'> <HiMiniClipboardDocumentCheck /></span>
                                    </div>
                                    <div className="stat-title hover:text-orange-400 text-gray-700 font-medium"><Link to='/dashboard/completedOrder'>Completed Orders</Link></div>
                                    <div className="stat-value text-primary">{data?.result1.length}</div>
                                 
                                </div>

                                <div className="stat border ">
                                    <div className="stat-figure text-secondary">
                                        <span className='text-red-500 text-5xl'> <HiMiniClipboardDocumentList /></span>
                                    </div>
                                    <div className="stat-title text-gray-700 font-medium hover:text-orange-400"><Link to='/dashboard/prevOrders'>Pending Orders</Link></div>
                                    <div className="stat-value text-secondary">{data?.result.length}</div>
                               
                                </div>


                            </div>

                            <div className='flex mt-2 justify-end'>
                                <button onClick={() => {document.getElementById('my_modal_4').showModal()}} className='btn btn-md  bg-orange-400 text-white font-semibold hover:bg-orange-500'>Give Feedback</button>
                            </div>
                        </div>
                    </>
            }


            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button onClick={() => resetReviewDatas()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <div className='mt-3 grid grid-cols-1 gap-3 items-center'>

                        <div className='flex justify-center'>
                            <Rating style={{ maxWidth: 150 }} value={rating} onChange={handleRatingChange} />
                        </div>
                        <textarea value={reviewMessage} onChange={handleReviewMessageChange} placeholder="Write Your Review" className="textarea mt-3 textarea-bordered textarea-md w-full" ></textarea>
                        <button disabled={!rating} onClick={() => postUserFeedback(userEmail,rating,reviewMessage,userImage,userName)} className='btn btn-sm bg-orange-400 text-white'>Add Review</button>

                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default UserDashboard;