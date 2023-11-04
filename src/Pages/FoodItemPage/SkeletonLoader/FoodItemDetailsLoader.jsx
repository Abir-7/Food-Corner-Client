import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const FoodItemDetailsLoader = () => {
    return (
        <div>


            <div className='container mx-auto my-10 grid gap-5 grid-cols-1 md:grid-cols-2'>
                <div className='flex flex-col  mx-auto  border-2 border-orange-400 rounded-lg p-8'>
                    {/* <img src={urls[index]} alt="" className='xl:w-[500px] xl:h-[500px] lg:w-[400px] lg:h-[400px] md:w-[300px] md:h-[300px] h-[250px] w-[250px]  sm:h-[390px] sm:w-[390px]  object-cover' /> */}

                    <div className='xl:w-[500px] xl:h-[500px] lg:w-[400px] lg:h-[400px] md:w-[300px] md:h-[300px] h-[250px] w-[250px]  sm:h-[390px] sm:w-[390px]  object-cover'>
                        <Skeleton height={'100%'}  ></Skeleton>
                    </div>
                    <div className='flex justify-around mt-5' >
                        <div className='w-10 '>    <Skeleton height={40} ></Skeleton></div>
                        <div className='w-10 h-10'>   <Skeleton height={40}></Skeleton></div>
                    </div>
                </div>
                <div>
                    <div className='mx-2'>
                        <h1 className='font-bold text-4xl'><Skeleton></Skeleton></h1>
                        <div className='flex mt-2  gap-4 items-center'>
                            <div className='w-24'>
                                <Skeleton />
                            </div>
                            <div className='w-36'><Skeleton /></div>
                        </div>
                        <p className='font-medium mt-2'><Skeleton count={2} /></p>
                        <div className='flex gap-5 items-center'>
                          <div className='flex  gap-6 justify-around mt-3 mb-2'>
                            <div className='w-20'>
                                <Skeleton></Skeleton>
                            </div>
                            <div className='w-10'>
                                <Skeleton></Skeleton>
                            </div>
                            <div className='w-10'>
                                <Skeleton></Skeleton>
                            </div>
                            <div className='w-10'>
                                <Skeleton></Skeleton>
                            </div>
                          </div>
                            <div className=' '>
                                <Skeleton />
                            </div>
                        </div>
                        <hr />
                        <div className='flex justify-around m-4 gap-5 '>
                            <div className='flex gap-5 items-center'>
                             <div className='w-5'>   <Skeleton height={20} /></div>
                             <div className='w-5'>   <Skeleton  height={20} /></div>
                             <div className='w-5'>   <Skeleton  height={20} /></div>
                  
                            </div>
                            <div className='flex-grow w-16'>
                                <Skeleton height={40}/>
                            </div>
                            <div className='w-8 '>
                                <Skeleton  height={20} />
                            </div>
                        </div>
                        <hr className='' />
                        <div className='flex mt-3 justify-between items-center'>
                    
                         <div className='w-24'>
                         <Skeleton  height={20} />
                         </div>
                         <div className='w-24'>
                         <Skeleton height={20} />
                         </div>
                  
                         
                        </div>
         
                            <div className='w-2/3 mt-3'><Skeleton  /></div>
              
                    </div>
                </div>
            </div>
            <div className='flex justify-center my-4'>
                <div className='w-1/4'><Skeleton height={40}/></div>
                </div>
            <div className='max-w-[800px] mx-auto mb-5'>
                <div className='flex justify-center'>
                    <div className='grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>

                        {Array(3).fill(0)?.map((item, i) => {
                            return <div key={i} className="card w-[250px] sm:w-[200px] pt-5 hover:-translate-y-2 duration-500 border-2 border-orange-400">
                                <figure ><Skeleton circle width={150} height={150} /></figure>
                                <div className=" text-center">
                                    <h2 className="text-xl font-bold mt-2 p-2"><Skeleton /></h2>

                                   <div className='p-2'> <Skeleton /></div>
                                </div>
                            </div>
                        })}


                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodItemDetailsLoader;