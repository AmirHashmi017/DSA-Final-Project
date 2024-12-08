import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  Easing,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { AuthContext } from "../utils/AuthContext";

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState("");
  const [connected, setConnected] = useState(false);
  const rotation = new Animated.Value(0);
  const { setUser } = useContext(AuthContext);

  const handleShareLocation = async () => {
    // Start rotation animation
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permissions are required.");
        rotation.stopAnimation();
        return;
      }

      // Get the current location
      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      const timestamp = new Date(currentLocation.timestamp).toLocaleString();

      // Log latitude, longitude, and timestamp
      console.log("Device Name:", location);
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);
      console.log("Timestamp:", timestamp);

      // Simulate connection success after 3 seconds
      setTimeout(() => {
        rotation.stopAnimation();
        setConnected(true);
      }, 3000);
    } catch (error) {
      console.error("Error fetching location:", error);
      Alert.alert("Error", "Could not fetch location. Please try again.");
      rotation.stopAnimation();
    }
  };

  const rotationStyle = {
    transform: [
      {
        rotate: rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
    ],
  };

  return (
    <LinearGradient
      colors={["#4facfe", "#00f2fe"]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Share Your Device Location</Text>
        <Image
          source={{
            uri: "https://cdn4.iconfinder.com/data/icons/pop-scenes/1000/real_estate_mobile_device___home_house_location_map_purchase-128.png",
          }}
          style={styles.illustration}
          resizeMode="contain"
        />

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Enter Device Name"
            placeholderTextColor="#A0A0A0"
            value={location}
            onChangeText={setLocation}
          />
          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShareLocation}
            disabled={connected}
          >
            <Text style={styles.shareText}>Share Location</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statusContainer}>
          {!connected ? (
            <Animated.View style={[styles.iconContainer, rotationStyle]}>
              <MaterialIcons name="location-on" size={50} color="#fff" />
            </Animated.View>
          ) : (
            <Text style={styles.connectedText}>Connected!</Text>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  illustration: {
    width: "100%",
    height: 200,
    marginBottom: 30,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 50,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
  },
  shareButton: {
    backgroundColor: "#4facfe",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  shareText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  statusContainer: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4facfe",
    borderRadius: 40,
  },
  connectedText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default HomeScreen;
