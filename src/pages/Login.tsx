import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  isLoading: boolean;
}

const SERVICES = [
  { name: 'Egg & Chicken Counting', stat: '2.4M+', desc: 'Automatically count items on your production line. No manual work, no human error.', icon: '🥚' },
  { name: 'Weight Estimation', stat: '98.7%', desc: 'Track the weight and growth of your inventory without ever touching them.', icon: '⚖️' },
  { name: '24/7 Facility Surveillance', stat: '500+', desc: 'Keep your entire facility secure with smart cameras that detect unusual activity instantly.', icon: '👁️' },
  { name: 'Face Recognition Access', stat: '99.9%', desc: 'Let authorized staff in and keep strangers out with fast, secure facial recognition.', icon: '👤' },
];

export default function PremiumLogin({ onLogin, isLoading }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const loginCardRef = useRef<HTMLDivElement>(null);
  const headingBlockRef = useRef<HTMLDivElement>(null);
  const cardStackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  cardRefs.current = [];
  const [cardStackHeight, setCardStackHeight] = useState<number>(260);

  const addCardRef = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Hero Text Reveal
      const heroTexts = heroRef.current?.querySelectorAll('.reveal-text');
      if (heroTexts) {
        gsap.fromTo(heroTexts, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power2.out', delay: 0.2 });
      }

      // 2. Parallax Background Blobs
      const blobs = containerRef.current?.querySelectorAll('.parallax-blob');
      if (blobs) {
        blobs.forEach((blob, i) => {
          gsap.to(blob, { y: -(i + 1) * 80, ease: 'none', scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 1 } });
        });
      }

      // 3. Login Card Scale & Fade
      if (loginCardRef.current) {
        gsap.fromTo(loginCardRef.current, { scale: 0.95, opacity: 0, y: 40 }, { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: loginCardRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } });
      }

      // 4. LEFT-SIDE CARD SLIDESHOW — one card visible at a time, with 3D depth on the transition
      const cards = cardRefs.current;
      if (cards.length) {
        gsap.set(cards[0], { opacity: 1, x: 0, rotateY: 0, scale: 1, zIndex: 2 });
        gsap.set(cards.slice(1), { opacity: 0, x: 50, rotateY: -25, scale: 0.94, zIndex: 1 });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Card slot height = login card height minus the heading block above it, so the left
  // column (heading + slideshow) never runs taller than the login card on the right.
  useEffect(() => {
    const measure = () => {
      if (loginCardRef.current && headingBlockRef.current) {
        const total = loginCardRef.current.offsetHeight;
        const headingH = headingBlockRef.current.offsetHeight;
        const gap = 20;
        setCardStackHeight(Math.max(180, total - headingH - gap));
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (loginCardRef.current) observer.observe(loginCardRef.current);
    if (headingBlockRef.current) observer.observe(headingBlockRef.current);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Auto-advance the slideshow — fast cadence
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SERVICES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  // Crossfade + 3D-tilt animation whenever activeIndex changes — quick snap
  useEffect(() => {
    const cards = cardRefs.current;
    if (!cards.length) return;
    cards.forEach((card, i) => {
      if (i === activeIndex) {
        gsap.fromTo(card,
          { opacity: 0, x: 50, rotateY: -25, scale: 0.94, zIndex: 2 },
          { opacity: 1, x: 0, rotateY: 0, scale: 1, zIndex: 2, duration: 0.5, ease: 'power2.out' }
        );
      } else {
        gsap.to(card, { opacity: 0, x: -50, rotateY: 25, scale: 0.94, zIndex: 1, duration: 0.4, ease: 'power2.out' });
      }
    });
  }, [activeIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-x-hidden bg-[#F5F5F0] text-[#2D2D2D]">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="parallax-blob absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full bg-[#E8E8E0]/60" />
        <div className="parallax-blob absolute bottom-[-5%] left-[-5%] w-[600px] h-[600px] rounded-full bg-[#DCDCD5]/50" />
      </div>

      <nav className="relative z-50 px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#2D2D2D] flex items-center justify-center">
              <span className="text-lg font-semibold text-[#F5F5F0]" style={{ fontFamily: 'Cinzel, serif' }}>iE</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-[#2D2D2D]" style={{ fontFamily: 'Cinzel, serif' }}>i-Edge</h1>
              <p className="text-xs text-[#6B6B6B] font-sans">Smart AI Vision</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-10 font-sans">
            <a href="#services" className="text-[#2D2D2D] text-sm font-medium">Features</a>
            <a href="#about" className="text-[#2D2D2D] text-sm font-medium">How it Works</a>
            <a href="#contact" className="text-[#2D2D2D] text-sm font-medium">Contact</a>
            <button className="px-6 py-2.5 rounded-full bg-[#2D2D2D] text-[#F5F5F0] text-sm font-medium">Get Started</button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div ref={heroRef} className="space-y-6">

            {/* Headline + supporting copy — back on TOP, compacted so the column fits within the login card's height */}
            <div ref={headingBlockRef} className="space-y-3 max-w-xl overflow-hidden">
              <p className="reveal-text text-xs font-medium text-[#6B6B6B] uppercase tracking-[0.2em] font-sans">Why Choose i-Edge?</p>
              <h2 className="reveal-text text-3xl lg:text-4xl font-bold text-[#2D2D2D] leading-[1.15]" style={{ fontFamily: 'Cinzel, serif', textShadow: '2px 2px 0 #ccc, 4px 4px 0 #bbb, 6px 6px 10px rgba(0,0,0,0.15)' }}>
                Smart AI Vision for Modern Businesses
              </h2>
              <p className="reveal-text text-sm text-[#6B6B6B] leading-relaxed font-sans">
                Automate your daily operations, track inventory, and secure your facilities. Our AI cameras do the hard work so you can focus on growing your business.
              </p>

              <div className="flex items-center gap-8 overflow-hidden font-sans pt-1">
                <div className="reveal-text">
                  <div className="text-2xl font-bold text-[#2D2D2D]" style={{ fontFamily: 'Cinzel, serif' }}>12M+</div>
                  <div className="text-xs text-[#6B6B6B] mt-0.5">Items Tracked Daily</div>
                </div>
                <div className="reveal-text w-px h-8 bg-[#D0D0D0]" />
                <div className="reveal-text">
                  <div className="text-2xl font-bold text-[#2D2D2D]" style={{ fontFamily: 'Cinzel, serif' }}>99.9%</div>
                  <div className="text-xs text-[#6B6B6B] mt-0.5">Detection Accuracy</div>
                </div>
                <div className="reveal-text w-px h-8 bg-[#D0D0D0]" />
                <div className="reveal-text">
                  <div className="text-2xl font-bold text-[#2D2D2D]" style={{ fontFamily: 'Cinzel, serif' }}>24/7</div>
                  <div className="text-xs text-[#6B6B6B] mt-0.5">Active Monitoring</div>
                </div>
              </div>

              <div className="flex items-center gap-3 font-sans pt-1">
                <button className="px-5 py-2.5 rounded-full bg-[#2D2D2D] text-[#F5F5F0] font-medium text-xs">See How It Works</button>
                <button className="px-5 py-2.5 rounded-full bg-transparent border border-[#2D2D2D] text-[#2D2D2D] font-medium text-xs">Talk to Sales</button>
              </div>
            </div>

            {/* CARD SLIDESHOW — sits right below the heading, height auto-fits the remaining space so it never pushes past the login card */}
            <div className="space-y-3 -mt-2">
              <div className="reveal-text inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2D2D2D]/5 border border-[#2D2D2D]/10 w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-[#2D2D2D] uppercase tracking-[0.2em] font-sans">What We Do</span>
              </div>

              <div
                ref={cardStackRef}
                className="relative w-full max-w-xl"
                style={{ height: `${cardStackHeight}px`, perspective: '1200px' }}
              >
                {SERVICES.map((service, index) => (
                  <div
                    key={index}
                    ref={addCardRef}
                    className="absolute inset-0 p-6 rounded-[1.75rem] bg-white flex flex-col justify-between font-sans overflow-hidden"
                    style={{ boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.12)', transformStyle: 'preserve-3d' }}
                  >
                    <div>
                      <div className="text-4xl mb-2">{service.icon}</div>
                      <h4 className="text-xl font-bold mb-1.5 text-[#2D2D2D]" style={{ fontFamily: 'Cinzel, serif' }}>{service.name}</h4>
                      <p className="text-sm text-[#6B6B6B] leading-snug">{service.desc}</p>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-[10px] text-[#6B6B6B] uppercase tracking-wider mb-0.5">Success Rate</div>
                        <div className="text-3xl font-bold text-[#2D2D2D]" style={{ fontFamily: 'Cinzel, serif' }}>{service.stat}</div>
                      </div>
                      <button className="px-4 py-2 rounded-full bg-[#2D2D2D] text-[#F5F5F0] text-xs font-medium">Learn More</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {SERVICES.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-8 bg-[#2D2D2D]' : 'w-2 bg-[#2D2D2D]/20'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div ref={loginCardRef} onMouseMove={handleCardMouseMove} className="relative p-10 rounded-[2rem] bg-white overflow-hidden group" style={{ boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.08)' }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(45, 45, 45, 0.06), transparent 40%)` }} />

              <div className="relative z-10 space-y-6 font-sans">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F5F5F0] border border-[#E0E0E0]">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </div>
                    <span className="text-sm font-medium text-[#2D2D2D]">System Online</span>
                  </div>
                  <div className="flex items-end gap-1 h-6">
                    {[40, 70, 50, 90, 60, 80].map((h, i) => (
                      <div key={i} className="w-1.5 bg-[#2D2D2D] rounded-full animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                </div>

                <div className="text-center space-y-2 pt-4">
                  <h3 className="text-2xl font-bold text-[#2D2D2D]" style={{ fontFamily: 'Cinzel, serif' }}>Welcome Back</h3>
                  <p className="text-[#6B6B6B] text-sm">Sign in to manage your AI cameras</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2D2D2D]">Email Address</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-5 py-3.5 rounded-xl bg-[#F5F5F0] border border-[#E0E0E0] text-[#2D2D2D] placeholder-[#9A9A9A] focus:outline-none focus:border-[#2D2D2D] transition-colors" placeholder="you@company.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2D2D2D]">Password</label>
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-5 py-3.5 rounded-xl bg-[#F5F5F0] border border-[#E0E0E0] text-[#2D2D2D] placeholder-[#9A9A9A] focus:outline-none focus:border-[#2D2D2D] transition-colors" placeholder="••••••••" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-[#6B6B6B] cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-[#D0D0D0]" />
                      <span>Remember me</span>
                    </label>
                    <a href="#" className="text-[#2D2D2D] font-medium">Forgot password?</a>
                  </div>
                  <button type="submit" disabled={isLoading} className="w-full py-4 rounded-xl bg-[#2D2D2D] text-[#F5F5F0] font-medium text-sm disabled:opacity-50">
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}