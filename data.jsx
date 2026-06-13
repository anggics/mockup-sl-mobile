/* ============================================================
   DATA — Sinar Lestari Elektronik (dummy)
   ============================================================ */

const RP = (n) => "Rp" + n.toLocaleString("id-ID");

const CATEGORIES = [
  { id: "smartphone", name: "Smartphone", icon: "phone", bg: "#e9f0ff" },
  { id: "laptop",     name: "Laptop & PC", icon: "laptop", bg: "#eafaf3" },
  { id: "audio",      name: "Audio",       icon: "headphone", bg: "#fff3e0" },
  { id: "tv",         name: "TV & Monitor",icon: "tv", bg: "#f0ecff" },
  { id: "kamera",     name: "Kamera",      icon: "camera", bg: "#fdeaf0" },
  { id: "gaming",     name: "Gaming",      icon: "game", bg: "#e7f6ff" },
  { id: "smarthome",  name: "Smart Home",  icon: "home", bg: "#eefbf0" },
  { id: "aksesoris",  name: "Aksesoris",   icon: "plug", bg: "#fef6e7" },
];

const BRANDS = [
  { id: "nexora", name: "Nexora", tag: "Smartphone" },
  { id: "voltra", name: "Voltra", tag: "Laptop" },
  { id: "aurix",  name: "Aurix",  tag: "Audio" },
  { id: "lumio",  name: "Lumio",  tag: "TV & Display" },
  { id: "pulse",  name: "Pulse",  tag: "Gaming" },
  { id: "kairo",  name: "Kairo",  tag: "Kamera" },
  { id: "zenix",  name: "Zenix",  tag: "Smart Home" },
  { id: "optima", name: "Optima", tag: "Aksesoris" },
];

// tint per category for placeholder media
const PH = {
  smartphone: "#e6eefc", laptop: "#e4f6ec", audio: "#fdeccf", tv: "#ece6fb",
  kamera: "#fbe4ee", gaming: "#e0f1fc", smarthome: "#e6f7ea", aksesoris: "#fdf0d6",
};

