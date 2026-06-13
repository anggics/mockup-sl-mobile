/* ============================================================
   MOBILE APP — shell, router, state, chat, dual-device showcase
   ============================================================ */

/* ---- compact chat sheet ---- */
function MChat({ platform, onClose }) {
  const [msgs, setMsgs] = React.useState([{ me: false, t: "Halo! Selamat datang di Sinar Lestari 👋 Ada yang bisa dibantu?" }]);
  const [txt, setTxt] = React.useState("");
  const ref = React.useRef(null);
  React.useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, [msgs]);
  const send = (t) => { const x = (t || txt).trim(); if (!x) return; setMsgs((m) => [...m, { me: true, t: x }]); setTxt(""); setTimeout(() => setMsgs((m) => [...m, { me: false, t: "Tentu kak! Tim kami siap membantu 😊" }]), 900); };
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 80, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(10,20,40,.4)" }} />
      <div className="fade-up" style={{ position: "relative", background: "#fff", borderRadius: "20px 20px 0 0", height: "82%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div className="flex aic gap10" style={{ padding: "16px 18px", background: "linear-gradient(120deg,#18306b,#1d4ed8)", color: "#fff" }}>
          <span style={{ width: 38, height: 38, borderRadius: 999, background: "rgba(255,255,255,.16)", display: "grid", placeItems: "center" }}><Icon name="headset" size={20} /></span>
          <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 14 }}>Admin Sinar Lestari</div><div style={{ fontSize: 11, color: "rgba(255,255,255,.8)" }}>● Online · ±2 menit</div></div>
          <button onClick={onClose} style={{ color: "#fff" }}><Icon name="x" size={20} /></button>
        </div>
        <div ref={ref} style={{ flex: 1, overflowY: "auto", padding: 14, background: "var(--bg)", display: "flex", flexDirection: "column", gap: 8 }}>
          {msgs.map((m, i) => <div key={i} style={{ alignSelf: m.me ? "flex-end" : "flex-start", maxWidth: "78%", background: m.me ? "var(--blue-600)" : "#fff", color: m.me ? "#fff" : "var(--ink)", border: m.me ? "none" : "1px solid var(--line)", borderRadius: m.me ? "14px 4px 14px 14px" : "4px 14px 14px 14px", padding: "10px 13px", fontSize: 13, lineHeight: 1.5 }}>{m.t}</div>)}
        </div>
        <div style={{ padding: "10px 14px", paddingBottom: platform === "ios" ? 28 : 14, borderTop: "1px solid var(--line)" }}>
          <div className="flex gap8" style={{ overflowX: "auto", paddingBottom: 8 }}>{["Cek stok", "Garansi", "Promo"].map((q) => <button key={q} className="chip" style={{ height: 30, fontSize: 12, flex: "none" }} onClick={() => send(q)}>{q}</button>)}</div>
          <form className="flex gap8 aic" onSubmit={(e) => { e.preventDefault(); send(); }}>
            <input className="input" value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Tulis pesan…" style={{ height: 42, borderRadius: 999 }} />
            <button type="submit" className="center" style={{ width: 42, height: 42, borderRadius: 999, background: "var(--blue-600)", color: "#fff", flex: "none" }}><Icon name="send" size={18} /></button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ---- the app that fills a device ---- */
function MobileApp({ platform }) {
  const [route, setRoute] = React.useState({ name: "home", params: {} });
  const [cart, setCart] = React.useState([{ id: "p1", qty: 1 }, { id: "p3", qty: 1 }]);
  const [wishlist, setWishlist] = React.useState(["p9", "p5"]);
  const [user, setUser] = React.useState({ loggedIn: false, name: "Budi Santoso", avatar: "BS", email: "budi@email.com", phone: "0812-3456-7890", points: 1840 });
  const [chatOpen, setChatOpen] = React.useState(false);
  const [toasts, setToasts] = React.useState([]);
  const scrollRef = React.useRef(null);

  const pushToast = React.useCallback((msg) => { const id = Math.random(); setToasts((x) => [...x, { id, msg }]); setTimeout(() => setToasts((x) => x.filter((y) => y.id !== id)), 2200); }, []);
  const nav = React.useCallback((name, params = {}) => { setRoute({ name, params }); }, []);
  const setTab = (id) => nav(id);
  const addToCart = (id, qty = 1) => { setCart((c) => { const e = c.find((x) => x.id === id); return e ? c.map((x) => x.id === id ? { ...x, qty: x.qty + qty } : x) : [...c, { id, qty }]; }); pushToast("Ditambahkan ke keranjang"); };
  const buyNow = (id, qty = 1) => { setCart((c) => { const e = c.find((x) => x.id === id); return e ? c : [...c, { id, qty }]; }); nav(user.loggedIn ? "checkout" : "login", { next: "checkout" }); };
  const setQtyInCart = (id, qty) => setCart((c) => c.map((x) => x.id === id ? { ...x, qty } : x));
  const removeFromCart = (id) => setCart((c) => c.filter((x) => x.id !== id));
  const toggleWish = (id) => setWishlist((w) => { const on = w.includes(id); pushToast(on ? "Dihapus dari wishlist" : "Disimpan ke wishlist"); return on ? w.filter((x) => x !== id) : [...w, id]; });
  const login = () => { setUser((u) => ({ ...u, loggedIn: true })); pushToast("Berhasil masuk"); };
  const logout = () => { setUser((u) => ({ ...u, loggedIn: false })); nav("home"); pushToast("Kamu telah keluar"); };
  const placeOrder = (total) => { const inv = "INV/2026/0" + Math.floor(600 + Math.random() * 99); setCart([]); setUser((u) => ({ ...u, points: u.points + Math.floor(total / 10000) })); nav("success", { inv, total }); };
  const openChat = () => setChatOpen(true);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const ctx = { route, nav, setTab, cart, cartCount, wishlist, wishCount: wishlist.length, user, addToCart, buyNow, setQtyInCart, removeFromCart, toggleWish, login, logout, placeOrder, openChat, pushToast };

  // current tab for bottom bar
  const r = route.name;
  const tabMap = { home: "home", cat: "home", search: "home", flash: "home", detail: "home", wishlist: "wishlist", cart: "cart", checkout: "cart", success: "cart", akun: "akun", login: "akun", forgot: "akun", poin: "akun" };
  ctx.tab = tabMap[r] || "home";
  const showTabBar = ["home", "wishlist", "cart", "akun"].includes(r);

  React.useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [r, route.params.id]);

  let Screen;
  if (r === "home") Screen = <MHome platform={platform} />;
  else if (r === "cat") Screen = <MCategory platform={platform} params={route.params} />;
  else if (r === "search") Screen = <MCategory platform={platform} params={{ ...route.params, focus: true }} />;
  else if (r === "flash") Screen = <MCategory platform={platform} params={{ flash: true }} />;
  else if (r === "detail") Screen = <MDetail platform={platform} params={route.params} />;
  else if (r === "cart") Screen = <MCart platform={platform} />;
  else if (r === "checkout") Screen = <MCheckout platform={platform} />;
  else if (r === "success") Screen = <MSuccess platform={platform} params={route.params} />;
  else if (r === "login") Screen = <MAuth platform={platform} params={{ mode: route.params.mode || "login", next: route.params.next }} />;
  else if (r === "forgot") Screen = <MForgot platform={platform} />;
  else if (r === "wishlist") Screen = <MWishlist platform={platform} />;
  else if (r === "akun") Screen = <MAkun platform={platform} />;
  else Screen = <MHome platform={platform} />;

  return (
    <MShopCtx.Provider value={ctx}>
      <div ref={scrollRef} className="mobile-app" style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--bg)", position: "relative", overflow: "hidden" }}>
        {Screen}
        {showTabBar && <MTabBar platform={platform} />}
        {chatOpen && <MChat platform={platform} onClose={() => setChatOpen(false)} />}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: platform === "ios" ? 90 : 80, display: "flex", flexDirection: "column", gap: 8, alignItems: "center", zIndex: 90, pointerEvents: "none" }}>
          {toasts.map((t) => <div key={t.id} className="toast" style={{ fontSize: 12.5, padding: "10px 16px" }}><span className="tk"><Icon name="checkCircle" size={16} /></span>{t.msg}</div>)}
        </div>
      </div>
    </MShopCtx.Provider>
  );
}

