import { Outlet } from "react-router-dom";
import NavBar from "../../Instructor/shared/NavBar/NavBar";
import SideBar from "../../Instructor/shared/SideBar/SideBar";


export default function StudentLayout() {
  return (
    <div>
    <div>
      <NavBar />
    </div>
    <div className='flex'>
      
        <SideBar />
      
      <div className='w-full'>
        <Outlet />
      </div>
    </div>
    
  </div>
  )
}
