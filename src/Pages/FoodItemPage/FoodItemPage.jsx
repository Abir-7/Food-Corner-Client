import { useContext } from "react";
import useAdmin from "../../CustomHook/useAdmin";
import { useGetUserQuery } from "../../Redux/api/baseApi";
import { Authcontext } from "../../AuthProvider/AuthProvider";
import LinkBanner from "../../Components/Common/LinkBanner";
import img1 from '../../assets/food.png'
import { FaShoppingCart, FaStar } from "react-icons/fa";
import Tilt from 'react-parallax-tilt';
import { Link } from "react-router-dom";

const FoodItemPage = () => {
    const { user, loader } = useContext(Authcontext);

    if (loader) {
        return <progress className="progress "></progress>
    }

    //const [isAdmin]=useAdmin(user?.email)

    //const {data,isError,error,isLoading}=useGetUserQuery()

    return (
        <>
            <LinkBanner text='All Food Menu' />

            <div className="container mx-auto">
                <div>

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10 ">


                    <Tilt

                        tiltMaxAngleX={4}
                        tiltMaxAngleY={4}
                        perspective={800}
                        transitionSpeed={1500}

                        gyroscope={true}
                    >
                        <div className="p-3 border-2 rounded-lg max-w-[590px]">

                            <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 items-center bg-[#ffefd2] rounded-lg">
                                <div className="flex justify-center ">
                                    <img className=" w-[200px] ps-3 py-5" src={img1} alt="" />
                                </div>
                                <div className="m-5" >
                                    <h1 className="text-xl font-bold"><Link className="hover:text-orange-400 duration-300" to='/itemInfo'>Vegge Lover</Link></h1>
                                    <h1 className="flex gap-1 mt-2 items-center">4.2 <span className="text-yellow-400 flex gap-1"><FaStar /> <FaStar /> <FaStar /> <FaStar /><FaStar /></span></h1>
                                    <p>Extra-virgin olive oil, garlic, mozzarella cheese, onions, mushrooms, green olives, black olives</p>
                                    <div className="flex justify-between items-center">
                                        <p className="flex gap-1"><span className="font-bold text-orange-400">300</span> <span className="text-green-400 font-semibold">Tk.</span></p>
                                        <p className='text-lg w-full text-orange-400 flex justify-end pe-5  '><span className='hover:drop-shadow-md hover:scale-75  hover:bg-green-400 duration-500 p-2 pe-3 rounded-full hover:text-white'><FaShoppingCart /></span></p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Tilt>

                    <Tilt

                        tiltMaxAngleX={4}
                        tiltMaxAngleY={4}
                        perspective={800}
                        transitionSpeed={1500}

                        gyroscope={true}
                    >
                        <div className="p-3 border-2 rounded-lg max-w-[590px]">

                            <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 items-center bg-[#ffefd2] rounded-lg">
                                <div className="flex justify-center ">
                                    <img className=" w-[200px] ps-3 py-5" src={img1} alt="" />
                                </div>
                                <div className="m-5" >
                                    <h1 className="text-xl font-bold"><Link className="hover:text-orange-400 duration-300">Vegge Lover</Link></h1>
                                    <h1 className="flex gap-1 mt-2 items-center">4.2 <span className="text-yellow-400 flex gap-1"><FaStar /> <FaStar /> <FaStar /> <FaStar /><FaStar /></span></h1>
                                    <p>Extra-virgin olive oil, garlic, mozzarella cheese, onions, mushrooms, green olives, black olives</p>
                                    <div className="flex justify-between items-center">
                                        <p className="flex gap-1"><span className="font-bold text-orange-400">300</span> <span className="text-green-400 font-semibold">Tk.</span></p>
                                        <p className='text-lg w-full text-orange-400 flex justify-end pe-5  '><span className='hover:drop-shadow-md hover:scale-75  hover:bg-green-400 duration-500 p-2 pe-3 rounded-full hover:text-white'><FaShoppingCart /></span></p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Tilt>

                    <Tilt

                        tiltMaxAngleX={4}
                        tiltMaxAngleY={4}
                        perspective={800}
                        transitionSpeed={1500}

                        gyroscope={true}
                    >
                        <div className="p-3 border-2 rounded-lg max-w-[590px]">

                            <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 items-center bg-[#ffefd2] rounded-lg">
                                <div className="flex justify-center ">
                                    <img className=" w-[200px] ps-3 py-5" src={img1} alt="" />
                                </div>
                                <div className="m-5" >
                                    <h1 className="text-xl font-bold"><Link className="hover:text-orange-400 duration-300">Vegge Lover</Link></h1>
                                    <h1 className="flex gap-1 mt-2 items-center">4.2 <span className="text-yellow-400 flex gap-1"><FaStar /> <FaStar /> <FaStar /> <FaStar /><FaStar /></span></h1>
                                    <p>Extra-virgin olive oil, garlic, mozzarella cheese, onions, mushrooms, green olives, black olives</p>
                                    <div className="flex justify-between items-center">
                                        <p className="flex gap-1"><span className="font-bold text-orange-400">300</span> <span className="text-green-400 font-semibold">Tk.</span></p>
                                        <p className='text-lg w-full text-orange-400 flex justify-end pe-5  '><span className='hover:drop-shadow-md hover:scale-75  hover:bg-green-400 duration-500 p-2 pe-3 rounded-full hover:text-white'><FaShoppingCart /></span></p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Tilt>


                    <Tilt

                        tiltMaxAngleX={4}
                        tiltMaxAngleY={4}
                        perspective={800}
                        transitionSpeed={1500}

                        gyroscope={true}
                    >
                        <div className="p-3 border-2 rounded-lg max-w-[590px]">

                            <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 items-center bg-[#ffefd2] rounded-lg">
                                <div className="flex justify-center ">
                                    <img className=" w-[200px] ps-3 py-5" src={img1} alt="" />
                                </div>
                                <div className="m-5" >
                                    <h1 className="text-xl font-bold"><Link className="hover:text-orange-400 duration-300">Vegge Lover</Link></h1>
                                    <h1 className="flex gap-1 mt-2 items-center">4.2 <span className="text-yellow-400 flex gap-1"><FaStar /> <FaStar /> <FaStar /> <FaStar /><FaStar /></span></h1>
                                    <p>Extra-virgin olive oil, garlic, mozzarella cheese, onions, mushrooms, green olives, black olives</p>
                                    <div className="flex justify-between items-center">
                                        <p className="flex gap-1"><span className="font-bold text-orange-400">300</span> <span className="text-green-400 font-semibold">Tk.</span></p>
                                        <p className='text-lg w-full text-orange-400 flex justify-end pe-5  '><span className='hover:drop-shadow-md hover:scale-75  hover:bg-green-400 duration-500 p-2 pe-3 rounded-full hover:text-white'><FaShoppingCart /></span></p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Tilt>

                    <Tilt

                        tiltMaxAngleX={4}
                        tiltMaxAngleY={4}
                        perspective={800}
                        transitionSpeed={1500}

                        gyroscope={true}
                    >
                        <div className="p-3 border-2 rounded-lg max-w-[590px]">

                            <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 items-center bg-[#ffefd2] rounded-lg">
                                <div className="flex justify-center ">
                                    <img className=" w-[200px] ps-3 py-5" src={img1} alt="" />
                                </div>
                                <div className="m-5" >
                                    <h1 className="text-xl font-bold"><Link className="hover:text-orange-400 duration-300">Vegge Lover</Link></h1>
                                    <h1 className="flex gap-1 mt-2 items-center">4.2 <span className="text-yellow-400 flex gap-1"><FaStar /> <FaStar /> <FaStar /> <FaStar /><FaStar /></span></h1>
                                    <p>Extra-virgin olive oil, garlic, mozzarella cheese, onions, mushrooms, green olives, black olives</p>
                                    <div className="flex justify-between items-center">
                                        <p className="flex gap-1"><span className="font-bold text-orange-400">300</span> <span className="text-green-400 font-semibold">Tk.</span></p>
                                        <p className='text-lg w-full text-orange-400 flex justify-end pe-5  '><span className='hover:drop-shadow-md hover:scale-75  hover:bg-green-400 duration-500 p-2 pe-3 rounded-full hover:text-white'><FaShoppingCart /></span></p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Tilt>

                    <Tilt

                        tiltMaxAngleX={4}
                        tiltMaxAngleY={4}
                        perspective={800}
                        transitionSpeed={1500}

                        gyroscope={true}
                    >
                        <div className="p-3 border-2 rounded-lg max-w-[590px]">

                            <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 items-center bg-[#ffefd2] rounded-lg">
                                <div className="flex justify-center ">
                                    <img className=" w-[200px] ps-3 py-5" src={img1} alt="" />
                                </div>
                                <div className="m-5" >
                                    <h1 className="text-xl font-bold"><Link className="hover:text-orange-400 duration-300">Vegge Lover</Link></h1>
                                    <h1 className="flex gap-1 mt-2 items-center">4.2 <span className="text-yellow-400 flex gap-1"><FaStar /> <FaStar /> <FaStar /> <FaStar /><FaStar /></span></h1>
                                    <p>Extra-virgin olive oil, garlic, mozzarella cheese, onions, mushrooms, green olives, black olives</p>
                                    <div className="flex justify-between items-center">
                                        <p className="flex gap-1"><span className="font-bold text-orange-400">300</span> <span className="text-green-400 font-semibold">Tk.</span></p>
                                        <p className='text-lg w-full text-orange-400 flex justify-end pe-5  '><span className='hover:drop-shadow-md hover:scale-75  hover:bg-green-400 duration-500 p-2 pe-3 rounded-full hover:text-white'><FaShoppingCart /></span></p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Tilt>


                </div>
            </div>
        </>
    );
};

export default FoodItemPage;