const PRODUCTS = [
  {
    id: "p1", name: "Nexora Pulse 12 Pro 5G 256GB", brand: "Nexora", cat: "smartphone",
    price: 8499000, was: 10999000, rating: 4.9, reviews: 2148, sold: 5200, stock: 14,
    flash: true, featured: true, badge: "Terlaris", short: "Layar AMOLED 6.7\" 120Hz · Kamera 200MP · Snapdragon 8",
    colors: ["Obsidian", "Titanium", "Aurora Blue"],
    specs: [["Layar","6.7\" AMOLED 120Hz"],["Chipset","Octa-core 3.2GHz"],["RAM/ROM","12GB / 256GB"],["Kamera","200MP + 12MP UW"],["Baterai","5000mAh · 80W"]],
  },
  {
    id: "p2", name: "Voltra ZenBook Air 14 OLED i7", brand: "Voltra", cat: "laptop",
    price: 14250000, was: 16900000, rating: 4.8, reviews: 932, sold: 1450, stock: 9,
    flash: true, featured: true, badge: "Pilihan Editor", short: "Intel Core i7 · 16GB · 512GB SSD · OLED 2.8K",
    colors: ["Space Gray", "Silver"],
    specs: [["Prosesor","Core i7-1360P"],["RAM","16GB LPDDR5"],["Penyimpanan","512GB NVMe SSD"],["Layar","14\" 2.8K OLED"],["Berat","1.2 kg"]],
  },
  {
    id: "p3", name: "Aurix SoundPods Pro 2 ANC", brand: "Aurix", cat: "audio",
    price: 1299000, was: 1899000, rating: 4.7, reviews: 5821, sold: 18900, stock: 40,
    flash: true, featured: true, badge: "Flash", short: "Active Noise Cancelling · 38 jam · Spatial Audio",
    colors: ["White", "Midnight"],
    specs: [["Driver","11mm dynamic"],["ANC","Hybrid −42dB"],["Baterai","8h + 30h case"],["Koneksi","Bluetooth 5.3"],["Rating","IPX5"]],
  },
  {
    id: "p4", name: "Lumio Vivid 55\" 4K Google TV", brand: "Lumio", cat: "tv",
    price: 5790000, was: 7490000, rating: 4.6, reviews: 612, sold: 880, stock: 6,
    flash: false, featured: true, badge: "Hemat", short: "QLED 4K HDR10+ · Google TV · 120Hz",
    colors: ["Black"],
    specs: [["Panel","55\" QLED 4K"],["Refresh","120Hz"],["HDR","Dolby Vision · HDR10+"],["OS","Google TV"],["Audio","2.1 Dolby Atmos"]],
  },
  {
    id: "p5", name: "Kairo X-T50 Mirrorless Kit 16-50mm", brand: "Kairo", cat: "kamera",
    price: 17900000, was: 19500000, rating: 4.9, reviews: 284, sold: 410, stock: 4,
    flash: false, featured: true, badge: "Pro", short: "26MP APS-C · 4K60 · IBIS 5-axis",
    colors: ["Silver", "Black"],
    specs: [["Sensor","26.1MP APS-C"],["Video","4K 60fps"],["Stabilisasi","IBIS 5-axis"],["Viewfinder","2.36M-dot EVF"],["Lensa","16-50mm f/2.8-4.8"]],
  },
  {
    id: "p6", name: "Pulse Vortex Mechanical Keyboard RGB", brand: "Pulse", cat: "gaming",
    price: 749000, was: 1149000, rating: 4.8, reviews: 3401, sold: 12400, stock: 55,
    flash: true, featured: false, badge: "Flash", short: "Hot-swap · Gasket mount · RGB per-key",
    colors: ["Black", "White"],
    specs: [["Switch","Hot-swap red"],["Layout","75% · 84 keys"],["Koneksi","2.4G / BT / USB-C"],["Baterai","4000mAh"],["Body","Gasket mount"]],
  },
  {
    id: "p7", name: "Zenix Aura Smart Bulb (4 pcs)", brand: "Zenix", cat: "smarthome",
    price: 329000, was: 499000, rating: 4.5, reviews: 1980, sold: 9800, stock: 120,
    flash: false, featured: false, badge: "Bundle", short: "16 juta warna · Voice & App · Hemat energi",
    colors: ["Multicolor"],
    specs: [["Warna","16M RGBW"],["Daya","9W = 60W"],["Kontrol","WiFi + Voice"],["Umur","25.000 jam"],["Isi","4 lampu"]],
  },
  {
    id: "p8", name: "Optima 100W GaN Charger 3-Port", brand: "Optima", cat: "aksesoris",
    price: 289000, was: 449000, rating: 4.7, reviews: 4210, sold: 22100, stock: 80,
    flash: true, featured: false, badge: "Flash", short: "GaN · 2x USB-C + USB-A · Fast charge",
    colors: ["White", "Black"],
    specs: [["Output","100W total"],["Port","2C + 1A"],["Teknologi","GaN III"],["Protokol","PD 3.0 / PPS"],["Ukuran","Compact"]],
  },
  {
    id: "p9", name: "Nexora Watch Active 3 AMOLED", brand: "Nexora", cat: "aksesoris",
    price: 1190000, was: 1690000, rating: 4.6, reviews: 1540, sold: 7600, stock: 33,
    flash: false, featured: true, badge: "Baru", short: "AMOLED 1.4\" · SpO2 · GPS · 14 hari",
    colors: ["Graphite", "Rose"],
    specs: [["Layar","1.4\" AMOLED"],["Sensor","HR · SpO2 · GPS"],["Baterai","14 hari"],["Rating","5ATM"],["Mode","120+ olahraga"]],
  },
  {
    id: "p10", name: "Voltra TitanBook Pro 16 RTX", brand: "Voltra", cat: "laptop",
    price: 28900000, was: 32500000, rating: 4.9, reviews: 412, sold: 520, stock: 5,
    flash: false, featured: false, badge: "Powerful", short: "Core i9 · RTX 4070 · 32GB · 1TB",
    colors: ["Carbon"],
    specs: [["Prosesor","Core i9-13900H"],["GPU","RTX 4070 8GB"],["RAM","32GB DDR5"],["SSD","1TB NVMe"],["Layar","16\" 165Hz QHD+"]],
  },
  {
    id: "p11", name: "Aurix Studio Over-Ear Wireless", brand: "Aurix", cat: "audio",
    price: 2190000, was: 2790000, rating: 4.8, reviews: 870, sold: 3300, stock: 21,
    flash: false, featured: false, badge: "Hi-Res", short: "40mm driver · Hi-Res · 60 jam · ANC adaptif",
    colors: ["Sand", "Navy"],
    specs: [["Driver","40mm Hi-Res"],["ANC","Adaptive"],["Baterai","60 jam"],["Koneksi","BT 5.3 · LDAC"],["Berat","255g"]],
  },
  {
    id: "p12", name: "Pulse Strike RGB Gaming Mouse 8K", brand: "Pulse", cat: "gaming",
    price: 459000, was: 699000, rating: 4.7, reviews: 2890, sold: 14200, stock: 47,
    flash: true, featured: false, badge: "Flash", short: "26K DPI · 8000Hz · 54g · Optical switch",
    colors: ["Black", "White"],
    specs: [["Sensor","26.000 DPI"],["Polling","8000Hz"],["Bobot","54g"],["Switch","Optical 90M"],["Koneksi","2.4G / USB-C"]],
  },
  {
    id: "p13", name: "Lumio UltraWide 34\" 165Hz Monitor", brand: "Lumio", cat: "tv",
    price: 6490000, was: 7990000, rating: 4.8, reviews: 540, sold: 760, stock: 11,
    flash: false, featured: false, badge: "Gamer", short: "UWQHD · 165Hz · HDR400 · 1ms",
    colors: ["Black"],
    specs: [["Panel","34\" IPS UWQHD"],["Refresh","165Hz"],["HDR","DisplayHDR 400"],["Respons","1ms GtG"],["Sync","FreeSync Premium"]],
  },
  {
    id: "p14", name: "Nexora Buds Lite True Wireless", brand: "Nexora", cat: "audio",
    price: 399000, was: 599000, rating: 4.5, reviews: 6720, sold: 28400, stock: 90,
    flash: true, featured: false, badge: "Flash", short: "ENC call · 30 jam · Low latency game mode",
    colors: ["White", "Black", "Mint"],
    specs: [["Driver","12mm"],["ENC","Dual-mic"],["Baterai","6h + 24h"],["Latency","60ms game mode"],["Rating","IPX4"]],
  },
  {
    id: "p15", name: "Zenix SecureCam 2K Outdoor", brand: "Zenix", cat: "smarthome",
    price: 549000, was: 799000, rating: 4.6, reviews: 1320, sold: 5100, stock: 38,
    flash: false, featured: false, badge: "Aman", short: "2K · Night vision · AI deteksi · IP66",
    colors: ["White"],
    specs: [["Resolusi","2K 2304p"],["Visi malam","10m IR"],["AI","Deteksi orang"],["Rating","IP66"],["Storage","microSD + Cloud"]],
  },
  {
    id: "p16", name: "Optima PowerBank 20000mAh 65W", brand: "Optima", cat: "aksesoris",
    price: 349000, was: 549000, rating: 4.7, reviews: 5610, sold: 19800, stock: 64,
    flash: false, featured: false, badge: "Travel", short: "65W PD · Display digital · Laptop-ready",
    colors: ["Black", "Silver"],
    specs: [["Kapasitas","20.000mAh"],["Output","65W PD"],["Port","2C + 1A"],["Display","Digital %"],["Isi cepat","30W in"]],
  },
];

