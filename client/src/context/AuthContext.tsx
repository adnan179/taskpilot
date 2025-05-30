import axios from "axios";
import React, { createContext, useContext, useState } from "react";

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(
    () => JSON.parse(localStorage.getItem("user") || "null")
  );

  const login = async (username: string, password: string) => {
    const res = await axios.post(
      `http://localhost:3030/api/auth/login`,
      { username, password },
      { withCredentials: true }
    );
    const loggedUser = { username: res.data.username };
    setUser(loggedUser);
    localStorage.setItem("user", JSON.stringify(loggedUser));
    localStorage.setItem("isAuthenticated", "true"); 
  };

  const register = async (username: string, password: string) => {
    const res = await axios.post(
      "http://localhost:3030/api/auth/register",
      { username, password },
      { withCredentials: true }
    );
    const registeredUser = { username: res.data.username };
    setUser(registeredUser);
    localStorage.setItem("user", JSON.stringify(registeredUser));
    localStorage.setItem("isAuthenticated", "true"); 
  };

  const logout = () => {
    axios.post("http://localhost:3030/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};