import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";




const initialState = {

    isPaymentProcessing:false,

    cardError: '',

    clientSecret: '',
    isClientSecretLoading: true,
    isClientSecretError: false,
    clientSecretError: '',

    transectionID:'',
}


export const paymentIntent = createAsyncThunk('paymentSlice/payment', async ({ price }) => {
    const jwtToken = localStorage.getItem('access-token')
    try {
        const res = await axios.post('https://food-corner-server-lyart.vercel.app/create-payment-intent',
            { price },
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const data = res.data.clientSecret;
        return data;
    } catch (error) {
        // Handle errors here
        console.error('Error creating payment intent:', error);
        //throw error; // You might want to handle this error in your component or middleware
    }
})

// export const savePayment= createAsyncThunk('paymentSlice/savePayment',async(data)=>{
//     try {
//         const res = await axios.post('https://food-corner-server-lyart.vercel.app/savePaymentsa',
//             { data },
//             {
//                 headers: {
//                     'Authorization': `Bearer ${jwtToken}`,
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );

//         const data = res.data;
//         return data;
//     } catch (error) {

//         console.error('Error save payment :', error);
//     }
// })

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setCardError: (state, { payload }) => {
            state.cardError = payload
        },
        setIsPaymentProcessing:(state, { payload }) => {
            state.isPaymentProcessing = payload
        },
        setTransectionID:(state, { payload }) => {
            state.transectionID = payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(paymentIntent.pending, (state) => {
                state.clientSecret = ''
                state.isClientSecretLoading = true
                state.isClientSecretError = false
                state.clientSecretError = ''
            })
            .addCase(paymentIntent.fulfilled, (state, { payload }) => {
                state.clientSecret = payload
                state.isClientSecretLoading = false
                state.isClientSecretError = false
                state.clientSecretError = ''
            })
            .addCase(paymentIntent.rejected, (state, action) => {
                state.clientSecret = ''
                state.isClientSecretLoading = false
                state.isClientSecretError = true;
                state.clientSecretError = action.error.message
            })

    }
})

export const { setCardError, setIsPaymentProcessing,setTransectionID } = paymentSlice.actions

export default paymentSlice.reducer