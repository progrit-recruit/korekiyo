import { useState, useEffect } from "react"
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  SafeAreaView, Alert,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../../constants/theme"

type IoniconName = React.ComponentProps<typeof Ionicons>["name"]

function Row({
  label, value, onPress, icon,
}: {
  label: string
  value?: string
  onPress?: () => void
  icon: IoniconName
}) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={onPress ? 0.7 : 1}>
      <Ionicons name={icon} size={20} color={Colors.textMuted} style={{ width: 24 }} />
      <View style={{ flex: 1 }}>
        <Text style={styles.rowLabel}>{label}</Text>
        {value !== undefined && <Text style={styles.rowValue}>{value}</Text>}
      </View>
      {onPress && <Ionicons name="chevron-forward" size={16} color={Colors.textLight} />}
    </TouchableOpacity>
  )
}

type WeatherInfo = {
  description: string
  tempMin: string
  tempMax: string
  pop: string
  icon: IoniconName
}

function weatherCodeToIcon(code: string): IoniconName {
  const n = parseInt(code, 10)
  if (n === 100 || n === 101) return "sunny-outline"
  if (n >= 102 && n <= 115) return "partly-sunny-outline"
  if (n >= 200 && n <= 260) return "rainy-outline"
  if (n >= 300 && n <= 320) return "snow-outline"
  if (n >= 400 && n <= 430) return "thunderstorm-outline"
  return "cloudy-outline"
}

