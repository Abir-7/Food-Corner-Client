import React from 'react';
import { useDispatch } from 'react-redux';

const FavaouriteMenuList = () => {
    const dispatch=useDispatch()

    return (
        <div className='min-h-[400px] max-h-screen w-96 fixed top-0 right-0 z-10 shadow-2xl backdrop-blur-2xl backdrop-brightness-50 overflow-auto rounded-xl'>
        <div className='bg-orange-400 sticky top-0 flex items-center justify-center p-2 rounded-xl'>
            <div className='flex items-center flex-col'>
                <h1 className='text-center font-bold text-white text-2xl'>Your Favourites</h1>
            </div>
            <button onClick={() =>dispatch(showFavouriteSlide(false))} className='absolute right-5 font-medium text-white hover:font-bold hover:text-red-600 duration-500'>X</button>
        </div>
        </div>
    );
};

export default FavaouriteMenuList;