import { useContext } from "react"
import { Authcontext } from "../Contexts/Authcontext"

function Home() {
      const {name} = useContext(Authcontext)
        console.log(name)
  return (
    <div>
      
    </div>
  )
}

export default Home
