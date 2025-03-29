import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [id_user, setId_user] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");
    const storedId_user = localStorage.getItem("id_user");
    if (storedToken) setToken(storedToken);
    if (storedEmail) setEmail(storedEmail);
    if (storedId_user) setId_user(storedId_user);
  }, []);
    

  const login = (newToken, userEmail, Id_user) => {
    setToken(newToken);
    setEmail(userEmail);
    setId_user(Id_user);
    localStorage.setItem("token", newToken);
    localStorage.setItem("email", userEmail);
    localStorage.setItem("id_user", Id_user);
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    setId_user(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("id_user");
  };

  return (
    <AuthContext.Provider value={{ token, email, id_user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;