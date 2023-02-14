import React from 'react'
import Navbar from './Nav'

export default function Header({title, subtitle}) {
  return (
      <header>
            <Navbar/>
        <div>
                <h1 className="text-center text-2xl text-primary font-bold py-1 mt-4">
                      {title}
                </h1>
                <h3 className='text-center text-base text-gray-400 font-bold pb-2 my-1 mb-4'> 
                    {subtitle}  
                </h3>
        </div>
      </header>
  )
}
