import { useEffect } from "react"
import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { View, ActivityIndicator, Platform } from "react-native"
import { Colors } from "../constants/theme"

export default function Index() {
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      // ?reset=true でストレージを全クリア（デモ動作確認用）
      if (Platform.OS === "web" && typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search)
        if (params.get("reset") === "true") {
          await AsyncStorage.clear()
          window.history.replaceState({}, "", window.location.pathname)
        }
      }

      const done = await AsyncStorage.getItem("onboarding_done")
      if (done === "true") {
        router.replace("/(tabs)")
      } else {
        router.replace("/onboarding/gender")
      }
    })()
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.background }}>
      <ActivityIndicator color={Colors.primary} size="large" />
    </View>
  )
}
