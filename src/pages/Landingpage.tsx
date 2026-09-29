import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, ElementType, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Bell,
  Camera,
  Car,
  ChevronDown,
  FileText,
  Flame,
  LayoutDashboard,
  LogOut,
  Menu,
  Swords,
  Users,
  X,
} from "lucide-react";
import { gsap } from "gsap";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";

const CONTACT_EMAIL = "ayvsht999@gmail.com";
const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("i-Edge demo request")}`;
const TOKEN_KEY = "iedge_token";
const WRAP = "mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-14";
const C = {
  paper: "#F1F2EC",
  paper2: "#E6E8DF",
  card: "#FBFBF8",
  ink: "#16191C",
  ink2: "#41474D",
  ink3: "#6E747B",
  line: "#D3D6CC",
  graphite: "#14171A",
  graphite2: "#1D2226",
  signal: "#3B6BFF",
  signalHi: "#8DB0FF",
};
const F = {
  display: "'Bricolage Grotesque', 'Manrope', system-ui, sans-serif",
  body: "'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
};
const h2Style: CSSProperties = {
  fontFamily: F.display,
  fontWeight: 800,
  fontSize: "clamp(34px, 4.6vw, 64px)",
  lineHeight: 1.02,
  letterSpacing: "-0.03em",
  color: C.ink,
};
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=JetBrains+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap');
.ie-sec{scroll-margin-top:88px}
.ie-root ::selection{background:${C.graphite};color:${C.paper}}
.ie-root :focus-visible{outline:2px solid ${C.signal};outline-offset:3px;border-radius:10px}
.ie-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;border-radius:999px;padding:15px 28px;font-weight:700;font-size:14.5px;line-height:1;cursor:pointer;white-space:nowrap;transition:transform .25s ease,box-shadow .25s ease,background .25s ease,color .25s ease}
.ie-btn:active{transform:scale(.97)}
.ie-btn-primary{background:${C.ink};color:${C.paper};box-shadow:0 14px 28px -14px rgba(20,23,26,.7)}
.ie-btn-primary:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 22px 36px -16px rgba(20,23,26,.75)}
.ie-btn-primary:disabled{opacity:.45;cursor:not-allowed}
.ie-btn-ghost{border:1px solid ${C.ink};color:${C.ink};background:transparent}
.ie-btn-ghost:hover{background:${C.ink};color:${C.paper}}
/* camera-frame brackets (contact section) */
.ie-br{--s:22px;--o:14px;position:absolute;width:var(--s);height:var(--s);border:0 solid ${C.signalHi};pointer-events:none}
.ie-br-tl{top:var(--o);left:var(--o);border-top-width:2px;border-left-width:2px;border-top-left-radius:6px}
.ie-br-tr{top:var(--o);right:var(--o);border-top-width:2px;border-right-width:2px;border-top-right-radius:6px}
.ie-br-bl{bottom:var(--o);left:var(--o);border-bottom-width:2px;border-left-width:2px;border-bottom-left-radius:6px}
.ie-br-br{bottom:var(--o);right:var(--o);border-bottom-width:2px;border-right-width:2px;border-bottom-right-radius:6px}

/* focus marks at the rule-of-thirds intersections */
.ie-thirds span{position:absolute;background:rgba(22,25,28,.075)}
.ie-plus{position:absolute;width:15px;height:15px;transform:translate(-50%,-50%)}
.ie-plus::before,.ie-plus::after{content:"";position:absolute;background:rgba(22,25,28,.3)}
.ie-plus::before{left:0;right:0;top:50%;height:1px}
.ie-plus::after{top:0;bottom:0;left:50%;width:1px}
.ie-plus-inline{position:relative;flex:none;transform:none}

/* marquee */
.ie-marquee{overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 9%,#000 91%,transparent);mask-image:linear-gradient(90deg,transparent,#000 9%,#000 91%,transparent)}
.ie-marquee-track{display:flex;width:max-content;animation:ie-marquee 46s linear infinite}
.ie-marquee:hover .ie-marquee-track{animation-play-state:paused}
.ie-marquee-row{display:flex;flex-shrink:0;align-items:center;margin:0;padding:0;list-style:none}
.ie-marquee-row li{display:flex;align-items:center;gap:28px;padding-right:28px;white-space:nowrap}

/* diagram */
.ie-flow{animation:ie-flow 1.6s linear infinite}
.ie-ring{animation:ie-spin 22s linear infinite}
.ie-aperture{animation:ie-spin 120s linear infinite}

/* 3D icon tile */
.ie-cube{position:relative;flex:none;width:60px;height:60px;transform-style:preserve-3d;animation:ie-cube 6s ease-in-out infinite}
.ie-cube>span{position:absolute;inset:0;border-radius:18px}
.ie-cube-back{transform:translateZ(-18px);background:${C.graphite};opacity:.25;filter:blur(7px)}
.ie-cube-mid{transform:translateZ(-9px);background:${C.paper2};border:1px solid ${C.line}}
.ie-cube-face{display:flex;align-items:center;justify-content:center;background:${C.graphite};color:${C.signalHi};box-shadow:inset 0 0 0 1px rgba(255,255,255,.1)}

.ie-bob{animation:ie-bob 4.6s ease-in-out infinite}
.ie-row-in{animation:ie-row-in .55s cubic-bezier(.2,.8,.2,1) both}
.ie-sweep{position:absolute;left:0;right:0;top:0;height:90px;background:linear-gradient(to bottom,rgba(141,176,255,0),rgba(141,176,255,.14));border-bottom:1px solid rgba(141,176,255,.5);animation:ie-sweep 6s linear infinite;pointer-events:none}

/* feature cards: cursor spotlight + hover state (text only, depth comes from the 3D tilt) */
.ie-feature{transition:border-color .3s ease}
.ie-feature:hover{border-color:${C.ink}!important}
.ie-feature-dark:hover{border-color:${C.signalHi}!important}
.ie-spot{position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s ease;background:radial-gradient(380px circle at var(--mx,50%) var(--my,50%),rgba(59,107,255,.13),transparent 60%)}
.ie-feature-dark .ie-spot{background:radial-gradient(380px circle at var(--mx,50%) var(--my,50%),rgba(141,176,255,.2),transparent 60%)}
.ie-feature:hover .ie-spot{opacity:1}
.ie-go{transition:background .25s ease,color .25s ease,border-color .25s ease,transform .25s ease}
.ie-feature:hover .ie-go{background:${C.ink};color:${C.paper}!important;border-color:${C.ink}!important;transform:translate(2px,-2px)}
.ie-feature-dark:hover .ie-go{background:#fff;color:${C.ink}!important;border-color:#fff!important}

/* module blocks dim when they are not the active one (desktop, sticky layout only) */
.ie-block{transition:opacity .5s ease}
@media (min-width:1024px){.ie-block[data-active="false"]{opacity:.3}}

@keyframes ie-marquee{to{transform:translateX(-50%)}}
@keyframes ie-spin{to{transform:rotate(360deg)}}
@keyframes ie-flow{to{stroke-dashoffset:-32}}
@keyframes ie-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
@keyframes ie-row-in{from{opacity:0;transform:translateY(-14px)}to{opacity:1;transform:none}}
@keyframes ie-sweep{0%{transform:translateY(-100%)}100%{transform:translateY(560%)}}
@keyframes ie-cube{0%,100%{transform:perspective(520px) rotateX(20deg) rotateY(-24deg) translateY(0)}50%{transform:perspective(520px) rotateX(14deg) rotateY(-14deg) translateY(-6px)}}

@media (prefers-reduced-motion:reduce){
  .ie-marquee-track,.ie-ring,.ie-flow,.ie-cube,.ie-aperture,.ie-bob,.ie-row-in,.ie-sweep{animation:none!important}
}
`;

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

