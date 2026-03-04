import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Learn", href: "/learn" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];
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
  { h: "Company", links: [{ label: "About Us", href: "/about" }, { label: "e-Book", href: "/ebook" }] },
  { h: "Projects", links: [{ label: "The 3 Chain Experiment", href: "/projects/3-chain" }, { label: "Lifetime Crypto Builder", href: "/projects/lifetime" }] },
  { h: "Support", links: [{ label: "FAQ", href: "/faq" }, { label: "Contact Us", href: "/contact" }] },
  { h: "Legal & Disclosures", links: [{ label: "Terms", href: "/terms" }, { label: "Privacy", href: "/privacy" }, { label: "Disclaimer", href: "/disclaimer" }] },
];
const SOCIALS = [
  { label: "LinkedIn", icon: "in", href: "https://linkedin.com" },
  { label: "X", icon: "𝕏", href: "https://x.com" },
  { label: "Facebook", icon: "f", href: "https://facebook.com" },
];
const COINS = [
  { id: "bitcoin", sym: "BITCOIN", short: "BTC" },
  { id: "ethereum", sym: "ETHEREUM", short: "ETH" },
  { id: "binancecoin", sym: "BNB", short: "BNB" },
  { id: "solana", sym: "SOLANA", short: "SOL" },
  { id: "ripple", sym: "XRP", short: "XRP" },
  { id: "cardano", sym: "CARDANO", short: "ADA" },
];

function useFade() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

