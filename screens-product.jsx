/* ============================================================
   PRODUCT SCREENS — Kategori/Listing + Detail + Serupa + Ulasan
   ============================================================ */

/* ---------------- Category / Listing ---------------- */
function CategoryScreen({ params }) {
  const { nav } = useShop();
  const [sort, setSort] = React.useState("relevan");
  const [brandF, setBrandF] = React.useState(params.brand ? [params.brand] : []);
  const [catF, setCatF] = React.useState(params.cat && params.cat !== "all" ? [params.cat] : []);
  const [maxPrice, setMaxPrice] = React.useState(30000000);

  React.useEffect(() => {
    setCatF(params.cat && params.cat !== "all" ? [params.cat] : []);
    setBrandF(params.brand ? [params.brand] : []);
  }, [params.cat, params.brand]);

  let list = PRODUCTS.filter((p) => {
    if (catF.length && !catF.includes(p.cat)) return false;
    if (brandF.length && !brandF.includes(p.brand)) return false;
    if (p.price > maxPrice) return false;
    if (params.q) { const q = params.q.toLowerCase(); if (!(p.name + p.brand + p.cat).toLowerCase().includes(q)) return false; }
    return true;
  });
  if (sort === "murah") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "mahal") list = [...list].sort((a, b) => b.price - a.price);
  if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
  if (sort === "terlaris") list = [...list].sort((a, b) => b.sold - a.sold);

  const title = params.q ? `Hasil "${params.q}"` : catF.length ? catName(catF[0]) : brandF.length ? brandF[0] : "Semua Produk";
  const toggle = (arr, set, v) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <div className="wrap" style={{ paddingTop: 18, paddingBottom: 30 }}>
      <div className="flex aic gap8 muted" style={{ fontSize: 13, marginBottom: 14 }}>
        <a onClick={() => nav("home")} style={{ cursor: "pointer" }}>Beranda</a><Icon name="chevR" size={14} /><span style={{ color: "var(--ink)", fontWeight: 600 }}>{title}</span>
      </div>
      <div className="flex gap16" style={{ alignItems: "flex-start" }}>
        {/* Filters */}
        <aside className="card" style={{ width: 250, flex: "none", padding: 18, position: "sticky", top: 130 }}>
          <div className="flex aic gap8" style={{ fontWeight: 700, marginBottom: 14 }}><Icon name="filter" size={18} /> Filter</div>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Kategori</div>
          <div className="col gap8" style={{ marginBottom: 18 }}>
            {CATEGORIES.map((c) => (
              <label key={c.id} className="flex aic gap8" style={{ fontSize: 13.5, cursor: "pointer" }}>
                <input type="checkbox" checked={catF.includes(c.id)} onChange={() => toggle(catF, setCatF, c.id)} style={{ accentColor: "var(--blue-600)", width: 16, height: 16 }} />
                {c.name}
              </label>
            ))}
          </div>
          <hr className="hr" style={{ margin: "0 0 16px" }} />
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Brand</div>
          <div className="col gap8" style={{ marginBottom: 18 }}>
            {BRANDS.map((b) => (
              <label key={b.id} className="flex aic gap8" style={{ fontSize: 13.5, cursor: "pointer" }}>
                <input type="checkbox" checked={brandF.includes(b.name)} onChange={() => toggle(brandF, setBrandF, b.name)} style={{ accentColor: "var(--blue-600)", width: 16, height: 16 }} />
                {b.name}
              </label>
            ))}
          </div>
          <hr className="hr" style={{ margin: "0 0 16px" }} />
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Harga maksimum</div>
          <input type="range" min={300000} max={30000000} step={100000} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} style={{ width: "100%", accentColor: "var(--blue-600)" }} />
          <div className="muted" style={{ fontSize: 12.5, marginTop: 6 }}>{RP(maxPrice)}</div>
          <button className="btn btn-ghost btn-sm btn-block" style={{ marginTop: 16 }} onClick={() => { setCatF([]); setBrandF([]); setMaxPrice(30000000); }}>Reset filter</button>
        </aside>
        {/* Grid */}
        <div style={{ flex: 1 }}>
          <div className="card flex aic jcb" style={{ padding: "12px 16px", marginBottom: 16 }}>
            <div style={{ fontSize: 13.5 }}><b>{list.length}</b> produk ditemukan</div>
            <div className="flex aic gap8">
              <span className="muted" style={{ fontSize: 13 }}>Urutkan:</span>
              {[["relevan", "Relevan"], ["terlaris", "Terlaris"], ["murah", "Termurah"], ["mahal", "Termahal"], ["rating", "Rating"]].map(([k, l]) => (
                <button key={k} className={"chip" + (sort === k ? " active" : "")} style={{ height: 32 }} onClick={() => setSort(k)}>{l}</button>
              ))}
            </div>
          </div>
          {list.length ? (
            <div className="grid g-4">{list.map((p) => <ProductCard key={p.id} p={p} onOpen={(id) => nav("product", { id })} />)}</div>
          ) : (
            <div className="card center" style={{ padding: 60, flexDirection: "column", gap: 12 }}>
              <Icon name="search" size={40} style={{ color: "var(--faint)" }} />
              <div style={{ fontWeight: 700 }}>Produk tidak ditemukan</div>
              <p className="muted" style={{ fontSize: 13.5 }}>Coba ubah filter atau kata kunci.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Product Detail ---------------- */
function ProductScreen({ params }) {
  const { nav, addToCart, buyNow, wishlist, toggleWish, pushToast, user } = useShop();
  const p = getProduct(params.id) || PRODUCTS[0];
  const [img, setImg] = React.useState(0);
  const [color, setColor] = React.useState(0);
  const [qty, setQty] = React.useState(1);
  const [tab, setTab] = React.useState("spek");
  const on = wishlist.includes(p.id);
  const similar = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 5);
  const points = Math.floor(p.price / 10000);
  React.useEffect(() => { setImg(0); setColor(0); setQty(1); setTab("spek"); window.scrollTo(0, 0); }, [params.id]);

  return (
    <div className="wrap" style={{ paddingTop: 18, paddingBottom: 30 }}>
      <div className="flex aic gap8 muted" style={{ fontSize: 13, marginBottom: 16 }}>
        <a onClick={() => nav("home")} style={{ cursor: "pointer" }}>Beranda</a><Icon name="chevR" size={14} />
        <a onClick={() => nav("category", { cat: p.cat })} style={{ cursor: "pointer" }}>{catName(p.cat)}</a><Icon name="chevR" size={14} />
        <span style={{ color: "var(--ink)", fontWeight: 600 }}>{p.brand}</span>
      </div>

      <div className="flex gap24" style={{ alignItems: "flex-start", gap: 28 }}>
        {/* Gallery */}
        <div style={{ width: 420, flex: "none", position: "sticky", top: 130 }}>
          <div className="card" style={{ overflow: "hidden", borderRadius: "var(--r-lg)" }}>
            <Ph cat={p.cat} label={`foto produk ${img + 1}`} big style={{ aspectRatio: "1/1" }} />
          </div>
          <div className="flex gap8" style={{ marginTop: 12 }}>
            {[0, 1, 2, 3].map((i) => (
              <button key={i} onClick={() => setImg(i)} className="card" style={{ width: 72, height: 72, padding: 0, overflow: "hidden", borderColor: img === i ? "var(--blue-500)" : "var(--line)", borderWidth: 2, boxShadow: img === i ? "var(--ring)" : "none" }}>
                <Ph cat={p.cat} />
              </button>
            ))}
          </div>
          <div className="flex gap8" style={{ marginTop: 14 }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => toggleWish(p.id)}>
              <Icon name="heart" size={18} fill={on ? "var(--red-500)" : "none"} style={{ color: on ? "var(--red-500)" : "inherit" }} /> {on ? "Tersimpan" : "Wishlist"}
            </button>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => pushToast("Link produk disalin")}><Icon name="copy" size={17} /> Bagikan</button>
          </div>
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="flex aic gap8" style={{ marginBottom: 8 }}>
            <span className="badge badge-blue">{p.brand} Official</span>
            {p.flash && <span className="badge badge-flash"><Icon name="fire" size={12} fill="currentColor" stroke={0} /> FLASH SALE</span>}
            <span className="badge badge-green">{p.badge}</span>
          </div>
          <h1 className="h2" style={{ fontSize: 26, lineHeight: 1.2 }}>{p.name}</h1>
          <div className="flex aic gap12" style={{ marginTop: 10, fontSize: 13.5 }}>
            <span className="flex aic gap4"><Stars value={p.rating} size={15} /> <b>{p.rating}</b></span>
            <span className="dot-sep"></span><span className="muted">{p.reviews.toLocaleString("id-ID")} ulasan</span>
            <span className="dot-sep"></span><span className="muted">{p.sold.toLocaleString("id-ID")} terjual</span>
          </div>

          <div className="card" style={{ background: "linear-gradient(120deg,var(--blue-50),#fff)", padding: "18px 20px", marginTop: 16, border: "1px solid var(--blue-100)" }}>
            <div className="flex aic gap12" style={{ flexWrap: "wrap" }}>
              <span className="price" style={{ fontSize: 34, color: "var(--blue-700)" }}>{RP(p.price)}</span>
              <span style={{ textDecoration: "line-through", color: "var(--faint)", fontSize: 16 }}>{RP(p.was)}</span>
              <span className="badge badge-disc" style={{ height: 26, fontSize: 13 }}>-{discPct(p)}%</span>
            </div>
            <div className="flex aic gap8" style={{ marginTop: 8, fontSize: 13, color: "var(--amber-600)", fontWeight: 600 }}>
              <Icon name="coin" size={16} /> Dapatkan {points.toLocaleString("id-ID")} poin · cicilan dari {RP(Math.round(p.price / 12))}/bln
            </div>
          </div>

          {/* color */}
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Warna: <span style={{ fontWeight: 500, color: "var(--muted)" }}>{p.colors[color]}</span></div>
            <div className="flex gap8">
              {p.colors.map((c, i) => <button key={c} className={"chip" + (color === i ? " active" : "")} onClick={() => setColor(i)}>{c}</button>)}
            </div>
          </div>

          {/* qty */}
          <div className="flex aic gap16" style={{ marginTop: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Jumlah</div>
            <div className="flex aic" style={{ border: "1px solid var(--line-2)", borderRadius: 10, overflow: "hidden" }}>
              <button className="center" style={{ width: 40, height: 42 }} onClick={() => setQty(Math.max(1, qty - 1))}><Icon name="minus" size={16} /></button>
              <span className="center tnum" style={{ width: 46, fontWeight: 700 }}>{qty}</span>
              <button className="center" style={{ width: 40, height: 42 }} onClick={() => setQty(Math.min(p.stock, qty + 1))}><Icon name="plus" size={16} /></button>
            </div>
            <span className="muted" style={{ fontSize: 13 }}>Stok <b style={{ color: p.stock < 15 ? "var(--red-600)" : "var(--ink)" }}>{p.stock}</b> tersisa</span>
          </div>

          {/* actions */}
          <div className="flex gap12" style={{ marginTop: 22 }}>
            <button className="btn btn-ghost btn-lg" style={{ flex: 1 }} onClick={() => addToCart(p.id, qty)}><Icon name="cart" size={19} /> Keranjang</button>
            <button className="btn btn-amber btn-lg" style={{ flex: 1 }} onClick={() => buyNow(p.id, qty)}>Beli Sekarang</button>
          </div>

          {/* trust row */}
          <div className="grid g-3" style={{ marginTop: 20, gap: 10 }}>
            {[["shield", "Garansi resmi 1 tahun"], ["truck", "Gratis ongkir & asuransi"], ["refresh", "Bisa tukar 7 hari"]].map(([ic, t]) => (
              <div key={t} className="flex aic gap8" style={{ fontSize: 12.5, color: "var(--slate)" }}><Icon name={ic} size={18} style={{ color: "var(--green-500)" }} /> {t}</div>
            ))}
          </div>

          {/* store strip */}
          <div className="card flex aic jcb" style={{ padding: "14px 16px", marginTop: 18 }}>
            <div className="flex aic gap12">
              <div className="logo-mark" style={{ width: 44, height: 44 }}><span>S</span></div>
              <div><div className="flex aic gap8" style={{ fontWeight: 700, fontSize: 14 }}>Sinar Lestari Elektronik <span className="badge badge-blue" style={{ height: 18 }}>Official</span></div>
                <div className="muted" style={{ fontSize: 12 }}>Online · Balas chat ±2 menit</div></div>
            </div>
            <div className="flex gap8">
              <button className="btn btn-soft btn-sm" onClick={() => useShop().openChat && nav("product", { id: p.id })}><Icon name="chat" size={16} /> Chat</button>
              <button className="btn btn-ghost btn-sm">Kunjungi Toko</button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card" style={{ marginTop: 28, overflow: "hidden" }}>
        <div className="flex" style={{ borderBottom: "1px solid var(--line)" }}>
          {[["spek", "Spesifikasi"], ["desk", "Deskripsi"], ["ulasan", `Ulasan (${p.reviews.toLocaleString("id-ID")})`]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{ padding: "16px 24px", fontSize: 14, fontWeight: 700, color: tab === k ? "var(--blue-700)" : "var(--muted)", borderBottom: tab === k ? "2.5px solid var(--blue-600)" : "2.5px solid transparent", marginBottom: -1 }}>{l}</button>
          ))}
        </div>
        <div style={{ padding: "24px 26px" }}>
          {tab === "spek" && (
            <div className="grid g-2" style={{ gap: "0 40px", maxWidth: 760 }}>
              {p.specs.map(([k, v], i) => (
                <div key={k} className="flex aic jcb" style={{ padding: "13px 0", borderBottom: "1px solid var(--line)" }}>
                  <span className="muted" style={{ fontSize: 13.5 }}>{k}</span><span style={{ fontSize: 13.5, fontWeight: 600, textAlign: "right" }}>{v}</span>
                </div>
              ))}
            </div>
          )}
          {tab === "desk" && (
            <div style={{ maxWidth: 760, lineHeight: 1.7, fontSize: 14.5, color: "var(--slate)" }}>
              <p style={{ marginTop: 0 }}><b style={{ color: "var(--ink)" }}>{p.name}</b> — {p.short}. Produk original bergaransi resmi distributor Indonesia, dikirim dari gudang Sinar Lestari Elektronik dengan packing aman berlapis.</p>
              <p>Setiap pembelian sudah termasuk kelengkapan standar pabrik, kartu garansi, dan dukungan purna jual. Nikmati gratis ongkir se-Indonesia, cicilan 0% hingga 12 bulan, serta poin reward yang bisa ditukar voucher belanja.</p>
              <ul style={{ paddingLeft: 18 }}>
                {p.specs.map(([k, v]) => <li key={k} style={{ marginBottom: 6 }}><b style={{ color: "var(--ink)" }}>{k}:</b> {v}</li>)}
              </ul>
            </div>
          )}
          {tab === "ulasan" && <ReviewsBlock p={p} />}
        </div>
      </div>

      {/* Similar */}
      <div className="section">
        <SectionHead eyebrow="MIRIP INI" title="Produk Serupa" onMore={() => nav("category", { cat: p.cat })} />
        <div className="grid g-5">{similar.map((s) => <ProductCard key={s.id} p={s} onOpen={(id) => nav("product", { id })} />)}</div>
      </div>
    </div>
  );
}

