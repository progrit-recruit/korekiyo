import { useState } from "react"
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  SafeAreaView, TextInput, KeyboardAvoidingView, Platform,
} from "react-native"
import { useRouter } from "expo-router"
import { Colors, BODY_TYPES, PERSONAL_COLORS, FACE_TYPES } from "../../constants/theme"

function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}
      activeOpacity={0.7}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </TouchableOpacity>
  )
}

export default function ProfileScreen() {
  const router = useRouter()
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [bodyType, setBodyType] = useState("")
  const [personalColor, setPersonalColor] = useState("")
  const [faceType, setFaceType] = useState("")

  const canProceed = height.trim() !== "" && weight.trim() !== ""

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.step}>STEP 2/3</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: "66%" }]} />
            </View>
            <Text style={styles.title}>あなたのことを{"\n"}教えてください</Text>
          </View>

          {/* 身長・体重 */}
          <View style={styles.row}>
            <View style={styles.inputWrap}>
              <Text style={styles.label}>身長 <Text style={styles.required}>*</Text></Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  value={height}
                  onChangeText={setHeight}
                  keyboardType="numeric"
                  placeholder="158"
                  placeholderTextColor={Colors.textLight}
                  maxLength={3}
                />
                <Text style={styles.unit}>cm</Text>
              </View>
            </View>
            <View style={styles.inputWrap}>
              <Text style={styles.label}>体重 <Text style={styles.required}>*</Text></Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="numeric"
                  placeholder="50"
                  placeholderTextColor={Colors.textLight}
                  maxLength={3}
                />
                <Text style={styles.unit}>kg</Text>
              </View>
            </View>
          </View>

          {/* 骨格診断 */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>骨格タイプ <Text style={styles.optional}>（任意）</Text></Text>
            <View style={styles.chips}>
              {BODY_TYPES.map(t => (
                <Chip key={t} label={t} selected={bodyType === t} onPress={() => setBodyType(t === bodyType ? "" : t)} />
              ))}
              <Chip label="わからない" selected={bodyType === "unknown"} onPress={() => setBodyType(bodyType === "unknown" ? "" : "unknown")} />
            </View>
          </View>

          {/* パーソナルカラー */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>パーソナルカラー <Text style={styles.optional}>（任意）</Text></Text>
            <View style={styles.chips}>
              {PERSONAL_COLORS.map(t => (
                <Chip key={t} label={t} selected={personalColor === t} onPress={() => setPersonalColor(t === personalColor ? "" : t)} />
              ))}
              <Chip label="わからない" selected={personalColor === "unknown"} onPress={() => setPersonalColor(personalColor === "unknown" ? "" : "unknown")} />
            </View>
          </View>

          {/* 顔タイプ */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>顔タイプ <Text style={styles.optional}>（任意）</Text></Text>
            <View style={styles.chips}>
              {FACE_TYPES.map(t => (
                <Chip key={t} label={t} selected={faceType === t} onPress={() => setFaceType(t === faceType ? "" : t)} />
              ))}
              <Chip label="わからない" selected={faceType === "unknown"} onPress={() => setFaceType(faceType === "unknown" ? "" : "unknown")} />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.btn, !canProceed && styles.btnDisabled]}
            disabled={!canProceed}
            onPress={() => router.push("/onboarding/mood")}
          >
            <Text style={styles.btnText}>次へ →</Text>
          </TouchableOpacity>
          <View style={{ height: 32 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingHorizontal: 20, paddingBottom: 20 },
  header: { paddingTop: 16, paddingBottom: 20 },
  step: { fontSize: 11, fontWeight: "700", color: Colors.primary, letterSpacing: 1, marginBottom: 8 },
  progressBar: { height: 4, backgroundColor: Colors.border, borderRadius: 2, marginBottom: 16 },
  progressFill: { height: 4, backgroundColor: Colors.primary, borderRadius: 2 },
  title: { fontSize: 24, fontWeight: "800", color: Colors.text, lineHeight: 32 },
  row: { flexDirection: "row", gap: 16, marginBottom: 24 },
  inputWrap: { flex: 1 },
  label: { fontSize: 13, fontWeight: "700", color: Colors.text, marginBottom: 8 },
  required: { color: Colors.primary },
  optional: { fontSize: 11, color: Colors.textMuted, fontWeight: "400" },
  inputRow: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: Colors.surface, borderRadius: 12,
    borderWidth: 1.5, borderColor: Colors.border, paddingHorizontal: 14,
  },
  input: { flex: 1, fontSize: 20, fontWeight: "700", color: Colors.text, paddingVertical: 12 },
  unit: { fontSize: 13, color: Colors.textMuted, fontWeight: "600" },
  section: { marginBottom: 24 },
  sectionLabel: { fontSize: 13, fontWeight: "700", color: Colors.text, marginBottom: 10 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 24,
    borderWidth: 1.5, borderColor: Colors.border, backgroundColor: Colors.surface,
  },
  chipSelected: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  chipText: { fontSize: 13, color: Colors.textMuted, fontWeight: "600" },
  chipTextSelected: { color: Colors.primary },
  btn: {
    backgroundColor: Colors.primary, paddingVertical: 16,
    borderRadius: 28, alignItems: "center", marginTop: 8,
  },
  btnDisabled: { backgroundColor: Colors.textLight },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
})
