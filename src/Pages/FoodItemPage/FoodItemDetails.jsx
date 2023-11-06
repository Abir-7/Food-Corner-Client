import React, { useEffect, useState } from 'react';
import LinkBanner from '../../Components/Common/LinkBanner';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
//import img1 from '../../assets/food.png'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaCartPlus, FaHeart, FaMinus, FaPlus, FaStar } from 'react-icons/fa';


import { useDispatch, useSelector } from 'react-redux';
import { addCart, singleItemDecrement, singleItemIncrement, singleItemSize } from '../../Redux/feature/cartProductSlice/cartProductSlice';
import { useAddFavouriteMenuItemMutation, useGetSingleMenuItemQuery } from '../../Redux/api/baseApi';
import { Link, useParams } from 'react-router-dom';

import { decrement, isFavMenu, getMenu, increment, deleteFavMenuData, setFavDeleteSuccess } from '../../Redux/feature/menuDetailsSlice/menuDetailsSlice';
import toast, { Toaster } from 'react-hot-toast';
import UsersReviews from './UsersReviews';
import { showReviews } from '../../Redux/feature/userReviewsSlice/userReviewsSlice';

import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import FoodItemDetailsLoader from './SkeletonLoader/FoodItemDetailsLoader';
import { Helmet } from 'react-helmet';

