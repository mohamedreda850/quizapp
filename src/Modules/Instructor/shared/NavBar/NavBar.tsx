import React, { useState } from "react";
import { LuTimer } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const data = localStorage.getItem("quizUser");
  const parsedData = JSON.parse(data);

  const role = parsedData?.role;
  const routeName = {
    "/instructor": "Dashboard",
    "/instructor/groups": "Groups",
    "/instructor/quistion-bank": "Questions",
    "/instructor/students": "Students",
    "/student": "Dashboard",
    "/student/dashboard": "Dashboard",
    "/student/result": "result",

    "/student/exam": "Exam",
  };
  const currentRoute = routeName[location.pathname] || "Page Not Found";





  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const logOut = () => {
    localStorage.removeItem("quizUser");
    localStorage.removeItem("quizToken");
    navigate("/");
  }
  return (
    <nav className="bg-white border-b border-gray-300 ">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">


        <div className="text-lg font-semibold">{currentRoute}</div>

        {role == "Instructor" && <button className="flex items-center ml-auto mr-5 px-4 py-2 border rounded-full text-sm font-medium text-black hover:bg-gray-100">

          <LuTimer className="mr-2" />
          New Quiz
        </button>}




        <div className="flex items-center space-x-4">

          <div className="text-left">

            <h2 className="text-sm font-semibold">{parsedData.first_name} {parsedData.last_name}</h2>

            <p className="text-xs text-text">{parsedData.role}</p>
          </div>


          <div className="relative">
            <button

              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >

              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 4 15"
              >
                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
            </button>


            <div

              className={`absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg ${isDropdownOpen ? "block" : "hidden"
                }`}
            >


              <div className="py-2">
                <button
                  onClick={logOut}
                  className="block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
