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
import Dashboard from "../PageLayout/Dashboard";
import UserDashboard from "../Pages/DashboardPages/UserPage/UserDashboard";
import AdminDashboardPage from "../Pages/DashboardPages/AdminPage/AdminDashboardPage";
import AddMenuPage from "../Pages/DashboardPages/AdminPage/AddMenuPage";
import ManageUser from "../Pages/DashboardPages/AdminPage/ManageUser";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpage />,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>
      },
      {
        path: "/fooditems",
        element: <FoodItemPage />
      },
      {
        path: '/itemInfo/:id',
        element: <FoodItemDetails />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/signup",
        element: <SignupPage />
      }
      , {
        path: '/userCart',
        element: <CartPage />
      }
      , {
        path: '/viewProfile',
        element: <UserProfilePage />
      }
      , {
        path: '/updateProfile',
        element: <UpdateProfile />
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivetRouts><Dashboard /></PrivetRouts>,
    children: [
      {
        path: 'userDashboard',
        element: <UserDashboard></UserDashboard>
      },
      {
        path: 'adminDashboard',
        element: <AdminDashboardPage></AdminDashboardPage>
      },
      {
        path: 'addMenu',
        element: <AddMenuPage />
      },
      {
        path: 'allUser',
        element: <ManageUser />
      },
    ]
  }


]);


export default router;