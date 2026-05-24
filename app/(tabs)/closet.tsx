import { useState, useEffect } from "react"
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  SafeAreaView, Modal, TextInput, Image, FlatList, Dimensions, Alert, Platform,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import { CameraView, useCameraPermissions, type BarcodeScanningResult } from "expo-camera"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../../constants/theme"

const { width } = Dimensions.get("window")
const ITEM_W = (width - 52) / 2
const STORAGE_KEY = "user_closet"
const CLOSET_VERSION = "v4"
const VERSION_KEY = "user_closet_version"

type ClothingItem = {
  id: string
  image: string | null
  name: string
  category: string
  color: string
  brand: string
}

const MOCK_CLOTHES: ClothingItem[] = [
  { id: "c1", image: "https://golfwang.com/cdn/shop/files/Golfwang69eaaac10ef20269eaaac10f14d.0371665869eaaac10f14d.jpg?v=1776986832&width=400", name: "Airborne Jacket", category: "アウター", color: "ブラック", brand: "Golf Wang" },
  { id: "c2", image: "https://golfwang.com/cdn/shop/files/Golfwang69ea83e89d0c4269ea83e89d18b.7880038569ea83e89d18b.jpg?v=1776976973&width=400", name: "G-7 Cargo Pant", category: "ボトムス", color: "ブラック", brand: "Golf Wang" },
  { id: "c3", image: "https://golfwang.com/cdn/shop/files/Golfwang69ea8374486d9669ea837448b1b.1252492569ea837448b1b.jpg?v=1776976822&width=400", name: "Tucker Button Down", category: "トップス", color: "ピンク", brand: "Golf Wang" },
  { id: "c4", image: "https://golfwang.com/cdn/shop/files/Golfwang69ea70dbc74da469ea70dbc764c.8747596369ea70dbc764c.jpg?v=1776972068&width=400", name: "Garden Hoodie", category: "トップス", color: "クリーム", brand: "Golf Wang" },
  { id: "c5", image: "https://golfwang.com/cdn/shop/files/Golfwang69ea83e87f42e869ea83e87f513.3098784169ea83e87f513.jpg?v=1776976973&width=400", name: "G-7 Cargo Pant Sand", category: "ボトムス", color: "サンド", brand: "Golf Wang" },
  { id: "c6", image: "https://golfwang.com/cdn/shop/files/Golfwang69ea6f9fa2e1741453132869ea6f9fa2e1e.69ea6f9fa2e1e.jpg?v=1776971892&width=400", name: "Dante Hoodie", category: "トップス", color: "ブラック", brand: "Golf Wang" },
  { id: "c7", image: "https://pdimg.dot-st.com/images/nikoand/goods/itemImg67/679266/item_679266_main_87_1778818217.jpg", name: "ニーロク2セットカーディガン", category: "トップス", color: "ベージュ", brand: "niko and ..." },
  { id: "c8", image: "https://pdimg.dot-st.com/images/studioclip/goods/itemImg64/647056/item_647056_main_02_1778198250.jpg", name: "ギャザーパンツ", category: "ボトムス", color: "ベージュ", brand: "studio CLIP" },
  { id: "c9", image: "https://pdimg.dot-st.com/images/globalwork/goods/itemImg63/636780/item_636780_main_05_1774951929.jpg", name: "リッチクリーンプリントT", category: "トップス", color: "ホワイト", brand: "GLOBAL WORK" },
]

const CATEGORIES = ["すべて", "トップス", "ボトムス", "アウター", "シューズ", "バッグ", "アクセ"]

