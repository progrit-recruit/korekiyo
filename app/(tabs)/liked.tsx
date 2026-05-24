import { useState, useEffect } from "react"
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Image, Dimensions,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Colors, MOCK_OUTFITS, MOCK_RECOMMENDATIONS } from "../../constants/theme"

const { width } = Dimensions.get("window")

export default function LikedScreen() {
  const [likedIds, setLikedIds] = useState<string[]>([])

  useEffect(() => {
    AsyncStorage.getItem("liked_outfits").then(val => {
      if (val) setLikedIds(JSON.parse(val))
    })
  }, [])

  const likedOutfits = MOCK_OUTFITS.filter(o => likedIds.includes(o.id))

  async function unlike(id: string) {
    const next = likedIds.filter(x => x !== id)
    setLikedIds(next)
    await AsyncStorage.setItem("liked_outfits", JSON.stringify(next))
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>コレいいね ❤️</Text>
        <Text style={styles.sub}>保存したコーデをいつでも見返せます</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {likedOutfits.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🤍</Text>
            <Text style={styles.emptyText}>まだ保存されていません</Text>
            <Text style={styles.emptySub}>ホームのコーデで❤️を押して保存しましょう</Text>
          </View>
        ) : (
          <View style={styles.outfitList}>
            {likedOutfits.map(outfit => (
              <View key={outfit.id} style={styles.outfitCard}>
                <Image source={{ uri: outfit.image }} style={styles.outfitImage} />
                <TouchableOpacity
                  style={styles.unlikeBtn}
                  onPress={() => unlike(outfit.id)}
                >
                  <Text style={{ fontSize: 20 }}>❤️</Text>
                </TouchableOpacity>
                <View style={styles.outfitInfo}>
                  <View style={styles.labelRow}>
                    <View style={styles.label}>
                      <Text style={styles.labelText}>{outfit.label}</Text>
                    </View>
                    <Text style={styles.temp}>{outfit.temp}</Text>
                  </View>
                  <Text style={styles.mood}>{outfit.mood}</Text>
                  <View style={styles.items}>
                    {outfit.items.map(item => (
                      <Text key={item} style={styles.item}>• {item}</Text>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* おすすめ商品（いいねに関連） */}
        <View style={styles.recSection}>
          <Text style={styles.recTitle}>このコーデに合う商品 👀</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingBottom: 4 }}>
            {MOCK_RECOMMENDATIONS.slice(0, 4).map(item => (
              <View key={item.id} style={styles.recCard}>
                <Image source={{ uri: item.image }} style={styles.recImage} />
                <Text style={styles.recBrand}>{item.brand}</Text>
                <Text style={styles.recName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.recPrice}>¥{item.price.toLocaleString()}</Text>
                <TouchableOpacity style={styles.recBtn}>
                  <Text style={styles.recBtnText}>チェック →</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  title: { fontSize: 22, fontWeight: "900", color: Colors.text },
  sub: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  empty: { alignItems: "center", paddingTop: 80, gap: 8 },
  emptyIcon: { fontSize: 56 },
  emptyText: { fontSize: 16, fontWeight: "700", color: Colors.text },
  emptySub: { fontSize: 13, color: Colors.textMuted, textAlign: "center" },
  outfitList: { paddingHorizontal: 20, gap: 16 },
  outfitCard: { backgroundColor: Colors.surface, borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: Colors.border },
  outfitImage: { width: "100%", height: width - 40 },
  unlikeBtn: { position: "absolute", top: 12, right: 12, backgroundColor: "rgba(255,255,255,0.9)", borderRadius: 20, padding: 6 },
  outfitInfo: { padding: 16 },
  labelRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 4 },
  label: { backgroundColor: Colors.primaryLight, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  labelText: { fontSize: 11, color: Colors.primary, fontWeight: "700" },
  temp: { fontSize: 11, color: Colors.textMuted },
  mood: { fontSize: 13, color: Colors.textMuted, marginBottom: 8 },
  items: { gap: 3 },
  item: { fontSize: 14, color: Colors.text, fontWeight: "500" },
  recSection: { paddingHorizontal: 20, marginTop: 28 },
  recTitle: { fontSize: 16, fontWeight: "800", color: Colors.text, marginBottom: 12 },
  recCard: { width: 130, backgroundColor: Colors.surface, borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: Colors.border },
  recImage: { width: "100%", height: 130 },
  recBrand: { fontSize: 10, color: Colors.primary, fontWeight: "700", paddingHorizontal: 10, paddingTop: 8 },
  recName: { fontSize: 12, color: Colors.text, fontWeight: "600", paddingHorizontal: 10, lineHeight: 16 },
  recPrice: { fontSize: 13, color: Colors.text, fontWeight: "800", paddingHorizontal: 10, marginTop: 4 },
  recBtn: { margin: 10, backgroundColor: Colors.primaryLight, paddingVertical: 6, borderRadius: 10, alignItems: "center" },
  recBtnText: { fontSize: 11, color: Colors.primary, fontWeight: "700" },
})
