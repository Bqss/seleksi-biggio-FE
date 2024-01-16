import React from 'react'

const Header = () => {
  return (
    <div className='p-1'>
      <p className='p-3 bg-base-100 font-semiboild'>Management Story</p>
      <div className='bg-secondary p-2'>
        <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="w-6 h-6   text-gray-500 ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
      </div>
      
    </div>
  )
}

export default Header