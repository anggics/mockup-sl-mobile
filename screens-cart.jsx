/* ============================================================
   CART · CHECKOUT · ORDER SUCCESS
   ============================================================ */

function CartScreen() {
  const { nav, cart, setQtyInCart, removeFromCart, user, pushToast } = useShop();
  const [voucher, setVoucher] = React.useState("");
  const [applied, setApplied] = React.useState(0);
  const items = cart.map((c) => ({ ...c, p: getProduct(c.id) })).filter((c) => c.p);
  const subtotal = items.reduce((s, c) => s + c.p.price * c.qty, 0);
  const shipping = subtotal > 0 ? 0 : 0;
  const total = Math.max(0, subtotal - applied);

  if (!items.length) {
    return (
      <div className="wrap" style={{ paddingTop: 22, paddingBottom: 60 }}>
        <div className="card center" style={{ padding: 70, flexDirection: "column", gap: 14 }}>
          <span style={{ width: 90, height: 90, borderRadius: 999, background: "var(--blue-50)", display: "grid", placeItems: "center", color: "var(--blue-400)" }}><Icon name="cart" size={42} /></span>
          <h2 className="h2">Keranjang masih kosong</h2>
          <p className="muted" style={{ fontSize: 14 }}>Yuk, temukan gadget impianmu dan mulai belanja.</p>
          <button className="btn btn-primary btn-lg" onClick={() => nav("home")}>Mulai Belanja</button>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap" style={{ paddingTop: 22, paddingBottom: 40 }}>
      <h1 className="h2" style={{ marginBottom: 18 }}>Keranjang Belanja <span className="muted" style={{ fontWeight: 500, fontSize: 16 }}>({items.length} produk)</span></h1>
      <div className="flex gap16" style={{ alignItems: "flex-start" }}>
        <div style={{ flex: 1 }} className="col gap12">
          <div className="card flex aic gap12" style={{ padding: "12px 16px", background: "var(--blue-50)", border: "1px solid var(--blue-100)" }}>
            <Icon name="truck" size={20} style={{ color: "var(--blue-600)" }} />
            <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--blue-800)" }}>Selamat! Pesananmu mendapat <b>gratis ongkir</b> se-Indonesia.</span>
          </div>
          {items.map((c) => (
            <div key={c.id} className="card flex gap16" style={{ padding: 14, alignItems: "center" }}>
              <div className="card" style={{ width: 92, height: 92, overflow: "hidden", padding: 0, flex: "none", cursor: "pointer" }} onClick={() => nav("product", { id: c.id })}><Ph cat={c.p.cat} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="pcard-brand">{c.p.brand}</div>
                <div style={{ fontWeight: 600, fontSize: 14.5, cursor: "pointer" }} onClick={() => nav("product", { id: c.id })}>{c.p.name}</div>
                <div className="flex aic gap8" style={{ marginTop: 6 }}>
                  <span className="price" style={{ fontSize: 17, color: "var(--blue-700)" }}>{RP(c.p.price)}</span>
                  <span className="was" style={{ fontSize: 12 }}>{RP(c.p.was)}</span>
                  <span className="badge badge-red" style={{ height: 18 }}>-{discPct(c.p)}%</span>
                </div>
              </div>
              <div className="col" style={{ alignItems: "flex-end", gap: 12 }}>
                <button className="icon-btn" style={{ width: 36, height: 36 }} onClick={() => removeFromCart(c.id)} title="Hapus"><Icon name="trash" size={17} /></button>
                <div className="flex aic" style={{ border: "1px solid var(--line-2)", borderRadius: 9, overflow: "hidden" }}>
                  <button className="center" style={{ width: 34, height: 36 }} onClick={() => setQtyInCart(c.id, Math.max(1, c.qty - 1))}><Icon name="minus" size={15} /></button>
                  <span className="center tnum" style={{ width: 38, fontWeight: 700, fontSize: 14 }}>{c.qty}</span>
                  <button className="center" style={{ width: 34, height: 36 }} onClick={() => setQtyInCart(c.id, c.qty + 1)}><Icon name="plus" size={15} /></button>
                </div>
              </div>
            </div>
          ))}
          <button className="flex aic gap8" style={{ fontSize: 13.5, fontWeight: 600, color: "var(--blue-600)", marginTop: 4 }} onClick={() => nav("home")}><Icon name="chevL" size={16} /> Lanjut belanja</button>
        </div>

        {/* Summary */}
        <aside className="card" style={{ width: 340, flex: "none", padding: 20, position: "sticky", top: 130 }}>
          <h3 className="h3">Ringkasan Belanja</h3>
          <div className="flex gap8" style={{ marginTop: 14 }}>
            <div className="input-group" style={{ flex: 1 }}>
              <span className="ig-icon"><Icon name="tag" size={17} /></span>
              <input className="input" placeholder="Kode voucher" value={voucher} onChange={(e) => setVoucher(e.target.value)} style={{ height: 44 }} />
            </div>
            <button className="btn btn-dark" style={{ height: 44 }} onClick={() => { if (voucher.trim()) { setApplied(100000); pushToast("Voucher diterapkan: -Rp100.000"); } }}>Pakai</button>
          </div>
          <hr className="hr" style={{ margin: "18px 0" }} />
          <div className="col gap10" style={{ fontSize: 14 }}>
            <div className="flex jcb"><span className="muted">Subtotal</span><Money v={subtotal} /></div>
            <div className="flex jcb"><span className="muted">Ongkir</span><span style={{ color: "var(--green-600)", fontWeight: 700 }}>GRATIS</span></div>
            {applied > 0 && <div className="flex jcb"><span className="muted">Voucher</span><span style={{ color: "var(--green-600)", fontWeight: 700 }}>−{RP(applied)}</span></div>}
            <div className="flex jcb" style={{ fontSize: 13, color: "var(--amber-600)", fontWeight: 600 }}><span className="flex aic gap4"><Icon name="coin" size={15} /> Poin didapat</span><span>+{Math.floor(total / 10000).toLocaleString("id-ID")}</span></div>
          </div>
          <hr className="hr" style={{ margin: "16px 0" }} />
          <div className="flex jcb aic" style={{ marginBottom: 16 }}>
            <span style={{ fontWeight: 700 }}>Total</span>
            <span className="price" style={{ fontSize: 24, color: "var(--blue-700)" }}>{RP(total)}</span>
          </div>
          <button className="btn btn-amber btn-lg btn-block" onClick={() => nav(user.loggedIn ? "checkout" : "login", { next: "checkout" })}>
            Checkout ({items.length}) <Icon name="arrowR" size={18} />
          </button>
          <div className="flex aic gap8 center" style={{ marginTop: 14, fontSize: 12, color: "var(--muted)" }}><Icon name="lock" size={14} /> Pembayaran aman & terenkripsi</div>
        </aside>
      </div>
    </div>
  );
}

