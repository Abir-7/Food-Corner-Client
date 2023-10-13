import React from 'react';
import img1 from '../../assets/LinkBanner.jpg'
const LinkBanner = ({ text }) => {
    return (
        <div className='h-[15vh] ' style={{ backgroundImage: `url(${img1})`, backgroundAttachment: 'fixed' }}>
            <div className="text-center backdrop-blur w-full h-full text-white text-4xl font-bold flex justify-center items-center"><span className='text-gray-900'>{text}</span></div>
        </div>
    );
};

export default LinkBanner;