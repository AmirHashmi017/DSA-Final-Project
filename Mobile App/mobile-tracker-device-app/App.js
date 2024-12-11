import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator.js";
import { AuthProvider } from "./utils/AuthContext";
import { LocationHistoryProvider } from "./utils/LocationHistoryContext.js";

export default function App() {
  return (
    <AuthProvider>
      <LocationHistoryProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </LocationHistoryProvider>
    </AuthProvider>
  );
}
