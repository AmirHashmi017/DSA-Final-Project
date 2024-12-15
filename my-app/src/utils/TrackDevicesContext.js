import React, { createContext, useState } from "react";

export const DeviceLocationHistoryContext = createContext();

export const DeviceLocationHistoryProvider = ({ children }) => {
  const [trackDeviceLocationHistory, setTrackDeviceLocationHistory] = useState(
    []
  );
  const [mobileLocation, setMobileLocation] = useState(null);
  const baseRoute = "http://localhost:3000/api/locationHistory";

  const getLocationHistory = async (userId) => {
    try {
      const response = await fetch(`${baseRoute}/get/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTrackDeviceLocationHistory(data);
      } else {
        console.log("Error: ", data.message);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const deleteDeviceTrackLocationHistory = async (payload) => {
    try {
      const response = await fetch(`${baseRoute}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        getLocationHistory(payload?.userId);
      } else {
        console.log("Error: ", data.message);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <DeviceLocationHistoryContext.Provider
      value={{
        getLocationHistory,
        trackDeviceLocationHistory,
        setTrackDeviceLocationHistory,
        deleteDeviceTrackLocationHistory,
        mobileLocation,
        setMobileLocation,
      }}
    >
      {children}
    </DeviceLocationHistoryContext.Provider>
  );
};
