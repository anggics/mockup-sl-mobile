/* ============================================================
   ACCOUNT — Profil · Pesanan · Wishlist · Poin
   ============================================================ */

function ProfileScreen({ params }) {
  const { nav, user, logout, wishlist, pushToast } = useShop();
  const [tab, setTab] = React.useState(params.tab || "dashboard");
  React.useEffect(() => { if (params.tab) setTab(params.tab); }, [params.tab]);

  const menu = [
    { id: "dashboard", label: "Dashboard", icon: "grid" },
    { id: "profil", label: "Profil Saya", icon: "user" },
    { id: "pesanan", label: "Pesanan", icon: "box", badge: ORDERS.length },
    { id: "wishlist", label: "Wishlist", icon: "heart", badge: wishlist.length },
    { id: "poin", label: "Poin & Reward", icon: "coin" },
    { id: "ulasan", label: "Ulasan Saya", icon: "star2" },
  ];

  return (
    <div className="wrap" style={{ paddingTop: 22, paddingBottom: 40 }}>
      <div className="flex gap16" style={{ alignItems: "flex-start" }}>
        {/* sidebar */}
        <aside style={{ width: 256, flex: "none", position: "sticky", top: 130 }} className="col gap12">
          <div className="card" style={{ padding: 18 }}>
            <div className="flex aic gap12">
              <span style={{ width: 52, height: 52, borderRadius: 999, background: "linear-gradient(150deg,var(--blue-500),var(--blue-700))", color: "#fff", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 18 }}>{user.avatar}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
                <div className="flex aic gap4"><span className="badge badge-amber" style={{ height: 18 }}><Icon name="coin" size={11} /> Gold Member</span></div>
              </div>
            </div>
          </div>
          <nav className="card" style={{ padding: 8 }}>
            {menu.map((m) => (
              <button key={m.id} onClick={() => setTab(m.id)} className="flex aic gap12" style={{ width: "100%", padding: "11px 12px", borderRadius: 10, fontSize: 14, fontWeight: 600, color: tab === m.id ? "var(--blue-700)" : "var(--slate)", background: tab === m.id ? "var(--blue-50)" : "transparent", marginBottom: 2 }}>
                <Icon name={m.icon} size={18} /> <span style={{ flex: 1, textAlign: "left" }}>{m.label}</span>
                {m.badge > 0 && <span className="badge badge-blue" style={{ height: 19 }}>{m.badge}</span>}
              </button>
            ))}
            <hr className="hr" style={{ margin: "8px 4px" }} />
            <button onClick={() => { logout(); nav("home"); pushToast("Kamu telah keluar"); }} className="flex aic gap12" style={{ width: "100%", padding: "11px 12px", borderRadius: 10, fontSize: 14, fontWeight: 600, color: "var(--red-600)" }}>
              <Icon name="logout" size={18} /> Keluar
            </button>
          </nav>
        </aside>
        {/* content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {tab === "dashboard" && <DashboardTab user={user} setTab={setTab} />}
          {tab === "profil" && <ProfilTab user={user} pushToast={pushToast} />}
          {tab === "pesanan" && <PesananTab />}
          {tab === "wishlist" && <WishlistTab />}
          {tab === "poin" && <PoinTab user={user} pushToast={pushToast} />}
          {tab === "ulasan" && <UlasanTab />}
        </div>
      </div>
    </div>
  );
}

/* ---- Dashboard ---- */
function DashboardTab({ user, setTab }) {
  const stats = [
    { icon: "box", label: "Pesanan Aktif", value: "1", tone: "var(--blue-600)", bg: "var(--blue-50)" },
    { icon: "coin", label: "Poin Saya", value: user.points.toLocaleString("id-ID"), tone: "var(--amber-600)", bg: "var(--amber-50)" },
    { icon: "heart", label: "Wishlist", value: String(user.wishCount), tone: "var(--red-500)", bg: "var(--red-50)" },
    { icon: "wallet", label: "Voucher", value: "3", tone: "var(--green-600)", bg: "var(--green-50)" },
  ];
  return (
    <div className="col gap16">
      <div className="card" style={{ overflow: "hidden", background: "linear-gradient(120deg,#0e1526,#18306b 70%,#1d4ed8)", color: "#fff", padding: "26px 28px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(500px 240px at 95% 120%, rgba(245,173,28,.28), transparent)" }}></div>
        <div style={{ position: "relative" }}>
          <div className="eyebrow" style={{ color: "var(--amber-300)" }}>GOLD MEMBER</div>
          <h2 className="h2" style={{ color: "#fff", marginTop: 6 }}>Halo, {user.name.split(" ")[0]}! 👋</h2>
          <p style={{ color: "rgba(255,255,255,.8)", fontSize: 14, marginTop: 6 }}>Kamu butuh <b style={{ color: "#fff" }}>2.500 poin</b> lagi menuju Platinum. Belanja terus & kumpulkan poinnya!</p>
          <div style={{ height: 8, borderRadius: 8, background: "rgba(255,255,255,.18)", marginTop: 16, maxWidth: 420, overflow: "hidden" }}><div style={{ width: "62%", height: "100%", background: "linear-gradient(90deg,var(--amber-300),var(--amber-400))", borderRadius: 8 }}></div></div>
        </div>
      </div>
      <div className="grid g-4">
        {stats.map((s) => (
          <div key={s.label} className="card" style={{ padding: 18 }}>
            <span style={{ width: 40, height: 40, borderRadius: 11, background: s.bg, display: "grid", placeItems: "center", color: s.tone }}><Icon name={s.icon} size={20} /></span>
            <div style={{ fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: 26, marginTop: 12 }}>{s.value}</div>
            <div className="muted" style={{ fontSize: 13 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding: 20 }}>
        <div className="flex aic jcb" style={{ marginBottom: 14 }}><h3 className="h3">Pesanan Terakhir</h3><a className="link-more" onClick={() => setTab("pesanan")}>Semua pesanan <Icon name="arrowR" size={15} /></a></div>
        <OrderRow o={ORDERS[0]} />
      </div>
    </div>
  );
}

/* ---- Profil ---- */
function ProfilTab({ user, pushToast }) {
  return (
    <div className="col gap16">
      <div className="card" style={{ padding: 24 }}>
        <h3 className="h3" style={{ marginBottom: 4 }}>Profil Saya</h3>
        <p className="muted" style={{ fontSize: 13.5, marginBottom: 20 }}>Kelola informasi profil untuk keamanan akunmu.</p>
        <div className="flex aic gap16" style={{ marginBottom: 24 }}>
          <span style={{ width: 72, height: 72, borderRadius: 999, background: "linear-gradient(150deg,var(--blue-500),var(--blue-700))", color: "#fff", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 26 }}>{user.avatar}</span>
          <div><button className="btn btn-ghost btn-sm"><Icon name="edit" size={15} /> Ubah Foto</button><p className="muted" style={{ fontSize: 12, marginTop: 8 }}>JPG/PNG, maks. 2MB</p></div>
        </div>
        <div className="grid g-2" style={{ gap: 16 }}>
          <div className="field"><label>Nama Lengkap</label><input className="input" defaultValue={user.name} /></div>
          <div className="field"><label>Jenis Kelamin</label><select className="select"><option>Laki-laki</option><option>Perempuan</option></select></div>
          <div className="field"><label>Tanggal Lahir</label><input className="input" type="date" defaultValue="1995-08-17" /></div>
          <div className="field"><label>Kota</label><input className="input" defaultValue="Jakarta Pusat" /></div>
        </div>
        <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => pushToast("Profil tersimpan")}>Simpan Perubahan</button>
      </div>
      {/* contact + verification */}
      <div className="card" style={{ padding: 24 }}>
        <h3 className="h3" style={{ marginBottom: 16 }}>Kontak & Verifikasi</h3>
        <div className="col gap12">
          <div className="flex aic jcb" style={{ padding: "14px 16px", border: "1px solid var(--line)", borderRadius: 12 }}>
            <div className="flex aic gap12"><span style={{ width: 40, height: 40, borderRadius: 10, background: "var(--blue-50)", display: "grid", placeItems: "center", color: "var(--blue-600)" }}><Icon name="mail" size={19} /></span>
              <div><div style={{ fontWeight: 600, fontSize: 14 }}>{user.email}</div><div className="muted" style={{ fontSize: 12 }}>Email</div></div></div>
            <span className="badge badge-green"><Icon name="check" size={12} /> Terverifikasi</span>
          </div>
          <div className="flex aic jcb" style={{ padding: "14px 16px", border: "1px solid var(--line)", borderRadius: 12 }}>
            <div className="flex aic gap12"><span style={{ width: 40, height: 40, borderRadius: 10, background: "#e9f8ef", display: "grid", placeItems: "center", color: "var(--green-600)" }}><Icon name="whatsapp" size={19} /></span>
              <div><div style={{ fontWeight: 600, fontSize: 14 }}>{user.phone}</div><div className="muted" style={{ fontSize: 12 }}>WhatsApp</div></div></div>
            <span className="badge badge-green"><Icon name="check" size={12} /> Terverifikasi</span>
          </div>
          <div className="flex aic jcb" style={{ padding: "14px 16px", border: "1px solid var(--line)", borderRadius: 12 }}>
            <div className="flex aic gap12"><span style={{ width: 40, height: 40, borderRadius: 10, background: "var(--bg-2)", display: "grid", placeItems: "center", color: "var(--slate)" }}><Icon name="lock" size={19} /></span>
              <div><div style={{ fontWeight: 600, fontSize: 14 }}>Kata Sandi</div><div className="muted" style={{ fontSize: 12 }}>Terakhir diubah 3 bulan lalu</div></div></div>
            <button className="btn btn-ghost btn-sm">Ubah</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Pesanan ---- */
function OrderRow({ o }) {
  const { nav } = useShop();
  const tone = { blue: "badge-blue", green: "badge-green", amber: "badge-amber" }[o.statusTone];
  const first = getProduct(o.items[0]);
  return (
    <div className="card" style={{ padding: 16, border: "1px solid var(--line)" }}>
      <div className="flex aic jcb" style={{ paddingBottom: 12, borderBottom: "1px solid var(--line)", marginBottom: 12 }}>
        <div className="flex aic gap8"><Icon name="box" size={16} style={{ color: "var(--muted)" }} /><span className="tnum" style={{ fontSize: 13, fontWeight: 700 }}>{o.id}</span><span className="muted" style={{ fontSize: 12.5 }}>· {o.date}</span></div>
        <span className={"badge " + tone}>{o.status}</span>
      </div>
      <div className="flex aic gap12">
        <div className="card" style={{ width: 56, height: 56, overflow: "hidden", padding: 0, flex: "none" }}><Ph cat={first.cat} /></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 13.5 }}>{first.name}</div>
          <div className="muted" style={{ fontSize: 12.5 }}>{o.items.length > 1 ? `+${o.items.length - 1} produk lainnya` : `${o.qty[0]} barang`}</div>
        </div>
        <div style={{ textAlign: "right" }}><div className="muted" style={{ fontSize: 11.5 }}>Total</div><div className="price" style={{ fontSize: 15 }}>{RP(o.total)}</div></div>
      </div>
      <div className="flex gap8" style={{ marginTop: 14, justifyContent: "flex-end" }}>
        {o.status === "Dikirim" && <button className="btn btn-ghost btn-sm" onClick={() => nav("track", { id: o.id })}><Icon name="truck" size={15} /> Lacak ({o.resi})</button>}
        {o.status === "Selesai" && <button className="btn btn-ghost btn-sm" onClick={() => nav("review", { id: o.items[0] })}><Icon name="star2" size={15} /> Beri Ulasan</button>}
        <button className="btn btn-soft btn-sm" onClick={() => nav("product", { id: o.items[0] })}>Beli Lagi</button>
      </div>
    </div>
  );
}

function PesananTab() {
  const [f, setF] = React.useState("Semua");
  const filters = ["Semua", "Belum Bayar", "Diproses", "Dikirim", "Selesai"];
  let list = ORDERS;
  if (f === "Dikirim") list = ORDERS.filter((o) => o.status === "Dikirim");
  if (f === "Selesai") list = ORDERS.filter((o) => o.status === "Selesai");
  if (f === "Belum Bayar" || f === "Diproses") list = [];
  return (
    <div className="col gap16">
      <div className="card" style={{ padding: 14 }}>
        <div className="flex gap8" style={{ overflowX: "auto" }}>{filters.map((x) => <button key={x} className={"chip" + (f === x ? " active" : "")} style={{ height: 36 }} onClick={() => setF(x)}>{x}</button>)}</div>
      </div>
      {list.length ? list.map((o) => <OrderRow key={o.id} o={o} />) : (
        <div className="card center" style={{ padding: 50, flexDirection: "column", gap: 10 }}><Icon name="box" size={36} style={{ color: "var(--faint)" }} /><div style={{ fontWeight: 700 }}>Belum ada pesanan di sini</div></div>
      )}
    </div>
  );
}

/* ---- Wishlist ---- */
function WishlistTab() {
  const { nav, wishlist } = useShop();
  const items = wishlist.map(getProduct).filter(Boolean);
  return (
    <div className="card" style={{ padding: 24 }}>
      <div className="flex aic jcb" style={{ marginBottom: 18 }}><h3 className="h3">Wishlist Saya <span className="muted" style={{ fontWeight: 500, fontSize: 14 }}>({items.length})</span></h3></div>
      {items.length ? (
        <div className="grid g-4">{items.map((p) => <ProductCard key={p.id} p={p} onOpen={(id) => nav("product", { id })} />)}</div>
      ) : (
        <div className="center" style={{ padding: 50, flexDirection: "column", gap: 12 }}>
          <span style={{ width: 72, height: 72, borderRadius: 999, background: "var(--red-50)", display: "grid", placeItems: "center", color: "var(--red-400, #f08a8a)" }}><Icon name="heart" size={34} /></span>
          <div style={{ fontWeight: 700 }}>Wishlist masih kosong</div>
          <p className="muted" style={{ fontSize: 13.5 }}>Simpan produk favoritmu dengan menekan ikon hati.</p>
          <button className="btn btn-primary" onClick={() => nav("home")}>Jelajahi Produk</button>
        </div>
      )}
    </div>
  );
}

/* ---- Poin ---- */
function PoinTab({ user, pushToast }) {
  const history = [
    { t: "Pembelian INV/2026/0512", d: "12 Mei 2026", v: "+849", pos: true },
    { t: "Ulasan produk disetujui", d: "8 Mei 2026", v: "+50", pos: true },
    { t: "Tukar Voucher Rp50.000", d: "2 Mei 2026", v: "−500", pos: false },
    { t: "Bonus member baru", d: "28 Apr 2026", v: "+100", pos: true },
    { t: "Pembelian INV/2026/0428", d: "28 Apr 2026", v: "+158", pos: true },
  ];
  const rewards = [
    { name: "Voucher Rp25.000", cost: 250, icon: "tag" },
    { name: "Voucher Rp50.000", cost: 500, icon: "tag" },
    { name: "Gratis Ongkir", cost: 150, icon: "truck" },
    { name: "Voucher Rp100.000", cost: 1000, icon: "gift" },
  ];
  return (
    <div className="col gap16">
      <div className="card" style={{ overflow: "hidden", background: "linear-gradient(120deg,#bb710a,#f5ad1c)", padding: "26px 28px", position: "relative", color: "#3a1500" }}>
        <Icon name="coin" size={120} style={{ position: "absolute", right: -10, top: -16, opacity: .18 }} />
        <div style={{ position: "relative" }}>
          <div className="flex aic gap8" style={{ fontWeight: 700, fontSize: 13 }}><Icon name="coin" size={18} /> TOTAL POIN SAYA</div>
          <div style={{ fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: 46, lineHeight: 1, marginTop: 8 }}>{user.points.toLocaleString("id-ID")}</div>
          <div className="flex aic gap16" style={{ marginTop: 14, fontSize: 13, fontWeight: 600 }}>
            <span className="flex aic gap6"><Icon name="clock" size={15} /> 320 poin kadaluarsa 31 Des 2026</span>
          </div>
        </div>
      </div>
      <div className="card" style={{ padding: 22 }}>
        <h3 className="h3" style={{ marginBottom: 4 }}>Tukar Poin</h3>
        <p className="muted" style={{ fontSize: 13.5, marginBottom: 16 }}>Tukarkan poinmu dengan voucher belanja & benefit.</p>
        <div className="grid g-4">
          {rewards.map((r) => {
            const can = user.points >= r.cost;
            return (
              <div key={r.name} className="card" style={{ padding: 16, textAlign: "center", borderStyle: "dashed", opacity: can ? 1 : .6 }}>
                <span style={{ width: 46, height: 46, borderRadius: 12, background: "var(--amber-50)", display: "grid", placeItems: "center", color: "var(--amber-500)", margin: "0 auto 12px" }}><Icon name={r.icon} size={22} /></span>
                <div style={{ fontWeight: 700, fontSize: 13.5 }}>{r.name}</div>
                <div className="flex aic gap4 center" style={{ margin: "6px 0 12px", color: "var(--amber-600)", fontWeight: 700, fontSize: 13 }}><Icon name="coin" size={14} /> {r.cost} poin</div>
                <button className="btn btn-amber btn-sm btn-block" disabled={!can} onClick={() => pushToast(`${r.name} ditukar!`)}>{can ? "Tukar" : "Poin kurang"}</button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="card" style={{ padding: 22 }}>
        <h3 className="h3" style={{ marginBottom: 14 }}>Riwayat Poin</h3>
        <div className="col">
          {history.map((h, i) => (
            <div key={i} className="flex aic jcb" style={{ padding: "12px 0", borderBottom: i < history.length - 1 ? "1px solid var(--line)" : "none" }}>
              <div className="flex aic gap12">
                <span style={{ width: 36, height: 36, borderRadius: 999, background: h.pos ? "var(--green-50)" : "var(--red-50)", display: "grid", placeItems: "center", color: h.pos ? "var(--green-600)" : "var(--red-600)" }}><Icon name={h.pos ? "plus" : "minus"} size={16} /></span>
                <div><div style={{ fontWeight: 600, fontSize: 13.5 }}>{h.t}</div><div className="muted" style={{ fontSize: 12 }}>{h.d}</div></div>
              </div>
              <span className="tnum" style={{ fontWeight: 700, color: h.pos ? "var(--green-600)" : "var(--red-600)" }}>{h.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- Ulasan Saya ---- */
function UlasanTab() {
  const { nav } = useShop();
  const mine = [{ p: "p3", rating: 5, text: "ANC-nya juara, worth it banget di harga segini. Pengiriman cepat!", date: "5 hari lalu" }, { p: "p14", rating: 4, text: "Earbuds enteng, suara jernih. Case-nya agak licin tapi oke.", date: "2 minggu lalu" }];
  return (
    <div className="col gap16">
      <div className="card" style={{ padding: 20 }}>
        <div className="flex aic gap8" style={{ padding: "10px 14px", background: "var(--amber-50)", borderRadius: 10, fontSize: 13, color: "var(--amber-600)", fontWeight: 600 }}>
          <Icon name="star2" size={18} /> 1 produk menunggu ulasanmu — beri ulasan & dapat <b>+50 poin</b>!
        </div>
      </div>
      {mine.map((m, i) => {
        const p = getProduct(m.p);
        return (
          <div key={i} className="card" style={{ padding: 18 }}>
            <div className="flex aic gap12">
              <div className="card" style={{ width: 52, height: 52, overflow: "hidden", padding: 0, flex: "none" }}><Ph cat={p.cat} /></div>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div><div className="flex aic gap8" style={{ marginTop: 3 }}><Stars value={m.rating} size={13} /><span className="muted" style={{ fontSize: 12 }}>{m.date}</span></div></div>
              <button className="btn btn-ghost btn-sm" onClick={() => nav("product", { id: m.p })}>Lihat</button>
            </div>
            <p style={{ margin: "12px 0 0", fontSize: 13.5, lineHeight: 1.6, color: "var(--slate)" }}>{m.text}</p>
          </div>
        );
      })}
    </div>
  );
}

Object.assign(window, { ProfileScreen, OrderRow });
