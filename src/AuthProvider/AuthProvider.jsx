import React, { createContext, useEffect, useState } from 'react';

import axios from 'axios';




import { useDispatch, useSelector } from 'react-redux';
import { checkAdmin, removeUser, setLoading, setUsers, userInfo } from '../Redux/feature/updateProfileSlice/userProfileSlice';
import auth from '../FirebaseConfig/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';





export const Authcontext = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);



    const dispatch = useDispatch()

    // //////////Create User////////
    // const createUser = (email, password) => {
    //     //console.log(email, password)
    //     setLoader(true)
    //     return createUserWithEmailAndPassword(auth, email, password);
    // }
    // ///////////Update Name////////
    // const updateUserProfile = (name, photourl) => {
    //     return updateProfile(auth.currentUser, {
    //         displayName: `${name}`, photoURL: `${photourl}`
    //     })
    // }
    // ///////////loginUser/////////
    // const loginUser = (email, password) => {
    //     setLoader(true)
    //     return signInWithEmailAndPassword(auth, email, password);
    // }

    // /////////google login//////
    // const g_provider = new GoogleAuthProvider();
    // const googleSignin = () => {
    //     setLoader(true)
    //     return signInWithPopup(auth, g_provider)
    // }

    // ////////////logOut////////////
    // const logoutUser = () => {

    //     signOut(auth)
    // }

    ///////////////Observer//////////////
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (loguser) => {
            dispatch(setLoading(true))
            setUser(loguser);
            //console.log(loguser, 'auth changed obseve')
            if (loguser) {
                setLoader(false)
                axios.post('https://food-corner-server-lyart.vercel.app/jwt', { email: loguser.email })
                    .then(data => {
                        localStorage.setItem('access-token', data.data.token)
                        dispatch(setUsers({ email: loguser.email, name: loguser.displayName, image: loguser.photoURL }))
                        dispatch(userInfo(loguser.email))
                        dispatch(checkAdmin(loguser.email))
                        dispatch(setLoading(false))
                    })

            }
            else {
                localStorage.removeItem('access-token')
                setLoader(false)
                dispatch(removeUser())
                dispatch(setLoading(false))
            }

        });


        return () => { unsubcribe() };
    }, [])



    const authinfo = {
        user,
        loader,
    };

    return (
        <Authcontext.Provider value={authinfo}>
            <>
                {children}
            </>
        </Authcontext.Provider>
    );
};

export default AuthProvider;