
import LinkBanner from "../../Components/Common/LinkBanner";
import img1 from '../../assets/food.png'
import { FaEye, FaEyeSlash, FaShoppingCart, FaStar } from "react-icons/fa";
import Tilt from 'react-parallax-tilt';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart, setSelectedCategory, setSelectedCuisine} from "../../Redux/feature/cartProductSlice/cartProductSlice";
import { useGetMenuItemQuery, useModifyAvailabeStatusMutation } from "../../Redux/api/baseApi";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useEffect } from "react";
import FoodItemPageLoader from "./SkeletonLoader/FoodItemPageLoader";
import na from '../../assets/na.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";



const FoodItemPage = () => {
    const { userEmail, userLoading, userImage, userName, iscreateUserError, createUserError,isAdmin,isAdminLoading } = useSelector((state) => state.userProfileSlice)
    const { selectedCategory,selectedCuisine } = useSelector((state) => state.cartProductSlice)
    //console.log(cartItem)


    const dispatch = useDispatch()

    const { data: menuData, isLoading, error, refetch, } = useGetMenuItemQuery({category:selectedCategory,cuisine:selectedCuisine})

    const [modifyAvailabeStatus,{ data:isDataUpdate,error:isUpdateErr}]=useModifyAvailabeStatusMutation()

    useEffect(() => {
        if (selectedCategory) {
            refetch()
        }
    }, [selectedCategory,selectedCuisine])

    console.log(isLoading, menuData)

    const addItemCart = (data) => {
        dispatch(addCart(data))
    }


    const tabHandler = (name) => {
        dispatch(setSelectedCategory(name))
    }

    const cuisineHandler=(e)=>{
        dispatch(setSelectedCuisine(e.target.value))
    }
    
    console.log(selectedCuisine)


const handleAvailableStatus=(isAvailable,menuID)=>{
    modifyAvailabeStatus({isAvailable,menuID})
}
console.log(isDataUpdate)

useEffect(()=>{
    if(isDataUpdate?.modifiedCount==1){
        refetch()
        toast.success('Availability status Updated Successfully')
    }
},[isDataUpdate])

    return (
        <div className="">
                  <Helmet><title>Food-Corner | All Menu</title></Helmet>
            <LinkBanner text='All Food Menu' />
            <div >
                <ToastContainer/>
                <div className="bg-[#ffefd2] flex justify-center items-center ">

                    <div className="tabs tabs-boxed flex justify-center bg-[#ffefd2] ">
                        <a onClick={() => tabHandler('all')} className={selectedCategory == 'all' ? 'tab  hover:text-white bg-orange-400 duration-200 text-white' : 'tab text-black hover:text-white hover:bg-orange-400 duration-200 '}>All</a>
                        <a onClick={() => tabHandler('Pizza')} className={selectedCategory == 'Pizza' ? 'tab  hover:text-white bg-orange-400 duration-200 text-white' : 'tab text-black hover:text-white hover:bg-orange-400 duration-200 '}>Pizza</a>
                        <a onClick={() => tabHandler('Burger')} className={selectedCategory == 'Burger' ? 'tab text-white hover:text-white bg-orange-400 duration-200' : 'tab text-black hover:text-white hover:bg-orange-400 duration-200 '}>Burger</a>
                        <a onClick={() => tabHandler('Rice')} className={selectedCategory == 'Rice' ? 'tab text-white hover:text-white bg-orange-400 duration-200' : 'tab text-black hover:text-white hover:bg-orange-400 duration-200 '}>Rice</a>
                    </div>

                    <div className="">
                        <select value={selectedCuisine} onChange={cuisineHandler} className="select select-ghost w-full max-w-xs focus:outline-none focus:bg-transparent">
                            <option value={'all'} >All Cuisine</option>
                            <option value={'Indian'}>Indian Cuisine</option>
                            <option value={'Thai'}>Thai Cuisine</option>
                            <option value={'Chinese'}>Chinese Cuisine</option>
                        </select>
                    </div>

                </div>

                {isLoading || !menuData ?
                    <div>
                        <FoodItemPageLoader />
                    </div> :
                    <div className="container mx-auto">

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
                                                    <img className=" w-[170px]  ps-3 py-5" src={menu.urls[0]} alt="" />
                                                </div>
                                                <div className="m-5" >
                                                    <h1 className="text-xl font-bold">{menu?.isAvailable?<Link className="hover:text-orange-400 duration-300" to={`/itemInfo/${menu._id}`}>{menu?.itemName}</Link>:<span>{menu?.itemName}</span>}</h1>
                                                    <h1 className="flex gap-1 mt-2 items-center">
                                                        {/* {menu?.averageRating} */}
                                                        <span className="text-yellow-400 flex gap-1">      <Rating style={{ maxWidth: 100 }} value={menu?.averageRating} readOnly /></span></h1>
                                                    <p>{menu?.ingredients.length > 80 ? `${menu?.ingredients.slice(0, 70)} ...` : menu?.ingredients}</p>
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex gap-4">
                                                            <p className="flex gap-1" ><span className="font-bold text-orange-400">{menu?.price[0].price} </span> <span className="text-green-400 font-semibold">Tk.</span></p>
                                                            <p className="flex gap-1"><span className="font-bold text-orange-400"> {menu.price.length > 1 && menu?.price[0].size}</span> <span className="text-green-400 font-semibold">{menu.price.length > 1 && 'inch'}</span> </p>
                                                        </div>
                                                    {isAdmin ? <button className="text-green-400" onDoubleClick={()=>handleAvailableStatus(menu?.isAvailable==true?false:true,menu._id)}> {menu?.isAvailable?<span> <FaEye></FaEye></span>:<span className="text-red-500"> <FaEyeSlash/></span>}    </button>:<div> {!menu.isAvailable?<div className="flex justify-end pe-3"><img className="w-[24%]" src={na} alt="" /></div>:<button onClick={() => addItemCart({ name: menu?.itemName, size: `${menu.price.length > 1 ? menu?.price[0].size : ''}`, price: menu?.price[0].price, menuID: menu?._id, image: menu?.urls[0], category: menu?.category })} className='text-lg w-full text-orange-400 flex justify-end pe-5  '><span className='hover:drop-shadow-md hover:scale-75  hover:bg-green-400 duration-500 p-2 pe-3 rounded-full hover:text-white'><FaShoppingCart /></span></button>} </div>  }
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