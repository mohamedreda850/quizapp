import React from 'react'
import { Outlet } from 'react-router-dom'
import authImage from "./../../../../assets/Images/Image.png"
import logo from "./../../../../assets/Images/Logo-white.png"
export default function AuthenticationLayout() {
    return (
        <div className='flex flex-row items-center justify-between h-screen py-[10%] px-[4%] bg-primary'>
            <div className='flex flex-col items-center  w-1/2 h-full'>
                <img src={logo} className='w-1/4 self-start ' alt="" />
                <div className='self-stretch'><Outlet /></div>

            </div>

            <div className=''>
                <img src={authImage} alt="auth" />
            </div>
        </div>
    )
}
