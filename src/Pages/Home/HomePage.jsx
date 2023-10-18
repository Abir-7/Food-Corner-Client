
import Banner from '../../Components/HomePageComponent/Banner';
import OurDishes from '../../Components/HomePageComponent/OurDishes';
import OurServices from '../../Components/HomePageComponent/OurServices';
import Testimonials from '../../Components/HomePageComponent/Testimonials';
import PopulerDishes from '../../Components/HomePageComponent/PopulerDishes';
import NewsLetter from '../../Components/HomePageComponent/NewsLetter';


const HomePage = () => {


    return (
        <div className=''>


            <Banner />
            <OurDishes />
            <OurServices/>
            <PopulerDishes/>
            <Testimonials/>
            <NewsLetter/>

        </div>
    );
};

export default HomePage;