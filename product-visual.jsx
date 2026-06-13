/* ============================================================
   PRODUCT VISUAL — CSS-rendered studio product per category
   (replaces line placeholders; scales to any square container)
   ============================================================ */

const PV_THEME = {
  smartphone: { bg: ["#dbe8ff", "#aec6fb"], glow: "#3b82f6", floor: "rgba(40,70,140,.22)" },
  laptop:     { bg: ["#d6f3e6", "#a4e0c4"], glow: "#10b981", floor: "rgba(20,110,70,.20)" },
  audio:      { bg: ["#ffe9c7", "#fcd189"], glow: "#f59e0b", floor: "rgba(150,90,10,.20)" },
  tv:         { bg: ["#e4ddfb", "#c2b3f4"], glow: "#7c5af0", floor: "rgba(70,40,140,.22)" },
  kamera:     { bg: ["#fbd9e7", "#f4aac7"], glow: "#ec4899", floor: "rgba(150,30,80,.20)" },
  gaming:     { bg: ["#cdeefc", "#9bd9f5"], glow: "#06b6d4", floor: "rgba(10,90,120,.22)" },
  smarthome:  { bg: ["#dcf6e1", "#aee6ba"], glow: "#22c55e", floor: "rgba(20,110,50,.20)" },
  aksesoris:  { bg: ["#fdeecb", "#f7d98f"], glow: "#eab308", floor: "rgba(150,110,10,.20)" },
};

function Floor({ c }) {
  return <div style={{ position: "absolute", left: "50%", bottom: "12%", transform: "translateX(-50%)", width: "56%", height: "9%", borderRadius: "50%", background: "radial-gradient(closest-side," + c + ", transparent)", filter: "blur(2px)", zIndex: 1 }} />;
}
const gloss = { position: "absolute", borderRadius: "inherit", background: "linear-gradient(150deg, rgba(255,255,255,.55), rgba(255,255,255,0) 45%)", inset: 0, pointerEvents: "none" };

