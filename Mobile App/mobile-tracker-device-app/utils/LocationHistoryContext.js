import { createContext } from "react";
import { ToastAndroid } from "react-native";

export const LocationHistoryContext = createContext();

export const LocationHistoryProvider = ({ children }) => {
  // const baseRoute = "http://192.168.43.116:3000/api/locationHistory";
  const baseRoute = "http://192.1.1.104:3000/api/locationHistory";
  const addLocationHistory = async (payload) => {
    try {
      const response = await fetch(`${baseRoute}/add`, {
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
      }
    } catch (error) {}
  };
  return (
    <LocationHistoryContext.Provider value={{ addLocationHistory }}>
      {children}
    </LocationHistoryContext.Provider>
  );
};
