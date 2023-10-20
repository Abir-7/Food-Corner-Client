import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFavMenuData } from '../../Redux/feature/menuDetailsSlice/menuDetailsSlice';
import { showFavouriteSlide } from '../../Redux/feature/cartProductSlice/cartProductSlice';
import { FaTrashAlt } from 'react-icons/fa';

const FavaouriteMenuList = () => {
    const dispatch = useDispatch()

    const { userEmail, userLoading, userImage, userName, iscreateUserError, createUserError } = useSelector((state) => state.userProfileSlice)
    const { itemNumber, option, isShowReviews, cartItem } = useSelector((state) => state.cartProductSlice)
    const { index, menuID, itemName, isLoading, ingredients, category, time, cuisine, price: allPriceSize, urls, isMenuError, menuError, isFavourite, isFavouriteLoading, favouriteMenuData, isFavouritemenuDataLoading, isFavouriteMenuDataError, favouriteMenuDataError } = useSelector((state) => state.menuDetailsSlice)

    useEffect(() => {
        dispatch(getFavMenuData(userEmail))

    }, [userLoading, isLoading, isFavouriteLoading])
console.log(favouriteMenuData,'--------[[[[[[[')
    return (
        <div className='min-h-[400px] max-h-screen w-96 fixed top-0 right-0 z-10 shadow-2xl backdrop-blur-2xl backdrop-brightness-50 overflow-auto rounded-xl'>
            <div className='bg-orange-400 sticky top-0 flex items-center justify-center p-2 rounded-xl'>
                <div className='flex items-center flex-col'>
                    <h1 className='text-center font-bold text-white text-2xl'>Your Favourites</h1>
                </div>
                <button onClick={() => dispatch(showFavouriteSlide(false))} className='absolute right-5 font-medium text-white hover:font-bold hover:text-red-600 duration-500'>X</button>
            </div>

            <div>
                {
                    favouriteMenuData?.map((item, index) => <div key={index} className='p-2 border text-white border-orange-400 mt-2 rounded-xl'>
                        <div>
                            <div className='flex gap-3'>
                                <img className='w-[50px] rounded-lg h-[50x]' src={item?.urls[0]} alt="" />
                                <div className='w-full'>
                                    <div className='flex justify-between w-100'>
                                        <p ><span className='text-orange-400'>Name: </span> {item.itemName}</p>
                                        <button onClick={() => dispatch(removeCartItem({ name: item?.name, size: item?.size }))} className='btn btn-xs bg-orange-400 border-none mb-1'><FaTrashAlt /></button>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p><span className='text-orange-400'>Categoty:</span> {item?.category}</p>
                                        <p><span className='text-orange-400'>Price:</span> {item?.price[0].price} Tk</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>


        </div>
    );
};

export default FavaouriteMenuList;