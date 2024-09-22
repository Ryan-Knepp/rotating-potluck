import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";

const userKey = "potluck.auth.user";

const AuthContext = createContext(null);

function getStoredUser() {
  const user = localStorage.getItem(userKey);
  return user ? JSON.parse(user) : null;
}

function setStoredUser(user) {
  localStorage.setItem(userKey, JSON.stringify(user));
}

function clearStoredUser() {
  localStorage.removeItem(userKey);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser());
  const isAuthenticated = !!user;

  const login = useCallback(async (user) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/url`, {
      credentials: "include",
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to login");
    }
    const { url } = await response.json();

    window.location = url;
  }, []);

  const logout = useCallback(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/logout`,
      {
        credentials: "include",
      }
    );
    clearStoredUser();
    setUser(null);
  }, []);

  const authComplete = async (code) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/complete?code=${code}`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to login");
    }
    const user = await response.json();
    setUser(user);
    setStoredUser(user);

    return user;
  };

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, authComplete }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
