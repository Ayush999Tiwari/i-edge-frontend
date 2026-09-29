import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  Plane,
  Train,
  GraduationCap,
  Briefcase,
  ShoppingBag,
  Hospital,
  Landmark,
  MapPin,
  Factory,
  Home,
  CheckCircle2,
  Globe,
  Cpu,
  Lock,
  Activity,
  Eye,
  Zap,
  Clock,
  Camera,
  ScanLine,
  BellRing,
  Database,
  FileSearch,
  Users,
  Car,
  Building2,
  CircleAlert,
} from "lucide-react";

type Industry = {
  id: number;
  title: string;
  icon: React.ElementType;
  short: string;
  useCases: string[];
  value: string;
  valueLevel: "Very High" | "High" | "Moderate";
  examples: string;
};

const INDUSTRIES: Industry[] = [
  {
    id: 1,
    title: "Smart Cities",
    icon: Landmark,
    short: "City-wide traffic intelligence, vehicle monitoring and public-safety visibility.",
    useCases: ["Traffic monitoring", "ANPR / number plates", "Incident investigation", "Restricted-zone monitoring"],
    value: "Helps central teams understand vehicle movement across important roads and public areas without relying only on manual monitoring.",
    valueLevel: "Very High",
    examples: "Traffic corridors, intersections, municipal surveillance and public parking.",
  },
  {
    id: 2,
    title: "Highways & Toll Roads",
    icon: MapPin,
    short: "Automated vehicle identification and movement monitoring across road networks.",
    useCases: ["Vehicle identification", "Plate recognition", "Blacklisted vehicle alerts", "Entry / exit records"],
    value: "Useful where thousands of vehicle movements need to be recorded, searched and investigated quickly.",
    valueLevel: "Very High",
    examples: "Toll plazas, checkpoints, highway entries and controlled road zones.",
  },
  {
    id: 3,
    title: "Residential Societies",
    icon: Home,
    short: "Smarter gate operations for residents, visitors, deliveries and security teams.",
    useCases: ["Visitor verification", "Vehicle logs", "Gate monitoring", "Suspicious vehicle alerts"],
    value: "Reduces dependence on manual registers and gives security teams a searchable digital record of vehicle activity.",
    valueLevel: "High",
    examples: "Gated communities, apartments, residential townships and private campuses.",
  },
  {
    id: 4,
    title: "Manufacturing & Plants",
    icon: Factory,
    short: "Monitor fleet movement, plant gates, loading areas and restricted zones.",
    useCases: ["Fleet monitoring", "Gate automation", "Perimeter surveillance", "Incident evidence"],
    value: "Helps plant security and operations teams track vehicles entering, leaving and moving through sensitive areas.",
    valueLevel: "Very High",
    examples: "Factories, manufacturing plants, industrial estates and production campuses.",
  },
  {
    id: 5,
    title: "Logistics & Warehousing",
    icon: Truck,
    short: "Improve visibility across truck gates, yards, docks and cargo movement.",
    useCases: ["Truck identification", "Gate entry", "Yard monitoring", "Dwell-time visibility"],
    value: "Useful for high-volume facilities where manual vehicle logging can create delays, errors and limited traceability.",
    valueLevel: "Very High",
    examples: "Warehouses, distribution centers, logistics parks and freight terminals.",
  },
  {
    id: 6,
    title: "Airports",
    icon: Plane,
    short: "Monitor service vehicles and vehicle movement around controlled operational areas.",
    useCases: ["Vehicle identification", "Restricted-zone monitoring", "Ground-vehicle tracking", "Security investigation"],
    value: "Provides an additional computer-vision layer for monitoring vehicles in areas where movement needs to be controlled and auditable.",
    valueLevel: "High",
    examples: "Airport service roads, parking areas, logistics zones and controlled access points.",
  },
  {
    id: 7,
    title: "Railway Stations",
    icon: Train,
    short: "Vehicle surveillance for station roads, parking areas and controlled access zones.",
    useCases: ["Parking monitoring", "Vehicle identification", "Drop-off monitoring", "Incident review"],
    value: "Helps security teams search vehicle activity and investigate incidents around busy station premises.",
    valueLevel: "High",
    examples: "Station parking, approach roads, staff areas and service entrances.",
  },
  {
    id: 8,
    title: "Universities & Campuses",
    icon: GraduationCap,
    short: "Manage campus vehicles, visitors, staff parking and restricted areas.",
    useCases: ["Campus access", "Visitor vehicles", "Parking monitoring", "Security alerts"],
    value: "Creates a digital history of vehicle movement that security and administration teams can review when needed.",
    valueLevel: "High",
    examples: "Universities, colleges, research campuses and large educational institutions.",
  },
  {
    id: 9,
    title: "Corporate Parks",
    icon: Briefcase,
    short: "Vehicle intelligence for employee parking, visitors and multi-building campuses.",
    useCases: ["Employee parking", "Visitor verification", "Gate monitoring", "Vehicle search"],
    value: "Helps facility and security teams manage large daily vehicle volumes with better visibility and searchable records.",
    valueLevel: "High",
    examples: "IT parks, business campuses, corporate offices and commercial complexes.",
  },
  {
    id: 10,
    title: "Shopping Malls",
    icon: ShoppingBag,
    short: "Understand and monitor vehicle activity across parking and entry zones.",
    useCases: ["Parking analytics", "Vehicle identification", "Entry / exit logs", "Security monitoring"],
    value: "Useful for large parking facilities where vehicle movement, security and operational visibility matter every day.",
    valueLevel: "High",
    examples: "Shopping malls, retail centers, entertainment complexes and large parking facilities.",
  },
  {
    id: 11,
    title: "Hospitals",
    icon: Hospital,
    short: "Monitor emergency access, ambulance movement, staff parking and hospital gates.",
    useCases: ["Ambulance access", "Gate monitoring", "Parking management", "Incident review"],
    value: "Can improve visibility around critical entrances and help security teams quickly investigate vehicle-related incidents.",
    valueLevel: "Very High",
    examples: "Hospitals, medical campuses, emergency entrances and healthcare facilities.",
  },
  {
    id: 12,
    title: "Government & Checkpoints",
    icon: ShieldCheck,
    short: "Controlled vehicle monitoring for checkpoints and sensitive government facilities.",
    useCases: ["Vehicle verification", "Restricted access", "Plate search", "Digital audit trail"],
    value: "Particularly useful where vehicle entry records and rapid investigation are important security requirements.",
    valueLevel: "Very High",
    examples: "Government facilities, checkpoints, controlled premises and sensitive infrastructure.",
  },
];

