import React from 'react';
import img1 from '../../assets/food.png'
import './PopulerDishes.css'
import { FaStar, FaShoppingCart } from 'react-icons/fa';
const PopulerDishes = () => {
    return (
        <div className='container mx-auto'>
            <h1 className='text-5xl mx-3 md:mx-0  m font-bold mt-10'>Shop our favourites</h1>
            <div className='flex justify-center  '>
                <div className=' my-10 grid gap-5 md:gap-20 grid-cols-1 sm:grid-cols-2   lg:grid-cols-4'>

                    <div className="card w-72 h-[450px] border  custom2  bg-base-100 shadow-xl">
                        <figure className="relative h-96">
                            <div className='custom3 absolute bottom-0   w-full'></div>
                            <div className='px-10 z-10  py-10'>
                                <img src={img1} alt="Shoes" className="rounded-xl custom4  " />
                            </div>

                        </figure>
                        <div className="card-body   ">
                            <p className='flex gap-2 text-yellow-400'> <FaStar /> <FaStar /> <FaStar /><FaStar /> <FaStar /></p>
                            <h2 className="card-title">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="flex justify-between items-center ">
                                <p><span className='text-md font-semibold'>Price: </span> <span className='text-lg font-semibold text-orange-400'>19$</span></p>
                                <p className='text-lg text-orange-400 flex justify-end  '><span className='hover:drop-shadow-md hover:scale-75  hover:bg-green-400 duration-500 p-2 rounded-full hover:text-white'><FaShoppingCart /></span></p>
                            </div>
                        </div>
                    </div>

                    <div className="card w-72 h-[450px] border  custom2  bg-base-100 shadow-xl">
                        <figure className="relative h-96">
                            <div className='custom3 absolute bottom-0  w-full'></div>
                            <div className='px-10 z-10  py-10'>
                                <img src={img1} alt="Shoes" className="rounded-xl custom4  " />
                            </div>

                        </figure>
                        <div className="card-body   ">
                            <p className='flex gap-2 text-yellow-400'> <FaStar /> <FaStar /> <FaStar /><FaStar /> <FaStar /></p>
                            <h2 className="card-title">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="flex justify-between items-center">
                                <p><span className='text-md font-semibold'>Price: </span> <span className='text-lg font-semibold text-orange-400'>19$</span></p>
                                <p className='text-lg text-orange-400 flex justify-end  '><span className='hover:drop-shadow-md hover:scale-75  hover:bg-green-400 duration-500 p-2 rounded-full hover:text-white'><FaShoppingCart /></span></p>
                            </div>
                        </div>
                    </div>

                    <div className="card w-72 h-[450px] border  custom2  bg-base-100 shadow-xl">
                        <figure className="relative h-96">
                            <div className='custom3 absolute bottom-0   w-full'></div>
                            <div className='px-10 z-10  py-10'>
                                <img src={img1} alt="Shoes" className="rounded-xl custom4  " />
                            </div>

                        </figure>
                        <div className="card-body   ">
                            <p className='flex gap-2 text-yellow-400'> <FaStar /> <FaStar /> <FaStar /><FaStar /> <FaStar /></p>
                            <h2 className="card-title">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="flex justify-between items-center">
                                <p><span className='text-md font-semibold'>Price: </span> <span className='text-lg font-semibold text-orange-400'>19$</span></p>
                                <p className='text-lg text-orange-400 flex justify-end  '><span className='hover:drop-shadow-md hover:scale-75  hover:bg-green-400 duration-500 p-2 rounded-full hover:text-white'><FaShoppingCart /></span></p>
                            </div>
                        </div>
                    </div>

                    <div className="card w-72 h-[450px] border  custom2  bg-base-100 shadow-xl">
                        <figure className="relative h-96">
                            <div className='custom3 absolute bottom-0   w-full'></div>
                            <div className='px-10 z-10  py-10'>
                                <img src={img1} alt="Shoes" className="rounded-xl custom4  " />
                            </div>

                        </figure>
                        <div className="card-body   ">
                            <p className='flex gap-2 text-yellow-400'> <FaStar /> <FaStar /> <FaStar /><FaStar /> <FaStar /></p>
                            <h2 className="card-title">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="flex justify-between items-center">
                                <p><span className='text-md font-semibold'>Price: </span> <span className='text-lg font-semibold text-orange-400'>19$</span></p>
                                <p className='text-lg text-orange-400 flex justify-end  '><span className='hover:drop-shadow-md hover:scale-75  hover:bg-green-400 duration-500 p-2 rounded-full hover:text-white'><FaShoppingCart /></span></p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PopulerDishes;