import { useState, useCallback } from "react"
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  SafeAreaView, Image, Dimensions, FlatList, ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Colors, MOCK_RANKING, MOCK_TIMELINE } from "../../constants/theme"

const { width } = Dimensions.get("window")

const GRID_PAD = 20
const GRID_GAP = 8
const CARD_W = (width - GRID_PAD * 2 - GRID_GAP) / 2
const PAGE_SIZE = 4

const PERIODS = ["今日", "今週", "今月"]

type TimelineItem = typeof MOCK_TIMELINE[number]

function GridCard({
  item,
  isLiked,
  onToggle,
}: {
  item: TimelineItem & { _key: string }
  isLiked: boolean
  onToggle: (id: string) => void
}) {
  return (
    <View style={styles.gridCard}>
      <Image source={{ uri: item.image }} style={styles.gridImage} resizeMode="cover" />
      <View style={styles.gridInfo}>
        <View style={styles.gridRow}>
          <View style={styles.gridUserRow}>
            <Ionicons
              name={item.role === "shop" ? "storefront-outline" : "person-outline"}
              size={11}
              color={Colors.textMuted}
            />
            <Text style={styles.gridUser} numberOfLines={1}>{item.user}</Text>
          </View>
          <TouchableOpacity onPress={() => onToggle(item._key)} style={styles.gridLikeBtn}>
            <Ionicons
              name={(isLiked ? "heart" : "heart-outline") as any}
              size={13}
              color={isLiked ? Colors.primary : Colors.textMuted}
            />
            <Text style={[styles.gridLikeCount, isLiked && { color: Colors.primary }]}>
              {isLiked ? item.likes + 1 : item.likes}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.gridCaption} numberOfLines={2}>{item.caption}</Text>
      </View>
    </View>
  )
}

export default function RankingScreen() {
  const [tab, setTab] = useState<"ranking" | "timeline">("ranking")
  const [period, setPeriod] = useState("今日")
  const [likedTimeline, setLikedTimeline] = useState<string[]>([])
  const [loadingMore, setLoadingMore] = useState(false)

  const makeItems = useCallback((count: number): (TimelineItem & { _key: string })[] =>
    Array.from({ length: count }, (_, i) => {
      const base = MOCK_TIMELINE[i % MOCK_TIMELINE.length]
      return { ...base, _key: `${base.id}_${i}` }
    }),
    []
  )

  const [displayedTimeline, setDisplayedTimeline] = useState(() => makeItems(PAGE_SIZE))

  function toggleTimelineLike(key: string) {
    setLikedTimeline(prev =>
      prev.includes(key) ? prev.filter(x => x !== key) : [...prev, key]
    )
  }

  function loadMore() {
    if (loadingMore || displayedTimeline.length >= 40) return
    setLoadingMore(true)
    setTimeout(() => {
      setDisplayedTimeline(prev => makeItems(prev.length + PAGE_SIZE))
      setLoadingMore(false)
    }, 400)
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
          <View style={styles.tabBtnInner}>
            <Ionicons name="trending-up" size={13} color={tab === "ranking" ? Colors.text : Colors.textMuted} />
            <Text style={[styles.tabBtnText, tab === "ranking" && styles.tabBtnTextActive]}>トレンド</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, tab === "timeline" && styles.tabBtnActive]}
          onPress={() => setTab("timeline")}
        >
          <View style={styles.tabBtnInner}>
            <Ionicons name="heart" size={13} color={tab === "timeline" ? Colors.text : Colors.textMuted} />
            <Text style={[styles.tabBtnText, tab === "timeline" && styles.tabBtnTextActive]}>人気コーデ</Text>
          </View>
        </TouchableOpacity>
      </View>

      {tab === "ranking" ? (
        <ScrollView showsVerticalScrollIndicator={false}>
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
            <View style={[styles.podiumItem, { marginBottom: 20 }]}>
              <Ionicons name="trophy" size={28} color="#FFD700" style={{ marginBottom: 4 }} />
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

          {/* 4〜8位 */}
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
          <View style={{ height: 32 }} />
        </ScrollView>
      ) : (
        /* 人気コーデ — 2カラム無限スクロール */
        <FlatList
          key="grid"
          data={displayedTimeline}
          numColumns={2}
          keyExtractor={item => item._key}
          contentContainerStyle={styles.gridContainer}
          columnWrapperStyle={styles.gridColWrapper}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          renderItem={({ item }) => (
            <GridCard
              item={item}
              isLiked={likedTimeline.includes(item._key)}
              onToggle={toggleTimelineLike}
            />
          )}
          ListFooterComponent={
            loadingMore ? (
              <View style={styles.loadingFooter}>
                <ActivityIndicator size="small" color={Colors.primary} />
              </View>
            ) : null
          }
        />
      )}
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
  tabBtnInner: { flexDirection: "row", alignItems: "center", gap: 5 },
  tabBtnText: { fontSize: 13, fontWeight: "700", color: Colors.textMuted },
  tabBtnTextActive: { color: Colors.text },
  // ranking
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
  // 人気コーデ グリッド
  gridContainer: { paddingHorizontal: GRID_PAD, paddingTop: 4, paddingBottom: 40 },
  gridColWrapper: { gap: GRID_GAP, marginBottom: GRID_GAP },
  gridCard: {
    width: CARD_W,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  gridImage: { width: CARD_W, height: CARD_W * 1.25 },
  gridInfo: { padding: 8, gap: 4 },
  gridRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  gridUserRow: { flexDirection: "row", alignItems: "center", gap: 3, flex: 1, marginRight: 4 },
  gridUser: { fontSize: 10, color: Colors.textMuted, fontWeight: "600", flex: 1 },
  gridLikeBtn: { flexDirection: "row", alignItems: "center", gap: 2 },
  gridLikeCount: { fontSize: 10, color: Colors.textMuted, fontWeight: "600" },
  gridCaption: { fontSize: 11, color: Colors.text, lineHeight: 15 },
  loadingFooter: { paddingVertical: 20, alignItems: "center" },
})