/* ---------------- Checkout ---------------- */
function CheckoutScreen() {
  const { nav, cart, user, placeOrder, pushToast } = useShop();
  const items = cart.map((c) => ({ ...c, p: getProduct(c.id) })).filter((c) => c.p);
  const subtotal = items.reduce((s, c) => s + c.p.price * c.qty, 0);
  const [ship, setShip] = React.useState("reg");
  const [pay, setPay] = React.useState("va");
  const [usePoints, setUsePoints] = React.useState(false);
  const shipCost = ship === "reg" ? 0 : ship === "same" ? 25000 : 18000;
  const pointDisc = usePoints ? Math.min(user.points * 100, subtotal * 0.2) : 0;
  const total = subtotal + shipCost - pointDisc;

  if (!items.length) { React.useEffect(() => nav("cart"), []); return null; }

  return (
    <div className="wrap" style={{ paddingTop: 22, paddingBottom: 40 }}>
      <button className="flex aic gap8 muted" style={{ fontSize: 13.5, marginBottom: 14 }} onClick={() => nav("cart")}><Icon name="chevL" size={16} /> Kembali ke keranjang</button>
      <h1 className="h2" style={{ marginBottom: 18 }}>Checkout</h1>
      <div className="flex gap16" style={{ alignItems: "flex-start" }}>
        <div style={{ flex: 1 }} className="col gap16">
          {/* address */}
          <div className="card" style={{ padding: 20 }}>
            <div className="flex aic jcb" style={{ marginBottom: 14 }}><h3 className="h3 flex aic gap8"><Icon name="pin" size={19} style={{ color: "var(--blue-600)" }} /> Alamat Pengiriman</h3><button className="btn btn-ghost btn-sm">Ubah</button></div>
            <div className="flex aic gap8" style={{ marginBottom: 6 }}><b style={{ fontSize: 14.5 }}>{user.name}</b><span className="badge badge-blue" style={{ height: 18 }}>Utama</span><span className="muted" style={{ fontSize: 13 }}>{user.phone}</span></div>
            <p className="muted" style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5 }}>Jl. Teknologi Raya No. 88, RT 04/RW 02, Kel. Cempaka Putih, Kec. Cempaka Putih, Jakarta Pusat, DKI Jakarta 10510</p>
          </div>
          {/* items */}
          <div className="card" style={{ padding: 20 }}>
            <h3 className="h3" style={{ marginBottom: 14 }}>Produk ({items.length})</h3>
            <div className="col gap12">
              {items.map((c) => (
                <div key={c.id} className="flex aic gap12">
                  <div className="card" style={{ width: 56, height: 56, overflow: "hidden", padding: 0, flex: "none" }}><Ph cat={c.p.cat} /></div>
                  <div style={{ flex: 1 }}><div style={{ fontSize: 13.5, fontWeight: 600 }}>{c.p.name}</div><div className="muted" style={{ fontSize: 12.5 }}>{c.qty} × {RP(c.p.price)}</div></div>
                  <Money v={c.p.price * c.qty} className="price" style={{ fontSize: 14.5 }} />
                </div>
              ))}
            </div>
          </div>
          {/* shipping */}
          <div className="card" style={{ padding: 20 }}>
            <h3 className="h3 flex aic gap8" style={{ marginBottom: 14 }}><Icon name="truck" size={19} style={{ color: "var(--blue-600)" }} /> Pengiriman</h3>
            <div className="col gap10">
              {[["reg", "Reguler (gratis)", "2–4 hari · JNE/SiCepat", 0], ["same", "Same Day", "Tiba hari ini", 25000], ["eco", "Hemat", "3–6 hari", 18000]].map(([k, t, s, c]) => (
                <label key={k} className="flex aic jcb" style={{ padding: "12px 14px", border: "1.5px solid", borderColor: ship === k ? "var(--blue-500)" : "var(--line)", borderRadius: 12, cursor: "pointer", background: ship === k ? "var(--blue-50)" : "#fff" }}>
                  <div className="flex aic gap10"><input type="radio" checked={ship === k} onChange={() => setShip(k)} style={{ accentColor: "var(--blue-600)", width: 17, height: 17 }} />
                    <div><div style={{ fontWeight: 700, fontSize: 13.5 }}>{t}</div><div className="muted" style={{ fontSize: 12 }}>{s}</div></div></div>
                  <span style={{ fontWeight: 700, fontSize: 13.5, color: c === 0 ? "var(--green-600)" : "var(--ink)" }}>{c === 0 ? "GRATIS" : RP(c)}</span>
                </label>
              ))}
            </div>
          </div>
          {/* payment */}
          <div className="card" style={{ padding: 20 }}>
            <h3 className="h3 flex aic gap8" style={{ marginBottom: 14 }}><Icon name="wallet" size={19} style={{ color: "var(--blue-600)" }} /> Metode Pembayaran</h3>
            <div className="grid g-2" style={{ gap: 10 }}>
              {[["va", "Virtual Account", "BCA, Mandiri, BNI"], ["ewallet", "E-Wallet", "GoPay, OVO, Dana"], ["card", "Kartu Kredit", "Cicilan 0% 12 bln"], ["cod", "COD", "Bayar di tempat"]].map(([k, t, s]) => (
                <label key={k} className="flex aic gap10" style={{ padding: "12px 14px", border: "1.5px solid", borderColor: pay === k ? "var(--blue-500)" : "var(--line)", borderRadius: 12, cursor: "pointer", background: pay === k ? "var(--blue-50)" : "#fff" }}>
                  <input type="radio" checked={pay === k} onChange={() => setPay(k)} style={{ accentColor: "var(--blue-600)", width: 17, height: 17 }} />
                  <div><div style={{ fontWeight: 700, fontSize: 13.5 }}>{t}</div><div className="muted" style={{ fontSize: 12 }}>{s}</div></div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* summary */}
        <aside className="card" style={{ width: 340, flex: "none", padding: 20, position: "sticky", top: 130 }}>
          <h3 className="h3">Ringkasan Pembayaran</h3>
          <label className="flex aic jcb" style={{ margin: "16px 0", padding: "12px 14px", background: "var(--amber-50)", borderRadius: 12, cursor: "pointer" }}>
            <div className="flex aic gap8"><Icon name="coin" size={18} style={{ color: "var(--amber-500)" }} /><div><div style={{ fontWeight: 700, fontSize: 13 }}>Pakai poin</div><div className="muted" style={{ fontSize: 11.5 }}>{user.points.toLocaleString("id-ID")} poin tersedia</div></div></div>
            <input type="checkbox" checked={usePoints} onChange={(e) => setUsePoints(e.target.checked)} style={{ accentColor: "var(--amber-500)", width: 18, height: 18 }} />
          </label>
          <div className="col gap10" style={{ fontSize: 14 }}>
            <div className="flex jcb"><span className="muted">Subtotal</span><Money v={subtotal} /></div>
            <div className="flex jcb"><span className="muted">Ongkir</span><span style={{ fontWeight: 700, color: shipCost === 0 ? "var(--green-600)" : "var(--ink)" }}>{shipCost === 0 ? "GRATIS" : RP(shipCost)}</span></div>
            {pointDisc > 0 && <div className="flex jcb"><span className="muted">Diskon poin</span><span style={{ color: "var(--green-600)", fontWeight: 700 }}>−{RP(Math.round(pointDisc))}</span></div>}
          </div>
          <hr className="hr" style={{ margin: "16px 0" }} />
          <div className="flex jcb aic" style={{ marginBottom: 16 }}><span style={{ fontWeight: 700 }}>Total Bayar</span><span className="price" style={{ fontSize: 24, color: "var(--blue-700)" }}>{RP(Math.round(total))}</span></div>
          <button className="btn btn-primary btn-lg btn-block" onClick={() => placeOrder(Math.round(total))}>Bayar Sekarang</button>
          <p className="muted center" style={{ fontSize: 11.5, marginTop: 12, textAlign: "center", lineHeight: 1.5 }}>Dengan melanjutkan, kamu menyetujui Syarat & Ketentuan Sinar Lestari Elektronik.</p>
        </aside>
      </div>
    </div>
  );
}

