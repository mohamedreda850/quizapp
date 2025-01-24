import React, { useEffect, useState } from 'react'
import { axiosInstance, RESULT_URLS } from '../../../../Services/URLS/INSTRUCTOR_URLS/INSTRUCTORURLS'
import { Link } from 'react-router-dom'

export default function CompletedQuizes() {
  const [quizes, setQuizes] = useState([])
  

  useEffect(() => {const getcompletedQuizes = async () => {
    const { data } = await axiosInstance.get(RESULT_URLS.LAST_FIVE_COMPLETED)
    console.log(data)
    setQuizes(data)
  }
    getcompletedQuizes()
  }, [])
  return (
    <div className='m-7 border border-gray-300 p-5 rounded-md'>
      <div>
        <h1>
          Completed Quizes
        </h1>
      </div>


      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left mt-5 rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
            
              <th scope="col" className="px-6 py-3">
                Participants
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">

              </th>
            </tr>
          </thead>
          <tbody>
            {quizes?.map((quiz, index) => (<tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {quiz.title}
              </th>
              
              <td className="px-6 py-4">
                {quiz.participants}
              </td>
              <td className="px-6 py-4">
                date
              </td>
              <td className="px-6 py-4">
                <button className='bg-text px-2 py-1 rounded-md text-black'><Link to={`result/${quiz._id}`}>View</Link></button>
              </td>
            </tr>))}



          </tbody>
        </table>
      </div>

    </div>
  )
}
