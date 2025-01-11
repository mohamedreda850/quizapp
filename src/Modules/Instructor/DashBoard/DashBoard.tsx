import img1 from "./../../../assets/Images/img-2.png"
import img2 from "./../../../assets/Images/img3.png"
import userImg1 from "./../../../assets/Images/user img-2.png"
import userImg2 from "./../../../assets/Images/user img.png"
import userImg3 from "./../../../assets/Images/user img-3.png"
import { useEffect, useState } from "react"
import { axiosInstance, RESULT_URLS, STUDENT_URLS } from "../../../Services/URLS/INSTRUCTOR_URLS/INSTRUCTORURLS"
export default function DashBoard() {
  const [students, setStudents] = useState([])
  const [quizes, setQuizes] = useState()
  const userImages = [userImg1, userImg2, userImg3];
const getUpcomingQuizes =async ()=>{
  try {
    const {data} = await axiosInstance.get(RESULT_URLS.FIRST_FIVE_INCOMMING)
    console.log(data);
    setQuizes(data)
  } catch (error) {
    console.log();
    
  }
}
  const getTopFiveStudents = async () => {
    try {
      const { data } = await axiosInstance.get(STUDENT_URLS.TOP_FIVE_STUDENT)
      console.log(data);
      setStudents(data)
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    getTopFiveStudents()
    getUpcomingQuizes()
  }, [])
  return (
    <div className='flex'>
      <div className='border p-5 rounded-md w-[50%] m-6 '>
        <h1 className="mb-2">Upcoming 5 quizzes</h1>
        {quizes?.map((quiz , index)=>(<div className="flex items-center border rounded-md mt-2">
          <div
            className="me-2 bg-[#ffeddf]"
          ><img src={index % 2 ? img1 :img2} className="" alt="" /></div>
          <div className="p-3">
            <h2 className="text-md mb-2">{quiz.title}</h2>

            <p className="font-thin text-xs">{new Date(quiz.schadule).toLocaleDateString()} | {new Date(quiz.schadule).toLocaleTimeString()}</p>
            <p className="text-xs">number of students enrolled : {quiz.participants}</p>
          </div>

        </div>))}
        
      </div>

      <div className='border p-5 rounded-md w-[40%] m-6 '>
        <h1 className="mb-2">Upcoming 5 quizzes</h1>
        {students?.map((student ,index) => (<div className="flex items-center border rounded-md mt-2">
          <div
            className="me-2 bg-[#ffeddf]"
          ><img src={userImages[index % userImages.length]} className="" alt="" /></div>
          <div className="p-1">
            <h2 className="text-md mb-2">{student.first_name} {student.last_name}</h2>

            <p className="font-thin text-xs">avrage score : {student.avg_score} </p>

          </div>

        </div>))}

      </div>

    </div>
  )
}
