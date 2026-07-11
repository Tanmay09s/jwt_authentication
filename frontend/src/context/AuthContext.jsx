import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser,getProfile, logoutUser } from "../services/authService";
const AuthContext = createContext();

function AuthProvider({ children }) {
  // Stores the currently logged-in user's information
  const [user, setUser] = useState(null);

  // Stores the JWT token.
  // If a token already exists in localStorage, initialize the state with it.
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Used to indicate whether the authentication status is still being determined.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const profile = await getProfile();
        setUser(profile.user);
      } catch (error) {
        console.log("Failed to restore session", error);
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [token]);

  const login = async (credentials) => {
    try {
      setLoading(true);

      // Login
      const data = await loginUser(credentials);

      // Save token
      localStorage.setItem("token", data.token);
      setToken(data.token);

      // Immediately fetch the user
      const profile = await getProfile();

      // Save user
      setUser(profile.user);

      return profile.user;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
  try {
    setLoading(true);

    const data = await registerUser(userData);

    return data;
  } catch (error) {
    throw error;
  } finally {
    setLoading(false);
  }
};

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log("Logout request failed", error);
    } finally {
      localStorage.removeItem("token");

      setToken(null);
      setUser(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
export default AuthContext;
