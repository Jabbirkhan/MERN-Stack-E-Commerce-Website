import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <img src={assets.logo} className='mb-5 w-32' alt="logo" />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, deserunt perferendis
                        exercitationem expedita ipsam illo asperiores sit quis! Sed, eos!
                    </p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600 cursor-pointer'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Deliver</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-meddium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600 cursor-pointer'>
                        <li>+123456789</li>
                        <li>contactus@gmail.com</li>
                    </ul>
                </div>

            </div>

            <div>
                <hr />
                <p className='py-5 text-center text-sm'>Copyright 2024@ websitename.com - All Right Reserved</p>
            </div>
        </div>
    )
}

export default Footer
