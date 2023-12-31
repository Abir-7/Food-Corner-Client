import React, { useRef, useState } from 'react';
import LinkBanner from '../../Components/Common/LinkBanner';
import { HiRocketLaunch } from 'react-icons/hi2';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import { Mail } from 'lucide-react';
import emailjs from '@emailjs/browser'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
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

const ContuctUsPage = () => {
  const form = useRef()
  const [msg, setMsg] = useState('')

  const sendEmail = e => {
    e.preventDefault()
    setMsg('')
    emailjs
      .sendForm(
        import.meta.env.VITE_Email_serviceId,
        import.meta.env.VITE_Email_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_Email_PUBLIC_KEY,
      )
      .then(
        result => {
          if (result.text) {
            setMsg('Message Sent')
            toast.success('Message Sent.')
          }
        },
        error => {
          setMsg('Message Limit is Over')
        }
      )
  }


  return (
    <div>
      <LinkBanner text='Contuct Us '></LinkBanner>
      <ToastContainer />


      <div className='min-h-[50vh] py-12 container mx-auto p-5'>
        <Helmet>
          <title>Contact Us | E-ExamPro</title>
        </Helmet>
        <div className='items-center grid-cols-2 gap-10 pt-3 space-y-5 md:grid'>
          <div className='w-full md:gap-10'  data-aos="fade-right">

            <form
              ref={form}
              onSubmit={sendEmail}
              className='pb-5 border-2 rounded-lg shadow-md card-body'
            >
              <h1 className='pb-2 text-orange-400 text-3xl md:text-4xl font-semibold'>How Can We Help</h1>
              <div className=''>
                <div className='form-control'>
                  <label className='label'>
                    <p className=''>Name</p>
                  </label>
                  <input
                    required
                    name='name'
                    type='text'
                    placeholder='Name'
                    className='input-bordered input'
                  />
                </div>
                <div className='form-control'>
                  <label className='label'>
                    <p className=''>Email</p>
                  </label>
                  <input
                    required
                    name='email'
                    type='email'
                    placeholder='Email'
                    className='input input-bordered'
                  />
                </div>
                <div className='form-control'>
                  <label className='label'>
                    <p className=''>Message</p>
                  </label>
                  <textarea
                    required
                    name='message'
                    className='textarea textarea-bordered'
                    placeholder='Message'
                  ></textarea>
                </div>
                <div className='mt-6'>
                  <button className=' btn hover:-translate-y-1 bg-orange-400 hover:bg-orange-500 text-white'>
                    <span>Send Message</span> <HiRocketLaunch></HiRocketLaunch>
                  </button>
                  <p className={msg == 'Message Sent' ? 'z-20 mt-3 text-green-500' : 'z-20 mt-3 text-red-500'}>{msg}</p>
                </div>

              </div>
            </form>
          </div>
          <div className='md:w-3/4' data-aos="fade-left">
            <div className='mb-10'>
              <h1 className='mb-3 text-3xl font-semibold border-l-8 border-orange-400 ps-5'>
                Contact Info
              </h1>

            </div>
            <div className='space-y-5'>
              <div className='flex items-center gap-4'>
                <Mail className='font-semibold text-orange-400'></Mail>
                <p>Food_Corner@gmail.com</p>
              </div>
              <div className='flex items-center gap-4'>
                <FaPhoneAlt className='text-xl text-orange-400' />
                <p>
                  +880 1234567890 <br /> +8802364786732
                </p>
              </div>
              <div className='flex items-center gap-4'>
                <FaMapMarkerAlt className='text-xl text-orange-400' />
                <p>
                  Dhanmondi-32, Dhaka <br /> Bangladesh
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default ContuctUsPage;