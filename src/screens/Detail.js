import React, { useEffect, useState } from "react";
import db from "../db";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailScreen({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM pemilih ORDER BY id DESC",
        [],
        (_, { rows }) => {
          setData(rows._array);
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item }) => {
          const { id, nik, nama, alamat, noHp, gender, latitude, longitude } =
            item;
          return (
            <View style={styles.itemCard}>
              <View style={{ flex: 1 }}>
                <Text>NIK : {nik}</Text>
                <Text>Nama : {nama}</Text>
                <Text>Jenis Kelamin : {gender}</Text>
                <Text>No. Hp : {noHp}</Text>
                <Text>Alamat : {alamat}</Text>
                <TouchableOpacity
                  style={[styles.btnLokasi]}
                  onPress={() =>
                    navigation.navigate("ShowMap", { latitude, longitude })
                  }
                >
                  <Text style={[styles.textLokasi]}>Lihat Lokasi</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  itemCard: {
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    borderWidth: 1,
  },
  btnLokasi: {
    backgroundColor: "#3498db",
    padding: 8,
    borderRadius: 8,
    width: 100,
    alignItems: "center",
    marginTop: 10,
  },
  textLokasi: {
    color: "#fff",
  },
});