interface ServiceItem {
  id: string;
  name: string;
  Icon: ElementType;
  status: string;
  overview: string;
  fullDescription: string;
  benefit: string;
  hasDemo?: boolean;
  image?: string;
  route?: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "home-surveillance",
    name: "Advanced Home Security",
    Icon: Camera,
    status: "Active",
    overview:
      "Comprehensive home security that integrates fire detection, crowd monitoring, and violence prevention into a single intelligent system.",
    fullDescription:
      "Our advanced AI doesn't just watch for intruders. It actively monitors for smoke and flames to prevent fire disasters, detects unusual crowd gatherings or aggressive behavior (violence) to ensure family safety, and distinguishes between pets, family members, and strangers.",
    benefit: "Total peace of mind with multi-threat detection: Fire, Violence, and Intrusion in one app.",
    image: "/Gemini_Generated_Image_5h1ono5h1ono5h1o.png",
    route: "/home-surveillance",
  },
  {
    id: "vehicle-surveillance",
    name: "Vehicle Intelligence",
    Icon: Car,
    status: "Active",
    overview:
      "Monitor parking lots, gates, and roads 24/7. AI detects unauthorized vehicles, tracks entry/exit times, reads number plates automatically, and alerts security for suspicious activity.",
    fullDescription:
      "Advanced vehicle detection and ANPR (Automatic Number Plate Recognition) system that monitors traffic flow, detects parking violations, and maintains complete vehicle logs.",
    benefit: "Reduces security staff workload by 70% with automated vehicle tracking and instant alerts.",
    image: "/Gemini_Generated_Image_qazzlfqazzlfqazz.png",
    route: "/vehicle-surveillance",
  },
];

const NAV = [
  { id: "features", label: "Features" },
  { id: "platform", label: "Platform" },
  { id: "modules", label: "Modules" },
  { id: "results", label: "Results" },
  { id: "contact", label: "Contact" },
];

const MARQUEE = [
  "Fire Detection",
  "Violence Alerts",
  "Crowd Monitoring",
  "Home Security",
  "Vehicle Tracking",
  "ANPR Systems",
  "Thermal Imaging",
  "Behavioral AI",
  "Real-time Alerts",
  "24/7 Monitoring",
];

const STEPS = [
  {
    title: "Connect your cameras",
    body: "Point i-Edge at your existing CCTV feeds: home perimeters, parking lots, public spaces, or industrial zones.",
  },
  {
    title: "AI analyzes every frame",
    body: "Our engine detects fire, violence, crowds, and vehicles instantly, filtering out noise and false positives.",
  },
  {
    title: "Instant Action & Alerts",
    body: "Receive immediate notifications for critical events like fire outbreaks or violent incidents, while logging routine data.",
  },
];
const prefersReduced = (): boolean =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/** Mouse-driven 3D tilt (React Bits / Aceternity style). Children can use translateZ for depth. */
function Tilt({
  children,
  className,
  style,
  baseX = 0,
  baseY = 0,
  max = 8,
  float = 0,
  fill = false,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  baseX?: number;
  baseY?: number;
  max?: number;
  float?: number;
  fill?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    gsap.set(inner, { rotationX: baseX, rotationY: baseY });
    if (prefersReduced()) return;
    const rx = gsap.quickTo(inner, "rotationX", { duration: 0.8, ease: "power3.out" });
    const ry = gsap.quickTo(inner, "rotationY", { duration: 0.8, ease: "power3.out" });
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = wrap.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      ry(baseY + nx * max);
      rx(baseX - ny * max * 0.75);
    };
    const onLeave = () => {
      ry(baseY);
      rx(baseX);
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    const bob = float
      ? gsap.to(inner, { y: -float, duration: 3.6, ease: "sine.inOut", yoyo: true, repeat: -1 })
      : null;

    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      bob?.kill();
      gsap.killTweensOf(inner);
    };
  }, [baseX, baseY, max, float]);

  return (
    <div ref={wrapRef} className={className} style={{ perspective: "1400px", ...style }}>
      <div
        ref={innerRef}
        style={{ transformStyle: "preserve-3d", position: "relative", height: fill ? "100%" : undefined }}
      >
        {children}
      </div>
    </div>
  );
}

function Brackets({ size = 22, offset = 14 }: { size?: number; offset?: number }) {
  const vars = { "--s": `${size}px`, "--o": `${offset}px` } as CSSProperties;
  return (
    <>
      {["tl", "tr", "bl", "br"].map((k) => (
        <span key={k} className={`ie-br ie-br-${k}`} style={vars} />
      ))}
    </>
  );
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.6);
  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    if (prefersReduced()) {
      el.textContent = `${to}${suffix}`;
      return;
    }
    const o = { v: 0 };
    const tw = gsap.to(o, {
      v: to,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = `${Math.round(o.v)}${suffix}`;
      },
    });
    return () => {
      tw.kill();
    };
  }, [inView, to, suffix, ref]);
  return <span ref={ref}>{`0${suffix}`}</span>;
}

function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span
        className="flex h-9 w-9 items-center justify-center rounded-full"
        style={{ background: C.graphite }}
      >
        <span
          style={{
            fontFamily: F.display,
            fontWeight: 800,
            fontSize: 15,
            color: C.paper,
            letterSpacing: "-0.02em",
          }}
        >
          iE
        </span>
      </span>
      <span
        style={{ fontFamily: F.display, fontWeight: 800, fontSize: 21, letterSpacing: "-0.03em", color: C.ink }}
      >
        i-Edge
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

