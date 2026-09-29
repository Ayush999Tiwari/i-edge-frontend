import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Car,
  ScanFace,
  Flame,
  Users,
  TriangleAlert,
  Camera,
  Cpu,
  Mail,
  Database,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const C = {
  bg: "#F5F5F0",
  ink: "#2D2D2D",
  inkSoft: "#555",
  inkFaint: "#777",
  border: "#DDD8CE",
  card: "#FCFCF8",
  accent: "#2D2D2D",
};
const FLOW = [
  {
    Icon: Camera,
    title: "Live Camera Feed",
    desc: "CCTV cameras continuously stream video to the i-Edge AI device.",
  },
  {
    Icon: Cpu,
    title: "AI Detection Engine",
    desc: "YOLO models analyze every frame and detect vehicles, faces, fire and crowd events.",
  },
  {
    Icon: TriangleAlert,
    title: "Critical Event Detection",
    desc: "Only meaningful events are extracted, reducing false alarms and unnecessary recordings.",
  },
  {
    Icon: Mail,
    title: "Instant Email Alerts",
    desc: "Snapshots, timestamps and alert details are immediately sent to your security team.",
  },
];

export default function HowItWorks() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: C.bg, color: C.ink }}
    >
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full blur-3xl opacity-30 bg-stone-300" />
        <div className="absolute -bottom-32 -left-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-20 bg-stone-400" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 font-semibold hover:opacity-70 transition"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2D2D2D] flex items-center justify-center">
              <span className="text-lg font-semibold text-[#F5F5F0]" style={{ fontFamily: 'Cinzel, serif' }}>iE</span>
            </div>
            <h2 className="text-2xl font-bold tracking-wide">i-Edge</h2>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-8 pb-24">
          {/* Hero */}
          <section className="text-center pt-10 pb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border shadow-sm text-xs font-bold uppercase tracking-[0.2em]">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              AI Vision Platform
            </div>

            <h1 className="mt-8 text-6xl md:text-8xl font-black leading-none">
              HOW
              <br />
              <span className="text-stone-500">i-EDGE WORKS</span>
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-lg text-stone-600 leading-relaxed">
              Transform ordinary CCTV cameras into an intelligent AI security
              system capable of detecting vehicles, faces, fire, crowds and
              suspicious activity in real time.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <div className="px-4 py-2 rounded-full bg-white border font-semibold">
                98% Accuracy
              </div>
              <div className="px-4 py-2 rounded-full bg-white border font-semibold">
                Real-Time Detection
              </div>
              <div className="px-4 py-2 rounded-full bg-white border font-semibold">
                Instant Email Alerts
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="mb-24">
  <div className="flex items-center gap-3 mb-8">
    <div className="w-10 h-10 rounded-xl bg-[#2D2D2D] text-white flex items-center justify-center">
      <Shield size={20} />
    </div>
    <h2 className="text-3xl font-bold">Our AI Services</h2>
  </div>

  <div className="grid lg:grid-cols-3 gap-6">

    {/* AI VIDEO SURVEILLANCE */}
    <div
      className="group rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      style={{ background: C.card, borderColor: C.border }}
    >
      <div className="grid grid-cols-2 h-48 gap-[2px] bg-stone-200">

        {/* Fire */}
        <div className="relative overflow-hidden">
          <img
            src="6YgUnSkjoznrwtXRvByCuwBkR80sFCpowgJAH4TrYwPv6kgDKrRehfm32MxVWF48q58-FdjmVpRpGDDfyyUOC5-gt74VS_CC5eRoyW1TqijVcNlg1GBLz_3BDUg6VrAy4JfYcOyO8k6NxfXrCZB3mSfZQjLNKg2p1YLsySojj-U.jpeg"
            alt="Fire Detection"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <span className="text-[11px] font-medium text-stone-800">
    Fire detection
  </span>
        </div>

        {/* Crowd */}
        <div className="relative overflow-hidden">
          <img
            src="/hQUDYSp23cDe8-uNiICOPSd6iiXWPqQJtH_MFtLVytDBMD5Gbnygmi7hvyqO7Scz_F5pTgaQ9xFTUlTT7CGGihlVuXiTHygvd-hI1bN6vWb-sltwQ7yVLNENGCFJsw-jhq7J3-2WIc4IMIwYZNQoW_Jdwy_SL_hhuE0Bsvgs0nk.jpeg"
            alt="Crowd Detection"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <span className="text-[11px] font-medium text-stone-800">
    Crowd detection
  </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          
          <h3 className="text-xl font-bold">AI Video Surveillance</h3>
        </div>

        <p className="text-sm text-stone-600 leading-relaxed mb-5">
          Monitors CCTV feeds 24/7 and instantly detects fire, crowd gathering,
          intrusion, and suspicious activities using real-time AI vision.
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
            Fire
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
            Crowd
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-100">
            Intrusion
          </span>
        </div>
      </div>
    </div>

    {/* VEHICLE DETECTION */}
    <div
      className="group rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      style={{ background: C.card, borderColor: C.border }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src="/bElbGk5uxamcrkpHJpHpOp1BS4sv_Z1iosvyDH1enfy-y3JJBUfcKUh-9MRgyaS6Ln204GHhE8KODsv1EMraV0UfeCCKlcL0mL7r05rgIiMkvZ8kEUIYRHx2XXezplKvDYV9FeZ2EDtb0z7Mv5hJM2z7IYeuU8Ru-vrC6SFyJr8.jpeg"
          alt="Vehicle Detection"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white/95 flex items-center justify-center">
          <Car size={24} className="text-[#2D2D2D]" />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">Vehicle Detection</h3>
        <p className="text-sm text-stone-600 leading-relaxed mb-5">
          Detects cars, trucks, buses and motorcycles with automatic vehicle
          counting and intelligent traffic monitoring.
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
            Cars
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
            Trucks
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
            Buses
          </span>
        </div>
      </div>
    </div>

    {/* FACE DETECTION */}
    <div
      className="group rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      style={{ background: C.card, borderColor: C.border }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src="/Cy9wz9F6AIufshub5My6RjC9lFy5vA4Oi5qDmVUN4m1bVWnKzAImQS7cAmAfuauzfIKLKNkClPjBY9SVMAiI1YePOGCAD0l3Dln8T3Arw7SaNrWEcnpeZ5BljB-4po9O8hbHpIOjqjuBtiX7bXQ8kkjtGcjMeYfWauhfPzQMa0Q.jpeg"
          alt="Face Detection Access"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white/95 flex items-center justify-center">
          <ScanFace size={24} className="text-[#2D2D2D]" />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">Face Detection Access</h3>
        <p className="text-sm text-stone-600 leading-relaxed mb-5">
          Recognizes authorized personnel, records entry logs, and enhances
          workplace security through facial recognition.
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
            Employees
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
            Attendance
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
            Access
          </span>
        </div>
      </div>
    </div>

  </div>