// promos
const PROMOS = [
  { id: "pr1", title: "Diskon hingga 40%", sub: "Gadget pilihan minggu ini", tone: "blue", code: "SLE40" },
  { id: "pr2", title: "Cashback 100rb", sub: "Min. belanja 1jt · semua kategori", tone: "amber", code: "CASH100" },
  { id: "pr3", title: "Gratis Ongkir", sub: "Tanpa minimum se-Indonesia", tone: "green", code: "ONGKIR0" },
  { id: "pr4", title: "Bonus 2x Poin", sub: "Member baru bulan ini", tone: "violet", code: "POIN2X" },
];

const BANNERS = [
  { id: "b1", eyebrow: "MEGA ELECTRONIC SALE", title: "Upgrade gadgetmu,\nhemat sampai 40%.", sub: "Smartphone, laptop & audio pilihan dengan harga terbaik + cicilan 0%.", cta: "Belanja Sekarang", tone: "blue", cat: "smartphone" },
  { id: "b2", eyebrow: "NEW ARRIVAL", title: "Nexora Pulse 12 Pro\ntelah hadir.", sub: "Kamera 200MP, layar 120Hz. Pre-order + bonus earbuds.", cta: "Lihat Detail", tone: "dark", cat: "smartphone" },
  { id: "b3", eyebrow: "WORK & PLAY", title: "Laptop kencang\nuntuk kerja & gaming.", sub: "Voltra series RTX, cicilan ringan & garansi resmi 2 tahun.", cta: "Jelajahi Laptop", tone: "amber", cat: "laptop" },
];

