import { useEffect, useState } from 'react'
import { FaArrowCircleRight, FaPlusCircle } from 'react-icons/fa'

import { axiosInstance, STUDENT_URLS } from '../../../../Services/URLS/INSTRUCTOR_URLS/INSTRUCTORURLS';

export default function Students() {
  const [students, setStudents] = useState()
  const getStudents = async () =>{
    try {
      const res = await axiosInstance.get(STUDENT_URLS.GET_ALL_STUDENTS);
      setStudents(res?.data)
      
      
    } catch (error) {
      console.log
  } }
  useEffect(() => {
    getStudents()
  
   
  }, [])
  
  return (
    <section className='w-full p-3'>
      <div className='flex items-end '>
        <button className="flex ml-auto items-center mr-5 px-4 py-2 border rounded-full text-sm font-medium text-black hover:bg-gray-100">

          <FaPlusCircle className="mr-2" />
          New Quiz
        </button>
      </div>
      <div className='m-3 border border-gray-400 rounded-md p-4'>
        <h2>Students List</h2>
        <div className='grid grid-cols-1  lg:grid-cols-2'>
          {students.map((student:any)=>(
            <div className='border border-gray-300 rounded-md p-2 m-2 flex justify-between items-center'>
            <div>
            <h3>name</h3>
            <p className='text-gray-500 text-sm'>class rank | avarage score</p>
            </div>
            <FaArrowCircleRight className='text-2xl'/>
          </div>
          ))}
          
          
          
        </div>

      </div>
    </section>
  )
}
