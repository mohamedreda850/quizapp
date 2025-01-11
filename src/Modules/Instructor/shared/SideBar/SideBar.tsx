import './SideBar.css'

import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import homeImg from '../../../../assets/images/Icon-home.png'
import groupImg from '../../../../assets/images/Icon-group.png'
import quizImg from '../../../../assets/images/Icon-quiz.png'
import resultImg from '../../../../assets/images/Icon-result.png'
import helpImg from '../../../../assets/images/Icon-help.png'
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SideBar() {
  const [activeItem, setActiveItem] = useState('dashboard');  // Store the active item
  return (
<div className='h-screen'>
        <Sidebar className='h-full bg-[#ffffff]'>
            <Menu>
                <MenuItem icon={<img src={homeImg} alt="" />}   component={<Link to="/dashboard" />}
                  active={activeItem === 'dashboard'}  
                  onClick={() => setActiveItem('dashboard')}  
                > Dashboard </MenuItem>
                <MenuItem icon={<img src={groupImg} alt="" />}  component={<Link to="/groups" />}
                  active={activeItem === 'groups'}  
                  onClick={() => setActiveItem('groups')}  
                > Groups </MenuItem>
                <MenuItem icon={<img src={quizImg} alt="" />}
                  active={activeItem === 'quizzes'}  
                  onClick={() => setActiveItem('quizzes')}  
                > Quizzes </MenuItem>
                <MenuItem icon={<img src={resultImg} alt="" />}
                  active={activeItem === 'results'}  
                  onClick={() => setActiveItem('results')}  
                > Results </MenuItem>
                <MenuItem icon={<img src={helpImg} alt="" />}> Help </MenuItem>
            </Menu>
        </Sidebar>
        </div>
    
  )
}
