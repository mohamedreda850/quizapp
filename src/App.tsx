import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthenticationLayout from './Modules/Authentication/Layouts/AuthenticationLayout/AuthenticationLayout'
import Login from './Modules/Authentication/Login/Login'
import Register from './Modules/Authentication/Register/Register'
import ForgotPassword from './Modules/Authentication/ForgotPassword/ForgotPassword'
import ResetPassword from './Modules/Authentication/ResetPassword/ResetPassword'

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
