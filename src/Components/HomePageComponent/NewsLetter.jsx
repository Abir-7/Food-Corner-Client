import React from 'react';
import img1 from '../../assets/news.png'
import img2 from '../../assets/salad.png'
import img3 from '../../assets/pizza.png'
import './NewsLetter.css'
const NewsLetter = () => {

    return (
<div className='flex justify-between '>
<div className='grid  grid-cols-1 md:grid-cols-3 gap-5  w-full items-center mx-2 md:mx-8'>
            <div className=' custom5 flex justify-center md:justify-start'>
                <img className='  md:w-[410px] md:h-[400px] ' src={img2} alt="" />
            </div>
            <div className='w-full flex flex-col items-center'>
               <div>
               <img className='w-[250px] mx-auto' src={img1} alt="" />
               <h1 className=' text-3xl md:text-4xl text-center mb-3 font-bold'>Get <span className='text-orange-400  '>10%</span> off your order!</h1>
               <p className='mb-5'>Enter your email and receive a 10% discount on your next order!</p>
               </div>
                <div className='flex   w-full mx-2'>
                <input type="text" placeholder="Type here" className="input input-bordered focus:outline-none  w-full " />
                <button className='bg-primary hover:bg-success duration-500 text-white px-2 rounded-r-lg  -ms-2 '><span className='font-semibold'>Subscribe</span></button>
                </div>
            </div>
            <div className='flex justify-center md:justify-end '>
                <img className='w-[400px] h-[500px]  ' src={img3} alt="" />
            </div>

        </div>
</div>

    );
};

export default NewsLetter;