function PVPhone({ glow }) {
  return (
    <div style={{ position: "relative", width: "40%", height: "76%", zIndex: 2 }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "16%/8%", background: "linear-gradient(145deg,#2b3552,#0e1422)", boxShadow: "0 18px 30px rgba(20,30,60,.3), inset 0 0 0 1.5px rgba(255,255,255,.12)" }}>
        <div style={{ position: "absolute", inset: "5%", borderRadius: "13%/7%", background: "radial-gradient(120% 80% at 50% 0%," + glow + ",#0b1430 75%)" }}>
          <div style={{ position: "absolute", top: "5%", left: "50%", transform: "translateX(-50%)", width: "34%", height: "5%", borderRadius: 20, background: "#070b16" }} />
        </div>
        <div style={gloss} />
      </div>
    </div>
  );
}
function PVLaptop({ glow }) {
  return (
    <div style={{ position: "relative", width: "74%", height: "54%", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "82%", height: "82%", borderRadius: "8px 8px 2px 2px", background: "linear-gradient(150deg,#2b3552,#0e1422)", padding: "5%", boxShadow: "0 14px 22px rgba(20,30,60,.28)" }}>
        <div style={{ width: "100%", height: "100%", borderRadius: 3, background: "radial-gradient(120% 90% at 50% 0%," + glow + ",#0b1430 80%)", position: "relative", overflow: "hidden" }}><div style={gloss} /></div>
      </div>
      <div style={{ width: "100%", height: "9%", borderRadius: "3px 3px 7px 7px", background: "linear-gradient(#c7d0e0,#9aa6bd)", boxShadow: "0 8px 14px rgba(20,30,60,.22)" }}>
        <div style={{ width: "16%", height: "30%", margin: "0 auto", borderRadius: "0 0 6px 6px", background: "#8794ad" }} />
      </div>
    </div>
  );
}
function PVAudio({ glow }) {
  return (
    <div style={{ position: "relative", width: "56%", height: "62%", zIndex: 2 }}>
      <div style={{ position: "absolute", top: 0, left: "12%", right: "12%", height: "54%", borderStyle: "solid", borderColor: "#26314e", borderBottom: "none", borderRadius: "50% 50% 0 0", borderWidth: "14px 14px 0", boxSizing: "border-box" }} />
      {["left", "right"].map((s) => (
        <div key={s} style={{ position: "absolute", bottom: "6%", [s]: "2%", width: "34%", height: "62%", borderRadius: "32%", background: "linear-gradient(150deg,#2b3552,#0e1422)", boxShadow: "0 12px 20px rgba(20,30,60,.28)", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: "22%", borderRadius: "32%", background: "radial-gradient(circle at 40% 30%," + glow + ",#10172e)" }} /><div style={gloss} />
        </div>
      ))}
    </div>
  );
}
function PVTv({ glow }) {
  return (
    <div style={{ position: "relative", width: "78%", height: "60%", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", height: "82%", borderRadius: 8, background: "#0c1322", padding: "2.5%", boxShadow: "0 16px 26px rgba(20,30,60,.3), inset 0 0 0 1.5px rgba(255,255,255,.08)" }}>
        <div style={{ width: "100%", height: "100%", borderRadius: 4, background: "radial-gradient(120% 100% at 50% 0%," + glow + ",#0b1430 78%)", position: "relative", overflow: "hidden" }}><div style={gloss} /></div>
      </div>
      <div style={{ width: "9%", height: "10%", background: "#5b667d" }} />
      <div style={{ width: "30%", height: "4%", borderRadius: 6, background: "#46506680" }} />
    </div>
  );
}
function PVCamera({ glow }) {
  return (
    <div style={{ position: "relative", width: "62%", height: "50%", zIndex: 2 }}>
      <div style={{ position: "absolute", top: "-14%", left: "20%", width: "26%", height: "20%", borderRadius: "4px 4px 0 0", background: "#2b3552" }} />
      <div style={{ position: "absolute", inset: 0, top: "6%", borderRadius: 12, background: "linear-gradient(150deg,#33405f,#141c30)", boxShadow: "0 14px 24px rgba(20,30,60,.3)", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "16%", right: "12%", width: "12%", height: "16%", borderRadius: 3, background: "#0e1426" }} />
        <div style={gloss} />
      </div>
      <div style={{ position: "absolute", top: "32%", left: "50%", transform: "translateX(-50%)", width: "46%", aspectRatio: "1/1", borderRadius: "50%", background: "radial-gradient(circle at 38% 32%,#5a657d,#0a1024)", boxShadow: "0 8px 18px rgba(0,0,0,.3)", display: "grid", placeItems: "center" }}>
        <div style={{ width: "62%", height: "62%", borderRadius: "50%", background: "radial-gradient(circle at 40% 35%," + glow + ",#0a1024 78%)", border: "2px solid rgba(255,255,255,.1)" }} />
      </div>
    </div>
  );
}
function PVGaming({ glow }) {
  return (
    <div style={{ position: "relative", width: "70%", height: "44%", zIndex: 2 }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "44% / 70%", background: "linear-gradient(150deg,#2b3552,#0e1422)", boxShadow: "0 14px 24px rgba(20,30,60,.3)", overflow: "hidden" }}>
        <div style={gloss} />
        <div style={{ position: "absolute", top: "30%", left: "18%", width: "16%", aspectRatio: "1/1", borderRadius: "50%", background: "radial-gradient(circle at 40% 35%," + glow + ",#0a1024)" }} />
        <div style={{ position: "absolute", top: "30%", right: "18%", width: "16%", aspectRatio: "1/1", borderRadius: "50%", background: "radial-gradient(circle at 40% 35%," + glow + ",#0a1024)" }} />
        <div style={{ position: "absolute", top: "26%", left: "44%", width: "4%", height: "30%", background: "#465066", borderRadius: 2 }} />
        <div style={{ position: "absolute", top: "36%", left: "40%", width: "12%", height: "5%", background: "#465066", borderRadius: 2 }} />
      </div>
    </div>
  );
}
function PVBulb({ glow }) {
  return (
    <div style={{ position: "relative", width: "40%", height: "70%", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", aspectRatio: "1/1", borderRadius: "50% 50% 48% 48%", background: "radial-gradient(circle at 40% 32%,#fff," + glow + " 95%)", boxShadow: "0 0 38px " + glow + "88, 0 14px 22px rgba(20,30,60,.2)", position: "relative", overflow: "hidden" }}><div style={gloss} /></div>
      <div style={{ width: "44%", height: "20%", marginTop: "-4%", background: "linear-gradient(#cfd6e2,#9aa6bd)", borderRadius: "3px 3px 5px 5px", backgroundImage: "repeating-linear-gradient(#cfd6e2 0 3px,#aab4c6 3px 6px)" }} />
    </div>
  );
}
function PVCharger({ glow }) {
  return (
    <div style={{ position: "relative", width: "46%", height: "62%", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "flex", gap: "16%", height: "16%", width: "44%" }}>
        <div style={{ flex: 1, background: "#b9c2d4", borderRadius: "3px 3px 0 0" }} /><div style={{ flex: 1, background: "#b9c2d4", borderRadius: "3px 3px 0 0" }} />
      </div>
      <div style={{ width: "100%", flex: 1, borderRadius: 16, background: "linear-gradient(150deg,#fdfefe,#dde4ef)", boxShadow: "0 14px 24px rgba(20,30,60,.22), inset 0 0 0 1.5px rgba(255,255,255,.6)", position: "relative", overflow: "hidden", display: "grid", placeItems: "center" }}>
        <div style={{ width: "30%", aspectRatio: "1/1", borderRadius: "50%", background: "radial-gradient(circle at 40% 35%," + glow + ",#0a1024 90%)" }} />
        <div style={gloss} />
      </div>
    </div>
  );
}

const PV_MAP = { smartphone: PVPhone, laptop: PVLaptop, audio: PVAudio, tv: PVTv, kamera: PVCamera, gaming: PVGaming, smarthome: PVBulb, aksesoris: PVCharger };

function ProductVisual({ cat }) {
  const th = PV_THEME[cat] || PV_THEME.smartphone;
  const Shape = PV_MAP[cat] || PVPhone;
  return (
    <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", overflow: "hidden", background: "radial-gradient(120% 100% at 50% 18%," + th.bg[0] + "," + th.bg[1] + ")" }}>
      <div style={{ position: "absolute", top: "-30%", left: "-20%", width: "70%", height: "70%", borderRadius: "50%", background: "radial-gradient(circle," + th.glow + "33, transparent 70%)" }} />
      <Floor c={th.floor} />
      <Shape glow={th.glow} />
    </div>
  );
}

window.ProductVisual = ProductVisual;
window.PV_THEME = PV_THEME;
