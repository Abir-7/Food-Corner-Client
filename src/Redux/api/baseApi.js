import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'



  const baseApi= createApi({
    
    reducerPath:"api",
    baseQuery: fetchBaseQuery({
      baseUrl:'http://localhost:4000',
      tagTypes:['User','Menu','Payment'],
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
        query:()=>({
          url:'/getMenu',
          //headers: authHeaders,
        }),
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

      

    })
})

export const {useGetUserQuery,useGetAdminQuery,useUpdateUserProfilesMutation,useGetOneUserQuery,useAddMenuItemMutation,useGetMenuItemQuery,useGetSingleMenuItemQuery,useAddFavouriteMenuItemMutation,useDeleteFavouriteMenuItemMutation,useSavePaymentInfoMutation,useGetOrderInfoQuery,useModifyOrderStatusMutation,useGetOrderItemPercentQuery,useGetThaiCuisineQuery} = baseApi;
export default baseApi;
