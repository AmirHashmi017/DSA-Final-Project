import React, { createContext, useState } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// AuthContext Provider Component
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("authToken") || null);
    const [user, setUser] = useState(null);
    const baseRoute = "http://localhost:3000";

    // Login function
    const login = async (userData) => {
        try {
            console.log("Login: ", userData);
            const response = await fetch(`${baseRoute}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setUser(data?.user);
            } else {
                console.log("Error: ", data.message);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };
// Signup function
const signup = async (userData) => {
    try {
        const response = await fetch(`${baseRoute}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (response.ok) {
            setUser(data?.user);
            setToken(data?.token);
            localStorage.setItem("authToken", data?.token); // Store token in localStorage
        } else {
            console.error("Signup error:", data.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};
    // Logout function
    const logout = () => {
        console.log("Logout");
        setUser(null);
    };

    // Function to get user details
    const getUserDetails = () => {
        return user;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, getUserDetails, signup, token }}>
            {children}
        </AuthContext.Provider>
    );
};
