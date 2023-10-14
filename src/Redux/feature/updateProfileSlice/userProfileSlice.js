import { createSlice } from "@reduxjs/toolkit"

const initialState={
    userImage:null,
    userName:'',
    userEmail:'',
    mobile:'',
    address:'',

}

const userProfileSlice=createSlice({
    name:'updateProfile',
    initialState,
    reducers:{
        setUsers:(state,{payload})=>{
           state.userImage=payload
        },

        removeUser:(state)=>{
            state.userName=''
            state.userImage=''
            state.userEmail=''
            state.mobile=''
            state.address=''
        }
    }
})

export  const { setUsers,removeUser}=userProfileSlice.actions

export default userProfileSlice.reducer