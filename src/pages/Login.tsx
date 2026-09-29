import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronLeft, ChevronRight, Eye, EyeOff, GitBranch, Mail, Phone, User,
  ShieldCheck, Zap, Bell, TrendingUp, Check, BadgeCheck, ArrowRight,
  Lock, Camera, Video, Cpu, Fingerprint
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface LoginProps {
  onLogin: (identifier: string, password: string) => Promise<void>;
  onRegister?: (
    identifier: string,
    password: string,
    method: 'email' | 'phone',
    name: string
  ) => Promise<void>;
  onGoogleAuth?: () => void;
  onGithubAuth?: () => void;
  isLoading: boolean;
}

const SERVICES = [
  {
    name: 'AI Vehicle Recognition',
    stat: '98% Accuracy',
    desc: "Automatically detect, classify, and recognize vehicles in real-time with high-precision AI monitoring.",
    icon: "🚗",
    color: "bg-blue-50 text-blue-700 border-blue-100"
  },
  {
    name: '24/7 Facility Surveillance',
    stat: '500+ Cameras',
    desc: 'Keep your entire facility secure with smart cameras that detect unusual activity instantly.',
    icon: '👁️',
    color: "bg-emerald-50 text-emerald-700 border-emerald-100"
  },
  {
    name: 'Face Recognition Access',
    stat: '99.9% Secure',
    desc: 'Let authorized staff in and keep strangers out with fast, secure facial recognition.',
    icon: '👤',
    color: "bg-violet-50 text-violet-700 border-violet-100"
  },
];

const WHY_CHOOSE = [
  {
    icon: Zap,
    title: 'Instant Setup',
    desc: 'Plug in a camera and go live in minutes. No dedicated IT team required.'
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Security',
    desc: 'End-to-end encrypted streams and role-based access control.'
  },
  {
    icon: Bell,
    title: 'Real-Time Alerts',
    desc: 'Get notified the moment something needs attention.'
  },
  {
    icon: TrendingUp,
    title: 'Scales With You',
    desc: 'From a single storefront to a nationwide chain.'
  },
];

// Ambient floating particles around the 3D orb
const PARTICLES = [
  { top: '10%', left: '18%', size: 6, color: '#22D3EE', delay: '0s', duration: '6s' },
  { top: '78%', left: '14%', size: 5, color: '#3B82F6', delay: '1s', duration: '7s' },
  { top: '18%', left: '82%', size: 7, color: '#67E8F9', delay: '2s', duration: '5.5s' },
  { top: '86%', left: '72%', size: 5, color: '#3B82F6', delay: '0.5s', duration: '8s' },
  { top: '48%', left: '4%', size: 6, color: '#22D3EE', delay: '1.5s', duration: '6.5s' },
  { top: '6%', left: '56%', size: 5, color: '#F8FAFC', delay: '2.5s', duration: '7.5s' },
];

// Floating tech icon chips arranged around the orb
const ICONS = [
  {
    Icon: Camera,
    top: 160,
    left: 366,
    z: -30,
    color: '#2563EB',
    delay: '0s',
    duration: '5.5s'
  },
  {
    Icon: Video,
    top: 338,
    left: 263,
    z: 40,
    color: '#06B6D4',
    delay: '0.6s',
    duration: '6.5s'
  },
  {
    Icon: Cpu,
    top: 338,
    left: 58,
    z: -20,
    color: '#2563EB',
    delay: '1.2s',
    duration: '6s'
  },
  {
    Icon: Fingerprint,
    top: 160,
    left: -46,
    z: 35,
    color: '#06B6D4',
    delay: '1.8s',
    duration: '7s'
  },
  {
    Icon: Eye,
    top: -18,
    left: 58,
    z: -35,
    color: '#2563EB',
    delay: '2.4s',
    duration: '5.8s'
  },
  {
    Icon: Bell,
    top: -18,
    left: 263,
    z: 25,
    color: '#06B6D4',
    delay: '3s',
    duration: '6.2s'
  },
];

function GoogleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  );
}

export default function Login({
  onLogin,
  onRegister,
  onGoogleAuth,
  onGithubAuth,
  isLoading
}: LoginProps) {

  // UI State
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Form State
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const [authMethod, setAuthMethod] =
    useState<'email' | 'phone'>('email');

  const [regName, setRegName] = useState('');
  const [regIdentifier, setRegIdentifier] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [regError, setRegError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const loginCardRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  cardRefs.current = [];

  const autoplayRef =
    useRef<ReturnType<typeof setInterval> | null>(null);

  const addCardRef = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  // --- GSAP Animations ---
  useEffect(() => {
    const ctx = gsap.context(() => {

      const heroTexts =
        heroRef.current?.querySelectorAll('.reveal-text');

      if (heroTexts) {
        gsap.fromTo(
          heroTexts,
          {
            y: 40,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.2
          }
        );
      }

      const blobs =
        containerRef.current?.querySelectorAll('.parallax-blob');

      if (blobs) {
        blobs.forEach((blob, i) => {
          gsap.to(blob, {
            y: -(i + 1) * 60,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1
            }
          });
        });
      }

      if (loginCardRef.current) {
        gsap.fromTo(
          loginCardRef.current,
          {
            scale: 0.96,
            opacity: 0,
            y: 30
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: loginCardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // 3D orb entrance
      if (scannerRef.current) {
        gsap.fromTo(
          scannerRef.current,
          {
            scale: 0.85,
            opacity: 0
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: scannerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      const cards = cardRefs.current;

      if (cards.length) {
        gsap.set(cards[0], {
          opacity: 1,
          x: 0,
          rotateY: 0,
          scale: 1,
          zIndex: 2
        });

        gsap.set(cards.slice(1), {
          opacity: 0,
          x: 40,
          rotateY: -15,
          scale: 0.95,
          zIndex: 1
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // --- Carousel Logic ---
  const startAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }

    autoplayRef.current = setInterval(() => {
      setActiveIndex(
        (prev) => (prev + 1) % SERVICES.length
      );
    }, 5000);
  };

  useEffect(() => {
    startAutoplay();

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, []);

  const goToIndex = (index: number) => {
    const normalized =
      ((index % SERVICES.length) + SERVICES.length) %
      SERVICES.length;

    setActiveIndex(normalized);
    startAutoplay();
  };

  useEffect(() => {
    const cards = cardRefs.current;

    if (!cards.length) return;

    cards.forEach((card, i) => {

      if (i === activeIndex) {
        gsap.to(card, {
          opacity: 1,
          x: 0,
          rotateY: 0,
          scale: 1,
          zIndex: 2,
          duration: 0.6,
          ease: 'power2.out'
        });
      } else {
        gsap.to(card, {
          opacity: 0,
          x: i < activeIndex ? -40 : 40,
          rotateY: i < activeIndex ? 15 : -15,
          scale: 0.95,
          zIndex: 1,
          duration: 0.5,
          ease: 'power2.out'
        });
      }

    });

  }, [activeIndex]);

  // --- Handlers ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await onLogin(
      identifier.trim(),
      password
    );
  };

  const handleRegisterSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();
    setRegError('');

    if (!regName.trim()) {
      setRegError('Please enter your full name.');
      return;
    }

    if (!regIdentifier.trim()) {
      setRegError(
        authMethod === 'email'
          ? 'Please enter your email address.'
          : 'Please enter your phone number.'
      );
      return;
    }

    if (regPassword !== regConfirm) {
      setRegError('Passwords do not match.');
      return;
    }

    if (regPassword.length < 8) {
      setRegError(
        'Password must be at least 8 characters.'
      );
      return;
    }

    if (!agreedToTerms) {
      setRegError(
        'Please agree to the Terms & Privacy Policy.'
      );
      return;
    }

    try {

      setIsRegistering(true);

      if (onRegister) {
        await onRegister(
          regIdentifier.trim(),
          regPassword,
          authMethod,
          regName.trim()
        );
      }

    } finally {
      setIsRegistering(false);
    }
  };

  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {

    const rect =
      e.currentTarget.getBoundingClientRect();

    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleScannerMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {

    const rect =
      e.currentTarget.getBoundingClientRect();

    const px =
      (e.clientX - rect.left) /
      rect.width -
      0.5;

    const py =
      (e.clientY - rect.top) /
      rect.height -
      0.5;

    setTilt({
      x: py * -16,
      y: px * 16
    });
  };

  const handleScannerMouseLeave = () =>
    setTilt({
      x: 0,
      y: 0
    });

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-x-hidden bg-[#F5F5F0] text-[#2D2D2D] selection:bg-[#2D2D2D] selection:text-white"
    >

      {/* Keyframes for the 3D orb */}
      <style>{`
        @keyframes vsCorePulse {
          0%, 100% {
            transform: scale(1);
            filter: brightness(1);
          }

          50% {
            transform: scale(1.08);
            filter: brightness(1.15);
          }
        }

        .vs-core {
          animation: vsCorePulse 3.2s ease-in-out infinite;
        }

        @keyframes vsOrbitA {
          from {
            transform: rotateX(70deg) rotateZ(0deg);
          }

          to {
            transform: rotateX(70deg) rotateZ(360deg);
          }
        }

        .vs-orbit-a {
          animation: vsOrbitA 7s linear infinite;
        }

        @keyframes vsOrbitB {
          from {
            transform:
              rotateY(60deg)
              rotateX(70deg)
              rotateZ(0deg);
          }

          to {
            transform:
              rotateY(60deg)
              rotateX(70deg)
              rotateZ(-360deg);
          }
        }

        .vs-orbit-b {
          animation: vsOrbitB 9s linear infinite;
        }

        @keyframes vsOrbitC {
          from {
            transform:
              rotateY(-60deg)
              rotateX(70deg)
              rotateZ(0deg);
          }

          to {
            transform:
              rotateY(-60deg)
              rotateX(70deg)
              rotateZ(360deg);
          }
        }

        .vs-orbit-c {
          animation: vsOrbitC 11s linear infinite;
        }

        @keyframes vsFloat {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.35;
          }

          50% {
            transform: translateY(-16px);
            opacity: 1;
          }
        }

        .vs-particle {
          animation-name: vsFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        @keyframes vsIconFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-12px) rotate(4deg);
          }
        }

        .vs-icon-float {
          animation-name: vsIconFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        @keyframes vsSceneSway {
          0%, 100% {
            transform:
              rotateY(-7deg)
              rotateX(2deg);
          }

          50% {
            transform:
              rotateY(7deg)
              rotateX(-2deg);
          }
        }

        .vs-scene-sway {
          animation:
            vsSceneSway 11s ease-in-out infinite;
          transform-style: preserve-3d;
        }
      `}</style>

      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">

        <div
          className="parallax-blob absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-[#EAEAE2]/80 blur-3xl"
        />

        <div
          className="parallax-blob absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#DCDCD5]/60 blur-3xl"
        />

      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-6">

        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/')}
          >

            <div className="w-10 h-10 rounded-xl bg-[#2D2D2D] flex items-center justify-center shadow-lg">

              <span
                className="text-lg font-bold text-[#F5F5F0]"
                style={{
                  fontFamily: 'Cinzel, serif'
                }}
              >
                iE
              </span>

            </div>

            <div>

              <h1
                className="text-xl font-bold text-[#2D2D2D] leading-none"
                style={{
                  fontFamily: 'Cinzel, serif'
                }}
              >
                i-Edge
              </h1>

              <p className="text-[10px] text-[#6B6B6B] font-medium tracking-widest uppercase mt-0.5">
                Intelligence Platform
              </p>

            </div>

          </div>

          <div className="hidden md:flex items-center gap-6">

            <button
              onClick={() => navigate('/how-it-works')}
              className="px-5 py-2.5 rounded-full bg-[#2D2D2D] text-[#F5F5F0] text-sm font-semibold hover:opacity-90 transition-all"
            >
              How it Works
            </button>

            <button
              onClick={() => {
                setAuthTab('register');

                document
                  .getElementById('auth-section')
                  ?.scrollIntoView({
                    behavior: 'smooth'
                  });
              }}
              className="px-5 py-2.5 rounded-full bg-[#2D2D2D] text-[#F5F5F0] text-sm font-semibold hover:opacity-90 transition-all"
            >
              Get Started
            </button>

          </div>

        </div>

      </nav>

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-20"
      >

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Value Proposition */}
          <div className="space-y-8">

            <div className="reveal-text inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#2D2D2D]/10 shadow-sm w-fit">

              <ShieldCheck
                size={14}
                className="text-emerald-600"
              />

              <span className="text-[10px] font-bold text-[#2D2D2D] uppercase tracking-[0.15em]">
                Enterprise Grade AI
              </span>

            </div>

            <h2
              className="reveal-text text-5xl lg:text-6xl font-bold text-[#2D2D2D] leading-[1.1]"
              style={{
                fontFamily: 'Cinzel, serif'
              }}
            >
              Autonomous Vision
              <br />

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D2D2D] to-[#6B6B6B]">
                Intelligence System
              </span>

            </h2>

            <p className="reveal-text text-lg text-[#5A5A5A] leading-relaxed max-w-lg font-light">
              Stop guessing. Start knowing. Our advisory AI doesn't just record video—it understands context, predicts incidents, and automates responses before you even ask.
            </p>

            <div className="reveal-text flex items-center gap-4 pt-4">

              <button
                onClick={() => {
                  setAuthTab('register');

                  document
                    .getElementById('auth-section')
                    ?.scrollIntoView({
                      behavior: 'smooth'
                    });
                }}
                className="px-8 py-4 rounded-full bg-[#2D2D2D] text-[#F5F5F0] font-bold text-sm tracking-wide hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                Create Free Account
              </button>

              <button
                onClick={() => navigate('/how-it-works')}
                className="px-8 py-4 rounded-full bg-white border border-[#2D2D2D]/10 text-[#2D2D2D] font-bold text-sm tracking-wide hover:bg-[#F5F5F0] transition-all"
              >
                View Demo
              </button>

            </div>

          </div>

          {/* Right: Interactive Service Showcase */}
          <div
            className="reveal-text relative w-full select-none group"
            style={{
              height: '360px',
              perspective: '1200px'
            }}
          >

            {SERVICES.map((service, index) => (

              <div
                key={index}
                ref={addCardRef}
                className="absolute inset-0 p-8 rounded-[2rem] bg-white flex flex-col justify-between overflow-hidden border border-[#2D2D2D]/5"
                style={{
                  boxShadow:
                    '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden'
                }}
              >

                <div className="flex items-start justify-between">

                  <div
                    className={`p-3 rounded-2xl ${service.color}`}
                  >
                    <span className="text-2xl">
                      {service.icon}
                    </span>
                  </div>

                  <Zap
                    size={18}
                    className="text-[#2D2D2D]/20"
                  />

                </div>

                <div className="space-y-2 mt-4">

                  <h4
                    className="text-2xl font-bold text-[#2D2D2D]"
                    style={{
                      fontFamily: 'Cinzel, serif'
                    }}
                  >
                    {service.name}
                  </h4>

                  <p className="text-[#6B6B6B] leading-snug text-sm">
                    {service.desc}
                  </p>

                </div>

                <div className="flex items-end justify-between pt-6 border-t border-[#2D2D2D]/5 mt-4">

                  <div>

                    <div className="text-[10px] text-[#6B6B6B] uppercase tracking-wider mb-1">
                      Performance
                    </div>

                    <div
                      className="text-3xl font-bold text-[#2D2D2D]"
                      style={{
                        fontFamily: 'Cinzel, serif'
                      }}
                    >
                      {service.stat}
                    </div>

                  </div>

                  <button
                    className="px-4 py-2 rounded-full bg-[#F5F5F0] text-[#2D2D2D] text-xs font-bold hover:bg-[#2D2D2D] hover:text-white transition-colors"
                  >
                    Explore Feature
                  </button>

                </div>

              </div>

            ))}

            {/* Carousel Controls */}
            <div className="absolute -bottom-12 left-0 flex items-center gap-4">

              <div className="flex gap-2">

                <button
                  onClick={() =>
                    goToIndex(activeIndex - 1)
                  }
                  className="w-10 h-10 rounded-full bg-white border border-[#2D2D2D]/10 flex items-center justify-center hover:bg-[#2D2D2D] hover:text-white transition-all shadow-sm"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={() =>
                    goToIndex(activeIndex + 1)
                  }
                  className="w-10 h-10 rounded-full bg-white border border-[#2D2D2D]/10 flex items-center justify-center hover:bg-[#2D2D2D] hover:text-white transition-all shadow-sm"
                >
                  <ChevronRight size={18} />
                </button>

              </div>

              <div className="flex gap-1.5">

                {SERVICES.map((_, i) => (

                  <button
                    key={i}
                    onClick={() =>
                      goToIndex(i)
                    }
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === activeIndex
                        ? 'w-8 bg-[#2D2D2D]'
                        : 'w-2 bg-[#2D2D2D]/20'
                    }`}
                  />

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16 border-t border-[#2D2D2D]/5">

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {WHY_CHOOSE.map((item) => (

            <div
              key={item.title}
              className="p-6 rounded-2xl bg-white/50 border border-[#2D2D2D]/5 hover:bg-white hover:shadow-lg transition-all duration-300"
            >

              <div className="w-10 h-10 rounded-xl bg-[#2D2D2D] flex items-center justify-center mb-4 text-white">

                <item.icon size={18} />

              </div>

              <h3
                className="text-sm font-bold text-[#2D2D2D] mb-2"
                style={{
                  fontFamily: 'Cinzel, serif'
                }}
              >
                {item.title}
              </h3>

              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* AUTH SECTION WITH 3D ORB */}
      <section
        id="auth-section"
        className="relative z-10 max-w-7xl mx-auto px-6 py-20"
      >

        <div className="text-center mb-12">

          <h2
            className="text-3xl font-bold text-[#2D2D2D] mb-3"
            style={{
              fontFamily: 'Cinzel, serif'
            }}
          >
            Access Your Dashboard
          </h2>

          <p className="text-[#6B6B6B]">
            Choose your preferred method to enter the i-Edge ecosystem.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT: Floating 3D Orb */}
          <div
            className="hidden lg:flex items-center justify-center h-full min-h-[500px] relative"
            style={{
              perspective: '1400px'
            }}
          >

            {/* Dark contrast stage */}
            <div
              className="absolute w-[480px] h-[480px] rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(11,18,32,0.92) 0%, rgba(11,18,32,0.65) 40%, rgba(11,18,32,0) 72%)'
              }}
            />

            {/* Ambient color glow */}
            <div className="absolute w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#2563EB]/30 to-[#06B6D4]/20 blur-3xl pointer-events-none" />

            <div
              className="vs-scene-sway"
              style={{
                perspective: '1400px'
              }}
            >

              <div
                ref={scannerRef}
                onMouseMove={handleScannerMouseMove}
                onMouseLeave={handleScannerMouseLeave}
                className="relative w-[320px] h-[320px]"
                style={{
                  transformStyle: 'preserve-3d',
                  transform:
                    `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition:
                    'transform 0.25s ease-out'
                }}
              >

                {/* Orbit ring A */}
                <div
                  className="vs-orbit-a absolute rounded-full"
                  style={{
                    width: 300,
                    height: 300,
                    top: '50%',
                    left: '50%',
                    marginTop: -150,
                    marginLeft: -150,
                    border:
                      '2.5px solid rgba(34,211,238,0.9)',
                    boxShadow:
                      '0 0 18px rgba(34,211,238,0.35)'
                  }}
                >

                  <div
                    className="absolute rounded-full"
                    style={{
                      width: 14,
                      height: 14,
                      top: '50%',
                      right: -7,
                      transform:
                        'translateY(-50%)',
                      background: '#22D3EE',
                      boxShadow:
                        '0 0 22px 8px rgba(34,211,238,0.9)'
                    }}
                  />

                </div>

                {/* Orbit ring B */}
                <div
                  className="vs-orbit-b absolute rounded-full"
                  style={{
                    width: 250,
                    height: 250,
                    top: '50%',
                    left: '50%',
                    marginTop: -125,
                    marginLeft: -125,
                    border:
                      '2.5px solid rgba(59,130,246,0.85)',
                    boxShadow:
                      '0 0 18px rgba(59,130,246,0.3)'
                  }}
                >

                  <div
                    className="absolute rounded-full"
                    style={{
                      width: 12,
                      height: 12,
                      top: '50%',
                      right: -6,
                      transform:
                        'translateY(-50%)',
                      background: '#3B82F6',
                      boxShadow:
                        '0 0 20px 7px rgba(59,130,246,0.85)'
                    }}
                  />

                </div>

                {/* Orbit ring C */}
                <div
                  className="vs-orbit-c absolute rounded-full"
                  style={{
                    width: 340,
                    height: 340,
                    top: '50%',
                    left: '50%',
                    marginTop: -170,
                    marginLeft: -170,
                    border:
                      '2px solid rgba(226,232,240,0.65)'
                  }}
                >

                  <div
                    className="absolute rounded-full"
                    style={{
                      width: 9,
                      height: 9,
                      top: '50%',
                      right: -4.5,
                      transform:
                        'translateY(-50%)',
                      background: '#F8FAFC',
                      boxShadow:
                        '0 0 16px 5px rgba(248,250,252,0.8)'
                    }}
                  />

                </div>

                {/* Glowing core */}
                <div
                  className="vs-core absolute rounded-full"
                  style={{
                    width: 110,
                    height: 110,
                    top: '50%',
                    left: '50%',
                    marginTop: -55,
                    marginLeft: -55,
                    background:
                      'linear-gradient(135deg, #3B82F6, #22D3EE)',
                    boxShadow:
                      '0 0 70px 20px rgba(59,130,246,0.6), 0 0 130px 50px rgba(34,211,238,0.35)'
                  }}
                />

                {/* Ambient particles */}
                {PARTICLES.map((p, i) => (

                  <div
                    key={i}
                    className="vs-particle absolute rounded-full"
                    style={{
                      top: p.top,
                      left: p.left,
                      width: p.size,
                      height: p.size,
                      background: p.color,
                      boxShadow:
                        `0 0 10px 3px ${p.color}99`,
                      animationDelay: p.delay,
                      animationDuration: p.duration
                    }}
                  />

                ))}

                {/* Floating tech icon chips */}
                {ICONS.map((ic, i) => {

                  const Icon = ic.Icon;

                  return (
                    <div
                      key={i}
                      className="absolute"
                      style={{
                        top: ic.top,
                        left: ic.left,
                        transform:
                          `translate(-50%, -50%) translateZ(${ic.z}px)`
                      }}
                    >

                      <div
                        className="vs-icon-float w-12 h-12 rounded-2xl bg-white/95 border border-white/70 flex items-center justify-center"
                        style={{
                          boxShadow:
                            '0 12px 30px -8px rgba(15,23,42,0.35)',
                          animationDelay: ic.delay,
                          animationDuration: ic.duration
                        }}
                      >

                        <Icon
                          size={20}
                          style={{
                            color: ic.color
                          }}
                        />

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>

          {/* RIGHT: Login Card */}
          <div className="lg:pl-12">

            <div
              ref={loginCardRef}
              onMouseMove={handleCardMouseMove}
              className="relative p-8 lg:p-10 rounded-[2.5rem] bg-white/80 backdrop-blur-xl overflow-hidden border border-white/50"
              style={{
                boxShadow:
                  '0 40px 80px -20px rgba(0, 0, 0, 0.08)'
              }}
            >

              {/* Spotlight Effect */}
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
                style={{
                  background:
                    `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(45, 45, 45, 0.04), transparent 60%)`
                }}
              />

              <div className="relative z-10 space-y-6">

                {/* SOCIAL AUTH BUTTONS */}
                <div className="space-y-3">

                  <button
                    type="button"
                    onClick={onGoogleAuth}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-white border border-[#E0E0E0] text-[#2D2D2D] text-sm font-bold hover:bg-[#F9F9F7] hover:border-[#2D2D2D]/30 hover:shadow-md transition-all disabled:opacity-60"
                  >

                    <GoogleIcon size={20} />

                    Continue with Google

                  </button>

                  <button
                    type="button"
                    onClick={onGithubAuth}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-white border border-[#E0E0E0] text-[#2D2D2D] text-sm font-bold hover:bg-[#F9F9F7] hover:border-[#2D2D2D]/30 hover:shadow-md transition-all disabled:opacity-60"
                  >

                    <GitBranch size={20} />

                    Continue with GitHub

                  </button>

                </div>

                <div className="relative flex items-center gap-4">

                  <div className="h-px bg-[#E0E0E0] flex-1" />

                  <span className="text-[10px] text-[#9A9A9A] font-bold uppercase tracking-wider">
                    Or use credentials
                  </span>

                  <div className="h-px bg-[#E0E0E0] flex-1" />

                </div>

                {/* AUTH TABS */}
                <div className="flex p-1 rounded-full bg-[#F0F0EB] border border-[#E0E0E0]">

                  <button
                    type="button"
                    onClick={() =>
                      setAuthTab('register')
                    }
                    className={`flex-1 py-2.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                      authTab === 'register'
                        ? 'bg-[#2D2D2D] text-[#F5F5F0] shadow-md'
                        : 'text-[#6B6B6B] hover:text-[#2D2D2D]'
                    }`}
                  >
                    New? Create Account
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setAuthTab('login')
                    }
                    className={`flex-1 py-2.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                      authTab === 'login'
                        ? 'bg-[#2D2D2D] text-[#F5F5F0] shadow-md'
                        : 'text-[#6B6B6B] hover:text-[#2D2D2D]'
                    }`}
                  >
                    Existing? Log In
                  </button>

                </div>

                {/* LOGIN FORM */}
                {authTab === 'login' ? (

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >

                    <div className="space-y-1.5">

                      <label className="text-xs font-bold text-[#2D2D2D] uppercase tracking-wide ml-1">
                        Email or Phone Number
                      </label>

                      <div className="relative">

                        <input
                          type="text"
                          required
                          value={identifier}
                          onChange={(e) =>
                            setIdentifier(e.target.value)
                          }
                          className="w-full pl-12 pr-5 py-4 rounded-xl bg-[#FAFAF8] border border-[#E0E0E0] text-[#2D2D2D] placeholder-[#AAAAAA] focus:outline-none focus:border-[#2D2D2D] focus:ring-1 focus:ring-[#2D2D2D] transition-all font-medium"
                          placeholder="Email or phone number"
                        />

                        <User
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9A9A]"
                        />

                      </div>

                    </div>

                    <div className="space-y-1.5">

                      <label className="text-xs font-bold text-[#2D2D2D] uppercase tracking-wide ml-1">
                        Password
                      </label>

                      <div className="relative">

                        <input
                          type={
                            showPassword
                              ? 'text'
                              : 'password'
                          }
                          required
                          value={password}
                          onChange={(e) =>
                            setPassword(e.target.value)
                          }
                          className="w-full px-5 py-4 pr-12 rounded-xl bg-[#FAFAF8] border border-[#E0E0E0] text-[#2D2D2D] placeholder-[#AAAAAA] focus:outline-none focus:border-[#2D2D2D] focus:ring-1 focus:ring-[#2D2D2D] transition-all font-medium"
                          placeholder="••••••••"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(
                              !showPassword
                            )
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A9A9A] hover:text-[#2D2D2D]"
                        >

                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}

                        </button>

                      </div>

                      {/* FORGOT PASSWORD BUTTON */}
                      <div className="flex justify-end pt-2">

                        <button
                          type="button"
                          className="flex items-center gap-2 text-xs font-bold text-[#2D2D2D] hover:text-black transition-colors bg-[#F0F0EB] px-3 py-1.5 rounded-lg border border-[#E0E0E0]"
                        >

                          <Lock size={12} />

                          Forgot Password?

                        </button>

                      </div>

                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 mt-2 rounded-xl bg-[#2D2D2D] text-[#F5F5F0] font-bold text-sm tracking-wide disabled:opacity-70 hover:bg-black hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                    >

                      {isLoading
                        ? 'Signing In...'
                        : 'Secure Sign In'}

                    </button>

                  </form>

                ) : (

                  /* REGISTER FORM */
                  <form
                    onSubmit={handleRegisterSubmit}
                    className="space-y-4"
                  >

                    {/* Full Name */}
                    <div className="space-y-1.5">

                      <label className="text-xs font-bold text-[#2D2D2D] uppercase tracking-wide ml-1">
                        Full Name
                      </label>

                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) =>
                          setRegName(e.target.value)
                        }
                        className="w-full px-5 py-4 rounded-xl bg-[#FAFAF8] border border-[#E0E0E0] text-[#2D2D2D] focus:outline-none focus:border-[#2D2D2D] transition-all"
                        placeholder="Your full name"
                      />

                    </div>

                    {/* Email / Phone */}
                    <div className="space-y-1.5">

                      <label className="text-xs font-bold text-[#2D2D2D] uppercase tracking-wide ml-1">
                        {authMethod === 'email'
                          ? 'Email Address'
                          : 'Phone Number'}
                      </label>

                      <div className="flex p-1 rounded-lg bg-[#F0F0EB] border border-[#E0E0E0] mb-2 w-fit">

                        <button
                          type="button"
                          onClick={() => {
                            setAuthMethod('email');
                            setRegError('');
                            setRegIdentifier('');
                          }}
                          className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${
                            authMethod === 'email'
                              ? 'bg-white text-[#2D2D2D] shadow-sm'
                              : 'text-[#6B6B6B]'
                          }`}
                        >
                          Email
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setAuthMethod('phone');
                            setRegError('');
                            setRegIdentifier('');
                          }}
                          className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${
                            authMethod === 'phone'
                              ? 'bg-white text-[#2D2D2D] shadow-sm'
                              : 'text-[#6B6B6B]'
                          }`}
                        >
                          Phone
                        </button>

                      </div>

                      <input
                        type={
                          authMethod === 'email'
                            ? 'email'
                            : 'tel'
                        }
                        required
                        value={regIdentifier}
                        onChange={(e) =>
                          setRegIdentifier(
                            e.target.value
                          )
                        }
                        className="w-full px-5 py-4 rounded-xl bg-[#FAFAF8] border border-[#E0E0E0] text-[#2D2D2D] focus:outline-none focus:border-[#2D2D2D] transition-all"
                        placeholder={
                          authMethod === 'email'
                            ? 'you@company.com'
                            : '+91 98765 43210'
                        }
                      />

                    </div>

                    {/* Password + Confirm */}
                    <div className="grid grid-cols-2 gap-3">

                      <input
                        type="password"
                        required
                        value={regPassword}
                        onChange={(e) =>
                          setRegPassword(
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-4 rounded-xl bg-[#FAFAF8] border border-[#E0E0E0] text-[#2D2D2D] focus:outline-none focus:border-[#2D2D2D] transition-all"
                        placeholder="Password"
                      />

                      <input
                        type="password"
                        required
                        value={regConfirm}
                        onChange={(e) =>
                          setRegConfirm(
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-4 rounded-xl bg-[#FAFAF8] border border-[#E0E0E0] text-[#2D2D2D] focus:outline-none focus:border-[#2D2D2D] transition-all"
                        placeholder="Confirm"
                      />

                    </div>

                    {/* Terms & Privacy */}
                    <label className="flex items-start gap-2.5 cursor-pointer">

                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) =>
                          setAgreedToTerms(
                            e.target.checked
                          )
                        }
                        className="mt-0.5 w-4 h-4 rounded border-[#D0D0D0] text-[#2D2D2D] focus:ring-[#2D2D2D]"
                      />

                      <span className="text-[11px] text-[#6B6B6B] leading-relaxed">

                        I agree to the{' '}

                        <button
                          type="button"
                          onClick={(e) =>
                            e.preventDefault()
                          }
                          className="font-bold text-[#2D2D2D] hover:underline"
                        >
                          Terms of Service
                        </button>

                        {' '}and{' '}

                        <button
                          type="button"
                          onClick={(e) =>
                            e.preventDefault()
                          }
                          className="font-bold text-[#2D2D2D] hover:underline"
                        >
                          Privacy Policy
                        </button>

                      </span>

                    </label>

                    {/* Registration Error */}
                    {regError && (
                      <p className="text-xs font-medium text-red-600">
                        {regError}
                      </p>
                    )}

                    {/* Create Account */}
                    <button
                      type="submit"
                      disabled={
                        isRegistering ||
                        isLoading
                      }
                      className="w-full py-4 mt-2 rounded-xl bg-[#2D2D2D] text-[#F5F5F0] font-bold text-sm tracking-wide disabled:opacity-70 hover:bg-black hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                    >

                      {isRegistering
                        ? 'Creating Account...'
                        : 'Create Account'}

                    </button>

                  </form>

                )}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#2D2D2D]/10 bg-[#F5F5F0] py-8">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-2">

            <span
              className="font-bold text-[#2D2D2D]"
              style={{
                fontFamily: 'Cinzel, serif'
              }}
            >
              i-Edge
            </span>

            <span className="text-xs text-[#6B6B6B]">
              © 2026 All rights reserved.
            </span>

          </div>

          <div className="flex gap-6 text-xs font-medium text-[#6B6B6B]">

            <a
              href="#"
              className="hover:text-[#2D2D2D]"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="hover:text-[#2D2D2D]"
            >
              Terms of Service
            </a>

            <a
              href="#"
              className="hover:text-[#2D2D2D]"
            >
              Contact Support
            </a>

          </div>

        </div>

      </footer>

    </div>
  );
}