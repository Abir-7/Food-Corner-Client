import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const authHeaders = {
  Authorization: `Bearer ${localStorage.getItem('access-token') || ''}`
};

  const baseApi= createApi({
    
    reducerPath:"api",
    baseQuery: fetchBaseQuery({
      baseUrl:'http://localhost:4000',
  }),
    endpoints:(builder)=>({

       getUser: builder.query({
        query:()=>({
          headers: authHeaders,
          url:'/users'}),
          keepUnusedDataFor: 2,
       }),
       getAdmin: builder.query({
        query:(email)=>({
          headers: authHeaders,
          url:`/users/admin/${email}`}),
          keepUnusedDataFor: 2,
       }),
    })
})

export const {useGetUserQuery,useGetAdminQuery} = baseApi;
export default baseApi;
