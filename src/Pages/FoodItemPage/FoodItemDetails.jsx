import React, { useEffect, useState } from 'react';
import LinkBanner from '../../Components/Common/LinkBanner';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
//import img1 from '../../assets/food.png'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaCartPlus, FaHeart, FaMinus, FaPlus, FaStar } from 'react-icons/fa';


import { useDispatch, useSelector } from 'react-redux';
import { addCart, setAmount, showReviews, singleItemDecrement, singleItemIncrement, singleItemSize } from '../../Redux/feature/cartProductSlice/cartProductSlice';
import { useAddFavouriteMenuItemMutation, useGetSingleMenuItemQuery } from '../../Redux/api/baseApi';
import { useParams } from 'react-router-dom';

import { decrement, isFavMenu, getMenu, increment, deleteFavMenuData, setFavDeleteSuccess } from '../../Redux/feature/menuDetailsSlice/menuDetailsSlice';
import toast, { Toaster } from 'react-hot-toast';


const FoodItemDetails = () => {
    const dispatch = useDispatch()
    const { userEmail, userLoading, userImage, userName, iscreateUserError, createUserError } = useSelector((state) => state.userProfileSlice)
    const { id } = useParams()
    console.log(id)

    useEffect(() => {
        if (!userLoading) {
            if (typeof (id) == 'string') {
                dispatch(getMenu(id))
                dispatch(isFavMenu(id))
            }
        }
    }, [id, userLoading])



    const { itemNumber, option, isShowReviews, cartItem } = useSelector((state) => state.cartProductSlice)

    const { index, menuID, itemName, isLoading, ingredients, category, time, cuisine, price: allPriceSize, urls, isMenuError, menuError, isFavourite, isFavouriteLoading, favouriteMenuData, isFavouritemenuDataLoading, isFavouriteMenuDataError, favouriteMenuDataError, isFavDeleteSuccess, isDeleteFavSuccess, isDeleteFavLoading, isDeleteFavError } = useSelector((state) => state.menuDetailsSlice)



    const [addFavouriteMenuItem, { data: addFavData, error, isError, isLoading: favMenuLoading, isSuccess }] = useAddFavouriteMenuItemMutation()





    console.log(isError, isFavourite, urls, index, '---[[[]]]-------', isFavDeleteSuccess)





    useEffect(() => {
        dispatch(isFavMenu(id))

        if (isSuccess) {
            toast.success('Add to Favourite')
        }

        if (isError & error?.status == 409) {
            toast('Duplicate favourite')
        }

    }, [isSuccess,userLoading])

    useEffect(() => {

        if (isDeleteFavSuccess) {
            toast('Remove from favourite')
            dispatch(isFavMenu(id))
            dispatch(setFavDeleteSuccess(null))
        }
    }, [isDeleteFavSuccess,userLoading])

    console.log(addFavData, ']]]]]]]')
    ////////////////////---cart operation---///////////////////////////
    //const image = urls
    const size = allPriceSize
    //const { price, size: psize } = size[option]

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


    console.log(favouriteMenuData, '{}[[]]')

    const addOrDeleteFav = (menuID, userEmail, isFavourite) => {

        console.log(menuID, userEmail, isFavourite)

        if (!isFavourite) {
            addFavouriteMenuItem({ menuID, userEmail })
        } else {
            dispatch(deleteFavMenuData({ menuID, userEmail }))
        }
    }

    return (
        <>
            {
                isLoading || userLoading ? <>Loading</> :

                    <div>

                        <LinkBanner text='Food Details'></LinkBanner>
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
                                            <FaStar /> <FaStar /> <FaStar /> <FaStar />
                                        </div>
                                        <p className='font-medium'>( <span>300</span> Customer Reviews )</p>
                                    </div>
                                    <p className='font-medium mt-2'>{ingredients}</p>
                                    <div className='flex gap-5 items-center'>
                                        <p className='font-bold my-2 text-2xl text-orange-400'><span className='text-green-400'>{allPriceSize.length > 1 ? size[option]?.price : size[0]?.price}</span>tk</p>
                                        <div className='flex  gap-5 '>
                                            {
                                                size.length > 1 ? <>
                                                    {
                                                        size.map((item, index) => <div onClick={() => handleNext({ action: 'size', index: index })} className='flex gap-2 items-center' key={index}><div className={option == index ? 'radio flex justify-center items-center  radio-success w-[20px] h-[20px] rounded-full' : 'radio flex justify-center items-center  radio-success w-[20px] h-[20px] rounded-fulll'} ><div className={option == index ? ' bg-green-400 w-[10px] h-[10px] rounded-full' : 'bg-white rounded-full w-[10px] h-[10px]'}></div></div><p className=''>{item.size}</p></div>)
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
                                            <button onClick={() => addItemCart({ name: itemName, size: allPriceSize.length > 1 ? size[option]?.size : 'reguler', price: allPriceSize.length > 1 ? size[option]?.price : size[0]?.price, menuID: menuID, amount: itemNumber, category: category, image: urls[0] })} className='btn w-full py-3 bg-orange-400 hover:bg-orange-500 font-bold text-white h-auto '>Add to Cart < FaCartPlus /></button>
                                        </div>
                                        <div>
                                            <button onClick={() => {
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
                                    <div className='border-2 p-5 rounded-lg'>
                                        <div className='flex justify-end'>     <button onClick={() => handleNext({ action: 'reviews', isShow: false })} className='text-right text-lg w-[30px] flex justify-center items-center  h-[30px] rounded-full bg-orange-400 hover:bg-orange-500  text-white'>X</button></div>
                                        <div className='overflow-y-auto h-[500px] p-5 mt-2 '>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. In reprehenderit quam, facere nesciunt cum facilis rem provident eaque ea enim, accusamus vero, distinctio a commodi eos totam? Aspernatur consequuntur rem asperiores veritatis molestias, sed placeat ad! Exercitationem odit.
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <h1 className='text-center my-5 text-3xl font-bold'>RELATED PRODUCTS</h1>
                        <div className='max-w-[800px] mx-auto mb-5'>
                            <div className='flex justify-center'>
                                <div className='grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>

                                    <div className="card w-[250px] sm:w-[200px] pt-5 hover:-translate-y-2 duration-500 border-2 border-orange-400">
                                        <figure ><img className='w-[200px] h-[200px] sm:w-[150px] sm:h-[150px] rounded-lg' src="https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?w=826&t=st=1697083856~exp=1697084456~hmac=5554f62c6354ffd9e251fa5f250183f754656d5587f2a16b1ec410807e91bdd0" /></figure>
                                        <div className=" text-center">
                                            <h2 className="text-xl font-bold mt-2">Beef Pizza</h2>

                                            <p className='flex mt-2 gap-3 justify-center text-yellow-400 pb-5'> <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar /></p>
                                        </div>
                                    </div>

                                    <div className="card w-[250px] sm:w-[200px] pt-5 hover:-translate-y-2 duration-500 border-2 border-orange-400">
                                        <figure ><img className='w-[200px] h-[200px] sm:w-[150px] sm:h-[150px] rounded-lg' src="https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?w=826&t=st=1697083856~exp=1697084456~hmac=5554f62c6354ffd9e251fa5f250183f754656d5587f2a16b1ec410807e91bdd0" /></figure>
                                        <div className=" text-center">
                                            <h2 className="text-xl font-bold mt-2">Beef Pizza</h2>

                                            <p className='flex mt-2 gap-3 justify-center text-yellow-400 pb-5'> <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar /></p>
                                        </div>
                                    </div>

                                    <div className="card w-[250px] sm:w-[200px] pt-5 hover:-translate-y-2 duration-500 border-2 border-orange-400">
                                        <figure ><img className='w-[200px] h-[200px] sm:w-[150px] sm:h-[150px] rounded-lg' src="https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?w=826&t=st=1697083856~exp=1697084456~hmac=5554f62c6354ffd9e251fa5f250183f754656d5587f2a16b1ec410807e91bdd0" /></figure>
                                        <div className=" text-center">
                                            <h2 className="text-xl font-bold mt-2">Beef Pizza</h2>

                                            <p className='flex mt-2 gap-3 justify-center text-yellow-400 pb-5'> <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar /></p>
                                        </div>
                                    </div>
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