/* ============================================================
   MOBILE SCREENS 2 — Cart · Checkout · Success · Auth · Profile · Poin · Wishlist
   ============================================================ */

/* ================= CART ================= */
function MCart({ platform }) {
  const { nav, cart, setQtyInCart, removeFromCart, user } = useM();
  const sb = platform === "ios" ? 24 : 6;
  const items = cart.map((c) => ({ ...c, p: getProduct(c.id) })).filter((c) => c.p);
  const subtotal = items.reduce((s, c) => s + c.p.price * c.qty, 0);
  if (!items.length) {
    return (<>
      <MTopBar platform={platform} title="Keranjang" />
      <div className="center" style={{ flex: 1, flexDirection: "column", gap: 14, padding: 30 }}>
        <span style={{ width: 80, height: 80, borderRadius: 999, background: "var(--blue-50)", display: "grid", placeItems: "center", color: "var(--blue-400)" }}><Icon name="cart" size={38} /></span>
        <div style={{ fontWeight: 700, fontSize: 17 }}>Keranjang kosong</div>
        <p className="muted" style={{ fontSize: 13.5, textAlign: "center", margin: 0 }}>Yuk temukan gadget impianmu.</p>
        <button className="btn btn-primary" onClick={() => nav("home")}>Mulai Belanja</button>
      </div>
    </>);
  }
  return (<>
    <MTopBar platform={platform} title="Keranjang" action={<span className="muted" style={{ fontSize: 13 }}>{items.length} produk</span>} />
    <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
      <div className="flex aic gap8" style={{ padding: "10px 12px", background: "var(--blue-50)", border: "1px solid var(--blue-100)", borderRadius: 12, fontSize: 12, fontWeight: 600, color: "var(--blue-800)", marginBottom: 12 }}>
        <Icon name="truck" size={18} style={{ color: "var(--blue-600)" }} /> Pesananmu dapat gratis ongkir!
      </div>
      <div className="col gap10">
        {items.map((c) => (
          <div key={c.id} style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 14, padding: 12, display: "flex", gap: 12 }}>
            <MPh cat={c.p.cat} style={{ width: 78, height: 78, borderRadius: 10, flex: "none" }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{c.p.name}</div>
              <div className="price" style={{ fontSize: 15, color: "var(--blue-700)", marginTop: 4 }}>{RP(c.p.price)}</div>
              <div className="flex aic jcb" style={{ marginTop: 6 }}>
                <button onClick={() => removeFromCart(c.id)} style={{ color: "var(--faint)" }}><Icon name="trash" size={17} /></button>
                <div className="flex aic" style={{ border: "1px solid var(--line-2)", borderRadius: 8 }}>
                  <button className="center" style={{ width: 30, height: 30 }} onClick={() => setQtyInCart(c.id, Math.max(1, c.qty - 1))}><Icon name="minus" size={14} /></button>
                  <span className="center tnum" style={{ width: 30, fontWeight: 700, fontSize: 13 }}>{c.qty}</span>
                  <button className="center" style={{ width: 30, height: 30 }} onClick={() => setQtyInCart(c.id, c.qty + 1)}><Icon name="plus" size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div style={{ flex: "none", padding: "12px 16px", paddingBottom: 12 + sb, background: "#fff", borderTop: "1px solid var(--line)" }}>
      <div className="flex aic jcb" style={{ marginBottom: 10 }}>
        <div><div className="muted" style={{ fontSize: 11.5 }}>Total ({items.length})</div><div className="price" style={{ fontSize: 20, color: "var(--blue-700)" }}>{RP(subtotal)}</div></div>
        <div className="flex aic gap6" style={{ fontSize: 11.5, color: "var(--amber-600)", fontWeight: 600 }}><Icon name="coin" size={14} /> +{Math.floor(subtotal / 10000)} poin</div>
      </div>
      <button className="btn btn-amber btn-block" style={{ height: 50 }} onClick={() => nav(user.loggedIn ? "checkout" : "login", { next: "checkout" })}>Checkout <Icon name="arrowR" size={18} /></button>
    </div>
  </>);
}

/* ================= CHECKOUT ================= */
function MCheckout({ platform }) {
  const { nav, cart, user, placeOrder } = useM();
  const sb = platform === "ios" ? 24 : 6;
  const items = cart.map((c) => ({ ...c, p: getProduct(c.id) })).filter((c) => c.p);
  const subtotal = items.reduce((s, c) => s + c.p.price * c.qty, 0);
  const [ship, setShip] = React.useState("reg");
  const [pay, setPay] = React.useState("va");
  const shipCost = ship === "reg" ? 0 : ship === "same" ? 25000 : 18000;
  const total = subtotal + shipCost;
  if (!items.length) { React.useEffect(() => nav("cart"), []); return null; }
  return (<>
    <MTopBar platform={platform} back title="Checkout" onBack={() => nav("cart")} />
    <div style={{ flex: 1, overflowY: "auto", padding: 16 }} className="col gap12">
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 14, padding: 14 }}>
        <div className="flex aic jcb" style={{ marginBottom: 8 }}><div className="flex aic gap8" style={{ fontWeight: 700, fontSize: 14 }}><Icon name="pin" size={18} style={{ color: "var(--blue-600)" }} /> Alamat</div><button style={{ fontSize: 12.5, fontWeight: 600, color: "var(--blue-600)" }}>Ubah</button></div>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{user.name} · {user.phone}</div>
        <p className="muted" style={{ fontSize: 12.5, margin: "4px 0 0", lineHeight: 1.5 }}>Jl. Teknologi Raya No. 88, Cempaka Putih, Jakarta Pusat 10510</p>
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 14, padding: 14 }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>Produk ({items.length})</div>
        <div className="col gap10">{items.map((c) => (
          <div key={c.id} className="flex aic gap10"><MPh cat={c.p.cat} style={{ width: 46, height: 46, borderRadius: 8, flex: "none" }} />
            <div style={{ flex: 1, fontSize: 12.5 }}><div style={{ fontWeight: 600 }}>{c.p.name}</div><div className="muted">{c.qty} × {RP(c.p.price)}</div></div></div>
        ))}</div>
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 14, padding: 14 }}>
        <div className="flex aic gap8" style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}><Icon name="truck" size={18} style={{ color: "var(--blue-600)" }} /> Pengiriman</div>
        <div className="col gap8">{[["reg", "Reguler", "2–4 hari", 0], ["same", "Same Day", "Hari ini", 25000], ["eco", "Hemat", "3–6 hari", 18000]].map(([k, t, s, c]) => (
          <label key={k} className="flex aic jcb" style={{ padding: "10px 12px", border: "1.5px solid", borderColor: ship === k ? "var(--blue-500)" : "var(--line)", borderRadius: 10, background: ship === k ? "var(--blue-50)" : "#fff" }}>
            <div className="flex aic gap8"><input type="radio" checked={ship === k} onChange={() => setShip(k)} style={{ accentColor: "var(--blue-600)" }} /><div><div style={{ fontWeight: 700, fontSize: 13 }}>{t}</div><div className="muted" style={{ fontSize: 11.5 }}>{s}</div></div></div>
            <b style={{ fontSize: 13, color: c === 0 ? "var(--green-600)" : "var(--ink)" }}>{c === 0 ? "GRATIS" : RP(c)}</b>
          </label>
        ))}</div>
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 14, padding: 14 }}>
        <div className="flex aic gap8" style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}><Icon name="wallet" size={18} style={{ color: "var(--blue-600)" }} /> Pembayaran</div>
        <div className="col gap8">{[["va", "Virtual Account", "BCA, Mandiri, BNI"], ["ewallet", "E-Wallet", "GoPay, OVO, Dana"], ["card", "Kartu Kredit", "Cicilan 0%"]].map(([k, t, s]) => (
          <label key={k} className="flex aic gap10" style={{ padding: "10px 12px", border: "1.5px solid", borderColor: pay === k ? "var(--blue-500)" : "var(--line)", borderRadius: 10, background: pay === k ? "var(--blue-50)" : "#fff" }}>
            <input type="radio" checked={pay === k} onChange={() => setPay(k)} style={{ accentColor: "var(--blue-600)" }} /><div><div style={{ fontWeight: 700, fontSize: 13 }}>{t}</div><div className="muted" style={{ fontSize: 11.5 }}>{s}</div></div>
          </label>
        ))}</div>
      </div>
    </div>
    <div style={{ flex: "none", padding: "12px 16px", paddingBottom: 12 + sb, background: "#fff", borderTop: "1px solid var(--line)" }}>
      <div className="flex aic jcb" style={{ fontSize: 13, marginBottom: 4 }}><span className="muted">Subtotal</span><Money v={subtotal} /></div>
      <div className="flex aic jcb" style={{ fontSize: 13, marginBottom: 8 }}><span className="muted">Ongkir</span><b style={{ color: shipCost === 0 ? "var(--green-600)" : "var(--ink)" }}>{shipCost === 0 ? "GRATIS" : RP(shipCost)}</b></div>
      <div className="flex aic jcb" style={{ marginBottom: 10 }}><b>Total</b><span className="price" style={{ fontSize: 20, color: "var(--blue-700)" }}>{RP(total)}</span></div>
      <button className="btn btn-primary btn-block" style={{ height: 50 }} onClick={() => placeOrder(total)}>Bayar Sekarang</button>
    </div>
  </>);
}

