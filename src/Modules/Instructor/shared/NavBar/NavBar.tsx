import React, { useState } from "react";
import { LuTimer } from "react-icons/lu";

export default function NavBar() {
  // Mapping route names to display names
  const routeName = {
    "/instructor": "Dashboard",
    "/instructor/groups": "Groups",
    "/instructor/quistion-bank": "Questions",
    "/instructor/students": "Students",

  };
  const currentRoute = routeName[location.pathname] || "Page Not Found";

 
  const data = localStorage.getItem("quizUser");
  const parsedData = JSON.parse(data);

 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-300 ">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        
       
        <div className="text-lg font-semibold">{currentRoute}</div>

        
      
          <button className="flex items-center ml-auto mr-5 px-4 py-2 border rounded-full text-sm font-medium text-black hover:bg-gray-100">
          
            <LuTimer className="mr-2" />
            New Quiz
          </button>
        

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
       
              className={`absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg ${
                isDropdownOpen ? "block" : "hidden"
              }`}
            >
             
             
              <div className="py-2">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