export default function ClosetScreen() {
  const [clothes, setClothes] = useState<ClothingItem[]>([])
  const [loaded, setLoaded] = useState(false)
  const [activeCategory, setActiveCategory] = useState("すべて")
  const [showAddModal, setShowAddModal] = useState(false)
  const [newName, setNewName] = useState("")
  const [newBrand, setNewBrand] = useState("")
  const [newCategory, setNewCategory] = useState("トップス")
  const [newColor, setNewColor] = useState("")
  const [newImage, setNewImage] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false)
  const [showBarcodeInput, setShowBarcodeInput] = useState(false)
  const [barcodeInputValue, setBarcodeInputValue] = useState("")
  const [cameraPermission, requestCameraPermission] = useCameraPermissions()

  useEffect(() => {
    ;(async () => {
      const version = await AsyncStorage.getItem(VERSION_KEY)
      const data = await AsyncStorage.getItem(STORAGE_KEY)
      if (!data || version !== CLOSET_VERSION) {
        await AsyncStorage.setItem(VERSION_KEY, CLOSET_VERSION)
        setClothes(MOCK_CLOTHES)
      } else {
        setClothes(JSON.parse(data))
      }
      setLoaded(true)
    })()
  }, [])

  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(clothes))
    }
  }, [clothes, loaded])

  const filtered = activeCategory === "すべて"
    ? clothes
    : clothes.filter(c => c.category === activeCategory)

  async function pickImage() {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: "images", quality: 0.8, aspect: [3, 4] })
    if (!res.canceled) setNewImage(res.assets[0].uri)
  }

  async function takePhoto() {
    const res = await ImagePicker.launchCameraAsync({ quality: 0.8, aspect: [3, 4] })
    if (!res.canceled) setNewImage(res.assets[0].uri)
  }

  function handleBarcodeScanned(result: BarcodeScanningResult) {
    setShowBarcodeScanner(false)
    const code = result.data.slice(-8)
    setNewName(`スキャン商品 (${code})`)
    setNewBrand("（バーコードから取得）")
  }

  async function openBarcodeScanner() {
    if (Platform.OS === "web") {
      setShowBarcodeInput(true)
      return
    }
    const { granted } = await requestCameraPermission()
    if (granted) {
      setShowBarcodeScanner(true)
    } else {
      Alert.alert("カメラ権限が必要です", "バーコードスキャンにはカメラへのアクセスが必要です")
    }
  }

  function addItem() {
    if (!newName) return
    setClothes(prev => [...prev, {
      id: Date.now().toString(),
      image: newImage,
      name: newName,
      category: newCategory,
      color: newColor,
      brand: newBrand,
    }])
    setNewName(""); setNewBrand(""); setNewColor(""); setNewImage(null)
    setShowAddModal(false)
  }

  function toggleSelect(id: string) {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function confirmDelete(id: string, name: string) {
    Alert.alert("削除確認", `「${name}」をクローゼットから削除しますか？`, [
      { text: "キャンセル", style: "cancel" },
      {
        text: "削除する",
        style: "destructive",
        onPress: () => {
          setClothes(prev => prev.filter(c => c.id !== id))
          setSelectedIds(prev => prev.filter(x => x !== id))
        },
      },
    ])
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>クローゼット</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setShowAddModal(true)}>
          <Ionicons name="add" size={16} color="#fff" />
          <Text style={styles.addBtnText}>追加</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catRow}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            onPress={() => setActiveCategory(cat)}
            style={[styles.catChip, activeCategory === cat && styles.catChipActive]}
          >
            <Text style={[styles.catText, activeCategory === cat && styles.catTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {clothes.length === 0 && loaded ? (
        <View style={styles.empty}>
          <Ionicons name="shirt-outline" size={56} color={Colors.textLight} />
          <Text style={styles.emptyText}>クローゼットが空です</Text>
          <Text style={styles.emptySub}>「追加」ボタンから服を登録しよう</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          numColumns={2}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={{ gap: 12 }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => {
            const isSelected = selectedIds.includes(item.id)
            return (
              <TouchableOpacity
                onPress={() => toggleSelect(item.id)}
                onLongPress={() => confirmDelete(item.id, item.name)}
                style={[styles.itemCard, isSelected && styles.itemCardSelected]}
                activeOpacity={0.85}
              >
                {item.image
                  ? <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="cover" />
                  : (
                    <View style={[styles.itemImage, styles.itemImageEmpty]}>
                      <Ionicons name="shirt-outline" size={36} color={Colors.textLight} />
                    </View>
                  )
                }
                {isSelected && (
                  <View style={styles.checkOverlay}>
                    <View style={styles.checkCircle}>
                      <Ionicons name="checkmark" size={20} color="#fff" />
                    </View>
                  </View>
                )}
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => confirmDelete(item.id, item.name)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons name="trash-outline" size={14} color={Colors.textMuted} />
                </TouchableOpacity>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.itemMeta}>{item.category}{item.color ? ` · ${item.color}` : ""}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      )}

      {selectedIds.length > 0 && (
        <View style={styles.korekiyoBar}>
          <Text style={styles.korekiyoCount}>{selectedIds.length}枚選択中</Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity
              style={styles.deleteSelectedBtn}
              onPress={() => {
                Alert.alert("一括削除", `選択中の${selectedIds.length}枚を削除しますか？`, [
                  { text: "キャンセル", style: "cancel" },
                  {
                    text: "削除する",
                    style: "destructive",
                    onPress: () => {
                      setClothes(prev => prev.filter(c => !selectedIds.includes(c.id)))
                      setSelectedIds([])
                    },
                  },
                ])
              }}
            >
              <Ionicons name="trash-outline" size={16} color={Colors.primary} />
              <Text style={styles.deleteSelectedText}>削除</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.korekiyoBtn}>
              <Ionicons name="sparkles-outline" size={16} color="#fff" />
              <Text style={styles.korekiyoBtnText}>コレキヨ</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Modal visible={showAddModal} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <ScrollView contentContainerStyle={{ padding: 24 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <Text style={{ fontSize: 20, fontWeight: "800", color: Colors.text }}>服を追加</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Text style={{ fontSize: 16, color: Colors.textMuted }}>キャンセル</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.photoRow}>
              <TouchableOpacity style={styles.photoBtn} onPress={takePhoto}>
                <Ionicons name="camera-outline" size={26} color={Colors.primary} />
                <Text style={styles.photoBtnText}>写真を撮る</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.photoBtn} onPress={pickImage}>
                <Ionicons name="images-outline" size={26} color={Colors.primary} />
                <Text style={styles.photoBtnText}>ライブラリ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.photoBtn} onPress={openBarcodeScanner}>
                <Ionicons name="barcode-outline" size={26} color={Colors.primary} />
                <Text style={styles.photoBtnText}>バーコード</Text>
              </TouchableOpacity>
            </View>
            {newImage && (
              <Image source={{ uri: newImage }} style={{ width: "100%", height: 200, borderRadius: 12, marginBottom: 16 }} resizeMode="cover" />
            )}

            <Text style={styles.fieldLabel}>アイテム名 *</Text>
            <TextInput style={styles.field} value={newName} onChangeText={setNewName} placeholder="例：白Tシャツ" placeholderTextColor={Colors.textLight} />

            <Text style={styles.fieldLabel}>ブランド</Text>
            <TextInput style={styles.field} value={newBrand} onChangeText={setNewBrand} placeholder="例：Uniqlo" placeholderTextColor={Colors.textLight} />

            <Text style={styles.fieldLabel}>カラー</Text>
            <TextInput style={styles.field} value={newColor} onChangeText={setNewColor} placeholder="例：白、黒、ベージュ" placeholderTextColor={Colors.textLight} />

            <Text style={styles.fieldLabel}>カテゴリ</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }}>
              <View style={{ flexDirection: "row", gap: 8 }}>
                {["トップス", "ボトムス", "アウター", "シューズ", "バッグ", "アクセ"].map(cat => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setNewCategory(cat)}
                    style={[styles.catChip, newCategory === cat && styles.catChipActive]}
                  >
                    <Text style={[styles.catText, newCategory === cat && styles.catTextActive]}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <TouchableOpacity
              style={[styles.saveBtn, !newName && { backgroundColor: Colors.textLight }]}
              onPress={addItem}
              disabled={!newName}
            >
              <Text style={styles.saveBtnText}>登録する</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
      {/* バーコードスキャナー (native only) */}
      <Modal visible={showBarcodeScanner} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
          <CameraView
            style={{ flex: 1 }}
            facing="back"
            onBarcodeScanned={handleBarcodeScanned}
            barcodeScannerSettings={{ barcodeTypes: ["ean13", "ean8", "qr", "code128", "code39", "upc_a"] }}
          />
          {/* スキャン枠 */}
          <View style={styles.scanOverlay} pointerEvents="none">
            <View style={styles.scanFrame} />
            <Text style={styles.scanHint}>バーコードをスキャンしてください</Text>
          </View>
          <TouchableOpacity
            style={styles.scanCloseBtn}
            onPress={() => setShowBarcodeScanner(false)}
          >
            <Ionicons name="close" size={22} color="#333" />
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      {/* バーコード手動入力 (web fallback) */}
      <Modal visible={showBarcodeInput} animationType="fade" transparent>
        <View style={styles.barcodeInputOverlay}>
          <View style={styles.barcodeInputCard}>
            <Text style={styles.barcodeInputTitle}>バーコード番号を入力</Text>
            <TextInput
              style={styles.field}
              value={barcodeInputValue}
              onChangeText={setBarcodeInputValue}
              placeholder="例：4901234567890"
              placeholderTextColor={Colors.textLight}
              keyboardType="numeric"
              autoFocus
            />
            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                style={styles.barcodeInputCancel}
                onPress={() => { setBarcodeInputValue(""); setShowBarcodeInput(false) }}
              >
                <Text style={{ color: Colors.textMuted, fontWeight: "600" }}>キャンセル</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveBtn, { flex: 1 }]}
                onPress={() => {
                  if (barcodeInputValue) {
                    setNewName(`スキャン商品 (${barcodeInputValue.slice(-8)})`)
                    setNewBrand("（バーコードから取得）")
                  }
                  setBarcodeInputValue("")
                  setShowBarcodeInput(false)
                }}
              >
                <Text style={styles.saveBtnText}>登録</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  title: { fontSize: 22, fontWeight: "900", color: Colors.text },
  addBtn: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: Colors.primary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  addBtnText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  catRow: { paddingHorizontal: 20, paddingVertical: 8, gap: 8 },
  catChip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1.5, borderColor: Colors.border, backgroundColor: Colors.surface },
  catChipActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  catText: { fontSize: 12, color: Colors.textMuted, fontWeight: "600" },
  catTextActive: { color: Colors.primary },
  empty: { flex: 1, justifyContent: "center", alignItems: "center", gap: 8, paddingBottom: 60 },
  emptyText: { fontSize: 16, fontWeight: "700", color: Colors.textMuted },
  emptySub: { fontSize: 13, color: Colors.textLight },
  grid: { padding: 20, paddingBottom: 100 },
  itemCard: {
    flex: 1, backgroundColor: Colors.surface, borderRadius: 16, overflow: "hidden",
    borderWidth: 2, borderColor: "transparent",
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3,
  },
  itemCardSelected: { borderColor: Colors.primary },
  itemImage: { width: "100%", height: ITEM_W * 1.2 },
  itemImageEmpty: { backgroundColor: Colors.background, justifyContent: "center", alignItems: "center" },
  checkOverlay: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(255,107,107,0.28)", justifyContent: "center", alignItems: "center" },
  checkCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.primary, justifyContent: "center", alignItems: "center" },
  deleteBtn: {
    position: "absolute", top: 6, right: 6,
    backgroundColor: "rgba(255,255,255,0.88)", borderRadius: 14, width: 28, height: 28,
    justifyContent: "center", alignItems: "center",
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2,
  },
  itemInfo: { padding: 10 },
  itemName: { fontSize: 13, fontWeight: "700", color: Colors.text },
  itemMeta: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  korekiyoBar: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    backgroundColor: "#fff", paddingHorizontal: 20, paddingVertical: 12,
    borderTopWidth: 1, borderTopColor: Colors.border,
    shadowColor: "#000", shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.08, shadowRadius: 8,
  },
  korekiyoCount: { fontSize: 14, color: Colors.textMuted, fontWeight: "600" },
  deleteSelectedBtn: { flexDirection: "row", alignItems: "center", gap: 4, borderWidth: 1.5, borderColor: Colors.primary, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20 },
  deleteSelectedText: { color: Colors.primary, fontWeight: "700", fontSize: 13 },
  korekiyoBtn: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: Colors.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 24 },
  korekiyoBtnText: { color: "#fff", fontWeight: "800", fontSize: 14 },
  photoRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  photoBtn: { flex: 1, backgroundColor: Colors.background, borderRadius: 12, padding: 16, alignItems: "center", gap: 6, borderWidth: 1, borderColor: Colors.border },
  photoBtnText: { fontSize: 12, color: Colors.textMuted, fontWeight: "600" },
  fieldLabel: { fontSize: 13, fontWeight: "700", color: Colors.text, marginBottom: 6 },
  field: { backgroundColor: Colors.background, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: Colors.text, marginBottom: 16, borderWidth: 1, borderColor: Colors.border },
  saveBtn: { backgroundColor: Colors.primary, paddingVertical: 16, borderRadius: 28, alignItems: "center" },
  saveBtnText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  // バーコードスキャナー
  scanOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center", alignItems: "center", gap: 20,
  },
  scanFrame: {
    width: 260, height: 160,
    borderWidth: 2, borderColor: Colors.primary, borderRadius: 12,
  },
  scanHint: {
    color: "#fff", fontSize: 14, fontWeight: "600",
    backgroundColor: "rgba(0,0,0,0.55)", paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20,
  },
  scanCloseBtn: {
    position: "absolute", top: 60, left: 20,
    backgroundColor: "rgba(255,255,255,0.92)", borderRadius: 20, padding: 10,
  },
  // バーコード手動入力
  barcodeInputOverlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center", alignItems: "center", padding: 24,
  },
  barcodeInputCard: {
    backgroundColor: "#fff", borderRadius: 20, padding: 24, width: "100%",
  },
  barcodeInputTitle: { fontSize: 16, fontWeight: "800", color: Colors.text, marginBottom: 16 },
  barcodeInputCancel: {
    flex: 1, paddingVertical: 16, borderRadius: 28,
    borderWidth: 1, borderColor: Colors.border, alignItems: "center",
  },
})
