import { createContext, useState } from "react"

export const UserContext = createContext(0)

export default function UserContextProvider({
    children
}){
    const [token, setToken] = useState('')
    function getToken(){
        if(typeof window !== 'undefined'){
            setToken(localStorage.getItem('token'))
        }
    }

    return <UserContext.Provider value={{token , getToken}}>
        {children}
    </UserContext.Provider>
}