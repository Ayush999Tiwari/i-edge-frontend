import React, { useEffect, useRef, useState, useCallback } from "react";
import { Egg, Scale, Camera, ScanFace, FlaskConical, Leaf, Sparkles, ArrowRight, LogOut } from "lucide-react";
import EggCountingUpload from "./EggCountingUpload";

// --- Design Tokens ---
const C = {
  bg: "#F4F7ED",
  card: "#FFFFFF",
  ink: "#111827",
  inkSoft: "#374151",
  inkFaint: "#6B7280",
  green700: "#166534",
  green600: "#15803D",
  green500: "#16a34a",
  green300: "#86efac",
  green100: "#dcfce7",
  amber: "#b45309",
  amberBg: "#fef3c7",
  line: "rgba(23,36,28,0.08)",
};

// --- Service Data Type & Array ---
interface ServiceItem {
  id: string;
  name: string;
  Icon: React.ElementType;
  status: string;
  what: string;
  fullDescription: string;
  benefit: string;
  bullets: string[];
  hasDemo?: boolean;
}

const SERVICES: ServiceItem[] = [
  {
    id: "poultry-vision",
    name: "Egg & Chicken Count",
    Icon: Egg,
    status: "Active",
    what: "Turns raw plant-floor video into exact bird and egg counts.",
    fullDescription: "An advanced computer vision pipeline that ingests unstructured hatchery footage and returns auditable, ERP-ready census data.",
    benefit: "Replaces manual headcounts — synced to ledger in under 10 minutes.",
    bullets: ["Upload once — path, filename & timestamp logged straight to database.", "Frame-by-frame detection returns counts in about 10 minutes.", "Result posts straight to your inventory ledger."],
    hasDemo: true,
  },
  {
    id: "body-weight",
    name: "Body Weight Estimation",
    Icon: Scale,
    status: "Active",
    what: "Reads live bird weight straight from overhead video.",
    fullDescription: "Non-intrusive volumetric analysis using RGB-D sensors to estimate flock mass without handling stress or manual sampling.",
    benefit: "Catch underweight batches days earlier — no scale required.",
    bullets: ["Weight read from footage — no manual weigh-ins.", "Every batch tracked against its target growth curve.", "Underweight groups flagged early enough to act."],
  },
  {
    id: "home-surveillance",
    name: "Home Surveillance",
    Icon: Camera,
    status: "Active",
    what: "Watches staff housing and every site gate, day and night.",
    fullDescription: "Intelligent perimeter monitoring that distinguishes between human, animal, and vehicle motion to eliminate false alarms.",
    benefit: "Know the moment someone's at the gate — no night watch needed.",
    bullets: ["Continuous coverage of housing and entrances.", "Instant alert the moment motion is detected at a gate.", "Cuts the need for a manual night guard rotation."],
  },
  {
    id: "face-recognition",
    name: "Face Recognition",
    Icon: ScanFace,
    status: "Active",
    what: "Logs every staff and visitor entry against an enrolled roster.",
    fullDescription: "Millisecond-latency biometric verification with liveness detection to prevent spoofing and ensure absolute access control integrity.",
    benefit: "Stops buddy-punching and tailgating automatically.",
    bullets: ["Every entry matched against your enrolled roster.", "Exact log of who passed which checkpoint, and when.", "No manual register to maintain at the gate."],
  },
  {
    id: "quality-testing",
    name: "Quality Testing AI",
    Icon: FlaskConical,
    status: "Active",
    what: "Automated visual inspection for feed, water, and environmental samples.",
    fullDescription: "Computer vision analysis of lab samples and production outputs to detect contaminants, nutrient deficiencies, and quality deviations instantly.",
    benefit: "Identifies quality issues before they impact flock health or product safety.",
    bullets: ["Analyzes feed composition and water clarity via camera input.", "Flags contamination risks before distribution to coops.", "Generates compliance reports for regulatory audits automatically."],
  },
  {
    id: "plant-surveillance",
    name: "Plant Surveillance",
    Icon: Leaf,
    status: "Beta",
    what: "Covers the full production floor beyond entry points.",
    fullDescription: "Comprehensive operational oversight detecting equipment jams, safety violations, and bottlenecks before they cause costly downtime.",
    benefit: "Flags jammed lines or blocked exits before shutdown.",
    bullets: ["Full-floor coverage, beyond just checkpoints.", "Equipment faults & blocked exits flagged automatically.", "Searchable video record for every alert raised."],
  },
];

