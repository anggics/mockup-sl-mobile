/* ============================================================
   HOME SCREENS — Beranda (3 variasi) + Flash Sale
   ============================================================ */

/* ---------- Shared: drag-to-scroll hook ---------- */
function useDragScroll(ref) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const s = { down: false, moved: false, startX: 0, startScroll: 0 };
    const onDown = (e) => {s.down = true;s.moved = false;s.startX = e.pageX;s.startScroll = el.scrollLeft;el.style.cursor = "grabbing";el.style.userSelect = "none";};
    const onEnd = () => {s.down = false;el.style.cursor = "grab";el.style.userSelect = "";};
    const onMove = (e) => {
      if (!s.down) return;
      const dx = e.pageX - s.startX;
      if (Math.abs(dx) > 4) {s.moved = true;e.preventDefault();el.scrollLeft = s.startScroll - dx * 1.4;}
    };
    const onClick = (e) => {if (s.moved) {e.stopPropagation();e.preventDefault();s.moved = false;}};
    el.style.cursor = "grab";
    el.addEventListener("mousedown", onDown);
    el.addEventListener("mouseup", onEnd);
    el.addEventListener("mouseleave", onEnd);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("click", onClick, true);
    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mouseup", onEnd);
      el.removeEventListener("mouseleave", onEnd);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("click", onClick, true);
    };
  }, []);
}

/* ---------- Shared: marquee auto-scroll + drag hook ---------- */
function useMarqueeScroll(ref, speed = 0.5) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const s = { paused: false, down: false, moved: false, startX: 0, startScroll: 0 };
    const tick = () => {
      if (!s.paused && !s.down) {
        el.scrollLeft += speed;
        if (el.scrollLeft >= el.scrollWidth / 2 - 2) el.scrollLeft = 0;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const onEnter = () => {s.paused = true;};
    const onLeave = () => {s.paused = false;s.down = false;el.style.cursor = "grab";el.style.userSelect = "";};
    const onDown = (e) => {s.down = true;s.moved = false;s.startX = e.pageX;s.startScroll = el.scrollLeft;el.style.cursor = "grabbing";el.style.userSelect = "none";};
    const onUp = () => {s.down = false;el.style.cursor = "grab";el.style.userSelect = "";};
    const onMove = (e) => {
      if (!s.down) return;
      const dx = e.pageX - s.startX;
      if (Math.abs(dx) > 4) {s.moved = true;e.preventDefault();el.scrollLeft = s.startScroll - dx * 1.4;}
    };
    const onClick = (e) => {if (s.moved) {e.stopPropagation();e.preventDefault();s.moved = false;}};
    el.style.cursor = "grab";
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousedown", onDown);
    el.addEventListener("mouseup", onUp);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("click", onClick, true);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mouseup", onUp);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("click", onClick, true);
    };
  }, []);
}

