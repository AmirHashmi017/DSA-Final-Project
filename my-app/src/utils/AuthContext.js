import React, { createContext, useState } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// AuthContext Provider Component
export const AuthProvider = ({ children }) => {
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
        <AuthContext.Provider value={{ user, login, logout, getUserDetails }}>
            {children}
        </AuthContext.Provider>
    );
};
