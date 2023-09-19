import { createContext, useState } from "react";

export const LoginDataContext = createContext(null);

const LoginDataContextProvider = ({ children }) => {
  const [userData, setUserData] = useState("");
  return (
    <LoginDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </LoginDataContext.Provider>
  );
};

export default LoginDataContextProvider;