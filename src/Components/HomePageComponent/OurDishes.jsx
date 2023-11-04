import React, { useEffect } from 'react';
import img1 from '../../assets/food.png'
import './OurDishes.css'
import { FaCartPlus, FaHeart } from 'react-icons/fa'
import { useAddFavouriteMenuItemMutation, useGetThaiCuisineQuery } from '../../Redux/api/baseApi';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../../Redux/feature/cartProductSlice/cartProductSlice';
import { deleteFavMenuData, getFavMenuData, isFavMenu, setCuisineId } from '../../Redux/feature/menuDetailsSlice/menuDetailsSlice';
import toast, { Toaster } from 'react-hot-toast';
import OurDishesLoader from './SkeletonLoaderHomePage/OurDishesLoader';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'


const OurDishes = () => {

    const dispatch = useDispatch()

    const { userEmail, userLoading, userImage, userName, iscreateUserError, createUserError } = useSelector((state) => state.userProfileSlice)

    const { index, menuID, itemName, isLoading, ingredients, category, time, cuisine, price: allPriceSize, urls, isMenuError, menuError, isFavourite, isFavouriteLoading, favouriteMenuData, isFavouritemenuDataLoading, isFavouriteMenuDataError, favouriteMenuDataError, isDeleteFavSuccess, isDeleteFavLoading, isDeleteFavError, cuisineID } = useSelector((state) => state.menuDetailsSlice)

    const [addFavouriteMenuItem, { data: addFavData, error: favErr, isError, isLoading: favMenuLoading, isSuccess: isAddFavSuccess }] = useAddFavouriteMenuItemMutation()


    const { data, isLoading: isThaiCuisineLoading, error: thaiCuisineErr, refetch } = useGetThaiCuisineQuery()

    //console.log(data)

    const addItemCart = (data) => {
        dispatch(addCart(data))
    }



    //console.log(isFavourite, 'fav??', isDeleteFavSuccess)

    const addOrDeleteFav = (menuID, userEmail, isFav) => {


        if (!isFav) {
            addFavouriteMenuItem({ menuID, userEmail })

        } else {
            //dispatch(deleteFavMenuData({ menuID, userEmail }))
            dispatch(deleteFavMenuData({ userEmail, menuID }))

        }

    }

    useEffect(() => {
        if (addFavData?.insertedId) {
            toast.success('Add to Favourite')
            dispatch(getFavMenuData(userEmail))
            refetch()
        }
    }, [userEmail, addFavData?.insertedId, cuisineID])

    useEffect(() => {


        if (isDeleteFavSuccess) {
            refetch()
        }

    }, [isDeleteFavSuccess])


    useEffect(() => { refetch() }, [])


    return (
        <div className='container mx-auto my-10'>
            <Toaster />
            <div className='flex justify-center items-center'>
                <div className='grid md:grid-cols-4 items-center gap-10 md:gap-20 mx-5'>
                    <div className='' >
                        <h1 className='texl-lg font-semibold'>Thai Cuisin</h1>
                        <h1 className='text-5xl font-bold '>Our Dishes</h1>
                    </div>
                    <div className='md:col-span-2'>
                        <p className='texl-lg '>Embark on a Thai Taste Odyssey!Immerse yourself in the vibrant flavors of Thailand, where every dish is a harmonious blend of sweet, spicy, and savory delights.</p>
                    </div>
                    <div className='texl-xl text-right '>
                        LEARN MORE
                    </div>
                </div>
            </div>

            <div className='flex justify-center '>
                <div className='grid gap-10 md:gap-10 lg:gap-[80px]  mx-2 grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-10'>

                    {
                        isThaiCuisineLoading ?
                            <>


                                <OurDishesLoader></OurDishesLoader>

                            </>
                            :
                            <>
                                {
                                    data?.map(menu => <div key={menu?._id} className='  custom0 flex flex-col  relative p-5 border-b-4  rounded-xl md:border-b-0'>
                                        <img className=' max-w-[250px] md:max-w-[200px] hover:scale-125 duration-500' src={menu?.urls[0]} alt="" />
                                        <div className='mt-6 grid gap-2'>
                                            <h1 className='text-xl font-bold'>
                                                {menu?.itemName}
                                            </h1>
                                            <h1 className='text-lg font-medium opacity-90'>{menu?.price[0].price} Tk.</h1>
                                            <h1 className='font-semibold'>  <Rating style={{ maxWidth: 100 }} value={menu?.averageRating} readOnly /></h1>
                                            <div className='custom1 grid gap-2 text-xl rounded-md bg-orange-500 text-white p-2 absolute top-10 right-0'><span className='hover:scale-125 '> <button onClick={() => addItemCart({ name: menu?.itemName, size: `${menu.price.length > 1 ? menu?.price[0].size : ''}`, price: menu?.price[0].price, menuID: menu?._id, image: menu?.urls[0], category: menu?.category })}><FaCartPlus /></button></span>
                                                <span className='hover:scale-125 '> <button className={menu?.match ? 'text-red-500' : ''} onDoubleClick={() => {
                                                    addOrDeleteFav(menu._id, userEmail, menu?.match)
                                                    dispatch(setCuisineId(menu?._id))
                                                }}><FaHeart /></button></span>
                                            </div>
                                        </div>
                                    </div>)
                                }

                            </>
                    }

                </div>
            </div>
        </div>
    );
};

export default OurDishes;