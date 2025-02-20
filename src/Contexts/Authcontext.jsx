import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import auth from "../Firebase/Firebase_init";

export  const Authcontext = createContext(null)
// eslint-disable-next-line react/prop-types
export default function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading , setLoading] = useState(null)
  
    const login = async () => {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    };
  
    const logout = async () => {
      await signOut(auth);
      setUser(null);
    };
    useEffect(()=>{
        const Unsubscribed  = onAuthStateChanged(auth,(currentUser)=>{
            console.log(currentUser)
          setUser(currentUser)
          setLoading(false)
        })
          return ()=>[
            Unsubscribed()
          ]
      },[])
  
    const info = {
        name:'meghla',
        user,
        loading,
        login,
        logout
    }
  return (
   <Authcontext.Provider value={info}>
{children}
   </Authcontext.Provider>
  )
}

