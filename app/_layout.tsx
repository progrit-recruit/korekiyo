import { useEffect, useState } from "react"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"
import 'react-native-url-polyfill/auto'

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  )
}
