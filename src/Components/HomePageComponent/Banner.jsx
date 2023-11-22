import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../assets/bannerImg/1.png'
import img3 from '../../assets/bannerImg/2.png'
import img2 from '../../assets/bannerImg/bg.jpg'
import img4 from '../../assets/bannerImg/4.png'
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload'
const Banner = () => {
    return (
        <LazyLoad height={200} offset={100} once>
            <div className="  hero relative min-h-[60vh] md:min-h-[80vh] px-3  " style={{ backgroundImage: `url(${img2})` }}>

                <div className="lg:absolute lg:left-[150px] lg:bottom-1/2 md:left-[100px] md:top-25 lg:top-28 text-center lg:text-left">

                    <h1 className="mb-5 text-5xl md:text-7xl  font-bold text-orange-400">Delicious Foods  With <br /> Wonderful Eating</h1>
                    <p className="mb-5 text-2xl font-semibold text-green-500">Satisfy Your Cravings</p>
                    <div className=''>
                        <button className="btn outline-none bg-orange-400 border-none hover:bg-orange-500 text-white  duration-500 "><Link to='/fooditems'>Explore Now</Link></button>
                    </div>
                </div>
            </div>

        </LazyLoad>


    );
};

export default Banner;