import React from 'react'
import NavBar from '../../Instructor/shared/NavBar/NavBar'
import SideBar from '../../Instructor/shared/SideBar/SideBar'
import { Outlet } from 'react-router-dom'

export default function InstructorLayout() {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className='flex'>
        <div>
          <SideBar />
        </div>
        <div className='w-full'>
          <Outlet />
        </div>
      </div>
      
    </div>
  )
}