const MISSION_CRITICAL = [
  {
    title: "Defense & Restricted Facilities",
    desc: "Monitor vehicles approaching or entering controlled areas and maintain searchable surveillance evidence for security teams.",
    icon: Lock,
  },
  {
    title: "Mining Operations",
    desc: "Track heavy vehicles, transport fleets and movement across large industrial sites where manual monitoring is difficult.",
    icon: Truck,
  },
  {
    title: "Oil & Gas Facilities",
    desc: "Add automated vehicle monitoring around critical infrastructure, gates, service roads and restricted operational zones.",
    icon: Factory,
  },
  {
    title: "Critical Infrastructure",
    desc: "Create a centralized layer of vehicle intelligence for facilities where access control, monitoring and incident response are important.",
    icon: ShieldCheck,
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Connect Existing Cameras",
    desc: "Use compatible CCTV or IP-camera feeds as the visual input. The platform can work around existing surveillance infrastructure instead of requiring a completely new camera system.",
    icon: Camera,
  },
  {
    step: "02",
    title: "AI Analyzes the Video",
    desc: "Computer-vision models process the video to identify vehicles, number plates and configured surveillance events.",
    icon: Cpu,
  },
  {
    step: "03",
    title: "Identify & Record",
    desc: "Relevant detections are converted into structured records so teams can review vehicle type, plate information, timestamps and surveillance events.",
    icon: ScanLine,
  },
  {
    step: "04",
    title: "Alert the Right Person",
    desc: "When a configured critical event is detected, the system can trigger an alert for the currently responsible user instead of relying on one fixed recipient.",
    icon: BellRing,
  },
  {
    step: "05",
    title: "Search & Investigate",
    desc: "Security and operations teams can use the recorded evidence to understand what happened, when it happened and which vehicle or event was involved.",
    icon: FileSearch,
  },
];

const BENEFITS = [
  {
    icon: Zap,
    title: "Less Manual Monitoring",
    desc: "AI can continuously analyze camera footage and surface relevant events for human review.",
  },
  {
    icon: Eye,
    title: "Better Operational Visibility",
    desc: "Turn camera footage into structured vehicle and event information that teams can actually use.",
  },
  {
    icon: Lock,
    title: "Searchable Audit Trail",
    desc: "Maintain digital records of vehicle activity and important surveillance events.",
  },
  {
    icon: BellRing,
    title: "Faster Response",
    desc: "Configured critical events can trigger immediate alerts so teams do not have to watch every frame manually.",
  },
  {
    icon: Globe,
    title: "Multiple Deployment Environments",
    desc: "The same core platform can support campuses, plants, logistics facilities, roads and controlled infrastructure.",
  },
  {
    icon: Database,
    title: "Centralized Intelligence",
    desc: "Bring detection results, surveillance events and operational records into one system for easier review.",
  },
];

