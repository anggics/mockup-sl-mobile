/* ============================================================
   MOBILE APP FULLSCREEN — renders MobileApp filling the viewport
   (no phone bezels / showcase wrapper)
   ============================================================ */

function MobileAppFull() {
  return (
    <div style={{
      width: "100%",
      maxWidth: 480,
      margin: "0 auto",
      height: "100dvh",
      display: "flex",
      flexDirection: "column",
      background: "var(--bg)",
      position: "relative",
      overflow: "hidden",
    }}>
      <MobileApp platform="web" />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<MobileAppFull />);
