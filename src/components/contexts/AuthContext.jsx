import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (authData && authData.isAuthenticated) {
      setUser(authData.user);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("authData", JSON.stringify({ isAuthenticated, user }));
  }, [isAuthenticated, user]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
