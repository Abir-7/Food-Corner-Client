import React from 'react';
import Navbar from '../Components/Common/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Common/Footer';

const Mainpage = () => {
    return (
        <div className='max-w-[1900px] mx-auto '>
            <div className=' w-full z-40 '>
                <Navbar />
            </div>
            <div className='min-h-[70vh]'>
                <Outlet />
            </div>
            <Footer />

        </div>
    );
};

export default Mainpage;