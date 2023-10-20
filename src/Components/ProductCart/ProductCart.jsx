import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FaArrowRight, FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { cartTotalPrice, modifyCart, removeCartItem, showCartSlide } from '../../Redux/feature/cartProductSlice/cartProductSlice';
import { Link } from 'react-router-dom';
const ProductCart = () => {
    const { itemNumber, option, isShowReviews, isCartSlideOpen, cartItem, totalPrice, discountOffer } = useSelector((state) => state.cartProductSlice)
    const dispatch = useDispatch()
    
    const discountPriceAmmount = 1000 ///discount
    const discountPercent = 5

    useEffect(() => {
        dispatch(cartTotalPrice({price:discountPriceAmmount,discount:discountPercent}))
    }, [cartItem,discountPriceAmmount,discountPercent,totalPrice])

    const finalPrice = totalPrice - discountOffer
console.log(cartItem,'------------------------------cart')
    return (
        <div className='min-h-[400px] max-h-screen w-96 fixed top-0 right-0 z-10 shadow-2xl backdrop-blur-2xl backdrop-brightness-50 overflow-auto rounded-xl'>
        <div className='bg-orange-400 sticky top-0 flex items-center justify-center p-2 rounded-xl'>
            <div className='flex items-center flex-col'>
                <h1 className='text-center font-bold text-white text-2xl'>Your Cart</h1>
                {/* <div className='flex items-center hover:underline underline-offset-2'>
                    <Link to='/userCart' className='text-white  font-semibold  duration-500' onClick={() => dispatch(showCartSlide(false))}>Details</Link>
                    <p className='text-sm text-white mt-0.5'><FaArrowRight></FaArrowRight></p>
                </div> */}
            </div>
            <button onClick={() => dispatch(showCartSlide(false))} className='absolute right-5 font-medium text-white hover:font-bold hover:text-red-600 duration-500'>X</button>
        </div>

        <div className='m-2 text-white '>
            {
                cartItem?.map((item, index) => <div key={index} className='p-2 border border-orange-400 mt-2 rounded-xl'>
                    <div>
                        <div className='flex gap-3'>
                            <img className='w-[50px] rounded-lg h-[50x]' src={item?.image} alt="" />
                            <div className='w-full'>
                              <div className='flex justify-between w-100'>
                              <p><span className='text-orange-400'>Name:</span> {item.name}</p>
                              <button onClick={()=>dispatch(removeCartItem({name:item?.name,size:item?.size}))} className='btn btn-xs bg-orange-400 border-none mb-1'><FaTrashAlt/></button>
                              </div>
                               <div className='flex justify-between'>
                               <p><span className='text-orange-400'>Categoty:</span>{item?.category}</p>
                                <p><span className='text-orange-400'>Size:</span> {item?.size=='reguler'?"Reguler":`${item?.size}"` }</p>
                               </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='flex gap-2 text- mt-2'>
                                <button onClick={()=>dispatch(modifyCart({action:'plus',name:item.name}))} className='btn btn-xs bg-orange-400 border-none '><FaMinus /></button>
                                <h1 className='text-lg'>{item.amount}</h1>
                                <button  onClick={()=>dispatch(modifyCart({action:'minus',name:item.name}))} className='btn btn-xs bg-orange-400 border-none '><FaPlus /></button>
                            </div>
                            <h1><span className='text-orange-400 font-medium'>Price:</span> {parseInt(item.price) * parseInt(item.amount)} tk</h1>

                        </div>
                    </div>
                </div>)
            }
    {       cartItem.length > 0 &&     <div className='mt-2'>
                <h1 className='text-right font-semibold mx-2'><span className='text-orange-400'>Total Price: </span>{totalPrice} Tk</h1>

                <h1 className='text-right font-semibold mx-2'><span className='text-orange-400'>Discount: </span>{discountOffer} Tk</h1>
                <hr />
                <h1 className='text-right font-semibold mx-2'><span className='text-orange-400'>Final Price: </span>{finalPrice} Tk</h1>
            </div>}
        </div>
    </div>
    );
};

export default ProductCart;