function Coin({ sym, size = 52 }) {
  const map = { BTC: ["#F7931A", "₿", false], BNB: ["#F3BA2F", "B", true], SOL: ["#9945FF", "◎", false], ETH: ["#627EEA", "Ξ", false] };
  const [bg, icon, dark] = map[sym] || ["#888", "?", false];
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: `radial-gradient(circle at 35% 35%, ${bg}cc, ${bg})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.38, fontWeight: 900, color: dark ? "#1a1a1a" : "#fff", boxShadow: `0 0 ${size * 0.4}px ${bg}55, 0 4px 12px rgba(0,0,0,0.6)`, fontFamily: "serif", flexShrink: 0 }}>{icon}</div>
  );
}

function Ticker() {
  const [prices, setPrices] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  const [status, setStatus] = useState("loading");

  const fetchPrices = async () => {
    try {
      const ids = COINS.map(c => c.id).join(",");
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPrices(data);
      setLastUpdated(new Date());
      setStatus("live");
    } catch { setStatus("error"); }
  };

  useEffect(() => { fetchPrices(); const t = setInterval(fetchPrices, 60000); return () => clearInterval(t); }, []);

  const fmt = n => n >= 1000 ? `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}` : `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`;
  const dotColor = { loading: "#f59e0b", live: "#4ade80", error: "#f87171" }[status];
  const statusMsg = status === "loading" ? "Fetching…" : status === "error" ? "Retrying…" : lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "";

  return (
    <div style={{ background: "rgba(0,0,0,0.65)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)", background: "rgba(0,0,0,0.3)" }}>
        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: 1, textTransform: "uppercase", fontWeight: 600 }}>Live Crypto Prices</span>
        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: dotColor, boxShadow: `0 0 5px ${dotColor}`, display: "inline-block", animation: "pulseGlow 2s ease-in-out infinite" }} />
          {statusMsg}
        </span>
      </div>
      <div style={{ overflow: "hidden", padding: "6px 0" }}>
        <div style={{ display: "flex", whiteSpace: "nowrap", animation: "tick 28s linear infinite" }}>
          {[...COINS, ...COINS].map((c, i) => {
            const d = prices[c.id];
            const price = status === "loading" ? "…" : d ? fmt(d.usd) : "—";
            const chg = d ? d.usd_24h_change : null;
            return (
              <span key={i} style={{ display: "inline-flex", gap: 7, alignItems: "center", padding: "0 16px", borderRight: "1px solid rgba(255,255,255,0.07)", fontSize: 11.5 }}>
                <span style={{ color: "#8ecfff", fontWeight: 700 }}>{c.short}</span>
                <span style={{ color: "#fff", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{price}</span>
                {chg !== null && (
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 3, color: chg >= 0 ? "#4ade80" : "#f87171", background: chg >= 0 ? "rgba(74,222,128,0.12)" : "rgba(248,113,113,0.12)", border: `1px solid ${chg >= 0 ? "rgba(74,222,128,0.25)" : "rgba(248,113,113,0.25)"}` }}>
                    {chg >= 0 ? "▲" : "▼"} {Math.abs(chg).toFixed(2)}%
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  return (
    <>
      <nav style={{ position: "sticky", top: 0, zIndex: 99, background: scrolled ? "rgba(6,14,28,0.98)" : "rgba(6,14,28,0.85)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: isMobile ? "0 18px" : "0 36px", height: 62, display: "flex", alignItems: "center", justifyContent: "space-between", transition: "background .3s" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg,#1a3a5c,#0a1f38)", border: "2px solid #c9a227", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>📖</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 11, letterSpacing: 1, fontFamily: "Georgia,serif" }}>FREE CRYPTO</div>
            <div style={{ color: "#c9a227", fontWeight: 700, fontSize: 9, letterSpacing: 2 }}>ACADEMY</div>
          </div>
        </div>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 26 }}>
            {NAV_LINKS.map(l => <a key={l.label} href={l.href} style={{ color: "rgba(255,255,255,0.72)", fontSize: 13.5, fontWeight: 500 }}>{l.label}</a>)}
          </div>
        )}

        {/* Desktop buttons / Mobile hamburger */}
        {!isMobile ? (
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{ background: "linear-gradient(135deg,#c9a227,#e8c45a)", color: "#0a0f1e", border: "none", borderRadius: 7, padding: "8px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Subscribe</button>
            <button style={{ background: "transparent", color: "#c9a227", border: "1.5px solid #c9a227", borderRadius: 7, padding: "8px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Log In</button>
          </div>
        ) : (
          <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 6 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "all .3s", transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "scaleX(0)") : "none", opacity: menuOpen && i === 1 ? 0 : 1 }} />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile drawer */}
      {isMobile && (
        <div style={{ position: "fixed", top: 62, left: 0, right: 0, bottom: 0, zIndex: 98, background: "rgba(6,14,28,0.98)", backdropFilter: "blur(14px)", transform: menuOpen ? "translateX(0)" : "translateX(100%)", transition: "transform .3s ease", display: "flex", flexDirection: "column", padding: "32px 24px", gap: 28, overflowY: "auto" }}>
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{ color: "#fff", fontSize: 22, fontWeight: 700, fontFamily: "Georgia,serif", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 20 }}>{l.label}</a>
          ))}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
            <button style={{ background: "linear-gradient(135deg,#c9a227,#e8c45a)", color: "#0a0f1e", border: "none", borderRadius: 8, padding: "14px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Subscribe</button>
            <button style={{ background: "transparent", color: "#c9a227", border: "1.5px solid #c9a227", borderRadius: 8, padding: "14px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Log In</button>
          </div>
        </div>
      )}
    </>
  );
}

function Hero() {
  const isMobile = useIsMobile();
  return (
    <section style={{ position: "relative", minHeight: isMobile ? "75vh" : "88vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(155deg,#0a1628 0%,#060e1c 45%,#0c1d0a 100%)" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(100,200,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(100,200,255,.04) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
      <div style={{ position: "absolute", top: "18%", left: "5%", width: isMobile ? 200 : 380, height: isMobile ? 200 : 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(249,147,26,.14),transparent 70%)" }} />
      <div style={{ position: "absolute", top: "28%", right: "5%", width: isMobile ? 160 : 280, height: isMobile ? 160 : 280, borderRadius: "50%", background: "radial-gradient(circle,rgba(153,69,255,.13),transparent 70%)" }} />
      {!isMobile && <>
        <div style={{ position: "absolute", top: "10%", left: "7%", zIndex: 2, animation: "fl1 6s ease-in-out infinite" }}><Coin sym="BTC" size={62} /></div>
        <div style={{ position: "absolute", top: "6%", right: "16%", zIndex: 2, animation: "fl2 7.5s ease-in-out infinite" }}><Coin sym="BNB" size={50} /></div>
        <div style={{ position: "absolute", bottom: "18%", left: "18%", zIndex: 2, animation: "fl3 8s ease-in-out infinite" }}><Coin sym="SOL" size={46} /></div>
      </>}
      {isMobile && <>
        <div style={{ position: "absolute", top: "8%", right: "8%", zIndex: 2, animation: "fl1 6s ease-in-out infinite" }}><Coin sym="BTC" size={38} /></div>
        <div style={{ position: "absolute", bottom: "14%", left: "6%", zIndex: 2, animation: "fl2 7s ease-in-out infinite" }}><Coin sym="SOL" size={32} /></div>
      </>}
      <Ticker />
      <div style={{ position: "relative", zIndex: 4, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: isMobile ? "40px 20px" : "60px 24px" }}>
        <h1 style={{ fontSize: isMobile ? "clamp(1.8rem,8vw,2.8rem)" : "clamp(2.2rem,5.5vw,4.2rem)", fontWeight: 900, lineHeight: 1.15, fontFamily: "Georgia,serif", textShadow: "0 4px 40px #0009", marginBottom: isMobile ? 16 : 22, maxWidth: 660, animation: "up .9s ease both" }}>
          A new haven for<br />
          <span style={{ background: "linear-gradient(90deg,#c9a227,#4acfcf,#9945FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>the crypto community.</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,.78)", fontSize: isMobile ? 15 : 17, lineHeight: 1.9, marginBottom: isMobile ? 28 : 34, animation: "up .9s .15s ease both", fontFamily: "Georgia,serif" }}>
          Education. Community. Structured participation.
        </p>
        <div style={{ display: "flex", gap: 12, animation: "up .9s .3s ease both", flexWrap: "wrap", justifyContent: "center" }}>
          <button style={{ background: "linear-gradient(135deg,#1a8a7a,#0d6b5e)", color: "#fff", border: "none", borderRadius: 8, padding: isMobile ? "12px 26px" : "13px 30px", fontWeight: 700, fontSize: isMobile ? 14 : 15, cursor: "pointer", boxShadow: "0 4px 20px rgba(26,138,122,.4)" }}>Join Us</button>
          <button style={{ background: "rgba(255,255,255,.08)", color: "#fff", border: "1.5px solid rgba(255,255,255,.25)", borderRadius: 8, padding: isMobile ? "12px 26px" : "13px 30px", fontWeight: 700, fontSize: isMobile ? 14 : 15, cursor: "pointer" }}>View Projects</button>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [ref, v] = useFade();
  const isMobile = useIsMobile();
  return (
    <section style={{ padding: isMobile ? "52px 18px" : "76px 40px", background: "#060e1c" }}>
      <h2 ref={ref} style={{ textAlign: "center", fontSize: isMobile ? 26 : 34, fontWeight: 900, fontFamily: "Georgia,serif", letterSpacing: 1, marginBottom: isMobile ? 36 : 50, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)", transition: "all .6s" }}>PROJECTS</h2>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(290px,1fr))", gap: isMobile ? 20 : 28, maxWidth: 860, margin: "0 auto" }}>
        {PROJECTS.map((p, i) => (
          <div key={i} style={{ background: "linear-gradient(155deg,#0e1929,#0a1220)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 16, overflow: "hidden", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(36px)", transition: `all .6s ${i * .15}s`, cursor: "pointer" }}>
            <div style={{ height: isMobile ? 160 : 190, background: i === 0 ? "linear-gradient(135deg,#1a0a3a,#3a1a0a,#0a1a3a)" : "linear-gradient(135deg,#0a1a3a,#0a2a3a)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", zIndex: 2 }}>
                {i === 0 ? <><Coin sym="BTC" size={isMobile?44:56} /><div style={{ marginLeft: isMobile?-10:-14 }}><Coin sym="ETH" size={isMobile?44:56} /></div><div style={{ marginLeft: isMobile?-10:-14 }}><Coin sym="BNB" size={isMobile?44:56} /></div></> : <><Coin sym="BTC" size={isMobile?52:68} /><div style={{ marginLeft: isMobile?-14:-18 }}><Coin sym="SOL" size={isMobile?40:52} /></div></>}
              </div>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center,transparent 38%,rgba(0,0,0,.55))" }} />
            </div>
            <div style={{ padding: isMobile ? "18px 20px 22px" : "22px 26px 26px" }}>
              <h3 style={{ fontWeight: 800, fontSize: isMobile ? 15 : 16, marginBottom: 10, fontFamily: "Georgia,serif" }}>{p.title}</h3>
              <p style={{ color: "rgba(255,255,255,.58)", fontSize: isMobile ? 13 : 13.5, lineHeight: 1.7, marginBottom: 16 }}>{p.desc}</p>
              <button style={{ background: p.gold ? "linear-gradient(135deg,#c9a227,#e8c45a)" : "linear-gradient(135deg,#1a8a7a,#0d6b5e)", color: p.gold ? "#0a0f1e" : "#fff", border: "none", borderRadius: 6, padding: "8px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>{p.cta}</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const [ref, v] = useFade();
  const isMobile = useIsMobile();
  const accents = ["#4a9eff", "#4acfcf", "#b07aff"];
  const bgs = ["linear-gradient(135deg,#0d2a4a,#1a4a7a)", "linear-gradient(135deg,#0a3a3a,#1a6a6a)", "linear-gradient(135deg,#2a1a5a,#4a2a8a)"];
  const glows = ["rgba(26,100,180,.35)", "rgba(26,160,140,.35)", "rgba(100,60,180,.35)"];

  return (
    <section style={{ padding: isMobile ? "52px 18px" : "80px 24px", background: "#080d1a" }}>
      <h2 ref={ref} style={{ textAlign: "center", fontSize: isMobile ? 24 : 32, fontWeight: 900, fontFamily: "Georgia,serif", marginBottom: 10, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)", transition: "all .6s" }}>How Membership Works</h2>
      <p style={{ textAlign: "center", color: "rgba(255,255,255,.45)", fontSize: 13, marginBottom: isMobile ? 36 : 52 }}>Three simple steps to get started</p>

      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "stretch" : "flex-start", justifyContent: "center", maxWidth: 900, margin: "0 auto", gap: isMobile ? 16 : 0 }}>
        {STEPS.map((s, i) => (
          <div key={i} style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", flex: 1 }}>
            <div style={{ flex: 1, display: "flex", flexDirection: isMobile ? "row" : "column", alignItems: "center", textAlign: isMobile ? "left" : "center", gap: isMobile ? 16 : 16, background: "linear-gradient(160deg,#0e1929,#080d18)", border: `1px solid ${accents[i]}33`, borderRadius: 18, padding: isMobile ? "18px 20px" : "32px 24px", position: "relative", overflow: "hidden", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(28px)", transition: `all .6s ${i * .18}s` }}>
              <div style={{ position: "absolute", top: 12, right: 14, background: `${accents[i]}22`, border: `1px solid ${accents[i]}55`, borderRadius: 20, padding: "2px 9px", fontSize: 10, fontWeight: 700, color: accents[i], letterSpacing: 1 }}>STEP {i + 1}</div>
              <div style={{ position: "absolute", top: -28, left: isMobile ? "initial" : "50%", transform: isMobile ? "none" : "translateX(-50%)", right: isMobile ? -28 : "initial", width: 100, height: 100, borderRadius: "50%", background: `radial-gradient(circle,${glows[i]},transparent 70%)`, pointerEvents: "none" }} />
              <div style={{ width: isMobile ? 68 : 90, height: isMobile ? 68 : 90, borderRadius: 16, background: bgs[i], border: `1.5px solid ${accents[i]}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? 30 : 40, boxShadow: `0 6px 20px rgba(0,0,0,.5),0 0 16px ${glows[i]}`, flexShrink: 0, zIndex: 1 }}>{s.icon}</div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: isMobile ? "flex-start" : "center", gap: 8, zIndex: 1, paddingTop: isMobile ? 8 : 0 }}>
                <p style={{ color: "#fff", fontSize: isMobile ? 14 : 14.5, fontWeight: 700, lineHeight: 1.5 }}>{s.label}</p>
                <div style={{ width: 28, height: 2, borderRadius: 2, background: `linear-gradient(90deg,${accents[i]},transparent)` }} />
              </div>
            </div>
            {i < STEPS.length - 1 && !isMobile && (
              <div style={{ display: "flex", alignItems: "center", padding: "0 8px", opacity: v ? 1 : 0, transition: `all .6s ${i * .18 + .3}s`, flexShrink: 0 }}>
                <div style={{ width: 28, height: 2, background: "linear-gradient(90deg,rgba(201,162,39,.6),rgba(201,162,39,.2))" }} />
                <div style={{ width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "7px solid rgba(201,162,39,.6)" }} />
              </div>
            )}
            {i < STEPS.length - 1 && isMobile && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "4px 0", opacity: v ? 1 : 0, transition: `all .6s ${i * .18 + .3}s` }}>
                <div style={{ width: 2, height: 20, background: "linear-gradient(180deg,rgba(201,162,39,.6),rgba(201,162,39,.2))" }} />
                <div style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "7px solid rgba(201,162,39,.6)" }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function WhySection({ flip }) {
  const [ref, v] = useFade();
  const isMobile = useIsMobile();
  const visual = (
    <div style={{ flex: 1, minWidth: isMobile ? "100%" : 250, height: isMobile ? 200 : 250, borderRadius: 18, background: flip ? "linear-gradient(135deg,#0a2a1a,#1a0a3a)" : "linear-gradient(135deg,#1a0a3a,#0a1a3a)", border: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", boxShadow: "0 14px 44px rgba(0,0,0,.5)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, zIndex: 2 }}><Coin sym="SOL" size={isMobile?52:66} /><Coin sym="BTC" size={isMobile?66:82} /><Coin sym="BNB" size={isMobile?52:66} /></div>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center,transparent 38%,rgba(0,0,0,.5))" }} />
    </div>
  );
  const list = (
    <ul style={{ flex: 1, minWidth: isMobile ? "100%" : 260, listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
      {WHY.map((w, i) => (
        <li key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "linear-gradient(135deg,#c9a227,#e8c45a)", flexShrink: 0, boxShadow: "0 0 8px rgba(201,162,39,.4)" }} />
          <span style={{ color: "rgba(255,255,255,.85)", fontSize: isMobile ? 14.5 : 15.5, fontWeight: 500 }}>{w}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <section ref={ref} style={{ padding: isMobile ? "52px 18px" : "76px 40px", background: flip ? "#080d1a" : "#060e1c", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(28px)", transition: "all .7s" }}>
      <h2 style={{ textAlign: "center", fontSize: isMobile ? 24 : 30, fontWeight: 900, fontFamily: "Georgia,serif", marginBottom: isMobile ? 32 : 50 }}>Why Free Crypto Academy?</h2>
      <div style={{ display: "flex", gap: isMobile ? 28 : 56, alignItems: "center", maxWidth: 860, margin: "0 auto", flexWrap: "wrap", flexDirection: isMobile ? "column" : flip ? "row-reverse" : "row" }}>
        {list}{visual}
      </div>
    </section>
  );
}

function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer style={{ background: "#03080f", borderTop: "1px solid rgba(255,255,255,.06)", padding: isMobile ? "44px 20px 24px" : "56px 40px 28px" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "auto repeat(4, auto) auto", gap: isMobile ? "32px 20px" : "36px", justifyContent: isMobile ? "stretch" : "space-between", marginBottom: 40 }}>
        {/* Brand — full width on mobile */}
        <div style={{ gridColumn: isMobile ? "1 / -1" : "auto", maxWidth: isMobile ? "100%" : 210 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 9, background: "linear-gradient(135deg,#1a3a5c,#0a1f38)", border: "2px solid #c9a227", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19 }}>📖</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 11, letterSpacing: 1, fontFamily: "Georgia,serif" }}>FREE CRYPTO</div>
              <div style={{ color: "#c9a227", fontWeight: 700, fontSize: 9, letterSpacing: 2 }}>ACADEMY</div>
            </div>
          </div>
          <div style={{ color: "rgba(255,255,255,.45)", fontSize: 12, lineHeight: 2 }}>
            <div>✉ help@freecryptoacademy.com</div>
            <div>📞 480-271-4776</div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            {SOCIALS.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={{ width: 32, height: 32, borderRadius: 7, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.11)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.65)", fontSize: 13, fontWeight: 700 }}>{s.icon}</a>
            ))}
          </div>
        </div>

        {/* Footer columns */}
        {FOOTER.map(col => (
          <div key={col.h}>
            <h4 style={{ fontWeight: 700, fontSize: 12.5, marginBottom: 12, letterSpacing: .4, color: "#fff" }}>{col.h}</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {col.links.map(link => (
                <a key={link.label} href={link.href} style={{ color: "rgba(255,255,255,.45)", fontSize: 12.5 }}>{link.label}</a>
              ))}
            </div>
          </div>
        ))}

        {/* CTA buttons — full width on mobile */}
        <div style={{ gridColumn: isMobile ? "1 / -1" : "auto", display: "flex", flexDirection: isMobile ? "row" : "column", gap: 10 }}>
          <button style={{ flex: isMobile ? 1 : "none", background: "linear-gradient(135deg,#c9a227,#e8c45a)", color: "#0a0f1e", border: "none", borderRadius: 7, padding: "10px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Subscribe</button>
          <button style={{ flex: isMobile ? 1 : "none", background: "transparent", color: "#c9a227", border: "1.5px solid #c9a227", borderRadius: 7, padding: "10px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Log In</button>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,.05)", paddingTop: 18, textAlign: "center", color: "rgba(255,255,255,.28)", fontSize: 11 }}>© 2024 Free Crypto Academy</div>
    </footer>
  );
}

export default function App() {
  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", background: "#060e1c", minHeight: "100vh", color: "#fff" }}>
      <style>{`
        @keyframes tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes fl1 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-16px) rotate(4deg)} }
        @keyframes fl2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px) rotate(-3deg)} }
        @keyframes fl3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes up { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseGlow { 0%,100%{opacity:1} 50%{opacity:0.35} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; }
        html { scroll-behavior: smooth; }
      `}</style>
      <Navbar />
      <Hero />
      <Projects />
      <HowItWorks />
      <WhySection flip={false} />
      <WhySection flip={true} />
      <Footer />
    </div>
  );
}