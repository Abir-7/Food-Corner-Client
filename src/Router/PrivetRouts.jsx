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





  if (userLoading) {
    return <div className="flex items-center  justify-center h-[70vh]"><span className="loading loading-ring loading-lg"></span></div>
  }
  else {

    //console.log(userLoading,userEmail)

    if (userEmail) {
      return children
    }
    else{
      return <Navigate to='/user/login' state={{ from: location }} replace></Navigate>
    }
  }


};

export default PrivetRouts