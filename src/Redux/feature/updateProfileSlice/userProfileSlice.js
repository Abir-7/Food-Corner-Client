import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import auth from "../../../FirebaseConfig/firebaseConfig"
import axios from "axios"




const initialState = {
    userName: '',
    userEmail: '',
    userLoading: true,
    userImage: null,
    iscreateUserError: false,
    createUserError: '',
    mobile: '',
    address: '',

}


export const createUser = createAsyncThunk('userProfileSlice/createUser', async ({ email, password, name, mobile }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(auth.currentUser, {
        displayName: name, photoURL: null
    })

    const res = await fetch('http://localhost:4000/users', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ email: data?.email.toLowerCase(), name: data?.name, mobile: data?.mobile, role: 'user' })
    })

    const data2 = res.json()

    console.log(data2)

    return { email: data.user.email, name: data.user.displayName }
})



const userProfileSlice = createSlice({
    name: 'updateProfile',
    initialState,
    reducers: {
        setUsers: (state, { payload }) => {
            state.userEmail = payload.email
            state.userImage = payload.image
            state.userName = payload.name
        },
        updateUsers: (state, { payload }) => {
            state.userName = payload.name
            state.mobile = payload.mobile
            state.address = payload.address
        },
        removeUser: (state) => {
            state.userEmail = ''
            state.userImage = null
            state.userName = ''
        },
        setImage: (state, { payload }) => {
            state.userImage = payload
        },
        setLoading: (state, { payload }) => {
            state.userLoading = payload
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.userName = '';
                state.userEmail = '';
                state.userLoading = true;
                state.userImage = null;
                state.iscreateUserError = false;
                state.createUserError = '';
            })
            .addCase(createUser.fulfilled, (state, { payload }) => {
                state.userName = payload.name;
                state.userEmail = payload.email;
                state.userLoading = false;
                state.userImage = payload.photoURL;
                state.iscreateUserError = false;
                state.createUserError = '';
            })
            .addCase(createUser.rejected, (state, action) => {
                state.userName = '';
                state.userEmail = '';
                state.userLoading = false;
                state.userImage = null;
                state.iscreateUserError = true;
                state.createUserError = action.error.message;
            })
       
    },

})

export const { setUsers, removeUser, setImage, setLoading, updateUsers } = userProfileSlice.actions

export default userProfileSlice.reducer