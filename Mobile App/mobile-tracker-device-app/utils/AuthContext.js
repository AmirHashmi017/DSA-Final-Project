import React, { createContext, useState } from "react";
import { ToastAndroid } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const baseRoute = "http://192.168.43.116:3000/api/auth";
  const baseRoute = "http://192.1.1.104:3000/api/auth";
  

  const login = async (payload) => {
    try {
      console.log("Login: ", payload);
      const response = await fetch(`${baseRoute}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        setUser(data?.user);
      } else {
        console.log("Error: ", data.message);
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const signUp = async (payload) => {
    try {
      const response = await fetch(`${baseRoute}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        setUser(data?.user);
      } else {
        console.log("Error: ", data.message);
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const logout = () => {
    console.log("Logout");
    setUser(null);
  };

  const getUserDetails = () => {
    return user;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, getUserDetails, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
