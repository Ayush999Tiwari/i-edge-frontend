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
  
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const loginCardRef = useRef<HTMLDivElement>(null);
  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const servicesTrackRef = useRef<HTMLDivElement>(null);
  const shatterTextRef = useRef<HTMLHeadingElement>(null);
  const shatterPiecesRef = useRef<HTMLSpanElement[]>([]);

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

      // 4. GLASS SHATTER EFFECT (Vertical, Thin, Gaps, Highlighted)
      if (shatterTextRef.current) {
        const textElement = shatterTextRef.current;
        const text = textElement.textContent || '';
        textElement.textContent = ''; 
        
        textElement.style.display = 'block';
        textElement.style.maxWidth = '550px';
        textElement.style.whiteSpace = 'normal';
        textElement.style.lineHeight = '1.3';
        textElement.style.fontFamily = "'Cinzel', serif";
        textElement.style.fontWeight = "500"; 
        textElement.style.fontSize = "36px"; 
        textElement.style.color = "#FFFFFF";
        textElement.style.textShadow = "0 0 20px rgba(255,255,255,0.2)";

        const words = text.split(' ');
        
        words.forEach((word) => {
          const wordSpan = document.createElement('span');
          wordSpan.style.display = 'inline'; 
          
          word.split('').forEach((char) => {
            const shard = document.createElement('span');
            shard.textContent = char;
            shard.style.display = 'inline-block';
            
            shard.style.cssText = `
              font-family: 'Cinzel', serif;
              font-weight: 500;
              font-size: 36px; 
              color: #FFFFFF;
              text-shadow: 0 0 20px rgba(255,255,255,0.2);
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            `;
            wordSpan.appendChild(shard);
            shatterPiecesRef.current.push(shard);
          });
          
          textElement.appendChild(wordSpan);
          textElement.appendChild(document.createTextNode(' '));
        });

        gsap.to(shatterPiecesRef.current, {
          x: () => gsap.utils.random(-200, 200),
          y: () => gsap.utils.random(-150, 150),
          z: () => gsap.utils.random(-100, 100),
          rotationX: () => gsap.utils.random(-180, 180),
          rotationY: () => gsap.utils.random(-180, 180),
          rotationZ: () => gsap.utils.random(-180, 180),
          opacity: 0,
          scale: () => gsap.utils.random(0.1, 0.6),
          clipPath: () => `polygon(${Math.random() * 20}% ${Math.random() * 20}%, ${80 + Math.random() * 20}% ${Math.random() * 30}%, ${100 - Math.random() * 20}% ${80 + Math.random() * 20}%, ${Math.random() * 30}% ${100 - Math.random() * 20}%)`,
          duration: 1,
          stagger: { each: 0.01, from: 'random' },
          ease: 'power3.in',
          scrollTrigger: {
            trigger: servicesSectionRef.current,
            start: 'top+=15% top', 
            end: 'top+=35% top', 
            scrub: 1,
          }
        });
      }

      // 5. HORIZONTAL SCROLL (FIXED TO STOP EXACTLY AT THE END)
      if (servicesSectionRef.current && servicesTrackRef.current) {
        const track = servicesTrackRef.current;

        gsap.to(track, {
          // ✅ PERFECT FIX: Moves exactly the difference between track width and screen width
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: servicesSectionRef.current,
            start: 'top top',
            // ✅ PERFECT FIX: Scroll distance matches the movement distance exactly
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

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
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div ref={heroRef} className="space-y-10">
            <div className="space-y-6 max-w-xl overflow-hidden">
              <p className="reveal-text text-sm font-medium text-[#6B6B6B] uppercase tracking-[0.2em] font-sans">Why Choose i-Edge?</p>
              <h2 className="reveal-text text-5xl lg:text-6xl font-bold text-[#2D2D2D] leading-[1.1]" style={{ fontFamily: 'Cinzel, serif', textShadow: '2px 2px 0 #ccc, 4px 4px 0 #bbb, 6px 6px 10px rgba(0,0,0,0.15)' }}>
                Smart AI Vision for Modern Businesses
              </h2>
              <p className="reveal-text text-lg text-[#6B6B6B] leading-relaxed font-sans">
                Automate your daily operations, track inventory, and secure your facilities. Our AI cameras do the hard work so you can focus on growing your business.
              </p>
            </div>

            <div className="flex items-center gap-12 overflow-hidden font-sans">
              <div className="reveal-text">
                <div className="text-4xl font-bold text-[#2D2D2D]" style={{ fontFamily: 'Cinzel, serif' }}>12M+</div>
                <div className="text-sm text-[#6B6B6B] mt-1">Items Tracked Daily</div>
              </div>
              <div className="reveal-text w-px h-12 bg-[#D0D0D0]" />
              <div className="reveal-text">
                <div className="text-4xl font-bold text-[#2D2D2D]" style={{ fontFamily: 'Cinzel, serif' }}>99.9%</div>
                <div className="text-sm text-[#6B6B6B] mt-1">Detection Accuracy</div>
              </div>
              <div className="reveal-text w-px h-12 bg-[#D0D0D0]" />
              <div className="reveal-text">
                <div className="text-4xl font-bold text-[#2D2D2D]" style={{ fontFamily: 'Cinzel, serif' }}>24/7</div>
                <div className="text-sm text-[#6B6B6B] mt-1">Active Monitoring</div>
              </div>
            </div>

            <div className="flex items-center gap-4 font-sans">
              <button className="px-8 py-4 rounded-full bg-[#2D2D2D] text-[#F5F5F0] font-medium text-sm">See How It Works</button>
              <button className="px-8 py-4 rounded-full bg-transparent border border-[#2D2D2D] text-[#2D2D2D] font-medium text-sm">Talk to Sales</button>
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

      {/* DARK SECTION */}
      <div ref={servicesSectionRef} className="relative z-10 h-[100vh] overflow-hidden bg-[#2D2D2D] text-[#F5F5F0]">
        
        {/* TEXT AT TOP LEFT */}
        <div className="absolute top-20 left-6 lg:left-20 z-20 max-w-2xl"> 
          
          {/* HIGHLIGHTED BADGE */}
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 shadow-lg shadow-white/5">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-lg font-bold text-white uppercase tracking-[0.25em]">What We Do</span>
          </div>
          
          {/* SHATTER TEXT */}
          <h3 ref={shatterTextRef} className="font-normal leading-tight">
            Smart cameras that watch, count, and protect your business 24/7.
          </h3>
        </div>

        {/* ✅ PERFECT FIX: w-max ensures track is exactly the size of its content */}
        <div ref={servicesTrackRef} className="flex h-full items-center pl-6 lg:pl-[85vw] gap-8 w-max">
          {SERVICES.map((service, index) => (
            <div key={index} className="service-card flex-shrink-0 w-[80vw] lg:w-[40vw] h-[60vh] p-10 rounded-[2rem] bg-[#F5F5F0] text-[#2D2D2D] flex flex-col justify-between font-sans" style={{ boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.2)' }}>
              <div>
                <div className="text-6xl mb-6">{service.icon}</div>
                <h4 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Cinzel, serif' }}>{service.name}</h4>
                <p className="text-lg text-[#6B6B6B] leading-relaxed">{service.desc}</p>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xs text-[#6B6B6B] uppercase tracking-wider mb-1">Success Rate</div>
                  <div className="text-5xl font-bold text-[#2D2D2D]" style={{ fontFamily: 'Cinzel, serif' }}>{service.stat}</div>
                </div>
                <button className="px-6 py-3 rounded-full bg-[#2D2D2D] text-[#F5F5F0] text-sm font-medium">Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}