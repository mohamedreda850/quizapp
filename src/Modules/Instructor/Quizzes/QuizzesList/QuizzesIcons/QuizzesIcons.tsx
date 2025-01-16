import { Link } from "react-router-dom";
import img1 from "../../../../../assets/Images/new quiz icon.png";
import img2 from "../../../../../assets/Images/Vault icon.png";

import React, { useEffect, useState } from 'react';
import { MdDone } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { FaCopy } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { axiosInstance, GROPU_URLS, QUIZ_URLS } from "../../../../../Services/URLS/INSTRUCTOR_URLS/INSTRUCTORURLS";

interface Quiz {
  title: string;
  description?:string;
  group:string;
  questions_number:number;
  difficulty:string;
  type:string;
  schadule:string;
  duration:number;
  score_per_question:number;
  code?:string
    
  }

  interface Group {
    name: string;
    _id?: string;
  }

  
  // code modal 
  const CodeModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    code: string;
  }> = ({ isOpen, onClose,code }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md ">
        
          <div className='text-3xl bg-black text-white w-[30px] m-auto rounded-full' >
          <MdDone/>
          </div>
          <h1 className="text-lg font-semibold mb-4 text-center">
          Quiz was successfully created
          </h1>
          <div className="flex  mb-8 border border-solid border-black rounded-2xl relative">
         <h3 style={{ backgroundColor: 'rgba(255, 237, 223, 1)' }} className="block text-sm font-medium px-2 pt-2 rounded-tl-[1.5rem] rounded-bl-[1.5rem]">CODE:</h3>
         <p className="w-full p-2  ">{code}</p>
            <div className='absolute right-[10px] top-[10px] text-[20px]'><FaCopy/></div>
                
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
function QuizzesIcons() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCodeOpen, setIsModaCodelOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [code, setCode] = useState(''); 
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleOpenCodeModal = () => {
    setIsModaCodelOpen(true);
  };

  const handleCloseCodeModal = () => {
    setIsModaCodelOpen(false);
    setCode('');
  };

  const{
    formState:{isSubmitting,errors},
    handleSubmit,
    register,
    setValue
  } = useForm({mode:"onChange"});

  const getGroupList = async () => {
    try {
      const response = await axiosInstance.get(GROPU_URLS.GET_GRUOP);
      setGroups(response.data);
      setError(null);
    } catch (error) {
      setError("Error fetching groups.");
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    getGroupList();
  }, []);

  const handleAddQuiz = async (data:Quiz) => {
    try {
      const response = await axiosInstance.post(QUIZ_URLS.CREATE_QUIZ, data);
      console.log(response.data.data.code)
      setIsModalOpen(false); // Close the modal
      // console.log(response.data);
      setCode(response.data.data.code)
      console.log(code)
      handleOpenCodeModal();
      
    } catch (error) {
      console.log("Error adding group:", error);
    //   setError("Error adding group.");
    }
  };
  return (
    <>
      <div className="flex gap-8">
        <div
        onClick={() => setIsModalOpen(true)}
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            width: "13rem",
            height: "8rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img className="mt-5" src={img1} alt="" />
          <p
            className="my-3"
            style={{ fontWeight: "700", fontSize: "1.25rem" }}
          >
            Set up a new quiz
          </p>
        </div>
        <Link to="/instructor/quistion-bank">
          <div
            style={{
              border: "1px solid black",
              borderRadius: "10px",
              width: "13rem",
              height: "8rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img className="mt-5" src={img2} alt="" />
            <p
              className="my-2"
              style={{ fontWeight: "700", fontSize: "1.25rem" }}
            >
              Question Bank
            </p>
          </div>
        </Link>
      </div>

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
                    <div className="flex">
         <label style={{ backgroundColor: 'rgba(255, 237, 223, 1)' }} className="block border rounded text-sm font-medium mb-3 px-2 ">Title</label>
        
               <input
        
                      type="text"
                      placeholder="Enter Quiz Title"
                      className="w-full p-2 border rounded mb-3"
                      {...register("title",{required:"this field is required"})}
                  />
                   {errors?.name&&<span className='text-red-500'>{errors?.title?.message}</span>}
                    </div>
                   <div className="flex">
                   <div className="flex">
                      {/* Duration (in minutes) */}
                      <label style={{ backgroundColor: 'rgba(255, 237, 223, 1)' }} className="block text-sm font-medium mb-3 px-2 ">Duration (in minutes)</label>
                      <input
                      type="number"
                      {...register("duration",{required:"this field is required"})}
                      className="w-full p-2 border rounded mb-3"
                  />
                  {errors?.duration &&<span className='text-red-500'>{errors?.duration?.message}</span>}
            </div>
            <div className="flex">
                      {/* No. of questions */}
                      <label style={{ backgroundColor: 'rgba(255, 237, 223, 1)' }} className="block text-sm font-medium mb-3 px-2 ">No. of questions</label>
                      <input
                      type="number"
                      {...register("questions_number",{required:"this field is required"})}
                      className="w-full p-2 border rounded mb-3"
                  />
                  {errors?.questions_number &&<span className='text-red-500'>{errors?.questions_number?.message}</span>}
            </div>
            <div className="flex">
                      {/* Score per question */}
                      <label style={{ backgroundColor: 'rgba(255, 237, 223, 1)' }} className="block text-sm font-medium mb-3 px-2 ">Score per question</label>
                      <input
                      type="text"
                      className="w-full p-2 border rounded mb-3"
                      {...register("score_per_question",{required:"this field is required"})}
                  />
                  {errors?.score_per_question &&<span className='text-red-500'>{errors?.score_per_question?.message}</span>}
            </div>
                   </div>
                   <div className="flex">
                   {/* description  */}
         <label style={{ backgroundColor: 'rgba(255, 237, 223, 1)' }} className="block border rounded text-sm font-medium mb-3 px-2 ">Description</label>
        <textarea  id=""  className="w-full p-2 border rounded mb-3"
        {...register("description")}
        >

        </textarea>
        
                    </div>
                    <div className="flex">
                      {/* Schedule */}
                      <label style={{ backgroundColor: 'rgba(255, 237, 223, 1)' }} className="block text-sm font-medium mb-3 px-2">Schedule</label>
                      <input
                      type="datetime-local"
                      className=" p-2 border rounded mb-3"
                      {...register("schadule",{required:"this field is required"})}
                  />
                   {errors?.schadule &&<span className='text-red-500'>{errors?.schadule?.message}</span>}
                   </div>
                   <div className="flex">
                   <div className="flex">
                      {/* diffculty */}
                      <label style={{ backgroundColor: 'rgba(255, 237, 223, 1)' }} className="block text-sm font-medium mb-3 px-2 ">Difficulty leve</label>
                      <select
              className="w-full p-2 border rounded mb-3"
              {...register("difficulty",{required:"this field is required"})}
            >
              <option value="">difficulty level</option>
              <option value="entry">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
            {errors?.difficulty &&<span className='text-red-500'>{errors?.difficulty?.message}</span>}
            </div>
            <div className="flex">
                      {/*Category type*/}
                      <label style={{ backgroundColor: 'rgba(255, 237, 223, 1)' }} className="block text-sm font-medium mb-3 px-2 ">Category type</label>
                      <select
                      {...register('type')}
              className="w-full p-2 border rounded mb-3"
            >
              <option value="FE">FE</option>
              <option value="BE">BE</option>
              <option value="DO">DO</option>
            </select>
            </div>
            <div className="flex">
                      {/* Group name */}
                               <label style={{ backgroundColor: 'rgba(255, 237, 223, 1)' }} className="block text-sm font-medium mb-3 px-2 ">Group name</label>
                     
                                 <select 
                                 {...register("group",{required:"this field is required"})}
                                 className="w-full p-2 border rounded mb-3"
                               >
                                 <option value="">group name</option>
                                 {groups?.map(group => <option value={group._id} key={group._id}>{group.name}</option>)}
                                 
                               </select>
                               {errors?.group &&<span className='text-red-500'>{errors?.group?.message}</span>}      
             
            </div>
                   </div>
            
                  </div>
                </div>
                </form>
                
              )}
       <CodeModal
       isOpen={isModalCodeOpen}
       onClose={handleCloseCodeModal}
       code = {code}
       />
    </div>
    </>
  );
}

export default QuizzesIcons;
