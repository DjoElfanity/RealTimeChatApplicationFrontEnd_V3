import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface DecodedToken {
  sub: string;
  exp: number;
  iat: number;
}

interface AuthContextType {
  auth: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  userId: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [auth, setAuth] = useState<string | null>(
    localStorage.getItem("token")
  );

  // Decode the JWT token and set the userId
  useEffect(() => {
    if (auth) {
      const decodedToken = jwtDecode<DecodedToken>(auth);
      setUserId(decodedToken.sub);
    }
  }, [auth]);

  // Check if a token is stored in localStorage on initial render
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(token);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:5150/auth/login", {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      setAuth(token);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
