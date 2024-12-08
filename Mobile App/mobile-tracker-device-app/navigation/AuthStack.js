import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen.js";
import SignupScreen from "../screens/SignUpScreen.js";

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

export default AuthStack;
