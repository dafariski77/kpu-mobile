import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function InfoScreen() {
  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={[styles.textStyle]}>Segera daftarkan diri anda!</Text>
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
  textStyle: {
    fontSize: 18
  }
})