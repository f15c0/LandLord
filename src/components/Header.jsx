import React from 'react'

export default function Header({title, subtitle}) {
  return (
        <header>
                <h1 className="text-center text-4xl text-red-700 font-bold py-1 mt-4">
                    {title}
                </h1>
                <h3 className='text-center text-xl text-gray-400 font-bold pb-2 my-2'>{subtitle}</h3>
        </header>
   
  )
}
