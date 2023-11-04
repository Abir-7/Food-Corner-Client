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
import UserProfilePage from "../Pages/UserProfilePage/UserProfilePage";
import UpdateProfile from "../Components/ProfilePage/UpdateProfile";
import Dashboard from "../PageLayout/Dashboard";
import UserDashboard from "../Pages/DashboardPages/UserPage/UserDashboard";
import AdminDashboardPage from "../Pages/DashboardPages/AdminPage/AdminDashboardPage";
import AddMenuPage from "../Pages/DashboardPages/AdminPage/AddMenuPage";
import ManageUser from "../Pages/DashboardPages/AdminPage/ManageUser";
import CheckOutPage from "../Pages/CheckOutPage/CheckOutPage";
import PreviousOrders from "../Pages/DashboardPages/UserPage/PreviousOrders/PreviousOrders";
import PendingOrderPage from "../Pages/DashboardPages/AdminPage/PendingOrderPage";
import CompletedOrderPage from "../Pages/DashboardPages/AdminPage/CompletedOrderPage";
import PendingOrders from "../Pages/DashboardPages/UserPage/PendingOrders";




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
        path: '/checkout',
        element: <CheckOutPage />
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
    path: '/dashboard',
    element: <PrivetRouts><Dashboard /></PrivetRouts>,
    children: [
      {
        path: '/dashboard/userDashboard',
        element: <UserDashboard></UserDashboard>
      },
      {
        path: 'prevOrders',
        element:  <PendingOrders/>
      },
      {
        path: 'completedOrder',
        element: <PreviousOrders/>
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
      {
        path: 'pendingOrders',
        element: <PendingOrderPage/>
      },
      {
        path: 'completedOrders',
        element: <CompletedOrderPage/>
      },
    ]
  }


]);


export default router;