const DEPLOYMENT_CATS = [
  { name: "Urban Infrastructure", icon: Landmark },
  { name: "Industrial Plants", icon: Factory },
  { name: "Transportation Hubs", icon: Train },
  { name: "Education Campuses", icon: GraduationCap },
  { name: "Healthcare Zones", icon: Hospital },
  { name: "Logistics Parks", icon: Truck },
  { name: "Corporate Campuses", icon: Building2 },
  { name: "Critical Infrastructure", icon: ShieldCheck },
];

const VALUE_LEVEL_STYLES = {
  "Very High": "bg-emerald-50 text-emerald-700 border-emerald-200",
  High: "bg-blue-50 text-blue-700 border-blue-200",
  Moderate: "bg-amber-50 text-amber-700 border-amber-200",
};

const SectionHeading = ({
  children,
  center = false,
}: {
  children: React.ReactNode;
  center?: boolean;
}) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`text-3xl md:text-4xl font-bold text-slate-900 mb-4 ${
      center ? "text-center" : ""
    }`}
  >
    {children}
  </motion.h2>
);

const SectionSub = ({
  children,
  center = false,
}: {
  children: React.ReactNode;
  center?: boolean;
}) => (
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1 }}
    className={`text-lg text-slate-600 max-w-3xl leading-relaxed ${
      center ? "mx-auto text-center mb-12" : "mb-8"
    }`}
  >
    {children}
  </motion.p>
);

const StepCard = ({
  item,
  index,
}: {
  item: (typeof HOW_IT_WORKS)[number];
  index: number;
}) => {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="relative bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Icon size={24} />
        </div>
        <span className="text-sm font-black text-slate-300 tracking-widest">
          {item.step}
        </span>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
    </motion.div>
  );
};

