import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Authcontext } from '../../AuthProvider/AuthProvider';
import './Navbar.css'

const Navbar = () => {

  const { user, loader, logoutUser } = useContext(Authcontext);

  const location=useLocation(
  )
  console.log(location?.pathname)




  const allNavlink = (
    <div className='flex gap-10 font-semibold'>
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
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3  z-50 p-2 shadow bg-base-100 rounded-box w-52">
            <div className=''>
              {allNavlink}
            </div>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {allNavlink}
        </ul>
      </div>
      <div className="navbar-end">
        {
          user?.email ? <button onClick={() => logoutUser()} className='btn btn-primary'>Logout</button> : <Link className='btn' to='/login'>Login</Link>
        }
      </div>
    </div>
  );
};

export default Navbar;