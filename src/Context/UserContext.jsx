import { useEffect } from 'react';
import { createContext, useState } from 'react';

/**
 * Context to manage user-related data and actions.
 * @type {React.Context}
 */
export let UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem('userToken');
    let name = localStorage.getItem('userName');
    if (token) {
      setUserToken(token);
    }
    if (name) {
      setUserName(name);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userToken, setUserToken, userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}