import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {

  // State ---------------------------------------
  const [loggedinUser, setLoggedinUser] = useState(null);

  // Methods -------------------------------------
  const login = (userObj) => setLoggedinUser(userObj);
  const logout = () => setLoggedinUser(null);

  // Return --------------------------------------
  return (
    <AuthContext.Provider value={{ loggedinUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
