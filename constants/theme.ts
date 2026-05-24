export const Colors = {
  primary: "#FF7A00",
  primaryLight: "#FFF3E0",
  primaryDark: "#E56900",
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

// 女性向けスタイル（PAL CLOSET スタッフコーディネート）
export const FEMALE_STYLES = [
  { id: "f1",  image: "https://static.staff-start.com/img/coordinates/17/7928cdc9a5040872be11e87e9bef1d67-109383/2c6418ca28977c929b851b15fb2d0c36.jpg", style: "プチプラコーデ" },
  { id: "f2",  image: "https://static.staff-start.com/img/coordinates/17/532b7cbe070a3579f424988a040752f2-3113/3188d26a94ab590065d3b22cf087fc24.jpg", style: "大人カジュアル" },
  { id: "f3",  image: "https://static.staff-start.com/img/coordinates/17/7928cdc9a5040872be11e87e9bef1d67-109383/d0e6daae67662cedf31cea87122ae0da.jpg", style: "デニムコーデ" },
  { id: "f4",  image: "https://static.staff-start.com/img/coordinates/17/532b7cbe070a3579f424988a040752f2-3113/37b982ceaf27649b98b538d83c61e11a.jpg", style: "シンプル" },
  { id: "f5",  image: "https://static.staff-start.com/img/coordinates/17/532b7cbe070a3579f424988a040752f2-3113/0a88ff1b93fa8875a240d63c9005856a.jpg", style: "ナチュラル" },
  { id: "f6",  image: "https://static.staff-start.com/img/coordinates/17/d8030afe156a4de429b42187a7bb28eb-19570/dbe635ccc0374dfd0150798d1c75b58c.jpg", style: "楽チンコーデ" },
  { id: "f7",  image: "https://static.staff-start.com/img/coordinates/17/b6162fbb8de39d5dcb950ac9d5fe80e8-125508/2742f01dd05d9554c52ac3ab52e44b9c.jpg", style: "チェック柄" },
  { id: "f8",  image: "https://static.staff-start.com/img/coordinates/17/0d620a440d7259218ff725f59419a5a1-28526/a89ba1e2a9b13ea6796644e625686aed.jpg", style: "大人可愛い" },
  { id: "f9",  image: "https://static.staff-start.com/img/coordinates/17/d917e680c14c6fcd74d08c935436f1b5-28224/33bb612dd70febe2b06ecbfc033aac90.jpg", style: "フェミニン" },
  { id: "f10", image: "https://static.staff-start.com/img/coordinates/17/d2e353dae1f2806edac299d7874eceb5-125885/4fe52ce06a1a4c8d18f3fd5c759e0ada.jpg", style: "きれいめ" },
  { id: "f11", image: "https://static.staff-start.com/img/coordinates/17/251e5f3c1e932d79e573003009045aeb-77776/48c901c0e8066833260e6b56369d099f.jpg", style: "カジュアル" },
  { id: "f12", image: "https://static.staff-start.com/img/coordinates/17/a2b4d42241e1d46c2fac79ae26f12c62-136847/bd948280bf2593c8b97431e95519b0d7.jpg", style: "Tシャツコーデ" },
  { id: "f13", image: "https://static.staff-start.com/img/coordinates/17/aabfe8f92a572241f945dc7126faf8fc-109314/fea4876ea1161d08728f98eb47231003.jpg", style: "低身長コーデ" },
  { id: "f14", image: "https://static.staff-start.com/img/coordinates/17/6fc18add59ae328cbdb7f602b1a535e5-109615/6054f0ac8f68c627ab0c006d6bfc7380.jpg", style: "モノトーン" },
  { id: "f15", image: "https://static.staff-start.com/img/coordinates/17/7c9c47db388f0f6780f93d7d02a9f9de-92764/26f11301fe1771cbd4bea73591c8ad2f.jpg", style: "トレンドコーデ" },
  { id: "f16", image: "https://static.staff-start.com/img/coordinates/17/532b7cbe070a3579f424988a040752f2-3113/3e39b7681a2a702dc786c95346309ef6.jpg", style: "ビスチェコーデ" },
  { id: "f17", image: "https://static.staff-start.com/img/coordinates/17/a95bd4b5e984e570ba0289fa72ca94fc-113117/eee83f08e017f54426f2d5314c5e8235.jpg", style: "高身長コーデ" },
  { id: "f18", image: "https://static.staff-start.com/img/coordinates/17/532b7cbe070a3579f424988a040752f2-3113/079fbad621129d856b5784c5261aec7a.jpg", style: "大人シンプル" },
  { id: "f19", image: "https://static.staff-start.com/img/coordinates/17/532b7cbe070a3579f424988a040752f2-3113/8d0c62ebfc4eb92590b7073ac78f4217.jpg", style: "ホワイトコーデ" },
  { id: "f20", image: "https://static.staff-start.com/img/coordinates/17/872363c8e5a96dd9451cb2693cf83569-136743/ef7a017f864f8063c8b5d50f9b1a5d84.jpg", style: "骨格ウェーブ" },
  { id: "f21", image: "https://static.staff-start.com/img/coordinates/17/872363c8e5a96dd9451cb2693cf83569-136743/df0a3f8ad55b158d5d77c5250ebc0884.jpg", style: "ゆるコーデ" },
  { id: "f22", image: "https://static.staff-start.com/img/coordinates/17/0befcb6854bc6a1e3d3ab31b6aaec951-18205/65529ae677e64de7bd29c3177a54144a.jpg", style: "ストリート" },
  { id: "f23", image: "https://static.staff-start.com/img/coordinates/17/872363c8e5a96dd9451cb2693cf83569-136743/07e2c890ef9d30132e2f0dfd17d1ba4f.jpg", style: "スポーティ" },
  { id: "f24", image: "https://static.staff-start.com/img/coordinates/17/872363c8e5a96dd9451cb2693cf83569-136743/5d2aba994e565c723d662f10f7f6ae8b.jpg", style: "デニム×低身長" },
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
  { id: "r6", name: "ニーロク2セットカーディガン", brand: "niko and ...", price: 8000, image: "https://pdimg.dot-st.com/images/nikoand/goods/itemImg67/679266/item_679266_main_87_1778818217.jpg" },
  { id: "r7", name: "ギャザーパンツ", brand: "studio CLIP", price: 5790, image: "https://pdimg.dot-st.com/images/studioclip/goods/itemImg64/647056/item_647056_main_02_1778198250.jpg" },
  { id: "r8", name: "リッチクリーンプリントT", brand: "GLOBAL WORK", price: 3490, image: "https://pdimg.dot-st.com/images/globalwork/goods/itemImg63/636780/item_636780_main_05_1774951929.jpg" },
  { id: "r9", name: "DRYクシュイージーパンツ", brand: "niko and ...", price: 5000, image: "https://pdimg.dot-st.com/images/nikoand/goods/itemImg64/647787/item_647787_main_17_1773713392.jpg" },
  { id: "r10", name: "てぃらヘンリーボーダーTEE", brand: "niko and ...", price: 4500, image: "https://pdimg.dot-st.com/images/nikoand/goods/itemImg66/667114/item_667114_main_60_1776311192.jpg" },
  { id: "r11", name: "シアーレースレイヤードT", brand: "LEPSIM", price: 4990, image: "https://pdimg.dot-st.com/images/lepsim/goods/itemImg88/887658/item_887658_main_09_1778830400.jpg" },
  { id: "r12", name: "Dante Quilted Bomber", brand: "Golf Wang", price: 18400, image: "https://golfwang.com/cdn/shop/files/Golfwang69ea84393d9ed469ea84393dacb.3683027669ea84393dacb.jpg?v=1776977051&width=400" },
  { id: "r13", name: "Freshman Sweatpant", brand: "Golf Wang", price: 14800, image: "https://golfwang.com/cdn/shop/files/Golfwang69ea83b861ef9469ea83b861ffe.1264078069ea83b861ffe.jpg?v=1776976927&width=400" },
]

export const MOCK_RANKING = [
  { rank: 1, name: "Airborne Jacket", brand: "Golf Wang", likes: 2341, image: "https://golfwang.com/cdn/shop/files/Golfwang69eaaac10ef20269eaaac10f14d.0371665869eaaac10f14d.jpg?v=1776986832&width=400" },
  { rank: 2, name: "Rockwell Varsity Jacket", brand: "Golf Wang", likes: 1987, image: "https://golfwang.com/cdn/shop/files/Golfwang69448ce312234569448ce312489.7050480169448ce312489.jpg?v=1770841277&width=400" },
  { rank: 3, name: "Crush Denim Jacket", brand: "Golf Wang", likes: 1654, image: "https://golfwang.com/cdn/shop/files/Golfwang698b93b5883909698b93b58860d.80882214698b93b58860d_5f5f025e-5530-439b-af7b-bb0840b868c4.jpg?v=1774986972&width=400" },
  { rank: 4, name: "Dante Quilted Bomber", brand: "Golf Wang", likes: 1423, image: "https://golfwang.com/cdn/shop/files/Golfwang69ea84393d9ed469ea84393dacb.3683027669ea84393dacb.jpg?v=1776977051&width=400" },
  { rank: 5, name: "Freshman Sweatpant", brand: "Golf Wang", likes: 1201, image: "https://golfwang.com/cdn/shop/files/Golfwang69ea83b861ef9469ea83b861ffe.1264078069ea83b861ffe.jpg?v=1776976927&width=400" },
  { rank: 6, name: "ニーロク2セットカーディガン", brand: "niko and ...", likes: 1102, image: "https://pdimg.dot-st.com/images/nikoand/goods/itemImg67/679266/item_679266_main_87_1778818217.jpg" },
  { rank: 7, name: "ギャザーパンツ", brand: "studio CLIP", likes: 987, image: "https://pdimg.dot-st.com/images/studioclip/goods/itemImg64/647056/item_647056_main_02_1778198250.jpg" },
  { rank: 8, name: "リッチクリーンプリントT", brand: "GLOBAL WORK", likes: 834, image: "https://pdimg.dot-st.com/images/globalwork/goods/itemImg63/636780/item_636780_main_05_1774951929.jpg" },
]

export const MOCK_TIMELINE = [
  { id: "t1", user: "yuki.fashion", role: "user", likes: 521,
    image: "https://images.wear2.jp/coordinate/bBildLXx/CLqAER22/1778393048_276.jpg",
    caption: "白レイヤードコーデ🤍 シアーキャミ×ワイドスカートが今年らしい" },
  { id: "t2", user: "PAL CLOSET", role: "shop", shop: "PAL CLOSET", likes: 438,
    image: "https://images.wear2.jp/coordinate/qri8rkoo/ZvvXU4Y6/1777129826_276.jpg",
    caption: "今週の人気コーデ！キャミ×ティアードスカートでガーリーに" },
  { id: "t3", user: "hana__code", role: "user", likes: 312,
    image: "https://images.wear2.jp/coordinate/qri8rkoo/ZWmJ1ii5/1775918117_276.jpg",
    caption: "黒キャミ×ワイドデニムのシンプルコーデ♡ バランスよく着こなすのがポイント" },
  { id: "t4", user: "mio.style", role: "user", likes: 287,
    image: "https://images.wear2.jp/coordinate/AAix6kB7/E4mzX3XO/1778061782_276.jpg",
    caption: "ピンクレース×ブラックデニムのきれいめカジュアル💕" },
  { id: "t5", user: "saki_coordinate", role: "user", likes: 203,
    image: "https://images.wear2.jp/coordinate/ekiqgwAP/ouMM4ndO/1778068239_276.jpg",
    caption: "白シャツ×黒ワイドパンツのモノトーンコーデ✨ シンプルが一番好き" },
  { id: "t6", user: "PAL CLOSET", role: "shop", shop: "PAL CLOSET", likes: 467,
    image: "https://images.wear2.jp/coordinate/EJiPpMv2/JPDTvIE1/1777379018_276.jpg",
    caption: "グラフィックT×ワイドデニムのストリートカジュアル！今季人気No.1コーデ" },
  { id: "t7", user: "remi.fashion", role: "user", likes: 178,
    image: "https://contents.palcloset.jp/static/images/contents/all_260522_001.jpg",
    caption: "大人の夏コーデ🌸 PAL CLOSETのワンピースが最高すぎる" },
  { id: "t8", user: "nana_style", role: "user", likes: 145,
    image: "https://contents.palcloset.jp/static/images/contents/all_260520_001.jpg",
    caption: "ワンピースコーデで週末おでかけ♡ 着回し力がすごい" },
]
