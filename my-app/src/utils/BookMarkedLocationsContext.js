import React, { createContext, useState, useContext } from 'react';

const LocationsContext = createContext();

export const LocationsProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:3000/api/BookMarkedLocations";

  // Fetch locations by UserID
  const fetchBookMarkedLocations = async (userID) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/Get/${userID}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setLocations(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch locations.");
    } finally {
      setLoading(false);
    }
  };

  // Add a location
  const addBookMarkedLocation = async (userID, sourceLocation, destinationLocation) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/Add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ UserID: userID, SourceLocation: sourceLocation, DestinationLocation: destinationLocation }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setLocations((prev) => [...prev, data.location]);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to add location.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a location
  const deleteBookMarkedLocation = async (userID, sourceLocation, destinationLocation) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/Delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ UserID: userID, SourceLocation: sourceLocation, DestinationLocation: destinationLocation }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setLocations((prev) =>
        prev.filter(
          (loc) =>
            loc.SourceLocation !== sourceLocation || loc.DestinationLocation !== destinationLocation
        )
      );
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to delete location.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocationsContext.Provider
      value={{
        locations,
        fetchBookMarkedLocations,
        addBookMarkedLocation,
        deleteBookMarkedLocation,
        loading,
        error,
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
};

export const useLocationsContext = () => {
  return useContext(LocationsContext);
};
