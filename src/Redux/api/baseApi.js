import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'



  const baseApi= createApi({
    
    reducerPath:"api",
    baseQuery: fetchBaseQuery({
      baseUrl:'http://localhost:4000',
      tagTypes:['User','Menu','Payment','Reviews','Feedback'],
      prepareHeaders: (headers, { getState }) => {
        const token = `Bearer ${localStorage.getItem('access-token') }`
        if (token) {
          headers.set('Authorization', token);
        }
        return headers;
      },
  }),
    endpoints:(builder)=>({

       getUser: builder.query({  //get all user
        query:()=>({
          //headers: authHeaders,
          url:'/users'}),
          providesTags:['User'],
       }),

       getOneUser: builder.query({  // get user by email
        query:()=>({
         // headers: authHeaders,
          url:'/singleUsers',
        }),
        invalidatesTags:['User'],
       }),

       updateUserProfiles: builder.mutation({  // update user profile
        query: ({ email, data3 }) => ({
          url: '/userUpdate',
          method: 'PATCH',
          //headers: authHeaders,
          body: data3,
        }),
        invalidatesTags:['User'],
      }),

       getAdmin: builder.query({   //verify admin
        query:()=>({
         //headers: authHeaders,
          url:`/user/admin`
        }),
          invalidatesTags:['User'],
       }),

       addMenuItem: builder.mutation({   //add menu
        query:(data3)=>({
          url:'/addMenu',
          //headers: authHeaders,
          method: 'POST',
          body: data3,
        }),
        invalidatesTags:['Menu'],
       }),

       getMenuItem: builder.query({   //get menu
        query:(name)=>({
          url:`/getMenu?name=${name}`,
          //headers: authHeaders,
        }),
        invalidatesTags:['Menu'],
        providesTags:['Menu'],
       }),

       getThaiCuisine: builder.query({   // get thai cuisine
        query:()=>({
          url:'/thaiCuisine',
          //headers: authHeaders,
        }),
        providesTags:['Menu'],
       }),

       getSingleMenuItem: builder.query({   // get single menu
        query:(id)=>({
          url:`/getMenu/${id}`,
          //headers: authHeaders,
        }),
        invalidatesTags:['Menu'],
       }),

       getSimilarMenuItem: builder.query({   // get single menu
        query:(category)=>({
          url:`/getMenu/${category}`,
          //headers: authHeaders,
        }),
        providesTags:['Menu'],
       }),

       addFavouriteMenuItem: builder.mutation({   //add favourite menu
        query:(menuData)=>({
          url:'/addFavMenu',
          //headers: authHeaders,
          method: 'POST',
          body:menuData ,
        }),
        invalidatesTags:['Menu'],
       }),

       savePaymentInfo: builder.mutation({   //save payment info
        query:(info)=>({
          url:'/savePayment',
       // headers: authHeaders,
          method: 'POST',
          body:info,
        }),
        invalidatesTags:['Payment'],
       }),

       getOrderInfo: builder.query({   // get single menu
        query:(email)=>({
          url:`/getOrderInfo/${email}`,
          //headers: authHeaders,
        }),
        providesTags:['Payment'],
       }),

       modifyOrderStatus: builder.mutation({   //modify Order Status
        query:(info)=>({
          url:'/modifyOrderStatus',
       // headers: authHeaders,
          method: 'PATCH',
          body:{status:info.status,paymentID:info.paymentID,userEmail:info.email},
        }),
        invalidatesTags:['Payment'],
       }),

       getOrderItemPercent: builder.query({   // get item percent
        query:()=>({
          url:'/orderItemPercent',
          //headers: authHeaders,
        }),
        providesTags:['Payment'],
       }),

       addReviews: builder.mutation({   //add reviews
        query:(info)=>({
          url:'/addReviews',
       // headers: authHeaders,
          method: 'POST',
          body:{menuID:info.selectedValue,email:info.userEmail,rating:info.rating,reviewMessage:info.reviewMessage,paymentId:info.paymentId},
        }),
        invalidatesTags:['Reviews'],
       }),

       addFeedback: builder.mutation({   //add FeedBack
        query:(info)=>({
          url:'/addFeedback',
       // headers: authHeaders,
          method: 'POST',
          body:{userEmail:info.userEmail,rating:info.rating,feedback:info.reviewMessage,userImage:info.userImage,useName:info.userImage},
        }),
        invalidatesTags:['Feedback'],
       }),

       getReviews: builder.query({   // get item percent
        query:(id)=>({
          url:`/getReviews/${id}`,
          //headers: authHeaders,
        }),
        providesTags:['Reviews'],
       }),

       getFeedback: builder.query({   // get item percent
        query:()=>({
          url:`/getFeedback`,
          //headers: authHeaders,
        }),
        providesTags:['Feedback'],
       }),

       shopFavourite: builder.query({   // shop Favourite
        query:()=>({
          url:`/shopOurFav`,
          //headers: authHeaders,
        }),
        providesTags:['Menu'],
       }),


    })
})

export const {useGetUserQuery,useGetAdminQuery,useUpdateUserProfilesMutation,useGetOneUserQuery,useAddMenuItemMutation,useGetMenuItemQuery,useGetSingleMenuItemQuery,useAddFavouriteMenuItemMutation,useSavePaymentInfoMutation,useGetOrderInfoQuery,useModifyOrderStatusMutation,useGetOrderItemPercentQuery,useGetThaiCuisineQuery, useAddReviewsMutation,useGetReviewsQuery,useShopFavouriteQuery,useAddFeedbackMutation,useGetFeedbackQuery,useGetSimilarMenuItemQuery} = baseApi;
export default baseApi;
