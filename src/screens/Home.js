import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={styles.titleStyle}>KPU</Text>
      <View style={[styles.buttonGroup]}>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate("Info")}>
          <Text style={styles.textButtonStyle}>Informasi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate("Form")}>
          <Text style={styles.textButtonStyle}>Form Entry</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate("Detail")}>
          <Text style={styles.textButtonStyle}>Lihat Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.textButtonStyle}>Keluar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: "#fff"
  },
  buttonStyle: {
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#3498db",
    padding: 10,
  },
  textButtonStyle: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 20
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 50
  },
  buttonGroup: {
    marginTop: 60,
    width: '100%',
    alignItems:"center"
  }
})
