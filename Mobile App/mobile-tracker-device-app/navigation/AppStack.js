import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen.js";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { AuthContext } from "../utils/AuthContext.js";

const Stack = createStackNavigator();

const AppStack = () => {
  const { logout, user } = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#4facfe",
        },
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#4facfe",
        // headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        headerRight: () => (
          <MaterialIcons
            name="logout"
            size={30}
            color="#4facfe"
            style={styles.logoutIcon}
            onPress={() => logout()}
          />
        ),
      }}
    >
      <Stack.Screen name={user?.email} component={HomeScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  logoutIcon: {
    marginRight: 20,
  },
});

export default AppStack;
