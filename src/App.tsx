import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthenticationLayout from './Modules/Authentication/Layouts/AuthenticationLayout/AuthenticationLayout'
import Login from './Modules/Authentication/Login/Login'
import Register from './Modules/Authentication/Register/Register'
import ForgotPassword from './Modules/Authentication/ForgotPassword/ForgotPassword'
import ResetPassword from './Modules/Authentication/ResetPassword/ResetPassword'
import InstructorLayout from './Modules/Layouts/InstructorLayout/InstructorLayout'
import DashBoard from './Modules/Instructor/DashBoard/DashBoard'
import ListGroup from './Modules/Instructor/Group/ListGroup/ListGroup'
import BankOfQuestions from './Modules/Instructor/Quistion/BankOfQuestions/BankOfQuestions'
import InstructorRoute from './Modules/protectedRoutes/InstructorRoute/InstructorRoute'
import Students from './Modules/Instructor/Students/Students/Students'

function App() {

const router = createBrowserRouter([
  {
    path:'/',
    element:<AuthenticationLayout />,
    errorElement:<div>404</div>,
    children:[
      {
        index:true,
        element:<Login />
      },
      {
        path:'login',
        element:<Login />
      },
      {
        path:'register',
        element:<Register/>
      },
      {
        path:'forgot-password',
        element:<ForgotPassword />
      },
      {
        path:'reset-password',
        element:<ResetPassword />
      }
    ]
  },
  {
    path:'instructor',
    element:<InstructorRoute><InstructorLayout /></InstructorRoute>,
    errorElement:<div>404</div>,
    children:[
      {
        index:true,
        element:<DashBoard />
      },
      {
        path:"DashBoard",
        element:<DashBoard />
      },
      {
        path:"groups",
        element:<ListGroup />
      },
      {
        path:"quistion-bank",
        element:<BankOfQuestions />
      },{
        path:"students",
        element:<Students />
      }
    ]
  }
])
  return (
    <>
      
    <RouterProvider router={router} >
      
    </RouterProvider>
    </>
  )
}

export default App
