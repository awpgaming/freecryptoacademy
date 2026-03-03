import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Projects", "Learn", "Contact"];
const PROJECTS = [
  { title: "The 3 Chain Experiment", desc: "They are entire ecosystems with users, developers, activity and ongoing evolution. Instead of chasing hundreds of coins, this experiment follows three living networks.", cta: "Learn More", gold: true },
  { title: "Lifetime Crypto Builder", desc: "The experiment is powered by a service called The Lifetime Crypto Builder. This is the system that turns participation into action.", cta: "Subscribe", gold: false },
];
const STEPS = [
  { label: "Create account", icon: "👤" },
  { label: "Subscribe", icon: "⚡" },
  { label: "Access the member portal + weekly content", icon: "🔓" },
];
const WHY = ["Builder mindset (not hype)", "Community-first", "Structured systems", "Wallet ownership", "Transparency + roadmap"];
const FOOTER = [
  { h: "Company", links: ["About Us", "e-Book"] },
  { h: "Projects", links: ["The 3 Chain Experiment", "Lifetime Crypto Builder"] },
  { h: "Support", links: ["FAQ", "Contact Us"] },
  { h: "Legal & Disclosures", links: ["Terms", "Privacy", "Disclaimer"] },
];

function useFade() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

function Coin({ sym, size = 52 }) {
  const map = { BTC: ["#F7931A", "₿"], BNB: ["#F3BA2F", "B"], SOL: ["#9945FF", "◎"], ETH: ["#627EEA", "Ξ"] };
  const [bg, icon] = map[sym] || ["#888", "?"];
  return <div style={{ width: size, height: size, borderRadius: "50%", background: `radial-gradient(circle at 35% 35%, ${bg}bb, ${bg})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.38, fontWeight: 900, color: sym === "BNB" ? "#1a1a1a" : "#fff", boxShadow: `0 0 ${size * 0.4}px ${bg}55, 0 4px 12px #0009`, fontFamily: "serif", flexShrink: 0 }}>{icon}</div>;
}

function Ticker() {
  const items = ["BITCOIN $68,421 +2.4%", "SOLANA $161.78 +5.1%", "BNB $605.50 +1.8%", "ETHEREUM $3,520 +3.2%", "BITCOIN $68,421 +2.4%", "SOLANA $161.78 +5.1%", "BNB $605.50 +1.8%"];
  return (
    <div style={{ background: "rgba(0,0,0,0.6)", borderBottom: "1px solid rgba(255,255,255,0.07)", overflow: "hidden", padding: "7px 0" }}>
      <div style={{ display: "flex", gap: 60, whiteSpace: "nowrap", animation: "tick 20s linear infinite" }}>
        {items.map((t, i) => {
          const [sym, price, chg] = t.split(" ");
          return <span key={i} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12 }}>
            <span style={{ color: "#7dc4ff", fontWeight: 700, letterSpacing: 1 }}>{sym}</span>
            <span style={{ color: "#fff", fontWeight: 600 }}>{price}</span>
            <span style={{ color: "#4ade80" }}>{chg}</span>
          </span>;
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);

  const [pRef, pV] = useFade();
  const [hRef, hV] = useFade();
  const [w1Ref, w1V] = useFade();
  const [w2Ref, w2V] = useFade();

  const btn = (label, gold, outline) => (
    <button style={{ background: gold ? "linear-gradient(135deg,#c9a227,#e8c45a)" : outline ? "transparent" : "linear-gradient(135deg,#1a8a7a,#0d6b5e)", color: gold ? "#0a0f1e" : "#fff", border: outline ? "1.5px solid #c9a227" : "none", borderRadius: 7, padding: "9px 22px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>{label}</button>
  );

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", background: "#060e1c", minHeight: "100vh", color: "#fff" }}>
      <style>{`
        @keyframes tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes fl1 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-16px) rotate(4deg)} }
        @keyframes fl2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px) rotate(-3deg)} }
        @keyframes fl3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes up { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        *{box-sizing:border-box;margin:0;padding:0}
        a{text-decoration:none}
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 99, background: scrolled ? "rgba(6,14,28,0.98)" : "rgba(6,14,28,0.75)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "0 36px", height: 62, display: "flex", alignItems: "center", justifyContent: "space-between", transition: "background .3s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 8, background: "linear-gradient(135deg,#1a3a5c,#0a1f38)", border: "2px solid #c9a227", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📖</div>
          <div><div style={{ fontWeight: 800, fontSize: 12, letterSpacing: 1, fontFamily: "Georgia,serif" }}>FREE CRYPTO</div><div style={{ color: "#c9a227", fontWeight: 700, fontSize: 10, letterSpacing: 2 }}>ACADEMY</div></div>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {NAV_LINKS.map(l => <a key={l} href="#" style={{ color: "rgba(255,255,255,0.72)", fontSize: 14, fontWeight: 500, letterSpacing: .4 }}>{l}</a>)}
        </div>
        <div style={{ display: "flex", gap: 10 }}>{btn("Subscribe", true)}{btn("Log In", false, true)}</div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "88vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(155deg,#0a1628 0%,#060e1c 45%,#0c1d0a 100%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(100,200,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(100,200,255,.04) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
        <div style={{ position: "absolute", top: "18%", left: "12%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(249,147,26,.14) 0%,transparent 70%)" }} />
        <div style={{ position: "absolute", top: "28%", right: "8%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle,rgba(153,69,255,.13) 0%,transparent 70%)" }} />
        <div style={{ position: "absolute", top: "10%", left: "7%", zIndex: 2, animation: "fl1 6s ease-in-out infinite" }}><Coin sym="BTC" size={62} /></div>
        <div style={{ position: "absolute", top: "6%", right: "16%", zIndex: 2, animation: "fl2 7.5s ease-in-out infinite" }}><Coin sym="BNB" size={50} /></div>
        <div style={{ position: "absolute", bottom: "18%", left: "18%", zIndex: 2, animation: "fl3 8s ease-in-out infinite" }}><Coin sym="SOL" size={46} /></div>
        <Ticker />
        <div style={{ position: "relative", zIndex: 4, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "60px 24px" }}>
          <h1 style={{ fontSize: "clamp(2.2rem,5.5vw,4.2rem)", fontWeight: 900, lineHeight: 1.1, fontFamily: "Georgia,serif", textShadow: "0 4px 40px #0009", marginBottom: 22, maxWidth: 660, animation: "up .9s ease both" }}>
            A new haven for<br />
            <span style={{ background: "linear-gradient(90deg,#c9a227,#4acfcf,#9945FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>the crypto community.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,.78)", fontSize: 17, lineHeight: 1.9, marginBottom: 34, animation: "up .9s .15s ease both", fontFamily: "Georgia,serif" }}>Education.<br />Community.<br />Structured participation.</p>
          <div style={{ display: "flex", gap: 14, animation: "up .9s .3s ease both" }}>
            <button style={{ background: "linear-gradient(135deg,#1a8a7a,#0d6b5e)", color: "#fff", border: "none", borderRadius: 8, padding: "13px 30px", fontWeight: 700, fontSize: 15, cursor: "pointer", boxShadow: "0 4px 20px rgba(26,138,122,.4)" }}>Join Us</button>
            <button style={{ background: "rgba(255,255,255,.08)", color: "#fff", border: "1.5px solid rgba(255,255,255,.25)", borderRadius: 8, padding: "13px 30px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>View Projects</button>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section style={{ padding: "76px 40px", background: "#060e1c" }}>
        <h2 ref={pRef} style={{ textAlign: "center", fontSize: 34, fontWeight: 900, fontFamily: "Georgia,serif", letterSpacing: 1, marginBottom: 50, opacity: pV ? 1 : 0, transform: pV ? "none" : "translateY(20px)", transition: "all .6s" }}>PROJECTS</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 28, maxWidth: 860, margin: "0 auto" }}>
          {PROJECTS.map((p, i) => (
            <div key={i} style={{ background: "linear-gradient(155deg,#0e1929,#0a1220)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 18, overflow: "hidden", opacity: pV ? 1 : 0, transform: pV ? "translateY(0)" : "translateY(36px)", transition: `all .6s ${i * .15}s`, cursor: "pointer" }}>
              <div style={{ height: 190, background: i === 0 ? "linear-gradient(135deg,#1a0a3a,#3a1a0a,#0a1a3a)" : "linear-gradient(135deg,#0a1a3a,#0a2a3a)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", zIndex: 2 }}>
                  {i === 0 ? <><Coin sym="BTC" size={56} /><div style={{ marginLeft: -14 }}><Coin sym="ETH" size={56} /></div><div style={{ marginLeft: -14 }}><Coin sym="BNB" size={56} /></div></> : <><Coin sym="BTC" size={68} /><div style={{ marginLeft: -18 }}><Coin sym="SOL" size={52} /></div></>}
                </div>
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center,transparent 38%,rgba(0,0,0,.55))" }} />
              </div>
              <div style={{ padding: "22px 26px 26px" }}>
                <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 10, fontFamily: "Georgia,serif" }}>{p.title}</h3>
                <p style={{ color: "rgba(255,255,255,.58)", fontSize: 13.5, lineHeight: 1.7, marginBottom: 18 }}>{p.desc}</p>
                <button style={{ background: p.gold ? "linear-gradient(135deg,#c9a227,#e8c45a)" : "linear-gradient(135deg,#1a8a7a,#0d6b5e)", color: p.gold ? "#0a0f1e" : "#fff", border: "none", borderRadius: 6, padding: "8px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>{p.cta}</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <style>{`
        @media (max-width: 640px) {
          .how-grid { flex-direction: column !important; align-items: center !important; }
          .how-connector { display: none !important; }
          .how-card { width: 100% !important; max-width: 340px !important; flex-direction: row !important; text-align: left !important; gap: 20px !important; }
          .how-card-icon { width: 72px !important; height: 72px !important; font-size: 32px !important; flex-shrink: 0 !important; }
          .how-card-body { align-items: flex-start !important; }
        }
      `}</style>
      <section style={{ padding: "80px 24px", background: "#080d1a", overflow: "hidden" }}>
        <h2 ref={hRef} style={{ textAlign: "center", fontSize: 32, fontWeight: 900, fontFamily: "Georgia,serif", marginBottom: 12, opacity: hV ? 1 : 0, transform: hV ? "none" : "translateY(20px)", transition: "all .6s" }}>How Membership Works</h2>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,.45)", fontSize: 14, marginBottom: 56, opacity: hV ? 1 : 0, transition: "all .6s .1s" }}>Three simple steps to get started</p>

        <div className="how-grid" style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 0, maxWidth: 900, margin: "0 auto", flexWrap: "nowrap" }}>
          {STEPS.map((s, i) => {
            const bgs = ["linear-gradient(135deg,#0d2a4a,#1a4a7a)", "linear-gradient(135deg,#0a3a3a,#1a6a6a)", "linear-gradient(135deg,#2a1a5a,#4a2a8a)"];
            const glows = ["rgba(26,100,180,.35)", "rgba(26,160,140,.35)", "rgba(100,60,180,.35)"];
            const accentColors = ["#4a9eff", "#4acfcf", "#b07aff"];
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                {/* Card */}
                <div className="how-card" style={{
                  flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16,
                  background: "linear-gradient(160deg,#0e1929,#080d18)", border: `1px solid ${accentColors[i]}33`,
                  borderRadius: 20, padding: "32px 24px", position: "relative", overflow: "hidden",
                  opacity: hV ? 1 : 0, transform: hV ? "translateY(0)" : "translateY(36px)", transition: `all .6s ${i * .18}s`,
                  boxShadow: `0 8px 32px rgba(0,0,0,.4), 0 0 0 0 ${glows[i]}`,
                }}>
                  {/* Step number badge */}
                  <div style={{ position: "absolute", top: 14, right: 16, background: `${accentColors[i]}22`, border: `1px solid ${accentColors[i]}55`, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700, color: accentColors[i], letterSpacing: 1 }}>STEP {i + 1}</div>

                  {/* Glow bg */}
                  <div style={{ position: "absolute", top: -30, left: "50%", transform: "translateX(-50%)", width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle,${glows[i]},transparent 70%)`, pointerEvents: "none" }} />

                  {/* Icon box */}
                  <div className="how-card-icon" style={{ width: 90, height: 90, borderRadius: 20, background: bgs[i], border: `1.5px solid ${accentColors[i]}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, boxShadow: `0 8px 24px rgba(0,0,0,.5), 0 0 20px ${glows[i]}`, position: "relative", zIndex: 1 }}>{s.icon}</div>

                  <div className="how-card-body" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, position: "relative", zIndex: 1 }}>
                    <p style={{ color: "#fff", fontSize: 14.5, fontWeight: 700, lineHeight: 1.5 }}>{s.label}</p>
                    <div style={{ width: 32, height: 2, borderRadius: 2, background: `linear-gradient(90deg,${accentColors[i]},transparent)` }} />
                  </div>
                </div>

                {/* Connector arrow */}
                {i < STEPS.length - 1 && (
                  <div className="how-connector" style={{ display: "flex", alignItems: "center", padding: "0 8px", opacity: hV ? 1 : 0, transition: `all .6s ${i * .18 + .3}s`, flexShrink: 0 }}>
                    <div style={{ width: 28, height: 2, background: "linear-gradient(90deg,rgba(201,162,39,.6),rgba(201,162,39,.2))" }} />
                    <div style={{ width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "7px solid rgba(201,162,39,.6)" }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* WHY #1 */}
      <section ref={w1Ref} style={{ padding: "76px 40px", background: "#060e1c", opacity: w1V ? 1 : 0, transform: w1V ? "none" : "translateY(28px)", transition: "all .7s" }}>
        <h2 style={{ textAlign: "center", fontSize: 30, fontWeight: 900, fontFamily: "Georgia,serif", marginBottom: 50 }}>Why Free Crypto Academy?</h2>
        <div style={{ display: "flex", gap: 56, alignItems: "center", maxWidth: 860, margin: "0 auto", flexWrap: "wrap" }}>
          <ul style={{ flex: 1, minWidth: 260, listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
            {WHY.map((w, i) => <li key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "linear-gradient(135deg,#c9a227,#e8c45a)", flexShrink: 0, boxShadow: "0 0 8px #c9a22766" }} />
              <span style={{ color: "rgba(255,255,255,.85)", fontSize: 15.5, fontWeight: 500 }}>{w}</span>
            </li>)}
          </ul>
          <div style={{ flex: 1, minWidth: 250, height: 250, borderRadius: 18, background: "linear-gradient(135deg,#1a0a3a,#0a1a3a)", border: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", boxShadow: "0 14px 44px rgba(0,0,0,.5)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, zIndex: 2 }}><Coin sym="SOL" size={66} /><Coin sym="BTC" size={82} /><Coin sym="BNB" size={66} /></div>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center,transparent 38%,rgba(0,0,0,.5))" }} />
          </div>
        </div>
      </section>

      {/* WHY #2 */}
      <section ref={w2Ref} style={{ padding: "76px 40px", background: "#080d1a", opacity: w2V ? 1 : 0, transform: w2V ? "none" : "translateY(28px)", transition: "all .7s" }}>
        <h2 style={{ textAlign: "center", fontSize: 30, fontWeight: 900, fontFamily: "Georgia,serif", marginBottom: 50 }}>Why Free Crypto Academy?</h2>
        <div style={{ display: "flex", gap: 56, alignItems: "center", maxWidth: 860, margin: "0 auto", flexWrap: "wrap", flexDirection: "row-reverse" }}>
          <ul style={{ flex: 1, minWidth: 260, listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
            {WHY.map((w, i) => <li key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "linear-gradient(135deg,#c9a227,#e8c45a)", flexShrink: 0, boxShadow: "0 0 8px #c9a22766" }} />
              <span style={{ color: "rgba(255,255,255,.85)", fontSize: 15.5, fontWeight: 500 }}>{w}</span>
            </li>)}
          </ul>
          <div style={{ flex: 1, minWidth: 250, height: 250, borderRadius: 18, background: "linear-gradient(135deg,#0a2a1a,#1a0a3a)", border: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", boxShadow: "0 14px 44px rgba(0,0,0,.5)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, zIndex: 2 }}><Coin sym="SOL" size={66} /><Coin sym="BTC" size={82} /><Coin sym="BNB" size={66} /></div>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center,transparent 38%,rgba(0,0,0,.5))" }} />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#03080f", borderTop: "1px solid rgba(255,255,255,.06)", padding: "56px 40px 28px" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "flex", gap: 36, flexWrap: "wrap", justifyContent: "space-between", marginBottom: 44 }}>
          <div style={{ maxWidth: 210 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 9, background: "linear-gradient(135deg,#1a3a5c,#0a1f38)", border: "2px solid #c9a227", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📖</div>
              <div><div style={{ fontWeight: 800, fontSize: 11, letterSpacing: 1, fontFamily: "Georgia,serif" }}>FREE CRYPTO</div><div style={{ color: "#c9a227", fontWeight: 700, fontSize: 10, letterSpacing: 2 }}>ACADEMY</div></div>
            </div>
            <div style={{ color: "rgba(255,255,255,.45)", fontSize: 12.5, lineHeight: 2.1 }}>
              <div>✉ help@freecryptoacademy.com</div>
              <div>📞 480-271-4776</div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              {["in", "𝕏", "f"].map((ic, i) => <a key={i} href="#" style={{ width: 32, height: 32, borderRadius: 7, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.11)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.65)", fontSize: 13, fontWeight: 700 }}>{ic}</a>)}
            </div>
          </div>
          {FOOTER.map(col => (
            <div key={col.h}>
              <h4 style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 14, letterSpacing: .4 }}>{col.h}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(l => <a key={l} href="#" style={{ color: "rgba(255,255,255,.45)", fontSize: 13 }}>{l}</a>)}
              </div>
            </div>
          ))}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {btn("Subscribe", true)}{btn("Log In", false, true)}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.05)", paddingTop: 20, textAlign: "center", color: "rgba(255,255,255,.28)", fontSize: 12 }}>© 2024 Free Crypto Academy</div>
      </footer>
    </div>
  );
}