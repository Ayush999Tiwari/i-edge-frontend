import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate } from "animejs";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Video, ScanLine, Fingerprint, Archive, CheckCircle2, AlertTriangle, XCircle,
  Power, PowerOff, Eye, Cpu, Database, Zap, Layers, ShieldCheck, Activity, PlayCircle, Clock,
  ListVideo, X, Loader2, Hash, TrendingUp, Brain, Target, FileText, ExternalLink
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- CONSTANTS & THEME ---
const C = { bg: "#F8FAFC", panel: "#FFFFFF", ink: "#0F172A", inkSoft: "#475569", inkFaint: "#94A3B8", line: "#E2E8F0", lineStrong: "#334155", accent: "#2563EB", danger: "#DC2626" };
const TRIO = ["#2563EB", "#0EA5E9", "#3B82F6"];
const hexToRgb = (hex: string) => { const n = parseInt(hex.slice(1), 16); return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`; };
const API_BASE = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "http://127.0.0.1:3000" : "";
const getAuthHeaders = (): Record<string, string> => { const token = localStorage.getItem("iedge_token"); return token ? { Authorization: `Bearer ${token}` } : {}; };
const PROCESSING_MESSAGES = [
  "Initializing multi-model inference pipeline...",
  "Synchronizing YOLOv8, CRNN-OCR, and Regex validators...",
  "Allocating GPU resources for parallel processing..."
];
const WORKS_WITH = ["Gate camera", "Dash-cam", "Handheld clip", "DVR export"];
const WHAT_IT_DOES = [
  { icon: ScanLine, title: "Reads plates in real time", desc: "Every frame is scanned as the feed comes in, character by character." },
  { icon: Video, title: "Works on any footage", desc: "Gate cameras, dash-cams, DVR exports, or a phone clip." },
  { icon: Archive, title: "Archives the evidence", desc: "Each detection is logged with a cropped plate image and timestamp." },
];
const HOW_IT_WORKS = [
  { n: "01", title: "Capture", desc: "Footage is uploaded and split into individual frames." },
  { n: "02", title: "Detect", desc: "Vision model locates the vehicle and plate region." },
  { n: "03", title: "Extract", desc: "OCR reads the characters off the sharpest crop." },
  { n: "04", title: "Match & log", desc: "Reading is checked against records and archived." },
];
const SPECS = [
  { label: "Throughput", value: "~15 fps" },
  { label: "Formats", value: "Indian Plates" },
  { label: "Lighting", value: "IR-assisted" },
  { label: "Storage", value: "Auto-archived" },
];
const STATS = [
  { value: 98.5, decimals: 1, suffix: "%", label: "Accuracy" },
  { value: 40, decimals: 0, suffix: "+", label: "Formats" },
  { value: 2, decimals: 0, suffix: "s", label: "Avg Time" },
];
const PIPELINE_JOURNEY = [
  { step: "01", title: "Ingest", desc: "Raw video enters buffer.", detail: "Buffering", icon: Video },
  { step: "02", title: "Extract", desc: "Keyframes isolated.", detail: "Motion Vectors", icon: Layers },
  { step: "03", title: "Detect", desc: "YOLO finds vehicles.", detail: "Localization", icon: Eye },
  { step: "04", title: "Crop", desc: "Focus on plate area.", detail: "Preprocessing", icon: ScanLine },
  { step: "05", title: "OCR", desc: "Neural net reads chars.", detail: "Recognition", icon: Cpu },
  { step: "06", title: "Validate", desc: "Regex format check.", detail: "Validation", icon: ShieldCheck },
  { step: "07", title: "Tag", desc: "Add metadata/GPS.", detail: "Enrichment", icon: Activity },
  { step: "08", title: "Archive", desc: "Write to storage.", detail: "Persistence", icon: Database },
  { step: "09", title: "Push", desc: "Send to downstream.", detail: "Webhook", icon: Zap },
];

// --- HELPER COMPONENTS ---
function Counter({ value, suffix, decimals }: { value: number; suffix: string; decimals: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obj = { val: 0 };
    const trigger = ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => animate(obj, { val: value, duration: 1400, ease: "outExpo", onUpdate: () => (el.textContent = obj.val.toFixed(decimals) + suffix) }) });
    return () => trigger.kill();
  }, [value, suffix, decimals]);
  return <span ref={ref} className="anpr-mono">{"0" + suffix}</span>;
}

function FloatIcon({ children, accent, delay = 0 }: { children: React.ReactNode; accent: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { 
    if (!ref.current) return; 
    const t = gsap.to(ref.current, { y: -6, duration: 1.8, delay, repeat: -1, yoyo: true, ease: "sine.inOut" }); 
    return () => { t.kill(); }; 
  }, [delay]);
  return <div ref={ref} className="w-11 h-11 rounded-full flex items-center justify-center mb-4" style={{ border: `1px solid ${accent}55`, background: `${accent}14`, color: accent }}>{children}</div>;
}

function TiltCard({ children, accent, delay = 0 }: { children: React.ReactNode; accent: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, { rotateY: x * 14, rotateX: -y * 14, scale: 1.02, duration: 0.4, ease: "power2.out" });
    el.style.setProperty("--mx", `${e.clientX - r.left}px`); el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const onLeave = () => gsap.to(ref.current, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.6, ease: "power3.out" });
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="reveal tilt-card relative overflow-hidden rounded-xl p-6"
      style={{ background: C.panel, border: `1px solid ${C.line}`, borderTop: `4px solid ${accent}`, ["--accent-rgb" as any]: hexToRgb(accent), transformStyle: "preserve-3d", transitionDelay: `${delay}ms` }}>
      {children}
      <span className="tilt-glare" aria-hidden />
    </div>
  );
}

// --- 3D CARD (Aceternity-style), PARTICLE TEXT, LIQUID BACKGROUND ---
function Card3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, { rotateY: x * 16, rotateX: -y * 16, duration: 0.4, ease: "power2.out" });
    el.style.setProperty("--mx", `${e.clientX - r.left}px`); el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const onLeave = () => gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`card-3d relative overflow-hidden rounded-2xl ${className}`}
      style={{ transformStyle: "preserve-3d" }}>
      <div style={{ transform: "translateZ(0)" }}>{children}</div>
      <span className="tilt-glare" aria-hidden />
    </div>
  );
}

function ParticleWord({ text, className }: { text: string; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const width = canvas.clientWidth || 224;
    const height = canvas.clientHeight || 80;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr; canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const off = document.createElement("canvas");
    off.width = width; off.height = height;
    const octx = off.getContext("2d");
    if (!octx) return;
    octx.fillStyle = "#fff";
    octx.font = `700 ${Math.floor(height * 0.62)}px 'IBM Plex Mono', monospace`;
    octx.textAlign = "center"; octx.textBaseline = "middle";
    octx.fillText(text, width / 2, height / 2 + height * 0.02);
    const data = octx.getImageData(0, 0, width, height).data;

    const step = 3;
    const targets: { x: number; y: number }[] = [];
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        if (data[(y * width + x) * 4 + 3] > 120) targets.push({ x, y });
      }
    }
    const particles = targets.map((t) => ({ x: Math.random() * width, y: Math.random() * height, vx: 0, vy: 0, tx: t.x, ty: t.y }));

    let mouse = { x: -9999, y: -9999 };
    const onMove = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const onLeave = () => { mouse = { x: -9999, y: -9999 }; };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = C.accent;
      for (const pt of particles) {
        const dx = pt.tx - pt.x, dy = pt.ty - pt.y;
        pt.vx += dx * 0.02; pt.vy += dy * 0.02;
        const mdx = pt.x - mouse.x, mdy = pt.y - mouse.y;
        const d2 = mdx * mdx + mdy * mdy;
        if (d2 < 2000) { const d = Math.sqrt(d2) || 1; const f = (1 - d / 45) * 3; pt.vx += (mdx / d) * f; pt.vy += (mdy / d) * f; }
        pt.vx *= 0.82; pt.vy *= 0.82; pt.x += pt.vx; pt.y += pt.vy;
        ctx.fillRect(pt.x, pt.y, 1.6, 1.6);
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    if (reduced) { ctx.fillStyle = C.accent; for (const t of targets) ctx.fillRect(t.x, t.y, 1.6, 1.6); }
    else raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); canvas.removeEventListener("pointermove", onMove); canvas.removeEventListener("pointerleave", onLeave); };
  }, [text]);
  return <canvas ref={canvasRef} className={className} aria-hidden style={{ width: "100%", height: "100%", display: "block" }} />;
}

function LiquidBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr; canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const blobs = [
      { cx: 0.2, cy: 0.35, r: 0.34, hue: TRIO[0], speed: 0.00018, phase: 0 },
      { cx: 0.78, cy: 0.22, r: 0.3, hue: TRIO[1], speed: 0.00024, phase: 2.1 },
      { cx: 0.55, cy: 0.75, r: 0.36, hue: TRIO[2], speed: 0.00015, phase: 4.2 },
    ];
    let raf = 0;
    const draw = (t: number) => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      blobs.forEach((b) => {
        const x = (b.cx + Math.sin(t * b.speed + b.phase) * 0.06) * w;
        const y = (b.cy + Math.cos(t * b.speed * 1.3 + b.phase) * 0.06) * h;
        const r = b.r * Math.max(w, h);
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `${b.hue}33`); g.addColorStop(1, `${b.hue}00`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over";
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className={className} aria-hidden style={{ width: "100%", height: "100%", display: "block", filter: "blur(46px)" }} />;
}

function ServiceTerminal({ running }: { running: boolean }) {
  return (
    <div className="anpr-mono text-xs rounded-md px-4 py-3 flex items-center gap-2" style={{ background: C.lineStrong, color: "#D8D4C4" }}>
      <span style={{ color: running ? "#7FBE8F" : "#C97B6C" }}>●</span>
      anpr-service — {running ? "online, watching for uploads" : "offline, uploads paused"}
      <span className="term-cursor"></span>
    </div>
  );
}

function Corner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const base: React.CSSProperties = { position: "absolute", width: 18, height: 18, borderColor: C.lineStrong };
  const byPos: Record<string, React.CSSProperties> = { tl: { top: 10, left: 10, borderTop: "2px solid", borderLeft: "2px solid" }, tr: { top: 10, right: 10, borderTop: "2px solid", borderRight: "2px solid" }, bl: { bottom: 10, left: 10, borderBottom: "2px solid", borderLeft: "2px solid" }, br: { bottom: 10, right: 10, borderBottom: "2px solid", borderRight: "2px solid" } };
  return <div style={{ ...base, ...byPos[position] }} />;
}

function StepTracker({ step }: { step: 1 | 2 | 3 }) {
  const steps = ["Upload", "Detect", "Result"];
  return (
    <div className="flex items-center gap-3 px-8 py-5 border-b" style={{ borderColor: C.line }}>
      {steps.map((label, i) => {
        const n = i + 1; const active = n === step; const done = n < step;
        return (
          <React.Fragment key={label}>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center rounded-full text-[11px] font-medium" style={{ width: 20, height: 20, border: `1px solid ${active || done ? C.lineStrong : C.line}`, color: done ? C.panel : active ? C.ink : C.inkFaint, background: done ? C.lineStrong : "transparent" }}>{n}</span>
              <span className="text-xs font-medium" style={{ color: active ? C.ink : C.inkFaint }}>{label}</span>
            </div>
            {i < steps.length - 1 && <div className="flex-1 h-px" style={{ background: C.line }} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function InteractiveTimeline() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  return (
    <div className="relative w-full py-10">
      <div className="relative flex justify-between items-start">
        {PIPELINE_JOURNEY.map((step, i) => {
          const isHovered = hoveredStep === i;
          const showLineToNext = hoveredStep !== null && i <= hoveredStep && i < PIPELINE_JOURNEY.length - 1;
          return (
            <motion.div key={step.step} className="relative flex flex-col items-center group cursor-default" style={{ width: '11.11%' }} onMouseEnter={() => setHoveredStep(i)} onMouseLeave={() => setHoveredStep(null)}>
              {showLineToNext && <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.4, ease: "easeOut" }} className="absolute top-10 left-1/2 w-full border-t-2 border-dashed border-blue-300 origin-left z-0" />}
              <motion.div className="w-20 h-20 rounded-full bg-white border-2 flex items-center justify-center relative z-10 transition-colors duration-300 shadow-sm"
                animate={{ borderColor: isHovered ? C.accent : C.line, color: isHovered ? C.accent : C.inkFaint, scale: isHovered ? 1.15 : 1, y: isHovered ? -8 : 0, boxShadow: isHovered ? "0 0 20px rgba(37, 99, 235, 0.3)" : "none" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <step.icon size={28} />
                {isHovered && <motion.span className="absolute inset-0 rounded-full border-2 border-blue-400" initial={{ opacity: 1, scale: 1 }} animate={{ opacity: 0, scale: 1.4 }} transition={{ duration: 1.5, repeat: Infinity }} />}
              </motion.div>
              <motion.div className="mt-6 text-center" animate={{ y: isHovered ? -8 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <div className="text-[11px] font-mono text-blue-500 mb-1 font-semibold tracking-wider">STEP {step.step}</div>
                <div className="text-base font-bold text-slate-900 mb-1">{step.title}</div>
                <div className="text-xs text-slate-500 leading-snug max-w-[160px] mx-auto">{step.desc}</div>
                <motion.div initial={{ opacity: 0, height: 0 }} animate={isHovered ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="inline-block px-3 py-1.5 bg-blue-50 text-blue-700 text-[11px] font-mono font-medium rounded-lg border border-blue-100 mt-2">{step.detail}</div>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function VehicleSurveillanceUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingState, setProcessingState] = useState<"idle" | "uploading" | "processing" | "complete" | "failed">("idle");
  const [messageIndex, setMessageIndex] = useState(0);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [jobId, setJobId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string | null>(null);
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  
  // HISTORY STATES
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const [serviceRunning, setServiceRunning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  // Polling Logic
  useEffect(() => {
    if (processingState !== "processing" || !jobId) return;
    pollingRef.current = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE}/api/vehicle/status/${jobId}`, { headers: getAuthHeaders() });
        if (!res.ok) throw new Error(`Status check failed: ${res.status}`);
        const data = await res.json();
        if (data.status === "completed") {
          setProcessingState("complete");
          setUploadProgress(100);
          try {
            const videoRes = await fetch(`${API_BASE}/api/vehicle/video/${jobId}`, { headers: getAuthHeaders() });
            if (videoRes.ok) { const blob = await videoRes.blob(); setProcessedVideoUrl(URL.createObjectURL(blob)); }
          } catch (err) { console.error(err); }
          try {
            const analyticsRes = await fetch(`${API_BASE}/api/vehicle/analytics/${jobId}`, { headers: getAuthHeaders() });
            if (analyticsRes.ok) { const json = await analyticsRes.json(); setAnalyticsData(json.detections || []); }
          } catch (err) { console.error(err); }
          if (pollingRef.current) clearInterval(pollingRef.current);
        } else if (data.status === "failed") {
          setProcessingState("failed");
          setErrorMessage(data.detail || "Processing failed");
          if (pollingRef.current) clearInterval(pollingRef.current);
        } else { setUploadProgress((prev) => Math.min(prev + 5, 95)); }
      } catch (err) { console.error("[POLLING] Error:", err); }
    }, 2500);
    return () => { if (pollingRef.current) clearInterval(pollingRef.current); };
  }, [processingState, jobId]);

  useEffect(() => {
    if (processingState !== "uploading" && processingState !== "processing") { setMessageIndex(0); return; }
    const t = setInterval(() => setMessageIndex((p) => (p + 1) % PROCESSING_MESSAGES.length), 2500);
    return () => clearInterval(t);
  }, [processingState]);

  useEffect(() => {
    if (!file) { setMediaUrl(null); return; }
    const url = URL.createObjectURL(file); setMediaUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline()
        .from(".hero-tag", { y: -10, opacity: 0, duration: 0.6, ease: "power3.out" })
        .from(".hero-title", { y: 30, opacity: 0, duration: 0.9, ease: "power3.out" }, "-=0.3")
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .from(".hero-chip", { y: 10, opacity: 0, duration: 0.4, stagger: 0.08, ease: "power3.out" }, "-=0.3")
        .from(".hero-stat", { y: 16, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" }, "-=0.2");
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el, i) => {
        gsap.fromTo(el, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: (i % 4) * 0.08, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.fromTo(".how-line", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.inOut", transformOrigin: "left", scrollTrigger: { trigger: ".how-line", start: "top 80%" } });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); if (serviceRunning) setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); if (!serviceRunning) return; const f = e.dataTransfer.files[0]; if (f) setFile(f); };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => { if (!serviceRunning) return; if (e.target.files?.[0]) setFile(e.target.files[0]); };
  const triggerFileInput = () => { if (serviceRunning) fileInputRef.current?.click(); };

  const startProcessing = async () => {
    if (!file || !serviceRunning) return;
    setProcessingState("uploading"); setUploadProgress(10); setErrorMessage("");
    try {
      const formData = new FormData(); formData.append("file", file);
      const res = await fetch(`${API_BASE}/api/vehicle/detect`, { method: "POST", headers: getAuthHeaders(), body: formData });
      if (!res.ok) { const errData = await res.json().catch(() => ({})); throw new Error(errData.detail || `Upload failed with status ${res.status}`); }
      const data = await res.json(); setJobId(data.id); setUploadProgress(30); setProcessingState("processing");
    } catch (err: any) { setProcessingState("failed"); setErrorMessage(err.message || "Upload failed."); }
  };

  const resetUpload = () => {
    setFile(null); setProcessingState("idle"); setUploadProgress(0); setMessageIndex(0); setJobId(null);
    setProcessedVideoUrl(null); setAnalyticsData([]); setErrorMessage("");
    if (pollingRef.current) clearInterval(pollingRef.current);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // --- NEW: Helper to toggle service and reset UI ---
  const handleServiceToggle = (newState: boolean) => {
    resetUpload(); // Clears file, job, and state so you can start fresh
    setServiceRunning(newState);
  };

  // --- HISTORY LOGIC ---
  const openHistory = async () => {
    setShowHistory(true);
    setLoadingHistory(true);
    try {
      const res = await fetch(`${API_BASE}/api/vehicle/history`, { headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        setHistory(Array.isArray(data) ? data : []);
      }
    } catch (err) { console.error("Failed to fetch history:", err); } finally { setLoadingHistory(false); }
  };

  const totalLogs = history.length;
  const uniquePlates = new Set(history.filter(l => l.plate_number).map(l => l.plate_number)).size;
  const highConfidence = history.filter(l => l.confidence > 90).length;
  const avgConfidence = history.length > 0 ? (history.reduce((acc, curr) => acc + (curr.confidence || 0), 0) / history.length).toFixed(1) : "0.0";

  const step: 1 | 2 | 3 = processingState === "complete" ? 3 : processingState === "idle" ? 1 : 2;
  const power3Out: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <div ref={pageRef} className="min-h-screen relative" style={{ background: C.bg, color: C.ink, fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .anpr-serif { font-family: 'Fraunces', serif; } .anpr-mono { font-family: 'IBM Plex Mono', monospace; }
        .anpr-btn { border-radius: 4px; transition: transform .15s ease; } .anpr-btn:active { transform: scale(0.98); }
        .anpr-btn:focus-visible { outline: 2px solid ${C.lineStrong}; outline-offset: 2px; }
        .anpr-btn-strong { transition: transform .18s ease, box-shadow .18s ease, opacity .18s ease; }
        .anpr-btn-strong:hover:not(:disabled) { transform: translateY(-2px) scale(1.04); }
        .anpr-btn-strong:active:not(:disabled) { transform: scale(0.96) translateY(0); }
        .anpr-btn-strong:disabled { opacity: 0.55; }
        .anpr-btn-strong:focus-visible { outline: 2px solid ${C.lineStrong}; outline-offset: 3px; }
        @keyframes pulse-glow { 0%,100% { box-shadow: 0 10px 26px -8px var(--glow); } 50% { box-shadow: 0 14px 38px -4px var(--glow); } }
        .pulse-glow { animation: pulse-glow 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .pulse-glow { animation: none; } }
        .blueprint-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: .4;
          background-image: radial-gradient(circle, ${C.lineStrong}1c 1px, transparent 1px);
          background-size: 28px 28px; mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%); }
        .tilt-card { perspective: 900px; transition: box-shadow .35s ease, border-color .35s ease; box-shadow: 0 14px 30px -22px rgba(15,23,42,0.1); }
        .tilt-card:hover { box-shadow: 0 34px 60px -20px rgba(15,23,42,0.15); }
        .tilt-card::before { content: ''; position: absolute; inset: 0; opacity: 0; transition: opacity .3s ease; pointer-events: none;
          background: radial-gradient(280px circle at var(--mx,50%) var(--my,50%), rgba(var(--accent-rgb),0.12), transparent 60%); }
        .tilt-card:hover::before { opacity: 1; }
        .tilt-glare { position: absolute; inset: 0; border-radius: inherit; pointer-events: none; opacity: 0; transition: opacity .3s ease;
          background: radial-gradient(160px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,.4), transparent 70%); mix-blend-mode: overlay; }
        .tilt-card:hover .tilt-glare, .card-3d:hover .tilt-glare { opacity: 1; }
        .card-3d { perspective: 900px; transition: box-shadow .35s ease; box-shadow: 0 20px 50px -22px rgba(15,23,42,.28); }
        .card-3d:hover { box-shadow: 0 40px 70px -22px rgba(15,23,42,.36); }
        @media (prefers-reduced-motion: reduce) { .tilt-glare { display: none; } }
        .status-dot { width: 6px; height: 6px; border-radius: 999px; background: #4C7A5D; animation: dot-pulse 1.8s ease-in-out infinite; }
        @keyframes dot-pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
        .term-cursor { animation: term-blink 1s steps(1) infinite; }
        @keyframes term-blink { 50% { opacity: 0; } }
        @keyframes anpr-scan { 0%{top:2%;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{top:96%;opacity:0} }
        .anpr-scanline { position:absolute; left:4%; right:4%; height:2px; background: linear-gradient(90deg,transparent,${TRIO[0]},transparent); animation: anpr-scan 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .anpr-scanline{animation:none;top:50%;opacity:.6} .status-dot{animation:none} .term-cursor{animation:none} }
        .custom-scrollbar::-webkit-scrollbar { height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: ${C.bg}; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: ${C.line}; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: ${C.lineStrong}; }
      `}</style>

      <div className="blueprint-bg" />

      <div className="max-w-6xl mx-auto px-8 relative" style={{ zIndex: 1 }}>
        
        {/* TOP HEADER AREA */}
        <div className="py-8 flex items-center justify-between">
          <button onClick={() => navigate("/dashboard")} className="group flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: C.inkSoft }}>
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to dashboard
          </button>
        </div>

        {/* HERO */}
        <section className="relative overflow-hidden py-16 md:py-24 grid md:grid-cols-2 gap-16 items-center">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <LiquidBackground className="w-full h-full" />
          </div>
          <div className="hidden lg:block absolute -top-4 right-0 w-56 h-20 pointer-events-none opacity-90">
            <ParticleWord text="ANPR" />
          </div>
          <div className="order-2 md:order-1">
            <h1 className="hero-title anpr-serif text-5xl lg:text-[3.5rem] leading-[1.1] text-slate-900 mb-6">Vehicle Detection <br />&amp; ANPR Intelligence</h1>
            <p className="hero-sub text-lg leading-relaxed" style={{ color: C.inkSoft }}>Every vehicle that crosses a gate camera is detected, its plate is read character by character, and the crossing is logged automatically.</p>
            <div className="flex flex-wrap gap-2 mt-8">
              {WORKS_WITH.map((w) => (<span key={w} className="hero-chip text-xs px-3 py-1.5 rounded-full font-medium" style={{ border: `1px solid ${C.line}`, color: C.inkSoft }}>{w}</span>))}
            </div>
            <div className="flex gap-12 mt-12 pt-8 border-t" style={{ borderColor: C.line }}>
              {STATS.map((s) => (<div key={s.label} className="hero-stat"><div className="anpr-serif text-4xl text-blue-700"><Counter value={s.value} suffix={s.suffix} decimals={s.decimals} /></div><div className="text-xs mt-2 font-semibold uppercase tracking-wider" style={{ color: C.inkFaint }}>{s.label}</div></div>))}
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: power3Out }} className="w-full max-w-md lg:max-w-lg">
              <Card3D>
                <img src="/images.jpeg" alt="OpenCV ANPR Example" className="w-full h-auto object-contain" />
              </Card3D>
            </motion.div>
          </div>
        </section>

        {/* WHAT IT DOES */}
        <section className="py-16">
          <h2 className="reveal anpr-serif text-2xl mb-8 text-slate-900">What it does</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {WHAT_IT_DOES.map((f, i) => (<TiltCard key={f.title} accent={TRIO[i % TRIO.length]} delay={i * 80}><FloatIcon accent={TRIO[i % TRIO.length]} delay={i * 0.3}><f.icon size={18} /></FloatIcon><h3 className="text-sm font-semibold mb-2 text-slate-900">{f.title}</h3><p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>{f.desc}</p></TiltCard>))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-16">
          <h2 className="reveal anpr-serif text-2xl mb-2 text-slate-900">How it works</h2>
          <p className="reveal text-sm mb-10" style={{ color: C.inkFaint }}>Four steps, fully automatic, start to finish.</p>
          <div className="relative mb-8 h-px" style={{ background: C.line }}><div className="how-line absolute inset-0 h-px" style={{ background: C.lineStrong }} /></div>
          <div className="grid md:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((s, i) => (<TiltCard key={s.n} accent={TRIO[i % TRIO.length]} delay={i * 80}><div className="anpr-mono text-xs mb-3" style={{ color: TRIO[i % TRIO.length] }}>{s.n}</div><h3 className="text-sm font-semibold mb-2 text-slate-900">{s.title}</h3><p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>{s.desc}</p></TiltCard>))}
          </div>
        </section>

        {/* UNDER THE HOOD */}
        <section className="py-16">
          <h2 className="reveal anpr-serif text-2xl mb-8 text-slate-900">Under the hood</h2>
          <div className="reveal grid sm:grid-cols-4 rounded-lg overflow-hidden" style={{ border: `1px solid ${C.line}`, background: C.panel }}>
            {SPECS.map((s, i) => (<div key={s.label} className="p-5" style={{ borderLeft: i > 0 ? `1px solid ${C.line}` : "none" }}><div className="text-xs mb-1" style={{ color: C.inkFaint }}>{s.label}</div><div className="anpr-mono text-base text-slate-900">{s.value}</div></div>))}
          </div>
        </section>

        {/* TIMELINE */}
        <section id="journey" className="scroll-mt-32 py-24 bg-white rounded-2xl border border-blue-100 my-12 shadow-[0_0_40px_-10px_rgba(37,99,235,0.1)]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <div className="text-[11.5px] font-mono tracking-widest uppercase text-blue-600 mb-4 font-semibold">How the Pipeline Works</div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight anpr-serif">Complete Detection Journey</h2>
            </motion.div>
            <InteractiveTimeline />
          </div>
        </section>

        {/* UPLOAD SECTION */}
        <section className="py-16">
          <h2 className="reveal anpr-serif text-2xl mb-2 text-slate-900">Run a detection</h2>
          <p className="reveal text-sm mb-6" style={{ color: C.inkFaint }}>Drop a clip below to see the pipeline in action.</p>

          <div className="reveal flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
            <ServiceTerminal running={serviceRunning} />
            <div className="flex gap-3 shrink-0 flex-wrap">
              
              {/* UPDATED START BUTTON */}
              <button 
                onClick={() => handleServiceToggle(true)} 
                disabled={serviceRunning} 
                className={`anpr-btn-strong flex items-center gap-2 px-6 py-3.5 text-sm font-bold rounded-full disabled:cursor-not-allowed ${!serviceRunning ? "pulse-glow" : ""}`} 
                style={!serviceRunning ? { background: C.accent, color: "#FFF", ["--glow" as any]: "rgba(37,99,235,0.55)", boxShadow: "0 10px 26px -8px rgba(37,99,235,0.6)" } : { background: "transparent", border: `1.5px solid ${C.line}`, color: C.inkFaint }}
              >
                <Power size={16} /> Start service
              </button>

              {/* UPDATED STOP BUTTON */}
              <button 
                onClick={() => handleServiceToggle(false)} 
                disabled={!serviceRunning} 
                className={`anpr-btn-strong flex items-center gap-2 px-6 py-3.5 text-sm font-bold rounded-full disabled:cursor-not-allowed ${serviceRunning ? "pulse-glow" : ""}`} 
                style={serviceRunning ? { background: C.danger, color: "#FFF", ["--glow" as any]: "rgba(220,38,38,0.55)", boxShadow: "0 10px 26px -8px rgba(220,38,38,0.6)" } : { background: "transparent", border: `1.5px solid ${C.line}`, color: C.inkFaint }}
              >
                <PowerOff size={16} /> Stop service
              </button>

              <button onClick={openHistory} className="anpr-btn-strong flex items-center gap-2 px-6 py-3.5 text-sm font-bold rounded-full" style={{ background: C.ink, color: "#FFF", boxShadow: "0 10px 26px -8px rgba(15,23,42,0.4)" }}>
                <ListVideo size={16} /> View All Detection Results
              </button>
            </div>
          </div>

          {errorMessage && processingState !== "failed" && (<p className="flex items-center gap-2 text-sm mb-4 font-medium" style={{ color: C.danger }}><AlertTriangle size={14} /> {errorMessage}</p>)}

          <div className="reveal rounded-lg overflow-hidden" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
            <StepTracker step={step} />
            <div className="p-8">
              <input type="file" ref={fileInputRef} accept="video/*" onChange={handleFileSelect} className="hidden" />
              <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={processingState === "idle" && !file && serviceRunning ? triggerFileInput : undefined} className="relative rounded-md p-8 text-center transition-colors duration-200" style={{ border: `1px dashed ${isDragging ? C.lineStrong : C.line}`, background: isDragging ? "#F1F5F9" : "transparent", minHeight: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: processingState === "idle" && !file && serviceRunning ? "pointer" : "default", opacity: !serviceRunning && processingState === "idle" ? 0.55 : 1 }}>
                <Corner position="tl" /><Corner position="tr" /><Corner position="bl" /><Corner position="br" />
                
                {/* IDLE STATES */}
                {processingState === "idle" && !serviceRunning && (<> <PowerOff size={28} style={{ color: C.danger }} className="mb-4" /><h3 className="anpr-serif text-xl mb-2 text-slate-900">Service is offline</h3><p className="text-sm" style={{ color: C.inkFaint }}>Start the service above to enable uploads</p> </>)}
                {processingState === "idle" && !file && serviceRunning && (<> <Fingerprint size={30} className="mb-4 text-blue-600" /><h3 className="anpr-serif text-xl mb-2 text-slate-900">Drop footage to begin</h3><p className="text-sm mb-5" style={{ color: C.inkFaint }}>MP4 or MOV, from a gate camera or handheld clip</p><button onClick={(e) => { e.stopPropagation(); triggerFileInput(); }} className="anpr-btn px-5 py-2.5 text-sm font-medium" style={{ background: C.ink, color: C.panel }}>Select file</button> </>)}
                
                {/* FILE SELECTED STATE */}
                {processingState === "idle" && file && (
                  <div className="w-full max-w-sm">
                    <div className="flex items-center gap-3 mb-5 text-left">
                      <Video size={20} className="text-blue-600" />
                      <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate text-slate-900">{file.name}</p><p className="anpr-mono text-xs" style={{ color: C.inkFaint }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p></div>
                    </div>
                    <button onClick={startProcessing} disabled={!serviceRunning} className="anpr-btn w-full px-6 py-3 text-sm font-medium disabled:cursor-not-allowed" style={{ background: serviceRunning ? C.ink : C.line, color: serviceRunning ? C.panel : C.inkFaint }}>{serviceRunning ? "Run detection" : "Service offline"}</button>
                  </div>
                )}

                {/* AI PROCESSING STATUS CARD */}
                {(processingState === "uploading" || processingState === "processing") && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="w-full max-w-2xl bg-slate-50 rounded-xl border p-6 text-left"
                    style={{ borderColor: C.line }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <Loader2 className="animate-spin text-blue-600" size={20} />
                          Multi-Model Inference Active
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">Please be patient. Complex analysis is underway.</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600 font-mono">{uploadProgress}%</div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider">Estimated Progress</div>
                      </div>
                    </div>

                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mb-8">
                      <motion.div 
                        className="h-full bg-blue-600 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-white p-4 rounded-lg border shadow-sm flex flex-col items-center text-center" style={{ borderColor: C.line }}>
                        <Target className="text-purple-600 mb-2" size={24} />
                        <div className="text-xs font-bold text-slate-900 uppercase">YOLOv8 Detector</div>
                        <div className="text-[10px] text-slate-500 mt-1">Locating vehicles & ROIs</div>
                        <div className="mt-2 flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse delay-75" />
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse delay-150" />
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border shadow-sm flex flex-col items-center text-center" style={{ borderColor: C.line }}>
                        <Brain className="text-indigo-600 mb-2" size={24} />
                        <div className="text-xs font-bold text-slate-900 uppercase">CRNN-OCR Engine</div>
                        <div className="text-[10px] text-slate-500 mt-1">Character sequence recognition</div>
                        <div className="mt-2 flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse delay-75" />
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse delay-150" />
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border shadow-sm flex flex-col items-center text-center" style={{ borderColor: C.line }}>
                        <ShieldCheck className="text-emerald-600 mb-2" size={24} />
                        <div className="text-xs font-bold text-slate-900 uppercase">Regex Validator</div>
                        <div className="text-[10px] text-slate-500 mt-1">Format verification & scoring</div>
                        <div className="mt-2 flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse delay-75" />
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse delay-150" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100">
                      <p className="text-sm text-blue-800 leading-relaxed font-medium">
                        {PROCESSING_MESSAGES[messageIndex]}
                      </p>
                      <p className="text-xs text-blue-600/70 mt-2">
                        Our system is currently running 3 specialized AI models in parallel to ensure maximum accuracy. 
                        This process may take a few moments depending on video length and complexity. 
                        Results will be available immediately upon completion.
                      </p>
                    </div>

                    <div className="mt-6 flex justify-center">
                      <button onClick={resetUpload} className="text-xs font-medium text-red-500 hover:text-red-700 flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors">
                        <XCircle size={14} /> Cancel Processing
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* COMPLETE STATE */}
                {processingState === "complete" && (
                  <div className="w-full text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: C.line }}>
                      <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700"><CheckCircle2 size={20} /></div><div><h3 className="text-xl font-bold text-slate-900">Analysis Complete</h3><p className="text-xs text-slate-500 font-mono">JOB ID: {jobId}</p></div></div>
                      <button onClick={resetUpload} className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Process New Feed</button>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="rounded-xl overflow-hidden bg-black border" style={{ borderColor: C.line }}>
                          {processedVideoUrl ? (<video src={processedVideoUrl} controls autoPlay muted className="w-full aspect-video object-contain" />) : (<div className="aspect-video flex flex-col items-center justify-center text-slate-500"><PlayCircle size={48} className="mb-2 opacity-50" /><span className="text-sm font-mono">Loading processed stream...</span></div>)}
                        </div>
                        <div className="flex items-center justify-between px-2"><span className="text-xs font-bold uppercase tracking-wider text-slate-400">Processed Output</span><span className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">MP4 Stream</span></div>
                      </div>
                      <div className="rounded-xl border overflow-hidden" style={{ borderColor: C.line }}>
                        <div className="px-6 py-4 bg-slate-50 border-b flex items-center justify-between" style={{ borderColor: C.line }}><h4 className="font-bold text-slate-900 flex items-center gap-2"><Database size={16} className="text-blue-600" /> Detection Log</h4><span className="text-xs font-mono text-slate-500">{analyticsData.length} Records Found</span></div>
                        <div className="overflow-x-auto max-h-[400px] custom-scrollbar">
                          <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 sticky top-0 z-10"><tr><th className="px-6 py-3 font-semibold text-slate-500 border-b" style={{ borderColor: C.line }}>Vehicle ID</th><th className="px-6 py-3 font-semibold text-slate-500 border-b" style={{ borderColor: C.line }}>Plate Number</th><th className="px-6 py-3 font-semibold text-slate-500 border-b" style={{ borderColor: C.line }}>Timestamp</th></tr></thead>
                            <tbody className="divide-y" style={{ borderColor: C.line }}>
                              {analyticsData.length > 0 ? (analyticsData.map((row: any, idx: number) => (<tr key={idx} className="hover:bg-blue-50/50 transition-colors"><td className="px-6 py-3 font-mono text-slate-700">{row.vehicle_id || `V-${idx + 1}`}</td><td className="px-6 py-3 font-mono font-bold text-blue-700">{row.plate_number || "N/A"}</td><td className="px-6 py-3 text-slate-500 flex items-center gap-2"><Clock size={14} />{row.timestamp || new Date().toLocaleTimeString()}</td></tr>))) : (<tr><td colSpan={3} className="px-6 py-12 text-center text-slate-400 italic">No analytics data available for this session.</td></tr>)}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* FAILED STATE */}
                {processingState === "failed" && (<div className="w-full text-center max-w-sm"><AlertTriangle size={26} style={{ color: C.danger }} className="mx-auto mb-4" /><h4 className="anpr-serif text-lg mb-2" style={{ color: C.danger }}>Detection failed</h4><p className="text-sm mb-6" style={{ color: C.inkSoft }}>{errorMessage}</p><button onClick={resetUpload} className="anpr-btn px-6 py-2.5 text-sm font-medium" style={{ border: `1px solid ${C.lineStrong}`, color: C.ink }}>Try again</button></div>)}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* --- HISTORY PANEL --- */}
      <AnimatePresence>
        {showHistory && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowHistory(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.3, ease: power3Out }} className="fixed inset-0 m-auto z-50 w-[92%] max-w-[1500px] h-[88vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border" style={{ borderColor: C.line }}>
              <div className="px-8 py-5 border-b flex items-center justify-between bg-white" style={{ borderColor: C.line }}>
                <div><h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><ListVideo className="text-blue-600" size={20} /> Vehicle Detection Logs</h2><p className="text-xs text-slate-500 mt-1">Historical record of all detected vehicles and license plates</p></div>
                <button onClick={() => setShowHistory(false)} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"><X size={20} /></button>
              </div>

              <div className="px-8 py-4 grid grid-cols-4 gap-4 bg-slate-50 border-b" style={{ borderColor: C.line }}>
                <div className="p-4 rounded-xl bg-white border shadow-sm" style={{ borderColor: C.line }}><div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Logs</div><div className="text-2xl font-bold text-slate-900">{totalLogs}</div></div>
                <div className="p-4 rounded-xl bg-white border shadow-sm" style={{ borderColor: C.line }}><div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1 flex items-center gap-1"><Hash size={12}/> Unique Plates</div><div className="text-2xl font-bold text-blue-700">{uniquePlates}</div></div>
                <div className="p-4 rounded-xl bg-white border shadow-sm" style={{ borderColor: C.line }}><div className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1 flex items-center gap-1"><CheckCircle2 size={12}/> High Confidence</div><div className="text-2xl font-bold text-green-700">{highConfidence}</div></div>
                <div className="p-4 rounded-xl bg-white border shadow-sm" style={{ borderColor: C.line }}><div className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1 flex items-center gap-1"><TrendingUp size={12}/> Avg Confidence</div><div className="text-2xl font-bold text-purple-700">{avgConfidence}%</div></div>
              </div>

              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="px-6 py-3 border-b bg-slate-50 flex items-center justify-between" style={{ borderColor: C.line }}><h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">All Detections</h3><span className="text-xs text-slate-500 font-mono">{history.length} records loaded</span></div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {loadingHistory ? (<div className="h-full flex flex-col items-center justify-center text-slate-400"><Loader2 className="animate-spin mb-2" size={32} /><span className="text-xs font-mono">Fetching historical data...</span></div>) : history.length === 0 ? (<div className="h-full flex flex-col items-center justify-center text-slate-400"><Database size={48} className="mb-3 opacity-20" /><p className="text-sm font-medium">No historical detections found</p></div>) : (
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm"><tr><th className="px-6 py-3 font-semibold text-slate-500 border-b" style={{ borderColor: C.line }}>ID</th><th className="px-6 py-3 font-semibold text-slate-500 border-b" style={{ borderColor: C.line }}>Vehicle ID</th><th className="px-6 py-3 font-semibold text-slate-500 border-b" style={{ borderColor: C.line }}>Type</th><th className="px-6 py-3 font-semibold text-slate-500 border-b" style={{ borderColor: C.line }}>Plate</th><th className="px-6 py-3 font-semibold text-slate-500 border-b" style={{ borderColor: C.line }}>Confidence</th><th className="px-6 py-3 font-semibold text-slate-500 border-b" style={{ borderColor: C.line }}>Timestamp</th></tr></thead>
                      <tbody className="divide-y" style={{ borderColor: C.line }}>
                        {history.map((log: any) => (
                          <tr key={log.id} onClick={() => setSelectedLog(log)} className={`cursor-pointer transition-colors ${selectedLog?.id === log.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'hover:bg-slate-50 border-l-4 border-l-transparent'}`} style={{ borderColor: C.line }}>
                            <td className="px-6 py-3 font-mono text-slate-700">#{log.id}</td>
                            <td className="px-6 py-3 font-mono text-slate-700">{log.vehicle_id}</td>
                            <td className="px-6 py-3 text-slate-700">{log.vehicle_type || "-"}</td>
                            <td className="px-6 py-3 font-mono font-bold text-blue-700">{log.plate_number || "-"}</td>
                            <td className="px-6 py-3 font-mono text-slate-700">{log.confidence ?? 0}%</td>
                            <td className="px-6 py-3 text-slate-500 text-xs flex items-center gap-2"><Clock size={14} />{new Date(log.timestamp).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}