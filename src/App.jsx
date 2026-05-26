import { useState, useEffect, useRef } from "react";

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                        IMAGENS — LIGUE OS CAMINHOS AQUI                    ║
// ╚══════════════════════════════════════════════════════════════════════════════╝
const IMAGES = {

  // ── HERO ────────────────────────────────────────────────────────────────────
  // Imagem de fundo da seção principal (tela cheia)
  hero: "tr1.jpeg",

  // ── SOBRE NÓS ───────────────────────────────────────────────────────────────
  // Foto da seção "Sobre Nós" (lado esquerdo)
  sobre: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",

  // ── MODAL DOS SERVIÇOS ───────────────────────────────────────────────────────
  // Uma imagem para cada serviço (aparece no modal ao clicar "Ver mais")
  servico_terraplanagem:   "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80",
  servico_escavacao:       "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=80",
  servico_nivelamento:     "https://images.unsplash.com/photo-1605152276897-4f618f831968?w=900&q=80",
  servico_valas:           "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
  servico_limpeza:         "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=900&q=80",
  servico_aterro:          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80",
  servico_compactacao:     "https://images.unsplash.com/photo-1571963010638-4d5e6de3c23e?w=900&q=80",
  servico_drenagem:        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=80",
  servico_locacao:         "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80",
  servico_industrial:      "https://images.unsplash.com/photo-1605152276897-4f618f831968?w=900&q=80",

  // ── GALERIA DE OBRAS ─────────────────────────────────────────────────────────
  // 6 fotos da galeria (a primeira é maior — ocupa mais espaço na grade)
  galeria_1: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80",
  galeria_2: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80",
  galeria_3: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  galeria_4: "https://images.unsplash.com/photo-1605152276897-4f618f831968?w=600&q=80",
  galeria_5: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=600&q=80",
  galeria_6: "https://images.unsplash.com/photo-1571963010638-4d5e6de3c23e?w=600&q=80",

  // ── MÁQUINAS / FROTA ─────────────────────────────────────────────────────────
  // Uma foto para cada máquina da frota
  maquina_escavadeira:    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  maquina_retro:          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  maquina_trator:         "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80",
  maquina_motoniveladora: "https://images.unsplash.com/photo-1605152276897-4f618f831968?w=600&q=80",
  maquina_rolo:           "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=600&q=80",
  maquina_caminhao:       "https://images.unsplash.com/photo-1571963010638-4d5e6de3c23e?w=600&q=80",

  // ── CTA FINAL ────────────────────────────────────────────────────────────────
  // Imagem de fundo da seção de CTA no final da página
  cta: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=60",

};
// ════════════════════════════════════════════════════════════════════════════════

// ── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const C = {
  black: "#0a0a0a",
  coal: "#111111",
  dark: "#1a1a1a",
  mid: "#2a2a2a",
  gray: "#3d3d3d",
  muted: "#666",
  light: "#aaa",
  white: "#f5f3ef",
  yellow: "#f5c518",
  amber: "#e8a020",
  orange: "#d4631a",
};

const FONT = {
  display: "'Bebas Neue', sans-serif",
  cond: "'Barlow Condensed', sans-serif",
  body: "'Barlow', sans-serif",
};