</section>

          {/* Workflow */}
          <section className="mb-24">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#2D2D2D] text-white flex items-center justify-center">
                <Cpu size={20} />
              </div>
              <h2 className="text-3xl font-bold">
                End-to-End AI Processing
              </h2>
            </div>

            <div className="rounded-[32px] border bg-white p-8 shadow-sm">
              {FLOW.map((step, index) => (
                <div key={step.title}>
                  <div className="flex gap-6 items-start">
                    <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center flex-shrink-0">
                      <step.Icon size={28} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold tracking-wider text-stone-400">
                          0{index + 1}
                        </span>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                      </div>

                      <p className="text-stone-600 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {index !== FLOW.length - 1 && (
                    <div className="ml-7 my-5 h-8 border-l border-dashed border-stone-300" />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Alert Cards */}
          <section className="mb-24">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#2D2D2D] text-white flex items-center justify-center">
                <Flame size={20} />
              </div>
              <h2 className="text-3xl font-bold">Real-Time Smart Alerts</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-3xl p-8 bg-gradient-to-br from-red-50 to-white border">
                <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mb-6">
                  <Flame className="text-red-600" size={30} />
                </div>

                <h3 className="text-2xl font-bold mb-3">Fire Detection</h3>
                <p className="text-stone-600 mb-5">
                  AI immediately detects flames or smoke and sends an email with
                  the captured frame, timestamp and camera location.
                </p>

                <div className="inline-flex items-center gap-2 text-red-600 font-semibold">
                  <Mail size={16} />
                  Email sent instantly
                </div>
              </div>

              <div className="rounded-3xl p-8 bg-gradient-to-br from-amber-50 to-white border">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mb-6">
                  <Users className="text-amber-600" size={30} />
                </div>

                <h3 className="text-2xl font-bold mb-3">Crowd Monitoring</h3>
                <p className="text-stone-600 mb-5">
                  Detects unusual crowd gathering or suspicious movement and
                  automatically notifies your security personnel.
                </p>

                <div className="inline-flex items-center gap-2 text-amber-600 font-semibold">
                  <TriangleAlert size={16} />
                  Suspicious activity alert
                </div>
              </div>
            </div>
          </section>

          {/* Detection Output */}
          <section className="mb-24">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#2D2D2D] text-white flex items-center justify-center">
                <Database size={20} />
              </div>
              <h2 className="text-3xl font-bold">
                What Happens After Detection?
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {[
                {
                  icon: Camera,
                  title: "Capture Frame",
                  desc: "Save image",
                },
                {
                  icon: Car,
                  title: "Identify Object",
                  desc: "Vehicle / Face",
                },
                {
                  icon: Database,
                  title: "Store Metadata",
                  desc: "Time & Records",
                },
                {
                  icon: Mail,
                  title: "Notify User",
                  desc: "Email Alert",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl p-6 bg-white border hover:shadow-lg transition"
                >
                  <item.icon size={30} className="mb-4" />
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-stone-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section>
            <div className="rounded-[36px] overflow-hidden bg-[#2D2D2D] text-white p-10 md:p-14 relative">
              <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />

              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-stone-400 font-bold mb-5">
                  Intelligent Security Starts Here
                </div>

                <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
                  One Device.
                  <br />
                  Every AI Service.
                </h2>

                <p className="text-stone-300 text-lg leading-relaxed mb-8">
                  Deploy i-Edge once and activate vehicle detection, AI
                  surveillance and facial access management from a single
                  intelligent platform.
                </p>

                <button
                  onClick={() => navigate("/login")}
                  className="bg-white text-[#2D2D2D] px-7 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition"
                >
                  Get Started
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}