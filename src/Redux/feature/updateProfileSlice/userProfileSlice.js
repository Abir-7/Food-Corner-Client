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
    isUserInfoLoading: true,
    isInfoError: false,
    infoError: '',

    isAdmin: '',
    isAdminLoading: true,
    isAdminError: false,
    adminError: ''

}


export const createUser = createAsyncThunk('userProfileSlice/createUser', async ({ email, password, name, mobile }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(auth.currentUser, {
        displayName: name, photoURL: null
    })

    const res = await fetch('https://food-corner-server-lyart.vercel.app/users', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ email: data?.email.toLowerCase(), name: data?.name, mobile: data?.mobile, role: 'user' })
    })

    const data2 = res.json()

    //console.log(data2)

    return { email: data.user.email, name: data.user.displayName }
})

export const userInfo = createAsyncThunk('userProfileSlice/userInfo', async ( email ) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
    }
    const res = await fetch(`https://food-corner-server-lyart.vercel.app/singleUsers/${email}`, config)
    const data = await res.json()

    //console.log(data,'user mobile address')

    return { address: data?.address, mobile: data?.mobile }
})


export const checkAdmin = createAsyncThunk('userProfileSlice/checkAdmin', async () => {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
    }

    try {
        const res = await axios.get('https://food-corner-server-lyart.vercel.app/user/admin',config);
        const data = res.data;
        //console.log(data, 'check admin',res)
        return {data};
  
    } catch (error) {
        //console.log(error.response.data.isAdmin,'slice')
        return {data:error.response.data.isAdmin}
    }

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
            state.address=''
            state.mobile=''
            state.isAdmin=''
        },
        setImage: (state, { payload }) => {
            state.userImage = payload
        },
        setLoading: (state, { payload }) => {
            state.userLoading = payload
            state.isUserInfoLoading=payload
            state.isAdminLoading=payload
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

            .addCase(userInfo.pending, (state) => {
                state.mobile = ''
                state.address = ''
                state.isUserInfoLoading = true
                state.isInfoError = false
                state.infoError = ''
            })
            .addCase(userInfo.fulfilled, (state, { payload }) => {
                state.mobile = payload.mobile
                state.address = payload.address
                state.isUserInfoLoading = false
                state.isInfoError = false
                state.infoError = ''
            })
            .addCase(userInfo.rejected, (state, action) => {
                state.mobile = ''
                state.address = ''
                state.isUserInfoLoading = false
                state.isInfoError = true
                state.infoError = action.error.message
            })

            .addCase(checkAdmin.pending, (state) => {
                state.isAdmin = null
                state.isAdminLoading = true
                state.isAdminError = false
                state.adminError = ''
            })
            .addCase(checkAdmin.fulfilled, (state, { payload }) => {
                state.isAdmin = payload.data
                state.isAdminLoading = false
                state.isAdminError = false
                state.adminError = ''
            })
            .addCase(checkAdmin.rejected, (state, action) => {
                state.isAdmin = null
                state.isAdminLoading = false
                state.isAdminError = true
                state.adminError = action.error.message
            })

    },

})

export const { setUsers, removeUser, setImage, setLoading, updateUsers } = userProfileSlice.actions

export default userProfileSlice.reducer