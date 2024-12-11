import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ToastAndroid,
} from "react-native";
import { AuthContext } from "../utils/AuthContext";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const { signUp } = useContext(AuthContext);

  const handleSignUp = () => {
    if (email && password && userName) {
      signUp({ email, userName, password });
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
            uri: "https://cdn1.iconfinder.com/data/icons/groovy-illustrations/1000/location___map_marker_pin_navigation_maps_person_people-128.png",
          }}
          style={styles.illustration}
          resizeMode="contain"
        />
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.title}>Create Account</Text>

            <View style={styles.form}>
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <MaterialIcons
                  name="email"
                  size={24}
                  color="#4facfe"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#B0B3C3"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Username Input */}
              <View style={styles.inputContainer}>
                <MaterialIcons
                  name="person"
                  size={24}
                  color="#4facfe"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#B0B3C3"
                  value={userName}
                  onChangeText={setUserName}
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <MaterialIcons
                  name="lock"
                  size={24}
                  color="#4facfe"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#B0B3C3"
                  value={password}
                  secureTextEntry
                  onChangeText={setPassword}
                />
              </View>

              {/* Sign Up Button */}
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
    paddingHorizontal: 10,
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
});

export default SignupScreen;
