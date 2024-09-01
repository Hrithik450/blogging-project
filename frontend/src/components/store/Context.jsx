import { createContext, useContext, useState } from "react";

export const Context = createContext({
  isAuthenticated: false,
});

export const ContextProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [User, setUser] = useState({});
  const [Blogs, setBlogs] = useState([]);
  const [Mode, setMode] = useState("dark");

  const values = {
    isAuthenticated,
    setisAuthenticated,
    User,
    setUser,
    Blogs,
    setBlogs,
    Mode,
    setMode,
  };

  return (
    <Context.Provider
      value={{
        ...values,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useMainContext = () => {
  return useContext(Context);
};
