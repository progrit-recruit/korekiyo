import { useState } from "react"
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, Animated,
} from "react-native"
import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Colors, MOODS } from "../../constants/theme"

export default function MoodScreen() {
  const router = useRouter()
  const [selected, setSelected] = useState<number | null>(null)

  async function handleDone() {
    if (selected === null) return
    await AsyncStorage.setItem("onboarding_done", "true")
    await AsyncStorage.setItem("today_mood", String(selected))
    router.replace("/(tabs)")
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.step}>STEP 3/3</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "100%" }]} />
          </View>
          <Text style={styles.title}>今日の気分は？</Text>
          <Text style={styles.sub}>あなたの気分に合ったコーデを提案します</Text>
        </View>

        {/* Mood selector */}
        <View style={styles.moods}>
          {MOODS.map(m => (
            <TouchableOpacity
              key={m.level}
              onPress={() => setSelected(m.level)}
              activeOpacity={0.75}
              style={[styles.moodCard, selected === m.level && styles.moodCardSelected]}
            >
              <Text style={styles.moodEmoji}>{m.label}</Text>
              <Text style={[styles.moodText, selected === m.level && styles.moodTextSelected]}>
                {m.text}
              </Text>
              {selected === m.level && <View style={styles.dot} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={[styles.btn, selected === null && styles.btnDisabled]}
          disabled={selected === null}
          onPress={handleDone}
        >
          <Text style={styles.btnText}>コーデを見る 🎉</Text>
        </TouchableOpacity>
        <Text style={styles.hint}>毎日起動時に気分を選べます</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, paddingHorizontal: 20, justifyContent: "center" },
  header: { marginBottom: 40 },
  step: { fontSize: 11, fontWeight: "700", color: Colors.primary, letterSpacing: 1, marginBottom: 8 },
  progressBar: { height: 4, backgroundColor: Colors.border, borderRadius: 2, marginBottom: 16 },
  progressFill: { height: 4, backgroundColor: Colors.primary, borderRadius: 2 },
  title: { fontSize: 28, fontWeight: "800", color: Colors.text, marginBottom: 6 },
  sub: { fontSize: 13, color: Colors.textMuted },
  moods: { flexDirection: "row", justifyContent: "space-between", marginBottom: 48 },
  moodCard: {
    flex: 1, marginHorizontal: 4, paddingVertical: 16, borderRadius: 16,
    alignItems: "center", backgroundColor: Colors.surface,
    borderWidth: 2, borderColor: "transparent",
  },
  moodCardSelected: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  moodEmoji: { fontSize: 28, marginBottom: 6 },
  moodText: { fontSize: 11, color: Colors.textMuted, fontWeight: "600" },
  moodTextSelected: { color: Colors.primary },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.primary, marginTop: 6 },
  btn: {
    backgroundColor: Colors.primary, paddingVertical: 18,
    borderRadius: 32, alignItems: "center", marginBottom: 12,
  },
  btnDisabled: { backgroundColor: Colors.textLight },
  btnText: { color: "#fff", fontWeight: "800", fontSize: 17 },
  hint: { textAlign: "center", fontSize: 12, color: Colors.textMuted },
})
