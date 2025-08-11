import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const ProductItem = ({id,images,name,price}) => {

    const {currency} = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer border border-gray-200'>
      <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={images[0]} alt="product-image" />
      </div>
      <p className='text-sm pt-3 pb-1'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
} 

export default ProductItem
