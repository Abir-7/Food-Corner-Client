import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const authHeaders= {
  Authorization: `Bearer ${localStorage.getItem('access-token') || ''}`
};

  const baseApi= createApi({
    
    reducerPath:"api",
    baseQuery: fetchBaseQuery({
      baseUrl:'http://localhost:4000',
      tagTypes:['User','Menu'],
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
         // headers: authHeaders,
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
       getSingleMenuItem: builder.query({   // get single menu
        query:(id)=>({
          url:`/getMenu/${id}`,
          //headers: authHeaders,
        }),
        providesTags: (result, error, id) => [{ type: 'getMenu', id }],
        invalidatesTags:['Menu'],
       }),




    })

})






export const {useGetUserQuery,useGetAdminQuery,useUpdateUserProfilesMutation,useGetOneUserQuery,useAddMenuItemMutation,useGetMenuItemQuery,useGetSingleMenuItemQuery} = baseApi;
export default baseApi;
