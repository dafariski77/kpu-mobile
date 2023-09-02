import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import db from "../db";

export default function FormEntryScreen({ navigation, route }) {
  const { selectedLocation } = route.params || {};

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS pemilih (id INTEGER PRIMARY KEY AUTOINCREMENT, nik VARCHAR(50), nama VARCHAR(200), noHp VARCHAR(15), gender VARCHAR(50), alamat TEXT, latitude FLOAT, longitude FLOAT)"
      );
    });
  }, []);

  const [form, setForm] = useState({
    nik: "",
    nama: "",
    noHp: "",
    gender: "",
    alamat: "",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO pemilih (nik, nama, noHp, gender, alamat, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          form.nik,
          form.nama,
          form.noHp,
          form.gender,
          form.alamat,
          selectedLocation?.latitude,
          selectedLocation?.longitude,
        ],
        (_, result) => {
          alert("Data tersimpan!");
          navigation.navigate('Home')
        },
        (_, error) => console.log("Error inserting data ", error)
      );
    });
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView>
        <View>
          <TextInput
            style={[styles.textInputStyle]}
            placeholder="NIK"
            value={form.nik}
            onChangeText={(value) => handleChange("nik", value)}
          />
          <TextInput
            style={[styles.textInputStyle]}
            placeholder="Nama"
            value={form.nama}
            onChangeText={(value) => handleChange("nama", value)}
          />
          <TextInput
            style={[styles.textInputStyle]}
            placeholder="No. Hp"
            value={form.noHp}
            onChangeText={(value) => handleChange("noHp", value)}
          />
          <TextInput
            style={[styles.textInputStyle]}
            placeholder="Jenis Kelamin"
            value={form.gender}
            onChangeText={(value) => handleChange("gender", value)}
          />
          <TextInput
            style={[styles.textInputStyle]}
            placeholder="Alamat"
            value={form.alamat}
            onChangeText={(value) => handleChange("alamat", value)}
          />
          <View style={[styles.inlineButton]}>
            <TouchableOpacity
              style={[styles.btnPilihLokasi]}
              onPress={() => navigation.navigate("SelectMap", { form })}
            >
              <Text style={[styles.textPilihLokasi]}>Pilih lokasi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnUploadGambar]}>
              <Text style={[styles.textPilihLokasi]}>Upload Gambar</Text>
            </TouchableOpacity>
          </View>
          <Text>{selectedLocation?.latitude}</Text>
          <Text>{selectedLocation?.longitude}</Text>
        </View>
        <TouchableOpacity
          style={[styles.btnSubmit]}
          onPress={() => handleSubmit()}
        >
          <Text style={{ color: "#fff" }}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  textStyle: {
    fontSize: 18,
  },
  textInputStyle: {
    height: 50,
    padding: 10,
    fontSize: 18,
    borderColor: "#000",
    borderWidth: 1,
    marginTop: 25,
    borderRadius: 10,
  },
  btnPilihLokasi: {
    backgroundColor: "#3498db",
    padding: 8,
    borderRadius: 8,
    width: 90,
    alignItems: "center",
  },
  btnUploadGambar: {
    backgroundColor: "#3498db",
    padding: 8,
    borderRadius: 8,
    width: 130,
    alignItems: "center",
  },
  inlineButton: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },
  textPilihLokasi: {
    color: "#fff",
  },
  btnSubmit: {
    backgroundColor: "#3498db",
    padding: 8,
    borderRadius: 8,
    height: 50,
    alignItems: "center",
    marginTop: 15,
    justifyContent: "center",
  },
});
