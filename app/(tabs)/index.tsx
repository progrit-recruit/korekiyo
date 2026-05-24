import { useState, useEffect } from "react"
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, SafeAreaView, Dimensions, Modal, ActivityIndicator,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Ionicons } from "@expo/vector-icons"
import {
  Colors, MOODS, MOCK_OUTFITS, MOCK_RECOMMENDATIONS,
  EC_OUTFITS_FEMALE, EC_OUTFITS_MALE,
} from "../../constants/theme"

const { width } = Dimensions.get("window")
const OUTFIT_W = width - 40   // カード幅 = 画面幅 - 余白（自然なサイズ）

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

export default function HomeScreen() {
  const [mood, setMood] = useState<number | null>(null)
  const [showMood, setShowMood] = useState(false)
  const [liked, setLiked] = useState<string[]>([])
  const [outfits, setOutfits] = useState<Outfit[]>([])
  const [gender, setGender] = useState<"female" | "male">("female")
  const [aiLoading, setAiLoading] = useState(false)
  const [aiGenerated, setAiGenerated] = useState(false)

  useEffect(() => {
    ;(async () => {
      const savedMood = await AsyncStorage.getItem("today_mood")
      if (savedMood) setMood(Number(savedMood))
      else setShowMood(true)

      const savedLiked = await AsyncStorage.getItem("liked_outfits")
      if (savedLiked) setLiked(JSON.parse(savedLiked))

      const g = (await AsyncStorage.getItem("user_gender") ?? "female") as "female" | "male"
      setGender(g)

      // クローゼット内アイテム数に応じてコーデ切り替え
      const closet = await AsyncStorage.getItem("user_closet")
      const closetItems = closet ? JSON.parse(closet) : []
      const ecOutfits = g === "male" ? EC_OUTFITS_MALE : EC_OUTFITS_FEMALE

      if (closetItems.length < 3) {
        // アイテムが少ない → ECサイト/雑誌コーデ
        setOutfits(ecOutfits)
      } else {
        // アイテムが増えてきた → 自分の服を含むコーデ + ECコーデ混合
        setOutfits([
          { ...MOCK_OUTFITS[0], fromCloset: true, label: "あなたの服で今日イチ" },
          ecOutfits[0],
          { ...MOCK_OUTFITS[1], fromCloset: true, label: "あなたの服でスッキリ見え" },
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

  function handleAiGenerate() {
    setAiLoading(true)
    setAiGenerated(false)
    setTimeout(() => {
      setAiLoading(false)
      setAiGenerated(true)
    }, 2500)
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

        {/* AIコーデ生成ゾーン */}
        <View style={s.sectionRow}>
          <Text style={s.secTitle}>クローゼットからAIコーデ</Text>
        </View>
        <View style={s.aiCard}>
          {!aiGenerated ? (
            <>
              <Ionicons name="sparkles-outline" size={28} color={Colors.primary} style={{ marginBottom: 8 }} />
              <Text style={s.aiCardTitle}>今日の組み合わせをAIが生成</Text>
              <Text style={s.aiCardSub}>クローゼットに登録した服から{"\n"}ベストなコーデを提案します</Text>
              <TouchableOpacity style={s.aiBtn} onPress={handleAiGenerate} disabled={aiLoading}>
                {aiLoading
                  ? <ActivityIndicator color="#fff" size="small" />
                  : <Text style={s.aiBtnText}>AIコーデを生成する</Text>
                }
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=80" }}
                style={s.aiImage}
                resizeMode="cover"
              />
              <View style={s.aiResult}>
                <View style={s.aiResultBadge}>
                  <Ionicons name="sparkles" size={12} color="#fff" />
                  <Text style={s.aiResultBadgeText}>AI生成コーデ</Text>
                </View>
                <Text style={s.aiResultItems}>白Tシャツ + デニム + スニーカー</Text>
                <TouchableOpacity onPress={() => setAiGenerated(false)} style={s.aiRetry}>
                  <Ionicons name="refresh-outline" size={14} color={Colors.primary} />
                  <Text style={s.aiRetryText}>別のコーデを生成</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        {/* 3コーデ */}
        <View style={s.sectionRow}>
          <Text style={s.secTitle}>今日の3コーデ</Text>
          <Text style={s.secSub}>
            {outfits[0]?.source ? "ファッション誌・ECより" : "あなたの服から提案"}
          </Text>
        </View>

        <View style={s.outfitList}>
          {outfits.map(outfit => {
            const isLiked = liked.includes(outfit.id)
            return (
              <View key={outfit.id} style={s.outfitCard}>
                <Image
                  source={{ uri: outfit.image }}
                  style={s.outfitImg}
                  resizeMode="cover"
                />
                {/* ソースバッジ */}
                {outfit.source && (
                  <View style={s.sourceBadge}>
                    <Ionicons name="globe-outline" size={10} color="#fff" />
                    <Text style={s.sourceBadgeText}>{outfit.source}</Text>
                  </View>
                )}
                {outfit.fromCloset && (
                  <View style={[s.sourceBadge, { backgroundColor: Colors.primary }]}>
                    <Ionicons name="shirt-outline" size={10} color="#fff" />
                    <Text style={s.sourceBadgeText}>あなたの服</Text>
                  </View>
                )}
                {/* いいねボタン */}
                <TouchableOpacity style={s.likeBtn} onPress={() => toggleLike(outfit.id)}>
                  <Ionicons
                    name={isLiked ? "heart" : "heart-outline"}
                    size={22}
                    color={isLiked ? Colors.primary : "#fff"}
                  />
                </TouchableOpacity>
                {/* 情報 */}
                <View style={s.outfitInfo}>
                  <View style={s.outfitLabelRow}>
                    <View style={s.outfitLabel}>
                      <Text style={s.outfitLabelText}>{outfit.label}</Text>
                    </View>
                    <Text style={s.outfitTemp}>
                      <Ionicons name="thermometer-outline" size={11} color={Colors.textMuted} /> {outfit.temp}
                    </Text>
                  </View>
                  <Text style={s.outfitMood}>{outfit.mood}</Text>
                  <View style={s.itemTags}>
                    {outfit.items.map(item => (
                      <View key={item} style={s.itemTag}>
                        <Text style={s.itemTagText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )
          })}
        </View>

        {/* おすすめ商品 */}
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
  infoBar: { flexDirection: "row", marginHorizontal: 20, marginBottom: 16, backgroundColor: Colors.surface, borderRadius: 16, borderWidth: 1, borderColor: Colors.border, padding: 12 },
  infoItem: { flex: 1, flexDirection: "row", alignItems: "center", gap: 8 },
  divider: { width: 1, backgroundColor: Colors.border, marginHorizontal: 4 },
  infoLabel: { fontSize: 10, color: Colors.textMuted },
  infoVal: { fontSize: 11, fontWeight: "700", color: Colors.text },
  sectionRow: { paddingHorizontal: 20, marginBottom: 10, flexDirection: "row", alignItems: "baseline", gap: 8 },
  secTitle: { fontSize: 16, fontWeight: "800", color: Colors.text },
  secSub: { fontSize: 11, color: Colors.textMuted },
  // AI card
  aiCard: { marginHorizontal: 20, marginBottom: 24, backgroundColor: Colors.surface, borderRadius: 20, borderWidth: 1, borderColor: Colors.border, overflow: "hidden", alignItems: "center", padding: 24 },
  aiCardTitle: { fontSize: 15, fontWeight: "800", color: Colors.text, marginBottom: 6 },
  aiCardSub: { fontSize: 12, color: Colors.textMuted, textAlign: "center", lineHeight: 18, marginBottom: 16 },
  aiBtn: { backgroundColor: Colors.primary, paddingHorizontal: 28, paddingVertical: 12, borderRadius: 24, minWidth: 160, alignItems: "center" },
  aiBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  aiImage: { width: "100%", height: 220, borderRadius: 12, marginBottom: 12 },
  aiResult: { width: "100%", gap: 6 },
  aiResultBadge: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: Colors.primary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, alignSelf: "flex-start" },
  aiResultBadgeText: { fontSize: 11, color: "#fff", fontWeight: "700" },
  aiResultItems: { fontSize: 13, color: Colors.text, fontWeight: "600" },
  aiRetry: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  aiRetryText: { fontSize: 12, color: Colors.primary, fontWeight: "600" },
  // Outfits
  outfitList: { paddingHorizontal: 20, gap: 16, marginBottom: 24 },
  outfitCard: { width: OUTFIT_W, backgroundColor: Colors.surface, borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: Colors.border },
  outfitImg: { width: "100%", height: OUTFIT_W * 1.1 },
  sourceBadge: { position: "absolute", top: 12, left: 12, flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "rgba(0,0,0,0.55)", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  sourceBadgeText: { fontSize: 10, color: "#fff", fontWeight: "700" },
  likeBtn: { position: "absolute", top: 10, right: 12, backgroundColor: "rgba(0,0,0,0.35)", borderRadius: 20, padding: 7 },
  outfitInfo: { padding: 14, gap: 6 },
  outfitLabelRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  outfitLabel: { backgroundColor: Colors.primaryLight, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10 },
  outfitLabelText: { fontSize: 11, color: Colors.primary, fontWeight: "700" },
  outfitTemp: { fontSize: 11, color: Colors.textMuted },
  outfitMood: { fontSize: 12, color: Colors.textMuted },
  itemTags: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  itemTag: { backgroundColor: Colors.background, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, borderWidth: 1, borderColor: Colors.border },
  itemTagText: { fontSize: 11, color: Colors.text },
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
