
import Banner from '../../Components/HomePageComponent/Banner';
import OurDishes from '../../Components/HomePageComponent/OurDishes';
import OurServices from '../../Components/HomePageComponent/OurServices';
import Testimonials from '../../Components/HomePageComponent/Testimonials';
import PopulerDishes from '../../Components/HomePageComponent/PopulerDishes';
import NewsLetter from '../../Components/HomePageComponent/NewsLetter';
import { Helmet } from 'react-helmet';
import { useEffect } from 'react';

import { setIsSignupSuccessfull } from '../../Redux/feature/updateProfileSlice/userProfileSlice';
import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
    const dispatch = useDispatch()
    return (
        <div className=''>
          
            <Helmet><title>Food-Corner | Home</title></Helmet>
            <Banner />
            <OurDishes />
            <OurServices />
            <PopulerDishes />
            <Testimonials />
            <NewsLetter />
        </div>
    );
};

export default HomePage;