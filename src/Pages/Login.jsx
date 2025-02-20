import  { useContext } from 'react'
import { Authcontext } from '../Contexts/Authcontext'

export default function Login() {
    const {name} = useContext(Authcontext)
    console.log(name)
  return (
    <div>
      
    </div>
  )
}

