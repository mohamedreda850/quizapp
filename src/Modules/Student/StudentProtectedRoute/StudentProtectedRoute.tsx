import React from 'react'
import { Navigate } from 'react-router-dom'

export default function StudentProtectedRoute({children}) {
    const userData:string|null = localStorage.getItem("quizUser")
  const acssesToken = localStorage.getItem("quizToken")  
  const parsedUserData:object = JSON.parse(userData)
  if(acssesToken && parsedUserData?.role == "Student")return children
  else return <Navigate to="/" />
}
