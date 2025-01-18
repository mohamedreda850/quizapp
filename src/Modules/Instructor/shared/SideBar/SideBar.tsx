import "./SideBar.css";

import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import homeImg from "./../../../../assets/Images/home-icon.png";
import groupImg from "./../../../../assets/images/Icon-group.png";
import quizImg from "./../../../../assets/images/Icon-quiz.png";
import resultImg from "./../../../../assets/images/Icon-result.png";

import { useState } from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [activeItem, setActiveItem] = useState("dashboard"); 
  const userData:string|null = localStorage.getItem("quizUser")
  const parsedUserData:object = JSON.parse(userData)
const role = parsedUserData?.role;
  return (
    <div className="h-screen">
      <Sidebar className="h-full bg-[#ffffff]">
        <Menu>
          <MenuItem
            icon={<img src={homeImg} alt="" />}
            component={<Link to={role == "Instructor" ?"/instructor/dashboard" :"/student/dashboard"} />}
            active={activeItem === "dashboard"}
            onClick={() => setActiveItem("dashboard")}
          >
            {" "}
            Dashboard{" "}
          </MenuItem>
          {role == "Instructor" && <MenuItem  icon={<img src={groupImg} alt="" />}
            component={<Link to="/instructor/students" />}
            active={activeItem === "student"}
            onClick={() => setActiveItem("student")} >
              Students
          </MenuItem>}
          {role == "Instructor" && <MenuItem
            icon={<img src={groupImg} alt="" />}
            component={<Link to="groups" />}
            active={activeItem === "groups"}
            onClick={() => setActiveItem("groups")}
          >
            {" "}
            Groups{" "}
          </MenuItem>}
          
          
          {role == "Instructor" &&<MenuItem
            icon={<img src={quizImg} alt="" />}
            component={<Link to="/instructor/quizes" />}
            active={activeItem === "quizzes"}
            onClick={() => setActiveItem("quizzes")}
          >
            {" "}
            Quizzes{" "}
          </MenuItem>}
          
          {role == "Instructor" && <MenuItem
            icon={<img src={resultImg} alt="" />}
            component={<Link to="/instructor/result" />}
            active={activeItem === "results"}
            onClick={() => setActiveItem("results")}
          >
            {" "}
            Results{" "}
          </MenuItem>}
          
        {role == "Student" && <MenuItem icon={<img src={resultImg} alt="" />} 
         active={activeItem === "results"}
         component={<Link to="/student/result" />}
         onClick={() => setActiveItem("results")}
        >
Results
        </MenuItem>}
        </Menu>
      </Sidebar>
    </div>
  );
}
