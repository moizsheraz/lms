import React from 'react'
import { FaCalculator } from 'react-icons/fa'

const StatCard = (props) => {
    return (
        <div className='w-full p-2 border rounded-md'>
            <div className='bg-btnColor text-white p-1 w-8 h-8 rounded-full flex items-center justify-center mb-2'>
                {props.icon}
            </div>
            <p className='text-paraColor'>{props.heading}</p>
            <p className='text-headingColor my-1'>{props.number}</p>
        </div>
    )
}

export default StatCard