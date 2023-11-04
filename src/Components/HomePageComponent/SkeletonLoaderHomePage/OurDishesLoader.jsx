import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const OurDishesLoader = () => {
    return (
        <SkeletonTheme baseColor="#fc8f42" highlightColor="#fca05d">
           {
            Array(4).fill(0).map((item,index)=> <div key={index} className=' w-56 flex flex-col  relative p-5 border-b-4  rounded-xl md:border-b-0'>

            <Skeleton circle className=' max-w-[150px]   h-[150px]  hover:scale-125 duration-500' />
            <div className='mt-6 grid gap-2 w-4/5'>
                <h1 className='text-xl font-bold'>
                    <Skeleton></Skeleton>
                </h1>
                <h1 className='text-lg font-medium opacity-90'> <Skeleton></Skeleton></h1>
                <h1 className='font-semibold'><Skeleton></Skeleton></h1>

            </div>
        </div>)
           }
        </SkeletonTheme>
    );
};

export default OurDishesLoader;