/* ---- minimal forgot password ---- */
function MForgot({ platform }) {
  const { nav, pushToast } = useM();
  const [stage, setStage] = React.useState(0);
  return (<>
    <MTopBar platform={platform} back title="Lupa Sandi" onBack={() => nav("login")} />
    <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
      {stage === 0 && <>
        <span style={{ width: 56, height: 56, borderRadius: 14, background: "var(--blue-50)", display: "grid", placeItems: "center", color: "var(--blue-600)" }}><Icon name="lock" size={26} /></span>
        <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 20, marginTop: 14 }}>Reset kata sandi</h3>
        <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.6 }}>Masukkan email terdaftar, kami kirim kode verifikasi.</p>
        <div className="field" style={{ marginTop: 16 }}><label>Email</label><div className="input-group"><span className="ig-icon"><Icon name="mail" size={18} /></span><input className="input" placeholder="kamu@email.com" /></div></div>
        <button className="btn btn-primary btn-block" style={{ marginTop: 18, height: 50 }} onClick={() => setStage(1)}>Kirim Kode</button>
      </>}
      {stage === 1 && <>
        <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 20 }}>Cek email kamu</h3>
        <p className="muted" style={{ fontSize: 13.5 }}>Masukkan 6 digit kode. Demo: <b style={{ fontFamily: "var(--ff-mono)" }}>123456</b></p>
        <div style={{ marginTop: 14 }}><MOtp /></div>
        <button className="btn btn-primary btn-block" style={{ marginTop: 18, height: 50 }} onClick={() => setStage(2)}>Verifikasi</button>
      </>}
      {stage === 2 && <>
        <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 20 }}>Buat sandi baru</h3>
        <div className="field" style={{ marginTop: 14 }}><label>Sandi Baru</label><div className="input-group"><span className="ig-icon"><Icon name="lock" size={18} /></span><input className="input" type="password" placeholder="Min. 8 karakter" /></div></div>
        <div className="field" style={{ marginTop: 12 }}><label>Konfirmasi</label><div className="input-group"><span className="ig-icon"><Icon name="lock" size={18} /></span><input className="input" type="password" placeholder="Ulangi sandi" /></div></div>
        <button className="btn btn-primary btn-block" style={{ marginTop: 18, height: 50 }} onClick={() => { pushToast("Sandi berhasil diubah"); nav("login"); }}>Simpan Sandi</button>
      </>}
    </div>
  </>);
}

