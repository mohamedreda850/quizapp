import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { axiosInstance, QUESTION_URLS } from '../../../../Services/URLS/INSTRUCTOR_URLS/INSTRUCTORURLS';
import { FaPlusCircle } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

interface questionData {

    _id: string,
    title: string,
    description: string,
    type: string,
    difficulty: string,
    
  }

  // src/components/Modal.tsx


const Modal: React.FC<{ isOpen: boolean, onClose: () => void, onConfirm: () => void }> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" className="w-4 h-4">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>
        <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this product?</h3>
        <div className="flex justify-center">
          <button onClick={onConfirm} className="bg-red-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-700">Yes, I'm sure</button>
          <button onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400">No, cancel</button>
        </div>
      </div>
    </div>
  );
};




export default function BankOfQuestions() {

  const [questionList, setQuestionList] = useState([]);
  const [selectedId, setSelectedId] = useState('');

   const token = localStorage.getItem("quizToken");

   const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (id:any) => {
    setIsModalOpen(true);
    setSelectedId(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    console.log('Product deleted');
    deletQuestion();
    setIsModalOpen(false);
  };

  let getQuestions = async() => {
    try {
     let response = await axios.get("https://upskilling-egypt.com:3005/api/question",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
     console.log(response.data)
 
     setQuestionList(response.data);
    } catch (error) {
     console.log(error)
    }
   };

    let deletQuestion = async() => {
    try {
      let response = await axios.delete(`https://upskilling-egypt.com:3005/api/question/${selectedId}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
      );
    //   toast.success('Item deleted successfuly');
      getQuestions();
    } catch (error) {

      console.log(error);
    //   toast.error(error.response.data.message);
    }
    
    // handleClose()
  }
  // function handleDel(id:any) {
  //   setSelectedId(id)
  //   deletQuestion();
  //   getQuestions();
  // }

   useEffect(() => {
    getQuestions();
    
  }, []);

  return (
    <div className=''>
      <div className=' flex justify-between items-center p-4'>
        <h5>Bank Of Questions</h5>
        <button className='flex text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' ><span><FaPlusCircle /></span>
        Add Question</button>
      </div>
      

<div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-primary dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                Question Title
                </th>
                <th scope="col" className="px-6 py-3">
                Question  Desc
                </th>
                <th scope="col" className="px-6 py-3">
                Question difficulty level
                </th>
                <th scope="col" className="px-6 py-3">
                Question type  
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {questionList.map((question:questionData) =>(
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {question.title}
                </th>
                <td className="px-6 py-4">
                    {question.description}
                </td>
                <td className="px-6 py-4">
                    {question.difficulty}
                </td>
                <td className="px-6 py-4">
                    {question.type}
                </td>
                <td className="px-6 py-4 text-center">
                    {/* <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                    <button className='mr-3 text-[#FB7C19]'><FaEye /></button>
                    <button className='mr-3 text-[#FB7C19]'><FaRegEdit /></button>
                    <button className='mr-3 text-[#FB7C19]' onClick={()=> handleOpenModal(question._id)}><RiDeleteBin6Line /></button>
                </td>
            </tr>
            ))}
            
           
        </tbody>
    </table>
</div>
<button onClick={handleOpenModal} className="text-white bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-lg">
        Toggle modal
      </button>

      <Modal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />    
      
    </div>
  )
}
