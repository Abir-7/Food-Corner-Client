import React, { useEffect } from 'react';
import Navbar from '../Components/Common/Navbar';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Components/Common/Footer';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { showCartSlide } from '../Redux/feature/cartProductSlice/cartProductSlice';
import ProductCart from '../Components/ProductCart/ProductCart';

const Mainpage = () => {

    const { itemNumber, option, isShowReviews, isCartSlideOpen, cartItem, totalPrice, discountOffer } = useSelector((state) => state.cartProductSlice)
    const dispatch = useDispatch()

    return (
        <div className='max-w-[1900px] mx-auto  '>
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
                    <button onClick={() => dispatch(showCartSlide(true))} className="p-3 text-lg hover:scale-90 hover:text-orange-100 duration-500"><FaShoppingCart></FaShoppingCart></button>
                </div>
                <div className="indicator text-white ">
                    <span className="indicator-item badge badge-success bg-green-600  text-xs font-medium text-white">99+</span>
                    <button className="p-3 text-lg hover:scale-90 hover:text-orange-100 duration-500"><FaHeart /></button>
                </div>
            </div>





            {isCartSlideOpen &&
             
             <ProductCart ></ProductCart>

            }
        </div>
    );
};

export default Mainpage;