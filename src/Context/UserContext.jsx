import { useEffect } from 'react';
import { createContext, useState } from 'react';


/**
 * Context to manage user-related data and actions.
 * @type {React.Context}
 */
export let UserContext = createContext();

export  default function UserContextProvider({children}){

    const [userToken, setUserToken] = useState(null)

    useEffect(()=>{
        let token = localStorage.getItem('userToken')
        if(token){
            setUserToken(token)
        }
    }
    ,[])

    return <UserContext.Provider value={{userToken, setUserToken }}>
            {children}
        </UserContext.Provider>
   
}