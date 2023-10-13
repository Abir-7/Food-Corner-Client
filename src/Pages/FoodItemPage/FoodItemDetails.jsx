import React, { useState } from 'react';
import LinkBanner from '../../Components/Common/LinkBanner';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
//import img1 from '../../assets/food.png'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaCartPlus, FaHeart, FaMinus, FaPlus, FaStar } from 'react-icons/fa';

import { decrement, increment } from '../../Redux/feature/imageSildeSlice/imageSlideSlice';
import { useDispatch, useSelector } from 'react-redux';
import { showReviews, singleItemDecrement, singleItemIncrement, singleItemSize } from '../../Redux/feature/cartProductSlice/cartProductSlice';
const FoodItemDetails = () => {
    const image = ['https://img.freepik.com/free-photo/high-angle-man-holding-corn-dog_23-2149929396.jpg?w=1380&t=st=1697023599~exp=1697024199~hmac=3e57b859ae75c179c18aebc2091da24b87e73114dd8298764606da590263b62b',
        'https://img.freepik.com/free-photo/close-up-shot-caramel-vanilla-cupcakes-with-cream-chocolate-decoration-copyspace-food-eating-sugar-sweet-concept_7502-5464.jpg?t=st=1697023599~exp=1697024199~hmac=a97793a622878b4415b6c7234e97d149e426ffebdd094639314ab782ac35267a', 'https://img.freepik.com/free-photo/delicious-cake-with-fruits-cream_23-2148972058.jpg'
        ,
        'https://img.freepik.com/free-photo/close-up-shot-caramel-vanilla-cupcakes-with-cream-chocolate-decoration-copyspace-food-eating-sugar-sweet-concept_7502-5464.jpg?t=st=1697023599~exp=1697024199~hmac=a97793a622878b4415b6c7234e97d149e426ffebdd094639314ab782ac35267a']

    const size = [{ size: '8"', price: '100' }, { size: '14"', price: '200' }, { size: '18"', price: '300' }]


    const { index } = useSelector((state) => state.imageSlideSlice)
    const { itemNumber, option, isShowReviews } = useSelector((state) => state.cartProductSlice)
    const dispatch = useDispatch()


    const img1 = image[index]
    const { price, size: psize } = size[option]
    console.log(img1, index)




    const handleNext = (data) => {
        if (data.action == 'next') {
            dispatch(increment({ index: data.index, length: data.length }))
        }
        else if (data.action == 'prev') {
            dispatch(decrement({ index: data.index, length: data.length }))
        }
        else if (data.action == 'incressOne') {
            dispatch(singleItemIncrement())
        }
        else if (data.action == 'decreseOne') {
            dispatch(singleItemDecrement())
        }
        else if (data.action == 'size') {
            dispatch(singleItemSize(data.index))
        }
        else if (data.action == 'reviews') {
            dispatch(showReviews(data.isShow))
        }
    }

    console.log(isShowReviews)

    return (



        <div>
            <LinkBanner text='Food Details'></LinkBanner>
            <div className='container mx-auto my-10 grid gap-5 grid-cols-1 md:grid-cols-2'>
                <div className='flex flex-col  mx-auto  border-2 p-8'>
                    <img src={img1} alt="" className='xl:w-[500px] xl:h-[500px] lg:w-[400px] lg:h-[400px] md:w-[300px] md:h-[300px] h-[250px] w-[250px]  sm:h-[390px] sm:w-[390px]  object-cover' />

                    <div className='flex justify-around mt-5' >
                        <button onClick={() => handleNext({ action: 'prev', index: index, length: image.length })} className='btn btn-link '><FaArrowAltCircleLeft className='text-4xl text-orange-400' /></button>
                        <button className='btn btn-link ' onClick={() => handleNext({ action: 'next', index: index, length: image.length })}><FaArrowAltCircleRight className='text-4xl text-orange-400' /></button>
                    </div>
                </div>
                <div>
                    {isShowReviews == false ? <div className='mx-2'>
                        <h1 className='font-bold text-4xl'>Supreme Pizza</h1>
                        <div className='flex mt-2  gap-4 items-center'>
                            <div className='flex gap-1 text-yellow-400 '>
                                <FaStar /> <FaStar /> <FaStar /> <FaStar />
                            </div>
                            <p className='font-medium'>( <span>300</span> Customer Reviews )</p>
                        </div>
                        <p className='font-medium mt-2'>Ricotta, sun dried tomatoes, garlic, mozzarella cheese, topped with lightly drizzled red sauce, pesto, and fresh basil</p>
                        <div className='flex gap-5 items-center'>
                            <p className='font-bold my-2 text-2xl text-orange-400'><span className='text-green-400'>{price}</span> tk</p>
                            <div className='flex  gap-5 '>
                                {
                                    size.map((item, index) => <div onClick={() => handleNext({ action: 'size', index: index })} className='flex gap-2 items-center' key={index}><div className={option == index ? 'radio flex justify-center items-center  radio-success w-[20px] h-[20px] rounded-full' : 'radio flex justify-center items-center  radio-success w-[20px] h-[20px] rounded-fulll'} ><div className={option == index ? ' bg-green-400 w-[10px] h-[10px] rounded-full' : 'bg-white rounded-full w-[10px] h-[10px]'}></div></div><p className=''>{item.size}</p></div>)
                                }
                            </div>
                        </div>
                        <hr />
                        <div className='flex justify-around m-4 gap-5'>
                            <div className='flex gap-5 items-center'>
                                <button className='btn btn-sm rounded-full text-orange-400' onClick={() => { handleNext({ action: 'decreseOne' }) }}><FaMinus /></button>
                                <h1 className='font-semibold text-green-500'>{itemNumber}</h1>
                                <button className='btn btn-sm rounded-full text-orange-400' onClick={() => { handleNext({ action: 'incressOne' }) }}><FaPlus></FaPlus></button>
                            </div>
                            <div className='flex-grow'>
                                <button className='btn w-full py-3 bg-orange-400 hover:bg-orange-500 font-bold text-white h-auto '>Add to Cart < FaCartPlus /></button>
                            </div>
                            <div>
                                <button className='btn'><FaHeart /></button>
                            </div>
                        </div>
                        <hr />
                        <div className='flex justify-between items-center'>
                            <p className='text-lg text-green-400 my-2 font-medium'>Category: <span className='text-orange-400'>Pizza</span></p>
                            <button onClick={() => handleNext({ action: 'reviews', isShow: true })} className='btn btn-sm bg-yellow-400 hover:bg-yellow-500 text-white font-semibold'>Reviews</button>
                        </div>
                    <ul className='list-disc'>
                        <li className='font-semibold ms-3'>Fast and Reliable Delivery</li>
                    </ul>
                    </div> :
                        <div className='border-2 p-5 rounded-lg'>
                            <div className='flex justify-end'>     <button onClick={() => handleNext({ action: 'reviews', isShow: false })} className='text-right text-lg w-[30px] flex justify-center items-center  h-[30px] rounded-full bg-orange-400 hover:bg-orange-500  text-white'>X</button></div>
                            <div className='overflow-y-auto h-[500px] p-5 mt-2 '>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. In reprehenderit quam, facere nesciunt cum facilis rem provident eaque ea enim, accusamus vero, distinctio a commodi eos totam? Aspernatur consequuntur rem asperiores veritatis molestias, sed placeat ad! Exercitationem odit cum voluptas numquam, possimus blanditiis? Blanditiis, facilis ut beatae dolor nesciunt perferendis cupiditate magnam eius iste dolorem. Eligendi sit, porro explicabo deserunt iste vero incidunt nam voluptatum recusandae, eaque fugiat maiores? Dicta praesentium ut quis neque cupiditate, nemo quos provident sint expedita pariatur? Omnis reiciendis unde beatae laboriosam facere mollitia eos cum, temporibus exercitationem! Dolore, asperiores facere quisquam inventore ducimus consequuntur, ullam eligendi, maxime placeat repellat pariatur ratione optio nemo veritatis sint! Asperiores ut illo sunt, nemo harum excepturi minima et fugiat officia deserunt optio magnam eum sequi nesciunt recusandae, ad ea ab qui laborum dolores accusantium pariatur voluptatibus aliquid voluptate. Dolores tenetur ipsam consectetur rerum consequatur maxime esse ut voluptates. Ratione, assumenda. Dolores ullam ipsam rerum accusamus odio quibusdam dignissimos iusto cupiditate, tenetur, quia neque doloremque vero magnam quae culpa labore quod deserunt. Pariatur adipisci nihil iure. Illo saepe perspiciatis aliquid minus voluptate nam magnam consectetur, blanditiis accusamus. Eum fugiat soluta autem rerum consequatur repellendus iusto in quidem laboriosam est quae omnis ex, illum maiores impedit deleniti, qui, voluptatum ullam earum ut nulla eius incidunt? Similique placeat nesciunt molestias. Dolorum nostrum animi aperiam provident alias. Perspiciatis laboriosam officiis iure voluptatibus excepturi eos ullam praesentium culpa nam consequuntur. Totam praesentium error officiis delectus debitis modi quia tenetur veritatis reprehenderit nostrum sequi repudiandae illo suscipit temporibus, mollitia inventore excepturi cumque autem alias? Minus aliquid aperiam numquam culpa provident dolores eius? Perferendis deserunt quas saepe recusandae unde nostrum hic omnis, dolorum aspernatur consequatur cumque delectus illo harum, ipsa voluptate eaque sunt voluptatem, labore ad dolore ut? Ea ullam iure aliquid, totam voluptas rem harum consectetur molestias itaque voluptatem eum, doloremque veritatis id, dolorum hic vel autem pariatur eveniet enim ratione sequi explicabo. Labore tempora adipisci quisquam nam sed ipsam error incidunt aliquam ad, nulla rerum cumque voluptate rem aperiam facere molestias corporis at tenetur voluptatum ratione earum voluptates veritatis fuga assumenda. Suscipit, quis explicabo. Veniam vel nesciunt soluta necessitatibus aperiam quisquam sit sint. Nobis minus nesciunt magnam quidem nam, eum, explicabo illum excepturi optio perspiciatis fugit? Eaque optio possimus laboriosam tempora autem aspernatur dolorum minus itaque asperiores modi eligendi rerum, laudantium amet numquam. Enim ab in, labore eveniet, laborum minus corporis tenetur mollitia totam laudantium explicabo sint aut delectus ea sequi assumenda nulla. Quo officiis animi iste eum assumenda iure expedita nulla, temporibus cumque quas reiciendis aliquid ab optio unde dolore aperiam beatae rem. Inventore cumque mollitia neque ducimus magnam dolorem pariatur unde fugiat quod optio deserunt porro molestiae sequi, dignissimos sit sapiente facilis quaerat temporibus voluptatem. Sunt, corrupti nihil? Officiis sit error placeat in inventore. Fugiat ea, quia explicabo sequi est fugit corporis adipisci autem natus consectetur, eaque vel tempora illum itaque? Magni, aliquam repellendus vel quos, accusamus ipsa necessitatibus modi voluptatem quo sunt laboriosam consequuntur sit ad non nostrum! Possimus illo ullam assumenda nostrum quaerat quae asperiores sed quidem aperiam eligendi iure molestiae repudiandae cumque ea, dicta facilis ratione sit ducimus in, culpa accusamus illum itaque rerum! Doloribus, exercitationem? Nesciunt, aspernatur architecto delectus, perferendis porro aperiam impedit earum harum laudantium sint minus expedita veniam possimus accusantium eligendi ab nemo! Officia, sed accusamus alias debitis ex fuga modi dolore voluptate ratione. Nam in necessitatibus accusantium sed amet asperiores sapiente repellat, similique numquam, fugit dicta impedit voluptatem tenetur perferendis dignissimos porro, aliquid cumque! Tenetur cupiditate sint quas cum harum a dignissimos nobis provident officiis perspiciatis placeat officia inventore atque iusto laudantium laborum, eaque sequi dolorum omnis tempore doloremque ullam id doloribus! Aliquid distinctio quasi fugit sunt fuga facere assumenda, aliquam laudantium expedita fugiat, reprehenderit officia architecto voluptate. Quo ex, ab sunt dolores eum beatae minima, incidunt illum cumque a esse laudantium, perferendis enim et provident deserunt. Quasi, placeat nisi aliquam fugit libero nulla omnis recusandae, sapiente odio quo animi fuga! Officiis, voluptatum dolorem voluptatem excepturi nam, repellendus aspernatur ducimus ea libero nemo, expedita quidem minus animi nostrum aliquid dicta non! Reprehenderit debitis quas natus. Fugiat ratione deleniti nobis natus iure. Quibusdam possimus, veniam laboriosam illo obcaecati, officiis veritatis aperiam cumque sed assumenda dolore iusto tempora enim nisi ab reiciendis eligendi cupiditate deleniti mollitia. Ad excepturi, eveniet, officia sit minima amet cupiditate a dignissimos quibusdam consectetur earum recusandae ullam vitae! Voluptatem excepturi exercitationem ipsam, porro totam commodi soluta ad iure tempore animi assumenda labore pariatur iusto, vero temporibus doloribus at esse quod! Odit obcaecati dolores, aliquam harum incidunt distinctio, eum praesentium voluptatem natus ad eos libero ipsam repellat. Fuga nesciunt cum doloremque ad veniam velit libero possimus rem! Optio omnis, placeat aut, mollitia doloremque dicta totam similique animi, voluptate distinctio impedit quod dolorem ut delectus tempore nisi. Unde veritatis corporis voluptates distinctio ab reiciendis assumenda, non accusamus odio voluptatem, soluta, eligendi alias quidem voluptas. Molestiae sed impedit cum? Rerum explicabo perspiciatis officiis animi aliquid doloribus ipsa, dolores cumque consequuntur delectus, voluptas fugit porro itaque non veritatis cum laborum, nihil error reprehenderit maiores aliquam. Odit distinctio sunt, blanditiis animi pariatur quas iste dignissimos excepturi? Veritatis ea cupiditate esse ex consequatur illum officiis est aspernatur aut neque suscipit nihil eius inventore nisi tempora fugiat atque quasi voluptatum cumque quos modi, asperiores error maxime eos! Enim illo reprehenderit dolorum magnam, excepturi impedit iusto minus blanditiis animi suscipit eos odio in eius dolores debitis nisi! Modi, libero! Cum laudantium tempora error accusantium in consequatur blanditiis totam est beatae enim sunt facere, animi, et maiores natus recusandae repellat nesciunt unde quos doloribus aliquid. Animi eius quaerat ipsam minima, error et consequuntur accusantium. Quis esse, ab aliquam odio, illo quaerat aut exercitationem nulla iste facere tenetur. Autem consequuntur ratione ullam natus neque dolores quod reiciendis praesentium tenetur temporibus laudantium repellendus illum expedita provident dolorum corporis ad, quas officiis? Autem voluptate dolores vitae saepe omnis velit a distinctio. Excepturi alias sapiente, amet ducimus delectus dolorem placeat similique dolore, consectetur et laudantium veritatis fuga harum tempora enim repudiandae perferendis reprehenderit adipisci, facilis modi.
                            </div>
                        </div>
                    }
                </div>
            </div>
            <h1 className='text-center my-5 text-3xl font-bold'>RELATED PRODUCTS</h1>
            <div className='max-w-[800px] mx-auto mb-5'>
                <div className='flex justify-center'>
                    <div className='grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>

                    <div className="card w-[250px] sm:w-[200px] pt-5 hover:-translate-y-2 duration-500 border-2 border-orange-400">
                            <figure ><img className='w-[200px] h-[200px] sm:w-[150px] sm:h-[150px] rounded-lg' src="https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?w=826&t=st=1697083856~exp=1697084456~hmac=5554f62c6354ffd9e251fa5f250183f754656d5587f2a16b1ec410807e91bdd0" /></figure>
                            <div className=" text-center">
                                <h2 className="text-xl font-bold mt-2">Beef Pizza</h2>

                                <p className='flex mt-2 gap-3 justify-center text-yellow-400 pb-5'> <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar /></p>
                            </div>
                        </div>

                        <div className="card w-[250px] sm:w-[200px] pt-5 hover:-translate-y-2 duration-500 border-2 border-orange-400">
                            <figure ><img className='w-[200px] h-[200px] sm:w-[150px] sm:h-[150px] rounded-lg' src="https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?w=826&t=st=1697083856~exp=1697084456~hmac=5554f62c6354ffd9e251fa5f250183f754656d5587f2a16b1ec410807e91bdd0" /></figure>
                            <div className=" text-center">
                                <h2 className="text-xl font-bold mt-2">Beef Pizza</h2>

                                <p className='flex mt-2 gap-3 justify-center text-yellow-400 pb-5'> <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar /></p>
                            </div>
                        </div>

                        <div className="card w-[250px] sm:w-[200px] pt-5 hover:-translate-y-2 duration-500 border-2 border-orange-400">
                            <figure ><img className='w-[200px] h-[200px] sm:w-[150px] sm:h-[150px] rounded-lg' src="https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?w=826&t=st=1697083856~exp=1697084456~hmac=5554f62c6354ffd9e251fa5f250183f754656d5587f2a16b1ec410807e91bdd0" /></figure>
                            <div className=" text-center">
                                <h2 className="text-xl font-bold mt-2">Beef Pizza</h2>

                                <p className='flex mt-2 gap-3 justify-center text-yellow-400 pb-5'> <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar /></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodItemDetails;