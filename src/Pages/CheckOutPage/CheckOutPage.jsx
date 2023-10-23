import React from 'react';
import LinkBanner from '../../Components/Common/LinkBanner';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';

const CheckOutPage = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_stripe_PK)
    const { itemNumber, option, isShowReviews, isCartSlideOpen, cartItem, totalPrice, discountOffer } = useSelector((state) => state.cartProductSlice)
    const finalPrice = parseFloat(totalPrice - discountOffer).toFixed(2)

    console.log(finalPrice)

    return (
        <div>
            <LinkBanner text='Checkout Page'></LinkBanner>
       {
        finalPrice==0?
        <div>
            <h1 className='text-center'>Add Atlest One Item in Cart</h1>
        </div>:
        <div>
        <Elements stripe={stripePromise}>
        <CheckoutForm totalPrice={finalPrice} cartItem={cartItem}></CheckoutForm>
        </Elements>
      </div>
       }
        </div>
    );
};

export default CheckOutPage;