// --- Helper Functions ---
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve();
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function useCountUp(target: number, ready: boolean, delayMs = 200, durationMs = 1500) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!ready) return;
    let raf: number;
    const start = performance.now() + delayMs;
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - start) / durationMs));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ready, delayMs, durationMs]);
  return val;
}

// --- Components ---
function Stat({ target, label, suffix, ready }: { target: number; label: string; suffix?: string; ready: boolean }) {
  const val = useCountUp(target, ready);
  return (
    <div className="flex-1 min-w-[150px] px-6 py-5" style={{ borderRight: `1px solid ${C.line}` }}>
      <div className="flex items-baseline gap-1 text-3xl font-bold" style={{ color: C.ink }}>
        {val.toLocaleString()}
        {suffix && <span className="text-sm font-medium ml-1" style={{ color: C.inkFaint }}>{suffix}</span>}
      </div>
      <div className="mt-1 font-mono text-[10px] tracking-[0.1em] uppercase font-bold" style={{ color: C.inkFaint }}>
        {label}
      </div>
    </div>
  );
}

function FloatIcon({ Icon, gsapReady, size = 46, iconSize = 22 }: { Icon: React.ElementType; gsapReady: boolean; size?: number; iconSize?: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gsapReady || !window.gsap || !wrapRef.current) return;
    const gsap = window.gsap;
    const dur = 3 + Math.random() * 1.4;
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut", duration: dur } });
    tl.to(wrapRef.current, { y: -8, rotateX: 10, rotateY: -14 }, 0);
    if (shadowRef.current) {
      gsap.to(shadowRef.current, { scale: 0.72, opacity: 0.25, duration: dur, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }
    return () => { tl.kill(); }; 
  }, [gsapReady]);

  return (
    <div style={{ perspective: 500 }}>
      <div
        ref={wrapRef}
        className="relative flex items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          background: `linear-gradient(150deg, ${C.green100}, #fff)`,
          boxShadow: `inset 0 0 0 1px ${C.line}, 0 10px 20px -10px rgba(60,84,32,0.35)`,
        }}
      >
        <Icon size={iconSize} color={C.green700} strokeWidth={1.7} />
      </div>
      <div
        ref={shadowRef}
        className="mx-auto rounded-full transition-all duration-500 group-hover:scale-75 group-hover:opacity-10"
        style={{ width: size * 0.7, height: 8, marginTop: 8, background: "rgba(60,84,32,0.18)", filter: "blur(4px)" }}
      />
    </div>
  );
}

