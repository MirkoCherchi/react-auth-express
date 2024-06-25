import { useState, useEffect } from "react";

const usePersistedAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    return authStatus ? JSON.parse(authStatus) : false;
  });

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  return [isAuthenticated, setIsAuthenticated];
};

export default usePersistedAuth;