function MSuccess({ platform, params }) {
  const { nav } = useM();
  return (
    <div className="center" style={{ flex: 1, flexDirection: "column", padding: 28, textAlign: "center" }}>
      <div className="center" style={{ width: 90, height: 90, borderRadius: 999, background: "var(--green-50)", marginBottom: 18 }}><Icon name="checkCircle" size={50} style={{ color: "var(--green-500)" }} /></div>
      <h2 style={{ fontFamily: "var(--ff-display)", fontSize: 22, margin: 0 }}>Pesanan Berhasil!</h2>
      <p className="muted" style={{ fontSize: 13.5, marginTop: 8 }}>Terima kasih telah berbelanja. Pesananmu sedang diproses.</p>
      <div style={{ background: "var(--bg)", borderRadius: 14, padding: 16, margin: "20px 0", width: "100%", textAlign: "left" }}>
        <div className="flex jcb" style={{ fontSize: 13, marginBottom: 8 }}><span className="muted">No. Pesanan</span><b className="tnum">{params.inv}</b></div>
        <div className="flex jcb" style={{ fontSize: 13, marginBottom: 8 }}><span className="muted">Total</span><b className="price">{RP(params.total || 0)}</b></div>
        <div className="flex jcb" style={{ fontSize: 13 }}><span className="muted">Poin</span><b style={{ color: "var(--amber-600)" }}>+{Math.floor((params.total || 0) / 10000)}</b></div>
      </div>
      <div className="flex gap10" style={{ width: "100%" }}>
        <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => nav("home")}>Beranda</button>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => nav("akun")}>Pesanan</button>
      </div>
    </div>
  );
}

