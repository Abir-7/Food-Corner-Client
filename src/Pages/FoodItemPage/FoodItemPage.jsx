
import LinkBanner from "../../Components/Common/LinkBanner";
import img1 from '../../assets/food.png'
import { FaShoppingCart, FaStar } from "react-icons/fa";
import Tilt from 'react-parallax-tilt';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../Redux/feature/cartProductSlice/cartProductSlice";
import { useGetMenuItemQuery } from "../../Redux/api/baseApi";

const FoodItemPage = () => {

    const { cartItem } = useSelector((state) => state.cartProductSlice)
    //console.log(cartItem)


    const dispatch = useDispatch()

    const { data: menuData, isLoading, error } = useGetMenuItemQuery()

    //console.log(menuData)
    const addItemCart = (data) => {
        dispatch(addCart(data))
    }

    return (
        <div className="">
            <LinkBanner text='All Food Menu' />
            <div >
                {isLoading ?
                    <div>
                        <h1>Loading......</h1>
                    </div> :
                    <div className="container mx-auto">
                        <div>
                            {/* fiter option here */}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10 ">


                            {
                                menuData?.map(menu =>
                                    <Tilt
                                        key={menu._id}
                                        tiltMaxAngleX={4}
                                        tiltMaxAngleY={4}
                                        perspective={800}
                                        transitionSpeed={1500}

                                        gyroscope={true}
                                    >
                  



                                        <div className="p-3  shadow-md rounded-lg max-w-[590px] ">

                                            <div className="grid grid-cols-1  sm:grid-cols-1 xl:grid-cols-2 items-center bg-[#ffefd2] rounded-lg">
                                                <div className="flex justify-center ">
                                                    <img className=" w-[200px] ps-3 py-5" src={menu.urls[0]} alt="" />
                                                </div>
                                                <div className="m-5" >
                                                    <h1 className="text-xl font-bold"><Link className="hover:text-orange-400 duration-300" to={`/itemInfo/${menu._id}`}>{menu?.itemName}</Link></h1>
                                                    <h1 className="flex gap-1 mt-2 items-center">4.2 <span className="text-yellow-400 flex gap-1"><FaStar /> <FaStar /> <FaStar /> <FaStar /><FaStar /></span></h1>
                                                    <p>{menu?.ingredients.length>80?`${menu?.ingredients.slice(0,80)} ...`:menu?.ingredients}</p>
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex gap-4">
                                                            <p className="flex gap-1" ><span className="font-bold text-orange-400">{menu?.price[0].price} </span> <span className="text-green-400 font-semibold">Tk.</span></p>
                                                            <p className="flex gap-1"><span className="font-bold text-orange-400"> {menu.price.length > 1 && menu?.price[0].size}</span> <span className="text-green-400 font-semibold">{menu.price.length > 1 && 'inch'}</span> </p>
                                                        </div>
                                                        <button onClick={() => addItemCart({ name: menu?.itemName, size: `${menu.price.length > 1 ? menu?.price[0].size : ''}`, price: menu?.price[0].price, menuID: menu?._id,image:menu?.urls[0],category:menu?.category })} className='text-lg w-full text-orange-400 flex justify-end pe-5  '><span className='hover:drop-shadow-md hover:scale-75  hover:bg-green-400 duration-500 p-2 pe-3 rounded-full hover:text-white'><FaShoppingCart/></span></button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </Tilt>
                                )
                            }



                        </div>
                    </div>

                }
            </div>

        </div>
    );
};

export default FoodItemPage;