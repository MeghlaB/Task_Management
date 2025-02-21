import  { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import router from './Router/Router.jsx'
import AuthProvider from './Contexts/Authcontext.jsx'
import ThemeProvider from './Contexts/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  
  <ThemeProvider>
  <AuthProvider>
  <RouterProvider router={router}></RouterProvider>
  </AuthProvider>
  </ThemeProvider>
   
  </StrictMode>,
)
