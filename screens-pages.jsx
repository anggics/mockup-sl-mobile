/* ============================================================
   STATIC PAGES — Kebijakan Privasi · S&K · FAQ · Pusat Bantuan · Lacak Resi
   ============================================================ */

/* ---------- shared page hero ---------- */
function PageHero({ eyebrow, title, sub, icon }) {
  return (
    <div className="card" style={{ overflow: "hidden", background: "linear-gradient(120deg,#0e1526,#18306b 70%,#1d4ed8)", color: "#fff", padding: "38px 40px", position: "relative", marginBottom: 24 }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(600px 280px at 92% 130%, rgba(245,173,28,.22), transparent)" }}></div>
      <div style={{ position: "relative" }}>
        {icon && <span style={{ width: 50, height: 50, borderRadius: 13, background: "rgba(255,255,255,.12)", display: "grid", placeItems: "center", marginBottom: 16 }}><Icon name={icon} size={26} /></span>}
        <div className="eyebrow" style={{ color: "var(--amber-300)" }}>{eyebrow}</div>
        <h1 className="h1" style={{ color: "#fff", fontSize: 34, marginTop: 8 }}>{title}</h1>
        {sub && <p style={{ color: "rgba(255,255,255,.82)", fontSize: 15, marginTop: 10, maxWidth: 620, lineHeight: 1.6 }}>{sub}</p>}
      </div>
    </div>
  );
}

function Crumb({ items }) {
  const { nav } = useShop();
  return (
    <div className="flex aic gap8 muted" style={{ fontSize: 13, marginBottom: 14 }}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Icon name="chevR" size={14} />}
          {it.to ? <a onClick={() => nav(it.to)} style={{ cursor: "pointer" }}>{it.label}</a> : <span style={{ color: "var(--ink)", fontWeight: 600 }}>{it.label}</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ---------- Legal doc (Privacy + Terms share this) ---------- */
function LegalDoc({ sections, updated }) {
  const [active, setActive] = React.useState(0);
  return (
    <div className="flex gap24" style={{ alignItems: "flex-start", gap: 28 }}>
      <aside className="card" style={{ width: 240, flex: "none", padding: 16, position: "sticky", top: 130 }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>DAFTAR ISI</div>
        <nav className="col" style={{ gap: 2 }}>
          {sections.map((s, i) => (
            <button key={i} onClick={() => { setActive(i); document.getElementById("sec" + i)?.parentElement?.scrollTo; window.scrollTo({ top: (document.getElementById("sec" + i)?.getBoundingClientRect().top || 0) + window.scrollY - 110, behavior: "smooth" }); }}
              className="flex aic gap8" style={{ textAlign: "left", padding: "9px 11px", borderRadius: 9, fontSize: 13.5, fontWeight: 600, color: active === i ? "var(--blue-700)" : "var(--slate)", background: active === i ? "var(--blue-50)" : "transparent" }}>
              <span className="tnum" style={{ opacity: .6, minWidth: 16 }}>{i + 1}.</span> {s.h}
            </button>
          ))}
        </nav>
        <hr className="hr" style={{ margin: "14px 0" }} />
        <div className="flex aic gap8 muted" style={{ fontSize: 12 }}><Icon name="clock" size={14} /> Diperbarui {updated}</div>
      </aside>
      <div className="card" style={{ flex: 1, padding: "30px 36px", minWidth: 0 }}>
        {sections.map((s, i) => (
          <section key={i} id={"sec" + i} style={{ marginBottom: 30, scrollMarginTop: 110 }}>
            <h2 className="h3" style={{ fontSize: 19, marginBottom: 12, display: "flex", gap: 10 }}><span style={{ color: "var(--blue-500)" }}>{i + 1}.</span> {s.h}</h2>
            {s.p.map((para, j) => typeof para === "string"
              ? <p key={j} style={{ margin: "0 0 12px", fontSize: 14.5, lineHeight: 1.75, color: "var(--slate)" }}>{para}</p>
              : <ul key={j} style={{ margin: "0 0 12px", paddingLeft: 20 }}>{para.map((li, k) => <li key={k} style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--slate)", marginBottom: 6 }}>{li}</li>)}</ul>
            )}
          </section>
        ))}
        <div className="card" style={{ background: "var(--blue-50)", border: "1px solid var(--blue-100)", padding: 18, marginTop: 8 }}>
          <div className="flex aic gap8" style={{ fontWeight: 700, fontSize: 14, color: "var(--blue-800)" }}><Icon name="mail" size={18} /> Ada pertanyaan?</div>
          <p className="muted" style={{ fontSize: 13.5, margin: "6px 0 0" }}>Hubungi kami di <b style={{ color: "var(--blue-700)" }}>halo@sinarlestari.id</b> atau WhatsApp 0812-3456-7890.</p>
        </div>
      </div>
    </div>
  );
}

function PrivacyScreen() {
  return (
    <div className="wrap" style={{ paddingTop: 18, paddingBottom: 40 }}>
      <Crumb items={[{ label: "Beranda", to: "home" }, { label: "Kebijakan Privasi" }]} />
      <PageHero eyebrow="PRIVASI & DATA" title="Kebijakan Privasi" sub="Privasimu penting bagi kami. Halaman ini menjelaskan bagaimana Sinar Lestari Elektronik mengumpulkan, menggunakan, dan melindungi data pribadimu." icon="lock" />
      <LegalDoc updated="1 Juni 2026" sections={[
        { h: "Data yang Kami Kumpulkan", p: ["Kami mengumpulkan data yang kamu berikan saat membuat akun, melakukan transaksi, atau menghubungi layanan pelanggan, antara lain:", ["Identitas: nama, tanggal lahir, jenis kelamin.", "Kontak: email, nomor WhatsApp, alamat pengiriman.", "Transaksi: riwayat pesanan, metode pembayaran, poin reward.", "Teknis: perangkat, alamat IP, dan aktivitas penelusuran untuk meningkatkan layanan."]] },
        { h: "Cara Kami Menggunakan Data", p: ["Data digunakan untuk memproses pesanan, mengirim notifikasi status, memberikan rekomendasi produk yang relevan, mengelola program poin & promo, serta mencegah penipuan.", "Kami tidak akan pernah menjual data pribadimu kepada pihak ketiga untuk tujuan pemasaran tanpa persetujuanmu."] },
        { h: "Berbagi Data dengan Pihak Ketiga", p: ["Kami hanya membagikan data seperlunya kepada mitra terpercaya: kurir pengiriman (untuk antar pesanan), penyedia pembayaran (untuk memproses transaksi), dan otoritas hukum bila diwajibkan undang-undang."] },
        { h: "Keamanan Data", p: ["Seluruh transmisi data dienkripsi dengan TLS. Informasi pembayaran diproses melalui gateway tersertifikasi PCI-DSS dan tidak kami simpan di server kami."] },
        { h: "Hak Kamu", p: ["Kamu berhak mengakses, memperbarui, atau menghapus data pribadimu kapan saja melalui menu Profil, serta menarik persetujuan pemasaran melalui pengaturan notifikasi."] },
        { h: "Cookie", p: ["Kami menggunakan cookie untuk menjaga sesi login, mengingat keranjang belanja, dan menganalisis performa situs. Kamu dapat mengatur preferensi cookie melalui browser."] },
      ]} />
    </div>
  );
}

function TermsScreen() {
  return (
    <div className="wrap" style={{ paddingTop: 18, paddingBottom: 40 }}>
      <Crumb items={[{ label: "Beranda", to: "home" }, { label: "Syarat & Ketentuan" }]} />
      <PageHero eyebrow="KETENTUAN LAYANAN" title="Syarat & Ketentuan" sub="Dengan menggunakan layanan Sinar Lestari Elektronik, kamu menyetujui ketentuan berikut. Mohon dibaca dengan saksama." icon="shield" />
      <LegalDoc updated="1 Juni 2026" sections={[
        { h: "Ketentuan Umum", p: ["Sinar Lestari Elektronik adalah platform ritel elektronik yang menjual produk original bergaransi resmi. Dengan mendaftar, kamu menyatakan berusia minimal 17 tahun atau memiliki izin wali."] },
        { h: "Akun Pengguna", p: ["Kamu bertanggung jawab menjaga kerahasiaan kata sandi dan seluruh aktivitas pada akunmu. Verifikasi email dan nomor WhatsApp wajib dilakukan untuk keamanan transaksi."] },
        { h: "Harga & Pembayaran", p: ["Seluruh harga tercantum dalam Rupiah dan sudah termasuk PPN. Harga flash sale berlaku selama periode dan kuota tertentu. Pesanan dianggap sah setelah pembayaran terkonfirmasi."] },
        { h: "Pengiriman", p: ["Estimasi waktu pengiriman bersifat perkiraan dan dapat dipengaruhi faktor di luar kendali kami. Risiko berpindah ke pembeli saat barang diterima."] },
        { h: "Pengembalian & Garansi", p: ["Produk dapat ditukar dalam 7 hari bila terdapat cacat produksi atau ketidaksesuaian. Garansi resmi mengikuti ketentuan masing-masing brand. Kerusakan akibat kesalahan pemakaian tidak ditanggung."] },
        { h: "Program Poin", p: ["Poin diperoleh dari transaksi & aktivitas tertentu, tidak dapat diuangkan, dan memiliki masa berlaku. Kami berhak menyesuaikan nilai tukar poin dengan pemberitahuan sebelumnya."] },
        { h: "Pembatasan Tanggung Jawab", p: ["Sinar Lestari Elektronik tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari penggunaan produk di luar petunjuk pabrikan."] },
      ]} />
    </div>
  );
}

/* ---------- FAQ / Cara Belanja ---------- */
function FaqScreen() {
  const { nav } = useShop();
  const steps = [
    { icon: "search", t: "Cari Produk", s: "Telusuri kategori atau gunakan pencarian." },
    { icon: "cart", t: "Masukkan Keranjang", s: "Pilih varian & jumlah, lalu checkout." },
    { icon: "wallet", t: "Bayar", s: "Pilih metode: VA, e-wallet, atau cicilan 0%." },
    { icon: "truck", t: "Terima & Nikmati", s: "Lacak pesanan sampai tiba di rumah." },
  ];
  const groups = [
    { cat: "Pemesanan", qs: [
      ["Bagaimana cara memesan produk?", "Pilih produk, tekan 'Keranjang' atau 'Beli Sekarang', lalu ikuti langkah checkout hingga pembayaran. Kamu akan menerima konfirmasi via email & WhatsApp."],
      ["Apakah bisa pesan tanpa akun?", "Untuk keamanan dan pelacakan pesanan, kamu perlu mendaftar akun terlebih dahulu. Prosesnya cepat, hanya butuh email & nomor WhatsApp."],
      ["Bagaimana membatalkan pesanan?", "Pesanan yang belum diproses dapat dibatalkan melalui menu Pesanan. Dana akan dikembalikan penuh ke metode pembayaran semula."],
    ]},
    { cat: "Pembayaran", qs: [
      ["Metode pembayaran apa saja yang tersedia?", "Virtual Account (BCA, Mandiri, BNI), e-wallet (GoPay, OVO, Dana), kartu kredit dengan cicilan 0% hingga 12 bulan, serta COD untuk area tertentu."],
      ["Apakah pembayaran aman?", "Ya. Semua transaksi dienkripsi dan diproses melalui gateway tersertifikasi PCI-DSS. Kami tidak menyimpan data kartumu."],
    ]},
    { cat: "Pengiriman", qs: [
      ["Berapa lama pengiriman?", "Reguler 2–4 hari, Same Day tiba di hari yang sama (area tertentu), Hemat 3–6 hari. Estimasi muncul saat checkout."],
      ["Apakah gratis ongkir?", "Ya! Kami memberikan gratis ongkir se-Indonesia tanpa minimum pembelian untuk pengiriman reguler."],
    ]},
    { cat: "Garansi & Poin", qs: [
      ["Bagaimana klaim garansi?", "Semua produk bergaransi resmi. Hubungi admin via chat dengan menyertakan nomor pesanan untuk panduan klaim."],
      ["Bagaimana cara mendapat poin?", "Poin otomatis didapat setiap transaksi (1 poin per Rp10.000), menulis ulasan (+50), dan bonus member baru (+100). Tukar di menu Poin & Reward."],
    ]},
  ];
  const [open, setOpen] = React.useState("0-0");
  return (
    <div className="wrap" style={{ paddingTop: 18, paddingBottom: 40 }}>
      <Crumb items={[{ label: "Beranda", to: "home" }, { label: "Cara Belanja & FAQ" }]} />
      <PageHero eyebrow="PANDUAN" title="Cara Belanja & FAQ" sub="Belanja di Sinar Lestari Elektronik mudah dalam 4 langkah. Temukan juga jawaban pertanyaan yang sering diajukan." icon="grid" />
      {/* steps */}
      <div className="grid g-4" style={{ marginBottom: 30 }}>
        {steps.map((s, i) => (
          <div key={i} className="card" style={{ padding: 22, position: "relative" }}>
            <span className="tnum" style={{ position: "absolute", top: 14, right: 16, fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: 30, color: "var(--blue-50)" }}>{i + 1}</span>
            <span style={{ width: 46, height: 46, borderRadius: 12, background: "var(--blue-50)", display: "grid", placeItems: "center", color: "var(--blue-600)" }}><Icon name={s.icon} size={23} /></span>
            <div style={{ fontWeight: 700, fontSize: 15.5, marginTop: 14 }}>{s.t}</div>
            <p className="muted" style={{ fontSize: 13, margin: "5px 0 0", lineHeight: 1.5 }}>{s.s}</p>
          </div>
        ))}
      </div>
      {/* faq accordions */}
      <div className="flex gap24" style={{ alignItems: "flex-start", gap: 28 }}>
        <div style={{ flex: 1 }} className="col gap24">
          {groups.map((g, gi) => (
            <div key={gi}>
              <h2 className="h3" style={{ fontSize: 18, marginBottom: 12 }}>{g.cat}</h2>
              <div className="card" style={{ overflow: "hidden" }}>
                {g.qs.map((q, qi) => {
                  const id = gi + "-" + qi; const isOpen = open === id;
                  return (
                    <div key={qi} style={{ borderBottom: qi < g.qs.length - 1 ? "1px solid var(--line)" : "none" }}>
                      <button onClick={() => setOpen(isOpen ? "" : id)} className="flex aic jcb" style={{ width: "100%", padding: "16px 20px", textAlign: "left", gap: 16 }}>
                        <span style={{ fontWeight: 600, fontSize: 14.5, color: isOpen ? "var(--blue-700)" : "var(--ink)" }}>{q[0]}</span>
                        <span style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s", color: "var(--muted)", flex: "none" }}><Icon name="chevD" size={18} /></span>
                      </button>
                      {isOpen && <div className="fade-up" style={{ padding: "0 20px 18px", fontSize: 14, lineHeight: 1.7, color: "var(--slate)" }}>{q[1]}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <aside className="card" style={{ width: 280, flex: "none", padding: 22, position: "sticky", top: 130, textAlign: "center" }}>
          <span style={{ width: 56, height: 56, borderRadius: 14, background: "var(--blue-50)", display: "grid", placeItems: "center", color: "var(--blue-600)", margin: "0 auto 14px" }}><Icon name="headset" size={28} /></span>
          <h3 className="h3">Masih bingung?</h3>
          <p className="muted" style={{ fontSize: 13.5, margin: "8px 0 16px", lineHeight: 1.5 }}>Tim kami siap membantu setiap hari, 08.00–21.00 WIB.</p>
          <button className="btn btn-primary btn-block" onClick={() => nav("help")}>Pusat Bantuan</button>
        </aside>
      </div>
    </div>
  );
}

/* ---------- Pusat Bantuan ---------- */
function HelpScreen() {
  const { nav, openChat, pushToast } = useShop();
  const topics = [
    { icon: "box", t: "Pesanan & Pengiriman", s: "Lacak, ubah, atau batalkan pesanan", to: "faq" },
    { icon: "wallet", t: "Pembayaran & Refund", s: "Metode bayar, cicilan, pengembalian dana", to: "faq" },
    { icon: "refresh", t: "Pengembalian & Garansi", s: "Tukar barang & klaim garansi resmi", to: "faq" },
    { icon: "coin", t: "Poin & Promo", s: "Cara dapat & tukar poin reward", to: "points" },
    { icon: "user", t: "Akun & Keamanan", s: "Login, verifikasi, ubah data", to: "profile" },
    { icon: "lock", t: "Privasi & Kebijakan", s: "Data pribadi & ketentuan layanan", to: "privacy" },
  ];
  const [q, setQ] = React.useState("");
  return (
    <div className="wrap" style={{ paddingTop: 18, paddingBottom: 40 }}>
      <Crumb items={[{ label: "Beranda", to: "home" }, { label: "Pusat Bantuan" }]} />
      <div className="card" style={{ overflow: "hidden", background: "linear-gradient(120deg,#0e1526,#18306b 70%,#1d4ed8)", color: "#fff", padding: "44px 40px", position: "relative", marginBottom: 24, textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(600px 300px at 50% 130%, rgba(245,173,28,.2), transparent)" }}></div>
        <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
          <h1 className="h1" style={{ color: "#fff", fontSize: 32 }}>Halo, ada yang bisa kami bantu?</h1>
          <div className="searchbar" style={{ maxWidth: "100%", height: 54, marginTop: 20, background: "#fff" }}>
            <Icon name="search" size={20} style={{ color: "var(--faint)" }} />
            <input placeholder="Cari topik bantuan… (mis. lacak pesanan, refund)" value={q} onChange={(e) => setQ(e.target.value)} style={{ fontSize: 15 }} />
            <button className="btn btn-primary" onClick={() => nav("faq")}>Cari</button>
          </div>
        </div>
      </div>
      <h2 className="h3" style={{ fontSize: 18, marginBottom: 14 }}>Topik Populer</h2>
      <div className="grid g-3" style={{ marginBottom: 30 }}>
        {topics.map((t, i) => (
          <button key={i} className="card" onClick={() => nav(t.to)} style={{ padding: 22, textAlign: "left", display: "flex", gap: 16, alignItems: "flex-start", transition: "all .18s" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--sh)"; e.currentTarget.style.borderColor = "var(--blue-200)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = "var(--line)"; }}>
            <span style={{ width: 46, height: 46, borderRadius: 12, background: "var(--blue-50)", display: "grid", placeItems: "center", color: "var(--blue-600)", flex: "none" }}><Icon name={t.icon} size={23} /></span>
            <div><div style={{ fontWeight: 700, fontSize: 15 }}>{t.t}</div><p className="muted" style={{ fontSize: 13, margin: "4px 0 0", lineHeight: 1.5 }}>{t.s}</p></div>
          </button>
        ))}
      </div>
      {/* contact channels */}
      <div className="grid g-3">
        {[
          { icon: "whatsapp", t: "WhatsApp", s: "0812-3456-7890", btn: "Chat WA", tone: "#19a463", act: () => pushToast("Membuka WhatsApp…") },
          { icon: "headset", t: "Live Chat", s: "Balas ±2 menit · 08–21 WIB", btn: "Mulai Chat", tone: "var(--blue-600)", act: () => openChat() },
          { icon: "mail", t: "Email", s: "halo@sinarlestari.id", btn: "Kirim Email", tone: "var(--amber-500)", act: () => pushToast("Membuka email…") },
        ].map((c, i) => (
          <div key={i} className="card" style={{ padding: 24, textAlign: "center" }}>
            <span style={{ width: 54, height: 54, borderRadius: 14, background: "var(--bg)", display: "grid", placeItems: "center", color: c.tone, margin: "0 auto 12px" }}><Icon name={c.icon} size={26} /></span>
            <div style={{ fontWeight: 700, fontSize: 15.5 }}>{c.t}</div>
            <p className="muted" style={{ fontSize: 13, margin: "5px 0 14px" }}>{c.s}</p>
            <button className="btn btn-ghost btn-block" onClick={c.act}>{c.btn}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Lacak Resi (tracking timeline) ---------- */
function TrackScreen({ params }) {
  const { nav } = useShop();
  const o = ORDERS.find((x) => x.id === params.id) || ORDERS[0];
  const first = getProduct(o.items[0]);
  const timeline = [
    { t: "Pesanan dibuat", d: o.date + " · 09:14", done: true, icon: "box" },
    { t: "Pembayaran dikonfirmasi", d: o.date + " · 09:21", done: true, icon: "wallet" },
    { t: "Pesanan diproses & dikemas", d: o.date + " · 14:30", done: true, icon: "tag" },
    { t: "Diserahkan ke kurir " + o.resi.replace(/[0-9]/g, ""), d: o.date + " · 18:05", done: true, icon: "truck" },
    { t: "Dalam perjalanan ke alamat tujuan", d: "Sedang berlangsung", done: o.status !== "Dikirim", current: o.status === "Dikirim", icon: "pin" },
    { t: "Pesanan diterima", d: o.status === "Selesai" ? o.eta : "Estimasi " + o.eta, done: o.status === "Selesai", icon: "checkCircle" },
  ];
  return (
    <div className="wrap" style={{ paddingTop: 18, paddingBottom: 40 }}>
      <Crumb items={[{ label: "Beranda", to: "home" }, { label: "Pesanan", to: "profile" }, { label: "Lacak Pengiriman" }]} />
      <div className="flex gap24" style={{ alignItems: "flex-start", gap: 24 }}>
        <div style={{ flex: 1 }} className="col gap16">
          {/* status banner */}
          <div className="card" style={{ overflow: "hidden", background: "linear-gradient(120deg,#18306b,#1d4ed8)", color: "#fff", padding: "24px 26px" }}>
            <div className="flex aic jcb" style={{ flexWrap: "wrap", gap: 12 }}>
              <div>
                <div className="eyebrow" style={{ color: "var(--amber-300)" }}>{o.status.toUpperCase()}</div>
                <h2 className="h2" style={{ color: "#fff", marginTop: 6 }}>{o.status === "Selesai" ? "Pesanan telah tiba 🎉" : "Pesananmu sedang dalam perjalanan"}</h2>
                <p style={{ color: "rgba(255,255,255,.82)", fontSize: 13.5, marginTop: 6 }}>Estimasi tiba <b style={{ color: "#fff" }}>{o.eta}</b></p>
              </div>
              <div style={{ textAlign: "right" }}><div style={{ fontSize: 12, color: "rgba(255,255,255,.7)" }}>No. Resi</div><div className="tnum" style={{ fontWeight: 700, fontSize: 16 }}>{o.resi}</div></div>
            </div>
          </div>
          {/* timeline */}
          <div className="card" style={{ padding: "26px 28px" }}>
            <h3 className="h3" style={{ marginBottom: 20 }}>Riwayat Perjalanan</h3>
            <div style={{ position: "relative" }}>
              {timeline.map((s, i) => {
                const active = s.done || s.current;
                return (
                  <div key={i} className="flex gap16" style={{ position: "relative", paddingBottom: i < timeline.length - 1 ? 26 : 0 }}>
                    {i < timeline.length - 1 && <div style={{ position: "absolute", left: 19, top: 40, bottom: 0, width: 2, background: s.done ? "var(--green-500)" : "var(--line)" }} />}
                    <span style={{ width: 40, height: 40, borderRadius: 999, flex: "none", display: "grid", placeItems: "center", zIndex: 1, background: s.current ? "var(--blue-600)" : s.done ? "var(--green-500)" : "var(--bg-2)", color: active ? "#fff" : "var(--faint)", boxShadow: s.current ? "0 0 0 5px rgba(29,99,234,.18)" : "none" }}>
                      <Icon name={s.icon} size={20} />
                    </span>
                    <div style={{ paddingTop: 4, flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: active ? 700 : 600, fontSize: 14.5, color: active ? "var(--ink)" : "var(--muted)", lineHeight: 1.4, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>{s.t} {s.current && <span className="badge badge-blue">Terkini</span>}</div>
                      <div className="muted" style={{ fontSize: 12.5, marginTop: 3 }}>{s.d}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* side: order summary */}
        <aside className="card" style={{ width: 320, flex: "none", padding: 20, position: "sticky", top: 130 }}>
          <div className="flex aic jcb" style={{ marginBottom: 14 }}><span className="tnum" style={{ fontWeight: 700, fontSize: 13.5 }}>{o.id}</span><span className="badge badge-blue">{o.status}</span></div>
          <div className="flex aic gap12" style={{ paddingBottom: 14, borderBottom: "1px solid var(--line)", marginBottom: 14 }}>
            <div className="card" style={{ width: 56, height: 56, overflow: "hidden", padding: 0, flex: "none" }}><Ph cat={first.cat} /></div>
            <div><div style={{ fontWeight: 600, fontSize: 13.5 }}>{first.name}</div>{o.items.length > 1 && <div className="muted" style={{ fontSize: 12 }}>+{o.items.length - 1} produk lainnya</div>}</div>
          </div>
          <div className="col gap10" style={{ fontSize: 13.5 }}>
            <div className="flex jcb"><span className="muted">Total</span><b className="price">{RP(o.total)}</b></div>
            <div className="flex jcb"><span className="muted">Kurir</span><b>{o.resi.replace(/[0-9]/g, "")}</b></div>
            <div className="flex jcb"><span className="muted">Alamat</span><span style={{ textAlign: "right", maxWidth: 180 }}>Jl. Teknologi Raya 88, Jakarta Pusat</span></div>
          </div>
          <div className="flex gap8" style={{ marginTop: 18 }}>
            <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => nav("help")}>Bantuan</button>
            <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => nav("product", { id: o.items[0] })}>Beli Lagi</button>
          </div>
        </aside>
      </div>
    </div>
  );
}

Object.assign(window, { PrivacyScreen, TermsScreen, FaqScreen, HelpScreen, TrackScreen, PageHero, Crumb });
