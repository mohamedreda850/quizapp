import React, { useEffect, useState } from "react";
import { LuTimer } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { axiosInstance, GROPU_URLS, QUIZ_URLS } from "../../../../Services/URLS/INSTRUCTOR_URLS/INSTRUCTORURLS";
import { FaCopy } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { useForm } from "react-hook-form";

interface Quiz {
  title: string;
  description?: string;
  group: string;
  questions_number: number;
  difficulty: string;
  type: string;
  schadule: string;
  duration: number;
  score_per_question: number;
  code?: string

}

interface Group {
  name: string;
  _id?: string;
}
const CodeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  code: string;
}> = ({ isOpen, onClose, code }) => {
  if (!isOpen) return null;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      alert("Code copied to clipboard!"); // Provide feedback to the user
    }).catch((error) => {
      console.error("Failed to copy code:", error);
    });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md ">

        <div className='text-3xl bg-black text-white w-[30px] m-auto rounded-full' >
          <MdDone />
        </div>
        <h1 className="text-lg font-semibold mb-4 text-center">
          Quiz was successfully created
        </h1>
        <div className="flex  mb-8 border border-solid border-black rounded-2xl relative">
          <h3 style={{ backgroundColor: 'rgba(255, 237, 223, 1)' }} className="block text-sm font-medium px-2 pt-2 rounded-tl-[1.5rem] rounded-bl-[1.5rem]">CODE:</h3>
          <p className="w-full p-2  ">{code}</p>
          <button
            className="absolute right-[10px] top-[10px] text-[20px] text-gray-500 hover:text-black"
            onClick={copyToClipboard}
          >
            <FaCopy />
          </button>

        </div>
        <div className="flex justify-center">

          <button
            onClick={onClose}
            className="bg-[#C5D86D] text-gray-800 px-10 py-1 rounded-2xl hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default function NavBar() {
  
  const navigate = useNavigate();
  const data = localStorage.getItem("quizUser");
  const parsedData = JSON.parse(data);
 const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCodeOpen, setIsModaCodelOpen] = useState(false);
   const [code, setCode] = useState('');
    const [groups, setGroups] = useState<Group[]>([]);
    const [isEditing, setIsEditing] = useState(false);
  const role = parsedData?.role;
  const handleOpenCodeModal = () => {
      setIsModaCodelOpen(true);
    };
  
    const handleCloseCodeModal = () => {
      setIsModaCodelOpen(false);
      setCode('');
    };
  
    const {
      formState: { isSubmitting, errors },
      handleSubmit,
      register,
      
    } = useForm({ mode: "onChange" });
  const routeName = {
    "/instructor": "Dashboard",
    "/instructor/dashboard": "Dashboard",
    "/instructor/groups": "Groups",
    "/instructor/quistion-bank": "Questions",
    "/instructor/students": "Students",
    "/instructor/quizes": "Quizes",
    "/instructor/result": "Result",
    "/student": "Dashboard",
    "/student/dashboard": "Dashboard",
    "/student/result": "result",

    "/student/exam": "Exam",
  };
  const currentRoute = routeName[location.pathname] || "Page Not Found";


  const handleAddQuiz = async (data: Quiz) => {
    try {
      const response = await axiosInstance.post(QUIZ_URLS.CREATE_QUIZ, data);
      console.log(response.data.data.code)
      setIsModalOpen(false); // Close the modal
      // console.log(response.data);
      setCode(response.data.data.code)
      console.log(response.data);

      handleOpenCodeModal();

    } catch (error) {
      console.log("Error adding group:", error);
      //   setError("Error adding group.");
    }
  };

  const getGroupList = async () => {
    try {
      const response = await axiosInstance.get(GROPU_URLS.GET_GRUOP);
      setGroups(response.data);
      
    } catch (error) {
      
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    getGroupList();
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const logOut = () => {
    localStorage.removeItem("quizUser");
    localStorage.removeItem("quizToken");
    navigate("/");
  }
  return (
    
    <>
    <nav className="bg-white border-b border-gray-300 ">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">


        <div className="text-lg font-semibold">{currentRoute}</div>

        {role == "Instructor" && <button onClick={() => setIsModalOpen(true)}className="flex items-center ml-auto mr-5 px-4 py-2 border rounded-full text-sm font-medium text-black hover:bg-gray-100">

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
    <div>
        {/* Modal */}
        {isModalOpen && (
          <form onSubmit={handleSubmit(handleAddQuiz)}>
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
              <div className="text-center bg-white p-9 rounded-md shadow-md w-[60vw]">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {isEditing ? "Update Quiz" : "Set up a new Quiz"}
                  </h2>
                  <button
                    type="submit"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      width="27"
                      height="25"
                      viewBox="0 0 27 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.10926 23.8156L0.392753 13.6554C-0.130918 13.045 -0.130918 12.0553 0.392753 11.4449L2.28917 9.23428C2.81284 8.62382 3.66197 8.62382 4.18564 9.23428L10.0575 16.0786L22.6344 1.41874C23.158 0.808336 24.0072 0.808336 24.5308 1.41874L26.4272 3.62932C26.9509 4.23972 26.9509 5.22943 26.4272 5.8399L11.0057 23.8157C10.482 24.4261 9.63293 24.4261 9.10926 23.8156Z"
                        fill="black"
                      />
                    </svg>

                    <span className="sr-only">Close modal</span>
                  </button>
                  <button
                    style={{ marginLeft: "2rem" }}
                    onClick={() => setIsModalOpen(false)}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      width="20"
                      height="25"
                      viewBox="0 0 20 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.7909 12.6172L19.4767 5.9897C20.1744 5.1764 20.1744 3.85779 19.4767 3.04384L18.2131 1.57091C17.5153 0.757615 16.3841 0.757615 15.6858 1.57091L10 8.19843L4.3142 1.57091C3.61648 0.757615 2.48523 0.757615 1.78693 1.57091L0.523295 3.04384C-0.174432 3.85713 -0.174432 5.17574 0.523295 5.9897L6.20909 12.6172L0.523295 19.2447C-0.174432 20.058 -0.174432 21.3766 0.523295 22.1906L1.78693 23.6635C2.48466 24.4768 3.61648 24.4768 4.3142 23.6635L10 17.036L15.6858 23.6635C16.3835 24.4768 17.5153 24.4768 18.2131 23.6635L19.4767 22.1906C20.1744 21.3773 20.1744 20.0587 19.4767 19.2447L13.7909 12.6172Z"
                        fill="#0D1321"
                      />
                    </svg>
                  </button>
                </div>
                {/* Quiz Title Input */}
                <div className="w-100 text-center py-2">
                  <input
                    className="w-[95%] p-2.5 border border-gray-300 rounded-lg bg-gradient-to-r from-[#FFEDDF] via-[#ffffff] to-[#ffffff] bg-[length:100%_100%] bg-no-repeat text-black"
                    placeholder="Title"
                    {...register("title", { required: "this field is required" })}
                    type="text"
                  />
                </div>

                <div className="flex w-full justify-between px-5">
                  <div className=" text-center py-2 grow">
                    <input
                      className="w-[95%] p-2.5 border border-gray-300 rounded-lg bg-gradient-to-r from-[#FFEDDF] via-[#ffffff] to-[#ffffff] bg-[length:100%_100%] bg-no-repeat text-black"
                      placeholder="Duration (in minutes) "
                      {...register("duration", { required: "this field is required" })}
                      type="text"
                    />
                    {errors?.duration && <span className='text-red-500'>{errors?.duration?.message}</span>}
                  </div>
                  <div className=" text-center py-2 grow">
                    <input
                      className="w-[95%] p-2.5 border border-gray-300 rounded-lg bg-gradient-to-r from-[#FFEDDF] via-[#ffffff] to-[#ffffff] bg-[length:100%_100%] bg-no-repeat text-black"
                      placeholder="No. of questions "
                      {...register("questions_number", { required: "this field is required" })}
                      type="text"
                    />
                    {errors?.questions_number && <span className='text-red-500'>{errors?.questions_number?.message}</span>}
                  </div>
                  <div className=" text-center py-2 grow">
                    <input
                      className="w-[95%] p-2.5 border border-gray-300 rounded-lg bg-gradient-to-r from-[#FFEDDF] via-[#ffffff] to-[#ffffff] bg-[length:100%_100%] bg-no-repeat text-black"
                      placeholder="Score per question "
                      {...register("score_per_question", { required: "this field is required" })}
                      type="text"
                    />
                    {errors?.score_per_question && <span className='text-red-500'>{errors?.score_per_question?.message}</span>}
                  </div>


                </div>
                <div className=" text-center py-2 grow">
                  {/* description  */}

                  <textarea
                    placeholder="Description"
                    id="" className="w-[95%] p-2.5 border border-gray-300 rounded-lg bg-gradient-to-r from-[#FFEDDF] via-[#ffffff] to-[#ffffff] bg-[length:100%_100%] bg-no-repeat text-black"
                    {...register("description")}
                  >

                  </textarea>

                </div>
                <div className="flex text-center ps-5 pb-2">
                  {/* Schedule */}

                  <input
                    type="datetime-local"
                    className="w-[95%] p-2.5 border border-gray-300 rounded-lg bg-gradient-to-r from-[#FFEDDF] via-[#ffffff] to-[#ffffff] bg-[length:100%_100%] bg-no-repeat text-black"
                    {...register("schadule", { required: "this field is required" })}
                  />
                  {errors?.schadule && <span className='text-red-500'>{errors?.schadule?.message}</span>}
                </div>
                <div className="flex">

                  {/* diffculty */}
                
                    <select
                      className=" mx-4 grow border border-gray-300 rounded-lg  text-black"
                      {...register("difficulty", { required: "this field is required" })}
                    >
                      <option value="" disabled>difficulty level</option>
                      <option value="easy">easy</option>
                      <option value="medium">medium</option>
                      <option value="hard">hard</option>
                    </select>
                    {errors?.difficulty && <span className='text-red-500'>{errors?.difficulty?.message}</span>}


                  

                  {/*Category type*/}

                  <select
                    {...register('type')}
                    className="mx-4 grow border border-gray-300 rounded-lg  text-black"
                  >

                    <option value="" disabled>Type</option>
                    <option value="FE">FE</option>
                    <option value="BE">BE</option>
                    <option value="DO">DO</option>
                  </select>

                  {/* Group name */}


                  <select
                    {...register("group", { required: "this field is required" })}
                    className="mx-4 grow border border-gray-300 rounded-lg  text-black"
                  >
                    <option value="" disabled>group name</option>
                    {groups?.map(group => <option value={group._id} key={group._id}>{group.name}</option>)}

                  </select>
                  {errors?.group && <span className='text-red-500'>{errors?.group?.message}</span>}


                </div>

              </div>
            </div>
          </form>

        )}
        <CodeModal
          isOpen={isModalCodeOpen}
          onClose={handleCloseCodeModal}
          code={code}
        />
      </div>
    </>
  );
}
