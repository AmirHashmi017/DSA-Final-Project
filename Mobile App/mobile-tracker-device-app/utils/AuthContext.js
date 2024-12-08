import React, { createContext, useState } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// AuthContext Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login function
  const login = (userData) => {
    setUser(userData);
    // Optionally, persist the user data to AsyncStorage or SecureStore
  };

  // Logout function
  const logout = () => {
    console.log("Logout");
    setUser(null);
    // Optionally, clear the persisted data
  };

  // Function to get user details
  const getUserDetails = () => {
    return user;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
};
