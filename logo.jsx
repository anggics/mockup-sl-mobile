/* ============================================================
   LOGO EXPLORATION — 3 konsep logo Sinar Lestari Elektronik
   ============================================================ */

/* ---------- Marks ---------- */
// A — Monogram Tile (refined current): blue gradient square + S + amber spark dot
function MarkTile({ size = 56, mono }) {
  const r = size * 0.29;
  return (
    <div style={{ width: size, height: size, borderRadius: r, position: "relative", background: mono ? "#0e1f47" : "linear-gradient(150deg,#2f63ea,#1b40ad)", display: "grid", placeItems: "center", boxShadow: mono ? "none" : "0 8px 18px rgba(29,78,216,.32)", flex: "none" }}>
      <span style={{ color: "#fff", fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: size * 0.46, lineHeight: 1 }}>S</span>
      <span style={{ position: "absolute", right: -size * 0.07, bottom: -size * 0.07, width: size * 0.3, height: size * 0.3, borderRadius: "50%", background: mono ? "#0e1f47" : "#f5ad1c", border: `${size * 0.06}px solid ${mono ? "#fff" : "var(--card-bg,#fff)"}` }} />
    </div>
  );
}
// B — Sinar Ray: a sunburst (light ray = "sinar") with amber core
function MarkRay({ size = 56, mono }) {
  const blue = mono ? "#0e1f47" : "#1d4ed8"; const amber = mono ? "#0e1f47" : "#f5ad1c";
  const rays = [];
  for (let i = 0; i < 12; i++) { const a = (i * 30) * Math.PI / 180; rays.push([12 + Math.cos(a) * 7.4, 12 + Math.sin(a) * 7.4, 12 + Math.cos(a) * 10.6, 12 + Math.sin(a) * 10.6]); }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: "none" }}>
      {rays.map((p, i) => <line key={i} x1={p[0]} y1={p[1]} x2={p[2]} y2={p[3]} stroke={blue} strokeWidth="2" strokeLinecap="round" />)}
      <circle cx="12" cy="12" r="5.6" fill={amber} />
      <circle cx="12" cy="12" r="2.4" fill={mono ? "#fff" : "#fff"} opacity={mono ? 0.9 : 0.95} />
    </svg>
  );
}
// C — Bolt S: lightning bolt shaped like an S (electronics + energy)
function MarkBolt({ size = 56, mono }) {
  const r = size * 0.29;
  return (
    <div style={{ width: size, height: size, borderRadius: r, position: "relative", background: mono ? "#0e1f47" : "linear-gradient(150deg,#1b40ad,#0e1f47)", display: "grid", placeItems: "center", boxShadow: mono ? "none" : "0 8px 18px rgba(20,40,90,.3)", flex: "none", overflow: "hidden" }}>
      <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 24 24" fill="none">
        <path d="M14.5 2L5 13.5h5.2L9 22l9.5-11.7H13L14.5 2z" fill={mono ? "#fff" : "#f5ad1c"} stroke={mono ? "#fff" : "#fbdd8f"} strokeWidth="0.6" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Wordmark({ light, size = 1 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
      <b style={{ fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: 20 * size, letterSpacing: "-.01em", color: light ? "#fff" : "#0e1526" }}>Sinar Lestari</b>
      <small style={{ fontSize: 9.5 * size, fontWeight: 700, letterSpacing: ".26em", textTransform: "uppercase", color: "#f5ad1c", marginTop: 4 }}>Elektronik</small>
    </div>
  );
}

const MARKS = { tile: MarkTile, ray: MarkRay, bolt: MarkBolt, aurora: MarkAurora, burst: MarkBurst, orbit: MarkOrbit, hexa: MarkHexa, ribbon: MarkRibbon, prism: MarkPrism };

/* ---------- Konsep eksklusif: tema teknologi & premium ---------- */
// G — Hexa Chip: heksagon microchip dengan pin amber + monogram, kesan elektronik
function MarkHexa({ size = 56, mono }) {
  const hex = "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)";
  const pin = (style) => <span style={{ position: "absolute", width: size * 0.12, height: size * 0.07, background: mono ? "#0e1f47" : "#f5ad1c", borderRadius: 2, ...style }} />;
  return (
    <div style={{ width: size, height: size, position: "relative", display: "grid", placeItems: "center", flex: "none" }}>
      {pin({ left: -size * 0.04, top: size * 0.3 })}{pin({ left: -size * 0.04, bottom: size * 0.3 })}
      {pin({ right: -size * 0.04, top: size * 0.3 })}{pin({ right: -size * 0.04, bottom: size * 0.3 })}
      <div style={{ width: "100%", height: "100%", clipPath: hex, background: mono ? "#0e1f47" : "linear-gradient(150deg,#2f63ea,#18306b)", display: "grid", placeItems: "center", position: "relative", boxShadow: mono ? "none" : "0 8px 18px rgba(20,40,90,.3)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(150deg,rgba(255,255,255,.4),transparent 45%)" }} />
        <span style={{ position: "relative", color: "#fff", fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: size * 0.4 }}>S</span>
      </div>
    </div>
  );
}
// H — Ribbon S: huruf 'S' sebagai pita gradien biru→amber yang mengalir, dinamis
function MarkRibbon({ size = 56, mono }) {
  const gid = React.useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flex: "none", filter: mono ? "none" : "drop-shadow(0 4px 9px rgba(29,99,234,.32))" }}>
      <defs><linearGradient id={"r" + gid} x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor={mono ? "#0e1f47" : "#2f63ea"} /><stop offset="55%" stopColor={mono ? "#0e1f47" : "#6d5bf0"} /><stop offset="100%" stopColor={mono ? "#0e1f47" : "#f5ad1c"} /></linearGradient></defs>
      <path d="M17.5 6.2C17.5 3.4 13.4 2.6 10.4 3.6 7.4 4.6 6.4 7.8 8.4 9.8 10 11.4 14 11.2 15.6 13 17.6 15.2 16 18.8 13 19.8 10 20.8 6.5 19.6 6 17.2" stroke={"url(#r" + gid + ")"} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
// I — Prism Gem: berlian/prisma berfaset dengan gradien, percikan amber — kesan premium
function MarkPrism({ size = 56, mono }) {
  const gid = React.useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: "none", filter: mono ? "none" : "drop-shadow(0 6px 12px rgba(45,70,180,.32))" }}>
      <defs>
        <linearGradient id={"p" + gid} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={mono ? "#152a55" : "#5c86f7"} /><stop offset="100%" stopColor={mono ? "#0e1f47" : "#1b40ad"} /></linearGradient>
        <linearGradient id={"p2" + gid} x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stopColor={mono ? "#0e1f47" : "#1d4ed8"} /><stop offset="100%" stopColor={mono ? "#152a55" : "#2f63ea"} /></linearGradient>
      </defs>
      <path d="M12 2L22 11 12 22 2 11z" fill={"url(#p" + gid + ")"} />
      <path d="M12 2L17 11 12 22 12 2z" fill={"url(#p2" + gid + ")"} opacity=".85" />
      <path d="M2 11h20" stroke="#fff" strokeWidth=".7" opacity=".4" />
      <path d="M12 2L12 22M7 11l5-9 5 9" stroke="#fff" strokeWidth=".7" opacity=".35" fill="none" />
      <path d="M14.5 6.5l.8 1.7 1.7.8-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.8z" fill={mono ? "#fff" : "#f5ad1c"} />
    </svg>
  );
}

