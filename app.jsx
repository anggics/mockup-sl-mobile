/* ============================================================
   CHAT ADMIN — floating widget
   ============================================================ */
function ChatWidget() {
  const { chatOpen, setChatOpen } = useShop();
  const [msgs, setMsgs] = React.useState([
    { me: false, t: "Halo! Selamat datang di Sinar Lestari Elektronik 👋 Ada yang bisa kami bantu?", time: "09:41" },
    { me: false, t: "Kakak bisa tanya stok, garansi, atau promo terbaru ya.", time: "09:41" },
  ]);
  const [txt, setTxt] = React.useState("");
  const bodyRef = React.useRef(null);
  const quick = ["Cek stok produk", "Info garansi", "Promo hari ini", "Lacak pesanan"];
  React.useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [msgs, chatOpen]);
  const send = (t) => {
    const text = (t || txt).trim(); if (!text) return;
    const time = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    setMsgs((m) => [...m, { me: true, t: text, time }]);
    setTxt("");
    setTimeout(() => setMsgs((m) => [...m, { me: false, typing: true }]), 500);
    setTimeout(() => setMsgs((m) => m.filter((x) => !x.typing).concat({ me: false, t: "Tentu kak! Tim kami akan segera membantu. Apakah ada produk tertentu yang kakak maksud? 😊", time })), 1700);
  };
  return (
    <>
      <button onClick={() => setChatOpen(!chatOpen)} className="center" style={{ position: "fixed", right: 26, bottom: 26, width: 60, height: 60, borderRadius: 999, background: chatOpen ? "var(--ink)" : "var(--blue-600)", color: "#fff", boxShadow: "var(--sh-lg)", zIndex: 1500, transition: "all .2s" }}>
        <Icon name={chatOpen ? "x" : "headset"} size={26} />
        {!chatOpen && <span style={{ position: "absolute", top: 4, right: 4, width: 14, height: 14, borderRadius: 999, background: "#ff5a3d", border: "2.5px solid #fff" }}></span>}
      </button>
      {chatOpen && (
        <div className="card fade-up" style={{ position: "fixed", right: 26, bottom: 98, width: 372, height: 540, zIndex: 1500, display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "var(--sh-lg)" }}>
          <div className="flex aic gap12" style={{ padding: "16px 18px", background: "linear-gradient(120deg,#18306b,#1d4ed8)", color: "#fff" }}>
            <span style={{ width: 42, height: 42, borderRadius: 999, background: "rgba(255,255,255,.16)", display: "grid", placeItems: "center", position: "relative" }}><Icon name="headset" size={22} /><span style={{ position: "absolute", bottom: 1, right: 1, width: 11, height: 11, borderRadius: 999, background: "#34d977", border: "2px solid #18306b" }}></span></span>
            <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 14.5 }}>Admin Sinar Lestari</div><div style={{ fontSize: 12, color: "rgba(255,255,255,.8)" }}>● Online · Balas ±2 menit</div></div>
            <button onClick={() => setChatOpen(false)} style={{ color: "#fff" }}><Icon name="x" size={20} /></button>
          </div>
          <div ref={bodyRef} style={{ flex: 1, overflowY: "auto", padding: 16, background: "var(--bg)", display: "flex", flexDirection: "column", gap: 10 }}>
            <div className="center"><span className="badge" style={{ background: "var(--bg-2)", color: "var(--muted)" }}>Hari ini</span></div>
            {msgs.map((m, i) => m.typing ? (
              <div key={i} style={{ alignSelf: "flex-start", background: "#fff", border: "1px solid var(--line)", borderRadius: "4px 14px 14px 14px", padding: "12px 16px" }}>
                <span className="flex gap4">{[0, 1, 2].map((d) => <span key={d} style={{ width: 7, height: 7, borderRadius: 999, background: "var(--faint)", animation: `pulseDot 1s ${d * .2}s infinite` }}></span>)}</span>
              </div>
            ) : (
              <div key={i} style={{ alignSelf: m.me ? "flex-end" : "flex-start", maxWidth: "80%" }}>
                <div style={{ background: m.me ? "var(--blue-600)" : "#fff", color: m.me ? "#fff" : "var(--ink)", border: m.me ? "none" : "1px solid var(--line)", borderRadius: m.me ? "14px 4px 14px 14px" : "4px 14px 14px 14px", padding: "10px 14px", fontSize: 13.5, lineHeight: 1.5 }}>{m.t}</div>
                <div className="muted" style={{ fontSize: 10.5, marginTop: 3, textAlign: m.me ? "right" : "left" }}>{m.time}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "10px 14px 6px", borderTop: "1px solid var(--line)", background: "#fff" }}>
            <div className="flex gap8" style={{ overflowX: "auto", paddingBottom: 8 }}>{quick.map((q) => <button key={q} className="chip" style={{ height: 30, fontSize: 12, flex: "none" }} onClick={() => send(q)}>{q}</button>)}</div>
            <form className="flex gap8 aic" onSubmit={(e) => { e.preventDefault(); send(); }}>
              <input className="input" value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Tulis pesan…" style={{ height: 44, borderRadius: 999 }} />
              <button type="submit" className="center" style={{ width: 44, height: 44, borderRadius: 999, background: "var(--blue-600)", color: "#fff", flex: "none" }}><Icon name="send" size={19} /></button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

/* ============================================================
   ROUTER
   ============================================================ */
function Router() {
  const { route } = useShop();
  const [t] = window.__tweaks;
  const r = route.name;
  if (r === "home") return <HomeScreen homeStyle={t.homeStyle} />;
  if (r === "flashsale") return <FlashSaleScreen />;
  if (r === "category") return <CategoryScreen params={route.params} />;
  if (r === "product") return <ProductScreen params={route.params} />;
  if (r === "cart") return <CartScreen />;
  if (r === "checkout") return <CheckoutScreen />;
  if (r === "success") return <SuccessScreen params={route.params} />;
  if (r === "login") return <LoginScreen params={route.params} />;
  if (r === "register") return <RegisterScreen />;
  if (r === "forgot") return <ForgotScreen />;
  if (r === "profile") return <ProfileScreen params={route.params} />;
  if (r === "wishlist") return <ProfileScreen params={{ tab: "wishlist" }} />;
  if (r === "points") return <ProfileScreen params={{ tab: "poin" }} />;
  if (r === "review") return <ReviewScreen params={route.params} />;
  if (r === "privacy") return <PrivacyScreen />;
  if (r === "terms") return <TermsScreen />;
  if (r === "faq") return <FaqScreen />;
  if (r === "help") return <HelpScreen />;
  if (r === "track") return <TrackScreen params={route.params} />;
  return <HomeScreen homeStyle={t.homeStyle} />;
}

/* ============================================================
   APP
   ============================================================ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "homeStyle": "carousel",
  "accent": "#1d4ed8",
  "ctaColor": "amber",
  "radius": 12
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  window.__tweaks = [t, setTweak];

  const [route, setRoute] = React.useState({ name: "home", params: {} });
  const [cart, setCart] = React.useState([{ id: "p1", qty: 1 }]);
  const [wishlist, setWishlist] = React.useState(["p3", "p9"]);
  const [chatOpen, setChatOpen] = React.useState(false);
  const [toasts, setToasts] = React.useState([]);
  const [user, setUser] = React.useState({ loggedIn: false, name: "Budi Santoso", avatar: "BS", email: "budi@email.com", phone: "0812-3456-7890", points: 1840, wishCount: 2 });

  // apply tweaks → CSS vars
  React.useEffect(() => {
    const root = document.documentElement;
    const map = { "#1d4ed8": ["#1d4ed8", "#1b40ad", "#2f63ea"], "#0f766e": ["#0f766e", "#0c5d57", "#13978c"], "#4f46e5": ["#4f46e5", "#3f37c4", "#635bf0"], "#0e7490": ["#0e7490", "#0b5d73", "#1593b3"] };
    const [c6, c7, c5] = map[t.accent] || map["#1d4ed8"];
    root.style.setProperty("--blue-600", c6); root.style.setProperty("--blue-700", c7); root.style.setProperty("--blue-500", c5);
    root.style.setProperty("--r", t.radius + "px");
    document.body.classList.toggle("cta-blue", t.ctaColor === "blue");
  }, [t.accent, t.radius, t.ctaColor]);

  const pushToast = React.useCallback((msg) => {
    const id = Math.random(); setToasts((x) => [...x, { id, msg }]);
    setTimeout(() => setToasts((x) => x.filter((y) => y.id !== id)), 2600);
  }, []);

  const nav = React.useCallback((name, params = {}) => { setRoute({ name, params }); window.scrollTo({ top: 0, behavior: "instant" }); }, []);
  React.useEffect(() => { window.__shopNav = nav; }, [nav]);

  const addToCart = (id, qty = 1) => {
    setCart((c) => { const ex = c.find((x) => x.id === id); return ex ? c.map((x) => x.id === id ? { ...x, qty: x.qty + qty } : x) : [...c, { id, qty }]; });
    pushToast("Ditambahkan ke keranjang");
  };
  const buyNow = (id, qty = 1) => { setCart((c) => { const ex = c.find((x) => x.id === id); return ex ? c.map((x) => x.id === id ? { ...x, qty } : x) : [...c, { id, qty }]; }); nav(user.loggedIn ? "checkout" : "login", { next: "checkout" }); };
  const setQtyInCart = (id, qty) => setCart((c) => c.map((x) => x.id === id ? { ...x, qty } : x));
  const removeFromCart = (id) => setCart((c) => c.filter((x) => x.id !== id));
  const toggleWish = (id) => { setWishlist((w) => { const on = w.includes(id); pushToast(on ? "Dihapus dari wishlist" : "Disimpan ke wishlist"); const nw = on ? w.filter((x) => x !== id) : [...w, id]; setUser((u) => ({ ...u, wishCount: nw.length })); return nw; }); };
  const login = () => setUser((u) => ({ ...u, loggedIn: true }));
  const logout = () => setUser((u) => ({ ...u, loggedIn: false }));
  const placeOrder = (total) => { const inv = "INV/2026/0" + Math.floor(600 + Math.random() * 99); setCart([]); setUser((u) => ({ ...u, points: u.points + Math.floor(total / 10000) })); nav("success", { inv, total }); };
  const openChat = () => setChatOpen(true);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const ctx = { route, nav, cart, cartCount, wishlist, user, chatOpen, setChatOpen, openChat, pushToast, addToCart, buyNow, setQtyInCart, removeFromCart, toggleWish, login, logout, placeOrder };

  const authScreen = ["login", "register", "forgot"].includes(route.name);

  return (
    <ShopCtx.Provider value={ctx}>
      <div className="app-root">
        <Header />
        <main style={{ flex: 1, background: authScreen ? "var(--bg)" : "var(--bg)" }}><Router /></main>
        <Footer />
      </div>
      <ChatWidget />
      <div className="toast-wrap">{toasts.map((t) => <div key={t.id} className="toast"><span className="tk"><Icon name="checkCircle" size={18} /></span>{t.msg}</div>)}</div>

      <TweaksPanel>
        <TweakSection label="Beranda" />
        <TweakRadio label="Gaya beranda" value={t.homeStyle} options={["carousel", "editorial", "energik"]} onChange={(v) => { setTweak("homeStyle", v); nav("home"); }} />
        <TweakSection label="Tema" />
        <TweakColor label="Warna aksen" value={t.accent} options={["#1d4ed8", "#0f766e", "#4f46e5", "#0e7490"]} onChange={(v) => setTweak("accent", v)} />
        <TweakRadio label="Tombol CTA" value={t.ctaColor} options={["amber", "blue"]} onChange={(v) => setTweak("ctaColor", v)} />
        <TweakSlider label="Lengkung sudut" value={t.radius} min={6} max={18} step={1} unit="px" onChange={(v) => setTweak("radius", v)} />
      </TweaksPanel>
    </ShopCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
