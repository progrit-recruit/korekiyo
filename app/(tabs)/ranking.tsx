import { useState } from "react"
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  SafeAreaView, Image, Dimensions,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Colors, MOCK_RANKING, MOCK_TIMELINE } from "../../constants/theme"

const { width } = Dimensions.get("window")

const PERIODS = ["今日", "今週", "今月"]

export default function RankingScreen() {
  const [tab, setTab] = useState<"ranking" | "timeline">("ranking")
  const [period, setPeriod] = useState("今日")
  const [likedTimeline, setLikedTimeline] = useState<string[]>([])

  function toggleTimelineLike(id: string) {
    setLikedTimeline(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>ランキング</Text>
      </View>

      {/* Tab switch */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabBtn, tab === "ranking" && styles.tabBtnActive]}
          onPress={() => setTab("ranking")}
        >
          <Text style={[styles.tabBtnText, tab === "ranking" && styles.tabBtnTextActive]}>📈 トレンド</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, tab === "timeline" && styles.tabBtnActive]}
          onPress={() => setTab("timeline")}
        >
          <Text style={[styles.tabBtnText, tab === "timeline" && styles.tabBtnTextActive]}>📸 タイムライン</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {tab === "ranking" ? (
          <>
            {/* Period selector */}
            <View style={styles.periodRow}>
              {PERIODS.map(p => (
                <TouchableOpacity
                  key={p}
                  onPress={() => setPeriod(p)}
                  style={[styles.periodBtn, period === p && styles.periodBtnActive]}
                >
                  <Text style={[styles.periodText, period === p && styles.periodTextActive]}>{p}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Top 3 podium */}
            <View style={styles.podium}>
              {/* 2位 */}
              <View style={styles.podiumItem}>
                <Image source={{ uri: MOCK_RANKING[1].image }} style={[styles.podiumImage, { width: 90, height: 110 }]} />
                <View style={[styles.podiumBadge, { backgroundColor: "#C0C0C0" }]}>
                  <Text style={styles.podiumBadgeText}>2位</Text>
                </View>
                <Text style={styles.podiumName} numberOfLines={2}>{MOCK_RANKING[1].name}</Text>
                <Text style={styles.podiumBrand}>{MOCK_RANKING[1].brand}</Text>
                <View style={styles.podiumLikesRow}>
                  <Ionicons name={"heart" as any} size={11} color={Colors.primary} />
                  <Text style={styles.podiumLikes}>{MOCK_RANKING[1].likes.toLocaleString()}</Text>
                </View>
              </View>
              {/* 1位 */}
              <View style={[styles.podiumItem, { marginBottom: 20 }]}>
                <Text style={{ fontSize: 28, marginBottom: 4 }}>👑</Text>
                <Image source={{ uri: MOCK_RANKING[0].image }} style={[styles.podiumImage, { width: 110, height: 140, borderColor: "#FFD700", borderWidth: 3 }]} />
                <View style={[styles.podiumBadge, { backgroundColor: "#FFD700" }]}>
                  <Text style={styles.podiumBadgeText}>1位</Text>
                </View>
                <Text style={styles.podiumName} numberOfLines={2}>{MOCK_RANKING[0].name}</Text>
                <Text style={styles.podiumBrand}>{MOCK_RANKING[0].brand}</Text>
                <View style={styles.podiumLikesRow}>
                  <Ionicons name={"heart" as any} size={11} color={Colors.primary} />
                  <Text style={styles.podiumLikes}>{MOCK_RANKING[0].likes.toLocaleString()}</Text>
                </View>
              </View>
              {/* 3位 */}
              <View style={styles.podiumItem}>
                <Image source={{ uri: MOCK_RANKING[2].image }} style={[styles.podiumImage, { width: 90, height: 110 }]} />
                <View style={[styles.podiumBadge, { backgroundColor: "#CD7F32" }]}>
                  <Text style={styles.podiumBadgeText}>3位</Text>
                </View>
                <Text style={styles.podiumName} numberOfLines={2}>{MOCK_RANKING[2].name}</Text>
                <Text style={styles.podiumBrand}>{MOCK_RANKING[2].brand}</Text>
                <View style={styles.podiumLikesRow}>
                  <Ionicons name={"heart" as any} size={11} color={Colors.primary} />
                  <Text style={styles.podiumLikes}>{MOCK_RANKING[2].likes.toLocaleString()}</Text>
                </View>
              </View>
            </View>

            {/* 4〜5位 */}
            <View style={styles.listSection}>
              {MOCK_RANKING.slice(3).map(item => (
                <View key={item.rank} style={styles.listItem}>
                  <Text style={styles.listRank}>{item.rank}</Text>
                  <Image source={{ uri: item.image }} style={styles.listImage} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.listName}>{item.name}</Text>
                    <Text style={styles.listBrand}>{item.brand}</Text>
                    <View style={styles.listLikesRow}>
                      <Ionicons name={"heart" as any} size={11} color={Colors.primary} />
                      <Text style={styles.listLikes}>{item.likes.toLocaleString()}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.ecBtn}>
                    <Text style={styles.ecBtnText}>ECへ →</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </>
        ) : (
          /* Timeline */
          <View style={styles.timelineContainer}>
            {MOCK_TIMELINE.map(post => {
              const isLiked = likedTimeline.includes(post.id)
              return (
                <View key={post.id} style={styles.timelineCard}>
                  <View style={styles.timelineHeader}>
                    <View style={styles.avatar}>
                      <Text style={{ fontSize: 18 }}>{post.role === "shop" ? "🏪" : "👤"}</Text>
                    </View>
                    <View>
                      <Text style={styles.timelineUser}>{post.user}</Text>
                      {post.role === "shop" && (
                        <Text style={styles.timelineShop}>{post.shop}</Text>
                      )}
                    </View>
                    {post.role === "shop" && (
                      <View style={styles.shopBadge}>
                        <Text style={styles.shopBadgeText}>SHOP</Text>
                      </View>
                    )}
                  </View>
                  <Image source={{ uri: post.image }} style={styles.timelineImage} />
                  <View style={styles.timelineFooter}>
                    <Text style={styles.timelineCaption}>{post.caption}</Text>
                    <View style={styles.timelineActions}>
                      <TouchableOpacity style={styles.likeAction} onPress={() => toggleTimelineLike(post.id)}>
                        <Ionicons name={(isLiked ? "heart" : "heart-outline") as any} size={18} color={isLiked ? Colors.primary : Colors.textMuted} />
                        <Text style={styles.likeCount}>{isLiked ? post.likes + 1 : post.likes}</Text>
                      </TouchableOpacity>
                      {post.role === "shop" && (
                        <TouchableOpacity style={styles.shopLinkBtn}>
                          <Text style={styles.shopLinkText}>ショップを見る →</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              )
            })}
          </View>
        )}
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  title: { fontSize: 22, fontWeight: "900", color: Colors.text },
  tabRow: { flexDirection: "row", marginHorizontal: 20, marginBottom: 12, backgroundColor: Colors.border, borderRadius: 16, padding: 4 },
  tabBtn: { flex: 1, paddingVertical: 8, alignItems: "center", borderRadius: 12 },
  tabBtnActive: { backgroundColor: "#fff" },
  tabBtnText: { fontSize: 13, fontWeight: "700", color: Colors.textMuted },
  tabBtnTextActive: { color: Colors.text },
  periodRow: { flexDirection: "row", gap: 8, paddingHorizontal: 20, marginBottom: 16 },
  periodBtn: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, borderWidth: 1.5, borderColor: Colors.border },
  periodBtnActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  periodText: { fontSize: 12, color: Colors.textMuted, fontWeight: "600" },
  periodTextActive: { color: Colors.primary },
  podium: { flexDirection: "row", justifyContent: "center", alignItems: "flex-end", paddingHorizontal: 20, marginBottom: 16, gap: 8 },
  podiumItem: { flex: 1, alignItems: "center", gap: 6 },
  podiumImage: { borderRadius: 16 },
  podiumBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12 },
  podiumBadgeText: { fontSize: 11, fontWeight: "800", color: "#fff" },
  podiumName: { fontSize: 11, fontWeight: "700", color: Colors.text, textAlign: "center", lineHeight: 14 },
  podiumBrand: { fontSize: 10, color: Colors.primary },
  podiumLikesRow: { flexDirection: "row", alignItems: "center", gap: 3 },
  podiumLikes: { fontSize: 11, color: Colors.textMuted },
  listSection: { paddingHorizontal: 20 },
  listItem: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: Colors.surface, borderRadius: 16, padding: 12, marginBottom: 8 },
  listRank: { fontSize: 18, fontWeight: "900", color: Colors.textMuted, width: 24 },
  listImage: { width: 56, height: 56, borderRadius: 12 },
  listName: { fontSize: 13, fontWeight: "700", color: Colors.text },
  listBrand: { fontSize: 11, color: Colors.primary },
  listLikesRow: { flexDirection: "row", alignItems: "center", gap: 3 },
  listLikes: { fontSize: 11, color: Colors.textMuted },
  ecBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: Colors.primary },
  ecBtnText: { fontSize: 11, color: Colors.primary, fontWeight: "700" },
  timelineContainer: { paddingHorizontal: 20, gap: 16 },
  timelineCard: { backgroundColor: Colors.surface, borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: Colors.border },
  timelineHeader: { flexDirection: "row", alignItems: "center", padding: 12, gap: 10 },
  avatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: Colors.background, justifyContent: "center", alignItems: "center" },
  timelineUser: { fontSize: 13, fontWeight: "700", color: Colors.text },
  timelineShop: { fontSize: 11, color: Colors.primary },
  shopBadge: { marginLeft: "auto", backgroundColor: Colors.primaryLight, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  shopBadgeText: { fontSize: 10, fontWeight: "800", color: Colors.primary },
  timelineImage: { width: "100%", height: width - 80 },
  timelineFooter: { padding: 12 },
  timelineCaption: { fontSize: 13, color: Colors.text, marginBottom: 10, lineHeight: 18 },
  timelineActions: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  likeAction: { flexDirection: "row", alignItems: "center", gap: 4 },
  likeCount: { fontSize: 13, color: Colors.textMuted, fontWeight: "600" },
  shopLinkBtn: { backgroundColor: Colors.primaryLight, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 12 },
  shopLinkText: { fontSize: 12, color: Colors.primary, fontWeight: "700" },
})