/* ---------------- Reviews block (in detail) ---------------- */
function ReviewsBlock({ p }) {
  const { nav, user } = useShop();
  const dist = [78, 16, 4, 1, 1];
  return (
    <div>
      <div className="flex gap24" style={{ alignItems: "center", marginBottom: 22, flexWrap: "wrap" }}>
        <div className="center" style={{ flexDirection: "column", padding: "0 30px 0 0", borderRight: "1px solid var(--line)" }}>
          <div style={{ fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: 48, lineHeight: 1 }}>{p.rating}</div>
          <Stars value={p.rating} size={16} />
          <div className="muted" style={{ fontSize: 12.5, marginTop: 6 }}>{p.reviews.toLocaleString("id-ID")} ulasan</div>
        </div>
        <div style={{ flex: 1, minWidth: 240, maxWidth: 360 }}>
          {dist.map((v, i) => (
            <div key={i} className="rating-row" style={{ marginBottom: 6 }}>
              <span className="flex aic gap4" style={{ width: 30 }}>{5 - i}<Icon name="star" size={11} fill="var(--star)" stroke={0} /></span>
              <div className="rating-bar"><i style={{ width: v + "%" }}></i></div>
              <span className="muted tnum" style={{ width: 32, textAlign: "right" }}>{v}%</span>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" style={{ marginLeft: "auto" }} onClick={() => nav("review", { id: p.id })}><Icon name="edit" size={16} /> Tulis Ulasan</button>
      </div>
      <div className="flex gap8" style={{ marginBottom: 18 }}>
        {["Semua", "Dengan foto", "5 bintang", "4 bintang", "Terbaru"].map((f, i) => <button key={f} className={"chip" + (i === 0 ? " active" : "")} style={{ height: 32 }}>{f}</button>)}
      </div>
      <div className="col gap16">
        {REVIEWS.map((r) => <ReviewItem key={r.id} r={r} cat={p.cat} />)}
      </div>
    </div>
  );
}

function ReviewItem({ r, cat }) {
  const { pushToast } = useShop();
  const [helped, setHelped] = React.useState(false);
  return (
    <div style={{ padding: "16px 0", borderBottom: "1px solid var(--line)" }}>
      <div className="flex aic gap12">
        <span style={{ width: 40, height: 40, borderRadius: 999, background: "var(--blue-100)", color: "var(--blue-700)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 14 }}>{r.avatar}</span>
        <div>
          <div className="flex aic gap8"><b style={{ fontSize: 14 }}>{r.name}</b>{r.verified && <span className="badge badge-green" style={{ height: 18 }}><Icon name="check" size={11} /> Terverifikasi</span>}</div>
          <div className="flex aic gap8" style={{ marginTop: 2 }}><Stars value={r.rating} size={13} /><span className="muted" style={{ fontSize: 12 }}>{r.date}</span></div>
        </div>
      </div>
      <p style={{ margin: "12px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--slate)" }}>{r.text}</p>
      {r.photos > 0 && (
        <div className="flex gap8" style={{ marginTop: 10 }}>
          {Array.from({ length: r.photos }).map((_, i) => <div key={i} className="card" style={{ width: 64, height: 64, overflow: "hidden", padding: 0 }}><Ph cat={cat} /></div>)}
        </div>
      )}
      <div className="flex aic gap16" style={{ marginTop: 12 }}>
        <button className="flex aic gap8" style={{ fontSize: 12.5, fontWeight: 600, color: helped ? "var(--blue-600)" : "var(--muted)" }} onClick={() => { setHelped(true); pushToast("Terima kasih atas masukannya"); }}>
          <Icon name="thumb" size={16} /> Membantu ({r.helpful + (helped ? 1 : 0)})
        </button>
      </div>
    </div>
  );
}

/* ---------------- Write Review ---------------- */
function ReviewScreen({ params }) {
  const { nav, pushToast } = useShop();
  const p = getProduct(params.id) || PRODUCTS[0];
  const [rating, setRating] = React.useState(5);
  const [hover, setHover] = React.useState(0);
  const [text, setText] = React.useState("");
  const labels = ["", "Sangat buruk", "Buruk", "Biasa", "Bagus", "Sangat bagus"];
  return (
    <div className="wrap" style={{ paddingTop: 22, paddingBottom: 40, maxWidth: 720 }}>
      <button className="flex aic gap8 muted" style={{ fontSize: 13.5, marginBottom: 16 }} onClick={() => nav("product", { id: p.id })}><Icon name="chevL" size={16} /> Kembali ke produk</button>
      <div className="card" style={{ padding: 28 }}>
        <h2 className="h2">Tulis Ulasan</h2>
        <div className="flex aic gap12" style={{ marginTop: 16, padding: 12, background: "var(--bg)", borderRadius: 12 }}>
          <div className="card" style={{ width: 56, height: 56, overflow: "hidden", padding: 0 }}><Ph cat={p.cat} /></div>
          <div><div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div><div className="muted" style={{ fontSize: 12.5 }}>{p.brand}</div></div>
        </div>
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 10 }}>Beri rating</div>
          <div className="flex aic gap8">
            {[1, 2, 3, 4, 5].map((i) => (
              <button key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(0)} onClick={() => setRating(i)}>
                <Icon name="star" size={34} stroke={0} fill={i <= (hover || rating) ? "var(--star)" : "#dfe3ec"} />
              </button>
            ))}
            <span style={{ marginLeft: 8, fontWeight: 700, color: "var(--amber-600)" }}>{labels[hover || rating]}</span>
          </div>
        </div>
        <div className="field" style={{ marginTop: 24 }}>
          <label>Ulasan kamu</label>
          <textarea className="textarea" placeholder="Bagikan pengalamanmu tentang kualitas produk, pengiriman, dan pelayanan…" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 10 }}>Tambah foto (opsional)</div>
          <div className="flex gap8">
            {[0, 1, 2].map((i) => (
              <button key={i} className="card center" style={{ width: 80, height: 80, borderStyle: "dashed", color: "var(--faint)" }}><Icon name="plus" size={22} /></button>
            ))}
          </div>
        </div>
        <div className="flex aic gap8" style={{ marginTop: 18, padding: 12, background: "var(--amber-50)", borderRadius: 12, fontSize: 13, color: "var(--amber-600)", fontWeight: 600 }}>
          <Icon name="coin" size={18} /> Dapatkan <b>+50 poin</b> setelah ulasanmu disetujui!
        </div>
        <div className="flex gap12" style={{ marginTop: 24 }}>
          <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => nav("product", { id: p.id })}>Batal</button>
          <button className="btn btn-primary" style={{ flex: 2 }} onClick={() => { pushToast("Ulasan terkirim! +50 poin"); nav("product", { id: p.id }); }} disabled={!text.trim()}>Kirim Ulasan</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CategoryScreen, ProductScreen, ReviewsBlock, ReviewItem, ReviewScreen });
