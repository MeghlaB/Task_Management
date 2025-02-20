import { createContext } from "react"



export  const Authcontext = createContext(null)
// eslint-disable-next-line react/prop-types
export default function AuthProvider({children}) {
    const info = {
        name:'meghla'
    }
  return (
   <Authcontext.Provider value={info}>
{children}
   </Authcontext.Provider>
  )
}