/* ================= AUTH (login + register) ================= */
function MAuth({ platform, params }) {
  const { nav, login } = useM();
  const [mode, setMode] = React.useState(params.mode || "login");
  const [step, setStep] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const sb = platform === "ios" ? 24 : 6;
  const isReg = mode === "register";

  const Hero = (
    <div style={{ background: "linear-gradient(150deg,#0e1526,#18306b 70%,#1d4ed8)", padding: platform === "ios" ? "60px 24px 28px" : "26px 24px 28px", color: "#fff", position: "relative", overflow: "hidden", flex: "none" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(400px 200px at 90% 110%, rgba(245,173,28,.25), transparent)" }}></div>
      <div style={{ position: "relative" }}>
        <div className="logo"><div className="logo-mark" style={{ width: 38, height: 38 }}><span>S</span></div><div className="logo-text"><b style={{ color: "#fff" }}>Sinar Lestari</b><small>Elektronik</small></div></div>
        <h2 style={{ fontFamily: "var(--ff-display)", fontSize: 24, marginTop: 22, marginBottom: 0, lineHeight: 1.2 }}>{isReg ? "Buat akun baru" : "Selamat datang\nkembali 👋"}</h2>
        <p style={{ color: "rgba(255,255,255,.78)", fontSize: 13.5, marginTop: 8 }}>{isReg ? "Daftar & nikmati poin, promo, gratis ongkir." : "Masuk untuk lanjut belanja."}</p>
      </div>
    </div>
  );

  // register OTP step
  if (isReg && step > 0 && step < 3) {
    const isWa = step === 2;
    return (<>
      {Hero}
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        <MStepDots step={step} />
        <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 19, marginTop: 18 }}>{isWa ? "Verifikasi WhatsApp" : "Verifikasi Email"}</h3>
        <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.6 }}>Masukkan 6 digit kode yang kami kirim ke {isWa ? "WhatsApp" : "email"}mu.</p>
        <div className="flex aic gap8" style={{ margin: "12px 0", padding: "10px 12px", background: isWa ? "#e9f8ef" : "var(--blue-50)", borderRadius: 10, fontSize: 12, color: isWa ? "var(--green-600)" : "var(--blue-700)", fontWeight: 600 }}><Icon name={isWa ? "whatsapp" : "mail"} size={16} /> Demo: kode <b style={{ fontFamily: "var(--ff-mono)" }}>123456</b></div>
        <MOtp />
        <button className="btn btn-primary btn-block" style={{ marginTop: 20, height: 50 }} onClick={() => setStep(step + 1 > 2 ? (login(), nav("akun")) : step + 1)}>{step === 2 ? "Selesai" : "Verifikasi"}</button>
        <button className="btn btn-ghost btn-block" style={{ marginTop: 10 }} onClick={() => setStep(step - 1)}>Kembali</button>
      </div>
    </>);
  }

  return (<>
    {Hero}
    <div style={{ flex: 1, overflowY: "auto", padding: 24, paddingBottom: 24 + sb }}>
      {isReg && <MStepDots step={0} />}
      <div className="col gap14" style={{ marginTop: isReg ? 18 : 6 }}>
        {isReg && <div className="field"><label>Nama Lengkap</label><div className="input-group"><span className="ig-icon"><Icon name="user" size={18} /></span><input className="input" placeholder="Nama lengkap" defaultValue="" /></div></div>}
        <div className="field"><label>Email</label><div className="input-group"><span className="ig-icon"><Icon name="mail" size={18} /></span><input className="input" placeholder="kamu@email.com" defaultValue={isReg ? "" : "budi@email.com"} /></div></div>
        {isReg && <div className="field"><label>No. WhatsApp</label><div className="input-group"><span className="ig-icon"><Icon name="whatsapp" size={18} /></span><input className="input" placeholder="08xxxxxxxxxx" /></div></div>}
        <div className="field">
          {!isReg && <div className="flex jcb aic"><label>Kata Sandi</label><a style={{ fontSize: 12, color: "var(--blue-600)", fontWeight: 600 }} onClick={() => nav("forgot")}>Lupa sandi?</a></div>}
          {isReg && <label>Kata Sandi</label>}
          <div className="input-group"><span className="ig-icon"><Icon name="lock" size={18} /></span>
            <input className="input" type={show ? "text" : "password"} placeholder="••••••••" defaultValue={isReg ? "" : "password"} style={{ paddingRight: 44 }} />
            <button onClick={() => setShow(!show)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--faint)" }}><Icon name={show ? "eyeOff" : "eye"} size={18} /></button></div>
        </div>
        <button className="btn btn-primary btn-block" style={{ height: 50, marginTop: 4 }} onClick={() => isReg ? setStep(1) : (login(), nav(params.next || "akun"))}>{isReg ? "Lanjutkan" : "Masuk"}</button>
        <div className="flex aic gap10"><hr className="hr" style={{ flex: 1 }} /><span className="muted" style={{ fontSize: 12 }}>atau</span><hr className="hr" style={{ flex: 1 }} /></div>
        <div className="flex gap10"><button className="btn btn-ghost" style={{ flex: 1 }}>Google</button><button className="btn btn-ghost" style={{ flex: 1 }}>Apple</button></div>
        <p className="center muted" style={{ fontSize: 13, textAlign: "center" }}>{isReg ? "Sudah punya akun? " : "Belum punya akun? "}
          <a onClick={() => { setMode(isReg ? "login" : "register"); setStep(0); }} style={{ color: "var(--blue-600)", fontWeight: 700 }}>{isReg ? "Masuk" : "Daftar"}</a></p>
      </div>
    </div>
  </>);
}
function MStepDots({ step }) {
  const labels = ["Akun", "Email", "WhatsApp"];
  return <div className="flex aic" style={{ gap: 6 }}>{labels.map((l, i) => (
    <React.Fragment key={l}>
      <div className="flex aic gap6"><span className="center" style={{ width: 24, height: 24, borderRadius: 999, fontSize: 11, fontWeight: 700, background: i < step ? "var(--green-500)" : i === step ? "var(--blue-600)" : "var(--bg-2)", color: i <= step ? "#fff" : "var(--faint)" }}>{i < step ? <Icon name="check" size={13} /> : i + 1}</span>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: i === step ? "var(--ink)" : "var(--faint)" }}>{l}</span></div>
      {i < 2 && <div style={{ flex: 1, height: 2, background: i < step ? "var(--green-500)" : "var(--line)" }} />}
    </React.Fragment>
  ))}</div>;
}
function MOtp() {
  const [otp, setOtp] = React.useState(["", "", "", "", "", ""]);
  const refs = React.useRef([]);
  return <div className="flex gap8" style={{ justifyContent: "space-between" }}>{otp.map((d, i) => (
    <input key={i} ref={(el) => (refs.current[i] = el)} value={d} inputMode="numeric" maxLength={1}
      onChange={(e) => { const v = e.target.value.replace(/\D/g, "").slice(-1); const n = [...otp]; n[i] = v; setOtp(n); if (v && i < 5) refs.current[i + 1]?.focus(); }}
      onKeyDown={(e) => { if (e.key === "Backspace" && !d && i > 0) refs.current[i - 1]?.focus(); }}
      className="input tnum" style={{ width: 46, height: 56, textAlign: "center", fontSize: 22, fontWeight: 700, padding: 0 }} />
  ))}</div>;
}

