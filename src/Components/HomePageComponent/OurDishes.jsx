import React, { useEffect } from 'react';
import img1 from '../../assets/food.png'
import './OurDishes.css'
import { FaArrowLeft, FaArrowRight, FaCartPlus, FaHeart } from 'react-icons/fa'
import { useAddFavouriteMenuItemMutation, useGetThaiCuisineQuery } from '../../Redux/api/baseApi';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, setSelectedCategory, setSelectedCuisine } from '../../Redux/feature/cartProductSlice/cartProductSlice';
import { deleteFavMenuData, getFavMenuData, isFavMenu, setCuisineId } from '../../Redux/feature/menuDetailsSlice/menuDetailsSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OurDishesLoader from './SkeletonLoaderHomePage/OurDishesLoader';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';


const OurDishes = () => {

    const dispatch = useDispatch()

    const { userEmail, isAdmin, userLoading, userImage, userName, iscreateUserError, createUserError } = useSelector((state) => state.userProfileSlice)

    const { index, menuID, itemName, isLoading, ingredients, category, time, cuisine, price: allPriceSize, urls, isMenuError, menuError, isFavourite, isFavouriteLoading, favouriteMenuData, isFavouritemenuDataLoading, isFavouriteMenuDataError, favouriteMenuDataError, isDeleteFavSuccess, isDeleteFavLoading, isDeleteFavError, cuisineID } = useSelector((state) => state.menuDetailsSlice)

    const [addFavouriteMenuItem, { data: addFavData, error: favErr, isError, isLoading: favMenuLoading, isSuccess: isAddFavSuccess }] = useAddFavouriteMenuItemMutation()


    const { data, isLoading: isThaiCuisineLoading, error: thaiCuisineErr, refetch } = useGetThaiCuisineQuery(userEmail && userEmail)

    console.log(data)

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

            dispatch(getFavMenuData(userEmail))
            refetch()
            toast.success('Add to Favourite')
        }
    }, [addFavData?.insertedId,])

    useEffect(() => {


        if (isDeleteFavSuccess) {
            refetch()
        }

    }, [isDeleteFavSuccess])


    useEffect(() => { refetch() }, [])


    return (
        <div className='container mx-auto my-10'>
            <ToastContainer />
            <div className='flex justify-center items-center'>
                <div className='grid md:grid-cols-4 items-center gap-10 md:gap-20 mx-5'>
                    <div className='' >
                        <h1 className='texl-lg font-semibold text-orange-400'>Thai Cuisine</h1>
                        <h1 className='text-5xl font-bold text-green-500 '>Our Dishes</h1>
                    </div>
                    <div className='md:col-span-2'>
                        <p className='texl-lg font-sans font-medium'>Embark on a Thai Taste Odyssey!Immerse yourself in the vibrant flavors of Thailand, where every dish is a harmonious blend of sweet, spicy, and savory delights.</p>
                    </div>
                    <div className='texl-xl text-right '>
                        <button
                            onClick={
                                () => {
                                    dispatch(setSelectedCuisine('Thai'))
                                    dispatch(setSelectedCategory('all'))
                                }
                            }
                            className='btn btn-link no-underline hover:text-orange-400 duration-150 text-green-500'><Link className='flex items-center gap-1' to='/fooditems'>View More<FaArrowRight /></Link></button>
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
                                        <LazyLoadImage
                                            alt={menu?.itemName}
                                            src={menu?.urls[0]} // use normal <img> attributes as props
                                            className=' max-w-[250px] md:max-w-[200px] hover:scale-125 duration-500' />
                                        {/* <img src={} alt="" /> */}
                                        <div className='mt-6 grid gap-2'>
                                            <h1 className='text-xl font-bold'>
                                                <Link className="hover:text-orange-400 duration-300" to={`/itemInfo/${menu._id}`}>{menu?.itemName}</Link>
                                            </h1>
                                            <h1 className='text-lg font-medium opacity-90'>{menu?.price[0].price} Tk.</h1>
                                            <h1 className='font-semibold'>  <Rating style={{ maxWidth: 100 }} value={menu?.averageRating} readOnly /></h1>
                                            {!isAdmin && <div className='custom1 grid gap-2 text-xl rounded-md bg-orange-500 text-white p-2 absolute top-10 right-0'><span className='hover:scale-125 '> <button onClick={() => addItemCart({ name: menu?.itemName, size: `${menu.price.length > 1 ? menu?.price[0].size : ''}`, price: menu?.price[0].price, menuID: menu?._id, image: menu?.urls[0], category: menu?.category })}><FaCartPlus /></button></span>
                                                <span className='hover:scale-125 '>{(userEmail && !isAdmin) && <button className={menu?.match ? 'text-red-500' : ''} onDoubleClick={() => {
                                                    addOrDeleteFav(menu._id, userEmail, menu?.match)
                                                    dispatch(setCuisineId(menu?._id))
                                                }}><FaHeart /></button>}</span>
                                            </div>}
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