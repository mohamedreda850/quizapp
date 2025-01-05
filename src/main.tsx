import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "./../node_modules/flowbite/dist/flowbite.min.css"
import "./../node_modules/flowbite/dist/flowbite.min.js"
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
     <App /> 
    </Provider>
    
  </StrictMode>,
)