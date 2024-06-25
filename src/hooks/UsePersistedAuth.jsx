import { useState, useEffect } from "react";

const usePersistedAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Carica lo stato iniziale da localStorage, se presente
    const authStatus = localStorage.getItem("isAuthenticated");
    return authStatus ? JSON.parse(authStatus) : false;
  });

  useEffect(() => {
    // Salva l'aggiornamento dello stato isAuthenticated in localStorage
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  return [isAuthenticated, setIsAuthenticated];
};

export default usePersistedAuth;