const FoodItemDetails = () => {
    const dispatch = useDispatch()
    const { userEmail, userLoading, userImage, userName, iscreateUserError, createUserError } = useSelector((state) => state.userProfileSlice)
    const { id } = useParams()
    //console.log(id)


    const { itemNumber, option, cartItem } = useSelector((state) => state.cartProductSlice)
    const { isShowReviews } = useSelector((state) => state.userReviewsSlice)

    const { index, menuID, itemName, isLoading, ingredients, category, time, cuisine, price: allPriceSize, urls, canReview, isMenuError, menuError, isFavourite, isFavouriteLoading, favouriteMenuData, isFavouritemenuDataLoading, isFavouriteMenuDataError, favouriteMenuDataError, isFavDeleteSuccess, isDeleteFavSuccess, isDeleteFavLoading, isDeleteFavError, averageRating, totalCustomer, similarMenu } = useSelector((state) => state.menuDetailsSlice)

    const [addFavouriteMenuItem, { data: addFavData, error, isError, isLoading: favMenuLoading, isSuccess }] = useAddFavouriteMenuItemMutation()



    useEffect(() => {
        if (!userLoading && userEmail) {
            if (typeof (id) == 'string') {
                dispatch(getMenu({ id, userEmail }))
                dispatch(isFavMenu(id))
            }
        }
    }, [id, userLoading, userEmail])

    useEffect(() => {
        dispatch(isFavMenu(id))

        if (isSuccess) {
            toast.success('Add to Favourite')
        }

        if (isError & error?.status == 409) {
            toast('Duplicate favourite')
        }

    }, [isSuccess, userLoading])

    useEffect(() => {

        if (isDeleteFavSuccess) {
            //toast('Remove from favourite')
            dispatch(isFavMenu(id))
            dispatch(setFavDeleteSuccess(null))
        }
    }, [isDeleteFavSuccess, userLoading])


    const size = allPriceSize

    const addItemCart = (data) => {
        dispatch(addCart(data))
    }
    const handleNext = (data) => {
        if (data.action == 'next') {
            dispatch(increment({ index: data.index, length: data.length }))
        }
        else if (data.action == 'prev') {
            dispatch(decrement({ index: data.index, length: data.length }))
        }
        else if (data.action == 'incressOne') {
            dispatch(singleItemIncrement())
        }
        else if (data.action == 'decreseOne') {
            dispatch(singleItemDecrement())
        }
        else if (data.action == 'size') {
            dispatch(singleItemSize(data.index))
        }
        else if (data.action == 'reviews') {
            dispatch(showReviews(data.isShow))
        }
    }
    ////////////////////////////////////////////////////////////////


    //console.log(favouriteMenuData, '{}[[]]')

    const addOrDeleteFav = (menuID, userEmail, isFavourite) => {

        //console.log(menuID, userEmail, isFavourite)

        if (!isFavourite) {
            addFavouriteMenuItem({ menuID, userEmail })
        } else {
            dispatch(deleteFavMenuData({ menuID, userEmail }))
        }

    }


    console.log(similarMenu)



    return (
        <>
              <Helmet><title>Food-Corner | Menu Details</title></Helmet>
         <LinkBanner text='Food Details'></LinkBanner>
            {
                isLoading || userLoading ? <><FoodItemDetailsLoader/></> :

                    <div>


                        <div className='container mx-auto my-10 grid gap-5 grid-cols-1 md:grid-cols-2'>
                            <div className='flex flex-col  mx-auto  border-2 border-orange-400 rounded-lg p-8'>
                                <img src={urls[index]} alt="" className='xl:w-[500px] xl:h-[500px] lg:w-[400px] lg:h-[400px] md:w-[300px] md:h-[300px] h-[250px] w-[250px]  sm:h-[390px] sm:w-[390px]  object-cover' />

                                <div className='flex justify-around mt-5' >
                                    <button onClick={() => handleNext({ action: 'prev', index: index, length: urls.length })} className='btn btn-link '><FaArrowAltCircleLeft className='text-4xl text-orange-400' /></button>
                                    <button className='btn btn-link ' onClick={() => handleNext({ action: 'next', index: index, length: urls.length })}><FaArrowAltCircleRight className='text-4xl text-orange-400' /></button>
                                </div>
                            </div>
                            <div>
                                {isShowReviews == false ? <div className='mx-2'>
                                    <h1 className='font-bold text-4xl'>{itemName}</h1>
                                    <div className='flex mt-2  gap-4 items-center'>
                                        <div className='flex gap-1 text-yellow-400 '>
                                            <Rating style={{ maxWidth: 100 }} value={averageRating} readOnly />
                                        </div>
                                        <p className='font-medium'>( <span>{totalCustomer}</span> Customer Reviews )</p>
                                    </div>
                                    <p className='font-medium mt-2'>{ingredients}</p>
                                    <div className='flex gap-5 items-center'>
                                        <p className='font-bold my-2 text-2xl text-orange-400'><span className='text-green-400'>{allPriceSize.length > 1 ? allPriceSize[option]?.price : allPriceSize[0]?.price}</span>tk</p>
                                        <div className='flex  gap-5 '>
                                            {
                                                allPriceSize?.length > 1 ? <>
                                                    {
                                                        allPriceSize.map((item, index) => <div onClick={() => handleNext({ action: 'size', index: index })} className='flex gap-2 items-center' key={index}><div className={option == index ? 'radio flex justify-center items-center  radio-success w-[20px] h-[20px] rounded-full' : 'radio flex justify-center items-center  radio-success w-[20px] h-[20px] rounded-fulll'} ><div className={option == index ? ' bg-green-400 w-[10px] h-[10px] rounded-full' : 'bg-white rounded-full w-[10px] h-[10px]'}></div></div><p className=''>{item.size}</p></div>)
                                                    }
                                                </> :
                                                    <></>
                                            }
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='flex justify-around m-4 gap-5'>
                                        <div className='flex gap-5 items-center'>
                                            <button className='btn btn-sm rounded-full text-orange-400' onClick={() => { handleNext({ action: 'decreseOne' }) }}><FaMinus /></button>
                                            <h1 className='font-semibold text-green-500'>{itemNumber}</h1>
                                            <button className='btn btn-sm rounded-full text-orange-400' onClick={() => { handleNext({ action: 'incressOne' }) }}><FaPlus></FaPlus></button>
                                        </div>
                                        <div className='flex-grow'>
                                            <button onClick={() => addItemCart({ name: itemName, size: allPriceSize.length > 1 ? allPriceSize[option]?.size : 'reguler', price: allPriceSize.length > 1 ? allPriceSize[option]?.price : allPriceSize[0]?.price, menuID: menuID, amount: itemNumber, category: category, image: urls[0] })} className='btn w-full py-3 bg-orange-400 hover:bg-orange-500 font-bold text-white h-auto '>Add to Cart < FaCartPlus /></button>
                                        </div>
                                        <div>
                                            <button onDoubleClick={() => {
                                                addOrDeleteFav(menuID, userEmail, isFavourite)
                                            }} className='btn'><span className={isFavourite ? 'text-red-500' : ''}><FaHeart /></span></button>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='flex justify-between items-center'>
                                        <p className='text-lg text-green-400 my-2 font-medium'>Category: <span className='text-orange-400'>{category}</span></p>
                                        <button onClick={() => handleNext({ action: 'reviews', isShow: true })} className='btn btn-sm bg-yellow-400 hover:bg-yellow-500 text-white font-semibold'>Reviews</button>
                                    </div>
                                    <ul className='list-disc'>
                                        <li className='font-semibold ms-3'>Fast and Reliable Delivery</li>
                                    </ul>
                                </div> :
                                    <div className=' p-5 rounded-lg'>
                                        <h1 className='text-center text-xl text-orange-500 font-bold'>Users Review</h1>
                                        <div className='flex justify-end'>    <button onClick={() => handleNext({ action: 'reviews', isShow: false })} className='text-right text-lg w-[30px] flex justify-center items-center  h-[30px] rounded-full bg-orange-400 hover:bg-orange-500  text-white'>X</button></div>
                                        <div className=' h-[500px] p-5 mt-2 '>
                                            <UsersReviews canReview={canReview} id={menuID} />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <h1 className='text-center my-5 text-3xl font-bold'>RELATED PRODUCTS</h1>
                        <div className='max-w-[800px] mx-auto mb-5'>
                            <div className='flex justify-center'>
                                <div className='grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>

                                    {similarMenu?.map(item => {
                                        return <div className="card w-[250px] sm:w-[200px] pt-5 hover:-translate-y-2 duration-500 border-2 border-orange-400">
                                            <figure ><img className='w-[200px] object-fill  h-[200px] sm:w-[150px] sm:h-[150px] rounded-lg' src={item?.urls[0]}/></figure>
                                            <div className=" text-center">
                                                <h2 className="text-xl font-bold mt-2"><Link className="hover:text-orange-400 duration-300" to={`/itemInfo/${item._id}`}>{item?.itemName}</Link></h2>

                                                <p className='flex mt-2 gap-3 justify-center text-yellow-400 pb-5'>  <Rating style={{ maxWidth: 100 }} value={item?.averageRating} readOnly /></p>
                                            </div>
                                        </div>
                                    })}

                                    <Toaster />
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
};

export default FoodItemDetails;