/* ================= PROFILE / AKUN ================= */
function MAkun({ platform }) {
  const { nav, user, logout, wishlist, login } = useM();
  const [sub, setSub] = React.useState("menu");
  if (!user.loggedIn) {
    return (<>
      <MTopBar platform={platform} title="Akun" />
      <div className="center" style={{ flex: 1, flexDirection: "column", gap: 14, padding: 30 }}>
        <span style={{ width: 80, height: 80, borderRadius: 999, background: "var(--blue-50)", display: "grid", placeItems: "center", color: "var(--blue-400)" }}><Icon name="user" size={38} /></span>
        <div style={{ fontWeight: 700, fontSize: 17 }}>Belum masuk</div>
        <p className="muted" style={{ fontSize: 13.5, textAlign: "center", margin: 0 }}>Masuk untuk lihat profil, pesanan & poinmu.</p>
        <button className="btn btn-primary btn-block" onClick={() => nav("login")}>Masuk</button>
        <button className="btn btn-ghost btn-block" onClick={() => nav("login", { mode: "register" })}>Daftar Akun</button>
      </div>
    </>);
  }
  if (sub === "poin") return <MPoin platform={platform} onBack={() => setSub("menu")} />;
  const menu = [
    { ic: "box", t: "Pesanan Saya", s: "Lacak & riwayat", act: () => setSub("orders") },
    { ic: "heart", t: "Wishlist", s: wishlist.length + " produk", act: () => nav("wishlist") },
    { ic: "coin", t: "Poin & Reward", s: user.points.toLocaleString("id-ID") + " poin", act: () => setSub("poin") },
    { ic: "pin", t: "Alamat", s: "Kelola alamat kirim", act: () => {} },
    { ic: "wallet", t: "Metode Pembayaran", s: "Kartu & e-wallet", act: () => {} },
    { ic: "headset", t: "Pusat Bantuan", s: "FAQ & kontak", act: () => {} },
  ];
  if (sub === "orders") return <MOrders platform={platform} onBack={() => setSub("menu")} />;
  return (<>
    <div style={{ flex: 1, overflowY: "auto" }}>
      {/* gold header */}
      <div style={{ background: "linear-gradient(120deg,#0e1526,#18306b 70%,#1d4ed8)", padding: platform === "ios" ? "58px 20px 24px" : "20px 20px 24px", color: "#fff", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(400px 200px at 95% 120%, rgba(245,173,28,.28), transparent)" }}></div>
        <div className="flex aic gap12" style={{ position: "relative" }}>
          <span style={{ width: 56, height: 56, borderRadius: 999, background: "rgba(255,255,255,.16)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 20 }}>{user.avatar}</span>
          <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 17 }}>{user.name}</div><span className="badge badge-amber" style={{ height: 19 }}><Icon name="coin" size={11} /> Gold Member</span></div>
          <button style={{ color: "rgba(255,255,255,.8)" }}><Icon name="edit" size={20} /></button>
        </div>
        {/* points card */}
        <div onClick={() => setSub("poin")} style={{ position: "relative", marginTop: 16, background: "rgba(255,255,255,.12)", borderRadius: 14, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div><div style={{ fontSize: 11.5, color: "rgba(255,255,255,.75)" }}>Poin Saya</div><div style={{ fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: 24 }}>{user.points.toLocaleString("id-ID")}</div></div>
          <button className="btn btn-amber btn-sm">Tukar Poin</button>
        </div>
      </div>
      {/* quick order status */}
      <div className="flex" style={{ padding: 16, gap: 8 }}>
        {[["box", "Diproses", 0], ["truck", "Dikirim", 1], ["checkCircle", "Selesai", 2], ["star2", "Ulasan", 1]].map(([ic, t, n]) => (
          <button key={t} className="center" style={{ flex: 1, flexDirection: "column", gap: 6, padding: "12px 4px", background: "#fff", border: "1px solid var(--line)", borderRadius: 12, position: "relative" }} onClick={() => setSub("orders")}>
            <Icon name={ic} size={22} style={{ color: "var(--blue-600)" }} />
            <span style={{ fontSize: 11, fontWeight: 600 }}>{t}</span>
            {n > 0 && <span style={{ position: "absolute", top: 8, right: 14, minWidth: 16, height: 16, borderRadius: 8, background: "var(--red-500)", color: "#fff", fontSize: 10, fontWeight: 700, display: "grid", placeItems: "center", padding: "0 4px" }}>{n}</span>}
          </button>
        ))}
      </div>
      {/* menu */}
      <div style={{ padding: "0 16px 16px" }}>
        <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 14, overflow: "hidden" }}>
          {menu.map((m, i) => (
            <button key={m.t} onClick={m.act} className="flex aic gap12" style={{ width: "100%", padding: "14px 16px", borderBottom: i < menu.length - 1 ? "1px solid var(--line)" : "none", textAlign: "left" }}>
              <span style={{ width: 38, height: 38, borderRadius: 10, background: "var(--blue-50)", display: "grid", placeItems: "center", color: "var(--blue-600)", flex: "none" }}><Icon name={m.ic} size={19} /></span>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 14 }}>{m.t}</div><div className="muted" style={{ fontSize: 12 }}>{m.s}</div></div>
              <Icon name="chevR" size={18} style={{ color: "var(--faint)" }} />
            </button>
          ))}
        </div>
        <button onClick={logout} className="btn btn-ghost btn-block" style={{ marginTop: 14, color: "var(--red-600)" }}><Icon name="logout" size={18} /> Keluar</button>
      </div>
    </div>
  </>);
}

