import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='flex flex-col md:flex-row gap-16 my-10'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit optio recusandae iure eum aliquam accusamus dolorum neque reiciendis blanditiis, natus, officia reprehenderit repellat eligendi aspernatur dolores. Similique iure odio reprehenderit consequatur velit facilis, qui molestias quis alias debitis veritatis at! Similique libero voluptate et quam.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab consectetur reprehenderit tempore ut pariatur possimus cupiditate, quidem recusandae vero, nemo fugiat, dolorum libero eius iure. Suscipit commodi, consequatur perferendis saepe unde dolores fugit deserunt dolor? Vel rem, quidem esse exercitationem impedit nulla maxime minima tenetur?</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores repellat dicta est accusamus autem possimus velit dolor neque labore corporis ipsum fuga delectus impedit quidem expedita, iste voluptas. Dolorum, obcaecati?</p>
          </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='flex flex-col border gap-5 px-10 py-8 md:px-16 sm:py-20'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae, itaque nulla. Maiores, odit? Dicta exercitationem repellat deserunt alias error nisi?</p>
        </div>
        <div className='flex flex-col border gap-5 px-10 py-8 md:px-16 sm:py-20'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae, itaque nulla. Maiores, odit? Dicta exercitationem repellat deserunt alias error nisi?</p>
        </div>
        <div className='flex flex-col border gap-5 px-10 py-8 md:px-16 sm:py-20'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae, itaque nulla. Maiores, odit? Dicta exercitationem repellat deserunt alias error nisi?</p>
        </div>
      </div>

      <NewsletterBox/>

    </div>
  )
}

export default About