/* ---- dual-device showcase ---- */
function MobileShowcase() {
  const ref = React.useRef(null);
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    const fit = () => {
      const totalW = 402 + 412 + 64; // two devices + gap
      const totalH = 892 + 90;       // tallest device + labels
      const s = Math.min(1, (window.innerWidth - 60) / totalW, (window.innerHeight - 150) / totalH);
      setScale(s);
    };
    fit(); window.addEventListener("resize", fit); return () => window.removeEventListener("resize", fit);
  }, []);
  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(1200px 600px at 50% -10%, #eaf0fb, #f5f7fa 60%)", display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 20px 40px" }}>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div className="logo" style={{ justifyContent: "center" }}><div className="logo-mark"><span>S</span></div><div className="logo-text"><b>Sinar Lestari Elektronik</b><small>Elektronik</small></div></div>
        <h1 style={{ fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: 24, marginTop: 14, marginBottom: 4 }}>Aplikasi Mobile — Prototype Interaktif</h1>
        <p className="muted" style={{ fontSize: 14, margin: 0 }}>iOS &amp; Android · klik dan jelajahi langsung di kedua perangkat</p>
      </div>
      <div ref={ref} style={{ transform: `scale(${scale})`, transformOrigin: "top center", display: "flex", gap: 64, alignItems: "flex-start", marginTop: 18 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <IOSDevice><MobileApp platform="ios" /></IOSDevice>
          <div className="flex aic gap8" style={{ fontWeight: 700, fontSize: 15, color: "var(--slate)" }}><AppleMark /> iOS</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <AndroidDevice><MobileApp platform="android" /></AndroidDevice>
          <div className="flex aic gap8" style={{ fontWeight: 700, fontSize: 15, color: "var(--slate)" }}><AndroidMark /> Android</div>
        </div>
      </div>
      <a href="Sinar Lestari Elektronik.html" style={{ marginTop: 24, fontSize: 13.5, fontWeight: 600, color: "var(--blue-600)", display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="chevL" size={16} /> Lihat versi Web Desktop</a>
    </div>
  );
}
function AppleMark() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.6c0-2.4 1.9-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.2 0 2-1.1 2.8-2.2.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.7zM14.2 5.6c.6-.8 1.1-1.9 1-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2-.5 2.7-1.3z"/></svg>; }
function AndroidMark() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 9v8a1 1 0 001 1h1v3a1 1 0 002 0v-3h2v3a1 1 0 002 0v-3h1a1 1 0 001-1V9H6zM4 9a1 1 0 00-1 1v5a1 1 0 002 0v-5a1 1 0 00-1-1zm16 0a1 1 0 00-1 1v5a1 1 0 002 0v-5a1 1 0 00-1-1zM15.5 3l1-1.7a.3.3 0 00-.5-.3l-1.1 1.8a6 6 0 00-5.8 0L8 1a.3.3 0 00-.5.3l1 1.7A5.3 5.3 0 006 7.5h12c0-1.9-1-3.5-2.5-4.5zM9.5 5.8a.7.7 0 110-1.4.7.7 0 010 1.4zm5 0a.7.7 0 110-1.4.7.7 0 010 1.4z"/></svg>; }

Object.assign(window, { MobileApp, MChat, MForgot, MobileShowcase, AppleMark, AndroidMark });
