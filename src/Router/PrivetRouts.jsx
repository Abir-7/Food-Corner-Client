import { Navigate, useLocation } from "react-router-dom";
// import { Authcontext } from "../AuthProvider/AuthProvider";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, setLoading, setUsers } from "../Redux/feature/updateProfileSlice/userProfileSlice";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../FirebaseConfig/firebaseConfig";



const PrivetRouts = ({ children }) => {
  const location = useLocation();
  const dispatch=useDispatch()
  const {userEmail,userLoading, userImage}=useSelector((state)=>state. userProfileSlice)


  // useEffect(()=>{

  //   const unsubcribe =  onAuthStateChanged(auth, (user) => {
  //     dispatch(setLoading(true))
  //     if (user) {
  //       dispatch(setUsers({
  //         email:user?.email,
  //         image:user?.photoURL,
  //         name:user?.name
  //       }))
  //       dispatch(setLoading(false))
  //     } else {

  //       dispatch(removeUser())

  //       dispatch(setLoading(false))
  //     }
  //   });
  //   return () => { unsubcribe() }
  // },[])



  if (userLoading) {
    return <progress className="progress "></progress>
  }
  else {

    console.log(userLoading,userEmail)

    if (userEmail) {
      return children
    }
    else{
      return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }
  }


};

export default PrivetRouts