export default function ExploreUseCases() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-10%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(1100%); opacity: 0; }
        }

        @keyframes pulseRing {
          0%, 100% { transform: scale(0.96); opacity: 0.55; }
          50% { transform: scale(1.04); opacity: 1; }
        }
      `}</style>

      {/* HERO */}
      <section className="relative pt-32 pb-24 px-6 md:px-12 lg:px-24 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-l from-blue-50 via-cyan-50/40 to-transparent pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-7"
            >
              <ArrowLeft size={16} /> Back to Detection
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
              <Activity size={14} />
              AI Video Intelligence
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.05] mb-6">
              Turn Camera Footage Into{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Actionable Intelligence
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-7 leading-relaxed max-w-2xl">
              This platform uses computer vision to understand vehicle and
              surveillance activity from video. Instead of security teams
              watching every camera continuously, AI can detect relevant
              activity, record it, and help the right people respond faster.
            </p>

            <p className="text-base text-slate-500 mb-9 max-w-2xl leading-relaxed">
              It can be deployed across roads, factories, warehouses,
              campuses, hospitals, parking facilities and other controlled
              environments where vehicle visibility and incident monitoring
              matter.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate(-1)}
                className="px-8 py-4 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Try Detection
              </button>
              <a
                href="#how-it-works"
                className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-full font-semibold hover:border-blue-300 hover:text-blue-600 transition-all"
              >
                See How It Works
              </a>
            </div>
          </motion.div>

          {/* CSS-only product visualization — no image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200 bg-slate-950 aspect-[4/3]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(37,99,235,0.20),transparent_55%)]" />

              <div className="absolute inset-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-white text-xs font-mono tracking-widest">
                      LIVE ANALYSIS
                    </span>
                  </div>
                  <span className="text-slate-500 text-xs font-mono">
                    AI ENGINE
                  </span>
                </div>

                <div className="relative h-[calc(100%-57px)] flex items-center justify-center">
                  <div className="absolute inset-x-10 top-1/2 h-px bg-blue-400/30" />
                  <div className="absolute inset-y-10 left-1/2 w-px bg-blue-400/20" />

                  <div className="relative w-52 h-32 border-2 border-blue-400/80 rounded-xl shadow-[0_0_40px_rgba(59,130,246,0.18)]">
                    <div className="absolute -top-3 left-5 px-2 py-1 bg-blue-500 text-white text-[10px] font-bold rounded">
                      VEHICLE
                    </div>
                    <div className="absolute -bottom-3 right-5 px-2 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded">
                      DETECTED
                    </div>
                    <div className="absolute left-4 right-4 top-1/2 h-px bg-blue-300/50" />
                    <div className="absolute top-4 bottom-4 left-1/2 w-px bg-blue-300/30" />
                  </div>

                  <div
                    className="absolute left-0 right-0 top-0 h-1 bg-cyan-400/80 shadow-[0_0_18px_rgba(34,211,238,0.9)]"
                    style={{ animation: "scan 3s ease-in-out infinite" }}
                  />

                  <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
                    {[
                      ["Vehicles", "12"],
                      ["Plates", "09"],
                      ["Alerts", "02"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="bg-black/30 border border-white/10 rounded-lg px-3 py-2"
                      >
                        <div className="text-[10px] text-slate-500 uppercase">
                          {label}
                        </div>
                        <div className="text-white font-bold">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT THE PLATFORM ACTUALLY DOES */}
      <section className="py-24 px-6 md:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <SectionHeading center>
            What Does the Platform Actually Do?
          </SectionHeading>
          <SectionSub center>
            The goal is simple: convert raw CCTV/video into information that
            security and operations teams can act on.
          </SectionSub>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Car,
                title: "Vehicle Detection",
                desc: "Identify vehicles appearing in a camera view and build a record of relevant movement.",
              },
              {
                icon: ScanLine,
                title: "Number Plate Recognition",
                desc: "Read available vehicle plate information and associate it with the detection event.",
              },
              {
                icon: CircleAlert,
                title: "Event Detection",
                desc: "Monitor configured surveillance events such as fire, crowding and violence.",
              },
              {
                icon: FileSearch,
                title: "Evidence & Review",
                desc: "Keep timestamps, detection results and surveillance evidence available for investigation.",
              },
            ].map((item, idx) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.07 }}
                  className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading center>How It Works</SectionHeading>
          <SectionSub center>
            From camera input to an actionable alert, the workflow is designed
            around the way security and operations teams already work.
          </SectionSub>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
            {HOW_IT_WORKS.map((item, index) => (
              <StepCard key={item.step} item={item} index={index} />
            ))}
          </div>

          <div className="mt-12 max-w-4xl mx-auto bg-slate-950 rounded-3xl p-7 md:p-9 text-white border border-slate-800">
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold">
              {[
                ["Camera", Camera],
                ["AI Detection", Cpu],
                ["Structured Data", Database],
                ["Alert", BellRing],
                ["Investigation", FileSearch],
              ].map(([label, Icon], index) => (
                <React.Fragment key={label as string}>
                  <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
                    <Icon size={17} className="text-blue-400" />
                    <span>{label as string}</span>
                  </div>
                  {index < 4 && (
                    <span className="text-slate-600 hidden md:block">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-24 px-6 md:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <SectionHeading center>Where Is It Useful?</SectionHeading>
          <SectionSub center>
            Different industries use the same core capability for different
            operational problems. The value is highest where there is a large
            volume of vehicle movement, controlled access, security risk or a
            need for searchable video evidence.
          </SectionSub>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((ind, idx) => {
              const Icon = ind.icon;

              return (
                <motion.div
                  key={ind.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 6) * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <Icon size={24} />
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${VALUE_LEVEL_STYLES[ind.valueLevel]}`}
                    >
                      {ind.valueLevel} value
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {ind.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed mb-5">
                      {ind.short}
                    </p>

                    <div className="mb-5">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                        Typical use cases
                      </div>
                      <div className="space-y-2">
                        {ind.useCases.map((useCase) => (
                          <div
                            key={useCase}
                            className="flex items-center gap-2 text-sm text-slate-700"
                          >
                            <CheckCircle2
                              size={15}
                              className="text-emerald-500 shrink-0"
                            />
                            {useCase}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-5 border-t border-slate-100">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Why it matters
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {ind.value}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                      <MapPin size={13} />
                      {ind.examples}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INDUSTRY VALUE EXPLAINED */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading center>
            Where Does It Create the Most Operational Value?
          </SectionHeading>
          <SectionSub center>
            "Useful" depends on the environment. A facility with thousands of
            daily vehicle movements has a different need from a small office.
            This is how the platform maps to common operational requirements.
          </SectionSub>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="hidden md:grid grid-cols-[1.1fr_1fr_1.5fr_1.5fr] bg-slate-950 text-white text-xs font-bold uppercase tracking-wider">
              <div className="p-5">Environment</div>
              <div className="p-5">Value</div>
              <div className="p-5">Primary Need</div>
              <div className="p-5">Typical Outcome</div>
            </div>

            {[
              {
                env: "High-volume logistics",
                value: "Very High",
                need: "Fast vehicle identification and searchable gate records",
                outcome: "Better gate visibility, fewer manual checks and faster investigations",
              },
              {
                env: "Industrial plants",
                value: "Very High",
                need: "Controlled access and perimeter visibility",
                outcome: "Stronger monitoring of vehicle movement across sensitive areas",
              },
              {
                env: "Smart city roads",
                value: "Very High",
                need: "Large-scale traffic and incident visibility",
                outcome: "More structured vehicle intelligence for traffic and security teams",
              },
              {
                env: "Hospitals",
                value: "Very High",
                need: "Emergency access and security monitoring",
                outcome: "Better visibility around gates, ambulance routes and parking",
              },
              {
                env: "Corporate / education campuses",
                value: "High",
                need: "Visitor and vehicle access management",
                outcome: "Digital records and easier review of campus vehicle activity",
              },
              {
                env: "Residential communities",
                value: "High",
                need: "Gate security and visitor vehicle records",
                outcome: "Less dependence on paper registers and manual verification",
              },
            ].map((row, idx) => (
              <motion.div
                key={row.env}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="grid md:grid-cols-[1.1fr_1fr_1.5fr_1.5fr] border-t border-slate-100"
              >
                <div className="p-5 font-bold text-slate-900">{row.env}</div>
                <div className="px-5 pb-2 md:py-5">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                      row.value === "Very High"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {row.value}
                  </span>
                </div>
                <div className="px-5 pb-5 md:py-5 text-sm text-slate-600">
                  {row.need}
                </div>
                <div className="px-5 pb-5 md:py-5 text-sm text-slate-600">
                  {row.outcome}
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-xs text-slate-400 text-center mt-5">
            Value levels are indicative and depend on camera coverage, site
            layout, deployment configuration and the customer's operational
            requirements.
          </p>
        </div>
      </section>

      {/* MISSION CRITICAL */}
      <section className="py-24 bg-slate-950 text-white px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeading center>
            <span className="text-white">Critical & High-Security Environments</span>
          </SectionHeading>
          <SectionSub center>
            In controlled environments, vehicle intelligence can become part of
            a broader security and incident-response workflow.
          </SectionSub>

          <div className="grid md:grid-cols-2 gap-6">
            {MISSION_CRITICAL.map((item, idx) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="relative min-h-64 rounded-3xl overflow-hidden group border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 p-8"
                >
                  <div className="absolute right-8 top-8 w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center">
                    <Icon size={28} className="text-blue-400" />
                  </div>

                  <div className="relative z-10 max-w-xl pt-20">
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 px-6 md:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <SectionHeading center>
            What the Customer Actually Gets
          </SectionHeading>
          <SectionSub center>
            The product is not just about detecting objects. The practical
            value comes from connecting detection, records, alerts and
            investigation into one workflow.
          </SectionSub>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((feat, idx) => {
              const Icon = feat.icon;

              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.07 }}
                  className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-5">
                    <Icon size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    {feat.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DEPLOYMENT */}
      <section className="py-24 bg-white px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <SectionHeading center>Deployment Environments</SectionHeading>
          <SectionSub center>
            The same platform can be adapted to different physical
            environments depending on camera placement, detection requirements
            and the customer's security workflow.
          </SectionSub>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {DEPLOYMENT_CATS.map((cat) => {
              const Icon = cat.icon;

              return (
                <motion.div
                  key={cat.name}
                  whileHover={{ scale: 1.04, y: -2 }}
                  className="px-7 py-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3 transition-colors hover:bg-blue-50 hover:border-blue-100"
                >
                  <Icon className="text-blue-600" size={22} />
                  <span className="font-semibold text-slate-700">
                    {cat.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[140px] opacity-20" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-cyan-600 rounded-full blur-[140px] opacity-15" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6">
            <Users size={14} />
            Built for Security & Operations Teams
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Have Cameras. Turn Them Into Intelligence.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Whether you operate a factory, logistics park, campus, hospital,
            road network or controlled facility, the platform can add an AI
            layer to your existing surveillance workflow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button
              onClick={() => navigate(-1)}
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/40"
            >
              Try the Detection Platform
            </button>

            <button
              onClick={() => navigate(-1)}
              className="px-8 py-4 bg-transparent border border-slate-700 text-white rounded-full font-bold hover:bg-slate-900 transition-all"
            >
              Back to Dashboard
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
