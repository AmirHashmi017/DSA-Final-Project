import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../utils/AuthContext.js";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ToastAndroid } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    if (email && password) {
      login({ email, password });
    } else {
      ToastAndroid.show("Please enter all fields", ToastAndroid.SHORT);
    }
  };

  return (
    <LinearGradient
      colors={["#4facfe", "#00f2fe"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container}>
        <Image
          source={{
            uri: "https://cdn1.iconfinder.com/data/icons/daily-business-illustrations/1000/illustration2-128.png",
          }}
          style={styles.illustration}
          resizeMode="contain"
        />
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Login to your account</Text>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <MaterialIcons
                  name="email"
                  size={20}
                  color="#4facfe"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#B0B3C3"
                  value={email}
                  onChangeText={setemail}
                />
              </View>
              <View style={styles.inputContainer}>
                <MaterialIcons
                  name="lock"
                  size={20}
                  color="#4facfe"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#B0B3C3"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={20}
                    color="#4facfe"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.rememberContainer}>
                <View style={styles.rememberMe}>
                  <Switch
                    value={rememberMe}
                    onValueChange={setRememberMe}
                    trackColor={{ false: "#E0E0E0", true: "#4facfe" }}
                    thumbColor="#FFFFFF"
                  />
                  <Text style={styles.rememberText}>Remember me</Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.signInButton}
                onPress={handleLogin}
              >
                <Text style={styles.signInText}>Sign In</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity>
                <Text
                  style={styles.signUpLink}
                  onPress={() => navigation.navigate("Signup")}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  illustration: {
    width: "100%",
    height: 200,
    marginBottom: 30,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333333",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#777777",
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FD",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  rememberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666666",
  },
  forgotPassword: {
    fontSize: 14,
    color: "#4facfe",
    fontWeight: "600",
  },
  signInButton: {
    backgroundColor: "#4facfe",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  signInText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  signUpText: {
    fontSize: 14,
    color: "#777777",
  },
  signUpLink: {
    fontSize: 14,
    color: "#4facfe",
    fontWeight: "600",
  },
});

export default LoginScreen;