// reviews for product detail
const REVIEWS = [
  { id: "r1", name: "Andi Pratama", avatar: "AP", rating: 5, date: "2 hari lalu", verified: true, text: "Barang original, packing aman pakai bubble wrap tebal. Layarnya jernih banget, baterai awet seharian. Recommended seller!", helpful: 42, photos: 2 },
  { id: "r2", name: "Siti Rahmawati", avatar: "SR", rating: 5, date: "5 hari lalu", verified: true, text: "Pengiriman cepat, sampai dalam 2 hari ke Surabaya. Sesuai deskripsi, garansi resmi. Poin yang didapat lumayan banyak.", helpful: 28, photos: 0 },
  { id: "r3", name: "Budi Santoso", avatar: "BS", rating: 4, date: "1 minggu lalu", verified: true, text: "Produk bagus sesuai ekspektasi. Cuma dusnya agak penyok dikit pas datang, tapi isinya aman semua. Overall puas.", helpful: 15, photos: 1 },
  { id: "r4", name: "Maya Kusuma", avatar: "MK", rating: 5, date: "1 minggu lalu", verified: false, text: "Sudah langganan beli di sini. Admin fast respon, dikasih rekomendasi sesuai budget. Mantap!", helpful: 9, photos: 0 },
];

const ORDERS = [
  { id: "INV/2026/0512", date: "12 Mei 2026", status: "Dikirim", statusTone: "blue", items: ["p1"], qty: [1], total: 8499000, resi: "JNE0099188273", eta: "14 Mei 2026" },
  { id: "INV/2026/0428", date: "28 Apr 2026", status: "Selesai", statusTone: "green", items: ["p3","p8"], qty: [1,1], total: 1588000, resi: "SiCepat772819", eta: "30 Apr 2026" },
  { id: "INV/2026/0405", date: "5 Apr 2026", status: "Selesai", statusTone: "green", items: ["p14"], qty: [2], total: 798000, resi: "JNT0091823", eta: "7 Apr 2026" },
];

const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
const discPct = (p) => Math.round((1 - p.price / p.was) * 100);
const catName = (id) => (CATEGORIES.find((c) => c.id === id) || {}).name || id;

Object.assign(window, {
  RP, CATEGORIES, BRANDS, PRODUCTS, PROMOS, BANNERS, REVIEWS, ORDERS, PH,
  getProduct, discPct, catName,
});
