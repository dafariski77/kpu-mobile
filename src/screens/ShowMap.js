import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";

export default function ShowMap({ navigation, route }) {
  const { latitude, longitude } = route.params || {};
  const [mapRegion, setMapRegion] = useState({
    latitudeDelta: 16.835835,
    longitudeDelta: 46.049736,
  });

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    setMapRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 16.835835,
      longitudeDelta: 46.049736,
    });
  };

  useEffect(() => {
    userLocation();
  });

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title="marker" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  mapBtn: {
    backgroundColor: "#ffd369",
    height: 65,
    width: 65,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 65 / 2,
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
});
