import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticationLayout from "./Modules/Authentication/Layouts/AuthenticationLayout/AuthenticationLayout";
import Login from "./Modules/Authentication/Login/Login";
import Register from "./Modules/Authentication/Register/Register";
import ForgotPassword from "./Modules/Authentication/ForgotPassword/ForgotPassword";
import ResetPassword from "./Modules/Authentication/ResetPassword/ResetPassword";
import InstructorLayout from "./Modules/Layouts/InstructorLayout/InstructorLayout";
import DashBoard from "./Modules/Instructor/DashBoard/DashBoard";
import ListGroup from "./Modules/Instructor/Group/ListGroup/ListGroup";
import BankOfQuestions from "./Modules/Instructor/Quistion/BankOfQuestions/BankOfQuestions";
import InstructorRoute from "./Modules/protectedRoutes/InstructorRoute/InstructorRoute";
import Students from "./Modules/Instructor/Students/Students/Students";


import Results from './Modules/Instructor/Results/Results/Results'

import SDashBoard from './Modules/Student/SDashBoard/SDashBoard'
import StudentProtectedRoute from './Modules/Student/StudentProtectedRoute/StudentProtectedRoute'
import StudentLayout from './Modules/Student/StudentLayout/StudentLayout'
import QuizzesLists from './Modules/Instructor/Quizzes/QuizzesList/QuizzesLists'
import QuizzesDetails from './Modules/Instructor/Quizzes/QuizzesDetails/QuizzesDetails'
import Result from './Modules/Student/result/Result'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthenticationLayout />,
      errorElement: <div>404</div>,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
      ],
    },
    {
      path: "instructor",
      element: (
        <InstructorRoute>
          <InstructorLayout />
        </InstructorRoute>
      ),
      errorElement: <div>404</div>,
      children: [
        {
          index: true,
          element: <DashBoard />,
        },
        {
          path: "DashBoard",
          element: <DashBoard />,
        },
        {
          path: "groups",
          element: <ListGroup />,
        },
        {
          path: "quistion-bank",
          element: <BankOfQuestions />,
        },
        {
          path: "students",
          element: <Students />,
        },
        {
          path: "quizes",
          element: <QuizzesLists />,
        },
        {
          path: "quizesDetails/:id",
          element: <QuizzesDetails />,
        },
        {
          path: "result",
          element: <Results />,
        },
      ],
    },
    {
      path: "student",
      element: (
        <StudentProtectedRoute>
          <StudentLayout />
        </StudentProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <SDashBoard />,
        },
        {
          path: "dashboard",
          element: <SDashBoard />,
        },
        {
          path: 'result',
          element: <Result />
        }

      ]
},
    
  
  ])

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
