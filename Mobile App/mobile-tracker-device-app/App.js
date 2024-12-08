import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator.js";
import { AuthContext } from "./utils/AuthContext";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
