/* ============================================================
   MOBILE SCREENS — Sinar Lestari Elektronik (iOS & Android)
   Self-contained mobile app; reuses data.jsx + product-visual + Icon
   ============================================================ */

/* ---------- drag-to-scroll for mobile rails ---------- */
function useMDragScroll(ref) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const s = { down: false, moved: false, startX: 0, startScroll: 0 };
    const onDown = (e) => { s.down = true; s.moved = false; s.startX = e.pageX; s.startScroll = el.scrollLeft; el.style.cursor = "grabbing"; el.style.userSelect = "none"; };
    const onEnd = () => { s.down = false; el.style.cursor = "grab"; el.style.userSelect = ""; };
    const onMove = (e) => { if (!s.down) return; const dx = e.pageX - s.startX; if (Math.abs(dx) > 4) { s.moved = true; e.preventDefault(); el.scrollLeft = s.startScroll - dx * 1.4; } };
    const onClick = (e) => { if (s.moved) { e.stopPropagation(); e.preventDefault(); s.moved = false; } };
    el.style.cursor = "grab";
    el.addEventListener("mousedown", onDown); el.addEventListener("mouseup", onEnd); el.addEventListener("mouseleave", onEnd);
    el.addEventListener("mousemove", onMove); el.addEventListener("click", onClick, true);
    return () => { el.removeEventListener("mousedown", onDown); el.removeEventListener("mouseup", onEnd); el.removeEventListener("mouseleave", onEnd); el.removeEventListener("mousemove", onMove); el.removeEventListener("click", onClick, true); };
  }, []);
}

const MShopCtx = React.createContext(null);
const useM = () => React.useContext(MShopCtx);

function MPh({ cat, style }) {
  return <div style={{ position: "relative", overflow: "hidden", ...style }}><ProductVisual cat={cat} /></div>;
}

/* ---------- top app bar ---------- */
function MTopBar({ platform, title, back, action, onBack, transparent }) {
  const { nav, cartCount } = useM();
  const pt = platform === "ios" ? 50 : 12;
  return (
    <div style={{ paddingTop: pt, paddingLeft: 16, paddingRight: 16, paddingBottom: 12, background: transparent ? "transparent" : "rgba(255,255,255,.92)", backdropFilter: "blur(12px)", borderBottom: transparent ? "none" : "1px solid var(--line)", position: "relative", zIndex: 5, flex: "none" }}>
      <div className="flex aic gap12" style={{ minHeight: 36 }}>
        {back ? (
          <button onClick={onBack} className="center" style={{ width: 38, height: 38, borderRadius: 999, background: transparent ? "rgba(255,255,255,.9)" : "var(--bg)", flex: "none", boxShadow: transparent ? "var(--sh-sm)" : "none" }}><Icon name="chevL" size={20} /></button>
        ) : (
          <div className="logo" style={{ gap: 8 }}><div className="logo-mark" style={{ width: 34, height: 34 }}><span style={{ fontSize: 15 }}>S</span></div>
            <div className="logo-text"><b style={{ fontSize: 14 }}>Sinar Lestari</b><small style={{ fontSize: 8 }}>Elektronik</small></div></div>
        )}
        {title && <div style={{ flex: 1, fontWeight: 700, fontSize: 17, fontFamily: "var(--ff-display)" }}>{title}</div>}
        {!title && <div style={{ flex: 1 }} />}
        {action}
      </div>
    </div>
  );
}

