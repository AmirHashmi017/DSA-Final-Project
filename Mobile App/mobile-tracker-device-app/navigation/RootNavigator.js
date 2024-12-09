import React, { useContext } from "react";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AuthContext } from "../utils/AuthContext";

const RootNavigator = () => {
  const { user } = useContext(AuthContext);

  return user ? <AppStack /> : <AuthStack />;
};

export default RootNavigator;
