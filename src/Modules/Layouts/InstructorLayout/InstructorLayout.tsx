import React from 'react'
import NavBar from '../../Instructor/shared/NavBar/NavBar'
import SideBar from '../../Instructor/shared/SideBar/SideBar'
import { Outlet } from 'react-router-dom'

export default function InstructorLayout() {
  return (
    <div className='flex flex-col'>
        <NavBar />
        <div className='flex flex-row'><SideBar />
      <Outlet /></div>
      
    </div>
  )
}
