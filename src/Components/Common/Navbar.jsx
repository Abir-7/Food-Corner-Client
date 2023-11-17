// import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { Authcontext } from '../../AuthProvider/AuthProvider';
import './Navbar.css'
import { FaShoppingCart } from 'react-icons/fa';
import defaultPic from '../../assets/defaultProfile.jpg'
import { useGetAdminQuery, useGetOneUserQuery } from '../../Redux/api/baseApi';
import { useDispatch, useSelector } from 'react-redux';

import bg2 from '../../assets/bg2.jpg'
import { signOut } from 'firebase/auth';
import auth from '../../FirebaseConfig/firebaseConfig';
import { useEffect } from 'react';
import { setSelectedCategory, setSelectedCuisine } from '../../Redux/feature/cartProductSlice/cartProductSlice';
import logo from "../../assets/login2.png"

const Navbar = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { userEmail, userLoading, userImage, userName, iscreateUserError, createUserError, isAdmin, isAdminLoading } = useSelector((state) => state.userProfileSlice)
  //const { data: isAdmin, isLoading: isAdminLoading } = useGetAdminQuery()

  //const { isAdmin, isAdminLoading } = useSelector((state) => state.adminSlice)

  //console.log(isAdmin,userEmail,'check admin')
  // const {  user, loader, logoutUser } = useContext(Authcontext);


  const allNavlink = (
    <div className='flex gap-2 flex-col lg:flex-row lg:gap-10 font-semibold'>
      <Link to="/" className={`underline-on-hover ${location?.pathname === '/' && 'selected'}`} >
        <li>Home</li>
      </Link>
      <Link onClick={() => {
        dispatch(setSelectedCuisine('all'))
        dispatch(setSelectedCategory('all'))
      }} to="/fooditems" className={`underline-on-hover ${location?.pathname === '/fooditems' && 'selected'}`} >
        <li>Menu Items</li>
      </Link>
      <Link to="/contuct" className={`underline-on-hover ${location?.pathname === '/contuct' && 'selected'}`}>
        <li>Contuct Us</li>
      </Link>
    </div>
  );

  return (
    <div className="z-20" style={{ backgroundImage: `url(${bg2})`, backgroundPosition: '20% 60%', backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
      <div className="navbar shadow-lg " >
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu z-50 menu-sm dropdown-content mt-3   p-2 shadow bg-base-100 rounded-box w-40">
              <div className=''>
                {allNavlink}
              </div>
            </ul>
          </div>
          <div className="normal-case mx-3 text-xl flex items-center ">
            <img className='w-[50px]' src={logo} alt="" />
            <h1 className=' font-bold'>Food-Corner</h1>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 ">
            {allNavlink}
          </ul>
        </div>
        <div className="navbar-end z-10 ">

          {/* user profile + logout */}

          {
            userLoading ? <></> : <div>
              {
                userEmail ?
                  <div className="dropdown dropdown-end me-2 ">
                    <div className='btn btn-circle'>
                      <LazyLoadImage
                        alt={'User'}
                        src={userImage || userImage || defaultPic} // use normal <img> attributes as props
                        className='w-[40px] object-cover rounded-full h-[40px]'  />
                    </div>
                    <ul tabIndex={0} className="dropdown-content  shadow-lg  menu p-2 bg-base-100 mt-2 rounded-box w-36">
                      {
                        isAdmin == true && !isAdminLoading ? <li className='font-semibold'><Link to='/dashboard/adminDashboard'>Dashboard</Link></li> : <li className='font-semibold'><Link to='dashboard/userDashboard'>Dashboard</Link></li>
                      }
                      <li className='font-semibold'><Link to='/viewProfile'>View Profile</Link></li>
                      <button onClick={() => signOut(auth)} className="btn outline-none bg-orange-400 border-none hover:bg-orange-500 text-white  duration-500 ">Logout</button>
                    </ul>
                  </div>
                  : <Link className="btn outline-none bg-orange-400 border-none hover:bg-orange-500 text-white  duration-500 " to='/user/login'>Login</Link>
              }
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;