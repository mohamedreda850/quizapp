import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "./../node_modules/flowbite/dist/flowbite.min.css"
import "./../node_modules/flowbite/dist/flowbite.min.js"
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
