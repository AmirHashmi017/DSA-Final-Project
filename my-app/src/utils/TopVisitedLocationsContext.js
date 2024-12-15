import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const TopVisitedLocationsContext = createContext();
const API_BASE_URL = "http://localhost:3000/api/TopVisitedLocations"; 

export const useTopVisitedLocations = () => {
  return useContext(TopVisitedLocationsContext);
};

export const TopVisitedLocationsProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTopLocations = async (userId) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${API_BASE_URL}/Get/${userId}`);
      const { data } = response.data;
      setLocations(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TopVisitedLocationsContext.Provider
      value={{ locations, loading, error, fetchTopLocations }}
    >
      {children}
    </TopVisitedLocationsContext.Provider>
  );
};
