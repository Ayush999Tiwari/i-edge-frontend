import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// Define the shape of the props
interface LoginProps {
  onLogin: (email: string, password: string) => void;
  isLoading: boolean;
}

const Login = ({ onLogin, isLoading }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const constellationRef = useRef<HTMLDivElement>(null);
  
  const theme = {
    bg: '#F1F8E9',
    accent: '#7CB342',
    secondary: '#DCEDC8',
    text: '#33691E'
  };

  const services = [
    { name: "Egg Counting", icon: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" },
    { name: "iGrid", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" },
    { name: "Surveillance", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
    { name: "Face Rec", icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;
        gsap.to(constellationRef.current, { x: xPos, y: yPos, duration: 1, ease: "power2.out" });
      };
      window.addEventListener("mousemove", handleMouseMove);
      
      gsap.fromTo(cardRef.current, 
        { opacity: 0, rotationY: 15, x: 50 },
        { opacity: 1, rotationY: 0, x: 0, duration: 1.2, ease: "expo.out" }
      );

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        ctx.revert();
      };
    }, containerRef);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen flex overflow-hidden font-sans" style={{ backgroundColor: theme.bg }}>
      {/* LEFT SIDE: Constellation */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center p-12">
        <div ref={constellationRef} className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-dashed border-green-200/50 rounded-full scale-75 animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-0 border border-green-300/30 rounded-full scale-50 animate-[spin_15s_linear_infinite_reverse]" />
          {services.map((service, i) => {
            const angle = (i / services.length) * 2 * Math.PI;
            const radius = 180;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <div key={i} className="absolute flex flex-col items-center justify-center p-4 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white transition-transform hover:scale-110 cursor-default" style={{ transform: `translate(${x}px, ${y}px)`, width: '120px', height: '120px' }}>
                <div className="p-3 rounded-full mb-2" style={{ backgroundColor: theme.secondary }}>
                  <svg className="w-6 h-6" style={{ color: theme.text }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} /></svg>
                </div>
                <span className="text-xs font-bold text-center" style={{ color: theme.text }}>{service.name}</span>
              </div>
            );
          })}
          <div className="absolute z-10 w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center border-4" style={{ borderColor: theme.secondary }}>
            <span className="text-2xl font-black" style={{ color: theme.accent }}>i-E</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
        <div ref={cardRef} className="w-full max-w-md bg-white/80 backdrop-blur-xl p-10 rounded-[2rem] shadow-2xl border border-white/50">
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2" style={{ color: theme.text }}>Portal Access</h1>
            <p className="text-gray-500">Secure gateway for enterprise agri-services.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-0 py-4 bg-transparent border-b-2 border-gray-200 text-lg focus:outline-none focus:border-green-500 transition-colors placeholder-gray-300"
                placeholder="Email Address"
                style={{ color: theme.text }}
              />
            </div>
            <div className="group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-0 py-4 bg-transparent border-b-2 border-gray-200 text-lg focus:outline-none focus:border-green-500 transition-colors placeholder-gray-300"
                placeholder="Password"
                style={{ color: theme.text }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg shadow-green-500/20 transition-all duration-300 hover:shadow-green-500/40 hover:-translate-y-1 flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              style={{ backgroundColor: theme.accent }}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                "Enter Dashboard"
              )}
            </button>
          </form>
          
          <div className="mt-12 flex items-center justify-between text-xs text-gray-400">
            <span>© 2026 i-Edge Systems</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              System Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;