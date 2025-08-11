import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const {products, search , showSearch} = useContext(ShopContext);
  
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevent');

  const toggleCategory = (e) =>{
    if (category.includes(e.target.value)) {
      // Here we are removing the selected category from array
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }else{
      // Here we are adding new category to array
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) =>{
    if (subcategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }else{
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productCopy = products.slice();

    if (showSearch && search) {
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category));
    }
    if (subcategory.length > 0) {
      productCopy = productCopy.filter(item => subcategory.includes(item.subcategory));
    }
    setFilterProducts(productCopy);
  }

  const sortProduct = () => {
    let fpCopy = products.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b) => (a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b) => (b.price - a.price)));
        break;
    
      default:
        applyFilter();
        break;
    }
  }

  // We use this without filter to load all the products on page
  // useEffect(()=> {
  //   setFilterProducts(products);
  // },[]);

  useEffect(() => {
    applyFilter();
  },[category,subcategory,search,showSearch,products]);

  useEffect(()=> {
    sortProduct();
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='flex text-xl my-2 items-center cursor-pointer gap-2 '>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="dropdown-icon" />
        </p>
        {/* Category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='text-sm font-medium mb-3'>CATEGORIES</p>
          <div className='flex flex-col text-sm gap-2 font-light text-gray-700 cursor-pointer'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={`Men`} onChange={toggleCategory} /> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={`Women`} onChange={toggleCategory} /> Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={`Kids`} onChange={toggleCategory} /> Kids
            </p>
          </div>
        </div>
        {/*Sub Category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-2 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='text-sm font-medium mb-3'>TYPE</p>
          <div className='flex flex-col text-sm gap-2 font-light text-gray-700 cursor-pointer'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={`Topwear`} onChange={toggleSubCategory} /> Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={`Bottomwear`} onChange={toggleSubCategory} /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={`Winterwear`} onChange={toggleSubCategory} /> Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product sort filter */}
          <select onChange={(e)=> setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevent">Sort by: Relevent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Mapping all products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 '>
          {
            filterProducts.map((item,index) =>(
              <ProductItem key={index} id={item._id} images={item.images} name={item.name} price={item.price} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection
