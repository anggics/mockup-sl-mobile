/* ============================================================
   COMPONENTS — icons, cards, header, footer, shared UI
   ============================================================ */

const ShopCtx = React.createContext(null);
const useShop = () => React.useContext(ShopCtx);

/* ---------------- Icon system (stroke line icons) ---------------- */
const IP = {
  search: "M21 21l-4.3-4.3M11 19a8 8 0 110-16 8 8 0 010 16z",
  cart: "M3 4h2l2.4 12.4A2 2 0 009.4 18h7.7a2 2 0 002-1.6L21 8H6M9 22a1 1 0 100-2 1 1 0 000 2zm9 0a1 1 0 100-2 1 1 0 000 2z",
  heart: "M12 20.5l-1.4-1.3C5.6 14.8 3 12.4 3 9.3 3 6.9 4.9 5 7.3 5c1.4 0 2.7.6 3.7 1.7C12 5.6 13.3 5 14.7 5 17.1 5 19 6.9 19 9.3c0 3.1-2.6 5.5-7.6 9.9L12 20.5z",
  user: "M20 21a8 8 0 10-16 0M12 11a4 4 0 100-8 4 4 0 000 8z",
  bell: "M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0",
  chat: "M21 11.5a8.4 8.4 0 01-8.5 8.5 8.5 8.5 0 01-3.6-.8L3 21l1.9-5.4A8.4 8.4 0 013.5 11.5 8.5 8.5 0 0112 3a8.5 8.5 0 019 8.5z",
  star: "M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9L12 3z",
  chevR: "M9 6l6 6-6 6", chevL: "M15 6l-6 6 6 6", chevD: "M6 9l6 6 6-6", chevU: "M6 15l6-6 6 6",
  arrowR: "M5 12h14M13 6l6 6-6 6",
  phone: "M7 3h10a1 1 0 011 1v16a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1zM10 18h4",
  laptop: "M4 5h16v11H4zM2 20h20l-1-3H3z",
  headphone: "M4 14v-2a8 8 0 0116 0v2M4 14a2 2 0 012 2v2a2 2 0 01-2 2 2 2 0 01-2-2v-2a2 2 0 012-2zm16 0a2 2 0 00-2 2v2a2 2 0 002 2 2 2 0 002-2v-2a2 2 0 00-2-2z",
  tv: "M3 5h18v12H3zM8 21h8M12 17v4",
  camera: "M3 7h3l1.5-2h9L18 7h3v12H3zM12 16a3.5 3.5 0 100-7 3.5 3.5 0 000 7z",
  game: "M7 12h4M9 10v4M15.5 11.5h.01M18 13.5h.01M7 7h10a4 4 0 014 4l-.6 5a3 3 0 01-5.2 1.6l-.5-.6h-3.4l-.5.6A3 3 0 013.6 16L3 11a4 4 0 014-4z",
  home: "M3 11l9-7 9 7M5 10v10h14V10",
  plug: "M9 3v6M15 3v6M6 9h12v3a6 6 0 01-12 0V9zM12 18v3",
  check: "M5 12l5 5L20 6",
  checkCircle: "M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM9 12l2 2 4-4",
  truck: "M3 6h11v9H3zM14 9h4l3 3v3h-7M7 19a2 2 0 100-4 2 2 0 000 4zm11 0a2 2 0 100-4 2 2 0 000 4z",
  refresh: "M21 12a9 9 0 11-3-6.7M21 4v4h-4",
  coin: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 8v8M9.5 10.5a2.5 2 0 012.5-1.5c1.4 0 2.2.7 2.2 1.6 0 1-.8 1.4-2.2 1.6-1.4.2-2.4.6-2.4 1.7s1 1.6 2.4 1.6c1.4 0 2.3-.6 2.5-1.5",
  fire: "M12 3c1 3-1 4-1 6 0 1 1 2 1 2s2-1 2-3c2 1.5 3 4 3 6a5 5 0 01-10 0c0-3 2-4 2-6 0 0 1 1 3 1 1 0 .5-3-1-6z",
  plus: "M12 5v14M5 12h14", minus: "M5 12h14",
  trash: "M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13",
  filter: "M3 5h18M6 12h12M10 19h4",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  lock: "M6 11V8a6 6 0 0112 0v3M5 11h14v9H5z",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zm10 3a3 3 0 100-6 3 3 0 000 6z",
  eyeOff: "M3 3l18 18M10.6 10.7a3 3 0 004 4M9.4 5.2A9.7 9.7 0 0112 5c6.5 0 10 7 10 7a17 17 0 01-3.2 3.9M6.1 6.2A17 17 0 002 12s3.5 7 10 7a9.5 9.5 0 003-.5",
  whatsapp: "M12 3a9 9 0 00-7.7 13.6L3 21l4.5-1.2A9 9 0 1012 3zM8.5 8.5c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.5l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.2.2-.2.4-.1.6.3.6 1.2 1.7 2.3 2.2.3.1.5.1.7-.1l.6-.6c.2-.2.4-.2.6-.1l1.5.7c.3.2.4.3.4.5 0 .8-.6 1.6-1 1.7-.4.2-1.6.5-3.4-.4-2-1-3.3-3-3.6-3.5-.3-.5-1-1.5-1-2.8 0-1.3.7-1.9.9-2z",
  pin: "M12 21s7-5.7 7-11a7 7 0 10-14 0c0 5.3 7 11 7 11zm0-8a3 3 0 100-6 3 3 0 000 6z",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2",
  tag: "M3 12l8-8 9 1 1 9-8 8-10-10zM15.5 8.5h.01",
  gift: "M3 11h18v9H3zM3 7h18v4H3zM12 7v13M12 7S10.5 3 8.5 3.5 8 7 8 7M12 7s1.5-4 3.5-3.5S16 7 16 7",
  percent: "M19 5L5 19M8.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm7 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  menu: "M4 7h16M4 12h16M4 17h16", x: "M6 6l12 12M18 6L6 18",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z",
  send: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  box: "M21 8l-9-5-9 5v8l9 5 9-5V8zM3 8l9 5 9-5M12 13v9",
  headset: "M4 12a8 8 0 0116 0M3 14a2 2 0 012-2h1v6H5a2 2 0 01-2-2v-2zm18 0a2 2 0 00-2-2h-1v6h1a2 2 0 002-2v-2zM12 20h4",
  copy: "M9 9h11v11H9zM5 15H4V4h11v1",
  edit: "M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4",
  logout: "M16 17l5-5-5-5M21 12H9M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  star2: "M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9L12 3z",
  wallet: "M3 7h16a2 2 0 012 2v8a2 2 0 01-2 2H3zM3 7l1-3h13l1 3M17 13h.01",
  thumb: "M7 11v9H4a1 1 0 01-1-1v-7a1 1 0 011-1h3zm0 0l4-8a2 2 0 012 2v3h5a2 2 0 012 2.3l-1.2 7A2 2 0 0118.6 20H7",
};

function Icon({ name, size = 20, stroke = 2, fill = "none", className = "", style }) {
  const d = IP[name] || "";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} className={className} style={style}
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d.split("M").filter(Boolean).map((seg, i) => <path key={i} d={"M" + seg} />)}
    </svg>
  );
}

/* ---------------- Placeholder media (CSS-rendered product visual) ---------------- */
function Ph({ cat, label, style, big }) {
  return (
    <div className="ph-img" style={{ background: "none", position: "relative", ...style }}>
      <ProductVisual cat={cat} />
    </div>
  );
}
const catIcon = (cat) => {
  const map = { smartphone: "phone", laptop: "laptop", audio: "headphone", tv: "tv", kamera: "camera", gaming: "game", smarthome: "home", aksesoris: "plug" };
  return map[cat] || "box";
};

/* ---------------- Stars ---------------- */
function Stars({ value = 5, size = 14 }) {
  return (
    <span className="stars" style={{ fontSize: 0 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon key={i} name="star" size={size} stroke={0}
          fill={i <= Math.round(value) ? "var(--star)" : "#dfe3ec"} />
      ))}
    </span>
  );
}

/* ---------------- Money ---------------- */
function Money({ v, className = "", style }) {
  return <span className={"tnum " + className} style={style}>{RP(v)}</span>;
}

/* ---------------- Logo ---------------- */
function Logo({ onClick, compact }) {
  return (
    <div className="logo" onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="logo-mark"><span>S</span></div>
      {!compact && (
        <div className="logo-text">
          <b>Sinar Lestari</b>
          <small>Elektronik</small>
        </div>
      )}
    </div>
  );
}

/* ---------------- Countdown ---------------- */
function Countdown({ target, light }) {
  const [t, setT] = React.useState(target - Date.now());
  React.useEffect(() => {
    const iv = setInterval(() => setT(Math.max(0, target - Date.now())), 1000);
    return () => clearInterval(iv);
  }, [target]);
  const s = Math.floor(t / 1000);
  const hh = String(Math.floor(s / 3600) % 24).padStart(2, "0");
  const mm = String(Math.floor(s / 60) % 60).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  const boxStyle = light ? { background: "#fff", color: "var(--ink)" } : undefined;
  return (
    <span className="countdown">
      <span className="cd-box" style={boxStyle}>{hh}</span><span className="cd-colon" style={light ? { color: "#fff" } : undefined}>:</span>
      <span className="cd-box" style={boxStyle}>{mm}</span><span className="cd-colon" style={light ? { color: "#fff" } : undefined}>:</span>
      <span className="cd-box" style={boxStyle}>{ss}</span>
    </span>
  );
}

/* ---------------- Product Card ---------------- */
function ProductCard({ p, onOpen }) {
  const { wishlist, toggleWish, addToCart } = useShop();
  const on = wishlist.includes(p.id);
  return (
    <div className="pcard" onClick={() => onOpen(p.id)}>
      <button className={"pcard-wish" + (on ? " on" : "")} onClick={(e) => { e.stopPropagation(); toggleWish(p.id); }} title="Wishlist">
        <Icon name="heart" size={17} fill={on ? "currentColor" : "none"} stroke={2} />
      </button>
      <div className="pcard-media">
        <Ph cat={p.cat} label="foto produk" />
        <div style={{ position: "absolute", left: 9, top: 9, display: "flex", gap: 6 }}>
          {p.flash ? <span className="badge badge-flash"><Icon name="fire" size={12} fill="currentColor" stroke={0} /> FLASH</span>
            : <span className="badge badge-disc">-{discPct(p)}%</span>}
        </div>
      </div>
      <div className="pcard-body">
        <div className="pcard-brand">{p.brand}</div>
        <div className="pcard-title">{p.name}</div>
        <div className="pcard-price">
          <span className="price now">{RP(p.price)}</span>
          <span className="was">{RP(p.was)}</span>
          {!p.flash && <span className="badge badge-red" style={{ height: 18 }}>-{discPct(p)}%</span>}
        </div>
        <div className="pcard-meta">
          <span className="rate-pill"><Icon name="star" size={12} fill="var(--star)" stroke={0} /> {p.rating}</span>
          <span className="dot-sep"></span>
          <span>{p.sold.toLocaleString("id-ID")} terjual</span>
        </div>
        <button className="btn btn-soft btn-sm" style={{ marginTop: 2 }} onClick={(e) => { e.stopPropagation(); addToCart(p.id); }}>
          <Icon name="cart" size={15} /> Keranjang
        </button>
      </div>
    </div>
  );
}

