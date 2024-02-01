import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const value = { isAuthenticated, setIsAuthenticated };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const appContext = useContext(AppContext);
  if (appContext == undefined) {
    throw new Error("app context must be used within a context provider");
  }
  return appContext;
};
