import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../assets/bannerImg/1.png'
import img3 from '../../assets/bannerImg/2.png'
import img2 from '../../assets/bannerImg/bg.jpg'
import img4 from '../../assets/bannerImg/4.png'
import { Link } from 'react-router-dom';
const Banner = () => {
    return (

        // <div style={{height:'800px'}} className=' mx-auto '>
        //     {/* <AwesomeSlider
        //         bullets={false}

        //   >
        //         <div  data-src="https://i.ibb.co/x8pTBYb/06.png" />
        //         <div   data-src="https://i.ibb.co/1nDc5FJ/01.jpg" />
        //         <div  data-src="https://i.ibb.co/crSP1Fn/03.png" />
        //     </AwesomeSlider> */}
        // </div>

        // <div className='relative h-[200px] md:h-[500px] lg:h-[900px] ' style={{ backgroundImage: `url(${img2})`, backgroundSize: '100% 100%' }} >


        //     <div className=' absolute w-full  z-[100]  h-full flex justify-center   items-center  '>
        //        <div className='text-center'>
        //        <h1 className='  font-bold md:font-bold lg:font-extrabold text-lg sm:2 xl md:text-4xl lg:5xl'>WelCome To Food Corner</h1>
        //         <h1 className='   mt-2 md:mt-7 font-bold md:font-bold lg:font-extrabold text-xl sm:3 xl md:text-5xl lg:6xl'>Savor the moments, <br /> taste the memories</h1>
        //        </div>
        //     </div>

        //     <img className='absolute right-1  max-w-[30%]' src={img1} />
        //     <img className='absolute bottom-0  max-w-[30%]' src={img3} />
        //     <img className='absolute top-0 hidden sm  max-w-[30%]' src={img4} />
        // </div>

        <div className="  hero relative min-h-[60vh] md:min-h-[80vh] px-3  " style={{ backgroundImage: `url(${img2})` }}>

            <div className="lg:absolute lg:left-[100px] lg:bottom-1/2 lg:top-20 text-center lg:text-left">

                <h1 className="mb-5 text-5xl md:text-7xl  font-bold text-orange-400">Delicious Foods  With <br /> Wonderful Eating</h1>
                <p className="mb-5 text-2xl font-semibold text-green-500">Satisfy Your Cravings</p>
              <div className=''>
              <button className="btn outline-none bg-orange-400 border-none hover:bg-orange-500 text-white  duration-500 "><Link to='/fooditems'>Explore Now</Link></button>
              </div>
            </div>
        </div>




    );
};

export default Banner;