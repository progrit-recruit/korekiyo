import { useState, useEffect } from "react"
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, SafeAreaView, Dimensions, Modal,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Ionicons } from "@expo/vector-icons"
import {
  Colors, MOODS, MOCK_OUTFITS, MOCK_RECOMMENDATIONS,
  EC_OUTFITS_FEMALE, EC_OUTFITS_MALE,
} from "../../constants/theme"

const { width } = Dimensions.get("window")
const CARD3_W = (width - 40 - 16) / 3

type Outfit = {
  id: string; label: string; items: string[]
  mood: string; temp: string; image: string
  source?: string; fromCloset?: boolean
}

function MoodModal({ visible, onSelect }: { visible: boolean; onSelect: (l: number) => void }) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={s.overlay}>
        <View style={s.sheet}>
          <Text style={s.sheetTitle}>今日の気分は？</Text>
          <View style={s.moodRow}>
            {MOODS.map(m => (
              <TouchableOpacity key={m.level} onPress={() => onSelect(m.level)} style={s.moodBtn}>
                <Text style={s.moodEmoji}>{m.label}</Text>
                <Text style={s.moodText}>{m.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  )
}

const NUM_COLORS = [Colors.primary, "#B8860B", "#7B7B8B"]

export default function HomeScreen() {
  const [mood, setMood] = useState<number | null>(null)
  const [showMood, setShowMood] = useState(false)
  const [liked, setLiked] = useState<string[]>([])
  const [outfits, setOutfits] = useState<Outfit[]>([])

  useEffect(() => {
    ;(async () => {
      const savedMood = await AsyncStorage.getItem("today_mood")
      if (savedMood) setMood(Number(savedMood))
      else setShowMood(true)

      const savedLiked = await AsyncStorage.getItem("liked_outfits")
      if (savedLiked) setLiked(JSON.parse(savedLiked))

      const g = (await AsyncStorage.getItem("user_gender") ?? "female") as "female" | "male"
      const closet = await AsyncStorage.getItem("user_closet")
      const closetItems = closet ? JSON.parse(closet) : []
      const ecOutfits = g === "male" ? EC_OUTFITS_MALE : EC_OUTFITS_FEMALE

      if (closetItems.length < 3) {
        setOutfits(ecOutfits)
      } else {
        setOutfits([
          { ...MOCK_OUTFITS[0], fromCloset: true, label: "あなたの服で今日イチ" },
          ecOutfits[0],
          { ...MOCK_OUTFITS[1], fromCloset: true, label: "あなたの服でスッキリ" },
        ])
      }
    })()
  }, [])

  async function selectMood(level: number) {
    setMood(level)
    setShowMood(false)
    await AsyncStorage.setItem("today_mood", String(level))
  }

  async function toggleLike(id: string) {
    const next = liked.includes(id) ? liked.filter(x => x !== id) : [...liked, id]
    setLiked(next)
    await AsyncStorage.setItem("liked_outfits", JSON.stringify(next))
  }

  const currentMood = MOODS.find(m => m.level === mood)

  return (
    <SafeAreaView style={s.safe}>
      <MoodModal visible={showMood} onSelect={selectMood} />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ヘッダー */}
        <View style={s.topBar}>
          <View>
            <Text style={s.appName}>コレキヨ</Text>
            <Text style={s.date}>
              {new Date().toLocaleDateString("ja-JP", { month: "long", day: "numeric", weekday: "short" })}
            </Text>
          </View>
          <TouchableOpacity style={s.ptBadge}>
            <Ionicons name="star" size={14} color={Colors.point} />
            <Text style={s.ptText}>1,400 pt</Text>
          </TouchableOpacity>
        </View>

        {/* 天気・予定・気分バー */}
        <View style={s.infoBar}>
          <View style={s.infoItem}>
            <Ionicons name="partly-sunny-outline" size={22} color="#F59E0B" />
            <View>
              <Text style={s.infoLabel}>天気</Text>
              <Text style={s.infoVal}>晴れ 22℃</Text>
            </View>
          </View>
          <View style={s.divider} />
          <View style={s.infoItem}>
            <Ionicons name="calendar-outline" size={22} color={Colors.info} />
            <View>
              <Text style={s.infoLabel}>予定</Text>
              <Text style={s.infoVal}>授業・バイト</Text>
            </View>
          </View>
          <View style={s.divider} />
          <TouchableOpacity style={s.infoItem} onPress={() => setShowMood(true)}>
            <Ionicons name="happy-outline" size={22} color={Colors.primary} />
            <View>
              <Text style={s.infoLabel}>気分</Text>
              <Text style={[s.infoVal, { color: Colors.primary }]}>
                {currentMood ? currentMood.text : "タップ"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 今日のAIコーデ（3枚横並び・自動生成） */}
        <View style={s.sectionRow}>
          <View style={s.aiBadge}>
            <Ionicons name="sparkles" size={11} color="#fff" />
            <Text style={s.aiBadgeText}>AI</Text>
          </View>
          <Text style={s.secTitle}>今日のコーデ提案</Text>
          <Text style={s.secSub}>
            {outfits[0]?.source ? "ECより" : "あなたの服から"}
          </Text>
        </View>

        <View style={s.outfit3Row}>
          {outfits.map((outfit, idx) => {
            const isLiked = liked.includes(outfit.id)
            return (
              <View key={outfit.id} style={s.outfit3Card}>
                <Image
                  source={{ uri: outfit.image }}
                  style={s.outfit3Img}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={s.outfit3Like}
                  onPress={() => toggleLike(outfit.id)}
                >
                  <Ionicons
                    name={isLiked ? "heart" : "heart-outline"}
                    size={14}
                    color={isLiked ? Colors.primary : "#fff"}
                  />
                </TouchableOpacity>
                <View style={[s.outfit3Num, { backgroundColor: NUM_COLORS[idx] }]}>
                  <Text style={s.outfit3NumText}>{idx + 1}</Text>
                </View>
                <View style={s.outfit3Info}>
                  <Text style={s.outfit3Label} numberOfLines={2}>{outfit.label}</Text>
                  <Text style={s.outfit3Mood} numberOfLines={1}>{outfit.mood}</Text>
                  {outfit.source && (
                    <Text style={s.outfit3Source} numberOfLines={1}>{outfit.source}</Text>
                  )}
                </View>
              </View>
            )
          })}
        </View>

        {/* あなたへのおすすめ */}
        <View style={s.sectionRow}>
          <Text style={s.secTitle}>あなたへのおすすめ</Text>
          <Text style={s.secSub}>ECサイトでチェック</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.recScroll}>
          {MOCK_RECOMMENDATIONS.map(item => (
            <View key={item.id} style={s.recCard}>
              <Image source={{ uri: item.image }} style={s.recImg} resizeMode="cover" />
              <View style={s.recInfo}>
                <Text style={s.recBrand}>{item.brand}</Text>
                <Text style={s.recName} numberOfLines={2}>{item.name}</Text>
                <Text style={s.recPrice}>¥{item.price.toLocaleString()}</Text>
              </View>
              <View style={s.recActions}>
                <TouchableOpacity style={s.recLike}>
                  <Ionicons name="thumbs-up-outline" size={16} color={Colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={s.recDislike}>
                  <Ionicons name="thumbs-down-outline" size={16} color={Colors.textMuted} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  topBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingTop: 14, paddingBottom: 8 },
  appName: { fontSize: 22, fontWeight: "900", color: Colors.primary },
  date: { fontSize: 12, color: Colors.textMuted, marginTop: 1 },
  ptBadge: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: Colors.accentLight, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, borderWidth: 1, borderColor: Colors.accent },
  ptText: { fontSize: 13, fontWeight: "800", color: Colors.point },
  infoBar: { flexDirection: "row", marginHorizontal: 20, marginBottom: 20, backgroundColor: Colors.surface, borderRadius: 16, borderWidth: 1, borderColor: Colors.border, padding: 12 },
  infoItem: { flex: 1, flexDirection: "row", alignItems: "center", gap: 8 },
  divider: { width: 1, backgroundColor: Colors.border, marginHorizontal: 4 },
  infoLabel: { fontSize: 10, color: Colors.textMuted },
  infoVal: { fontSize: 11, fontWeight: "700", color: Colors.text },
  sectionRow: { paddingHorizontal: 20, marginBottom: 12, flexDirection: "row", alignItems: "center", gap: 8 },
  secTitle: { fontSize: 16, fontWeight: "800", color: Colors.text },
  secSub: { fontSize: 11, color: Colors.textMuted, marginLeft: "auto" },
  aiBadge: { flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: Colors.primary, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  aiBadgeText: { fontSize: 10, color: "#fff", fontWeight: "800" },
  // 3コーデ横並び
  outfit3Row: { flexDirection: "row", paddingHorizontal: 20, gap: 8, marginBottom: 28 },
  outfit3Card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3,
  },
  outfit3Img: { width: "100%", height: CARD3_W * 1.5 },
  outfit3Like: {
    position: "absolute", top: 6, right: 6,
    backgroundColor: "rgba(0,0,0,0.32)", borderRadius: 14, padding: 5,
  },
  outfit3Num: {
    position: "absolute", top: 6, left: 6,
    width: 20, height: 20, borderRadius: 10,
    justifyContent: "center", alignItems: "center",
  },
  outfit3NumText: { fontSize: 11, fontWeight: "900", color: "#fff" },
  outfit3Info: { padding: 8, gap: 2 },
  outfit3Label: { fontSize: 10, fontWeight: "700", color: Colors.text, lineHeight: 14 },
  outfit3Mood: { fontSize: 9, color: Colors.textMuted },
  outfit3Source: { fontSize: 9, color: Colors.primary, fontWeight: "600", marginTop: 2 },
  // Recs
  recScroll: { paddingHorizontal: 20, gap: 12, paddingBottom: 4 },
  recCard: { width: 140, backgroundColor: Colors.surface, borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: Colors.border },
  recImg: { width: "100%", height: 140 },
  recInfo: { padding: 10 },
  recBrand: { fontSize: 10, color: Colors.primary, fontWeight: "700", marginBottom: 2 },
  recName: { fontSize: 12, color: Colors.text, fontWeight: "600", lineHeight: 16, marginBottom: 4 },
  recPrice: { fontSize: 13, color: Colors.text, fontWeight: "800" },
  recActions: { flexDirection: "row", borderTopWidth: 1, borderTopColor: Colors.border },
  recLike: { flex: 1, alignItems: "center", paddingVertical: 9 },
  recDislike: { flex: 1, alignItems: "center", paddingVertical: 9, borderLeftWidth: 1, borderLeftColor: Colors.border },
  // Modal
  overlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.45)" },
  sheet: { backgroundColor: "#fff", borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 28, paddingBottom: 48 },
  sheetTitle: { fontSize: 18, fontWeight: "800", color: Colors.text, textAlign: "center", marginBottom: 24 },
  moodRow: { flexDirection: "row", justifyContent: "space-around" },
  moodBtn: { alignItems: "center", gap: 8 },
  moodEmoji: { fontSize: 30 },
  moodText: { fontSize: 11, color: Colors.textMuted, fontWeight: "600" },
})
