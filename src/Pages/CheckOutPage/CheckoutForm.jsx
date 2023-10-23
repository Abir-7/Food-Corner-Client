import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { paymentIntent, setCardError, setIsPaymentProcessing, setTransectionID } from '../../Redux/feature/PaymentSlice/PaymentSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useSavePaymentInfoMutation } from '../../Redux/api/baseApi';




const CheckoutForm = ({ totalPrice, cartItem }) => {


  const dispatch = useDispatch()
  const { cardError, clientSecret, isClientSecretLoading, isClientSecretError, clientSecretError, isPaymentProcessing, transectionID } = useSelector(state => state.paymentSlice)

  const { userEmail, userLoading, userImage, userName, iscreateUserError, createUserError } = useSelector((state) => state.userProfileSlice)
  const [savePaymentInfo, { data, isLoading, isSuccess }] = useSavePaymentInfoMutation()
  const stripe = useStripe()
  const elements = useElements()


  console.log(cardError, clientSecret, isClientSecretLoading, isClientSecretError, clientSecretError, totalPrice, '[[[]]]]')
  useEffect(() => {

   if(!userLoading){
    dispatch(paymentIntent({ price: totalPrice }))
   }

  }, [totalPrice, isPaymentProcessing,userLoading])

  useEffect(()=>{
    dispatch(setTransectionID(''))
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(setCardError(''))
    if (!stripe || !elements) {
      return
    }

    const card = elements.getElement(CardElement)

    if (card === null) {
      return
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      dispatch(setCardError(error.message))
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }

    dispatch(setIsPaymentProcessing(true))

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: userName || 'anonymouse',
            email: userEmail,
          },
        },
      },
    );

    if (confirmError) {
      dispatch(setCardError(confirmError.message))
      console.log(confirmError, 'confirm error')
    }
    else {
      dispatch(setIsPaymentProcessing(false))
      console.log(paymentIntent, 'intent')
      if (paymentIntent.status === 'succeeded') {
        const paymentID = paymentIntent.id
        dispatch(setTransectionID(paymentID))
        savePaymentInfo({ userEmail: userEmail, paymentID: paymentID, cartItem, totalPrice })

      }

    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Payment Successfull')
    }
  }, [isSuccess])

  return (
    <div className='w-2/3 mx-auto mt-5'>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <CardElement
          className='border-2 p-3 rounded-lg'
          options={{
            style: {
              base: {
                fontSize: '20px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <div className='flex justify-center'>
          <button className='btn btn-sm w-1/3 mt-4 bg-orange-400 text-white hover:bg-orange-500' type="submit" disabled={!stripe || !clientSecret || isPaymentProcessing}>
            Pay
          </button>
        </div>
        <p className='text-center text-red-500'>{cardError}</p>
        {transectionID && <p className='text-center text-green-500 mt-4'><span className='text-orange-400 font-bold'>Transection ID: </span> {transectionID}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;