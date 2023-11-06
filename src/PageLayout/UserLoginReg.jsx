import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Common/Navbar';

const UserLoginReg = () => {
    return (
        <div>
            
            <Outlet></Outlet>
        </div>
    );
};

export default UserLoginReg;