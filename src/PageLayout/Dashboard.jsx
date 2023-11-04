
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';





const Dashboard = () => {
    const dispatch = useDispatch()

    const { userEmail, userLoading, userImage, userName, iscreateUserError, createUserError,isAdmin,isAdminLoading } = useSelector((state) => state.userProfileSlice)



    return (
        <div className='min-h-screen'>
            {isAdminLoading
                ?
                <>
                    <div>
                        <h1>Loading.....</h1>
                    </div>
                </>
                :
                <div className="drawer lg:drawer-open relative">

                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col ">
                        <Outlet />
                        <label htmlFor="my-drawer-2" className="btn absolute top-0 left-0 btn-xs btn-primary drawer-button lg:hidden"><FaArrowRight /></label>
                    </div>
                    <div className="drawer-side ">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay "></label>
                        <ul className="menu p-4 w-60 min-h-full  text-base-content bg-orange-300" >
                            {/* Sidebar content here */}

                            <div>
                                {
                                    isAdmin == true ?
                                        <>
                                            <li className='font-semibold text-white'><Link to='/dashboard/adminDashboard'>Admin DashBord</Link></li>
                                            <li className='font-semibold text-white'><Link to='/dashboard/addMenu'>Add Menu Item</Link></li>
                                            <li className='font-semibold text-white'><Link to='/dashboard/allUser'>Manage Users</Link></li>
                                            <li className='font-semibold text-white'><Link to='/dashboard/pendingOrders'>Pending Orders</Link></li>
                                            <li className='font-semibold text-white'><Link to='/dashboard/completedOrders'>Completed Orders</Link></li>
                                            <li className='font-semibold text-white'><Link to='/'>Home</Link></li>
                                        </>
                                        :
                                        <>
                                            <li><Link to='/dashboard/userDashboard'>User DashBord</Link></li>
                                            <li><Link to='/dashboard/prevOrders'>Pending Order</Link></li>
                                            <li><Link to='/dashboard/completedOrder'>Previous Order</Link></li>
                                            <li><Link to='/'>Home</Link></li>
                                        </>
                                }
                            </div>

                        </ul>
                    </div>
                </div>
            }

        </div>
    );
};

export default Dashboard;