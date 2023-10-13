import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Authcontext } from '../../AuthProvider/AuthProvider';
import './Navbar.css'
import { FaShoppingCart } from 'react-icons/fa';
import defaultPic from '../../assets/defaultProfile.jpg'
const Navbar = () => {

  const { user, loader, logoutUser } = useContext(Authcontext);

  const location = useLocation(
  )
  console.log(location?.pathname,user)




  const allNavlink = (
    <div className='flex gap-2 flex-col lg:flex-row lg:gap-10 font-semibold'>
      <Link to="/" className={`underline-on-hover ${location?.pathname === '/' && 'selected'}`} >
        <li>Home</li>
      </Link>
      <Link to="/fooditems" className={`underline-on-hover ${location?.pathname === '/fooditems' && 'selected'}`} >
        <li>Menu Items</li>
      </Link>
      <Link to="/about" className={`underline-on-hover ${location?.pathname === '/about' && 'selected'}`}>
        <li>About Us</li>
      </Link>
    </div>
  );

  return (
    <div className="navbar ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3  z-50 p-2 shadow bg-base-100 rounded-box w-40">
            <div className=''>
              {allNavlink}
            </div>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 ">
          {allNavlink}
        </ul>
      </div>
      <div className="navbar-end">

        {/* user profile + logout */}

        {
          user?.email ?
            <div className="dropdown dropdown-end me-2">
             <div className='btn btn-circle'>
             <img tabIndex={0} className='w-[50px] object-cover rounded-full h-[50px]' src={user?.photoURL||defaultPic} alt="" />
             </div>
              <ul tabIndex={0} className="dropdown-content shadow-lg z-[1] menu p-2 bg-base-100 mt-2 rounded-box w-36">
                <li className='font-semibold'><a>View Profile</a></li>
                <button onClick={() => logoutUser()} className='btn btn-sm btn-primary '>Logout</button>
              </ul>
            </div>
            : <Link className='btn' to='/login'>Login</Link>
        }
      </div>
    </div>
  );
};

export default Navbar;