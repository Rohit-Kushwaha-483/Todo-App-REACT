import React, { createContext, useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

export const server = "https://todo-app-umil.onrender.com";

export const Context = createContext({
  isAuthenticated: false,
  setIsAuthenticated: null,
  loading: false,
  setLoading: null,
  user: null,
  setUser: null,
});

const Main = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); // Change to null instead of an empty object

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);
