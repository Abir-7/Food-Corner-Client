import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { data } from 'autoprefixer';

const authHeaders = {
  Authorization: `Bearer ${localStorage.getItem('access-token') || ''}`
};

  const baseApi= createApi({
    
    reducerPath:"api",
    baseQuery: fetchBaseQuery({
      baseUrl:'http://localhost:4000',
      tagTypes:['User']
  }),
    endpoints:(builder)=>({

       getUser: builder.query({
        query:()=>({
          headers: authHeaders,
          url:'/users'}),
          invalidatesTags:['User'],
       }),
       getOneUser: builder.query({
        query:(email)=>({
          headers: authHeaders,
          url:`/users/${email}`,
        }),
        invalidatesTags:['User'],
       }),
       updateUserProfiles: builder.mutation({
        query: ({ email, data3 }) => ({
          url: `/userUpdate/${email}`,
          method: 'PATCH',
          headers: authHeaders,
          body: data3,
        }),
        invalidatesTags:['User'],
      }),
      
       getAdmin: builder.query({
        query:(email)=>({
          headers: authHeaders,
          url:`/users/admin/${email}`}),
          invalidatesTags:['User'],
       }),
  
    })
})

export const {useGetUserQuery,useGetAdminQuery,useUpdateUserProfilesMutation,useGetOneUserQuery} = baseApi;
export default baseApi;
