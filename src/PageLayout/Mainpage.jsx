import React, { useEffect } from 'react';
import Navbar from '../Components/Common/Navbar';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Components/Common/Footer';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { showCartSlide, showFavouriteSlide } from '../Redux/feature/cartProductSlice/cartProductSlice';
import ProductCart from '../Components/ProductCart/ProductCart';
import FavaouriteMenuList from '../Components/FavaouriteMenuList/FavaouriteMenuList';
import { getFavMenuData, isFavMenu, setFavDeleteSuccess } from '../Redux/feature/menuDetailsSlice/menuDetailsSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Mainpage = () => {

    const { itemNumber, option, isShowReviews, isCartSlideOpen, cartItem, totalPrice, discountOffer, isFavouriteSlideOpen } = useSelector((state) => state.cartProductSlice)
    const dispatch = useDispatch()


    const { userEmail, userLoading, userImage, userName, iscreateUserError, createUserError } = useSelector((state) => state.userProfileSlice)

    const { index, menuID, itemName, isLoading, ingredients, category, time, cuisine, price: allPriceSize, urls, isMenuError, menuError, isFavourite, isFavouriteLoading, favouriteMenuData, isFavouritemenuDataLoading, isFavouriteMenuDataError, favouriteMenuDataError, isDeleteFavLoading, isDeleteFavSuccess } = useSelector((state) => state.menuDetailsSlice)



    useEffect(() => {

        if (!userLoading && userEmail) {
            dispatch(getFavMenuData(userEmail))
        }
    }, [userLoading, isFavouriteLoading, isDeleteFavLoading,])

    useEffect(() => {

        if (isDeleteFavSuccess) {
            toast.warning('Remove From Favourite')
            dispatch(setFavDeleteSuccess(null))
            dispatch(getFavMenuData(userEmail))
        }

    }, [isDeleteFavSuccess,userLoading])


    return (
        <div className='max-w-[1900px] mx-auto  '>
          <ToastContainer/>
            <div className=' w-full z-40 '>
                <Navbar />
            </div>
            <div className='min-h-[70vh]'>
                <Outlet />
            </div>
            <Footer />

            <div className='top-20 fixed flex flex-col gap-2 bg-orange-400 rounded-xl '>
                <div className="indicator text-white  ">
                    <span className="indicator-item badge badge-warning text-xs font-medium text-white">{cartItem?.length}</span>
                    <button onClick={() => {
                        dispatch(showCartSlide(true))
                        dispatch(showFavouriteSlide(false))
                    }} className="p-3 text-lg hover:scale-90 hover:text-orange-100 duration-500"><FaShoppingCart></FaShoppingCart></button>
                </div>
                <div className="indicator text-white ">
                    <span className="indicator-item badge badge-success bg-green-600  text-xs font-medium text-white">{favouriteMenuData?.length}</span>
                    <button onClick={() => {
                        dispatch(showCartSlide(false))
                        dispatch(showFavouriteSlide(true))
                    }} className="p-3 text-lg hover:scale-90 hover:text-orange-100 duration-500"><FaHeart /></button>
                </div>
            </div>

            {isCartSlideOpen &&
                <ProductCart />
            }
            {isFavouriteSlideOpen &&
                <FavaouriteMenuList isDeleteFavSuccess={isDeleteFavSuccess} favouriteMenuData={favouriteMenuData} />
            }
        </div>
    );
};

export default Mainpage;