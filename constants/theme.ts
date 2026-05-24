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
  { id: "f1",  image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=500&q=80", style: "カジュアル" },
  { id: "f2",  image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80", style: "フェミニン" },
  { id: "f3",  image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80", style: "ストリート" },
  { id: "f4",  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80", style: "オフィス" },
  { id: "f5",  image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=500&q=80", style: "ガーリー" },
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
    label: "レイヤードホワイトコーデ",
    items: ["シアーレイヤードキャミ", "ホワイトワイドスカート", "サンダル"],
    mood: "フェミニン & こなれ感",
    temp: "18〜26℃向き",
    image: "https://images.wear2.jp/coordinate/bBildLXx/CLqAER22/1778393048_276.jpg",
  },
  {
    id: "ec_f2", source: "ZOZOTOWN",
    label: "キャミ×ティアードスカート",
    items: ["キャミソール", "ティアードマキシスカート", "サンダル"],
    mood: "ガーリー & ナチュラル",
    temp: "20〜28℃向き",
    image: "https://images.wear2.jp/coordinate/qri8rkoo/ZvvXU4Y6/1777129826_276.jpg",
  },
  {
    id: "ec_f3", source: "GRL",
    label: "ピンクレース×ワイドデニム",
    items: ["ピンクレースブラウス", "ブラックワイドデニム", "ホワイトバッグ"],
    mood: "きれいめ & フェミニン",
    temp: "18〜25℃向き",
    image: "https://images.wear2.jp/coordinate/AAix6kB7/E4mzX3XO/1778061782_276.jpg",
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
    id: "o1", label: "キャミ×ワイドデニム",
    items: ["ブラックキャミソール", "ワイドデニム", "サンダル"],
    mood: "カジュアル & トレンド感",
    temp: "20〜28℃向き",
    image: "https://images.wear2.jp/coordinate/qri8rkoo/ZWmJ1ii5/1775918117_276.jpg",
  },
  {
    id: "o2", label: "白シャツ×黒ワイドパンツ",
    items: ["ホワイトオープンカラーシャツ", "ブラックワイドパンツ", "サンダル"],
    mood: "きれいめ & こなれ感",
    temp: "18〜26℃向き",
    image: "https://images.wear2.jp/coordinate/ekiqgwAP/ouMM4ndO/1778068239_276.jpg",
  },
  {
    id: "o3", label: "グラフィックT×ワイドデニム",
    items: ["グラフィックTシャツ", "ライトブルーワイドデニム", "スニーカー"],
    mood: "ストリート & カジュアル",
    temp: "18〜26℃向き",
    image: "https://images.wear2.jp/coordinate/EJiPpMv2/JPDTvIE1/1777379018_276.jpg",
  },
]

export const MOCK_RECOMMENDATIONS = [
  { id: "r1", name: "Garden Hoodie", brand: "Golf Wang", price: 16200, image: "https://golfwang.com/cdn/shop/files/Golfwang69ea70dbc74da469ea70dbc764c.8747596369ea70dbc764c.jpg?v=1776972068&width=400" },
  { id: "r2", name: "G-7 Cargo Pant", brand: "Golf Wang", price: 16200, image: "https://golfwang.com/cdn/shop/files/Golfwang69ea83e89d0c4269ea83e89d18b.7880038569ea83e89d18b.jpg?v=1776976973&width=400" },
  { id: "r3", name: "Tucker Button Down", brand: "Golf Wang", price: 14800, image: "https://golfwang.com/cdn/shop/files/Golfwang69ea8374486d9669ea837448b1b.1252492569ea837448b1b.jpg?v=1776976822&width=400" },
  { id: "r4", name: "Dante Hoodie", brand: "Golf Wang", price: 16200, image: "https://golfwang.com/cdn/shop/files/Golfwang69ea6f9fa2e1741453132869ea6f9fa2e1e.69ea6f9fa2e1e.jpg?v=1776971892&width=400" },
  { id: "r5", name: "Norkin Quarter Zip", brand: "Golf Wang", price: 14800, image: "https://golfwang.com/cdn/shop/files/Golfwang694318a0275802694318a02776d.56078988694318a02776d.jpg?v=1770841297&width=400" },
]

export const MOCK_RANKING = [
  { rank: 1, name: "Airborne Jacket", brand: "Golf Wang", likes: 2341, image: "https://golfwang.com/cdn/shop/files/Golfwang69eaaac10ef20269eaaac10f14d.0371665869eaaac10f14d.jpg?v=1776986832&width=400" },
  { rank: 2, name: "Rockwell Varsity Jacket", brand: "Golf Wang", likes: 1987, image: "https://golfwang.com/cdn/shop/files/Golfwang69448ce312234569448ce312489.7050480169448ce312489.jpg?v=1770841277&width=400" },
  { rank: 3, name: "Crush Denim Jacket", brand: "Golf Wang", likes: 1654, image: "https://golfwang.com/cdn/shop/files/Golfwang698b93b5883909698b93b58860d.80882214698b93b58860d_5f5f025e-5530-439b-af7b-bb0840b868c4.jpg?v=1774986972&width=400" },
  { rank: 4, name: "Dante Quilted Bomber", brand: "Golf Wang", likes: 1423, image: "https://golfwang.com/cdn/shop/files/Golfwang69ea84393d9ed469ea84393dacb.3683027669ea84393dacb.jpg?v=1776977051&width=400" },
  { rank: 5, name: "Freshman Sweatpant", brand: "Golf Wang", likes: 1201, image: "https://golfwang.com/cdn/shop/files/Golfwang69ea83b861ef9469ea83b861ffe.1264078069ea83b861ffe.jpg?v=1776976927&width=400" },
]

export const MOCK_TIMELINE = [
  { id: "t1", user: "MKstyle", role: "shop", shop: "Ungrid", likes: 234, image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80", caption: "今日の春コーデ 定番のシアー素材をあわせました" },
  { id: "t2", user: "hana__code", role: "user", likes: 89, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80", caption: "授業帰りのシンプルコーデ。動きやすさ重視です" },
  { id: "t3", user: "yuki.fashion", role: "shop", shop: "Snidel", likes: 412, image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80", caption: "新作ワンピース入荷しました！今週末まで10%OFF" },
  { id: "t4", user: "tomoka__", role: "user", likes: 67, image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80", caption: "モノトーンでまとめた大人っぽい仕上がりに" },
]
