import Image from 'next/image';
import React from 'react'
import { MdStarRate } from "react-icons/md";


const ReviewsCard = (props) => {
  return (
    <div className='relative w-full lg:w-[18%] h-full lg:h-80 p-2 bg-white rounded-md mt-10'>
      <div className='md:absolute -top-7 left-1/2 lg:transform lg:-translate-x-1/2 flex justify-center'>
        <Image className='w-14 h-14 rounded-full' src={props.img} width={1000} height={1000}  />
      </div>
      <div className='h-28'>
        <p className='text-headingColor text-center text-xl font-bold p-2 mt-10'>{props.name}</p>
        <p className='text-paraColor text-center text-sm'>{props.job}</p>
      </div>
      <hr className='my-2' />
      <div className='flex items-center text-orange-300 mb-3'>
        <MdStarRate />
        <MdStarRate />
        <MdStarRate />
        <MdStarRate />
        <MdStarRate />
      </div>
      <p className='text-paraColor h-24 overflow-auto text-sm'
        style={{
          /* Hide scrollbar for Webkit browsers */
          scrollbarWidth: 'none',       // Firefox
          msOverflowStyle: 'none',      // IE and Edge
        }}
      >{props.description}</p>
    </div>
  )
}

export default ReviewsCard