function MOrders({ platform, onBack }) {
  const { nav } = useM();
  return (<>
    <MTopBar platform={platform} back title="Pesanan Saya" onBack={onBack} />
    <div style={{ flex: 1, overflowY: "auto", padding: 16 }} className="col gap12">
      {ORDERS.map((o) => {
        const f = getProduct(o.items[0]); const tone = { blue: "badge-blue", green: "badge-green" }[o.statusTone];
        return (
          <div key={o.id} style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 14, padding: 14 }}>
            <div className="flex aic jcb" style={{ paddingBottom: 10, borderBottom: "1px solid var(--line)", marginBottom: 10 }}>
              <span className="tnum" style={{ fontSize: 12, fontWeight: 700 }}>{o.id}</span><span className={"badge " + tone}>{o.status}</span>
            </div>
            <div className="flex aic gap10"><MPh cat={f.cat} style={{ width: 50, height: 50, borderRadius: 8, flex: "none" }} />
              <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600 }}>{f.name}</div><div className="muted" style={{ fontSize: 12 }}>{o.date} · {RP(o.total)}</div></div></div>
            <div className="flex gap8" style={{ marginTop: 12 }}>
              {o.status === "Dikirim" && <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}><Icon name="truck" size={15} /> Lacak</button>}
              <button className="btn btn-soft btn-sm" style={{ flex: 1 }} onClick={() => nav("detail", { id: o.items[0] })}>Beli Lagi</button>
            </div>
          </div>
        );
      })}
    </div>
  </>);
}

