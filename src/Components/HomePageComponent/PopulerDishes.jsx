import React from 'react';
import img1 from '../../assets/food.png'
import './PopulerDishes.css'
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { useShopFavouriteQuery } from '../../Redux/api/baseApi';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../../Redux/feature/cartProductSlice/cartProductSlice';
import PopulerDishesLoader from './SkeletonLoaderHomePage/PopulerDishesLoader';

import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Link } from 'react-router-dom';

const PopulerDishes = () => {
    const dispatch = useDispatch()
    const { data, error } = useShopFavouriteQuery()
    console.log(data,'fav')

    const addItemCart = (data) => {
        dispatch(addCart(data))
    }
    const { userEmail, isAdmin, userLoading, userImage, userName, iscreateUserError, createUserError } = useSelector((state) => state.userProfileSlice)
    return (
        <div className='container mx-auto'>
            <h1 className='text-5xl mx-3 md:mx-0  m font-bold mt-10'>Shop our favourites</h1>
            <div className='flex justify-center '>
                <div className=' my-10 grid gap-5 md:gap-20 grid-cols-1 sm:grid-cols-2   lg:grid-cols-4'>

                    {!data ?
                        <PopulerDishesLoader />
                        :
                        <>{
                            data?.map(item => <div key={item?._id} className="card mx-2  h-[450px]  custom2  bg-base-100 shadow-xl">
                                <figure className="relative h-[700px]">
                                    <div className='custom3 absolute bottom-0 w-full'></div>
                                    <div className='px-7 z-10  py-7'>
                                        <img src={item?.urls[0]} alt="Shoes" className="rounded-xl  custom4  " />
                                    </div>
                                </figure>
                                <div className="card-body   ">
                                    <p className='flex gap-2 text-yellow-400'>     <Rating style={{ maxWidth: 100 }} value={item?.averageRating} readOnly /></p>
                                    <h2 className="card-title"><Link className="hover:text-orange-400 duration-300" to={`/itemInfo/${item?._id}`}>{item?.itemName}</Link></h2>
                                    <p>{item?.ingredients.length > 80 ? `${item?.ingredients.slice(0, 70)} ...` : item?.ingredients}</p>
                                    <div className="flex justify-between items-center ">
                                        <p><span className='text-md font-semibold'>Price: </span> <span className='text-lg font-semibold text-orange-400'>{item?.price[0].price} tk.</span></p>
                                     {!isAdmin &&    <div className='text-lg text-orange-400 flex justify-end  '> <button className='hover:drop-shadow-md hover:scale-75  hover:bg-green-400 duration-500 p-2 rounded-full hover:text-white' onClick={() => addItemCart({ name: item?.itemName, size: `${item.price.length > 1 ? item?.price[0].size : ''}`, price: item?.price[0].price, menuID: item?._id, image: item?.urls[0], category: item?.category })}><FaShoppingCart /></button> </div>}
                                    </div>
                                </div>
                            </div>)
                        }</>
                    }


                </div>
            </div>
        </div>
    );
};

export default PopulerDishes;