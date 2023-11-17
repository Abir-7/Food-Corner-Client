
import Banner from '../../Components/HomePageComponent/Banner';
import OurDishes from '../../Components/HomePageComponent/OurDishes';
import OurServices from '../../Components/HomePageComponent/OurServices';
import Testimonials from '../../Components/HomePageComponent/Testimonials';
import PopulerDishes from '../../Components/HomePageComponent/PopulerDishes';
import NewsLetter from '../../Components/HomePageComponent/NewsLetter';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { LazyLoadComponent } from 'react-lazy-load-image-component';
// ..
AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

})


const HomePage = () => {

    return (
        <div className=''>

            <Helmet><title>Food-Corner | Home</title></Helmet>
            <div data-aos="fade-up">
                <Banner />
            </div>
            <div data-aos="fade-up"
                data-aos-offset="60"  >
                <LazyLoadComponent>
                    <OurDishes />
                </LazyLoadComponent>
            </div>
            <div data-aos="fade-up">
                <OurServices />
            </div>
            <div data-aos="fade-up">
                <LazyLoadComponent>
                    <PopulerDishes />
                </LazyLoadComponent>
            </div>
            <div data-aos="fade-up">
                <LazyLoadComponent>
                    <Testimonials />
                </LazyLoadComponent>
            </div>
            <div data-aos="fade-up">
                <LazyLoadComponent>
                    <NewsLetter />
                </LazyLoadComponent>
            </div>
        </div>
    );
};

export default HomePage;