export default function AccountScreen() {
  const router = useRouter()
  const [points] = useState(1400)
  const [weather, setWeather] = useState<WeatherInfo | null>(null)
  const [closetCount, setClosetCount] = useState(0)

  useEffect(() => {
    AsyncStorage.getItem("user_closet").then(data => {
      if (data) setClosetCount(JSON.parse(data).length)
    })
  }, [])

  useEffect(() => {
    fetch("https://www.jma.go.jp/bosai/forecast/data/forecast/270000.json")
      .then(r => r.json())
      .then((data: any) => {
        const ts = data[0]?.timeSeries
        if (!ts) return

        const area0 = ts[0]?.areas?.[0]
        const weatherDesc: string = area0?.weathers?.[0] ?? "取得中"
        const weatherCode: string = area0?.weatherCodes?.[0] ?? "100"

        const area2 = ts[2]?.areas?.[0]
        const temps: string[] = area2?.temps ?? []
        const tempMin = temps[0] ?? "-"
        const tempMax = temps[1] ?? "-"

        const area1 = ts[1]?.areas?.[0]
        const pops: string[] = area1?.pops ?? []
        const pop = pops[0] ?? "0"

        setWeather({
          description: weatherDesc.replace(/　/g, " ").trim(),
          tempMin,
          tempMax,
          pop,
          icon: weatherCodeToIcon(weatherCode),
        })
      })
      .catch(() => {
        setWeather({ description: "取得失敗", tempMin: "-", tempMax: "-", pop: "-", icon: "cloud-offline-outline" })
      })
  }, [])

  async function handleRediagnosis() {
    Alert.alert("再診断", "診断をリセットして最初からやり直しますか？", [
      { text: "キャンセル", style: "cancel" },
      {
        text: "リセットして診断",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("onboarding_done")
          await AsyncStorage.removeItem("today_mood")
          router.replace("/onboarding/diagnosis")
        },
      },
    ])
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={36} color={Colors.primary} />
          </View>
          <Text style={styles.username}>ゲストユーザー</Text>
          <View style={styles.pointCard}>
            <Ionicons name="star-outline" size={14} color={Colors.point} />
            <Text style={styles.pointLabel}>保有ポイント</Text>
            <Text style={styles.pointValue}>{points.toLocaleString()} pt</Text>
          </View>
          <View style={styles.statRow}>
            <View style={styles.stat}>
              <Text style={styles.statNum}>{closetCount}</Text>
              <Text style={styles.statLabel}>登録アイテム</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNum}>0</Text>
              <Text style={styles.statLabel}>コレいいね</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNum}>3</Text>
              <Text style={styles.statLabel}>コーデ提案数</Text>
            </View>
          </View>
        </View>

        {/* Weather card */}
        <View style={styles.weatherCard}>
          <View style={styles.weatherHeader}>
            <Ionicons name="location-outline" size={13} color={Colors.textMuted} />
            <Text style={styles.weatherArea}>大阪府の天気（気象庁）</Text>
          </View>
          {weather ? (
            <View style={styles.weatherBody}>
              <Ionicons name={weather.icon} size={40} color={Colors.primary} />
              <View style={{ flex: 1 }}>
                <Text style={styles.weatherDesc} numberOfLines={2}>{weather.description}</Text>
                <View style={styles.weatherRow}>
                  <Ionicons name="thermometer-outline" size={13} color={Colors.textMuted} />
                  <Text style={styles.weatherDetail}>
                    {weather.tempMin !== "-" ? `${weather.tempMin}℃ / ` : ""}{weather.tempMax !== "-" ? `${weather.tempMax}℃` : "-"}
                  </Text>
                  <Ionicons name="umbrella-outline" size={13} color={Colors.info} />
                  <Text style={[styles.weatherDetail, { color: Colors.info }]}>降水 {weather.pop}%</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.weatherBody}>
              <Ionicons name="cloud-outline" size={36} color={Colors.textLight} />
              <Text style={{ color: Colors.textMuted, fontSize: 13, marginLeft: 12 }}>天気を取得中...</Text>
            </View>
          )}
        </View>

        {/* Settings */}
        <Text style={styles.sectionTitle}>プロフィール設定</Text>
        <View style={styles.card}>
          <Row icon="resize-outline" label="身長・体重" value="158cm / 50kg" />
          <Row icon="body-outline" label="骨格タイプ" value="ウェーブ" />
          <Row icon="color-palette-outline" label="パーソナルカラー" value="スプリング" />
          <Row icon="happy-outline" label="顔タイプ" value="フレッシュ" />
        </View>

        <Text style={styles.sectionTitle}>診断</Text>
        <View style={styles.card}>
          <Row icon="refresh-outline" label="再診断する" onPress={handleRediagnosis} />
        </View>

        <Text style={styles.sectionTitle}>連携</Text>
        <View style={styles.card}>
          <Row icon="calendar-outline" label="カレンダー連携" value="未連携" onPress={() => {}} />
        </View>

        <Text style={styles.sectionTitle}>アプリ情報</Text>
        <View style={styles.card}>
          <Row icon="notifications-outline" label="通知設定" onPress={() => {}} />
          <Row icon="lock-closed-outline" label="プライバシーポリシー" onPress={() => {}} />
          <Row icon="document-text-outline" label="利用規約" onPress={() => {}} />
          <Row icon="chatbubble-outline" label="お問い合わせ" onPress={() => {}} />
          <Row icon="information-circle-outline" label="バージョン" value="1.0.0" />
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  profileCard: {
    margin: 20, backgroundColor: Colors.surface, borderRadius: 24,
    padding: 24, alignItems: "center", borderWidth: 1, borderColor: Colors.border,
  },
  avatar: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.background,
    justifyContent: "center", alignItems: "center", marginBottom: 10,
    borderWidth: 2, borderColor: Colors.primary,
  },
  username: { fontSize: 18, fontWeight: "800", color: Colors.text, marginBottom: 12 },
  pointCard: {
    flexDirection: "row", alignItems: "center", gap: 6,
    backgroundColor: Colors.accentLight, paddingHorizontal: 18, paddingVertical: 8,
    borderRadius: 20, marginBottom: 16,
  },
  pointLabel: { fontSize: 12, color: Colors.point, fontWeight: "600" },
  pointValue: { fontSize: 18, color: Colors.point, fontWeight: "900" },
  statRow: { flexDirection: "row", width: "100%" },
  stat: { flex: 1, alignItems: "center", gap: 2 },
  statDivider: { width: 1, backgroundColor: Colors.border },
  statNum: { fontSize: 22, fontWeight: "900", color: Colors.primary },
  statLabel: { fontSize: 11, color: Colors.textMuted },
  weatherCard: {
    marginHorizontal: 20, marginBottom: 20, backgroundColor: Colors.surface,
    borderRadius: 20, padding: 16, borderWidth: 1, borderColor: Colors.border,
  },
  weatherHeader: { flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 10 },
  weatherArea: { fontSize: 11, color: Colors.textMuted, fontWeight: "600" },
  weatherBody: { flexDirection: "row", alignItems: "center", gap: 12 },
  weatherDesc: { fontSize: 13, color: Colors.text, fontWeight: "600", lineHeight: 18, flex: 1 },
  weatherRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  weatherDetail: { fontSize: 12, color: Colors.textMuted, marginRight: 8 },
  sectionTitle: { fontSize: 12, fontWeight: "700", color: Colors.textMuted, paddingHorizontal: 20, marginBottom: 8, letterSpacing: 0.5 },
  card: {
    marginHorizontal: 20, marginBottom: 20, backgroundColor: Colors.surface,
    borderRadius: 16, borderWidth: 1, borderColor: Colors.border, overflow: "hidden",
  },
  row: {
    flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: Colors.border, gap: 12,
  },
  rowLabel: { fontSize: 14, fontWeight: "600", color: Colors.text },
  rowValue: { fontSize: 12, color: Colors.textMuted, marginTop: 1 },
})