/* ---------- bottom tab bar ---------- */
function MTabBar({ platform }) {
  const { tab, setTab, cartCount, wishCount } = useM();
  const sb = platform === "ios" ? 24 : 6;
  const tabs = [
    { id: "home", label: "Beranda", icon: "home" },
    { id: "wishlist", label: "Wishlist", icon: "heart", badge: wishCount },
    { id: "cart", label: "Keranjang", icon: "cart", badge: cartCount },
    { id: "akun", label: "Akun", icon: "user" },
  ];
  return (
    <div style={{ flex: "none", paddingBottom: sb, paddingTop: 8, background: "#fff", borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-around", position: "relative", zIndex: 5 }}>
      {tabs.map((t) => {
        const on = tab === t.id;
        return (
          <button key={t.id} onClick={() => setTab(t.id)} className="center" style={{ flexDirection: "column", gap: 4, flex: 1, color: on ? "var(--blue-600)" : "var(--faint)", position: "relative" }}>
            <span style={{ position: "relative" }}>
              <Icon name={t.icon} size={23} fill={on && (t.icon === "heart" || t.icon === "home") ? "currentColor" : "none"} stroke={on ? 2.2 : 2} />
              {t.badge > 0 && <span style={{ position: "absolute", top: -5, right: -8, minWidth: 16, height: 16, padding: "0 4px", borderRadius: 8, background: "var(--amber-400)", color: "#2a1c00", fontSize: 10, fontWeight: 800, display: "grid", placeItems: "center", border: "2px solid #fff" }}>{t.badge}</span>}
            </span>
            <span style={{ fontSize: 10.5, fontWeight: 600 }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------- mobile product card ---------- */
function MProductCard({ p, onOpen, wide }) {
  const { toggleWish, wishlist, addToCart } = useM();
  const on = wishlist.includes(p.id);
  return (
    <div onClick={() => onOpen(p.id)} style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}>
      <button onClick={(e) => { e.stopPropagation(); toggleWish(p.id); }} className="center" style={{ position: "absolute", top: 8, right: 8, width: 30, height: 30, borderRadius: 999, background: "rgba(255,255,255,.92)", color: on ? "var(--red-500)" : "var(--slate)", zIndex: 2, boxShadow: "var(--sh-xs)" }}><Icon name="heart" size={16} fill={on ? "currentColor" : "none"} /></button>
      <MPh cat={p.cat} style={{ aspectRatio: "1/1" }} />
      <div style={{ position: "absolute", left: 8, top: 8 }}>
        {p.flash ? <span className="badge badge-flash" style={{ height: 19, fontSize: 10 }}><Icon name="fire" size={10} fill="currentColor" stroke={0} /> FLASH</span> : <span className="badge badge-disc" style={{ height: 19, fontSize: 10 }}>-{discPct(p)}%</span>}
      </div>
      <div style={{ padding: "9px 10px 11px", display: "flex", flexDirection: "column", gap: 5, flex: 1 }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: 32 }}>{p.name}</div>
        <div className="price" style={{ fontSize: 15, color: "var(--blue-700)" }}>{RP(p.price)}</div>
        <div className="flex aic gap8" style={{ fontSize: 11, color: "var(--muted)" }}>
          <span className="flex aic" style={{ gap: 3 }}><Icon name="star" size={11} fill="var(--star)" stroke={0} /> {p.rating}</span>
          <span className="dot-sep"></span><span>{(p.sold / 1000).toFixed(1)}rb terjual</span>
        </div>
      </div>
    </div>
  );
}

/* ================= HOME ================= */
function MHome({ platform }) {
  const { nav, openChat } = useM();
  const flashRailRef = React.useRef(null);
  const promoRailRef = React.useRef(null);
  useMDragScroll(flashRailRef);
  useMDragScroll(promoRailRef);
  const [bi, setBi] = React.useState(0);
  React.useEffect(() => { const iv = setInterval(() => setBi((x) => (x + 1) % BANNERS.length), 4500); return () => clearInterval(iv); }, []);
  const b = BANNERS[bi];
  const tone = { blue: "linear-gradient(120deg,#18306b,#1d4ed8)", dark: "linear-gradient(120deg,#0e1526,#293a63)", amber: "linear-gradient(120deg,#bb710a,#f5ad1c)" };
  const flash = PRODUCTS.filter((p) => p.flash);
  return (
    <>
      <MTopBar platform={platform} action={
        <div className="flex aic gap8">
          <button className="center" style={{ width: 38, height: 38, borderRadius: 999, background: "var(--bg)" }} onClick={openChat}><Icon name="chat" size={20} style={{ color: "var(--slate)" }} /></button>
          <button className="center" style={{ width: 38, height: 38, borderRadius: 999, background: "var(--bg)", position: "relative" }}><Icon name="bell" size={20} style={{ color: "var(--slate)" }} /><span style={{ position: "absolute", top: 7, right: 8, width: 8, height: 8, borderRadius: 999, background: "var(--red-500)", border: "2px solid #fff" }}></span></button>
        </div>
      } />
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        {/* search */}
        <div style={{ padding: "12px 16px 8px", position: "sticky", top: 0, background: "var(--bg)", zIndex: 3 }}>
          <button onClick={() => nav("search")} className="flex aic gap8" style={{ width: "100%", height: 44, padding: "0 16px", background: "#fff", border: "1px solid var(--line)", borderRadius: 999, color: "var(--faint)", fontSize: 14 }}><Icon name="search" size={19} /> Cari produk elektronik…</button>
        </div>
        {/* hero */}
        <div style={{ padding: "4px 16px 0" }}>
          <div style={{ borderRadius: 18, overflow: "hidden", position: "relative", background: tone[b.tone], minHeight: 168, padding: 20 }}>
            <div key={b.id} className="banner-in" style={{ position: "relative", zIndex: 2, maxWidth: "72%" }}>
              <div className="eyebrow" style={{ color: b.tone === "amber" ? "#3a1500" : "var(--amber-300)", fontSize: 10 }}>{b.eyebrow}</div>
              <div style={{ fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: 21, color: b.tone === "amber" ? "#3a1500" : "#fff", marginTop: 8, lineHeight: 1.15, whiteSpace: "pre-line" }}>{b.title}</div>
              <button className="btn btn-amber btn-sm" style={{ marginTop: 14 }} onClick={() => nav("cat", { cat: b.cat })}>{b.cta}</button>
            </div>
            <MPh cat={b.cat} style={{ position: "absolute", right: -10, top: 0, bottom: 0, width: "46%", opacity: .92, mixBlendMode: "luminosity" }} />
            <div style={{ position: "absolute", left: 20, bottom: 14, display: "flex", gap: 5, zIndex: 3 }}>
              {BANNERS.map((_, i) => <span key={i} style={{ width: i === bi ? 18 : 6, height: 6, borderRadius: 6, background: i === bi ? "#fff" : "rgba(255,255,255,.5)", transition: "all .3s" }} />)}
            </div>
          </div>
        </div>
        {/* categories */}
        <div style={{ padding: "18px 16px 4px" }}>
          <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {CATEGORIES.map((c) => (
              <button key={c.id} onClick={() => nav("cat", { cat: c.id })} className="center" style={{ flexDirection: "column", gap: 7 }}>
                <span style={{ width: 52, height: 52, borderRadius: 15, background: c.bg, display: "grid", placeItems: "center", color: "var(--blue-700)" }}><Icon name={c.icon} size={24} stroke={1.9} /></span>
                <span style={{ fontSize: 10.5, fontWeight: 600, textAlign: "center", lineHeight: 1.2 }}>{c.name}</span>
              </button>
            ))}
          </div>
        </div>
        {/* flash sale */}
        <div style={{ margin: "16px 0 4px" }}>
          <div className="flex aic jcb" style={{ padding: "0 16px 10px" }}>
            <div className="flex aic gap8"><span style={{ fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: 17 }}><Icon name="fire" size={18} fill="#ff6a3d" stroke={0} /> Flash Sale</span>
              <Countdown target={window.FLASH_END} /></div>
            <button onClick={() => nav("flash")} style={{ fontSize: 12.5, fontWeight: 700, color: "var(--blue-600)" }}>Semua</button>
          </div>
          <div ref={flashRailRef} className="rail" style={{ padding: "0 16px", gap: 12 }}>
            {flash.map((p) => <div key={p.id} style={{ width: 140, flex: "none" }}><MProductCard p={p} onOpen={(id) => nav("detail", { id })} /></div>)}
          </div>
        </div>
        {/* promo strip */}
        <div style={{ padding: "12px 16px 4px" }}>
          <div ref={promoRailRef} className="rail" style={{ gap: 10 }}>
            {PROMOS.map((pr) => {
              const tb = { blue: "linear-gradient(135deg,#1d4ed8,#2f63ea)", amber: "linear-gradient(135deg,#f5ad1c,#e2920a)", green: "linear-gradient(135deg,#19a463,#0e8e52)", violet: "linear-gradient(135deg,#7a5af0,#5b3fd6)" }[pr.tone];
              return <div key={pr.id} style={{ minWidth: 200, flex: "none", borderRadius: 14, padding: 14, background: tb, color: pr.tone === "amber" ? "#3a1500" : "#fff", position: "relative", overflow: "hidden" }}>
                <Icon name="tag" size={48} style={{ position: "absolute", right: -6, top: -6, opacity: .18 }} />
                <div style={{ fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: 16 }}>{pr.title}</div>
                <div style={{ fontSize: 11, opacity: .9, marginTop: 3 }}>{pr.sub}</div>
              </div>;
            })}
          </div>
        </div>
        {/* recommendation grid */}
        <div style={{ padding: "16px 16px 20px" }}>
          <div style={{ fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: 17, marginBottom: 12 }}>Rekomendasi untukmu</div>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {PRODUCTS.slice(2, 14).map((p) => <MProductCard key={p.id} p={p} onOpen={(id) => nav("detail", { id })} />)}
          </div>
        </div>
      </div>
    </>
  );
}

/* ================= CATEGORY / SEARCH ================= */
function MCategory({ platform, params }) {
  const { nav } = useM();
  const [q, setQ] = React.useState(params.q || "");
  const cat = params.cat;
  let list = PRODUCTS.filter((p) => (!cat || cat === "all" || p.cat === cat) && (!q || (p.name + p.brand).toLowerCase().includes(q.toLowerCase())));
  if (params.flash) list = PRODUCTS.filter((p) => p.flash);
  const title = params.flash ? "Flash Sale" : cat && cat !== "all" ? catName(cat) : q ? `"${q}"` : "Semua Produk";
  return (
    <>
      <MTopBar platform={platform} back onBack={() => nav("home")} action={
        <button onClick={() => nav("cart")} className="center" style={{ width: 38, height: 38, borderRadius: 999, background: "var(--bg)" }}><Icon name="cart" size={20} style={{ color: "var(--slate)" }} /></button>
      } />
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ padding: "8px 16px 12px", position: "sticky", top: 0, background: "var(--bg)", zIndex: 3 }}>
          <div className="flex aic gap8" style={{ height: 44, padding: "0 14px", background: "#fff", border: "1px solid var(--line)", borderRadius: 999 }}>
            <Icon name="search" size={18} style={{ color: "var(--faint)" }} />
            <input autoFocus={params.focus} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari…" style={{ flex: 1, border: "none", outline: "none", fontSize: 14, background: "none" }} />
          </div>
          <div className="flex aic jcb" style={{ marginTop: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{title} <span className="muted" style={{ fontWeight: 500, fontSize: 12.5 }}>· {list.length}</span></div>
            <button className="flex aic gap4" style={{ fontSize: 12.5, fontWeight: 600, color: "var(--slate)" }}><Icon name="filter" size={16} /> Filter</button>
          </div>
        </div>
        <div style={{ padding: "0 16px 20px" }}>
          {list.length ? <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}>{list.map((p) => <MProductCard key={p.id} p={p} onOpen={(id) => nav("detail", { id })} />)}</div>
            : <div className="center" style={{ flexDirection: "column", gap: 10, padding: "60px 0", color: "var(--faint)" }}><Icon name="search" size={36} /><div style={{ fontWeight: 700, color: "var(--ink)" }}>Tidak ditemukan</div></div>}
        </div>
      </div>
    </>
  );
}

/* ================= DETAIL ================= */
function MDetail({ platform, params }) {
  const { nav, addToCart, buyNow, wishlist, toggleWish, openChat } = useM();
  const similarRailRef = React.useRef(null);
  useMDragScroll(similarRailRef);
  const p = getProduct(params.id) || PRODUCTS[0];
  const [color, setColor] = React.useState(0);
  const [tab, setTab] = React.useState("spek");
  const [img, setImg] = React.useState(0);
  const on = wishlist.includes(p.id);
  const similar = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4);
  const sb = platform === "ios" ? 24 : 6;
  return (
    <>
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        {/* image with floating back */}
        <div style={{ position: "relative" }}>
          <MPh cat={p.cat} style={{ aspectRatio: "1/.92", width: "100%" }} />
          <div style={{ position: "absolute", top: platform === "ios" ? 50 : 14, left: 16, right: 16, display: "flex", justifyContent: "space-between", zIndex: 4 }}>
            <button onClick={() => nav("home")} className="center" style={{ width: 38, height: 38, borderRadius: 999, background: "rgba(255,255,255,.92)", boxShadow: "var(--sh-sm)" }}><Icon name="chevL" size={20} /></button>
            <div className="flex gap8">
              <button onClick={() => toggleWish(p.id)} className="center" style={{ width: 38, height: 38, borderRadius: 999, background: "rgba(255,255,255,.92)", boxShadow: "var(--sh-sm)", color: on ? "var(--red-500)" : "var(--ink)" }}><Icon name="heart" size={19} fill={on ? "currentColor" : "none"} /></button>
              <button onClick={() => nav("cart")} className="center" style={{ width: 38, height: 38, borderRadius: 999, background: "rgba(255,255,255,.92)", boxShadow: "var(--sh-sm)" }}><Icon name="cart" size={19} /></button>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5, zIndex: 4 }}>
            {[0, 1, 2, 3].map((i) => <span key={i} onClick={() => setImg(i)} style={{ width: i === img ? 18 : 6, height: 6, borderRadius: 6, background: i === img ? "var(--blue-600)" : "rgba(20,30,60,.25)" }} />)}
          </div>
        </div>
        {/* info */}
        <div style={{ background: "#fff", borderRadius: "20px 20px 0 0", marginTop: -16, position: "relative", padding: "18px 16px 16px" }}>
          <div className="flex aic gap8" style={{ marginBottom: 8 }}>
            <span className="badge badge-blue" style={{ height: 20 }}>{p.brand}</span>
            {p.flash && <span className="badge badge-flash" style={{ height: 20 }}><Icon name="fire" size={11} fill="currentColor" stroke={0} /> FLASH</span>}
          </div>
          <h1 style={{ fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: 19, lineHeight: 1.25, margin: 0 }}>{p.name}</h1>
          <div className="flex aic gap8" style={{ marginTop: 8, fontSize: 12.5 }}>
            <span className="flex aic gap4"><Stars value={p.rating} size={13} /> <b>{p.rating}</b></span>
            <span className="dot-sep"></span><span className="muted">{p.reviews.toLocaleString("id-ID")} ulasan</span>
            <span className="dot-sep"></span><span className="muted">{p.sold.toLocaleString("id-ID")} terjual</span>
          </div>
          <div style={{ background: "linear-gradient(120deg,var(--blue-50),#fff)", border: "1px solid var(--blue-100)", borderRadius: 14, padding: 14, marginTop: 14 }}>
            <div className="flex aic gap8" style={{ flexWrap: "wrap" }}>
              <span className="price" style={{ fontSize: 26, color: "var(--blue-700)" }}>{RP(p.price)}</span>
              <span style={{ textDecoration: "line-through", color: "var(--faint)", fontSize: 14 }}>{RP(p.was)}</span>
              <span className="badge badge-disc" style={{ height: 22 }}>-{discPct(p)}%</span>
            </div>
            <div className="flex aic gap6" style={{ marginTop: 6, fontSize: 12, color: "var(--amber-600)", fontWeight: 600 }}><Icon name="coin" size={14} /> +{Math.floor(p.price / 10000).toLocaleString("id-ID")} poin · cicilan {RP(Math.round(p.price / 12))}/bln</div>
          </div>
          {/* color */}
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Warna: <span style={{ fontWeight: 500, color: "var(--muted)" }}>{p.colors[color]}</span></div>
            <div className="flex gap8" style={{ flexWrap: "wrap" }}>{p.colors.map((c, i) => <button key={c} className={"chip" + (color === i ? " active" : "")} style={{ height: 34 }} onClick={() => setColor(i)}>{c}</button>)}</div>
          </div>
          {/* trust */}
          <div className="flex gap8" style={{ marginTop: 16, overflowX: "auto" }}>
            {[["shield", "Garansi resmi"], ["truck", "Gratis ongkir"], ["refresh", "Tukar 7 hari"]].map(([ic, t]) => (
              <div key={t} className="flex aic gap6" style={{ flex: "none", fontSize: 11.5, color: "var(--slate)", background: "var(--bg)", padding: "8px 12px", borderRadius: 10, fontWeight: 600 }}><Icon name={ic} size={16} style={{ color: "var(--green-500)" }} /> {t}</div>
            ))}
          </div>
          {/* tabs */}
          <div className="flex" style={{ marginTop: 18, borderBottom: "1px solid var(--line)", gap: 4 }}>
            {[["spek", "Spesifikasi"], ["desk", "Deskripsi"], ["ulasan", "Ulasan"]].map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)} style={{ padding: "10px 12px", fontSize: 13.5, fontWeight: 700, color: tab === k ? "var(--blue-700)" : "var(--muted)", borderBottom: tab === k ? "2.5px solid var(--blue-600)" : "2.5px solid transparent", marginBottom: -1 }}>{l}</button>
            ))}
          </div>
          <div style={{ paddingTop: 14 }}>
            {tab === "spek" && <div>{p.specs.map(([k, v]) => <div key={k} className="flex aic jcb" style={{ padding: "10px 0", borderBottom: "1px solid var(--line)", fontSize: 13 }}><span className="muted">{k}</span><b style={{ textAlign: "right" }}>{v}</b></div>)}</div>}
            {tab === "desk" && <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "var(--slate)", margin: 0 }}>{p.name} — {p.short}. Produk original bergaransi resmi, dikirim dengan packing aman. Termasuk kelengkapan standar pabrik, kartu garansi, gratis ongkir, cicilan 0%, dan poin reward.</p>}
            {tab === "ulasan" && <div className="col gap14">
              {REVIEWS.slice(0, 3).map((r) => (
                <div key={r.id} style={{ borderBottom: "1px solid var(--line)", paddingBottom: 12 }}>
                  <div className="flex aic gap8"><span style={{ width: 32, height: 32, borderRadius: 999, background: "var(--blue-100)", color: "var(--blue-700)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 12 }}>{r.avatar}</span>
                    <div><div style={{ fontWeight: 700, fontSize: 13 }}>{r.name}</div><div className="flex aic gap6"><Stars value={r.rating} size={11} /><span className="muted" style={{ fontSize: 11 }}>{r.date}</span></div></div></div>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--slate)", margin: "8px 0 0" }}>{r.text}</p>
                </div>
              ))}
            </div>}
          </div>
          {/* similar */}
          <div style={{ marginTop: 18 }}>
            <div style={{ fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: 16, marginBottom: 10 }}>Produk Serupa</div>
            <div ref={similarRailRef} className="rail" style={{ gap: 12 }}>{similar.map((s) => <div key={s.id} style={{ width: 140, flex: "none" }}><MProductCard p={s} onOpen={(id) => { nav("detail", { id }); }} /></div>)}</div>
          </div>
        </div>
      </div>
      {/* sticky bottom action */}
      <div style={{ flex: "none", padding: "10px 16px", paddingBottom: 10 + sb, background: "#fff", borderTop: "1px solid var(--line)", display: "flex", gap: 10, alignItems: "center" }}>
        <button onClick={openChat} className="center" style={{ width: 48, height: 48, borderRadius: 12, border: "1px solid var(--line-2)", color: "var(--slate)", flex: "none" }}><Icon name="chat" size={22} /></button>
        <button onClick={() => addToCart(p.id)} className="btn btn-ghost" style={{ flex: 1, height: 48 }}><Icon name="cart" size={19} /> Keranjang</button>
        <button onClick={() => buyNow(p.id)} className="btn btn-amber" style={{ flex: 1, height: 48 }}>Beli</button>
      </div>
    </>
  );
}

Object.assign(window, { MShopCtx, useM, MPh, MTopBar, MTabBar, MProductCard, MHome, MCategory, MDetail });
