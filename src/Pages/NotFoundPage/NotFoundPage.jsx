import React from 'react';
import notfound from '../../assets/error.png'
import { Link } from 'react-router-dom';
const NotFoundPage = ({text}) => {
    return (
       < div className=' h-screen'>
       <button className='btn bg-orange-400 outline-none border-none hover:bg-orange-500 mx-10 mt-10 btn-sm text-white'><Link to={'/'}>Back to Home</Link></button>
        <div className={text?' my-10 grid grid-cols-1 md:grid-cols-2 container mx-auto items-center justify-center':'h-[91vh] grid grid-cols-1 md:grid-cols-2 container mx-auto items-center justify-center'}> 
            <div className='flex justify-center'>
                <img src={notfound} alt="" className='md:w-auto w-80' />
            </div>
            <div  className={text?'flex flex-col  mt-10 items-center':'flex flex-col -mt-20 md:mt-0 items-center'}>
                <h1 className='text-5xl md:text-8xl text-center text-orange-400 font-bold'>
                {!text&&'404'}
                </h1>
                <hr />
                <p className=' text-5xl md:text-8xl text-center'>{text?<span className='text-orange-400 font-semibold '>{text}</span>:'Page Not Found'}</p>
            </div>
        </div>
       </div>
    );
};

export default NotFoundPage;