function Nav({
  active,
  onGo,
  onLogout,
}: {
  active: string;
  onGo: (id: string) => void;
  onLogout: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    onGo(id);
  };

  // Specific permanent color for Modules
  const MODULES_COLOR = "#008ECC";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-10 sm:pt-4 lg:px-14">
      <div className="ie-nav pointer-events-auto relative w-full max-w-[1288px]">
        <nav
          aria-label="Primary"
          className="flex items-center justify-between rounded-full py-2 pl-4 pr-2"
          style={{
            background: scrolled ? "rgba(241,242,236,.86)" : "rgba(241,242,236,.55)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: `1px solid ${scrolled ? C.line : "rgba(211,214,204,.5)"}`,
            boxShadow: scrolled ? "0 14px 34px -18px rgba(20,23,26,.35)" : "none",
            transition: "background .3s ease, border-color .3s ease, box-shadow .3s ease",
          }}
        >
          {/* Logo Button with Pointer */}
          <button 
            onClick={() => go("top")} 
            aria-label="i-Edge, back to top"
            style={{ cursor: "pointer" }}
          >
            <Logo />
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => {
              const isModules = n.id === "modules";
              
              // If it's Modules, force permanent BLUE TEXT ONLY (No white box)
              if (isModules) {
                return (
                  <li key={n.id}>
                    <button
                      onClick={() => go(n.id)}
                      className="rounded-full px-4 py-2 text-[14px] font-semibold transition-opacity hover:opacity-70"
                      style={{
                        color: MODULES_COLOR,
                        background: "transparent", 
                        boxShadow: "none",
                        cursor: "pointer" // Added Pointer
                      }}
                    >
                      {n.label}
                    </button>
                  </li>
                );
              }

              // Standard Logic for other links
              const isActive = active === n.id;
              return (
                <li key={n.id}>
                  <button
                    onClick={() => go(n.id)}
                    aria-current={isActive ? "true" : undefined}
                    className="rounded-full px-4 py-2 text-[14px] font-semibold transition-colors"
                    style={{
                      color: isActive ? C.ink : C.ink2,
                      background: isActive ? "rgba(255,255,255,.9)" : "transparent",
                      cursor: "pointer" // Added Pointer
                    }}
                  >
                    {n.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onLogout}
              className="hidden items-center gap-2 rounded-full px-4 py-2 text-[14px] font-semibold sm:flex"
              style={{ 
                color: C.ink2,
                cursor: "pointer" // Added Pointer
              }}
            >
              <LogOut size={15} />
              Logout
            </button>
            
            {/* Talk to our team - Fully Rounded & Contained Animation */}
            <div className="relative" style={{ cursor: "pointer" }}>
              <InteractiveHoverButton
                text="Talk to our team"
                onClick={() => window.open(MAILTO, "_blank")}
                variant="primary"
                style={{ 
                  padding: "12px 24px", 
                  fontSize: "14px",
                  borderRadius: "999px", // Force full rounding
                  background: C.ink, 
                  color: C.paper,
                  boxShadow: "none",
                  cursor: "pointer" // Added Pointer
                }}
              />
            </div>

            <button
              className="flex h-10 w-10 items-center justify-center rounded-full md:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              style={{ 
                background: "rgba(255,255,255,.9)", 
                color: C.ink,
                cursor: "pointer" // Added Pointer
              }}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {open && (
          <div
            className="mt-2 rounded-3xl p-3 md:hidden"
            style={{
              background: "rgba(251,251,248,.96)",
              border: `1px solid ${C.line}`,
              boxShadow: "0 24px 48px -24px rgba(20,23,26,.4)",
            }}
          >
            {NAV.map((n) => {
               const isModules = n.id === "modules";
               const isActive = active === n.id;
               
               if (isModules) {
                 return (
                  <button
                    key={n.id}
                    onClick={() => go(n.id)}
                    className="block w-full rounded-2xl px-4 py-3 text-left text-[15px] font-semibold"
                    style={{ 
                      color: MODULES_COLOR, 
                      background: "transparent",
                      cursor: "pointer" // Added Pointer
                    }}
                  >
                    {n.label}
                  </button>
                 )
               }

               return (
                <button
                  key={n.id}
                  onClick={() => go(n.id)}
                  className="block w-full rounded-2xl px-4 py-3 text-left text-[15px] font-semibold"
                  style={{ 
                    color: isActive ? C.ink : C.ink2,
                    cursor: "pointer" // Added Pointer
                  }}
                >
                  {n.label}
                </button>
               )
            })}
            <div className="mt-2 flex gap-2 border-t pt-3" style={{ borderColor: C.line }}>
              
              <InteractiveHoverButton
                text="Talk to our team"
                onClick={() => window.open(MAILTO, "_blank")}
                variant="primary"
                style={{ 
                  flex: 1, 
                  padding: "13px 18px", 
                  fontSize: "14px", 
                  borderRadius: "999px",
                  cursor: "pointer" // Added Pointer
                }}
              />
              
              <button 
                onClick={onLogout} 
                className="ie-btn ie-btn-ghost" 
                style={{ 
                  padding: "13px 18px",
                  cursor: "pointer" // Added Pointer
                }}
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Thirds() {
  const pts: [number, number][] = [
    [33.333, 33.333],
    [66.666, 33.333],
    [33.333, 66.666],
    [66.666, 66.666],
  ];
  const mask = "linear-gradient(to bottom, #000 45%, transparent 95%)";
  return (
    <div
      aria-hidden
      className="ie-thirds pointer-events-none absolute inset-0"
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      <span style={{ left: "33.333%", top: 0, bottom: 0, width: 1 }} />
      <span style={{ left: "66.666%", top: 0, bottom: 0, width: 1 }} />
      <span style={{ top: "33.333%", left: 0, right: 0, height: 1 }} />
      <span style={{ top: "66.666%", left: 0, right: 0, height: 1 }} />
      {pts.map(([x, y]) => (
        <i key={`${x}-${y}`} className="ie-plus" style={{ left: `${x}%`, top: `${y}%` }} />
      ))}
    </div>
  );
}

interface HeroAlert {
  id: string;
  Icon: ElementType;
  label: string;
  idle: string;
  /** what the AI tells you when it catches something */
  message: string;
  style: CSSProperties;
  z: number;
  desktopOnly?: boolean;
}

// Fire, crowd and violence are all part of Advanced Home Security; vehicle is its own module.
const HERO_ALERTS: HeroAlert[] = [
  { id: "fire", Icon: Flame, label: "Fire", idle: "No smoke seen", message: "Smoke detected in Zone C", style: { left: "-4%", top: "15%" }, z: 90 },
  { id: "crowd", Icon: Users, label: "Crowd", idle: "Normal", message: "Crowd building up at Gate A", style: { right: "-5%", top: "8%" }, z: 60, desktopOnly: true },
  { id: "violence", Icon: Swords, label: "Violence", idle: "None detected", message: "Aggressive behaviour at the entrance", style: { right: "-4%", top: "44%" }, z: 100, desktopOnly: true },
  { id: "vehicle", Icon: Car, label: "Vehicle", idle: "Plates logged", message: "Unknown vehicle at the gate", style: { left: "-3%", bottom: "25%" }, z: 70 },
];

function AlertChip({ a, on }: { a: HeroAlert; on: boolean }) {
  const t = "background .4s ease, border-color .4s ease, color .4s ease";
  return (
    <div
      className="flex items-center gap-2.5 rounded-2xl py-2 pl-2 pr-4"
      style={{
        background: on ? C.graphite : "rgba(251,251,248,.94)",
        border: `1px solid ${on ? "rgba(141,176,255,.55)" : C.line}`,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "0 18px 34px -16px rgba(20,23,26,.5)",
        transition: t,
      }}
    >
      <span
        className="flex h-8 w-8 flex-none items-center justify-center rounded-xl"
        style={{ background: on ? C.signal : C.graphite, color: on ? "#fff" : C.signalHi, transition: t }}
      >
        <a.Icon size={16} strokeWidth={1.9} />
      </span>
      <span className="leading-tight">
        <span className="block whitespace-nowrap text-[13px] font-bold" style={{ color: on ? "#fff" : C.ink, transition: t }}>
          {a.label}
        </span>
        <span className="block whitespace-nowrap text-[11px]" style={{ color: on ? C.signalHi : C.ink3, transition: t }}>
          {on ? "Alert sent" : a.idle}
        </span>
      </span>
    </div>
  );
}

/** The message the AI sends to you: this is the "AI is serving you" moment */
function AlertToast({ a }: { a: HeroAlert }) {
  return (
    <div
      className="ie-row-in flex items-start gap-3 rounded-2xl p-3.5"
      style={{
        background: "rgba(251,251,248,.97)",
        border: `1px solid ${C.line}`,
        boxShadow: "0 30px 50px -24px rgba(20,23,26,.55)",
      }}
    >
      <span
        className="flex h-9 w-9 flex-none items-center justify-center rounded-xl"
        style={{ background: C.signal, color: "#fff" }}
      >
        <Bell size={16} strokeWidth={2} />
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="flex items-center justify-between gap-6">
          <span className="text-[12px] font-bold" style={{ color: C.ink }}>
            Alert sent to you
          </span>
          <span className="text-[11px]" style={{ color: C.ink3 }}>
            now
          </span>
        </span>
        <span className="mt-1.5 block text-[12.5px] leading-snug" style={{ color: C.ink2 }}>
          {a.message}
        </span>
      </span>
    </div>
  );
}

/** The picture, with the AI visibly working for you: watching, catching, and telling you. No plate, no shadow. */
function HeroScene() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Each protection takes a turn catching something and alerting you
  useEffect(() => {
    if (prefersReduced()) return;
    const t = window.setInterval(() => setActive((i) => (i + 1) % HERO_ALERTS.length), 3400);
    return () => window.clearInterval(t);
  }, []);

  // Scroll depth: the picture tips back as you leave the hero (Aceternity container-scroll idea)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || prefersReduced()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / 640));
      el.style.transform = `perspective(1600px) rotateX(${p * 16}deg) translateY(${p * 48}px) scale(${1 - p * 0.07})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="ie-hero-scene relative mx-auto w-full max-w-[600px] pb-12 lg:mx-0 lg:justify-self-end">
      <div ref={scrollRef} style={{ transformOrigin: "50% 100%" }}>
        <Tilt baseX={3} baseY={-9} max={9} float={9}>
          <div className="relative overflow-hidden" style={{ borderRadius: 34, aspectRatio: "5 / 4", background: C.graphite }}>
            <img
              src="/images (1).jpeg"
              alt="i-Edge AI Platform"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="ie-sweep" />
          </div>

          {HERO_ALERTS.map((a, i) => (
            <div
              key={a.id}
              className={`absolute ${a.desktopOnly ? "hidden sm:block" : ""}`}
              style={{ ...a.style, transform: `translateZ(${a.z}px)` }}
            >
              <div className="ie-bob" style={{ animationDelay: `${-i * 1.2}s`, animationDuration: `${4.4 + i * 0.4}s` }}>
                <AlertChip a={a} on={i === active} />
              </div>
            </div>
          ))}

          <div
            className="absolute"
            style={{ right: "3%", bottom: "-10%", width: "min(300px, 76%)", transform: "translateZ(120px)" }}
          >
            <AlertToast key={HERO_ALERTS[active].id} a={HERO_ALERTS[active]} />
          </div>
        </Tilt>
      </div>
    </div>
  );
}

function Hero({ onExplore }: { onExplore: () => void }) {
  const navigate = useNavigate();
  const lineStyle: CSSProperties = { paddingBottom: "0.12em", marginBottom: "-0.12em" };
  return (
    <section id="top" className="ie-sec relative overflow-hidden pb-24 pt-36 sm:pt-44 lg:pb-32 lg:pt-52">
      <Thirds />
      <div className={`${WRAP} relative grid items-center gap-20 lg:grid-cols-2 lg:gap-x-28`}>
        <div>
          <h1
            className="mb-9"
            style={{
              fontFamily: F.display,
              fontWeight: 800,
              fontSize: "clamp(50px, 6.2vw, 96px)",
              lineHeight: 0.96,
              letterSpacing: "-0.04em",
              color: C.ink,
            }}
          >
            <span className="ie-h1-line block overflow-hidden" style={lineStyle}>
              <span className="block">Vision That</span>
            </span>
            <span className="ie-h1-line block overflow-hidden" style={lineStyle}>
              <span className="block">Protects</span>
            </span>
            <span className="ie-h1-line block overflow-hidden" style={lineStyle}>
              <span className="block">Everything</span>
            </span>
          </h1>

          <p
            className="ie-hero-fade mb-12 max-w-[32rem] text-[18px] leading-[1.75]"
            style={{ color: C.ink2 }}
          >
            From fire detection to violence prevention, i-Edge transforms ordinary CCTV into an intelligent
            guardian for homes, vehicles, and public spaces.
          </p>

          <div className="ie-hero-fade flex flex-wrap items-center gap-4">
            
            {/* UPDATED: Interactive Hover Button in Hero */}
            <InteractiveHoverButton 
              text="Explore AI Modules" 
              onClick={onExplore} 
              variant="primary"
            />
            
            {/* UPDATED: Interactive Hover Button (Ghost) in Hero */}
            <InteractiveHoverButton 
              text="Explore the use cases" 
              onClick={() => navigate("/explore-use-cases")}  
              variant="primary"
            />
          </div>

          <p
            className="ie-hero-fade mt-10 flex items-center gap-2.5 text-[14px] font-medium"
            style={{ color: C.ink3 }}
          >
            <Camera size={16} />
            Works with the CCTV cameras you already have
          </p>
        </div>

        <HeroScene />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee                                                             */
/* ------------------------------------------------------------------ */

function Marquee() {
  const row = (hidden: boolean) => (
    <ul className="ie-marquee-row" aria-hidden={hidden || undefined}>
      {MARQUEE.map((t) => (
        <li key={t}>
          <span
            style={{
              fontFamily: F.display,
              fontWeight: 600,
              fontSize: "clamp(22px, 2.4vw, 30px)",
              letterSpacing: "-0.02em",
              color: C.ink,
            }}
          >
            {t}
          </span>
          <i className="ie-plus ie-plus-inline" />
        </li>
      ))}
    </ul>
  );
  return (
    <div
      className="py-7"
      style={{ borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, background: C.card }}
    >
      <div className="ie-marquee">
        <div className="ie-marquee-track">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Features: text-only 3D cards (use case + key features)              */
/* ------------------------------------------------------------------ */

interface FeatureInfo {
  /** the module it belongs to. Fire, crowd and violence are always part of Advanced Home Security. */
  tag: string;
  serviceId: string;
  title: string;
  useCase: string;
  features: string[];
}

const HOME_FEATURES: FeatureInfo[] = [
  {
    tag: "Advanced Home Security",
    serviceId: "home-surveillance",
    title: "Fire Detection",
    useCase:
      "Watch staff housing, coops, storage rooms and workshops around the clock, so a small fire is caught before it becomes a big loss.",
    features: [
      "Detects smoke and visible flames on live camera feeds",
      "Sends an instant alert the moment a fire risk is seen",
      "Runs on the CCTV cameras you already have",
    ],
  },
  {
    tag: "Advanced Home Security",
    serviceId: "home-surveillance",
    title: "Crowd Monitoring",
    useCase: "Keep gates, entrances and shared spaces safe by knowing when an unusual gathering is forming.",
    features: [
      "Flags unusual crowd gatherings as they form",
      "Alerts you before a crowd becomes a risk",
      "Works together with fire and violence detection on the same camera",
    ],
  },
  {
    tag: "Advanced Home Security",
    serviceId: "home-surveillance",
    title: "Violence Detection",
    useCase: "Protect family, staff and visitors by catching aggressive behaviour the moment it starts.",
    features: [
      "Detects aggressive behaviour on live feeds",
      "Alerts you instantly",
      "Tells pets, family members and strangers apart",
    ],
  },
];

const VEHICLE_FEATURE: FeatureInfo = {
  tag: "Vehicle Intelligence",
  serviceId: "vehicle-surveillance",
  title: "Vehicle Intelligence",
  useCase:
    "Control who comes and goes at parking lots, gates and roads, without a guard watching every entry.",
  features: [
    "Reads number plates automatically (ANPR)",
    "Tracks and logs every entry and exit time",
    "Detects unauthorized vehicles and parking violations",
    "Alerts security to suspicious activity",
    "Keeps a complete vehicle log",
  ],
};

const P3: CSSProperties = { transformStyle: "preserve-3d" };

/** 3D card: tilts with the mouse, a spotlight follows the cursor, and the text layers sit at
 *  different depths so they shift against each other as the card turns. */
function FeatureCard({
  children,
  onClick,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  onClick: () => void;
  dark?: boolean;
  className?: string;
}) {
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <Tilt max={6} fill className={`h-full ${className}`}>
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        onPointerMove={onMove}
        className={`ie-feature ${dark ? "ie-feature-dark" : ""} relative h-full w-full cursor-pointer rounded-3xl p-7 text-left sm:p-8`}
        style={{
          ...P3,
          ...(dark
            ? { background: C.graphite, border: "1px solid rgba(255,255,255,.1)", color: "#fff" }
            : { background: C.card, border: `1px solid ${C.line}`, color: C.ink }),
        }}
      >
        <span className="ie-spot" aria-hidden />
        <div className="relative h-full" style={P3}>
          {children}
        </div>
      </div>
    </Tilt>
  );
}

function FeatureBody({ f, dark = false, wide = false }: { f: FeatureInfo; dark?: boolean; wide?: boolean }) {
  const ink = dark ? "#fff" : C.ink;
  const body = dark ? "#AEB5BC" : C.ink2;
  const muted = dark ? "#8A9199" : C.ink3;
  const rule = dark ? "rgba(255,255,255,.12)" : C.line;

  const intro = (
    <div style={P3}>
      <div style={{ transform: "translateZ(16px)" }}>
        <span
          className="inline-block rounded-full px-3 py-1 text-[12px] font-bold"
          style={{
            background: dark ? "rgba(255,255,255,.08)" : C.paper2,
            border: `1px solid ${rule}`,
            color: dark ? "#D6DADE" : C.ink2,
          }}
        >
          {f.tag}
        </span>
      </div>
      <h3
        className="mt-6"
        style={{
          transform: "translateZ(36px)",
          fontFamily: F.display,
          fontWeight: 800,
          fontSize: wide ? 38 : 28,
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
          color: ink,
        }}
      >
        {f.title}
      </h3>
      <p className="mt-4 text-[15.5px] leading-[1.7]" style={{ transform: "translateZ(20px)", color: body }}>
        {f.useCase}
      </p>
    </div>
  );

  const list = (
    <div style={{ ...P3, transform: "translateZ(14px)" }}>
      <div className="text-[12px] font-bold" style={{ color: muted }}>
        Key features
      </div>
      <ul className="m-0 mt-3 list-none p-0">
        {f.features.map((t) => (
          <li
            key={t}
            className="py-3 text-[14.5px] leading-snug"
            style={{ borderTop: `1px solid ${rule}`, color: ink }}
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );

  const cta = (
    <div className="flex items-center gap-2.5 text-[14px] font-bold" style={{ color: ink, transform: "translateZ(24px)" }}>
      Explore {f.tag}
      <span
        className="ie-go flex h-8 w-8 items-center justify-center rounded-full"
        style={{ border: `1px solid ${dark ? "rgba(255,255,255,.25)" : C.line}`, color: ink }}
      >
        <ArrowRight size={14} />
      </span>
    </div>
  );

  if (wide) {
    return (
      <div className="grid h-full gap-10 lg:grid-cols-2 lg:gap-16" style={P3}>
        <div className="flex h-full flex-col justify-between gap-10" style={P3}>
          {intro}
          {cta}
        </div>
        {list}
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col gap-8" style={P3}>
      {intro}
      {list}
      <div className="mt-auto" style={P3}>
        {cta}
      </div>
    </div>
  );
}

function Features({ onOpen }: { onOpen: (s: ServiceItem) => void }) {
  const open = (id: string) => {
    const s = SERVICES.find((x) => x.id === id);
    if (s) onOpen(s);
  };
  return (
    <section id="features" className="ie-sec relative py-24 lg:py-36">
      <div className={WRAP}>
        <header className="max-w-[46rem]">
          <p className="mb-4 text-[14px] font-semibold" style={{ color: C.ink3 }}>
            Features
          </p>
          <h2 style={h2Style}>What each protection does for you.</h2>
        </header>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {HOME_FEATURES.map((f) => (
            <FeatureCard key={f.title} onClick={() => open(f.serviceId)}>
              <FeatureBody f={f} />
            </FeatureCard>
          ))}
          <FeatureCard dark className="lg:col-span-3" onClick={() => open(VEHICLE_FEATURE.serviceId)}>
            <FeatureBody f={VEHICLE_FEATURE} dark wide />
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Platform: what it is + how it works                                 */
/* ------------------------------------------------------------------ */

const CY = 52;
const FLOW_IN = [
  { y: 26, Icon: Camera, label: "Home Cam" },
  { y: CY, Icon: Car, label: "Parking Cam" },
  { y: 78, Icon: Users, label: "Public Cam" },
];
const FLOW_OUT = [
  { y: 26, Icon: Bell, label: "Instant alerts" },
  { y: CY, Icon: LayoutDashboard, label: "Live dashboards" },
  { y: 78, Icon: FileText, label: "Reports and logs" },
];

function FlowNode({
  x,
  y,
  Icon,
  label,
  tone,
}: {
  x: number;
  y: number;
  Icon: ElementType;
  label: string;
  tone: "in" | "out";
}) {
  return (
    <div
      className="absolute flex w-[92px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-center"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <span
        className="flex h-12 w-12 items-center justify-center rounded-2xl"
        style={
          tone === "in"
            ? { background: C.graphite2, border: "1px solid rgba(255,255,255,.14)", color: "#C9CED3" }
            : { background: C.paper, color: C.ink }
        }
      >
        <Icon size={20} strokeWidth={1.8} />
      </span>
      <span
        className="text-[12px] font-semibold leading-tight"
        style={{ color: tone === "in" ? "#AEB5BC" : "#E7E9E1" }}
      >
        {label}
      </span>
    </div>
  );
}

function FlowDiagram() {
  const paths = [
    ...FLOW_IN.map((n) => `M15 ${n.y} C 33 ${n.y}, 32 ${CY}, 50 ${CY}`),
    ...FLOW_OUT.map((n) => `M50 ${CY} C 68 ${CY}, 67 ${n.y}, 85 ${n.y}`),
  ];
  const cap: CSSProperties = { color: "#8A9199", fontSize: 12, fontWeight: 600, top: "5%" };
  return (
    <div
      className="relative w-full overflow-hidden rounded-[32px]"
      style={{
        height: 430,
        background: C.graphite,
        border: "1px solid rgba(255,255,255,.08)",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
        backgroundSize: "34px 34px",
        boxShadow: "0 50px 80px -50px rgba(20,23,26,.6)",
      }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {paths.map((d) => (
          <g key={d}>
            <path d={d} stroke="rgba(255,255,255,.14)" strokeWidth="1.2" fill="none" vectorEffect="non-scaling-stroke" />
            <path
              className="ie-flow"
              d={d}
              stroke={C.signalHi}
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="4 12"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}
      </svg>

      <span className="absolute -translate-x-1/2" style={{ ...cap, left: "15%" }}>
        Your cameras
      </span>
      <span className="absolute -translate-x-1/2" style={{ ...cap, left: "50%" }}>
        i-Edge AI
      </span>
      <span className="absolute -translate-x-1/2" style={{ ...cap, left: "85%" }}>
        What you get
      </span>

      {FLOW_IN.map((n) => (
        <FlowNode key={n.label} x={15} y={n.y} Icon={n.Icon} label={n.label} tone="in" />
      ))}
      {FLOW_OUT.map((n) => (
        <FlowNode key={n.label} x={85} y={n.y} Icon={n.Icon} label={n.label} tone="out" />
      ))}

      <div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ top: `${CY}%`, width: 96, height: 96 }}
      >
        <span
          className="ie-ring absolute -inset-3 rounded-full"
          style={{ border: "1px dashed rgba(141,176,255,.55)" }}
        />
        <span
          className="absolute inset-0 flex items-center justify-center rounded-full"
          style={{
            background: C.graphite2,
            border: "1px solid rgba(141,176,255,.6)",
            boxShadow: "0 0 0 8px rgba(59,107,255,.14), 0 0 56px rgba(59,107,255,.5)",
          }}
        >
          <span
            style={{ fontFamily: F.display, fontWeight: 800, fontSize: 28, color: "#fff", letterSpacing: "-0.03em" }}
          >
            iE
          </span>
        </span>
      </div>
    </div>
  );
}

function Platform() {
  return (
    <section id="platform" className="ie-sec relative py-24 lg:py-36">
      <div className={WRAP}>
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-x-24">
          <div className="lg:col-span-5">
            <h2 style={h2Style}>Your cameras already see everything. i-Edge makes sense of it.</h2>
            <p className="mt-8 max-w-[32rem] text-[17px] leading-[1.75]" style={{ color: C.ink2 }}>
              Most CCTV footage only gets watched after something goes wrong. i-Edge watches every frame as
              it happens, recognises what matters, and tells the right person straight away.
            </p>
            <p className="mt-5 max-w-[32rem] text-[17px] leading-[1.75]" style={{ color: C.ink2 }}>
              <strong style={{ color: C.ink }}>One intelligent platform.</strong> Advanced Home Security, with fire,
              crowd and violence detection built in, and Vehicle Intelligence, seamlessly connected through
              one AI-powered ecosystem.
            </p>
          </div>
          <div className="lg:col-span-7">
            <FlowDiagram />
          </div>
        </div>

        <ol className="m-0 mt-28 grid list-none gap-x-14 gap-y-14 p-0 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative pt-9" style={{ borderTop: `1px solid ${C.line}` }}>
              <span
                className="absolute -top-[15px] left-0 flex h-[30px] w-[30px] items-center justify-center rounded-full text-[13px] font-bold"
                style={{ background: C.ink, color: C.paper }}
              >
                {i + 1}
              </span>
              <h3
                style={{
                  fontFamily: F.display,
                  fontWeight: 800,
                  fontSize: 24,
                  letterSpacing: "-0.02em",
                  color: C.ink,
                }}
              >
                {s.title}
              </h3>
              <p className="mt-3 max-w-[22rem] text-[15.5px] leading-[1.7]" style={{ color: C.ink2 }}>
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Modules: sticky scroll explorer                                     */
/* ------------------------------------------------------------------ */

function IconCube({ Icon }: { Icon: ElementType }) {
  return (
    <span className="ie-cube" aria-hidden>
      <span className="ie-cube-back" />
      <span className="ie-cube-mid" />
      <span className="ie-cube-face">
        <Icon size={26} strokeWidth={1.7} />
      </span>
    </span>
  );
}

/** Desktop preview: the pictures crossfade as you scroll. No plate or shadow behind them. */
function ModulePanel({ active }: { active: number }) {
  return (
    <Tilt baseX={2} baseY={-6} max={7} float={5}>
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: 34,
          height: "min(560px, calc(100vh - 13rem))",
          background: C.graphite,
        }}
      >
        {SERVICES.map((sv, i) =>
          sv.image ? (
            <img
              key={sv.id}
              src={sv.image}
              alt={i === active ? sv.name : ""}
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                opacity: i === active ? 1 : 0,
                transform: i === active ? "scale(1)" : "scale(1.06)",
                transition: "opacity .7s ease, transform 1.2s ease",
              }}
            />
          ) : null
        )}
      </div>
    </Tilt>
  );
}

function MobileVisual({ s }: { s: ServiceItem }) {
  if (!s.image) return null;
  return (
    <div className="overflow-hidden rounded-3xl" style={{ aspectRatio: "4 / 3", background: C.graphite }}>
      <img src={s.image} alt={s.name} className="h-full w-full object-cover" />
    </div>
  );
}

function ModuleBlock({
  s,
  index,
  active,
  onOpen,
  register,
}: {
  s: ServiceItem;
  index: number;
  active: boolean;
  onOpen: (s: ServiceItem) => void;
  register: (el: HTMLElement | null) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <article
      ref={register}
      data-idx={index}
      data-active={active}
      className="ie-block flex flex-col justify-center py-12 lg:min-h-[78vh]"
    >
      <div className="mb-8 lg:hidden">
        <MobileVisual s={s} />
      </div>

      <div className="mb-9">
        <IconCube Icon={s.Icon} />
      </div>

      <h3
        style={{
          fontFamily: F.display,
          fontWeight: 800,
          fontSize: "clamp(30px, 3.4vw, 46px)",
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          color: C.ink,
        }}
      >
        {s.name}
      </h3>
      <p className="mt-5 max-w-[32rem] text-[17px] leading-[1.75]" style={{ color: C.ink2 }}>
        {s.overview}
      </p>

      <p
        className="mt-8 max-w-[32rem] border-l-2 pl-4 text-[15px] font-semibold leading-snug"
        style={{ borderColor: C.ink, color: C.ink }}
      >
        {s.benefit}
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        
        {/* UPDATED: Interactive Hover Button in Modules */}
        <InteractiveHoverButton 
          text={s.route ? "Open Module" : "Opening soon"} 
          onClick={() => onOpen(s)} 
          disabled={!s.route}
          variant="primary"
        />
        
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="inline-flex items-center gap-2 text-[14.5px] font-bold"
          style={{ color: C.ink }}
        >
          {open ? "Hide details" : "More details"}
          <ChevronDown
            size={16}
            style={{ transition: "transform .3s ease", transform: open ? "rotate(180deg)" : "none" }}
          />
        </button>
      </div>

      <div
        className="grid"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows .45s ease" }}
      >
        <div className="overflow-hidden">
          <p className="pt-7 max-w-[32rem] text-[15px] leading-[1.75]" style={{ color: C.ink2 }}>
            {s.fullDescription}
          </p>
        </div>
      </div>
    </article>
  );
}

function Modules({ onOpen }: { onOpen: (s: ServiceItem) => void }) {
  const [active, setActive] = useState(0);
  const blocks = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx ?? 0));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    blocks.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="modules" className="ie-sec relative py-24 lg:py-36" style={{ borderTop: `1px solid ${C.line}` }}>
      <div className={WRAP}>
        <header className="max-w-[44rem]">
          <p className="mb-4 text-[14px] font-semibold" style={{ color: C.ink3 }}>
            Available Services
          </p>
          <h2 style={h2Style}>Many AI Modules. One Platform.</h2>
          <p className="mt-6 max-w-[36rem] text-[17px] leading-[1.75]" style={{ color: C.ink2 }}>
            Each module runs on its own and plugs into the same cameras, alerts and dashboards. Scroll to see
            what every one of them does for your business.
          </p>
        </header>

        <div className="mt-12 grid gap-x-24 lg:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {SERVICES.map((s, i) => (
              <ModuleBlock
                key={s.id}
                s={s}
                index={i}
                active={i === active}
                onOpen={onOpen}
                register={(el) => {
                  blocks.current[i] = el;
                }}
              />
            ))}
          </div>

          <div className="hidden lg:col-span-7 lg:block">
            <div className="sticky top-28 flex items-center" style={{ height: "calc(100vh - 8rem)" }}>
              <div className="w-full pr-6">
                <ModulePanel active={active} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Results                                                             */
/* ------------------------------------------------------------------ */

function Results() {
  const stats = [
    {
      to: 98,
      suffix: "%",
      title: "Detection Accuracy",
      body: "High-precision computer vision for fire, violence, and vehicles.",
    },
    {
      to: 24,
      suffix: "/7",
      title: "Active Monitoring",
      body: "Instant alerts for fire, crowd, intrusion, and suspicious activity.",
    },
    {
      to: SERVICES.length,
      suffix: "",
      title: "AI Modules",
      body: "Live on one platform, each one ready to open from this page.",
    },
  ];
  return (
    <section id="results" className="ie-sec px-3 pb-24 sm:px-6 lg:pb-36">
      <div
        className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[36px] px-6 py-16 sm:px-12 lg:px-20 lg:py-24"
        style={{
          background: C.graphite,
          color: "#fff",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <svg
          aria-hidden
          className="ie-aperture pointer-events-none absolute -right-44 -top-44 h-[600px] w-[600px]"
          viewBox="0 0 200 200"
          fill="none"
          stroke="rgba(255,255,255,.1)"
          strokeWidth="0.6"
        >
          {[92, 74, 56, 38].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} />
          ))}
          <circle cx="100" cy="100" r="98" strokeDasharray="1 5" />
          {Array.from({ length: 24 }).map((_, i) => (
            <line key={i} x1="100" y1="4" x2="100" y2="14" transform={`rotate(${i * 15} 100 100)`} />
          ))}
        </svg>

        <h2
          className="relative max-w-[16ch]"
          style={{ ...h2Style, color: "#fff", fontSize: "clamp(34px, 4.4vw, 60px)" }}
        >
          Accurate enough to trust. Awake around the clock.
        </h2>

        <div className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-0">
          {stats.map((s, i) => (
            <div key={s.title}>
              <div
                className={`${i > 0 ? "md:border-l md:pl-12" : ""} ${i < stats.length - 1 ? "md:pr-12" : ""}`}
                style={{ borderColor: "rgba(255,255,255,.14)" }}
              >
                <div
                  style={{
                    fontFamily: F.display,
                    fontWeight: 800,
                    fontSize: "clamp(68px, 8vw, 120px)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.04em",
                  }}
                >
                  <CountUp to={s.to} suffix={s.suffix} />
                </div>
                <div className="mt-5 text-[17px] font-bold">{s.title}</div>
                <p className="mt-2 max-w-[19rem] text-[15px] leading-[1.7]" style={{ color: "#AEB5BC" }}>
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact CTA + footer                                                */
/* ------------------------------------------------------------------ */

function Contact({ onBrowse }: { onBrowse: () => void }) {
  return (
    <section id="contact" className="ie-sec pb-24 lg:pb-36">
      <div className={WRAP}>
        <div className="relative px-6 py-16 sm:px-14 lg:py-24">
          <Brackets size={34} offset={0} />
          <div className="grid items-end gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-x-24">
            <div>
              <h2 style={{ ...h2Style, fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 0.98 }}>
                Put your cameras to work.
              </h2>
              <p className="mt-7 max-w-[32rem] text-[17px] leading-[1.75]" style={{ color: C.ink2 }}>
                Tell us where cameras are already installed and we will show you what i-Edge can see, count and
                flag for your business.
              </p>
            </div>
            <div>
              <div className="flex flex-wrap gap-3">
                
                {/* UPDATED: Interactive Hover Button in Contact */}
                <InteractiveHoverButton 
                  text="Talk to our team" 
                  onClick={() => window.open(MAILTO, "_blank")} 
                  variant="primary"
                />
                
                {/* UPDATED: Interactive Hover Button (Ghost) in Contact */}
                <InteractiveHoverButton 
                  text="Browse the modules" 
                  onClick={onBrowse} 
                  variant="ghost"
                />
              </div>
              <p className="mt-6 text-[14px]" style={{ color: C.ink3 }}>
                Prefer email?{" "}
                <a href={MAILTO} className="font-semibold underline underline-offset-4" style={{ color: C.ink }}>
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-4 text-[13px] font-bold" style={{ color: C.ink3 }}>
        {title}
      </div>
      <ul className="m-0 flex list-none flex-col gap-3 p-0 text-[15px] font-medium" style={{ color: C.ink }}>
        {children}
      </ul>
    </div>
  );
}

function Footer({
  onGo,
  onOpen,
  onLogout,
}: {
  onGo: (id: string) => void;
  onOpen: (s: ServiceItem) => void;
  onLogout: () => void;
}) {
  const link = "text-left transition-opacity hover:opacity-60";
  return (
    <footer style={{ borderTop: `1px solid ${C.line}`, background: C.card }}>
      <div className={`${WRAP} grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]`}>
        <div>
          <Logo />
          <p className="mt-5 max-w-[18rem] text-[15px] leading-[1.7]" style={{ color: C.ink2 }}>
            AI vision for the cameras you already own.
          </p>
        </div>

        <FooterCol title="Platform">
          <li>
            <button className={link} onClick={() => onGo("features")}>
              Features
            </button>
          </li>
          <li>
            <button className={link} onClick={() => onGo("platform")}>
              How it works
            </button>
          </li>
          <li>
            <button className={link} onClick={() => onGo("modules")}>
              Modules
            </button>
          </li>
          <li>
            <button className={link} onClick={() => onGo("results")}>
              Results
            </button>
          </li>
        </FooterCol>

        <FooterCol title="Modules">
          {SERVICES.map((s) => (
            <li key={s.id}>
              <button className={link} onClick={() => (s.route ? onOpen(s) : onGo("modules"))}>
                {s.name}
              </button>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Account">
          <li>
            <a className={link} href={MAILTO}>
              Contact us
            </a>
          </li>
          <li>
            <button className={`${link} flex items-center gap-2`} onClick={onLogout}>
              <LogOut size={15} />
              Logout
            </button>
          </li>
        </FooterCol>
      </div>

      <div style={{ borderTop: `1px solid ${C.line}` }}>
        <div className={`${WRAP} py-6 text-[13px]`} style={{ color: C.ink3 }}>
          © {new Date().getFullYear()} i-Edge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Landingpage() {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeSec, setActiveSec] = useState("top");

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReduced() ? "auto" : "smooth",
      block: "start",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    navigate("/login");
  };

  const handleOpen = (s: ServiceItem) => {
    if (s.route) navigate(s.route);
  };

  // One orchestrated entrance
  useLayoutEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".ie-nav", { y: -30, opacity: 0, duration: 0.7 })
        .from(".ie-h1-line > span", { yPercent: 105, duration: 0.9, stagger: 0.12 }, "-=0.3")
        .from(".ie-hero-fade", { y: 16, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.5")
        .from(".ie-hero-scene", { y: 70, opacity: 0, scale: 0.94, duration: 1.1, ease: "power4.out" }, "-=1");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Highlight the current section in the nav
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSec(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["top", ...NAV.map((n) => n.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="ie-root relative min-h-screen w-full"
      style={{
        background: C.paper,
        color: C.ink,
        fontFamily: F.body,
        // "clip" instead of "hidden": hidden would break position: sticky in the modules section
        overflowX: "clip",
      }}
    >
      <style>{STYLES}</style>

      <Nav active={activeSec} onGo={go} onLogout={handleLogout} />

      <main>
        <Hero onExplore={() => go("modules")} />
        <Marquee />
        <Features onOpen={handleOpen} />
        <Platform />
        <Modules onOpen={handleOpen} />
        <Results />
        <Contact onBrowse={() => go("modules")} />
      </main>

      <Footer onGo={go} onOpen={handleOpen} onLogout={handleLogout} />
    </div>
  );
}