/* ---------- Konsep tambahan: lebih hidup & dinamis ---------- */
// D — Aurora S: squircle gradien tri-warna (biru→violet→amber), kilau + percikan
function MarkAurora({ size = 56, mono }) {
  const r = size * 0.29;
  return (
    <div style={{ width: size, height: size, borderRadius: r, position: "relative", overflow: "hidden", background: mono ? "#0e1f47" : "linear-gradient(135deg,#2f63ea 0%,#6d5bf0 52%,#f5ad1c 120%)", display: "grid", placeItems: "center", boxShadow: mono ? "none" : "0 10px 22px rgba(80,70,220,.34)", flex: "none" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(150deg,rgba(255,255,255,.5),rgba(255,255,255,0) 46%)" }} />
      {!mono && <>
        <span style={{ position: "absolute", top: size * 0.13, right: size * 0.16, width: size * 0.12, height: size * 0.12, background: "#fff", clipPath: "polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%)", opacity: .9 }} />
        <span style={{ position: "absolute", bottom: size * 0.2, left: size * 0.16, width: size * 0.08, height: size * 0.08, background: "#fff", clipPath: "polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%)", opacity: .75 }} />
      </>}
      <span style={{ position: "relative", color: "#fff", fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: size * 0.48, lineHeight: 1, textShadow: "0 2px 6px rgba(20,20,60,.25)" }}>S</span>
    </div>
  );
}
// E — Burst Ray: sunburst hidup dengan rays panjang-pendek + inti glow amber→oranye
function MarkBurst({ size = 56, mono }) {
  const gid = React.useId().replace(/:/g, "");
  const blue = mono ? "#0e1f47" : "#1d4ed8";
  const rays = [];
  for (let i = 0; i < 16; i++) { const a = (i * 22.5) * Math.PI / 180; const long = i % 2 === 0; const r1 = 7.6, r2 = long ? 11.2 : 9.4; rays.push([12 + Math.cos(a) * r1, 12 + Math.sin(a) * r1, 12 + Math.cos(a) * r2, 12 + Math.sin(a) * r2, long]); }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: "none", filter: mono ? "none" : "drop-shadow(0 4px 8px rgba(245,150,20,.4))" }}>
      <defs><radialGradient id={"c" + gid} cx="42%" cy="38%" r="70%"><stop offset="0%" stopColor={mono ? "#0e1f47" : "#ffd16a"} /><stop offset="60%" stopColor={mono ? "#0e1f47" : "#f5ad1c"} /><stop offset="100%" stopColor={mono ? "#0e1f47" : "#e2720a"} /></radialGradient></defs>
      {!mono && <circle cx="12" cy="12" r="9.4" fill="#f5ad1c" opacity=".18" />}
      {rays.map((p, i) => <line key={i} x1={p[0]} y1={p[1]} x2={p[2]} y2={p[3]} stroke={blue} strokeWidth={p[4] ? 2 : 1.4} strokeLinecap="round" opacity={p[4] ? 1 : .7} />)}
      <circle cx="12" cy="12" r="5.4" fill={"url(#c" + gid + ")"} />
      <circle cx="10.4" cy="10.4" r="1.5" fill="#fff" opacity={mono ? .8 : .9} />
    </svg>
  );
}
// F — Orbit Spark: percikan amber dengan cincin orbit miring + komet (kesan gerak)
function MarkOrbit({ size = 56, mono }) {
  const gid = React.useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: "none", filter: mono ? "none" : "drop-shadow(0 5px 10px rgba(29,99,234,.3))" }}>
      <defs><linearGradient id={"o" + gid} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={mono ? "#0e1f47" : "#5c86f7"} /><stop offset="100%" stopColor={mono ? "#0e1f47" : "#1b40ad"} /></linearGradient></defs>
      <g transform="rotate(-28 12 12)">
        <ellipse cx="12" cy="12" rx="10.4" ry="5.2" fill="none" stroke={"url(#o" + gid + ")"} strokeWidth="1.8" />
        <circle cx="22.2" cy="12" r="1.7" fill={mono ? "#0e1f47" : "#1d4ed8"} />
      </g>
      {!mono && <circle cx="12" cy="12" r="6.4" fill="#f5ad1c" opacity=".2" />}
      <path d="M12 5.2l1.7 3.9 4.2.5-3.1 2.8.9 4.1-3.7-2.2-3.7 2.2.9-4.1L6.1 9.6l4.2-.5L12 5.2z" fill={mono ? "#0e1f47" : "#f5ad1c"} stroke={mono ? "#fff" : "#fff"} strokeWidth=".5" strokeLinejoin="round" />
    </svg>
  );
}