function MPoin({ platform, onBack }) {
  const { user, pushToast } = useM();
  const rewards = [["Voucher Rp25rb", 250, "tag"], ["Voucher Rp50rb", 500, "tag"], ["Gratis Ongkir", 150, "truck"], ["Voucher Rp100rb", 1000, "gift"]];
  const history = [["Pembelian INV/0512", "+849", true], ["Ulasan disetujui", "+50", true], ["Tukar voucher", "−500", false], ["Bonus member baru", "+100", true]];
  return (<>
    <MTopBar platform={platform} back title="Poin & Reward" onBack={onBack} />
    <div style={{ flex: 1, overflowY: "auto", padding: 16 }} className="col gap14">
      <div style={{ background: "linear-gradient(120deg,#bb710a,#f5ad1c)", borderRadius: 16, padding: 18, color: "#3a1500", position: "relative", overflow: "hidden" }}>
        <Icon name="coin" size={90} style={{ position: "absolute", right: -8, top: -10, opacity: .18 }} />
        <div style={{ position: "relative" }}><div className="flex aic gap6" style={{ fontWeight: 700, fontSize: 12 }}><Icon name="coin" size={16} /> TOTAL POIN</div>
          <div style={{ fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: 38, lineHeight: 1, marginTop: 6 }}>{user.points.toLocaleString("id-ID")}</div>
          <div style={{ fontSize: 11.5, fontWeight: 600, marginTop: 8 }}>320 poin kadaluarsa 31 Des 2026</div></div>
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Tukar Poin</div>
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {rewards.map(([n, c, ic]) => { const can = user.points >= c; return (
            <div key={n} style={{ background: "#fff", border: "1px dashed var(--line-2)", borderRadius: 12, padding: 14, textAlign: "center", opacity: can ? 1 : .6 }}>
              <span style={{ width: 40, height: 40, borderRadius: 11, background: "var(--amber-50)", display: "grid", placeItems: "center", color: "var(--amber-500)", margin: "0 auto 8px" }}><Icon name={ic} size={20} /></span>
              <div style={{ fontWeight: 700, fontSize: 12.5 }}>{n}</div>
              <div className="flex aic gap4 center" style={{ margin: "4px 0 10px", color: "var(--amber-600)", fontWeight: 700, fontSize: 11.5 }}><Icon name="coin" size={12} /> {c}</div>
              <button className="btn btn-amber btn-sm btn-block" disabled={!can} onClick={() => pushToast(n + " ditukar!")}>{can ? "Tukar" : "Kurang"}</button>
            </div>
          ); })}
        </div>
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Riwayat Poin</div>
        <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 14, overflow: "hidden" }}>
          {history.map(([t, v, pos], i) => (
            <div key={i} className="flex aic jcb" style={{ padding: "12px 14px", borderBottom: i < history.length - 1 ? "1px solid var(--line)" : "none" }}>
              <div className="flex aic gap10"><span style={{ width: 32, height: 32, borderRadius: 999, background: pos ? "var(--green-50)" : "var(--red-50)", display: "grid", placeItems: "center", color: pos ? "var(--green-600)" : "var(--red-600)" }}><Icon name={pos ? "plus" : "minus"} size={15} /></span>
                <span style={{ fontWeight: 600, fontSize: 13 }}>{t}</span></div>
              <b className="tnum" style={{ color: pos ? "var(--green-600)" : "var(--red-600)" }}>{v}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>);
}

/* ================= WISHLIST ================= */
function MWishlist({ platform }) {
  const { nav, wishlist } = useM();
  const items = wishlist.map(getProduct).filter(Boolean);
  return (<>
    <MTopBar platform={platform} title="Wishlist" action={<span className="muted" style={{ fontSize: 13 }}>{items.length}</span>} />
    <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
      {items.length ? <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}>{items.map((p) => <MProductCard key={p.id} p={p} onOpen={(id) => nav("detail", { id })} />)}</div>
        : <div className="center" style={{ flexDirection: "column", gap: 12, padding: "60px 0" }}><span style={{ width: 76, height: 76, borderRadius: 999, background: "var(--red-50)", display: "grid", placeItems: "center", color: "#f08a8a" }}><Icon name="heart" size={34} /></span><div style={{ fontWeight: 700 }}>Wishlist kosong</div><p className="muted" style={{ fontSize: 13, textAlign: "center", margin: 0 }}>Tekan ikon hati untuk menyimpan produk.</p><button className="btn btn-primary" onClick={() => nav("home")}>Jelajahi</button></div>}
    </div>
  </>);
}

Object.assign(window, { MCart, MCheckout, MSuccess, MAuth, MAkun, MOrders, MPoin, MWishlist, MStepDots, MOtp });
