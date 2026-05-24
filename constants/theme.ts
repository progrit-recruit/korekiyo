export const Colors = {
  primary: "#FF6B6B",
  primaryLight: "#FFE8E8",
  primaryDark: "#E55A5A",
  accent: "#FFD93D",
  accentLight: "#FFF8DC",
  surface: "#FFFFFF",
  background: "#F9F7F5",
  border: "#F0EDE9",
  text: "#1A1A1A",
  textMuted: "#9A9A9A",
  textLight: "#C5C5C5",
  success: "#4CAF50",
  info: "#2196F3",
  point: "#FF9500",
}

export const MOODS = [
  { level: 1, label: "😴", text: "だるい" },
  { level: 2, label: "😐", text: "ふつう" },
  { level: 3, label: "🙂", text: "まあまあ" },
  { level: 4, label: "😊", text: "いい感じ" },
  { level: 5, label: "🔥", text: "最高！" },
]

export const BODY_TYPES = ["ストレート", "ウェーブ", "ナチュラル"]
export const PERSONAL_COLORS = ["スプリング", "サマー", "オータム", "ウィンター"]
export const FACE_TYPES = ["フレッシュ", "キュート", "フェミニン", "クール", "エレガント", "ハンサム"]

// 女性向けスタイル（写真と名前を一致させた）
export const FEMALE_STYLES = [
  { id: "f1",  image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80", style: "カジュアル" },
  { id: "f2",  image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80", style: "フェミニン" },
  { id: "f3",  image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80", style: "ストリート" },
  { id: "f4",  image: "https://images.unsplash.com/photo-1594938298603-c8148c4b5fa8?w=500&q=80", style: "オフィス" },
  { id: "f5",  image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80", style: "ガーリー" },
  { id: "f6",  image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80", style: "シンプル" },
  { id: "f7",  image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&q=80", style: "モード" },
  { id: "f8",  image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=80", style: "スポーティ" },
  { id: "f9",  image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&q=80", style: "ナチュラル" },
  { id: "f10", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80", style: "クラシック" },
  { id: "f11", image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&q=80", style: "ボーイッシュ" },
  { id: "f12", image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&q=80", style: "モノトーン" },
]

// 男性向けスタイル（写真と名前を一致させた）
export const MALE_STYLES = [
  { id: "m1",  image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=500&q=80", style: "カジュアル" },
  { id: "m2",  image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&q=80", style: "ストリート" },
  { id: "m3",  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80", style: "きれいめ" },
  { id: "m4",  image: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=500&q=80", style: "オフィス" },
  { id: "m5",  image: "https://images.unsplash.com/photo-1530073673872-7d7d5b1c9823?w=500&q=80", style: "スポーティ" },
  { id: "m6",  image: "https://images.unsplash.com/photo-1533749871411-5e21e14bcc7d?w=500&q=80", style: "シンプル" },
  { id: "m7",  image: "https://images.unsplash.com/photo-1548101245-c398bba36bce?w=500&q=80", style: "アウトドア" },
  { id: "m8",  image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&q=80", style: "モード" },
  { id: "m9",  image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=500&q=80", style: "アメカジ" },
  { id: "m10", image: "https://images.unsplash.com/photo-1613584246090-eba59b85a84e?w=500&q=80", style: "クラシック" },
  { id: "m11", image: "https://images.unsplash.com/photo-1524135220673-c731600a1a50?w=500&q=80", style: "サーフ" },
  { id: "m12", image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=500&q=80", style: "モノトーン" },
]

// クローゼットが少ないときのEC・雑誌コーデ（フォールバック用）
export const EC_OUTFITS_FEMALE = [
  {
    id: "ec_f1", source: "PAL CLOSET",
    label: "春の定番コーデ",
    items: ["フラワープリントブラウス", "ワイドデニム", "ミュールサンダル"],
    mood: "フェミニン & 上品",
    temp: "18〜25℃向き",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=700&q=80",
  },
  {
    id: "ec_f2", source: "ZOZOTOWN",
    label: "カジュアルデイリー",
    items: ["オーバーサイズTシャツ", "バギーデニム", "スニーカー"],
    mood: "リラックス & トレンド",
    temp: "15〜23℃向き",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=80",
  },
  {
    id: "ec_f3", source: "GRL",
    label: "オフィスカジュアル",
    items: ["リブニットトップス", "テーパードパンツ", "ポインテッドトゥパンプス"],
    mood: "きれいめ & 好感度高め",
    temp: "20〜27℃向き",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&q=80",
  },
]

export const EC_OUTFITS_MALE = [
  {
    id: "ec_m1", source: "ZOZOTOWN",
    label: "休日カジュアル",
    items: ["グラフィックTシャツ", "カーゴパンツ", "ローカットスニーカー"],
    mood: "リラックス & トレンド感",
    temp: "18〜26℃向き",
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=700&q=80",
  },
  {
    id: "ec_m2", source: "PAL CLOSET",
    label: "きれいめカジュアル",
    items: ["ハーフジップニット", "スラックス", "ローファー"],
    mood: "上品 & こなれ感",
    temp: "15〜22℃向き",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80",
  },
  {
    id: "ec_m3", source: "UNITED ARROWS",
    label: "ストリートスタイル",
    items: ["オーバーサイズパーカー", "バギーデニム", "チャンキースニーカー"],
    mood: "今っぽ & ゆるっと",
    temp: "12〜20℃向き",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=700&q=80",
  },
]

export const MOCK_OUTFITS = [
  {
    id: "o1", label: "今日イチ推し",
    items: ["白Tシャツ", "デニムジーンズ", "白スニーカー"],
    mood: "カジュアル & 動きやすい",
    temp: "20〜25℃向き",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=80",
  },
  {
    id: "o2", label: "スッキリ見え",
    items: ["ブラウスシャツ", "テーパードパンツ", "ローファー"],
    mood: "きれいめ & 上品",
    temp: "15〜22℃向き",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&q=80",
  },
  {
    id: "o3", label: "トレンド感◎",
    items: ["オーバーサイズスウェット", "カーゴパンツ", "チャンキースニーカー"],
    mood: "今っぽ & ゆるふわ",
    temp: "10〜18℃向き",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=80",
  },
]

export const MOCK_RECOMMENDATIONS = [
  { id: "r1", name: "リネンブレンドシャツ", brand: "ZARA", price: 5990, image: "https://images.unsplash.com/photo-1602810319428-019690571b5b?w=300&q=80" },
  { id: "r2", name: "ワイドデニム", brand: "GU", price: 3990, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&q=80" },
  { id: "r3", name: "クロップドニット", brand: "H&M", price: 2990, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&q=80" },
  { id: "r4", name: "マキシフレアスカート", brand: "SHEIN", price: 1999, image: "https://images.unsplash.com/photo-1594938298603-c8148c4b5fa8?w=300&q=80" },
  { id: "r5", name: "バケットハット", brand: "Champion", price: 3500, image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=300&q=80" },
]

export const MOCK_RANKING = [
  { rank: 1, name: "オーバーサイズTシャツ", brand: "Uniqlo", likes: 2341, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80" },
  { rank: 2, name: "バギーデニム", brand: "WEGO", likes: 1987, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&q=80" },
  { rank: 3, name: "プラットフォームサンダル", brand: "ZARA", likes: 1654, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&q=80" },
  { rank: 4, name: "リブニットカーデ", brand: "GU", likes: 1423, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&q=80" },
  { rank: 5, name: "メッシュバレエシューズ", brand: "H&M", likes: 1201, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80" },
]

export const MOCK_TIMELINE = [
  { id: "t1", user: "MKstyle", role: "shop", shop: "Ungrid", likes: 234, image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80", caption: "今日の春コーデ 定番のシアー素材をあわせました" },
  { id: "t2", user: "hana__code", role: "user", likes: 89, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80", caption: "授業帰りのシンプルコーデ。動きやすさ重視です" },
  { id: "t3", user: "yuki.fashion", role: "shop", shop: "Snidel", likes: 412, image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80", caption: "新作ワンピース入荷しました！今週末まで10%OFF" },
  { id: "t4", user: "tomoka__", role: "user", likes: 67, image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80", caption: "モノトーンでまとめた大人っぽい仕上がりに" },
]
