import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native"
import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../../constants/theme"

export default function GenderScreen() {
  const router = useRouter()

  async function select(gender: "female" | "male") {
    await AsyncStorage.setItem("user_gender", gender)
    router.push("/onboarding/diagnosis")
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Ionicons name="shirt-outline" size={36} color={Colors.primary} />
        </View>
        <Text style={styles.title}>コレキヨへようこそ</Text>
        <Text style={styles.sub}>あなたのスタイルを教えてください</Text>

        <View style={styles.cards}>
          <TouchableOpacity style={styles.card} onPress={() => select("female")} activeOpacity={0.85}>
            <View style={[styles.iconWrap, { backgroundColor: "#FFE8F0" }]}>
              <Ionicons name="woman-outline" size={48} color="#E05A8A" />
            </View>
            <Text style={styles.cardLabel}>レディース</Text>
            <Text style={styles.cardSub}>女性向けコーデ</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => select("male")} activeOpacity={0.85}>
            <View style={[styles.iconWrap, { backgroundColor: "#E8EEFF" }]}>
              <Ionicons name="man-outline" size={48} color="#4A6FE5" />
            </View>
            <Text style={styles.cardLabel}>メンズ</Text>
            <Text style={styles.cardSub}>男性向けコーデ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, paddingHorizontal: 32, justifyContent: "center", alignItems: "center" },
  logo: {
    width: 72, height: 72, borderRadius: 24,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center", alignItems: "center", marginBottom: 24,
  },
  title: { fontSize: 26, fontWeight: "800", color: Colors.text, marginBottom: 8 },
  sub: { fontSize: 14, color: Colors.textMuted, marginBottom: 48 },
  cards: { flexDirection: "row", gap: 16, width: "100%" },
  card: {
    flex: 1, backgroundColor: Colors.surface, borderRadius: 24,
    alignItems: "center", paddingVertical: 32, paddingHorizontal: 16,
    borderWidth: 1.5, borderColor: Colors.border,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8,
  },
  iconWrap: { width: 80, height: 80, borderRadius: 20, justifyContent: "center", alignItems: "center", marginBottom: 16 },
  cardLabel: { fontSize: 16, fontWeight: "800", color: Colors.text, marginBottom: 4 },
  cardSub: { fontSize: 12, color: Colors.textMuted },
})
