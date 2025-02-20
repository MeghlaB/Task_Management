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
<<<<<<< HEAD
     
    ]
   },
   {
    path:'/login',
    element:<Login></Login>
}
=======
        {
            path:'/login',
            element:<Login></Login>
        }
    ]
   },
>>>>>>> 01521d18853f4bea5068865126898dc1ce2821ec
 
  ]);

export default router