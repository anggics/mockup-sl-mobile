/* ============================================================
   AUTH — Daftar (multi-step), Login, Lupa Password
   ============================================================ */

/* Split-screen brand panel */
function AuthShell({ children, wide }) {
  const { nav } = useShop();
  const points = [
    ["shield", "Produk 100% original bergaransi resmi"],
    ["coin", "Kumpulkan poin & tukar jadi voucher"],
    ["truck", "Gratis ongkir & cicilan 0% se-Indonesia"],
  ];
  return (
    <div className="wrap" style={{ paddingTop: 28, paddingBottom: 50 }}>
      <div className="card" style={{ overflow: "hidden", display: "flex", minHeight: 560, boxShadow: "var(--sh-lg)" }}>
        <div style={{ width: 380, flex: "none", background: "linear-gradient(150deg,#0e1526,#18306b 60%,#1d4ed8)", color: "#fff", padding: "40px 36px", position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(600px 300px at 90% 100%, rgba(245,173,28,.22), transparent)" }}></div>
          <div style={{ position: "relative" }}>
            <div className="logo" onClick={() => nav("home")} style={{ cursor: "pointer" }}>
              <div className="logo-mark"><span>S</span></div>
              <div className="logo-text"><b style={{ color: "#fff" }}>Sinar Lestari</b><small>Elektronik</small></div>
            </div>
            <h2 className="h1" style={{ color: "#fff", fontSize: 30, marginTop: 40, lineHeight: 1.15 }}>Belanja gadget,<br />lebih hemat &amp; aman.</h2>
            <p style={{ color: "rgba(255,255,255,.78)", fontSize: 14, marginTop: 14, lineHeight: 1.6 }}>Gabung jadi member dan nikmati harga spesial, poin reward, serta layanan terbaik.</p>
          </div>
          <div className="col gap16" style={{ position: "relative", marginTop: 30 }}>
            {points.map(([ic, t]) => (
              <div key={t} className="flex aic gap12">
                <span style={{ width: 38, height: 38, borderRadius: 11, background: "rgba(255,255,255,.12)", display: "grid", placeItems: "center", flex: "none" }}><Icon name={ic} size={19} /></span>
                <span style={{ fontSize: 13.5, color: "rgba(255,255,255,.92)" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, padding: wide ? "44px 56px" : "44px 60px", display: "flex", flexDirection: "column", justifyContent: "center", overflowY: "auto" }}>{children}</div>
      </div>
    </div>
  );
}

/* ---------------- Login ---------------- */
function LoginScreen({ params }) {
  const { nav, login } = useShop();
  const [email, setEmail] = React.useState("budi@email.com");
  const [pass, setPass] = React.useState("password");
  const [show, setShow] = React.useState(false);
  const [err, setErr] = React.useState("");
  const submit = (e) => { e.preventDefault(); if (!email || !pass) { setErr("Email dan kata sandi wajib diisi."); return; } login(); nav(params.next || "home"); };
  return (
    <AuthShell>
      <div style={{ maxWidth: 380, margin: "0 auto", width: "100%" }}>
        <h2 className="h2">Masuk ke akunmu</h2>
        <p className="muted" style={{ fontSize: 14, marginTop: 6 }}>Belum punya akun? <a onClick={() => nav("register")} style={{ color: "var(--blue-600)", fontWeight: 700, cursor: "pointer" }}>Daftar gratis</a></p>
        <form onSubmit={submit} className="col gap16" style={{ marginTop: 26 }}>
          <div className="field"><label>Email atau No. HP</label>
            <div className="input-group"><span className="ig-icon"><Icon name="mail" size={18} /></span><input className="input" value={email} onChange={(e) => { setEmail(e.target.value); setErr(""); }} placeholder="kamu@email.com" /></div></div>
          <div className="field">
            <div className="flex jcb aic"><label>Kata Sandi</label><a onClick={() => nav("forgot")} style={{ fontSize: 12.5, color: "var(--blue-600)", fontWeight: 600, cursor: "pointer" }}>Lupa sandi?</a></div>
            <div className="input-group"><span className="ig-icon"><Icon name="lock" size={18} /></span>
              <input className="input" type={show ? "text" : "password"} value={pass} onChange={(e) => { setPass(e.target.value); setErr(""); }} placeholder="••••••••" style={{ paddingRight: 44 }} />
              <button type="button" onClick={() => setShow(!show)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--faint)" }}><Icon name={show ? "eyeOff" : "eye"} size={18} /></button></div>
          </div>
          {err && <div className="input-err">{err}</div>}
          <button className="btn btn-primary btn-lg btn-block" type="submit">Masuk</button>
        </form>
        <div className="flex aic gap12" style={{ margin: "22px 0" }}><hr className="hr" style={{ flex: 1 }} /><span className="muted" style={{ fontSize: 12.5 }}>atau</span><hr className="hr" style={{ flex: 1 }} /></div>
        <div className="flex gap12">
          <button className="btn btn-ghost" style={{ flex: 1 }}>Google</button>
          <button className="btn btn-ghost" style={{ flex: 1 }}>Facebook</button>
        </div>
      </div>
    </AuthShell>
  );
}

/* ---------------- Register multi-step ---------------- */
function RegisterScreen() {
  const { nav, login, pushToast } = useShop();
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({ name: "", email: "", phone: "", pass: "" });
  const steps = ["Daftar Akun", "Verifikasi Email", "Verifikasi WhatsApp", "Lengkapi Data"];
  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));

  return (
    <AuthShell wide>
      <div style={{ maxWidth: 440, margin: "0 auto", width: "100%" }}>
        {/* stepper */}
        <div className="flex aic" style={{ marginBottom: 28 }}>
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex aic gap8" style={{ flex: "none" }}>
                <span className="center" style={{ width: 30, height: 30, borderRadius: 999, fontSize: 13, fontWeight: 700, background: i < step ? "var(--green-500)" : i === step ? "var(--blue-600)" : "var(--bg-2)", color: i <= step ? "#fff" : "var(--faint)", transition: "all .3s" }}>
                  {i < step ? <Icon name="check" size={15} /> : i + 1}
                </span>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: i < step ? "var(--green-500)" : "var(--line)", margin: "0 6px", transition: "all .3s" }}></div>}
            </React.Fragment>
          ))}
        </div>
        <div className="eyebrow">LANGKAH {step + 1} DARI 4</div>
        <h2 className="h2" style={{ marginTop: 6 }}>{steps[step]}</h2>

        {step === 0 && <RegStepAccount data={data} set={set} onNext={() => setStep(1)} onLogin={() => nav("login")} />}
        {step === 1 && <RegStepOtp channel="email" target={data.email || "kamu@email.com"} onBack={() => setStep(0)} onNext={() => setStep(2)} pushToast={pushToast} />}
        {step === 2 && <RegStepOtp channel="wa" target={data.phone || "0812-xxxx-7890"} onBack={() => setStep(1)} onNext={() => setStep(3)} pushToast={pushToast} />}
        {step === 3 && <RegStepProfile data={data} set={set} onDone={() => { login(); pushToast("Akun berhasil dibuat! Selamat datang 🎉"); nav("home"); }} />}
      </div>
    </AuthShell>
  );
}

