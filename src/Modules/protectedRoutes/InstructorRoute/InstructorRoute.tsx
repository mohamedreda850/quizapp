import { Navigate, useNavigate } from "react-router-dom"

export default function InstructorRoute({children} :any) {
 
  const userData:string|null = localStorage.getItem("quizUser")
  const acssesToken = localStorage.getItem("quizToken")  
  const parsedUserData:Object = JSON.parse(userData)
  if(acssesToken && parsedUserData?.role == "Instructor")return children
  else return <Navigate to="/" />
}
