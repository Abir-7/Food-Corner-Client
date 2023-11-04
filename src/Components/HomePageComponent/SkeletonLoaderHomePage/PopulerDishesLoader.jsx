import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const PopulerDishesLoader = () => {
    return (

        <SkeletonTheme baseColor="#fca344" highlightColor="#fca05d">
            {
                Array(4).fill(0).map((item,index) => <div key={index} className="card w-72 h-[450px]  custom2  bg-base-100 shadow-xl">
                    <figure className="relative h-96">
                        <div className='custom3 absolute bottom-0   w-full'></div>
                        <div className='px-10 z-10  py-10'>
                            <Skeleton circle width={150} height={150}></Skeleton>
                        </div>


                    </figure>
                    <div className="card-body   ">
                        <p className=' w-4/5'> <Skeleton></Skeleton> </p>
                        <h2 className=" w-4/5"><Skeleton></Skeleton></h2>
                        <p><Skeleton count={3}></Skeleton></p>
                        <div className="flex justify-between items-center ">
                            <span className='text-md font-semibold w-3/5'><Skeleton></Skeleton></span>
                            <span className='text-lg text-orange-400  w-5 '> <Skeleton></Skeleton> </span>
                        </div>
                    </div>
                </div>)
            }

</SkeletonTheme>

    );
};

export default PopulerDishesLoader;