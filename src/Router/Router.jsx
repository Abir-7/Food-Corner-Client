import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Mainpage from "../PageLayout/Mainpage";
import HomePage from "../Pages/Home/HomePage";
import FoodItemPage from "../Pages/FoodItemPage/FoodItemPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import SignupPage from "../Pages/SignupPage/SignupPage";
import PrivetRouts from "./PrivetRouts";
import FoodItemDetails from "../Pages/FoodItemPage/FoodItemDetails";
import CartPage from "../Pages/Cart Page/CartPage";
import UserProfilePage from "../Pages/UserProfilePage/UserProfilePage";
import UpdateProfile from "../Components/ProfilePage/UpdateProfile";




  const router = createBrowserRouter([
    {
      path: "/",
      element: <Mainpage/>,
      children:[
        {
          path:"/",
          element:<HomePage></HomePage>
        },
        {
          path:"/fooditems",
          element:<PrivetRouts><FoodItemPage/></PrivetRouts>
        },
        {
          path:"/login",
          element:<LoginPage/>
        },
        {
          path:"/signup",
          element:<SignupPage/>
        },{
          path:'/itemInfo',
          element:<FoodItemDetails/>
        }
        ,{
          path:'/userCart',
          element:<CartPage/>
        }
        ,{
          path:'/viewProfile',
          element:<UserProfilePage/>
        }
        ,{
          path:'/updateProfile',
          element:<UpdateProfile/>
        }
      ]
    },

  ]);


  export default router;