function RegStepAccount({ data, set, onNext, onLogin }) {
  const [show, setShow] = React.useState(false);
  const strong = data.pass.length >= 8;
  const ok = data.name && /\S+@\S+/.test(data.email) && data.phone.length >= 9 && strong;
  return (
    <form className="col gap16" style={{ marginTop: 20 }} onSubmit={(e) => { e.preventDefault(); ok && onNext(); }}>
      <div className="field"><label>Nama Lengkap</label><div className="input-group"><span className="ig-icon"><Icon name="user" size={18} /></span><input className="input" value={data.name} onChange={(e) => set("name", e.target.value)} placeholder="Nama sesuai identitas" /></div></div>
      <div className="field"><label>Email</label><div className="input-group"><span className="ig-icon"><Icon name="mail" size={18} /></span><input className="input" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="kamu@email.com" /></div></div>
      <div className="field"><label>No. WhatsApp</label><div className="input-group"><span className="ig-icon"><Icon name="whatsapp" size={18} /></span><input className="input" value={data.phone} onChange={(e) => set("phone", e.target.value.replace(/[^\d]/g, ""))} placeholder="08xxxxxxxxxx" /></div></div>
      <div className="field"><label>Kata Sandi</label>
        <div className="input-group"><span className="ig-icon"><Icon name="lock" size={18} /></span>
          <input className="input" type={show ? "text" : "password"} value={data.pass} onChange={(e) => set("pass", e.target.value)} placeholder="Min. 8 karakter" style={{ paddingRight: 44 }} />
          <button type="button" onClick={() => setShow(!show)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--faint)" }}><Icon name={show ? "eyeOff" : "eye"} size={18} /></button></div>
        <div className="flex gap8" style={{ marginTop: 4 }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: data.pass.length > i * 4 ? (strong ? "var(--green-500)" : "var(--amber-400)") : "var(--bg-2)" }}></div>)}
        </div>
      </div>
      <label className="flex aic gap8" style={{ fontSize: 12.5, color: "var(--slate)" }}><input type="checkbox" defaultChecked style={{ accentColor: "var(--blue-600)", width: 16, height: 16 }} /> Saya setuju dengan Syarat & Ketentuan dan Kebijakan Privasi</label>
      <button className="btn btn-primary btn-lg btn-block" type="submit" disabled={!ok}>Lanjutkan <Icon name="arrowR" size={18} /></button>
      <p className="center muted" style={{ fontSize: 13, textAlign: "center" }}>Sudah punya akun? <a onClick={onLogin} style={{ color: "var(--blue-600)", fontWeight: 700, cursor: "pointer" }}>Masuk</a></p>
    </form>
  );
}

