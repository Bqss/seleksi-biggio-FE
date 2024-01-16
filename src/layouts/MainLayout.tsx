import React, { ReactNode } from 'react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className='bg-base-100 min-h-screen flex flex-col'>
      <Header />
      <div className='flex flex-1'>
        <Sidebar />
        <div className='flex-1  flex flex-col'>
          <div className='bg-base-200 px-8 py-6'>any</div>
          <div className='p-12 ml-6 mt-8 bg-base-200 rounded-lg flex-1 shadow-sm'>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default MainLayout