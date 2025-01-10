import { useEffect, useState } from 'react'
import { FaArrowCircleRight, FaPlusCircle } from 'react-icons/fa'

import { axiosInstance, STUDENT_URLS } from '../../../../Services/URLS/INSTRUCTOR_URLS/INSTRUCTORURLS';

export default function Students() {
  const [students, setStudents] = useState()
  const [currentPage, setCurrentPage] = useState<number>(1);
    const [groupsPerPage] = useState<number>(10);
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
  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentStudents = students?.slice(indexOfFirstGroup, indexOfLastGroup);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
          {currentStudents?.map((student:any)=>(
            <div className='border border-gray-300 rounded-md p-2 m-2 flex justify-between items-center'>
            <div>
            <h3>{student.first_name} {student.last_name}</h3>
            <p className='text-gray-500 text-sm'>gruop:{student?.group?.name}  | status: {student.status}</p>
            </div>
            <FaArrowCircleRight className='text-2xl'/>
          </div>
          ))}
          
          
          
        </div>
        <div className="text-center py-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2"
          >
            ...
          </button>
          <span> {currentPage}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage * groupsPerPage >= students?.length}
            className="px-4 py-2 mx-2"
          >
            ...
          </button>
        </div>
      </div>
    </section>
  )
}
