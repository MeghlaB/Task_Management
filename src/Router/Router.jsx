import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Layout from "../MainLayout/Layout";

const router = createBrowserRouter([
   {
    path:'/',
    element:<Layout></Layout>,
    children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/login',
            element:<Login></Login>
        }
    ]
   },
 
  ]);

export default router