/* ---------- Shared: Category strip ---------- */
function CategoryStrip({ big }) {
  const { nav } = useShop();
  return (
    <div className="grid" style={{ gridTemplateColumns: `repeat(8, 1fr)`, gap: big ? 14 : 12 }}>
      {CATEGORIES.map((c) =>
      <button key={c.id} onClick={() => nav("category", { cat: c.id })}
      className="card" style={{ padding: big ? "20px 10px" : "16px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, transition: "all .18s", background: "#fff" }}
      onMouseEnter={(e) => {e.currentTarget.style.transform = "translateY(-3px)";e.currentTarget.style.boxShadow = "var(--sh)";e.currentTarget.style.borderColor = "var(--blue-200)";}}
      onMouseLeave={(e) => {e.currentTarget.style.transform = "";e.currentTarget.style.boxShadow = "";e.currentTarget.style.borderColor = "var(--line)";}}>
          <span style={{ width: big ? 56 : 46, height: big ? 56 : 46, borderRadius: 14, background: c.bg, display: "grid", placeItems: "center" }}>
            <Icon name={c.icon} size={big ? 26 : 22} stroke={1.9} style={{ color: "var(--blue-700)" }} />
          </span>
          <span style={{ fontSize: big ? 13 : 12, fontWeight: 600, textAlign: "center", lineHeight: 1.25 }}>{c.name}</span>
        </button>
      )}
    </div>);

}

/* ---------- Shared: Trust bar ---------- */
function TrustBar() {
  const items = [
  { icon: "shield", t: "100% Original", s: "Garansi resmi" },
  { icon: "truck", t: "Gratis Ongkir", s: "Se-Indonesia" },
  { icon: "refresh", t: "Tukar 7 Hari", s: "Tanpa ribet" },
  { icon: "coin", t: "Poin Reward", s: "Tiap transaksi" }];

  return (
    <div className="card grid g-4" style={{ padding: 4, overflow: "hidden" }}>
      {items.map((i, ix) =>
      <div key={i.t} className="flex aic gap12" style={{ padding: "16px 18px", borderRight: ix < 3 ? "1px solid var(--line)" : "none" }}>
          <span style={{ width: 42, height: 42, borderRadius: 11, background: "var(--blue-50)", display: "grid", placeItems: "center", color: "var(--blue-600)", flex: "none" }}>
            <Icon name={i.icon} size={21} />
          </span>
          <div style={{ minWidth: 0 }}><div style={{ fontWeight: 700, fontSize: 14, whiteSpace: "nowrap" }}>{i.t}</div><div className="muted" style={{ fontSize: 12.5, whiteSpace: "nowrap" }}>{i.s}</div></div>
        </div>
      )}
    </div>);

}

/* ---------- Shared: Section header ---------- */
function SectionHead({ eyebrow, title, sub, moreLabel = "Lihat semua", onMore, accent }) {
  return (
    <div className="section-head">
      <div>
        {eyebrow && <div className="eyebrow" style={accent ? { color: accent } : undefined}>{eyebrow}</div>}
        <h2 className="h2" style={{ marginTop: eyebrow ? 6 : 0 }}>{title}</h2>
        {sub && <p className="muted" style={{ margin: "6px 0 0", fontSize: 14 }}>{sub}</p>}
      </div>
      {onMore && <a className="link-more" onClick={onMore}>{moreLabel} <Icon name="arrowR" size={16} /></a>}
    </div>);

}

/* ---------- Shared: Rail arrow button ---------- */
function RailArrowBtn({ dir, onClick, disabled, dark }) {
  return (
    <button onClick={onClick} disabled={disabled}
    style={{
      width: 34, height: 34, borderRadius: "50%", border: "1.5px solid",
      borderColor: dark ? "rgba(255,255,255,.4)" : "var(--line-2)",
      background: dark ? "rgba(255,255,255,.18)" : "var(--white)",
      color: dark ? "#fff" : "var(--ink)",
      display: "grid", placeItems: "center", cursor: "pointer",
      opacity: disabled ? 0.32 : 1,
      transition: "opacity .15s, border-color .15s, background .15s",
      flexShrink: 0
    }}>
      <Icon name={dir === -1 ? "chevL" : "chevR"} size={17} stroke={2.2} />
    </button>);

}

/* ---------- Flash Sale section ---------- */
function FlashSaleSection({ variant }) {
  const { nav } = useShop();
  const items = PRODUCTS.filter((p) => p.flash);
  const dark = variant === "energik";
  const railRef = React.useRef(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(true);
  useDragScroll(railRef);

  const updateArrows = () => {
    const el = railRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  React.useEffect(() => {updateArrows();}, []);

  const scroll = (dir) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (215 + 16) * 3, behavior: "smooth" });
    setTimeout(updateArrows, 450);
  };

  return (
    <div className="card" style={{ overflow: "hidden", background: dark ? "linear-gradient(120deg,#ff6a3d,#f5ad1c)" : "#fff", border: dark ? "none" : "1px solid var(--line)" }}>
      <div className="flex aic jcb" style={{ padding: "18px 22px", flexWrap: "wrap", gap: 14, borderBottom: dark ? "1px solid rgba(255,255,255,.25)" : "1px solid var(--line)" }}>
        <div className="flex aic gap12">
          <span className="flex aic gap8" style={{ fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: 22, color: dark ? "#fff" : "var(--ink)" }}>
            <span className="live-dot"></span>
            <Icon name="fire" size={24} fill={dark ? "#fff" : "#ff6a3d"} stroke={0} /> Flash Sale
          </span>
          <span className="flex aic gap8" style={{ fontSize: 13.5, fontWeight: 600, color: dark ? "rgba(255,255,255,.9)" : "var(--muted)" }}>
            Berakhir dalam <Countdown target={window.FLASH_END} light={dark} />
          </span>
        </div>
        <div className="flex aic" style={{ gap: 6 }}>
          <RailArrowBtn dir={-1} onClick={() => scroll(-1)} disabled={!canPrev} dark={dark} />
          <RailArrowBtn dir={1} onClick={() => scroll(1)} disabled={!canNext} dark={dark} />
          <a className="link-more" onClick={() => nav("flashsale")} style={dark ? { color: "#fff", marginLeft: 6 } : { marginLeft: 6 }}>Lihat semua <Icon name="arrowR" size={16} /></a>
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <div
          ref={railRef}
          className="rail"
          onScroll={updateArrows}
          style={{ scrollSnapType: "none", scrollbarWidth: "none" }}>
          
          {items.map((p) =>
          <div key={p.id} style={{ minWidth: 215, maxWidth: 215, flex: "none" }}><ProductCard p={p} onOpen={(id) => nav("product", { id })} /></div>
          )}
        </div>
      </div>
    </div>);

}

/* ---------- Brands section ---------- */
function BrandSection() {
  const { nav } = useShop();
  const marqueeRef = React.useRef(null);
  useMarqueeScroll(marqueeRef, 0.5);

  const scroll = (dir) => {
    const el = marqueeRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <div className="section">
      <div className="card" style={{ overflow: "hidden" }}>
        <div className="flex aic jcb" style={{ padding: "18px 22px", borderBottom: "1px solid var(--line)" }}>
          <div>
            <div className="eyebrow">OFFICIAL STORE</div>
            <h2 className="h2" style={{ marginTop: 6 }}>Brand Pilihan</h2>
          </div>
          <div className="flex aic" style={{ gap: 6 }}>
            <RailArrowBtn dir={-1} onClick={() => scroll(-1)} />
            <RailArrowBtn dir={1} onClick={() => scroll(1)} />
            <a className="link-more" onClick={() => nav("category", { cat: "all" })} style={{ marginLeft: 6 }}>Lihat semua <Icon name="arrowR" size={16} /></a>
          </div>
        </div>
        <div style={{ padding: 16 }}>
          <div ref={marqueeRef} className="rail" style={{ gap: 12, scrollSnapType: "none", scrollbarWidth: "none" }}>
            {[...BRANDS, ...BRANDS].map((b, idx) =>
            <button key={idx} className="card" onClick={() => nav("category", { cat: "all", brand: b.name })}
            style={{ padding: "22px 26px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, transition: "all .18s", flex: "none", minWidth: 130 }}
            onMouseEnter={(e) => {e.currentTarget.style.boxShadow = "var(--sh)";e.currentTarget.style.borderColor = "var(--blue-200)";}}
            onMouseLeave={(e) => {e.currentTarget.style.boxShadow = "";e.currentTarget.style.borderColor = "var(--line)";}}>
                <span style={{ fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: 19, letterSpacing: "-.02em", color: "var(--ink)" }}>{b.name}</span>
                <span className="badge badge-blue" style={{ height: 19, fontSize: 10.5 }}>Official</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>);

}

/* ---------- Promo section ---------- */
function PromoSection() {
  const { pushToast } = useShop();
  const marqueeRef = React.useRef(null);
  useMarqueeScroll(marqueeRef, 0.45);

  const scroll = (dir) => {
    const el = marqueeRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 316, behavior: "smooth" });
  };

  const toneBg = {
    blue: "linear-gradient(135deg,#1d4ed8,#2f63ea)", amber: "linear-gradient(135deg,#f5ad1c,#e2920a)",
    green: "linear-gradient(135deg,#19a463,#0e8e52)", violet: "linear-gradient(135deg,#7a5af0,#5b3fd6)"
  };
  return (
    <div className="section">
      <div className="card" style={{ overflow: "hidden" }}>
        <div className="flex aic jcb" style={{ padding: "18px 22px", borderBottom: "1px solid var(--line)" }}>
          <div>
            <div className="eyebrow">VOUCHER & PROMO</div>
            <h2 className="h2" style={{ marginTop: 6 }}>Kumpulkan Promo</h2>
          </div>
          <div className="flex aic" style={{ gap: 6 }}>
            <RailArrowBtn dir={-1} onClick={() => scroll(-1)} />
            <RailArrowBtn dir={1} onClick={() => scroll(1)} />
          </div>
        </div>
        <div style={{ padding: 16 }}>
          <div ref={marqueeRef} className="rail" style={{ gap: 16, scrollSnapType: "none", scrollbarWidth: "none" }}>
            {[...PROMOS, ...PROMOS].map((pr, idx) =>
            <div key={idx} className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column", flex: "none", width: 300 }}>
                <div style={{ background: toneBg[pr.tone], padding: "20px 18px", color: pr.tone === "amber" ? "#3a1500" : "#fff", position: "relative" }}>
                  <Icon name="tag" size={64} style={{ position: "absolute", right: -8, top: -8, opacity: .16 }} />
                  <div style={{ fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: 21 }}>{pr.title}</div>
                  <div style={{ fontSize: 12.5, opacity: .92, marginTop: 4 }}>{pr.sub}</div>
                </div>
                <div className="flex aic jcb" style={{ padding: "12px 16px" }}>
                  <code style={{ fontFamily: "var(--ff-mono)", fontWeight: 700, fontSize: 13, letterSpacing: ".06em", padding: "5px 10px", border: "1.5px dashed var(--line-2)", borderRadius: 8, color: "var(--ink)" }}>{pr.code}</code>
                  <button className="btn btn-soft btn-sm" onClick={() => pushToast("Voucher " + pr.code + " diklaim!")}>Klaim</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}

/* ---------- Product grid section ---------- */
function ProductGridSection({ eyebrow, title, sub, products, cols = "g-5", onMore, rail }) {
  const { nav } = useShop();
  const railRef = React.useRef(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(true);
  useDragScroll(railRef);

  const updateArrows = () => {
    const el = railRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  React.useEffect(() => {updateArrows();}, []);

  const scrollRail = (dir) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (215 + 16) * 3, behavior: "smooth" });
    setTimeout(updateArrows, 450);
  };

  return (
    <div className="section">
      {rail ?
      <div className="card" style={{ overflow: "hidden" }}>
          <div className="flex aic jcb" style={{ padding: "18px 22px", borderBottom: "1px solid var(--line)" }}>
            <div>
              {eyebrow && <div className="eyebrow">{eyebrow}</div>}
              <h2 className="h2" style={{ marginTop: eyebrow ? 6 : 0 }}>{title}</h2>
            </div>
            <div className="flex aic" style={{ gap: 6 }}>
              <RailArrowBtn dir={-1} onClick={() => scrollRail(-1)} disabled={!canPrev} />
              <RailArrowBtn dir={1} onClick={() => scrollRail(1)} disabled={!canNext} />
              {onMore && <a className="link-more" onClick={onMore} style={{ marginLeft: 6 }}>Lihat semua <Icon name="arrowR" size={16} /></a>}
            </div>
          </div>
          <div style={{ padding: 16 }}>
            <div ref={railRef} onScroll={updateArrows} className="rail" style={{ scrollSnapType: "none", scrollbarWidth: "none" }}>
              {products.map((p) => <div key={p.id} style={{ minWidth: 215, maxWidth: 215, flex: "none" }}><ProductCard p={p} onOpen={(id) => nav("product", { id })} /></div>)}
            </div>
          </div>
        </div> :

      <React.Fragment>
          <SectionHead eyebrow={eyebrow} title={title} sub={sub} onMore={onMore} />
          <div className={"grid " + cols}>
            {products.map((p) => <ProductCard key={p.id} p={p} onOpen={(id) => nav("product", { id })} />)}
          </div>
        </React.Fragment>
      }
    </div>);

}

/* ================= HERO VARIANTS ================= */
function HeroCarousel() {
  const { nav } = useShop();
  const [i, setI] = React.useState(0);
  React.useEffect(() => {const iv = setInterval(() => setI((x) => (x + 1) % BANNERS.length), 5000);return () => clearInterval(iv);}, []);
  const b = BANNERS[i];
  const tone = { blue: "linear-gradient(120deg,#18306b,#1d4ed8 70%)", dark: "linear-gradient(120deg,#0e1526,#293a63)", amber: "linear-gradient(120deg,#bb710a,#f5ad1c)" };
  return (
    <div className="card" style={{ position: "relative", overflow: "hidden", borderRadius: "var(--r-xl)", background: tone[b.tone], minHeight: 340 }}>
      <div key={b.id} className="banner-in" style={{ position: "relative", zIndex: 2, padding: "46px 48px", maxWidth: 540, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="eyebrow" style={{ color: b.tone === "amber" ? "#3a1500" : "var(--amber-300)" }}>{b.eyebrow}</div>
        <h1 className="h1" style={{ color: b.tone === "amber" ? "#3a1500" : "#fff", fontSize: 40, marginTop: 12, whiteSpace: "pre-line" }}>{b.title}</h1>
        <p style={{ color: b.tone === "amber" ? "rgba(58,21,0,.85)" : "rgba(255,255,255,.85)", fontSize: 15.5, marginTop: 14, lineHeight: 1.55, maxWidth: 440 }}>{b.sub}</p>
        <div className="flex gap12" style={{ marginTop: 26 }}>
          <button className="btn btn-amber btn-lg" onClick={() => nav("category", { cat: b.cat })}>{b.cta} <Icon name="arrowR" size={18} /></button>
          <button className="btn btn-lg" style={{ background: "rgba(255,255,255,.16)", color: b.tone === "amber" ? "#3a1500" : "#fff", backdropFilter: "blur(6px)" }} onClick={() => nav("flashsale")}>Flash Sale</button>
        </div>
      </div>
      <Ph cat={b.cat} style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "42%", opacity: .9, background: "rgba(255,255,255,.06)", mixBlendMode: "luminosity" }} big />
      <div style={{ position: "absolute", left: 48, bottom: 22, display: "flex", gap: 7, zIndex: 3 }}>
        {BANNERS.map((_, ix) => <button key={ix} onClick={() => setI(ix)} style={{ width: ix === i ? 26 : 9, height: 9, borderRadius: 9, background: ix === i ? b.tone === "amber" ? "#3a1500" : "#fff" : "rgba(255,255,255,.45)", transition: "all .3s" }} />)}
      </div>
    </div>);

}

function HeroEditorial() {
  const { nav } = useShop();
  return (
    <div className="card" style={{ position: "relative", overflow: "hidden", borderRadius: "var(--r-xl)", background: "linear-gradient(115deg,#0e1526 0%,#18306b 55%,#1d4ed8 100%)", minHeight: 460 }}>
      <Ph cat="smartphone" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "48%", opacity: .85, background: "rgba(255,255,255,.05)", mixBlendMode: "luminosity" }} big />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(900px 400px at 80% 110%, rgba(245,173,28,.22), transparent)" }}></div>
      <div style={{ position: "relative", zIndex: 2, padding: "70px 60px", maxWidth: 620 }}>
        <div className="badge badge-flash" style={{ height: 26, fontSize: 12 }}><Icon name="sparkle" size={13} fill="currentColor" stroke={0} /> MEGA ELECTRONIC SALE 2026</div>
        <h1 className="h1" style={{ color: "#fff", fontSize: 56, lineHeight: 1.04, marginTop: 22 }}>Teknologi terbaik,<br /><span style={{ color: "var(--amber-300)" }}>harga paling ramah.</span></h1>
        <p style={{ color: "rgba(255,255,255,.82)", fontSize: 17, marginTop: 20, lineHeight: 1.6, maxWidth: 480 }}>Smartphone, laptop, dan audio original bergaransi resmi. Hemat hingga 40% + cicilan 0% + gratis ongkir se-Indonesia.</p>
        <div className="flex gap12" style={{ marginTop: 34 }}>
          <button className="btn btn-amber btn-lg" onClick={() => nav("category", { cat: "all" })}>Mulai Belanja <Icon name="arrowR" size={18} /></button>
          <button className="btn btn-lg" style={{ background: "rgba(255,255,255,.14)", color: "#fff" }} onClick={() => nav("flashsale")}><Icon name="fire" size={17} fill="#fff" stroke={0} /> Flash Sale</button>
        </div>
        <div className="flex gap16" style={{ marginTop: 40 }}>
          {[["12rb+", "Produk original"], ["4.9★", "Rating pembeli"], ["500rb+", "Pelanggan puas"]].map(([n, l]) =>
          <div key={l}><div style={{ fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: 26, color: "#fff" }}>{n}</div><div style={{ fontSize: 12.5, color: "rgba(255,255,255,.65)" }}>{l}</div></div>
          )}
        </div>
      </div>
    </div>);

}

function HeroEnergik() {
  const { nav } = useShop();
  return (
    <div className="card" style={{ position: "relative", overflow: "hidden", borderRadius: "var(--r-xl)", background: "linear-gradient(120deg,#ff5a3d 0%,#ff6a3d 40%,#f5ad1c 100%)", minHeight: 380 }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,.07) 0 18px, transparent 18px 36px)" }}></div>
      <div className="flex aic jcb" style={{ position: "relative", zIndex: 2, padding: "44px 52px", gap: 30, flexWrap: "wrap" }}>
        <div style={{ maxWidth: 560 }}>
          <div className="flex aic gap8" style={{ color: "#3a1500", fontWeight: 800, fontFamily: "var(--ff-mono)", letterSpacing: ".1em", fontSize: 13 }}><span className="live-dot"></span> FLASH SALE LIVE · HARI INI SAJA</div>
          <h1 className="h1" style={{ color: "#3a1500", fontSize: 50, lineHeight: 1.05, marginTop: 14 }}>Serbu diskon<br />hingga <span style={{ background: "#3a1500", color: "var(--amber-300)", padding: "0 14px", borderRadius: 12, display: "inline-block" }}>70%</span></h1>
          <p style={{ color: "rgba(58,21,0,.82)", fontSize: 16, marginTop: 16, fontWeight: 500 }}>Gadget incaranmu, harga jatuh sebentar saja. Buruan sebelum kehabisan!</p>
          <div className="flex gap12 aic" style={{ marginTop: 26 }}>
            <button className="btn btn-dark btn-lg" onClick={() => nav("flashsale")}>Serbu Sekarang <Icon name="arrowR" size={18} /></button>
            <div className="flex aic gap8" style={{ color: "#3a1500", fontWeight: 700 }}><Icon name="clock" size={18} /> <Countdown target={window.FLASH_END} light /></div>
          </div>
        </div>
        <div className="card" style={{ background: "rgba(255,255,255,.96)", padding: 18, width: 250, flex: "none", boxShadow: "var(--sh-lg)" }}>
          <div className="badge badge-flash" style={{ marginBottom: 10 }}><Icon name="fire" size={12} fill="currentColor" stroke={0} /> DEAL TERPANAS</div>
          <Ph cat={PRODUCTS[0].cat} style={{ borderRadius: 12, aspectRatio: "1/1" }} />
          <div style={{ fontWeight: 700, fontSize: 13.5, marginTop: 10, lineHeight: 1.3 }}>{PRODUCTS[0].name}</div>
          <div className="flex aic gap8" style={{ marginTop: 6 }}><span className="price" style={{ fontSize: 19, color: "var(--red-600)" }}>{RP(PRODUCTS[0].price)}</span><span className="badge badge-disc">-{discPct(PRODUCTS[0])}%</span></div>
          <button className="btn btn-amber btn-block btn-sm" style={{ marginTop: 12 }} onClick={() => nav("product", { id: PRODUCTS[0].id })}>Lihat Deal</button>
        </div>
      </div>
    </div>);

}

/* ================= HOME SCREEN ================= */
function HomeScreen({ homeStyle }) {
  const { nav } = useShop();
  const featured = PRODUCTS.filter((p) => p.featured);
  const Hero = homeStyle === "editorial" ? HeroEditorial : homeStyle === "energik" ? HeroEnergik : HeroCarousel;
  const big = homeStyle === "editorial";
  return (
    <div className="wrap" style={{ paddingTop: 22, paddingBottom: 10 }}>
      <Hero />
      <div style={{ marginTop: 22 }}><TrustBar /></div>
      <div className="section">
        <SectionHead eyebrow="JELAJAHI" title="Kategori Pilihan" onMore={() => nav("category", { cat: "all" })} />
        <CategoryStrip big={big} />
      </div>
      <FlashSaleSection variant={homeStyle === "energik" ? "energik" : "default"} />
      <ProductGridSection eyebrow="HANDPICKED" title="Produk Unggulan" sub="Kurasi terbaik dari tim Sinar Lestari"
      products={PRODUCTS.slice(0, 10)} onMore={() => nav("category", { cat: "all" })} rail />
      <BrandSection />
      <PromoSection />
      <ProductGridSection eyebrow="UNTUK KAMU" title="Rekomendasi" sub="Produk yang mungkin kamu suka"
      products={PRODUCTS.slice(6, big ? 14 : 16)} cols={big ? "g-4" : "g-5"} onMore={() => nav("category", { cat: "all" })} />
    </div>);

}

/* ================= FLASH SALE SCREEN ================= */
function FlashSaleScreen() {
  const { nav } = useShop();
  const items = PRODUCTS.filter((p) => p.flash).concat(PRODUCTS.filter((p) => !p.flash).slice(0, 4));
  return (
    <div className="wrap" style={{ paddingTop: 22, paddingBottom: 20 }}>
      <div className="card" style={{ overflow: "hidden", background: "linear-gradient(120deg,#ff5a3d,#f5ad1c)", padding: "30px 34px", marginBottom: 22 }}>
        <div className="flex aic jcb" style={{ flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="flex aic gap8" style={{ color: "#3a1500", fontWeight: 800, fontFamily: "var(--ff-mono)", letterSpacing: ".1em", fontSize: 13 }}><span className="live-dot"></span> LIVE NOW</div>
            <h1 className="h1" style={{ color: "#3a1500", fontSize: 40, marginTop: 8 }}><Icon name="fire" size={36} fill="#3a1500" stroke={0} /> Flash Sale</h1>
            <p style={{ color: "rgba(58,21,0,.82)", marginTop: 8, fontWeight: 500 }}>Harga spesial, stok terbatas. Berakhir dalam:</p>
          </div>
          <div className="flex aic" style={{ gap: 6 }}><Countdown target={window.FLASH_END} light /></div>
        </div>
      </div>
      <div className="grid g-5">
        {items.map((p) =>
        <div key={p.id} style={{ position: "relative" }}>
            <ProductCard p={p} onOpen={(id) => nav("product", { id })} />
            <div style={{ position: "absolute", left: 12, right: 12, bottom: 64 }}>
              <div className="flex aic jcb" style={{ fontSize: 10.5, fontWeight: 700, marginBottom: 3 }}>
                <span style={{ color: "var(--red-600)" }}>Terjual {p.stock < 15 ? "cepat" : "banyak"}</span>
                <span className="muted">Sisa {p.stock}</span>
              </div>
              <div className="rating-bar" style={{ height: 6 }}><i style={{ width: Math.min(95, 100 - p.stock) + "%", background: "linear-gradient(90deg,#ff5a3d,#f5ad1c)" }}></i></div>
            </div>
          </div>
        )}
      </div>
    </div>);

}

Object.assign(window, {
  HomeScreen, FlashSaleScreen, CategoryStrip, TrustBar, SectionHead,
  FlashSaleSection, BrandSection, PromoSection, ProductGridSection
});