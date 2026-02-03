import { createContext, useContext, useState } from "react";

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  signup: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("loggedInUser");
    return stored ? JSON.parse(stored) : null;
  });

  const signup = (username: string, password: string) => {
    localStorage.setItem(
      "user_" + username,
      JSON.stringify({ username, password })
    );
    alert("Signup successful. Please login.");
  };

  const login = (username: string, password: string): boolean => {
    const storedUser = localStorage.getItem("user_" + username);

    if (!storedUser) {
      alert("❌ You didn't sign up. Please signup first.");
      return false;
    }

    const parsed = JSON.parse(storedUser);
    if (parsed.password !== password) {
      alert("❌ Invalid password");
      return false;
    }

    const loggedUser = { username };
    localStorage.setItem("loggedInUser", JSON.stringify(loggedUser));
    setUser(loggedUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext)!;
};
