import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      
      <div className='text-2xl text-center pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='flex flex-col justify-center md:flex-row gap-10 my-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='text-xl font-semibold text-gray-600'>Our Store</p>
          <p className='text-gray-500'>54078 Willms Station <br />Suite 350, Washinton, USA </p>
          <p className='text-gray-500'>Tel: (415) 555-01324 <br /> Email: admin@gmail.com </p>
          <p className='text-xl font-semibold text-gray-600'>Career at Store</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black text-sm px-8 py-4 hover:bg-black hover:text-white transition-all duration-500'>Explore jobs</button>
        </div>
      </div>

      <NewsletterBox/>

    </div>
  )
}

export default Contact
