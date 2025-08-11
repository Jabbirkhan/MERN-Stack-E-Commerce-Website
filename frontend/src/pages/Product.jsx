import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';
import axios from 'axios';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart, backendUrl } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [images, setImages] = useState('');
  const [sizes, setSizes] = useState('');

  const fetchProductData = async () => {

    try {
      const response = await axios.get(`${backendUrl}/api/product/single?productId=${productId}`); 
        console.log(response); 

        if(response.data.success){
            setProductData(response.data.product);
            setImages(response.data.product.images[0]);
        }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    // we can also fetch single product from products using productId
    
    // products.map((item) => {
    //   if (item._id === productId) {
    //     setProductData(item);
    //     setImages(item.images[0]);
    //     return null;
    //   }
    // })

  }

  // useEffect(() => {
  //   fetchProductData();
  // }, [productId, products])
  
  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex flex-col sm:flex-row gap-12 sm:gap-12 '>
        {/* Product Images */}
        <div className='flex flex-col-reverse flex-1 sm:flex-row gap-3'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-full sm:w-[18.7%]'>
            {
              productData.images.map((item, index) => (
                <img onClick={() => setImages(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={images} className='w-full h-auto' alt="" />
          </div>
        </div>
        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='text-2xl font-medium mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} className='w-3.5' alt="" />
            <img src={assets.star_icon} className='w-3.5' alt="" />
            <img src={assets.star_icon} className='w-3.5' alt="" />
            <img src={assets.star_icon} className='w-3.5' alt="" />
            <img src={assets.star_dull_icon} className='w-3.5' alt="" />
            <p className='pl-2'>{122}</p>
          </div>
          <p className='mt-5 text-2xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSizes(item)} className={`border py-2 px-4 bg-gray-100 ${item === sizes ? 'border-orange-500' : ''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,sizes)} className='text-white bg-black text-sm px-8 py-3 active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='mt-5 text-gray-500 text-sm flex flex-col gap-1'>
            <p>100% Orignal Product</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description and review section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border py-3 px-5 text-sm'>Description</b>
          <p className='border py-3 px-5 text-sm'>Reviews{122}</p>
        </div>
        <div className='flex flex-col border gap-4 px-6 py-6 text-sm text-gray-500'>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit exercitationem cum consequuntur soluta inventore odio asperiores, beatae, excepturi ipsa at magni neque. Ad repellat laborum officiis at id earum? Sit mollitia cupiditate, earum temporibus voluptates sapiente rerum ab et ipsam ut rem eligendi repellendus, quis fuga aut nesciunt saepe dolore?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur officiis voluptas maiores ipsam laborum, tempora quasi vero veniam earum repudiandae.</p>
        </div>
      </div>
      {/* Related products */}
      <RelatedProducts category={productData.category} subcategory={productData.subcategory} id={productId}/>

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
