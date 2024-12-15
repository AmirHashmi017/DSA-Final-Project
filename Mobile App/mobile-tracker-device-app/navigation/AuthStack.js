import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, StyleSheet } from "react-native";
import LoginScreen from "../screens/LoginScreen.js";
import SignupScreen from "../screens/SignUpScreen.js";
import { Ionicons } from "@expo/vector-icons";
const { ToastAndroid } = require("react-native");

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerTintColor: "#4facfe",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={({ navigation }) => ({
        title: "Login",
        headerRight: () => (
          <TouchableOpacity
            style={styles.headerIconContainer}
            onPress={() =>
              ToastAndroid.show("Login to Your Account", ToastAndroid.SHORT)
            }
          >
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#4facfe"
            />
          </TouchableOpacity>
        ),
      })}
    />
    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      options={{
        title: "Sign Up",
        headerRight: () => (
          <TouchableOpacity
            style={styles.headerIconContainer}
            onPress={() =>
              ToastAndroid.show(
                "Create Your Account and Start Using App",
                ToastAndroid.SHORT
              )
            }
          >
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#4facfe"
            />
          </TouchableOpacity>
        ),
      }}
    />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  headerIconContainer: {
    marginHorizontal: 10, 
  },
});

export default AuthStack;
