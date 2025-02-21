import { Outlet } from "react-router-dom";
import Footer from "../Pages/Footer";




export default function Layout() {
  return (
    <div>
      <Outlet></Outlet>
     <div className="mt-5">
     <Footer ></Footer>
     </div>
    </div>
  )
}
