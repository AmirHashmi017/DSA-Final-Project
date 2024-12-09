import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
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
import { AuthContext } from "../utils/AuthContext";

const SignupScreen = ({ navigation }) => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const { signUp } = useContext(AuthContext);

  const handleSignUp = () => {
    if (email && password && userName) {
      signUp({ email, userName, password });
    } else {
      alert("Please enter all fields");
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
            <Text style={styles.title}>Create Account</Text>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="email"
                  placeholderTextColor="#B0B3C3"
                  value={email}
                  onChangeText={setemail}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="username"
                  placeholderTextColor="#B0B3C3"
                  value={userName}
                  onChangeText={setUserName}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#B0B3C3"
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
              <TouchableOpacity
                style={styles.signInButton}
                onPress={handleSignUp}
              >
                <Text style={styles.signInText}>Sign Up</Text>
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
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FD",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  showPassword: {
    color: "#4facfe",
    fontSize: 14,
    fontWeight: "600",
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

export default SignupScreen;
