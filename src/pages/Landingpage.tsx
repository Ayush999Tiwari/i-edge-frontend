import React, { useEffect, useRef, useState } from "react";
import { Egg, Scale, Camera, ScanFace, FlaskConical, Leaf, Sparkles, ArrowRight, LogOut, ChevronRight, Upload } from "lucide-react";
import { gsap } from "gsap";
import EggCountingUpload from "./EggCountingUpload";

// --- Design Tokens ---
const C = {
  bg: "#F5F5F0",
  ink: "#2D2D2D",
  inkSoft: "#4A4A4A",
  inkFaint: "#6B6B6B",
  border: "#E0E0E0",
  accent: "#2D2D2D",
  cardBorder: "#3D3832",
};

interface ServiceItem {
  id: string;
  name: string;
  Icon: React.ElementType;
  status: string;
  overview: string;
  fullDescription: string;
  benefit: string;
  hasDemo?: boolean;
  image?: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "poultry-vision",
    name: "Egg & Chicken Count",
    Icon: Egg,
    status: "Active",
    overview: "Simply point your existing cameras at the production floor and let our AI do the counting. It watches every frame of your video feed, identifies each bird and egg in real-time, and keeps a precise digital tally. No more missed counts or tired workers with clickers. The results flow straight into your inventory system, so you always know exactly what you have.",
    fullDescription: "An advanced computer vision pipeline that ingests unstructured hatchery footage and returns auditable, ERP-ready census data.",
    benefit: "Eliminates 100% of manual counting errors and reduces labor costs by up to 40%.",
    hasDemo: true,
    image: "/Gemini_Generated_Image_qq78ymqq78ymqq78.png",
  },
  {
    id: "body-weight",
    name: "Body Weight Estimation",
    Icon: Scale,
    status: "Active",
    overview: "Weigh your entire flock without ever picking up a single bird. Our AI reads the video feed from above and estimates each bird's weight using smart 3D analysis. If any group starts falling behind its target weight, you get alerted immediately. This means you can fix feed or health issues before they cost you money, without stressing the birds.",
    fullDescription: "Non-intrusive volumetric analysis using RGB-D sensors to estimate flock mass without handling stress or manual sampling.",
    benefit: "Catch underweight batches 5–7 days earlier with zero physical handling stress.",
    image: "/Gemini_Generated_Image_xckocvxckocvxcko.png",
  },
  {
    id: "home-surveillance",
    name: "Home Surveillance",
    Icon: Camera,
    status: "Active",
    overview: "Keep an eye on your staff housing, coops, and gates around the clock without hiring a night watchman. The system tells the difference between a person, an animal, and a vehicle, so you only get alerted when it actually matters. Every movement is recorded and stored securely, giving you a complete history you can search through anytime.",
    fullDescription: "Intelligent perimeter monitoring that distinguishes between human, animal, and vehicle motion to eliminate false alarms.",
    benefit: "Know the moment someone is at the gate, reducing security payroll by up to 60%.",
    image: "/Gemini_Generated_Image_5h1ono5h1ono5h1o.png",
  },
  {
    id: "face-recognition",
    name: "Face Recognition",
    Icon: ScanFace,
    status: "Active",
    overview: "Know exactly who walks in and out of your facility, every single time. Staff and visitors are matched against your approved list in milliseconds, making buddy-punching and tailgating impossible. The system keeps a clean, tamper-proof log of every entry for payroll and security, without slowing anyone down at the gate.",
    fullDescription: "Millisecond-latency biometric verification with liveness detection to prevent spoofing and ensure absolute access control integrity.",
    benefit: "Stops buddy-punching and tailgating automatically with 99.98% match accuracy.",
    image: "/Gemini_Generated_Image_q872swq872swq872.png",
  },
  {
    id: "quality-testing",
    name: "Quality Testing AI",
    Icon: FlaskConical,
    status: "Active",
    overview: "Stop waiting days for lab results. Our AI inspects your feed, water, and environmental samples the moment they come in, spotting contamination or quality issues before they ever reach your flock. It even writes the compliance reports for you, turning a week-long headache into a five-minute job.",
    fullDescription: "Computer vision analysis of lab samples and production outputs to detect contaminants, nutrient deficiencies, and quality deviations instantly.",
    benefit: "Identifies quality issues before they impact flock health, reducing lab turnaround to 15 mins.",
    image: "/Gemini_Generated_Image_so4ir2so4ir2so4i.png",
  },
  {
    id: "plant-surveillance",
    name: "Plant Surveillance",
    Icon: Leaf,
    status: "Beta",
    overview: "Watch your entire production floor like a hawk, not just the entry points. The AI spots equipment jams, blocked exits, missing safety gear, and workflow bottlenecks before they turn into expensive shutdowns. You get a searchable video record of every issue, so you can fix the root cause instead of just putting out fires.",
    fullDescription: "Comprehensive operational oversight detecting equipment jams, safety violations, and bottlenecks before they cause costly downtime.",
    benefit: "Flags jammed lines or blocked exits before shutdown, reducing unplanned downtime by 35%.",
    image: "/Gemini_Generated_Image_ybyfttybyfttybyf.png",
  },
];