// ── GOOGLE FONTS INJECTOR ─────────────────────────────────────────────────────
function useFonts() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,900;1,400&family=Barlow+Condensed:wght@400;500;600;700;900&display=swap";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
      html{scroll-behavior:smooth;overflow-x:hidden}
      body{background:#0a0a0a;color:#f5f3ef;overflow-x:hidden;max-width:100vw}
      p,h1,h2,h3,h4,span,a,li{word-break:break-word;overflow-wrap:break-word}
      @keyframes heroZoom{0%{transform:scale(1.05)}100%{transform:scale(1.13)}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
      @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
      @keyframes scrollLine{0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}51%{transform:scaleY(1);transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}
      @keyframes waPulse{0%,100%{box-shadow:0 8px 30px rgba(37,211,102,.4)}50%{box-shadow:0 8px 50px rgba(37,211,102,.7)}}
      .hero-anim-1{animation:fadeUp .8s ease .2s both}
      .hero-anim-2{animation:fadeUp .8s ease .45s both}
      .hero-anim-3{animation:fadeUp .8s ease .65s both}
      .hero-anim-4{animation:fadeUp .8s ease .85s both}
      .hero-anim-5{animation:fadeUp .8s ease 1.05s both}
      .hero-bg-img{animation:heroZoom 20s ease-in-out infinite alternate}
      .ticker-inner{display:inline-flex;animation:ticker 35s linear infinite}
      .pulse-dot{animation:pulse 2s infinite}
      .scroll-line{animation:scrollLine 2.2s ease infinite}
      .wa-float{animation:waPulse 3s ease infinite}
      .reveal{opacity:0;transform:translateY(28px);transition:opacity .65s ease,transform .65s ease}
      .reveal.visible{opacity:1;transform:translateY(0)}
      .reveal-l{opacity:0;transform:translateX(-28px);transition:opacity .65s ease,transform .65s ease}
      .reveal-l.visible{opacity:1;transform:translateX(0)}
      .reveal-r{opacity:0;transform:translateX(28px);transition:opacity .65s ease,transform .65s ease}
      .reveal-r.visible{opacity:1;transform:translateX(0)}
      .d1{transition-delay:.08s}.d2{transition-delay:.16s}.d3{transition-delay:.24s}
      .d4{transition-delay:.32s}.d5{transition-delay:.4s}.d6{transition-delay:.48s}
      .svc-card{transition:transform .35s ease,background .35s ease}
      .svc-card:hover{transform:translateY(-5px);background:#1a1a1a!important}
      .svc-card:hover .svc-icon{color:#f5c518!important;transform:scale(1.12)}
      .svc-card:hover .svc-arrow{opacity:1!important;transform:translateX(0)!important}
      .svc-card:hover .svc-num{color:rgba(245,197,24,.06)!important}
      .svc-icon{transition:all .35s ease;color:rgba(245,243,239,.3)}
      .svc-arrow{opacity:1;transform:translateX(0);transition:all .35s ease}
      .diff-card{transition:transform .35s,border-color .35s,background .35s}
      .diff-card:hover{transform:translateY(-3px);border-color:rgba(245,197,24,.3)!important;background:rgba(245,197,24,.04)!important}
      .diff-card:hover .diff-icon{background:#f5c518!important;color:#0a0a0a!important}
      .diff-icon{transition:all .35s ease}
      .gal-item{overflow:hidden;cursor:pointer;position:relative}
      .gal-item img{transition:transform .6s ease,filter .6s ease;filter:grayscale(30%) contrast(1.1)}
      .gal-item:hover img{transform:scale(1.07);filter:grayscale(0%) contrast(1.15)}
      .gal-item:hover .gal-overlay{opacity:1!important}
      .gal-item:hover .gal-label{opacity:1!important;transform:translateY(0)!important}
      .mach-card:hover img{transform:scale(1.07);filter:grayscale(0%)}
      .mach-card:hover .mach-bar{transform:scaleX(1)!important}
      .mach-bar{transition:transform .4s ease;transform:scaleX(0);transform-origin:left}
      .testi-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(to right,#f5c518,transparent);transform:scaleX(0);transform-origin:left;transition:transform .4s ease}
      .testi-card:hover::before{transform:scaleX(1)}
      .testi-card{transition:border-color .35s,background .35s}
      .testi-card:hover{border-color:rgba(245,197,24,.25)!important;background:rgba(245,197,24,.02)!important}
      .nav-cta-btn{transition:background .3s,transform .3s}
      .nav-cta-btn:hover{background:#e8a020!important;transform:translateY(-1px)}
      .nav-link{transition:color .25s}
      .nav-link:hover{color:#f5c518!important}
      .btn-primary{transition:background .3s,transform .3s,box-shadow .3s}
      .btn-primary:hover{background:#e8a020!important;transform:translateY(-2px);box-shadow:0 12px 40px rgba(245,197,24,.35)}
      .btn-ghost{transition:border-color .3s,color .3s,transform .3s}
      .btn-ghost:hover{border-color:#f5c518!important;color:#f5c518!important;transform:translateY(-2px)}
      .social-btn{transition:border-color .3s,color .3s}
      .social-btn:hover{border-color:#f5c518!important;color:#f5c518!important}
      .footer-link{transition:color .25s}
      .footer-link:hover{color:#f5c518!important}
      .wa-float-btn{transition:transform .3s}
      .wa-float-btn:hover{transform:scale(1.13)!important}
      @media(max-width:900px){
        .about-grid{grid-template-columns:1fr!important}
        .footer-grid{grid-template-columns:1fr 1fr!important}
        .hero-stats{display:none!important}
      }
      @media(max-width:640px){
        .nav-links-desktop{display:none!important}
        .hamburger-btn{display:flex!important}
        .gallery-grid{grid-template-columns:1fr 1fr!important}
        .gallery-grid>div{grid-column:span 1!important;grid-row:span 1!important}
        .gallery-grid>div img{height:180px!important}
        .footer-grid{grid-template-columns:1fr!important}
        .cta-actions{flex-direction:column;align-items:center}
        .metrics-grid{grid-template-columns:1fr!important}
        .about-text{min-width:0;width:100%}
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);
}

// ── SCROLL REVEAL HOOK ────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal,.reveal-l,.reveal-r");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ── SVG ICONS ─────────────────────────────────────────────────────────────────
const IconArrow = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const IconMsg = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const IconWA = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);
const IconMail = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconIG = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const IconFB = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const IconLI = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const IconMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const IconX = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ── LOGO ──────────────────────────────────────────────────────────────────────
function Logo({ size = "md" }) {
  const sm = size === "sm";
  return (
    <a href="#hero" style={{ display: "flex", alignItems: "center", gap: ".65rem", textDecoration: "none" }}>
      <div style={{
        width: sm ? 36 : 42, height: sm ? 36 : 42,
        background: C.yellow,
        clipPath: "polygon(0 0,85% 0,100% 100%,15% 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <span style={{ fontFamily: FONT.display, fontSize: sm ? "1.2rem" : "1.4rem", color: C.black, lineHeight: 1 }}>T</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <strong style={{ fontFamily: FONT.cond, fontWeight: 900, fontSize: sm ? ".95rem" : "1.05rem", letterSpacing: ".08em", color: C.white }}>TerraForce</strong>
        <small style={{ fontFamily: FONT.cond, fontSize: ".6rem", letterSpacing: ".18em", color: C.yellow, textTransform: "uppercase" }}>Engenharia</small>
      </div>
    </a>
  );
}

// ── SECTION LABEL ─────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: ".8rem", marginBottom: ".75rem" }}>
      <span style={{ width: 32, height: 2, background: C.yellow, flexShrink: 0, display: "block" }} />
      <span style={{ fontFamily: FONT.cond, fontSize: ".72rem", letterSpacing: ".22em", textTransform: "uppercase", color: C.yellow }}>{children}</span>
    </div>
  );
}

// ── SECTION TITLE ─────────────────────────────────────────────────────────────
function SectionTitle({ children, style = {} }) {
  return (
    <h2 style={{
      fontFamily: FONT.display, fontSize: "clamp(2.6rem,5.5vw,4.8rem)",
      lineHeight: .93, letterSpacing: ".02em", marginBottom: "1.25rem", ...style,
    }}>
      {children}
    </h2>
  );
}

// ── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 70);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["#sobre", "#servicos", "#galeria", "#maquinas", "#contato"];
  const labels = ["Sobre", "Serviços", "Obras", "Máquinas", "Contato"];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? "1rem 2rem" : "1.5rem 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(10,10,10,.97)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(245,197,24,.15)" : "none",
        transition: "all .4s ease",
      }}>
        <Logo />
        <div className="nav-links-desktop" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {labels.map((l, i) => (
            <a key={l} href={links[i]} className="nav-link"
              style={{ fontFamily: FONT.cond, fontWeight: 600, fontSize: ".82rem", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(245,243,239,.7)", textDecoration: "none" }}>
              {l}
            </a>
          ))}
          <a href="https://wa.me/554898008162" className="nav-cta-btn"
            style={{ background: C.yellow, color: C.black, fontFamily: FONT.cond, fontWeight: 700, fontSize: ".78rem", letterSpacing: ".15em", textTransform: "uppercase", padding: ".6rem 1.4rem", textDecoration: "none", clipPath: "polygon(0 0,93% 0,100% 100%,7% 100%)" }}>
            Orçamento
          </a>
        </div>
        <button className="hamburger-btn" onClick={() => setMenuOpen(true)}
          style={{ display: "none", background: "none", border: "none", color: C.white, cursor: "pointer", padding: "4px", flexDirection: "column", gap: "5px" }}>
          <IconMenu />
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1100,
          background: "rgba(10,10,10,.98)", display: "flex",
          flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2.5rem",
        }}>
          <button onClick={() => setMenuOpen(false)}
            style={{ position: "absolute", top: "1.5rem", right: "2rem", background: "none", border: "none", color: C.white, cursor: "pointer" }}>
            <IconX />
          </button>
          {labels.map((l, i) => (
            <a key={l} href={links[i]} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: FONT.display, fontSize: "3rem", color: C.white, textDecoration: "none" }}>
              {l}
            </a>
          ))}
          <a href="https://wa.me/554898008162" onClick={() => setMenuOpen(false)}
            className="btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: ".6rem", background: C.yellow, color: C.black, fontFamily: FONT.cond, fontWeight: 700, fontSize: ".9rem", letterSpacing: ".12em", textTransform: "uppercase", padding: ".85rem 2rem", textDecoration: "none" }}>
            <IconWA /> Solicitar Orçamento
          </a>
        </div>
      )}
    </>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" style={{ position: "relative", height: "100vh", minHeight: 680, display: "flex", alignItems: "center", overflow: "hidden" }}>
      {/* bg */}
      <div style={{ position: "absolute", inset: 0 }}>
        <img className="hero-bg-img" src={IMAGES.hero}
          alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(10,10,10,.88) 0%,rgba(10,10,10,.5) 55%,rgba(10,10,10,.78) 100%)" }} />
      </div>
      {/* left accent */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 5, background: "linear-gradient(to bottom,#f5c518,#d4631a,transparent)" }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "0 2rem", paddingTop: "6rem", width: "100%" }}>
        <div className="hero-anim-1" style={{ display: "inline-flex", alignItems: "center", gap: ".6rem", background: "rgba(245,197,24,.12)", border: "1px solid rgba(245,197,24,.3)", padding: ".4rem 1rem", marginBottom: "2rem" }}>
          <span className="pulse-dot" style={{ width: 7, height: 7, background: C.yellow, borderRadius: "50%", display: "block", flexShrink: 0 }} />
          <span style={{ fontFamily: FONT.cond, fontSize: ".72rem", letterSpacing: ".2em", textTransform: "uppercase", color: C.yellow }}>Especialistas em Terraplanagem desde 2005</span>
        </div>

        <h1 className="hero-anim-2" style={{ fontFamily: FONT.display, fontSize: "clamp(3.5rem,9vw,8rem)", lineHeight: .91, letterSpacing: ".02em", marginBottom: "1.25rem" }}>
          TERRA&shy;PLA&shy;NA&shy;GEM<br />
          <span style={{ color: C.yellow }}>PRO&shy;FIS&shy;SIO&shy;NAL</span><br />
          COM PRECISÃO
        </h1>

        <p className="hero-anim-3" style={{ fontFamily: FONT.body, fontWeight: 300, fontSize: "clamp(.95rem,1.8vw,1.15rem)", color: "rgba(245,243,239,.75)", maxWidth: 540, lineHeight: 1.75, marginBottom: "2.5rem" }}>
          Atendemos obras residenciais, industriais e comerciais com equipamentos modernos e equipe altamente especializada. Do projeto à execução, entregamos resultado.
        </p>

        <div className="hero-anim-4 cta-actions" style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <a href="https://wa.me/554898008162?text=Olá! Gostaria de solicitar um orçamento." className="btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: ".55rem", background: C.yellow, color: C.black, fontFamily: FONT.cond, fontWeight: 700, fontSize: ".88rem", letterSpacing: ".12em", textTransform: "uppercase", padding: ".85rem 1.9rem", textDecoration: "none", clipPath: "polygon(0 0,94% 0,100% 100%,6% 100%)" }}>
            <IconMsg /> Solicitar Orçamento
          </a>
          <a href="https://wa.me/554898008162" className="btn-ghost"
            style={{ display: "inline-flex", alignItems: "center", gap: ".55rem", background: "transparent", border: "1.5px solid rgba(245,243,239,.35)", color: C.white, fontFamily: FONT.cond, fontWeight: 600, fontSize: ".88rem", letterSpacing: ".12em", textTransform: "uppercase", padding: ".85rem 1.9rem", textDecoration: "none" }}>
            <IconWA /> Falar no WhatsApp
          </a>
        </div>
      </div>

      {/* stats */}
      <div className="hero-anim-5 hero-stats" style={{ position: "absolute", bottom: "3rem", right: "2rem", display: "flex", gap: "2rem" }}>
        {[["19+", "anos de experiência"], ["850+", "obras realizadas"], ["100%", "satisfação"]].map(([n, l]) => (
          <div key={l} style={{ textAlign: "right" }}>
            <strong style={{ display: "block", fontFamily: FONT.display, fontSize: "2.4rem", color: C.yellow, lineHeight: 1 }}>{n}</strong>
            <span style={{ fontFamily: FONT.cond, fontSize: ".65rem", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(245,243,239,.5)" }}>{l}</span>
          </div>
        ))}
      </div>

      {/* scroll indicator */}
      <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: ".5rem" }}>
        <span style={{ fontFamily: FONT.cond, fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(245,243,239,.35)" }}>Rolar</span>
        <div className="scroll-line" style={{ width: 1, height: 38, background: "linear-gradient(to bottom,rgba(245,197,24,.6),transparent)" }} />
      </div>
    </section>
  );
}

// ── TICKER ────────────────────────────────────────────────────────────────────
const TICKER_ITEMS = ["Terraplanagem Profissional", "Escavação de Precisão", "Nivelamento de Terreno", "Locação de Máquinas", "Drenagem e Aterro", "Compactação de Solo", "Abertura de Valas", "Obras Industriais"];

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{ background: C.yellow, padding: ".6rem 0", overflow: "hidden", whiteSpace: "nowrap" }}>
      <div className="ticker-inner">
        {items.map((t, i) => (
          <span key={i} style={{ fontFamily: FONT.cond, fontWeight: 700, fontSize: ".78rem", letterSpacing: ".15em", textTransform: "uppercase", color: C.black, padding: "0 2rem", display: "inline-flex", alignItems: "center", gap: "1rem" }}>
            {t}<span style={{ fontSize: ".45rem" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
function About() {
  const metrics = [["850+", "Obras concluídas"], ["400+", "Clientes atendidos"], ["35+", "Máquinas em frota"]];
  return (
    <section id="sobre" style={{ background: C.coal, padding: "6rem 2rem", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          {/* image */}
          <div className="reveal-l" style={{ position: "relative", paddingBottom: "1.5rem", paddingRight: "1.5rem" }}>
            <img src={IMAGES.sobre}
              alt="Obra de terraplanagem"
              style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", filter: "grayscale(20%) contrast(1.1)", display: "block" }} />
            <div style={{ position: "absolute", top: 16, left: 16, right: 0, bottom: 0, border: "1px solid rgba(245,197,24,.2)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, background: C.yellow, color: C.black, padding: "1.4rem 1.6rem", textAlign: "center" }}>
              <strong style={{ display: "block", fontFamily: FONT.display, fontSize: "3rem", lineHeight: 1 }}>19</strong>
              <span style={{ fontFamily: FONT.cond, fontSize: ".65rem", letterSpacing: ".15em", textTransform: "uppercase", fontWeight: 700 }}>Anos de<br />Experiência</span>
            </div>
          </div>

          {/* text */}
          <div className="reveal-r about-text" style={{ minWidth: 0 }}>
            <div className="reveal"><SectionLabel>Sobre a empresa</SectionLabel></div>
            <SectionTitle>
              MOVEMOS A TERRA.<br />CONSTRUÍMOS<br /><span style={{ color: C.yellow }}>O FUTURO.</span>
            </SectionTitle>
            {["A TerraForce Engenharia é referência em movimentação de terra e terraplanagem na região. Com quase duas décadas de atuação, consolidamos nossa posição como parceiros estratégicos de construtoras, incorporadoras e indústrias.",
              "Nossa frota de máquinas modernas, aliada a uma equipe técnica altamente qualificada, garante a execução precisa de projetos de qualquer porte — desde loteamentos residenciais até grandes complexos industriais.",
              "Trabalhamos com rigor técnico, prazos definidos e total transparência, porque sabemos que cada obra é um investimento que merece ser tratado com excelência."
            ].map((p, i) => (
              <p key={i} style={{ fontWeight: 300, color: "rgba(245,243,239,.68)", lineHeight: 1.85, marginBottom: ".9rem", fontSize: "1rem" }}>{p}</p>
            ))}
            <div className="metrics-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.2rem", marginTop: "2.5rem" }}>
              {metrics.map(([n, l], i) => (
                <div key={l} className={`reveal d${i + 1}`} style={{ padding: "1.4rem", border: "1px solid rgba(245,243,239,.07)", borderTop: `2px solid ${C.yellow}`, background: "rgba(245,197,24,.04)" }}>
                  <strong style={{ display: "block", fontFamily: FONT.display, fontSize: "2.8rem", color: C.yellow, lineHeight: 1 }}>{n}</strong>
                  <span style={{ fontFamily: FONT.cond, fontSize: ".7rem", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(245,243,239,.45)" }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SERVICES DETAIL DATA ──────────────────────────────────────────────────────
const SERVICES_DETAIL = {
  "Terraplanagem": {
    desc: "Preparamos o terreno com precisão e eficiência para o início da construção. Desde o estudo topográfico até a execução final, garantimos que o solo esteja adequado ao projeto técnico, com corte, aterro e acabamento de qualidade.",
    items: ["Corte e aterro de terreno", "Regularização e acabamento superficial", "Controle topográfico por GPS", "Adequação de caimento para drenagem", "Laudo técnico de execução"],
    img: IMAGES.servico_terraplanagem,
  },
  "Escavação": {
    desc: "Realizamos escavações mecânicas com controle topográfico para fundações, piscinas, lagoas e estruturas subterrâneas. Nossa equipe utiliza equipamentos modernos para garantir segurança e precisão em cada metro escavado.",
    items: ["Escavação para fundações e sapatas", "Lagoas, piscinas e reservatórios", "Estruturas subterrâneas", "Controle topográfico contínuo", "Gestão de resíduos e descarte"],
    img: IMAGES.servico_escavacao,
  },
  "Nivelamento": {
    desc: "Com equipamentos de alta precisão e operadores certificados, entregamos superfícies perfeitamente niveladas para lajes, pátios, estradas e áreas industriais, seguindo rigorosamente as cotas do projeto.",
    items: ["Nivelamento topográfico de alta precisão", "Pátios, estradas e vias de acesso", "Áreas industriais e logísticas", "Levantamento planialtimétrico", "Relatório de cotas executadas"],
    img: IMAGES.servico_nivelamento,
  },
  "Abertura de Valas": {
    desc: "Executamos abertura mecanizada de valas para redes de tubulação, drenagem, esgoto e infraestrutura urbana com rapidez e segurança, minimizando o impacto nas áreas adjacentes.",
    items: ["Valas para tubulações e adutoras", "Redes de drenagem e esgoto", "Infraestrutura urbana e rural", "Escoramento quando necessário", "Reaterro e compactação pós-obra"],
    img: IMAGES.servico_valas,
  },
  "Limpeza de Terreno": {
    desc: "Serviço completo de destoca, raspagem e limpeza do terreno antes do início das obras. Removemos toda a vegetação, raízes, tocos e resíduos, deixando o solo pronto para as próximas etapas construtivas.",
    items: ["Destoca e remoção de raízes", "Raspagem de solo orgânico", "Remoção de resíduos e entulho", "Transporte e descarte adequado", "Preparação para terraplanagem"],
    img: IMAGES.servico_limpeza,
  },
  "Aterro e Desaterro": {
    desc: "Realizamos aterro controlado com seleção criteriosa do material e compactação rigorosa por camadas, garantindo máxima estabilidade estrutural conforme as normas técnicas vigentes.",
    items: ["Seleção e fornecimento de material", "Aterro compactado por camadas", "Ensaios de compactação (Proctor)", "Desaterro e remoção de excedente", "Laudo técnico de compactação"],
    img: IMAGES.servico_aterro,
  },
  "Compactação de Solo": {
    desc: "Utilizamos rolos compactadores e equipamentos especializados para atingir o grau de compactação exigido pelo projeto de engenharia, com controle rigoroso em cada camada executada.",
    items: ["Compactação com rolo pé-de-carneiro", "Compactação com rolo liso vibratório", "Ensaios de grau de compactação", "Controle por camadas (ABNT NBR 7182)", "Emissão de laudos técnicos"],
    img: IMAGES.servico_compactacao,
  },
  "Drenagem": {
    desc: "Projetamos e executamos sistemas de drenagem superficial e profunda para proteção da obra contra infiltrações, erosão e acúmulo de água, garantindo a durabilidade das estruturas.",
    items: ["Drenagem superficial de pátios e estradas", "Drenos profundos e sub-horizontais", "Canaletas e dissipadores de energia", "Instalação de geotêxtil", "Sistema de captação e deságue"],
    img: IMAGES.servico_drenagem,
  },
  "Locação de Máquinas": {
    desc: "Disponibilizamos nossa frota moderna de mais de 35 equipamentos para locação com ou sem operador. Todos os equipamentos são segurados, rastreados e com manutenção preventiva em dia.",
    items: ["Escavadeiras hidráulicas", "Tratores de esteiras e pás-carregadeiras", "Motoniveladoras e rolos compactadores", "Caminhões basculantes (até 30 ton)", "Locação com ou sem operador certificado"],
    img: IMAGES.servico_locacao,
  },
  "Obras Industriais": {
    desc: "Executamos movimentação de terra em grande escala para galpões, plantas industriais e parques logísticos. Atendemos os mais altos padrões técnicos exigidos por construtoras e incorporadoras.",
    items: ["Terraplanagem de grandes áreas", "Galpões industriais e parques logísticos", "Plantas industriais e mineração", "Gerenciamento técnico de obra", "Relatórios de progresso periódicos"],
    img: IMAGES.servico_industrial,
  },
};

// ── SERVICE MODAL ─────────────────────────────────────────────────────────────
function ServiceModal({ service, onClose }) {
  const detail = SERVICES_DETAIL[service[1]];
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  if (!detail) return null;
  const [icon, title, desc] = service;

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 2000,
      background: "rgba(10,10,10,.85)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1.5rem",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "#111", border: "1px solid rgba(245,197,24,.18)",
        maxWidth: 780, width: "100%", maxHeight: "90vh", overflowY: "auto",
        position: "relative",
      }}>
        {/* image header */}
        <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
          <img src={detail.img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.55)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,#111 0%,transparent 55%)" }} />
          <div style={{ position: "absolute", bottom: "1.5rem", left: "1.8rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "2rem", lineHeight: 1 }}>{icon}</span>
            <h2 style={{ fontFamily: FONT.display, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: C.white, letterSpacing: ".04em" }}>{title.toUpperCase()}</h2>
          </div>
          {/* close btn */}
          <button onClick={onClose} style={{
            position: "absolute", top: "1rem", right: "1rem",
            background: "rgba(10,10,10,.7)", border: "1px solid rgba(245,243,239,.2)",
            color: C.white, width: 36, height: 36, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem",
          }}>✕</button>
        </div>

        {/* content */}
        <div style={{ padding: "2rem 1.8rem" }}>
          <div style={{ width: 40, height: 2, background: C.yellow, marginBottom: "1.2rem" }} />
          <p style={{ fontFamily: FONT.body, fontWeight: 300, fontSize: ".95rem", color: "rgba(245,243,239,.72)", lineHeight: 1.8, marginBottom: "1.8rem" }}>
            {detail.desc}
          </p>
          <div style={{ fontFamily: FONT.cond, fontWeight: 700, fontSize: ".68rem", letterSpacing: ".22em", textTransform: "uppercase", color: C.yellow, marginBottom: "1rem" }}>
            O que está incluso
          </div>
          <ul style={{ listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: ".6rem", marginBottom: "2rem" }}>
            {detail.items.map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: ".6rem", fontSize: ".88rem", fontWeight: 300, color: "rgba(245,243,239,.65)", lineHeight: 1.5 }}>
                <span style={{ color: C.yellow, flexShrink: 0, marginTop: ".15rem" }}>→</span> {item}
              </li>
            ))}
          </ul>
          <a href={`https://wa.me/554898008162?text=Olá! Tenho interesse no serviço de ${title}. Gostaria de um orçamento.`}
            className="btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: ".55rem", background: C.yellow, color: C.black, fontFamily: FONT.cond, fontWeight: 700, fontSize: ".85rem", letterSpacing: ".12em", textTransform: "uppercase", padding: ".8rem 1.8rem", textDecoration: "none" }}>
            <IconWA /> Solicitar Orçamento
          </a>
        </div>
      </div>
    </div>
  );
}

// ── SERVICES ──────────────────────────────────────────────────────────────────
const SERVICES = [
  ["⛏️", "Terraplanagem", "Preparo do terreno com precisão e eficiência, adequando o solo para início da construção conforme projeto técnico."],
  ["🔩", "Escavação", "Escavações mecânicas para fundações, piscinas, lagoas, reservatórios e estruturas subterrâneas com controle topográfico."],
  ["📐", "Nivelamento", "Nivelamento topográfico de alta precisão com equipamentos modernos para garantir planeza total do terreno."],
  ["🚧", "Abertura de Valas", "Abertura mecanizada de valas para tubulações, redes de drenagem, esgoto e infraestrutura urbana."],
  ["🌿", "Limpeza de Terreno", "Destoca, raspagem e limpeza completa do terreno, removendo vegetação, raízes e resíduos antes da obra."],
  ["🏔️", "Aterro e Desaterro", "Aterro controlado com seleção de material adequado e compactação rigorosa por camadas para máxima estabilidade."],
  ["⚙️", "Compactação de Solo", "Compactação com rolos e equipamentos especializados, atingindo o grau exigido pelo projeto de engenharia."],
  ["💧", "Drenagem", "Sistemas de drenagem superficial e profunda para proteção da obra contra infiltrações e erosão do solo."],
  ["🚜", "Locação de Máquinas", "Locação de escavadeiras, tratores e caminhões com ou sem operador. Frota moderna, segurada e com manutenção em dia."],
  ["🏗️", "Obras Industriais", "Movimentação de terra em grande escala para galpões, plantas industriais, parques logísticos e infraestrutura."],
];

function Services() {
  const [activeService, setActiveService] = useState(null);

  return (
    <section id="servicos" style={{ background: C.black, padding: "6rem 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3.5rem", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <div className="reveal"><SectionLabel>Nossos Serviços</SectionLabel></div>
            <SectionTitle className="reveal">O QUE<br />FAZEMOS</SectionTitle>
          </div>
          <p className="reveal" style={{ fontFamily: FONT.body, fontWeight: 300, fontSize: "1rem", color: "rgba(245,243,239,.55)", maxWidth: 320, lineHeight: 1.8, textAlign: "right" }}>
            Soluções completas em movimentação de terra para cada etapa da sua obra.
          </p>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(275px,1fr))", gap: "1.5px", background: "rgba(245,243,239,.055)" }}>
          {SERVICES.map(([icon, title, desc], i) => (
            <div key={title} className={`svc-card reveal d${(i % 3) + 1}`}
              style={{ background: C.black, padding: "2.4rem 1.8rem", cursor: "default", position: "relative", overflow: "hidden" }}>
              <span className="svc-num" style={{ position: "absolute", top: "1.4rem", right: "1.4rem", fontFamily: FONT.display, fontSize: "4rem", color: "rgba(245,243,239,.035)", lineHeight: 1 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="svc-icon" style={{ fontSize: "2rem", display: "block", marginBottom: "1.4rem", lineHeight: 1 }}>{icon}</span>
              <h3 style={{ fontFamily: FONT.cond, fontWeight: 700, fontSize: "1.1rem", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: ".65rem", color: C.white }}>{title}</h3>
              <p style={{ fontSize: ".88rem", fontWeight: 300, color: "rgba(245,243,239,.52)", lineHeight: 1.7 }}>{desc}</p>
              <button
                onClick={() => setActiveService([icon, title, desc])}
                className="svc-arrow"
                style={{ marginTop: "1.1rem", fontFamily: FONT.cond, fontSize: ".7rem", letterSpacing: ".15em", textTransform: "uppercase", color: C.yellow, display: "inline-flex", alignItems: "center", gap: ".4rem", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                Ver mais <IconArrow />
              </button>
            </div>
          ))}
        </div>
      </div>
      {activeService && <ServiceModal service={activeService} onClose={() => setActiveService(null)} />}
    </section>
  );
}

// ── GALLERY ───────────────────────────────────────────────────────────────────
const GALLERY = [
  [IMAGES.galeria_1, "Complexo Industrial — SC", "span 7", "span 2"],
  [IMAGES.galeria_2, "Escavação Fundação — RS", "span 5", "span 1"],
  [IMAGES.galeria_3, "Loteamento — SC", "span 5", "span 1"],
  [IMAGES.galeria_4, "Movimentação Industrial", "span 4", "span 1"],
  [IMAGES.galeria_5, "Estrada Rural — SC", "span 4", "span 1"],
  [IMAGES.galeria_6, "Nivelamento Comercial", "span 4", "span 1"],
];

function Gallery() {
  return (
    <section id="galeria" style={{ background: C.coal, padding: "6rem 2rem 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="reveal"><SectionLabel>Galeria de Obras</SectionLabel></div>
        <SectionTitle className="reveal">NOSSOS<br />PROJETOS</SectionTitle>
      </div>
      <div className="gallery-grid reveal" style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gridTemplateRows: "auto", gap: 3, marginTop: "2rem", maxWidth: 1400, margin: "2rem auto 0" }}>
        {GALLERY.map(([src, label, col, row], i) => (
          <div key={i} className="gal-item" style={{ gridColumn: col, gridRow: row }}>
            <img src={src} alt={label} style={{ width: "100%", height: i === 0 ? "100%" : 280, minHeight: i === 0 ? 560 : "auto", objectFit: "cover", display: "block" }} />
            <div className="gal-overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(10,10,10,.88) 0%,transparent 60%)", opacity: 0, transition: "opacity .4s" }} />
            <div className="gal-label" style={{ position: "absolute", bottom: "1.4rem", left: "1.4rem", fontFamily: FONT.cond, fontWeight: 700, fontSize: ".75rem", letterSpacing: ".15em", textTransform: "uppercase", color: C.yellow, opacity: 0, transform: "translateY(8px)", transition: "all .4s" }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── DIFFERENTIALS ─────────────────────────────────────────────────────────────
const DIFFS = [
  ["🚜", "Frota Moderna", "Equipamentos de última geração com manutenção preventiva rigorosa e tecnologia GPS para máxima eficiência operacional."],
  ["👷", "Equipe Qualificada", "Operadores certificados e engenheiros especializados com anos de experiência em obras de grande porte e alta complexidade."],
  ["⚡", "Atendimento Ágil", "Mobilização rápida de equipe e equipamentos. Orçamento em até 24 horas e início imediato após aprovação do projeto."],
  ["🛡️", "Segurança Total", "Cumprimos todas as normas (NR-18, NR-12) e contamos com seguro de responsabilidade civil para sua total tranquilidade."],
  ["🏆", "Qualidade Certificada", "Controle de qualidade rigoroso em cada etapa da obra, com laudos técnicos, ensaios de compactação e rastreabilidade."],
  ["📅", "Pontualidade", "Gestão profissional de cronograma com relatórios periódicos de andamento. Seu prazo é nosso compromisso contratual."],
];

function Differentials() {
  return (
    <section id="diferenciais" style={{ background: C.black, padding: "6rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="reveal"><SectionLabel>Por que nos escolher</SectionLabel></div>
        <SectionTitle className="reveal">NOSSOS<br />DIFEREN&shy;CIAIS</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))", gap: "1.8rem", marginTop: "2.5rem" }}>
          {DIFFS.map(([icon, title, desc], i) => (
            <div key={title} className={`diff-card reveal d${(i % 3) + 1}`}
              style={{ display: "flex", gap: "1.4rem", padding: "1.8rem", border: "1px solid rgba(245,243,239,.07)", cursor: "default" }}>
              <div className="diff-icon" style={{ flexShrink: 0, width: 50, height: 50, border: "1.5px solid rgba(245,197,24,.35)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.35rem", color: C.yellow }}>
                {icon}
              </div>
              <div>
                <h3 style={{ fontFamily: FONT.cond, fontWeight: 700, fontSize: ".95rem", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: ".5rem", color: C.white }}>{title}</h3>
                <p style={{ fontSize: ".87rem", fontWeight: 300, color: "rgba(245,243,239,.52)", lineHeight: 1.7 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── MACHINES ──────────────────────────────────────────────────────────────────
const MACHINES = [
  [IMAGES.maquina_escavadeira, "Escavação", "Escavadeira Hidráulica", "Caterpillar 320D / Volvo EC220. Potência e precisão para escavações profundas e movimentação de grande volume."],
  [IMAGES.maquina_retro, "Multiuso", "Retroescavadeira", "Case 580N / JCB 3CX. Versátil para escavação, carga, nivelamento e obras em espaços reduzidos."],
  [IMAGES.maquina_trator, "Terraplanagem", "Trator de Esteiras", "Caterpillar D6T / Komatsu D65. Ideal para empurrar terra, nivelar grandes áreas e trabalho em terreno íngreme."],
  [IMAGES.maquina_motoniveladora, "Nivelamento", "Motoniveladora", "Caterpillar 120K / Komatsu GD555. Perfeita para acabamento fino, nivelamento de pátios e vias de acesso."],
  [IMAGES.maquina_rolo, "Compactação", "Rolo Compactador", "Dynapac CA2500 / Hamm HD 120. Compactação de solo por camadas com grau de compactação controlado."],
  [IMAGES.maquina_caminhao, "Transporte", "Caminhão Basculante", "Mercedes-Benz Axor / Volvo FMX. Transporte de terra, brita e materiais com capacidade de até 30 toneladas."],
];

function Machines() {
  return (
    <section id="maquinas" style={{ background: C.coal, padding: "6rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="reveal"><SectionLabel>Nossa Frota</SectionLabel></div>
        <SectionTitle className="reveal">EQUIPA&shy;MENTOS<br />DE PONTA</SectionTitle>
        <p className="reveal" style={{ fontWeight: 300, color: "rgba(245,243,239,.55)", lineHeight: 1.8, maxWidth: 520, marginBottom: "3rem" }}>
          Frota própria com mais de 35 equipamentos modernos, todos segurados e com manutenção preventiva.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(255px,1fr))", gap: "1.8rem" }}>
          {MACHINES.map(([src, cat, name, desc], i) => (
            <div key={name} className={`mach-card reveal d${(i % 3) + 1}`} style={{ position: "relative" }}>
              <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/10" }}>
                <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(25%) contrast(1.1)", transition: "transform .5s ease,filter .5s ease", display: "block" }} />
                <div className="mach-bar" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: C.yellow }} />
              </div>
              <div style={{ padding: "1.4rem", background: C.dark, border: "1px solid rgba(245,243,239,.06)", borderTop: "none" }}>
                <div style={{ fontFamily: FONT.cond, fontSize: ".63rem", letterSpacing: ".2em", textTransform: "uppercase", color: C.yellow, marginBottom: ".4rem" }}>{cat}</div>
                <div style={{ fontFamily: FONT.cond, fontWeight: 700, fontSize: "1.05rem", letterSpacing: ".05em", textTransform: "uppercase", marginBottom: ".45rem", color: C.white }}>{name}</div>
                <p style={{ fontSize: ".83rem", fontWeight: 300, color: "rgba(245,243,239,.48)", lineHeight: 1.65 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
const TESTIS = [
  ["MF", "Marcos Ferreira", "Engenheiro Civil — Construtora Horizonte", "A TerraForce foi fundamental para o sucesso do nosso condomínio. Entregaram a terraplanagem no prazo combinado, com qualidade impecável e custo justo. Recomendo sem hesitar."],
  ["JS", "Juliana Santos", "Gerente de Projetos — Indústria MetalPark", "Contratamos para a abertura do galpão da nossa unidade industrial e ficamos impressionados. Equipe profissional, máquinas modernas e entrega dentro do cronograma. Parceria renovada."],
  ["RL", "Roberto Lima", "Proprietário — Projeto Residencial", "Terreno com muita pedra e desnível significativo. A TerraForce resolveu tudo com competência e segurança. Minha casa foi construída sobre uma base perfeita."],
  ["CA", "Carlos Andrade", "Diretor de Obras — Andrade Construções", "Locamos escavadeiras por 3 meses e os operadores foram excepcionais. Máquinas novas, produtividade alta e zero parada por manutenção. Serviço de altíssimo nível."],
  ["PM", "Paulo Mendes", "CEO — Incorporadora Morada Sul", "Nossa loteamento tinha 200 mil m² a terraplanar em prazo apertado. A TerraForce montou uma equipe robusta e entregou antes do previsto. Resultado: lançamento no prazo."],
  ["AN", "Ana Neves", "Arquiteta — Estúdio AN Projetos", "Drenagem complexa com projeto desafiador. A equipe técnica dominou todas as etapas, desde o planejamento até o ensaio de compactação. Empresa séria e de total confiança."],
];

function Testimonials() {
  return (
    <section id="depoimentos" style={{ background: C.black, padding: "6rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="reveal"><SectionLabel>O que dizem nossos clientes</SectionLabel></div>
        <SectionTitle className="reveal">DEPOI&shy;MEN&shy;TOS</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))", gap: "1.5rem", marginTop: "2.5rem" }}>
          {TESTIS.map(([init, name, role, quote], i) => (
            <div key={name} className={`testi-card reveal d${(i % 3) + 1}`}
              style={{ padding: "2.3rem", border: "1px solid rgba(245,243,239,.08)", position: "relative", cursor: "default" }}>
              <div style={{ display: "flex", gap: 3, marginBottom: "1.4rem" }}>
                {[...Array(5)].map((_, s) => <span key={s} style={{ color: C.yellow, fontSize: ".95rem" }}>★</span>)}
              </div>
              <p style={{ fontFamily: FONT.body, fontStyle: "italic", fontWeight: 300, fontSize: ".97rem", color: "rgba(245,243,239,.73)", lineHeight: 1.8, marginBottom: "1.8rem" }}>
                "{quote}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: 44, height: 44, background: `linear-gradient(135deg,${C.yellow},${C.orange})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.cond, fontWeight: 700, fontSize: ".9rem", color: C.black, flexShrink: 0 }}>
                  {init}
                </div>
                <div>
                  <div style={{ fontFamily: FONT.cond, fontWeight: 700, fontSize: ".88rem", letterSpacing: ".05em", textTransform: "uppercase", color: C.white }}>{name}</div>
                  <div style={{ fontSize: ".78rem", color: "rgba(245,243,239,.42)", marginTop: ".15rem" }}>{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA FINAL ─────────────────────────────────────────────────────────────────
function CTAFinal() {
  return (
    <section id="contato" style={{ background: C.coal, position: "relative", overflow: "hidden", textAlign: "center", padding: "8rem 2rem" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <img src={IMAGES.cta}
          alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: .07 }} />
      </div>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: FONT.display, fontSize: "clamp(5rem,17vw,15rem)", whiteSpace: "nowrap", color: "rgba(245,197,24,.04)", pointerEvents: "none", lineHeight: 1, zIndex: 1 }}>
        TERRAFORCE
      </div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <span className="reveal" style={{ fontFamily: FONT.cond, fontSize: ".72rem", letterSpacing: ".25em", textTransform: "uppercase", color: C.yellow, display: "block", marginBottom: "1.5rem" }}>
          Pronto para começar?
        </span>
        <h2 className="reveal" style={{ fontFamily: FONT.display, fontSize: "clamp(2.8rem,8vw,7rem)", lineHeight: .93, letterSpacing: ".02em", marginBottom: "1.4rem" }}>
          SEU TERRENO<br />NAS MÃOS<br /><span style={{ color: C.yellow }}>CERTAS.</span>
        </h2>
        <p className="reveal" style={{ fontSize: "1.05rem", fontWeight: 300, color: "rgba(245,243,239,.58)", marginBottom: "3rem", maxWidth: 520, marginLeft: "auto", marginRight: "auto", lineHeight: 1.8 }}>
          Solicite seu orçamento agora. Atendemos toda a região com agilidade, qualidade e preço justo.
        </p>
        <div className="cta-actions reveal" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
          <a href="https://wa.me/554898008162?text=Olá! Gostaria de solicitar um orçamento de terraplanagem." className="btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: ".55rem", background: C.yellow, color: C.black, fontFamily: FONT.cond, fontWeight: 700, fontSize: ".88rem", letterSpacing: ".12em", textTransform: "uppercase", padding: ".85rem 2rem", textDecoration: "none" }}>
            <IconWA /> Chamar no WhatsApp
          </a>
          <a href="mailto:enzokaran2@gmail.com" className="btn-ghost"
            style={{ display: "inline-flex", alignItems: "center", gap: ".55rem", background: "transparent", border: "1.5px solid rgba(245,197,24,.4)", color: C.white, fontFamily: FONT.cond, fontWeight: 600, fontSize: ".88rem", letterSpacing: ".12em", textTransform: "uppercase", padding: ".85rem 2rem", textDecoration: "none" }}>
            <IconMail /> Enviar E-mail
          </a>
        </div>

        <div className="reveal" style={{ marginTop: "3.5rem", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "3rem" }}>
          {[
            ["Telefone", "(48) 9 8000-8162", "tel:+554898008162"],
            ["E-mail", "enzokaran2@gmail.com", "mailto:enzokaran2@gmail.com"],
            ["Localização", "Tubarão — Santa Catarina", null],
          ].map(([label, value, href]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: FONT.cond, fontSize: ".65rem", letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(245,243,239,.38)", marginBottom: ".4rem" }}>{label}</div>
              {href
                ? <a href={href} style={{ fontFamily: FONT.cond, fontWeight: 700, fontSize: "1.05rem", color: C.yellow, textDecoration: "none" }}>{value}</a>
                : <span style={{ fontFamily: FONT.cond, fontWeight: 700, fontSize: "1.05rem", color: C.yellow }}>{value}</span>
              }
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  const services = ["Terraplanagem", "Escavação", "Nivelamento", "Compactação", "Drenagem", "Locação de Máquinas"];
  const company = ["Sobre Nós", "Galeria de Obras", "Nossa Frota", "Depoimentos", "Contato"];
  const anchors = ["#sobre", "#galeria", "#maquinas", "#depoimentos", "#contato"];

  return (
    <footer style={{ background: C.coal, borderTop: "1px solid rgba(245,243,239,.06)" }}>
      <div className="footer-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "4.5rem 2rem 3rem", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: "3.5rem" }}>
        {/* brand */}
        <div>
          <Logo />
          <p style={{ fontFamily: FONT.body, fontSize: ".88rem", fontWeight: 300, color: "rgba(245,243,239,.42)", lineHeight: 1.8, marginTop: "1.4rem", maxWidth: 280 }}>
            Especialistas em terraplanagem, movimentação de terra e locação de máquinas. 19 anos de experiência e mais de 850 obras realizadas com excelência.
          </p>
        </div>

        {/* services */}
        <div>
          <div style={{ fontFamily: FONT.cond, fontWeight: 700, fontSize: ".72rem", letterSpacing: ".2em", textTransform: "uppercase", color: C.yellow, marginBottom: "1.4rem" }}>Serviços</div>
          <ul style={{ listStyle: "none" }}>
            {services.map((s) => (
              <li key={s} style={{ marginBottom: ".65rem" }}>
                <a href="#servicos" className="footer-link" style={{ fontSize: ".88rem", fontWeight: 300, color: "rgba(245,243,239,.48)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: ".5rem" }}>→ {s}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* company */}
        <div>
          <div style={{ fontFamily: FONT.cond, fontWeight: 700, fontSize: ".72rem", letterSpacing: ".2em", textTransform: "uppercase", color: C.yellow, marginBottom: "1.4rem" }}>Empresa</div>
          <ul style={{ listStyle: "none" }}>
            {company.map((c, i) => (
              <li key={c} style={{ marginBottom: ".65rem" }}>
                <a href={anchors[i]} className="footer-link" style={{ fontSize: ".88rem", fontWeight: 300, color: "rgba(245,243,239,.48)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: ".5rem" }}>→ {c}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* contact */}
        <div>
          <div style={{ fontFamily: FONT.cond, fontWeight: 700, fontSize: ".72rem", letterSpacing: ".2em", textTransform: "uppercase", color: C.yellow, marginBottom: "1.4rem" }}>Contato</div>
          {[
            ["📞", "Telefone / WhatsApp", "(48) 9 8000-8162"],
            ["✉️", "E-mail", "enzokaran2@gmail.com"],
            ["📍", "Localização", "Tubarão — SC\nAtendemos todo o Sul do Brasil"],
            ["🕐", "Horário", "Seg a Sex: 7h–18h\nSáb: 7h–12h"],
          ].map(([ic, label, info]) => (
            <div key={label} style={{ display: "flex", gap: ".7rem", alignItems: "flex-start", marginBottom: "1rem" }}>
              <div style={{ width: 30, height: 30, border: "1px solid rgba(245,197,24,.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".85rem", flexShrink: 0, color: C.yellow }}>{ic}</div>
              <div>
                <strong style={{ display: "block", fontFamily: FONT.cond, fontWeight: 700, fontSize: ".7rem", letterSpacing: ".08em", textTransform: "uppercase", color: "rgba(245,243,239,.68)", marginBottom: ".2rem" }}>{label}</strong>
                <span style={{ fontSize: ".85rem", fontWeight: 300, color: "rgba(245,243,239,.45)", whiteSpace: "pre-line", lineHeight: 1.5 }}>{info}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(245,243,239,.06)", padding: "1.5rem 2rem", maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ fontSize: ".78rem", color: "rgba(245,243,239,.28)" }}>© 2024 TerraForce Engenharia. Todos os direitos reservados. CNPJ 00.000.000/0001-00</div>
        <div style={{ display: "flex", gap: ".65rem" }}>
          {[[IconIG, "Instagram"], [IconFB, "Facebook"], [IconWA, "WhatsApp"], [IconLI, "LinkedIn"]].map(([Icon, label]) => (
            <a key={label} href={label === "WhatsApp" ? "https://wa.me/554898008162" : "#"} className="social-btn"
              style={{ width: 34, height: 34, border: "1px solid rgba(245,243,239,.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(245,243,239,.38)", textDecoration: "none" }}
              title={label}>
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ── FLOAT WHATSAPP ────────────────────────────────────────────────────────────
function FloatWA() {
  return (
    <a href="https://wa.me/554898008162?text=Olá! Gostaria de um orçamento de terraplanagem."
      className="wa-float wa-float-btn"
      title="Falar no WhatsApp"
      style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 900, width: 56, height: 56, background: "#25d366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
      <IconWA size={27} />
    </a>
  );
}

// ── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  useFonts();
  useReveal();

  return (
    <div style={{ background: C.black, color: C.white, fontFamily: FONT.body, minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <Services />
      <Gallery />
      <Differentials />
      <Machines />
      <Testimonials />
      <CTAFinal />
      <Footer />
      <FloatWA />
    </div>
  );
}