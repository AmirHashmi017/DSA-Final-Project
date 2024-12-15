import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const SearchedLocationsContext = createContext();

const SearchedLocationsProvider = ({ children }) => {
  const [searchedLocations, setSearchedLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [l,setL ]=useState(false);

  const API_BASE_URL = "http://localhost:3000/api/SearchedLocations"; 

  // Fetch locations for a specific user
  const fetchLocations = async (userId) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/Get/${userId}`, {
        method: "Get",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
      setSearchedLocations(data);
      console.log("Response:", data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch locations.");
    } finally {
      setLoading(false);
    }
  };

  // Add a new searched location
  const addLocation = async (userId, source, destination) => {
    try {
      const userData = {
        UserID: userId,
        SourceLocation: source,
        DestinationLocation: destination,
      };
  
      const response = await fetch(`${API_BASE_URL}/Add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add location");
      }
  
      const responseData = await response.json();
  
      if (responseData && responseData.location) {
        setSearchedLocations((prev) => [...prev, responseData.location]);
      } else {
        console.error("Location data is missing in the response:", responseData);
      }
    } catch (err) {
      console.error("Error adding location:", err);
      setError("Failed to add location.");
    }
  };
  

  // Delete a searched location
  const deleteLocation = async (userId, source, destination) => {
    try {
      await axios.delete(`${API_BASE_URL}/Delete`, {
        data: {
          UserID: userId,
          SourceLocation: source,
          DestinationLocation: destination,
        },
      });
      setSearchedLocations((prev) =>
        prev.filter(
          (loc) =>
            loc.UserID !== userId ||
            loc.SourceLocation !== source ||
            loc.DestinationLocation !== destination
        )
      );
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete location.");
    }
  };

  return (
    <SearchedLocationsContext.Provider
      value={{
        l,
        setL,
        searchedLocations,
        loading,
        error,
        fetchLocations,
        addLocation,
        deleteLocation,
      }}
    >
      {children}
    </SearchedLocationsContext.Provider>
  );
};

export { SearchedLocationsContext, SearchedLocationsProvider };