function ServiceCard({ service, index, onSelect }: { 
  service: ServiceItem; 
  index: number; 
  onSelect: (service: ServiceItem) => void; 
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const localRef = useRef<HTMLDivElement>(null);
  const isBeta = service.status === "Beta";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  useEffect(() => {
    if (!localRef.current) return;
    gsap.to(localRef.current, {
      y: -7,
      duration: 3.6 + (index % 4) * 0.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.25,
    });
  }, [index]);

  return (
    <div
      ref={localRef}
      onClick={() => onSelect(service)}
      onMouseMove={handleMouseMove}
      className="group relative rounded-3xl cursor-pointer select-none overflow-hidden transition-all duration-500 ease-out flex flex-col"
      style={{
        background: `linear-gradient(180deg, #FFFFFF 0%, #E8E8E3 100%)`,
        border: `2px solid ${C.cardBorder}`,
        boxShadow: "0 15px 35px -10px rgba(45,45,45,0.15)",
        minHeight: "520px", // Adjusted height since bullet points are removed
      }}
    >
      {/* Mouse Spotlight Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(45, 45, 45, 0.06), transparent 40%)` }}
      />

      <div className="p-7 h-full flex flex-col relative z-10">
        
        {/* Image Banner */}
        {service.image && (
          <div className="mb-6 -mx-7 -mt-7 h-56 overflow-hidden relative group/img">
            <img 
              src={service.image} 
              alt={service.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-white/50 shadow-lg">
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: C.ink }}>Live Preview</span>
            </div>
          </div>
        )}

        {/* Header: Icon & Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="relative flex items-center justify-center rounded-2xl w-12 h-12" style={{ background: `linear-gradient(150deg, #EAEAE5, #fff)`, boxShadow: `inset 0 0 0 1px ${C.cardBorder}, 0 10px 20px -10px rgba(45,45,45,0.2)` }}>
            <service.Icon size={22} color={C.ink} strokeWidth={1.7} />
          </div>
          <span className="text-[10px] font-bold px-3 py-1.5 rounded-full h-fit font-mono uppercase tracking-wider" style={{ background: isBeta ? "#FEF3C7" : "#E0E0DB", color: isBeta ? "#92400E" : C.ink, border: `1px solid ${C.cardBorder}` }}>
            {service.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-4 text-xl font-bold transition-colors duration-300 group-hover:text-black" style={{ color: C.ink, fontFamily: "'Cinzel', serif" }}>
          {service.name}
        </h3>
        
        {/* Simple Paragraph (No Bullet Points) */}
        <div className="mb-6 flex-1">
          <p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>
            {service.overview}
          </p>
        </div>

        {/* Bottom Benefit Box */}
        <div className="mt-auto p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 group-hover:bg-white/90 group-hover:shadow-md" style={{ background: "rgba(255,255,255,0.7)", borderColor: C.cardBorder }}>
          <div className="flex gap-2 items-start">
            <Sparkles size={14} color={C.ink} style={{ marginTop: 2, flexShrink: 0 }} />
            <p className="text-xs font-bold leading-snug" style={{ color: C.ink }}>{service.benefit}</p>
          </div>
        </div>

        {/* Hover Reveal Section */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
          <div className="overflow-hidden">
            <div className="pt-6 mt-6 border-t" style={{ borderColor: C.cardBorder }}>
              <p className="mb-6 text-base leading-relaxed italic" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: C.inkSoft }}>
                "{service.fullDescription}"
              </p>
              <button className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg active:scale-95" style={{ background: C.accent, color: "#fff" }}>
                Access Module <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Landingpage() {
  const [activeView, setActiveView] = useState<'dashboard' | 'egg-upload'>('dashboard');
  const [gsapReady, setGsapReady] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>("/images (2).jpeg");
  
  const heroRef = useRef<HTMLDivElement>(null);
  const floatingCardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    localStorage.removeItem('iedge_token');
    window.location.reload();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setGsapReady(true);
  }, []);

  useEffect(() => {
    if (!gsapReady) return;
    
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".nav-el", { y: -20, opacity: 0, duration: 0.6, stagger: 0.1 })
      .from(".hero-badge", { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
      .from(".hero-h1", { y: 40, opacity: 0, duration: 0.8 }, "-=0.3")
      .from(".hero-sub", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
      .from(".hero-cta", { y: 20, opacity: 0, duration: 0.5 }, "-=0.2")
      .from(".floating-card", { x: 60, opacity: 0, rotationY: 15, duration: 1 }, "-=0.5")
      .from(".stat-card-1", { y: 30, opacity: 0, duration: 0.7 }, "-=0.3")
      .from(".stat-card-2", { y: 30, opacity: 0, duration: 0.7 }, "-=0.5");

    if (floatingCardRef.current) {
      gsap.to(floatingCardRef.current, {
        y: -12,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, [gsapReady]);

  const handleCardClick = (service: ServiceItem) => {
    if (service.id === 'poultry-vision') {
      setActiveView('egg-upload');
    }
  };

  if (activeView === 'egg-upload') {
    return <EggCountingUpload onBack={() => setActiveView('dashboard')} />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden" style={{ background: C.bg, color: C.ink, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute rounded-full" style={{ width: 600, height: 600, top: -200, right: -100, background: "radial-gradient(circle at 35% 35%, #E8E8E0, transparent 70%)", filter: "blur(80px)", opacity: 0.5 }} />
        <div className="absolute rounded-full" style={{ width: 500, height: 500, bottom: -150, left: -100, background: "radial-gradient(circle at 35% 35%, #DCDCD5, transparent 70%)", filter: "blur(80px)", opacity: 0.4 }} />
      </div>

      <button
        onClick={handleLogout}
        className="fixed bottom-6 left-6 z-[9999] flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        style={{ background: "#FFFFFF", color: C.ink, border: `1px solid ${C.border}` }}
      >
        <LogOut size={16} />
        Logout
      </button>

      <div className="relative z-10">
        <header className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="nav-el flex items-center gap-3 font-bold text-2xl" style={{ color: C.ink }}>
            <span className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ background: `linear-gradient(155deg, ${C.accent}, #4A4A4A)` }}>
              <Egg size={20} color="#F5F5F0" />
            </span>
            <span style={{ fontFamily: "'Cinzel', serif" }}>i-Edge</span>
          </div>
          
          <nav className="nav-el hidden md:flex items-center gap-10">
            <a href="#services" className="text-sm font-medium hover:text-gray-600 transition-colors" style={{ color: C.ink }}>Services</a>
            <a href="#features" className="text-sm font-medium hover:text-gray-600 transition-colors" style={{ color: C.ink }}>Features</a>
            <a href="#about" className="text-sm font-medium hover:text-gray-600 transition-colors" style={{ color: C.ink }}>About</a>
            <a href="#cases" className="text-sm font-medium hover:text-gray-600 transition-colors" style={{ color: C.ink }}>Cases</a>
          </nav>

          <button className="nav-el px-6 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105" style={{ background: C.accent, color: "#F5F5F0" }}>
            Contact Us
          </button>
        </header>

        <main className="max-w-7xl mx-auto px-8 pt-12 pb-20">
          <div ref={heroRef} className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8">
              <div className="hero-badge inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-gray-300 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-gray-600 animate-pulse" />
                <span className="text-xs font-bold text-gray-700 uppercase tracking-[0.2em]">Enterprise AI Vision</span>
              </div>

              <h1 className="hero-h1 font-bold leading-[0.95]" style={{ fontSize: "clamp(48px, 7vw, 88px)", color: C.ink, fontFamily: "'Cinzel', serif", textShadow: "3px 3px 0 #ccc, 6px 6px 0 #bbb, 9px 9px 15px rgba(0,0,0,0.15)" }}>
                THE<br/>
                PERFECT<br/>
                <span style={{ color: C.inkSoft }}>AI VISION</span>
              </h1>

              <p className="hero-sub text-lg font-medium leading-relaxed max-w-md" style={{ color: C.inkSoft, fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                / We craft intelligent vision systems /
              </p>

              <p className="hero-sub text-base leading-relaxed max-w-lg" style={{ color: C.inkFaint }}>
                Deploy computer vision across your facilities. Real-time insights. Maximum efficiency. Zero manual effort.
              </p>

              <div className="hero-cta flex items-center gap-4 pt-4">
                <button className="px-8 py-4 rounded-full font-bold text-sm transition-all hover:scale-105 shadow-lg" style={{ background: C.accent, color: "#F5F5F0" }}>
                  Start Now
                </button>
                <button className="px-8 py-4 rounded-full font-bold text-sm border-2 transition-all hover:scale-105" style={{ borderColor: C.accent, color: C.ink }}>
                  Learn More
                </button>
              </div>
            </div>

            <div className="relative">
              <div ref={floatingCardRef} className="floating-card relative rounded-[2rem] overflow-hidden" style={{ background: "#FFFFFF", boxShadow: "0 40px 80px -20px rgba(45,45,45,0.2)" }}>
                <div className="px-8 py-6 border-b" style={{ borderColor: C.border }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300" />
                      <div className="w-3 h-3 rounded-full bg-gray-300" />
                      <div className="w-3 h-3 rounded-full bg-gray-300" />
                    </div>
                    <span className="text-xs font-mono" style={{ color: C.inkFaint }}>iedge.dashboard</span>
                  </div>
                </div>
                
                <div className="p-8">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  <div 
                    className="rounded-2xl overflow-hidden mb-6 cursor-pointer transition-all hover:shadow-xl"
                    style={{ 
                      background: uploadedImage ? "transparent" : `linear-gradient(135deg, #E8E8E0 0%, #DCDCD5 100%)`, 
                      height: "280px", 
                      position: "relative" 
                    }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {uploadedImage ? (
                      <>
                        <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                          <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center gap-2">
                            <Upload size={16} color={C.ink} />
                            <span className="text-xs font-bold" style={{ color: C.ink }}>Change Image</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4" style={{ background: C.accent, boxShadow: "0 20px 40px -10px rgba(45,45,45,0.3)" }}>
                          <Camera size={36} color="#F5F5F0" />
                        </div>
                        <div className="text-sm font-bold mb-2" style={{ color: C.ink, fontFamily: "'Cinzel', serif" }}>Upload Your Image</div>
                        <div className="text-xs text-center" style={{ color: C.inkFaint }}>Click to browse files</div>
                      </div>
                    )}

                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border" style={{ borderColor: C.border }}>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold" style={{ color: C.ink }}>LIVE</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wider font-bold" style={{ color: C.inkFaint }}>Unique Design</div>
                      <div className="text-lg font-bold" style={{ color: C.ink, fontFamily: "'Cinzel', serif" }}>& Ergonomics</div>
                    </div>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
                      <ArrowRight size={20} color={C.ink} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-white shadow-lg border" style={{ borderColor: C.border }}>
                <div className="flex items-center gap-2">
                  <Sparkles size={14} color={C.ink} />
                  <span className="text-xs font-bold" style={{ color: C.ink }}>AI Powered</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-20">
            <div className="stat-card-1 rounded-[2rem] p-10 relative overflow-hidden" style={{ background: `linear-gradient(135deg, #E8E8E0 0%, #DCDCD5 100%)`, boxShadow: "0 20px 40px -10px rgba(45,45,45,0.1)" }}>
              <div className="relative z-10">
                <div className="text-xs uppercase tracking-[0.2em] font-bold mb-4" style={{ color: C.inkFaint }}>We use best technology</div>
                <h3 className="text-3xl font-bold mb-6" style={{ color: C.ink, fontFamily: "'Cinzel', serif", textShadow: "2px 2px 0 #ccc, 4px 4px 0 #bbb" }}>
                  Enterprise-Grade<br/>AI Infrastructure
                </h3>
                <div className="flex flex-wrap gap-3">
                  {["Computer Vision", "Deep Learning", "YOLO", "TensorFlow", "PyTorch", "Edge AI"].map((tech, i) => (
                    <span key={i} className="px-4 py-2 rounded-full text-xs font-bold" style={{ background: "rgba(255,255,255,0.7)", color: C.ink, border: `1px solid ${C.border}` }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full" style={{ background: "rgba(255,255,255,0.3)", filter: "blur(20px)" }} />
            </div>

            <div className="stat-card-2 rounded-[2rem] p-10 relative overflow-hidden flex flex-col justify-between" style={{ background: C.accent, color: "#F5F5F0", boxShadow: "0 20px 40px -10px rgba(45,45,45,0.2)" }}>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] font-bold mb-4" style={{ color: "#9A9A9A" }}>We combine AI & operations</div>
                <h3 className="text-3xl font-bold mb-8" style={{ fontFamily: "'Cinzel', serif", textShadow: "2px 2px 0 #4A4A4A, 4px 4px 0 #5A5A5A" }}>
                  Real-Time<br/>Intelligence
                </h3>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-6xl font-bold" style={{ fontFamily: "'Cinzel', serif", textShadow: "3px 3px 0 #4A4A4A, 6px 6px 0 #5A5A5A" }}>12M+</div>
                  <div className="text-sm mt-2" style={{ color: "#9A9A9A" }}>Objects Processed Daily</div>
                </div>
                <button className="px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all hover:scale-105" style={{ background: "#F5F5F0", color: C.ink }}>
                  Learn More <ChevronRight size={16} />
                </button>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full" style={{ background: "rgba(255,255,255,0.05)", filter: "blur(20px)" }} />
            </div>
          </div>

          <section className="mt-20 mb-20" id="services">
            <div className="mb-12">
              <div className="text-xs uppercase tracking-[0.2em] font-bold mb-4" style={{ color: C.inkFaint }}>Our Services</div>
              <h2 className="text-4xl font-bold" style={{ color: C.ink, fontFamily: "'Cinzel', serif", textShadow: "2px 2px 0 #ccc, 4px 4px 0 #bbb" }}>
                Six AI Services. One Platform.
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s: ServiceItem, i: number) => (
                <ServiceCard key={s.id} service={s} index={i} onSelect={handleCardClick} />
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] px-10 py-16 flex flex-wrap items-center justify-between gap-6 relative overflow-hidden mb-20" style={{ background: C.accent, color: "#F5F5F0" }}>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Cinzel', serif" }}>Need a custom detection model?</h3>
              <p className="text-base opacity-90 max-w-md">We build new AI pipelines onto the same infrastructure. Tell us what to count.</p>
            </div>
            <button className="relative z-10 px-8 py-4 rounded-full font-bold text-sm transition-all hover:scale-105 shadow-xl" style={{ background: "#F5F5F0", color: C.ink }}>
              Talk to Engineering
            </button>
            <div className="absolute -right-10 -bottom-20 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          </section>

        </main>

        <footer className="max-w-7xl mx-auto px-8 py-8 flex flex-wrap items-center justify-between gap-3 border-t" style={{ borderColor: C.border }}>
          <p className="font-mono text-xs" style={{ color: C.inkFaint }}>Secured by i-Edge Enterprise v2.0</p>
          <p className="font-mono text-xs" style={{ color: C.inkFaint }}>© 2026 i-Edge · PostgreSQL Ledger · ERP Synced</p>
        </footer>
      </div>
    </div>
  );
}