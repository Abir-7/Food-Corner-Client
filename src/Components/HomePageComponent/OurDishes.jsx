import React from 'react';
import img1 from '../../assets/food.png'
import './OurDishes.css'
import { FaCartPlus, FaHeart } from 'react-icons/fa'
const OurDishes = () => {
    return (
        <div className='container mx-auto my-10'>
            <div className='flex justify-center items-center'>
                <div className='grid md:grid-cols-4 items-center gap-10 md:gap-20 mx-5'>
                    <div className='' >
                        <h1 className='texl-lg font-semibold'>Thai Cuisin</h1>
                        <h1 className='text-5xl font-bold '>Our Dishes</h1>
                    </div>
                    <div className='md:col-span-2'>
                        <p className='texl-lg '>Embark on a Thai Taste Odyssey!Immerse yourself in the vibrant flavors of Thailand, where every dish is a harmonious blend of sweet, spicy, and savory delights.</p>
                    </div>
                    <div className='texl-xl text-right '>
                        LEARN MORE
                    </div>
                </div>
            </div>

            <div className='flex justify-center '>
                <div className='grid gap-10 md:gap-10 lg:gap-[80px]  mx-2 grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-10'>
                    <div className='  custom0 flex flex-col  relative p-5 border-b-4  rounded-xl md:border-b-0'>
                        <img className=' max-w-[250px] md:max-w-[200px] hover:scale-125 duration-500' src={img1} alt="" />
                        <div className='mt-6 grid gap-2'>
                            <h1 className='text-xl font-bold'>Fried Rice</h1>
                            <h1 className='text-lg font-medium opacity-90'>Price 15.00 Tk</h1>
                            <h1 className='font-semibold'>Rating: *****</h1>
                            <div className='custom1 grid gap-5 text-xl rounded-md bg-orange-500 text-white p-2 absolute top-10 right-0'><span className='hover:scale-125 '><FaCartPlus /></span>
                                <span className='hover:scale-125 '><FaHeart /></span>
                            </div>
                        </div>
                    </div>
                    <div className=' custom0 flex flex-col relative p-5 border-b-4  rounded-xl md:border-b-0'>
                        <img className=' max-w-[250px] md:max-w-[200px] hover:scale-125 duration-500' src={img1} alt="" />
                        <div className='mt-6 grid gap-2'>
                            <h1 className='text-xl font-bold'>Fried Rice</h1>
                            <h1 className='text-lg font-medium opacity-90'>Price 15.00 Tk</h1>
                            <h1 className='font-semibold'>Rating: *****</h1>
                            <div className='custom1 grid gap-5 text-xl rounded-md bg-orange-500 text-white p-2 absolute top-10 right-0'><span className='hover:scale-125 '><FaCartPlus /></span>
                                <span className='hover:scale-125 '><FaHeart /></span>
                            </div>
                        </div>
                    </div>
                    <div className=' custom0 flex flex-col relative p-5 border-b-4  rounded-xl md:border-b-0'>
                        <img className=' max-w-[250px] md:max-w-[200px] hover:scale-125 duration-500' src={img1} alt="" />
                        <div className='mt-6 grid gap-2'>
                            <h1 className='text-xl font-bold'>Fried Rice</h1>
                            <h1 className='text-lg font-medium opacity-90'>Price 15.00 Tk</h1>
                            <h1 className='font-semibold'>Rating: *****</h1>
                            <div className='custom1 grid gap-5 text-xl rounded-md bg-orange-500 text-white p-2 absolute top-10 right-0'><span className='hover:scale-125 '><FaCartPlus /></span>
                                <span className='hover:scale-125 '><FaHeart /></span>
                            </div>
                        </div>
                    </div>
                    <div className=' custom0 flex flex-col relative p-5 border-b-4  rounded-xl md:border-b-0'>
                        <img className=' max-w-[250px] md:max-w-[200px] hover:scale-125 duration-500' src={img1} alt="" />
                        <div className='mt-6 grid gap-2'>
                            <h1 className='text-xl font-bold'>Fried Rice</h1>
                            <h1 className='text-lg font-medium opacity-90'>Price 15.00 Tk</h1>
                            <h1 className='font-semibold'>Rating: *****</h1>
                            <div className='custom1 grid gap-5 text-xl rounded-md bg-orange-500 text-white p-2 absolute top-10 right-0'><span className='hover:scale-125 '><FaCartPlus /></span>
                                <span className='hover:scale-125 '><FaHeart /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurDishes;