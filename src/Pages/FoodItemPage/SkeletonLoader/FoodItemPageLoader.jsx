import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom';


const FoodItemPageLoader = () => {
    const number=6
    return (
        <SkeletonTheme baseColor="#fc8f42" highlightColor="#fca05d">
        <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10 ">
                {
                    Array(number).fill(0).map((item,index)=><div key={index} className="p-3  shadow-md rounded-lg max-w-[590px] ">
                    <div className="grid grid-cols-1  sm:grid-cols-1 xl:grid-cols-2 items-center bg-[#ffefd2] rounded-lg">
                        <div className="flex justify-center ">
                            {/* <img className=" w-[170px]  ps-3 py-5" src={menu.urls[0]} alt="" /> */}
                            <Skeleton circle width={170} height={170} />
                        </div>
                        <div className="m-5" >
                            <h1 className="text-xl font-bold"><Skeleton></Skeleton></h1>
                            <h1 className="flex gap-1 mt-2 items-center">
                                {/* {menu?.averageRating} */}
                                <span className=" flex gap-1">   <Skeleton /></span></h1>
                            <p><Skeleton count={3} /></p>
                            <div className="flex justify-between items-center">
                                <div className="flex gap-4">
                                    <p className="flex gap-1" ><span className="font-bold"> <Skeleton /> </span> </p>
                                    <p className="flex gap-1"><span className="font-bold ">  <Skeleton /></span> </p>
                                </div>
                                <button className='text-lg w-full  flex justify-end pe-5  '><Skeleton /></button>
                            </div>
                        </div>
                    </div>
                </div>)
                }
            </div>
        </div>
        </SkeletonTheme>
    );
};

export default FoodItemPageLoader;