function RegStepOtp({ channel, target, onBack, onNext, pushToast }) {
  const [otp, setOtp] = React.useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = React.useState(45);
  const refs = React.useRef([]);
  React.useEffect(() => { const iv = setInterval(() => setTimer((t) => Math.max(0, t - 1)), 1000); return () => clearInterval(iv); }, []);
  const filled = otp.every((x) => x !== "");
  const onChange = (i, v) => {
    v = v.replace(/[^\d]/g, "").slice(-1);
    const next = [...otp]; next[i] = v; setOtp(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };
  const isWa = channel === "wa";
  return (
    <div style={{ marginTop: 20 }}>
      <p className="muted" style={{ fontSize: 14, lineHeight: 1.6 }}>
        Kami mengirim kode 6 digit ke {isWa ? "WhatsApp" : "email"} <b style={{ color: "var(--ink)" }}>{target}</b>. Masukkan kode untuk verifikasi.
      </p>
      <div className="flex aic gap8" style={{ margin: "16px 0", padding: "10px 14px", background: isWa ? "#e9f8ef" : "var(--blue-50)", borderRadius: 10, fontSize: 12.5, color: isWa ? "var(--green-600)" : "var(--blue-700)", fontWeight: 600 }}>
        <Icon name={isWa ? "whatsapp" : "mail"} size={17} /> Demo: gunakan kode <b style={{ fontFamily: "var(--ff-mono)" }}>123456</b>
      </div>
      <div className="flex gap10" style={{ justifyContent: "space-between", marginTop: 8 }}>
        {otp.map((d, i) => (
          <input key={i} ref={(el) => (refs.current[i] = el)} value={d} onChange={(e) => onChange(i, e.target.value)}
            onKeyDown={(e) => { if (e.key === "Backspace" && !d && i > 0) refs.current[i - 1]?.focus(); }}
            inputMode="numeric" maxLength={1} className="input tnum" style={{ width: 54, height: 60, textAlign: "center", fontSize: 24, fontWeight: 700, padding: 0 }} />
        ))}
      </div>
      <div className="center" style={{ marginTop: 18, fontSize: 13 }}>
        {timer > 0 ? <span className="muted">Kirim ulang kode dalam <b className="tnum" style={{ color: "var(--ink)" }}>{timer}s</b></span>
          : <button style={{ color: "var(--blue-600)", fontWeight: 700 }} onClick={() => { setTimer(45); pushToast("Kode dikirim ulang"); }}>Kirim ulang kode</button>}
      </div>
      <div className="flex gap12" style={{ marginTop: 24 }}>
        <button className="btn btn-ghost btn-lg" onClick={onBack}><Icon name="chevL" size={18} /></button>
        <button className="btn btn-primary btn-lg" style={{ flex: 1 }} disabled={!filled} onClick={onNext}>Verifikasi <Icon name="arrowR" size={18} /></button>
      </div>
    </div>
  );
}

function RegStepProfile({ data, set, onDone }) {
  const [gender, setGender] = React.useState("");
  const [dob, setDob] = React.useState("");
  return (
    <form className="col gap16" style={{ marginTop: 20 }} onSubmit={(e) => { e.preventDefault(); onDone(); }}>
      <p className="muted" style={{ fontSize: 14, margin: 0 }}>Lengkapi profil agar pengalaman belanjamu lebih personal. Bisa dilewati kapan saja.</p>
      <div className="field"><label>Jenis Kelamin</label>
        <div className="flex gap8">
          {["Laki-laki", "Perempuan", "Lainnya"].map((g) => <button type="button" key={g} className={"chip" + (gender === g ? " active" : "")} onClick={() => setGender(g)}>{g}</button>)}
        </div>
      </div>
      <div className="field"><label>Tanggal Lahir</label><div className="input-group"><span className="ig-icon"><Icon name="gift" size={18} /></span><input className="input" type="date" value={dob} onChange={(e) => setDob(e.target.value)} /></div></div>
      <div className="field"><label>Alamat Utama</label><textarea className="textarea" placeholder="Jl. / No. / Kelurahan / Kecamatan / Kota / Kode Pos" style={{ minHeight: 88 }} /></div>
      <div className="flex aic gap8" style={{ padding: "10px 14px", background: "var(--amber-50)", borderRadius: 10, fontSize: 12.5, color: "var(--amber-600)", fontWeight: 600 }}>
        <Icon name="coin" size={17} /> Lengkapi profil & dapatkan <b>+100 poin</b> bonus member baru!
      </div>
      <div className="flex gap12">
        <button className="btn btn-ghost btn-lg" type="button" onClick={onDone} style={{ flex: 1 }}>Lewati</button>
        <button className="btn btn-primary btn-lg" type="submit" style={{ flex: 2 }}>Selesai &amp; Mulai Belanja</button>
      </div>
    </form>
  );
}

/* ---------------- Forgot password ---------------- */
function ForgotScreen() {
  const { nav, pushToast } = useShop();
  const [stage, setStage] = React.useState(0); // 0 email, 1 otp, 2 newpass, 3 done
  const [email, setEmail] = React.useState("");
  return (
    <AuthShell>
      <div style={{ maxWidth: 380, margin: "0 auto", width: "100%" }}>
        <button className="flex aic gap8 muted" style={{ fontSize: 13.5, marginBottom: 18 }} onClick={() => nav("login")}><Icon name="chevL" size={16} /> Kembali ke Masuk</button>
        {stage === 0 && (<>
          <span style={{ width: 56, height: 56, borderRadius: 14, background: "var(--blue-50)", display: "grid", placeItems: "center", color: "var(--blue-600)", marginBottom: 16 }}><Icon name="lock" size={26} /></span>
          <h2 className="h2">Lupa Kata Sandi?</h2>
          <p className="muted" style={{ fontSize: 14, marginTop: 6 }}>Masukkan email terdaftar, kami akan kirim kode untuk reset sandi.</p>
          <form onSubmit={(e) => { e.preventDefault(); email && setStage(1); }} className="col gap16" style={{ marginTop: 24 }}>
            <div className="field"><label>Email</label><div className="input-group"><span className="ig-icon"><Icon name="mail" size={18} /></span><input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="kamu@email.com" /></div></div>
            <button className="btn btn-primary btn-lg btn-block" type="submit">Kirim Kode</button>
          </form>
        </>)}
        {stage === 1 && (<>
          <h2 className="h2">Cek Email Kamu</h2>
          <p className="muted" style={{ fontSize: 14, marginTop: 6 }}>Kode dikirim ke <b style={{ color: "var(--ink)" }}>{email || "email kamu"}</b>.</p>
          <RegStepOtp channel="email" target={email || "email kamu"} onBack={() => setStage(0)} onNext={() => setStage(2)} pushToast={pushToast} />
        </>)}
        {stage === 2 && (<>
          <h2 className="h2">Buat Sandi Baru</h2>
          <p className="muted" style={{ fontSize: 14, marginTop: 6 }}>Pastikan sandi baru kuat dan mudah kamu ingat.</p>
          <form onSubmit={(e) => { e.preventDefault(); setStage(3); }} className="col gap16" style={{ marginTop: 24 }}>
            <div className="field"><label>Sandi Baru</label><div className="input-group"><span className="ig-icon"><Icon name="lock" size={18} /></span><input className="input" type="password" placeholder="Min. 8 karakter" /></div></div>
            <div className="field"><label>Konfirmasi Sandi</label><div className="input-group"><span className="ig-icon"><Icon name="lock" size={18} /></span><input className="input" type="password" placeholder="Ulangi sandi" /></div></div>
            <button className="btn btn-primary btn-lg btn-block" type="submit">Simpan Sandi Baru</button>
          </form>
        </>)}
        {stage === 3 && (<div className="center" style={{ flexDirection: "column", textAlign: "center", padding: "20px 0" }}>
          <div className="center" style={{ width: 80, height: 80, borderRadius: 999, background: "var(--green-50)", marginBottom: 18 }}><Icon name="checkCircle" size={44} style={{ color: "var(--green-500)" }} /></div>
          <h2 className="h2">Sandi Berhasil Diubah</h2>
          <p className="muted" style={{ fontSize: 14, marginTop: 8 }}>Silakan masuk dengan kata sandi barumu.</p>
          <button className="btn btn-primary btn-lg btn-block" style={{ marginTop: 24 }} onClick={() => nav("login")}>Masuk Sekarang</button>
        </div>)}
      </div>
    </AuthShell>
  );
}

Object.assign(window, { AuthShell, LoginScreen, RegisterScreen, ForgotScreen, RegStepOtp });
