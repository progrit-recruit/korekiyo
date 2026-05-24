import { useState, useCallback } from "react"
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Image, Dimensions,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Ionicons } from "@expo/vector-icons"
import { useFocusEffect } from "expo-router"
import { Colors, MOCK_RECOMMENDATIONS } from "../../constants/theme"

const { width } = Dimensions.get("window")

type Outfit = {
  id: string; label: string; items: string[]
  mood: string; temp: string; image: string
  source?: string; fromCloset?: boolean
}

export default function LikedScreen() {
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null)
  const [likedRecIds, setLikedRecIds] = useState<string[]>([])

  async function loadData() {
    const outfitData = await AsyncStorage.getItem("selected_outfit_data")
    if (outfitData) {
      try { setSelectedOutfit(JSON.parse(outfitData)) } catch { setSelectedOutfit(null) }
    } else {
      setSelectedOutfit(null)
    }

    const likedData = await AsyncStorage.getItem("liked_recommendations")
    if (likedData) {
      try { setLikedRecIds(JSON.parse(likedData)) } catch { setLikedRecIds([]) }
    } else {
      setLikedRecIds([])
    }
  }

  useFocusEffect(useCallback(() => { loadData() }, []))

  async function removeSelectedOutfit() {
    await AsyncStorage.removeItem("selected_outfit")
    await AsyncStorage.removeItem("selected_outfit_data")
    setSelectedOutfit(null)
  }

  async function unlikeRec(id: string) {
    const next = likedRecIds.filter(x => x !== id)
    setLikedRecIds(next)
    await AsyncStorage.setItem("liked_recommendations", JSON.stringify(next))
  }

  const likedRecs = MOCK_RECOMMENDATIONS.filter(r => likedRecIds.includes(r.id))

  const isEmpty = !selectedOutfit && likedRecs.length === 0

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>コレいいね</Text>
        <Text style={styles.sub}>選んだコーデやいいねした商品</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {isEmpty ? (
          <View style={styles.empty}>
            <Ionicons name="heart-outline" size={56} color={Colors.textLight} />
            <Text style={styles.emptyText}>まだ保存されていません</Text>
            <Text style={styles.emptySub}>ホームでコーデを選ぶか商品にいいねしましょう</Text>
          </View>
        ) : (
          <>
            {/* 今日選んだコーデ */}
            {selectedOutfit && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>今日選んだコーデ</Text>
                <View style={styles.outfitCard}>
                  <Image source={{ uri: selectedOutfit.image }} style={styles.outfitImage} />
                  {/* TODAY バッジ */}
                  <View style={styles.todayBadge}>
                    <Ionicons name={"checkmark" as any} size={11} color="#fff" />
                    <Text style={styles.todayBadgeText}>TODAY</Text>
                  </View>
                  {/* 削除ボタン */}
                  <TouchableOpacity style={styles.removeBtn} onPress={removeSelectedOutfit}>
                    <Ionicons name={"close" as any} size={16} color={Colors.textMuted} />
                  </TouchableOpacity>
                  <View style={styles.outfitInfo}>
                    <View style={styles.labelRow}>
                      <View style={styles.labelBadge}>
                        <Text style={styles.labelText}>{selectedOutfit.label}</Text>
                      </View>
                      {selectedOutfit.temp && <Text style={styles.temp}>{selectedOutfit.temp}</Text>}
                    </View>
                    <Text style={styles.mood}>{selectedOutfit.mood}</Text>
                    <View style={styles.itemsList}>
                      {selectedOutfit.items.map(item => (
                        <Text key={item} style={styles.item}>• {item}</Text>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            )}

            {/* いいねした商品 */}
            {likedRecs.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>いいねした商品</Text>
                <View style={styles.recGrid}>
                  {likedRecs.map(item => (
                    <View key={item.id} style={styles.recCard}>
                      <Image source={{ uri: item.image }} style={styles.recImage} />
                      <TouchableOpacity
                        style={styles.unlikeBtn}
                        onPress={() => unlikeRec(item.id)}
                      >
                        <Ionicons name={"heart" as any} size={16} color={Colors.primary} />
                      </TouchableOpacity>
                      <View style={styles.recInfo}>
                        <Text style={styles.recBrand}>{item.brand}</Text>
                        <Text style={styles.recName} numberOfLines={2}>{item.name}</Text>
                        <Text style={styles.recPrice}>¥{item.price.toLocaleString()}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const GRID_GAP = 12
const GRID_COL = 2
const CARD_W = (width - 40 - GRID_GAP) / GRID_COL

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  title: { fontSize: 22, fontWeight: "900", color: Colors.text },
  sub: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  empty: { alignItems: "center", paddingTop: 80, gap: 8 },
  emptyText: { fontSize: 16, fontWeight: "700", color: Colors.text },
  emptySub: { fontSize: 13, color: Colors.textMuted, textAlign: "center", paddingHorizontal: 40 },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 15, fontWeight: "800", color: Colors.text, marginBottom: 12 },
  // 選択コーデカード
  outfitCard: { backgroundColor: Colors.surface, borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: Colors.border },
  outfitImage: { width: "100%", height: width - 40 },
  todayBadge: {
    position: "absolute", top: 12, left: 12,
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: Colors.primary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12,
  },
  todayBadgeText: { fontSize: 11, fontWeight: "900", color: "#fff" },
  removeBtn: {
    position: "absolute", top: 12, right: 12,
    backgroundColor: "rgba(255,255,255,0.9)", borderRadius: 20, padding: 6,
  },
  outfitInfo: { padding: 16 },
  labelRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 4 },
  labelBadge: { backgroundColor: Colors.primaryLight, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  labelText: { fontSize: 11, color: Colors.primary, fontWeight: "700" },
  temp: { fontSize: 11, color: Colors.textMuted },
  mood: { fontSize: 13, color: Colors.textMuted, marginBottom: 8 },
  itemsList: { gap: 3 },
  item: { fontSize: 14, color: Colors.text, fontWeight: "500" },
  // グリッド
  recGrid: { flexDirection: "row", flexWrap: "wrap", gap: GRID_GAP },
  recCard: {
    width: CARD_W,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  recImage: { width: "100%", height: CARD_W },
  unlikeBtn: {
    position: "absolute", top: 8, right: 8,
    backgroundColor: "rgba(255,255,255,0.9)", borderRadius: 16, padding: 6,
  },
  recInfo: { padding: 10 },
  recBrand: { fontSize: 10, color: Colors.primary, fontWeight: "700", marginBottom: 2 },
  recName: { fontSize: 12, color: Colors.text, fontWeight: "600", lineHeight: 16, marginBottom: 4 },
  recPrice: { fontSize: 13, color: Colors.text, fontWeight: "800" },
})
