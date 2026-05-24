import { useState, useEffect } from "react"
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
  ScrollView, SafeAreaView, Dimensions,
} from "react-native"
import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Colors, FEMALE_STYLES, MALE_STYLES } from "../../constants/theme"

const { width } = Dimensions.get("window")
const CARD_W = (width - 52) / 2

export default function DiagnosisScreen() {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])
  const [styles, setStyles] = useState(FEMALE_STYLES)

  useEffect(() => {
    AsyncStorage.getItem("user_gender").then(g => {
      setStyles(g === "male" ? MALE_STYLES : FEMALE_STYLES)
    })
  }, [])

  function toggle(id: string) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <Text style={s.step}>STEP 1 / 3</Text>
        <View style={s.bar}><View style={[s.barFill, { width: "33%" }]} /></View>
        <Text style={s.title}>好きなスタイルを{"\n"}5つ以上選んでね</Text>
        <Text style={s.sub}>あなたの好みを学習してコーデをパーソナライズします</Text>
      </View>

      <ScrollView contentContainerStyle={s.grid} showsVerticalScrollIndicator={false}>
        {styles.map(item => {
          const isSel = selected.includes(item.id)
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => toggle(item.id)}
              activeOpacity={0.85}
              style={[s.card, isSel && s.cardSel]}
            >
              <Image
                source={{ uri: item.image }}
                style={s.img}
                resizeMode="cover"
              />
              {isSel && (
                <View style={s.overlay}>
                  <View style={s.check}><Text style={s.checkMark}>✓</Text></View>
                </View>
              )}
              <View style={s.labelRow}>
                <Text style={[s.label, isSel && s.labelSel]}>{item.style}</Text>
                {isSel && <View style={s.dot} />}
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>

      <View style={s.footer}>
        <Text style={s.count}>
          <Text style={{ color: selected.length >= 5 ? Colors.primary : Colors.textMuted, fontWeight: "800" }}>
            {selected.length}
          </Text>
          {" / 5枚以上選択"}
        </Text>
        <TouchableOpacity
          style={[s.btn, selected.length < 5 && s.btnOff]}
          disabled={selected.length < 5}
          onPress={() => router.push("/onboarding/profile")}
        >
          <Text style={s.btnText}>次へ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  step: { fontSize: 11, fontWeight: "700", color: Colors.primary, letterSpacing: 1.5, marginBottom: 8 },
  bar: { height: 3, backgroundColor: Colors.border, borderRadius: 2, marginBottom: 16 },
  barFill: { height: 3, backgroundColor: Colors.primary, borderRadius: 2 },
  title: { fontSize: 22, fontWeight: "800", color: Colors.text, lineHeight: 30, marginBottom: 4 },
  sub: { fontSize: 13, color: Colors.textMuted, lineHeight: 18 },
  grid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 20, gap: 12, paddingBottom: 12 },
  card: {
    width: CARD_W, borderRadius: 16, overflow: "hidden",
    backgroundColor: Colors.surface, borderWidth: 2, borderColor: "transparent",
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4,
  },
  cardSel: { borderColor: Colors.primary },
  img: { width: "100%", height: CARD_W * 1.35 },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(255,107,107,0.28)",
    justifyContent: "center", alignItems: "center",
  },
  check: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.primary,
    justifyContent: "center", alignItems: "center",
  },
  checkMark: { fontSize: 18, color: "#fff", fontWeight: "900" },
  labelRow: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    paddingVertical: 8, gap: 6,
  },
  label: { fontSize: 12, fontWeight: "600", color: Colors.textMuted, textAlign: "center" },
  labelSel: { color: Colors.primary, fontWeight: "700" },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: Colors.primary },
  footer: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingVertical: 14,
    borderTopWidth: 1, borderTopColor: Colors.border, backgroundColor: Colors.surface,
  },
  count: { fontSize: 13, color: Colors.textMuted },
  btn: { backgroundColor: Colors.primary, paddingHorizontal: 32, paddingVertical: 12, borderRadius: 24 },
  btnOff: { backgroundColor: Colors.textLight },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
})
