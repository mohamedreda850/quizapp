import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "flowbite";
import "flowbite/dist/flowbite.min.js";

import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/index.ts'
import ForgotPassword from './Modules/Authentication/ForgotPassword/ForgotPassword.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
     <App /> 
    </Provider>
    
  </StrictMode>,
)