/* ---------------- Order Success ---------------- */
function SuccessScreen({ params }) {
  const { nav } = useShop();
  return (
    <div className="wrap" style={{ paddingTop: 40, paddingBottom: 60, maxWidth: 560 }}>
      <div className="card fade-up" style={{ padding: 40, textAlign: "center" }}>
        <div className="center" style={{ width: 84, height: 84, borderRadius: 999, background: "var(--green-50)", margin: "0 auto 18px" }}>
          <Icon name="checkCircle" size={48} style={{ color: "var(--green-500)" }} />
        </div>
        <h2 className="h2">Pesanan Berhasil!</h2>
        <p className="muted" style={{ fontSize: 14.5, marginTop: 8 }}>Terima kasih telah berbelanja di Sinar Lestari Elektronik. Pesananmu sedang kami proses.</p>
        <div className="card" style={{ background: "var(--bg)", padding: 18, margin: "22px 0", textAlign: "left" }}>
          <div className="flex jcb" style={{ fontSize: 13.5, marginBottom: 8 }}><span className="muted">No. Pesanan</span><b className="tnum">{params.inv || "INV/2026/0613"}</b></div>
          <div className="flex jcb" style={{ fontSize: 13.5, marginBottom: 8 }}><span className="muted">Total Bayar</span><b className="price">{RP(params.total || 0)}</b></div>
          <div className="flex jcb" style={{ fontSize: 13.5 }}><span className="muted">Poin Didapat</span><b style={{ color: "var(--amber-600)" }}>+{Math.floor((params.total || 0) / 10000).toLocaleString("id-ID")} poin</b></div>
        </div>
        <div className="flex gap12">
          <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => nav("home")}>Beranda</button>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => nav("profile", { tab: "pesanan" })}>Lihat Pesanan</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CartScreen, CheckoutScreen, SuccessScreen });