/* ---------------- Auto-scrolling rail (marquee + arrows) ---------------- */
function AutoRail({ items, render, keyOf, gap = 16, speed = 0.45, arrows = true, padding = "0" }) {
  const ref = React.useRef(null);
  const paused = React.useRef(false);
  React.useEffect(() => {
    let raf;
    const step = () => {
      const el = ref.current;
      if (el && !paused.current) {
        el.scrollLeft += speed;
        const half = el.scrollWidth / 2;
        if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [speed]);
  const pause = () => { paused.current = true; };
  const resume = () => { paused.current = false; };
  const dup = items.concat(items);
  const go = (d) => { const el = ref.current; if (!el) return; paused.current = true; el.scrollBy({ left: d * el.clientWidth * 0.72, behavior: "smooth" }); setTimeout(() => { paused.current = false; }, 900); };
  return (
    <div style={{ position: "relative" }} onMouseEnter={pause} onMouseLeave={resume}>
      <div ref={ref} className="autorail" onTouchStart={pause} style={{ display: "flex", gap, padding }}>
        {dup.map((it, i) => <div key={keyOf(it) + "-" + i} style={{ flex: "none" }}>{render(it)}</div>)}
      </div>
      {arrows && <>
        <button className="rail-arrow left" onClick={() => go(-1)} aria-label="sebelumnya"><Icon name="chevL" size={20} /></button>
        <button className="rail-arrow right" onClick={() => go(1)} aria-label="berikutnya"><Icon name="chevR" size={20} /></button>
      </>}
    </div>
  );
}

/* ---------------- Header ---------------- */
function Header() {
  const { nav, cartCount, wishlist, user, route, openChat } = useShop();
  const [q, setQ] = React.useState("");
  const navItems = [
    { id: "flashsale", label: "Flash Sale", icon: "fire", hot: true },
    { id: "category:smartphone", label: "Smartphone" },
    { id: "category:laptop", label: "Laptop" },
    { id: "category:audio", label: "Audio" },
    { id: "category:gaming", label: "Gaming" },
    { id: "category:smarthome", label: "Smart Home" },
    { id: "points", label: "Poin & Reward", icon: "coin" },
  ];
  const go = (id) => {
    if (id.startsWith("category:")) nav("category", { cat: id.split(":")[1] });
    else nav(id);
  };
  return (
    <header className="header">
      <div className="wrap">
        <div className="header-top">
          <Logo onClick={() => nav("home")} />
          <form className="searchbar" onSubmit={(e) => { e.preventDefault(); nav("category", { cat: "all", q }); }}>
            <Icon name="search" size={19} style={{ color: "var(--faint)" }} />
            <input placeholder="Cari smartphone, laptop, audio…" value={q} onChange={(e) => setQ(e.target.value)} />
            <button type="submit" className="btn btn-primary btn-sm">Cari</button>
          </form>
          <div className="header-actions">
            <button className="hicon" onClick={() => openChat()} title="Chat Admin"><Icon name="chat" size={21} /></button>
            <button className="hicon" onClick={() => nav("wishlist")} title="Wishlist">
              <Icon name="heart" size={21} />
              {wishlist.length > 0 && <span className="hbubble">{wishlist.length}</span>}
            </button>
            <button className="hicon" onClick={() => nav("cart")} title="Keranjang">
              <Icon name="cart" size={21} />
              {cartCount > 0 && <span className="hbubble">{cartCount}</span>}
            </button>
            <div style={{ width: 1, height: 26, background: "var(--line)", margin: "0 4px" }}></div>
            {user.loggedIn ? (
              <button className="flex aic gap8" onClick={() => nav("profile")} style={{ padding: "5px 10px 5px 5px", borderRadius: 999, border: "1px solid var(--line)" }}>
                <span style={{ width: 32, height: 32, borderRadius: 999, background: "linear-gradient(150deg,var(--blue-500),var(--blue-700))", color: "#fff", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 13 }}>{user.avatar}</span>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{user.name.split(" ")[0]}</span>
              </button>
            ) : (
              <>
                <button className="btn btn-ghost btn-sm" onClick={() => nav("login")}>Masuk</button>
                <button className="btn btn-primary btn-sm" onClick={() => nav("register")}>Daftar</button>
              </>
            )}
          </div>
        </div>
        <nav className="navbar">
          <button className="nav-link" onClick={() => nav("category", { cat: "all" })} style={{ fontWeight: 700 }}>
            <Icon name="grid" size={17} /> Semua Kategori
          </button>
          {navItems.map((n) => (
            <button key={n.id} className={"nav-link" + (n.hot ? " hot" : "")} onClick={() => go(n.id)}>
              {n.icon && <Icon name={n.icon} size={16} fill={n.hot ? "currentColor" : "none"} stroke={n.hot ? 0 : 2} />}
              {n.label}
            </button>
          ))}
          <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>
            <Icon name="truck" size={17} style={{ color: "var(--green-500)" }} /> Gratis ongkir &amp; Garansi resmi
          </span>
        </nav>
      </div>
    </header>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  const { nav } = useShop();
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-cols">
          <div>
            <div className="logo" style={{ marginBottom: 14 }}>
              <div className="logo-mark"><span>S</span></div>
              <div className="logo-text"><b style={{ color: "#fff" }}>Sinar Lestari</b><small>Elektronik</small></div>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, maxWidth: 320, color: "#9aa3b8" }}>
              Toko elektronik tepercaya sejak 2009. Smartphone, laptop, audio & gadget original dengan garansi resmi dan layanan terbaik.
            </p>
            <div className="flex gap8" style={{ marginTop: 16 }}>
              {["Visa", "MC", "BCA", "GoPay", "OVO"].map((m) => (
                <span key={m} style={{ height: 30, padding: "0 10px", display: "grid", placeItems: "center", background: "rgba(255,255,255,.08)", borderRadius: 7, fontSize: 11, fontWeight: 700 }}>{m}</span>
              ))}
            </div>
          </div>
          <div>
            <h5>Belanja</h5>
            <ul>
              <li><a onClick={() => nav("flashsale")}>Flash Sale</a></li>
              <li><a onClick={() => nav("category", { cat: "smartphone" })}>Smartphone</a></li>
              <li><a onClick={() => nav("category", { cat: "laptop" })}>Laptop & PC</a></li>
              <li><a onClick={() => nav("category", { cat: "audio" })}>Audio</a></li>
              <li><a onClick={() => nav("points")}>Poin & Reward</a></li>
            </ul>
          </div>
          <div>
            <h5>Bantuan</h5>
            <ul>
              <li><a onClick={() => nav("faq")}>Cara Belanja</a></li>
              <li><a onClick={() => nav("faq")}>Pengiriman</a></li>
              <li><a onClick={() => nav("faq")}>Pengembalian & Garansi</a></li>
              <li><a onClick={() => nav("help")}>Pusat Bantuan</a></li>
              <li><a onClick={() => nav("profile")}>Lacak Pesanan</a></li>
            </ul>
          </div>
          <div>
            <h5>Hubungi Kami</h5>
            <ul>
              <li className="flex aic gap8"><Icon name="whatsapp" size={16} /> 0812-3456-7890</li>
              <li className="flex aic gap8"><Icon name="mail" size={16} /> halo@sinarlestari.id</li>
              <li className="flex aic gap8"><Icon name="pin" size={16} /> Jakarta, Indonesia</li>
              <li className="flex aic gap8"><Icon name="clock" size={16} /> Senin–Minggu, 08–21</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Sinar Lestari Elektronik. Semua hak dilindungi.</span>
          <span className="flex gap16">
            <a onClick={() => nav("terms")}>Syarat & Ketentuan</a><a onClick={() => nav("privacy")}>Kebijakan Privasi</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  ShopCtx, useShop, Icon, IP, Ph, catIcon, Stars, Money, Logo, Countdown, ProductCard, AutoRail, Header, Footer,
});
