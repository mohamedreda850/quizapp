import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import {
  axiosInstance,
  RESULT_URLS,
} from "../../../Services/URLS/INSTRUCTOR_URLS/INSTRUCTORURLS";

export default function SDashBoard() {
  const [quizes, setQuizes] = useState([]);
  const [completed, setcompleted] = useState([]);

  const getUpcomingQuizes = async () => {
    try {
      const { data } = await axiosInstance.get(
        RESULT_URLS.FIRST_FIVE_INCOMMING
      );
      console.log(data);
      setQuizes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCompletedQuizes = async () => {
    try {
      const { data } = await axiosInstance.get(RESULT_URLS.LAST_FIVE_COMPLETED);
      console.log(data);
      setcompleted(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUpcomingQuizes();
    getCompletedQuizes();
  }, []);

  return (
    <>
      <button className=" m-5 relative border p-5 rounded-md px-16">
        <div>
          <svg
            className="w-15 h-15"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 4.28571C14.5714 4.28571 2.14286 16.7143 2.14286 32.1429C2.14286 47.5714 14.5714 60 30 60C45.4286 60 57.8571 47.5714 57.8571 32.1429C57.8571 16.7143 45.4286 4.28571 30 4.28571ZM30 55.9286C16.9286 55.9286 6.21429 45.2143 6.21429 32.1429C6.21429 19.0714 16.9286 8.35714 30 8.35714C43.0714 8.35714 53.7857 19.0714 53.7857 32.1429C53.7857 45.2143 43.0714 55.9286 30 55.9286ZM3.64286 12.2143L12.2143 3.64286C13.0714 2.78571 13.0714 1.5 12.2143 0.642857C11.3571 -0.214286 10.0714 -0.214286 9.21429 0.642857L0.642857 9.21429C-0.214286 10.0714 -0.214286 11.3571 0.642857 12.2143C1.07143 12.6429 1.5 12.8571 2.14286 12.8571C2.78571 12.8571 3.21429 12.6429 3.64286 12.2143ZM59.3571 9.21429L50.7857 0.642857C49.9286 -0.214286 48.6429 -0.214286 47.7857 0.642857C46.9286 1.5 46.9286 2.78571 47.7857 3.64286L56.3571 12.2143C56.7857 12.6429 57.2143 12.8571 57.8571 12.8571C58.5 12.8571 58.9286 12.6429 59.3571 12.2143C60.2143 11.3571 60.2143 10.0714 59.3571 9.21429Z"
              fill="#0D1321"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center mb-5">
            <svg
              className="w-10 h-10"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M36.9282 22.2879H36.7139C35.6424 22.0737 34.7853 21.2165 34.7853 20.1451C34.7853 19.0737 35.6424 18.2165 36.7139 18.0022H39.2853C38.2139 9.00223 31.1424 1.9308 22.1424 0.859375V3.4308C21.9282 4.50223 21.071 5.35938 19.9996 5.35938C18.9282 5.35938 18.071 4.50223 17.8567 3.4308V0.859375C8.85672 1.9308 1.7853 9.00223 0.713867 18.0022H3.2853C4.35672 18.2165 5.21387 19.0737 5.21387 20.1451C5.21387 21.2165 4.35672 22.0737 3.2853 22.2879H0.713867C1.7853 31.2879 8.85672 38.3594 17.8567 39.4308V36.8594C18.071 35.7879 18.9282 34.9308 19.9996 34.9308C21.071 34.9308 21.9282 35.7879 22.1424 36.8594V39.4308C31.1424 38.3594 38.2139 31.2879 39.2853 22.2879H36.9282C37.1424 22.2879 37.1424 22.2879 36.9282 22.2879ZM28.571 22.2879H22.1424V28.7165C22.1424 29.7879 21.071 30.8594 19.9996 30.8594C18.9282 30.8594 17.8567 29.7879 17.8567 28.7165V22.2879H11.4282C10.3567 22.2879 9.2853 21.2165 9.2853 20.1451C9.2853 19.0737 10.3567 18.0022 11.4282 18.0022H17.8567V11.5737C17.8567 10.5022 18.9282 9.4308 19.9996 9.4308C21.071 9.4308 22.1424 10.5022 22.1424 11.5737V18.0022H28.571C29.6424 18.0022 30.7139 19.0737 30.7139 20.1451C30.7139 21.2165 29.6424 22.2879 28.571 22.2879Z"
                fill="#0D1321"
              />
            </svg>
          </div>
        </div>

        <div>
          <span className="text-xl font-semibold">Join Quiz</span>
        </div>
      </button>

      <div className="flex">
        <div className="border p-5 rounded-md w-[50%] m-6">
          <h1 className="font-semibold text-xl">Upcoming quizzes</h1>
          {/* Put start of quizzes array here */}
          <div className="flex items-center border rounded-md mt-2">
            <div className="me-2 bg-[#ffeddf]">
              <img src="" className="w-5" alt="" />
            </div>
            <div className="p-3 flex-grow">
              <h2 className="text-lg font-semibold mb-2">
                Introduction to computer programming
              </h2>
              <p className="font-medium text-sm">12 / 3/ 2023 | 9:00 am</p>
            </div>
            <div className="flex items-center justify-end p-3">
              <button className="flex items-center space-x-2 font-semibold">
                <span>Open</span>
                <FaArrowRight className="w-6 h-6 p-1 bg-text text-white rounded-full" />
              </button>
            </div>
          </div>
        </div>
        <div className="border p-5 rounded-md w-[50%] m-6 relative">
          <div className="p-6">
            <h1 className="font-semibold text-xl mb-4">Completed quizzes</h1>

            <button className="absolute top-4 right-4 flex items-center gap-2 p-2  rounded-md">
              <span className="text-black">Results</span>
              <FaArrowRight className="w-6 h-6 p-1 text-text rounded-full" />
            </button>

            <div className="grid grid-cols-4 gap-1 w-full">
              {/* Header Row */}
              <div className="bg-black text-white p-2 text-center font-semibold">
                Group Name
              </div>
              <div className="bg-black text-white p-2 text-center font-semibold">
                No. of Persons
              </div>
              <div className="bg-black text-white p-2 text-center font-semibold">
                Data
              </div>
              <div className="bg-black text-white p-2 text-center font-semibold">
                Details
              </div>

              {/* Data Row 1 */}
              <div className="border border-[#CCCCCC] p-2 text-center">
                Group A
              </div>
              <div className="border border-[#CCCCCC] p-2 text-center">10</div>
              <div className="border border-[#CCCCCC] p-2 text-center">
                March 2025
              </div>
              <div className="border border-[#CCCCCC] p-2 text-center">
                Completed
              </div>

              {/* Data Row 2 */}
              <div className="border border-[#CCCCCC] p-2 text-center">
                Group B
              </div>
              <div className="border border-[#CCCCCC] p-2 text-center">15</div>
              <div className="border border-[#CCCCCC] p-2 text-center">
                June 2025
              </div>
              <div className="border border-[#CCCCCC] p-2 text-center">
                Ongoing
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