function LogoConcept({ id, name, mark, desc, tagline }) {
  const Mark = MARKS[mark];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", fontFamily: "var(--ff-sans)" }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #eef1f6" }}>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: 11, fontWeight: 700, letterSpacing: ".14em", color: "#1d4ed8" }}>{id}</div>
        <div style={{ fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: 17, marginTop: 4 }}>{name}</div>
        <div style={{ fontSize: 12, color: "#6b7488", marginTop: 4, lineHeight: 1.45 }}>{desc}</div>
      </div>
      {/* primary on white */}
      <div style={{ flex: 1, display: "grid", placeItems: "center", padding: "26px 20px", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 13 }}><Mark size={56} /><Wordmark /></div>
      </div>
      {/* on dark */}
      <div style={{ display: "grid", placeItems: "center", padding: "26px 20px", background: "linear-gradient(135deg,#0e1526,#18306b)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 13 }}><Mark size={56} /><Wordmark light /></div>
      </div>
      {/* mark sizes + mono */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", padding: "20px", background: "#f5f7fa", borderTop: "1px solid #eef1f6" }}>
        <div style={{ textAlign: "center" }}><Mark size={48} /><div style={{ fontSize: 10, color: "#98a0b3", marginTop: 8 }}>App icon</div></div>
        <div style={{ textAlign: "center" }}><Mark size={30} /><div style={{ fontSize: 10, color: "#98a0b3", marginTop: 8 }}>Favicon</div></div>
        <div style={{ textAlign: "center" }}><Mark size={40} mono /><div style={{ fontSize: 10, color: "#98a0b3", marginTop: 8 }}>Monokrom</div></div>
      </div>
      <div style={{ padding: "12px 20px", background: "#fff", borderTop: "1px solid #eef1f6", fontSize: 11.5, color: "#6b7488", fontStyle: "italic", textAlign: "center" }}>“{tagline}”</div>
    </div>
  );
}

function LogoCanvas() {
  return (
    <DesignCanvas>
      <DCSection id="konsep" title="Logo Sinar Lestari Elektronik" subtitle="3 konsep · biru + amber · modern & profesional. Pilih favoritmu.">
        <DCArtboard id="a" label="Konsep A · Monogram Tile" width={340} height={560}>
          <LogoConcept id="KONSEP A" name="Monogram Tile" mark="tile" desc="Inisial 'S' dalam tile biru dengan aksen titik amber. Bersih, ikonik, sempurna untuk app icon." tagline="Terang & dapat diandalkan" />
        </DCArtboard>
        <DCArtboard id="b" label="Konsep B · Sinar Ray" width={340} height={560}>
          <LogoConcept id="KONSEP B" name="Sinar Ray" mark="ray" desc="Pancaran sinar (ray) melambangkan nama 'Sinar' — inti amber, pancaran biru. Energik & cerah." tagline="Menyinari pilihan elektronikmu" />
        </DCArtboard>
        <DCArtboard id="c" label="Konsep C · Bolt S" width={340} height={560}>
          <LogoConcept id="KONSEP C" name="Bolt S" mark="bolt" desc="Petir amber berbentuk 'S' di tile gelap — kuat mewakili dunia elektronik & energi." tagline="Bertenaga, tepercaya, asli" />
        </DCArtboard>
      </DCSection>
      <DCSection id="tambahan" title="Konsep Tambahan — Lebih Hidup ✨" subtitle="3 alternatif baru dengan gradien, glow, dan kesan dinamis.">
        <DCArtboard id="d" label="Konsep D · Aurora S" width={340} height={560}>
          <LogoConcept id="KONSEP D" name="Aurora S" mark="aurora" desc="Monogram dengan gradien tri-warna biru→violet→amber, kilau & percikan bintang. Segar, premium, kekinian." tagline="Warna baru dunia elektronik" />
        </DCArtboard>
        <DCArtboard id="e" label="Konsep E · Burst Ray" width={340} height={560}>
          <LogoConcept id="KONSEP E" name="Burst Ray" mark="burst" desc="Pancaran sinar dinamis panjang-pendek dengan inti menyala amber-oranye. Energik, ceria, penuh semangat." tagline="Bersinar lebih terang" />
        </DCArtboard>
        <DCArtboard id="f" label="Konsep F · Orbit Spark" width={340} height={560}>
          <LogoConcept id="KONSEP F" name="Orbit Spark" mark="orbit" desc="Bintang amber mengorbit dengan cincin miring & komet — memberi kesan gerak, inovasi, dan teknologi." tagline="Selalu selangkah lebih maju" />
        </DCArtboard>
      </DCSection>
      <DCSection id="eksklusif" title="Konsep Eksklusif — Teknologi & Premium 💎" subtitle="3 alternatif baru bertema chip, pita dinamis, dan prisma mewah.">
        <DCArtboard id="g" label="Konsep G · Hexa Chip" width={340} height={560}>
          <LogoConcept id="KONSEP G" name="Hexa Chip" mark="hexa" desc="Heksagon microchip dengan pin amber — langsung berkata 'elektronik'. Tegas, teknologis, modern." tagline="Inti dari setiap gadget" />
        </DCArtboard>
        <DCArtboard id="h" label="Konsep H · Ribbon S" width={340} height={560}>
          <LogoConcept id="KONSEP H" name="Ribbon S" mark="ribbon" desc="Huruf 'S' sebagai pita gradien biru→amber yang mengalir. Luwes, dinamis, sangat kekinian." tagline="Bergerak luwes, selalu terhubung" />
        </DCArtboard>
        <DCArtboard id="i" label="Konsep I · Prism Gem" width={340} height={560}>
          <LogoConcept id="KONSEP I" name="Prism Gem" mark="prism" desc="Prisma berlian berfaset dengan percikan amber — kesan premium, jernih, dan bernilai tinggi." tagline="Kualitas berkilau, asli terjamin" />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<LogoCanvas />);
