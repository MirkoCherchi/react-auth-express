import React, { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import usePersistedAuth from "../hooks/UsePersistedAuth";

const apiUrl = import.meta.env.VITE_BASE_API_URL;

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = usePersistedAuth();
  usePersistedAuth;

  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUserData();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/auth/me`);
      setUser(response.data);
      setIsAuthenticated(true);

      redirectToCurrentPage();
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout();
    }
  };

  const handleLogin = async (userData) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userData);
      const { token, data } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(data);
      setIsAuthenticated(true);

      redirectToCurrentPage();
    } catch (error) {
      throw new Error(error.response.data.message || "User not found");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    setIsAuthenticated(false);
    history.push("/login");
  };

  const redirectToCurrentPage = () => {
    const currentPage = localStorage.getItem("currentPage");
    if (currentPage) {
      history.push(currentPage);
      localStorage.removeItem("currentPage");
    } else {
      history.push("/");
    }
  };

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));

    return history.listen((location) => {
      localStorage.setItem("currentPage", location.pathname);
    });
  }, [isAuthenticated, history]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, handleLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
