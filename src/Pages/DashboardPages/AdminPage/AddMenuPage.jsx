import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDataPostLoading, setMenuData, setPriceValue1, setPriceValue2, setPriceValue3, setSizeValue1, setSizeValue2, setSizeValue3 } from '../../../Redux/feature/addMenuItemSlice/addMenuItemSlice';
import bg from '../../../assets/LinkBanner.jpg'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddMenuItemMutation } from '../../../Redux/api/baseApi';
import { Helmet } from 'react-helmet';
const AddMenuPage = () => {




    const token = import.meta.env.VITE_imgbbToken
    const imageHoistingURL = `https://api.imgbb.com/1/upload?key=${token}`


    const { menuData, price1, price2, price3, size1, size2, size3, dataPostLoading } = useSelector(state => state.addMenuItemSlice)

    const [addMenuItem, { data: formdata, error, isSuccess, isLoading: menudataPostLoading }] = useAddMenuItemMutation()
    const dispatch = useDispatch()
    //console.log(error)


    const [images, setImages] = useState([]);
    const [liveImage, setLiveImage] = useState([]);
    const [uploadedUrls, setUploadedUrls] = useState([]);

    const handleFileChange = (e) => {
        const newImages = [...images];
        newImages.push(e.target.files[0])
        setImages(newImages);

        const newLiveImage = URL.createObjectURL(e.target.files[0])

        const newLive = [...liveImage]
        newLive.push(newLiveImage)
        setLiveImage(newLive)
    };

    const handleMenuItem = (e) => {
        const { name, value, checked } = e.target
        //console.log(name, value)

        dispatch(setMenuData({ name, value, checked }))
    }


    //console.log(menuData)

    //console.log(images, liveImage, uploadedUrls)

    const handleUpload = async () => {
        dispatch(setDataPostLoading(true))
        try {

            if (price1 == '' && price2 == '' && price3 == '') {
                return toast('Add All Field')
            }

            const urls = [];

            for (const image of images) {
                const formData = new FormData();
                formData.append('image', image);

                const response = await axios.post(imageHoistingURL, formData);

                urls.push(response.data.data.url);
            }

           // console.log(urls)

            const data3 = { ...menuData, urls,isAvailable:true }
            //const data3='sadasd'
            await addMenuItem(data3)
    
        } catch (error) {
            console.error('Error uploading images', error);
        }
    };

    useEffect(()=>{

        if (isSuccess) {
            dispatch(setDataPostLoading(false))
            toast.success('Item Added Successfully')
        }
       if(error) {
        dispatch(setDataPostLoading(false))
            toast('An Error Occure')
        }

    },[isSuccess,error])

    //console.log(price1, price2, price3, size1, size2, size3)
    //  style={{backgroundImage:`url(${bg})`,backgroundPosition:"100% 100%"}}
    return (
        <div className=' md:mt-10 '  >
             <Helmet><title>Food-Corner | Add Menu</title></Helmet>
            <div className=' '>
              <ToastContainer/>
                <div className='flex justify-center flex-wrap gap-4 p-5'>
                    {
                        liveImage.length > 0 && liveImage.map((img, index) => {
                            return <div key={index} className=' p-2  rounded-md' style={{ border: '2px solid orange' }}>
                                <img className='w-[250px] h-[250px] object-cover  rounded-md' src={img} alt="" />
                            </div>
                        })
                    }

                    {
                        liveImage.length == 0 && <h1 className='text-3xl font-semibold p-10 border-2 rounded-lg border-orange-300'>Upload Food Image</h1>
                    }
                </div>
                <div className=' p-5  '  >
                    <div className=' flex flex-col gap-4  items-center    ' >
                        <div className=' md:w-1/2'>
                            <input onChange={(e) => handleFileChange(e)} className='file-input file-input-primary  w-full mx-auto' type="file" />
                        </div>
                        <div className=' w-96  md:w-1/2'>
                            <h1 className='text-lg font-medium'>Item Name</h1>
                            <input onChange={(e) => handleMenuItem(e)} className='input input-primary  w-full  mx-auto' name='itemName' type="text" />
                        </div>


                        <div className='w-96 md:w-1/2 grid gap-4  '>
                            <div className='text-lg font-medium flex flex-col sm:flex-row items-center md:gap-3'>Price & Size: <div>
                            <span className='text-sm text-green-700'>(For single size just add price in 1st option then select option 1)</span><br /><span className='text-sm text-green-700'>(Before edit price or size , deselected the option.)</span></div></div>

                            <div className='grid gap-3'>
                                <div>
                                    <label className='flex items-center gap-2'>
                                        <input
                                            disabled={price1 == ''}
                                            className="checkbox checkbox-sm checkbox-primary"
                                            type='checkbox'
                                            onChange={(e) => handleMenuItem(e)}
                                            name='price'
                                            value={'option1'}
                                        />
                                        Option 1:  {(price1 == '' && size1 == '') && <p className='text-xs text-red-500'>Set Price & Size First then Select Option </p>}
                                    </label>
                                    <div>
                                        <div className='flex items-center gap-2'>
                                            <div className='w-[40px]'>
                                                Price:
                                            </div>
                                            <input
                                             placeholder='Tk.'
                                                className='input input-primary  input-sm mt-2   w-full  mx-auto'
                                                type="number"
                                                value={price1}
                                                onChange={(e) => dispatch(setPriceValue1(e.target.value))}
                                            />
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <div className='w-[40px]'>
                                                Size:
                                            </div>
                                            <input
                                                placeholder='Write size in Inch'
                                                className='input input-primary  input-sm mt-2   w-full  mx-auto'
                                                type="number"
                                                value={size1}
                                                onChange={(e) => dispatch(setSizeValue1(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className='flex items-center gap-2'>
                                        <input
                                            disabled={price2 == '' || size2 == ''}
                                            className="checkbox  checkbox-sm checkbox-primary"
                                            type='checkbox'
                                            onChange={(e) => handleMenuItem(e)}
                                            name='price'
                                            value={'option2'}
                                        />
                                        Option 2:  {(price2 == '' && size2 == '') && <p className='text-xs text-red-500'>Set Price & Size First then Select Option </p>}
                                    </label>
                                    <div>
                                        <div className='flex items-center gap-2'>
                                            <div className='w-[40px]'>
                                                Price:
                                            </div>
                                            <input
                                              placeholder='Tk.'
                                                className='input input-primary  input-sm mt-2   w-full  mx-auto'
                                                type="number"
                                                value={price2}
                                                onChange={(e) => dispatch(setPriceValue2(e.target.value))}
                                            />
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <div className='w-[40px]'>
                                                Size:
                                            </div>
                                            <input
                                                placeholder='Write size in Inch'
                                                className='input input-primary  input-sm mt-2   w-full  mx-auto'
                                                type="number"
                                                value={size2}
                                                onChange={(e) => dispatch(setSizeValue2(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className='flex items-center gap-2'>
                                        <input
                                            disabled={price3 == '' || size3 == ''}
                                            className="checkbox  checkbox-sm checkbox-primary"
                                            type='checkbox'
                                            onChange={(e) => handleMenuItem(e)}
                                            name='price'
                                            value={'option3'}
                                        />
                                        Option 3:  {(price3 == '' && size3 == '') && <p className='text-xs text-red-500'>Set Price & Size First then Select Option </p>}
                                    </label>
                                    <div>
                                        <div className='flex items-center gap-2'>
                                            <div className='w-[40px]'>
                                                Price:
                                            </div>
                                            <input
                                              placeholder='Tk.' 
                                                className='input input-primary  input-sm mt-2   w-full  mx-auto'
                                                type="number"
                                                value={price3}
                                                onChange={(e) => dispatch(setPriceValue3(e.target.value))}
                                            />
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <div className='w-[40px]'>
                                                Size:
                                            </div>
                                            <input
                                                className='input input-primary  input-sm mt-2   w-full  mx-auto'
                                                placeholder='Write size in Inch'
                                                type="number"
                                                value={size3}
                                                onChange={(e) => dispatch(setSizeValue3(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>




                        <div className=' w-96  md:w-1/2'>
                            <h1 className='text-lg font-medium'>Ingredients:</h1>
                            <input onChange={(e) => handleMenuItem(e)} className='input input-primary  w-full mx-auto' name='ingredients' type="text" />
                        </div>
                        <div className='w-96 md:w-1/2'>
                            <h1 className='text-lg font-medium'>Category:</h1>
                            <select onChange={(e) => handleMenuItem(e)} className='select select-sm select-primary w-full mx-auto' name='category'>
                                <option value=''>Select a category</option>
                                <option value='Pizza'>Pizza</option>
                                <option value='Burger'>Burger</option>
                                <option value='Steaks'>Steaks</option>
                                <option value='Rice'>Rice</option>
                                <option value='Pasta'>Pasta</option>
                                <option value='Sushi'>Sushi</option>
                                <option value='Noodles'>Noodles</option>
                                <option value='Soup'>Soup</option>
                                <option value='chicken'>Chicken</option>
                            </select>
                        </div>

                        <div className='w-96 md:w-1/2 flex gap-4 items-center'>
                            <h1 className='text-lg font-medium'>Time:</h1>

                            <div>
                                <label className='flex items-center gap-2'>
                                    <input className="checkbox checkbox-primary" type='checkbox' onChange={(e) => handleMenuItem(e)} name='time' value='Breakfast' />
                                    Breakfast
                                </label>
                            </div>

                            <div>
                                <label className='flex items-center gap-2'>
                                    <input className="checkbox checkbox-primary" type='checkbox' onChange={(e) => handleMenuItem(e)} name='time' value='Dinner' />
                                    Dinner
                                </label>
                            </div>

                            <div>
                                <label className='flex items-center gap-2'>
                                    <input className="checkbox checkbox-primary" type='checkbox' onChange={(e) => handleMenuItem(e)} name='time' value='Lunch' />
                                    Lunch
                                </label>
                            </div>

                        </div>

                        <div className='w-96 md:w-1/2 flex gap-4 items-center'>
                            <h1 className='text-lg font-medium'>Cuisine:</h1>

                            <div>
                                <label className='flex items-center gap-2'>
                                    <input className="radio radio-primary" type='radio' onChange={(e) => handleMenuItem(e)} name='cuisine' value='Thai' />
                                    Thai
                                </label>
                            </div>

                            <div>
                                <label className='flex items-center gap-2'>
                                    <input className="radio radio-primary" type='radio' onChange={(e) => handleMenuItem(e)} name='cuisine' value='Indian' />
                                    Indian
                                </label>
                            </div>
                            <div>
                                <label className='flex items-center gap-2'>
                                    <input className="radio radio-primary" type='radio' onChange={(e) => handleMenuItem(e)} name='cuisine' value='Italian' />
                                    Italian
                                </label>
                            </div>
                            <div>
                                <label className='flex items-center gap-2'>
                                    <input className="radio radio-primary" type='radio' onChange={(e) => handleMenuItem(e)} name='cuisine' value='Chinese' />
                                    Chinese
                                </label>
                            </div>

                        </div>




                        <div className='flex justify-center mt-2'>
                            <button disabled={menudataPostLoading ||  dataPostLoading } className='btn btn-primary' onClick={handleUpload} >{dataPostLoading?<span className="loading loading-dots loading-lg"></span>:'Add Item'}</button>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    );
};

export default AddMenuPage;