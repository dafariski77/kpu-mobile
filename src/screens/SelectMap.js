import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";

export default function SelectMapScreen({ navigation, route }) {
  const { form } = route.params || {};
  const [mapRegion, setMapRegion] = useState({
    latitude: -6.2,
    longitude: 106.816666,
    latitudeDelta: 16.835835,
    longitudeDelta: 46.049736,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);

  const defaultLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
  };

  useEffect(() => {
    defaultLocation();
  }, []);

  const handleMapPress = (e) => {
    const selectedCoordinate = e.nativeEvent.coordinate;
    setSelectedLocation(selectedCoordinate);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion} onPress={handleMapPress}>
        {selectedLocation && (
          <Marker coordinate={selectedLocation} title="marker" />
        )}
      </MapView>
      <TouchableOpacity
        style={styles.mapBtn}
        onPress={() => {
          if (selectedLocation) {
            navigation.navigate("Form", { selectedLocation, form });
          }
        }}
      >
        <Text style={{ fontSize: 45, color: "#222831" }}>v</Text>
      </TouchableOpacity>
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