function ServiceCard({ service, index, gsapReady, onSelect, registerRef }: { 
  service: ServiceItem; 
  index: number; 
  gsapReady: boolean; 
  onSelect: (service: ServiceItem) => void; 
  registerRef: (id: string, node: HTMLDivElement) => void;
}) {
  const localRef = useRef<HTMLDivElement>(null);
  const isBeta = service.status === "Beta";

  useEffect(() => {
    if (localRef.current) registerRef(service.id, localRef.current);
  }, [registerRef, service.id]);

  useEffect(() => {
    if (!gsapReady || !window.gsap || !localRef.current) return;
    window.gsap.to(localRef.current, {
      y: -7,
      duration: 3.6 + (index % 4) * 0.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.25,
    });
  }, [gsapReady, index]);

  return (
    <div
      ref={localRef}
      onClick={() => onSelect(service)}
      className="group relative rounded-3xl cursor-pointer select-none overflow-hidden transition-all duration-500 ease-out border border-transparent hover:border-green-200"
      style={{
        background: `linear-gradient(180deg, #ffffff 0%, ${C.bg} 100%)`,
        boxShadow: "0 4px 20px -5px rgba(23,36,28,0.08)",
        minHeight: "320px",
      }}
    >
      <div className="p-7 h-full flex flex-col relative z-10">
        
        <div className="flex items-start justify-between mb-6">
          <FloatIcon Icon={service.Icon} gsapReady={gsapReady} />
          <span
            className="text-[10px] font-bold px-3 py-1.5 rounded-full h-fit font-mono uppercase tracking-wider"
            style={{
              background: isBeta ? C.amberBg : C.green100,
              color: isBeta ? C.amber : C.green700,
            }}
          >
            {service.status}
          </span>
        </div>

        <h3 className="mb-3 text-xl font-bold transition-colors duration-300 group-hover:text-green-700" style={{ color: C.ink }}>
          {service.name}
        </h3>
        
        <p className="text-sm leading-relaxed mb-6" style={{ color: C.inkSoft }}>
          {service.what}
        </p>

        {/* Always Visible Benefit Badge */}
        <div className="mt-auto p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 group-hover:bg-white/80 group-hover:shadow-md"
             style={{ background: "rgba(255,255,255,0.6)", borderColor: C.line }}>
          <div className="flex gap-2 items-start">
            <Sparkles size={14} color={C.green600} style={{ marginTop: 2, flexShrink: 0 }} />
            <p className="text-xs font-bold leading-snug" style={{ color: C.green700 }}>{service.benefit}</p>
          </div>
        </div>

        {/* Hover Reveal Section */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
          <div className="overflow-hidden">
            <div className="pt-6 mt-6 border-t" style={{ borderColor: C.line }}>
              
              <p className="mb-6 text-base leading-relaxed italic" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: C.inkSoft }}>
                "{service.fullDescription}"
              </p>

              <button className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg active:scale-95" style={{ background: C.green700, color: "#fff" }}>
                Access Module <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- Main Page Component ---
export default function Landingpage() {
  const [activeView, setActiveView] = useState<'dashboard' | 'egg-upload'>('dashboard');
  const [gsapReady, setGsapReady] = useState(false);
  const cardRefs = useRef<Record<string, HTMLDivElement>>({});

  // ✅ LOGOUT HANDLER
  const handleLogout = () => {
    localStorage.removeItem('iedge_token');
    window.location.reload();
  };

  useEffect(() => {
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js")
      .then(() => setGsapReady(true))
      .catch(() => setGsapReady(false));
  }, []);

  useEffect(() => {
    if (!gsapReady || !window.gsap || activeView !== 'dashboard') return;
    
    const gsap = window.gsap;
    gsap.utils.toArray<HTMLElement>(".blob-el").forEach((b: HTMLElement, i: number) => {
      gsap.to(b, {
        x: i % 2 === 0 ? 24 : -24,
        y: i % 2 === 0 ? -18 : 18,
        duration: 7 + i * 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
    
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-badge", { y: 16, opacity: 0, duration: 0.5 })
      .from(".hero-h1", { y: 26, opacity: 0, duration: 0.7 }, "-=0.25")
      .from(".hero-sub", { y: 16, opacity: 0, duration: 0.5 }, "-=0.35")
      .from(".stat-el", { y: 14, opacity: 0, duration: 0.45, stagger: 0.08 }, "-=0.2")
      .from(".service-card-el", { y: 30, opacity: 0, duration: 0.55, stagger: 0.08 }, "-=0.1");
  }, [gsapReady, activeView]);

  const registerRef = useCallback((id: string, node: HTMLDivElement) => {
    cardRefs.current[id] = node;
  }, []);

  const handleCardClick = (service: ServiceItem) => {
    if (service.id === 'poultry-vision') {
      setActiveView('egg-upload');
    }
  };

  if (activeView === 'egg-upload') {
    return <EggCountingUpload onBack={() => setActiveView('dashboard')} />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ background: C.bg, color: C.ink, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* Background Blobs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="blob-el absolute rounded-full" style={{ width: 520, height: 520, top: -140, left: -160, background: `radial-gradient(circle at 35% 35%, ${C.green300}, transparent 70%)`, filter: "blur(60px)", opacity: 0.55 }} />
        <div className="blob-el absolute rounded-full" style={{ width: 620, height: 620, bottom: -220, right: -200, background: `radial-gradient(circle at 35% 35%, ${C.green300}, transparent 70%)`, filter: "blur(60px)", opacity: 0.4 }} />
        <div className="blob-el absolute rounded-full" style={{ width: 320, height: 320, top: "36%", right: "6%", background: `radial-gradient(circle at 35% 35%, ${C.green300}, transparent 70%)`, filter: "blur(60px)", opacity: 0.3 }} />
      </div>

      {/* ✅ FIXED POSITION LOGOUT BUTTON (Bottom Left, Light Green) */}
      <button
        onClick={handleLogout}
        className="fixed bottom-6 left-6 z-[9999] flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        style={{ background: C.green100, color: C.green700, border: `1px solid ${C.green300}` }}
      >
        <LogOut size={16} />
        Logout
      </button>

      <div className="relative z-10">
        {/* Header */}
        <header className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-bold text-2xl" style={{ color: C.ink }}>
            <span className="w-8 h-8 rounded-[10px] flex items-center justify-center" style={{ background: `linear-gradient(155deg, ${C.green500}, ${C.green700})` }}>
              <Egg size={16} color="#EFF4E8" />
            </span>
            i-Edge
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-8">
          <section className="pt-16 pb-12 max-w-5xl">  
           <h1 className="hero-h1 max-w-4xl font-bold leading-[1.05] mb-8" style={{ fontSize: "clamp(40px, 6vw, 72px)", color: C.ink }}>
              Six AI Services.<br/>
              <span style={{ color: C.green700 }}>One Unified Platform.</span>
            </h1>
            <div className="hero-sub max-w-3xl mb-12 space-y-6">
              <p className="text-xl font-medium leading-relaxed" style={{ color: C.ink }}>
                From poultry vision to quality testing, our AI pipeline transforms unstructured operational data into precise, ERP-ready insights across every facility function.
              </p>
              
              {/* Catchy Highlighted CTA Block */}
              <div className="flex items-start gap-4 p-5 rounded-2xl border-l-4 bg-white/60 backdrop-blur-sm" style={{ borderColor: C.green600 }}>
                <Sparkles size={20} className="shrink-0 mt-1" style={{ color: C.green700 }} />
                <div>
                  <p className="text-base font-bold mb-2" style={{ color: C.ink }}>
                    Explore the Architecture. Experience the Precision.
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>
                    This isn't a concept deck. It's a production-grade system deployed across <strong className="text-gray-900">twelve facilities</strong>, processing over <strong className="text-gray-900">48,000 events daily</strong>. Select any module below to interact with its live pipeline, view real-time metrics, and run a simulation firsthand.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="flex flex-wrap bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="stat-el flex-1"><Stat target={6} label="AI Services Live" ready={gsapReady} /></div>
              <div className="stat-el flex-1"><Stat target={12} label="Production Sites" ready={gsapReady} /></div>
              <div className="stat-el flex-1"><Stat target={48206} label="Events Today" ready={gsapReady} /></div>
              <div className="stat-el flex-1"><Stat target={10} suffix=" min" label="Avg Processing" ready={gsapReady} /></div>
            </div>
          </section>

          {/* 6 SERVICE CARDS */}
          <section className="mt-16 mb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s: ServiceItem, i: number) => (
                <div className="service-card-el" key={s.id}>
                  <ServiceCard 
                    service={s} 
                    index={i} 
                    gsapReady={gsapReady} 
                    onSelect={handleCardClick} 
                    registerRef={registerRef} 
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Premium Footer CTA */}
          <section className="rounded-[24px] px-10 py-12 flex flex-wrap items-center justify-between gap-6 relative overflow-hidden" style={{ background: `linear-gradient(120deg, ${C.green700}, ${C.green600})`, color: "#EFF4E8" }}>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Need a custom detection model?</h3>
              <p className="text-sm opacity-90 max-w-md">We build new AI pipelines onto the same infrastructure. Tell us what to count, and we'll deploy it.</p>
            </div>
            <button className="relative z-10 px-8 py-4 rounded-full font-bold text-sm bg-white hover:bg-gray-50 transition-colors shadow-lg" style={{ color: C.green700 }}>
              Talk to Engineering
            </button>
            
            {/* Decorative Circle */}
            <div className="absolute -right-10 -bottom-20 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          </section>

        </main>

        <footer className="max-w-6xl mx-auto px-8 mt-12 py-8 flex flex-wrap items-center justify-between gap-3 border-t" style={{ borderColor: C.line }}>
          <p className="font-mono text-xs" style={{ color: C.inkFaint }}>Secured by i-Edge Enterprise v2.0</p>
          <p className="font-mono text-xs" style={{ color: C.inkFaint }}>© 2026 i-Edge · PostgreSQL Ledger · ERP Synced</p>
        </footer>
      </div>
    </div>
  );
}