import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate } from "animejs";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Users,
  Flame,
  Swords,
  ShieldCheck,
  Database,
  Zap,
  Layers,
  Activity,
  PlayCircle,
  Clock,
  ListVideo,
  X,
  Loader2,
  Hash,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Power,
  PowerOff,
  Fingerprint,
  Video,
  XCircle,
  Mail,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- CONSTANTS & THEME ---
const C = {
  bg: "#F8FAFC",
  panel: "#FFFFFF",
  ink: "#0F172A",
  inkSoft: "#475569",
  inkFaint: "#94A3B8",
  line: "#E2E8F0",
  lineStrong: "#334155",
  accent: "#2563EB",
  danger: "#DC2626",
};

const TRIO = ["#2563EB", "#0EA5E9", "#3B82F6"];

const hexToRgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
};

// API Configuration
const API_BASE =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:3000"
    : "https://i-edge-backend-7.onrender.com";

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("iedge_token");

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

const PROCESSING_MESSAGES = [
  "Initializing multi-stream home security pipeline...",
  "Synchronizing Crowd Density, Violence Action, and Thermal Fire models...",
  "Allocating GPU resources for real-time residential monitoring...",
  "Analyzing frame sequences for behavioral anomalies...",
];

const HOME_FEATURES = [
  {
    icon: Users,
    title: "Crowd Density Analysis",
    desc: "Detects unauthorized gatherings or unusual crowd formation in private zones instantly.",
  },
  {
    icon: Swords,
    title: "Violence & Aggression",
    desc: "Identifies physical altercations, fighting gestures, and aggressive body language patterns.",
  },
  {
    icon: Flame,
    title: "Fire & Smoke Detection",
    desc: "Early warning system for visual fire signatures and smoke plumes before thermal sensors trigger.",
  },
];

const HOME_WORKFLOW = [
  {
    n: "01",
    title: "Stream Ingest",
    desc: "Securely pulls feeds from indoor/outdoor IP cameras.",
  },
  {
    n: "02",
    title: "Frame Sampling",
    desc: "Extracts keyframes at optimal intervals for analysis.",
  },
  {
    n: "03",
    title: "Multi-Model AI",
    desc: "Runs Crowd, Violence, and Fire models in parallel.",
  },
  {
    n: "04",
    title: "Alert & Log",
    desc: "Triggers instant notifications and archives evidence clips.",
  },
];

const HOME_SPECS = [
  { label: "Latency", value: "< 500ms" },
  { label: "Models", value: "3 Parallel AI" },
  { label: "Privacy", value: "Edge Processing" },
  { label: "Storage", value: "Encrypted Local" },
];

const HOME_STATS = [
  {
    value: 99.2,
    decimals: 1,
    suffix: "%",
    label: "Threat Accuracy",
  },
  {
    value: 3,
    decimals: 0,
    suffix: "",
    label: "Active Models",
  },
  {
    value: 24,
    decimals: 0,
    suffix: "/7",
    label: "Monitoring",
  },
];

const HOME_JOURNEY = [
  {
    step: "01",
    title: "Connect",
    desc: "Camera feed established.",
    detail: "RTSP/ONVIF",
    icon: Video,
  },
  {
    step: "02",
    title: "Preprocess",
    desc: "Noise reduction & stabilization.",
    detail: "Enhancement",
    icon: Layers,
  },
  {
    step: "03",
    title: "Crowd AI",
    desc: "Density mapping & zone breach.",
    detail: "Spatial Analysis",
    icon: Users,
  },
  {
    step: "04",
    title: "Voilence AI",
    desc: "Pose estimation & aggression.",
    detail: "Behavioral",
    icon: Swords,
  },
  {
    step: "05",
    title: "Fire AI",
    desc: "Flame & smoke signature.",
    detail: "Thermal Vision",
    icon: Flame,
  },
  {
    step: "06",
    title: "Validate",
    desc: "False positive suppression.",
    detail: "Confidence Score",
    icon: ShieldCheck,
  },
  {
    step: "07",
    title: "Alert",
    desc: "Push notification sent.",
    detail: "Real-time",
    icon: Zap,
  },
  {
    step: "08",
    title: "Archive",
    desc: "Clip saved securely.",
    detail: "Evidence Lock",
    icon: Database,
  },
  {
    step: "09",
    title: "Dashboard",
    desc: "Live status updated.",
    detail: "UI Refresh",
    icon: Activity,
  },
];

// --- HELPER COMPONENTS ---

function Counter({
  value,
  suffix,
  decimals,
}: {
  value: number;
  suffix: string;
  decimals: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const obj = { val: 0 };

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () =>
        animate(obj, {
          val: value,
          duration: 1400,
          ease: "outExpo",
          onUpdate: () =>
            (el.textContent = obj.val.toFixed(decimals) + suffix),
        }),
    });

    return () => trigger.kill();
  }, [value, suffix, decimals]);

  return (
    <span ref={ref} className="anpr-mono">
      {"0" + suffix}
    </span>
  );
}

function FloatIcon({
  children,
  accent,
  delay = 0,
}: {
  children: React.ReactNode;
  accent: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const t = gsap.to(ref.current, {
      y: -6,
      duration: 1.8,
      delay,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      t.kill();
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className="w-11 h-11 rounded-full flex items-center justify-center mb-4"
      style={{
        border: `1px solid ${accent}55`,
        background: `${accent}14`,
        color: accent,
      }}
    >
      {children}
    </div>
  );
}

function TiltCard({
  children,
  accent,
  delay = 0,
}: {
  children: React.ReactNode;
  accent: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;

    if (!el) return;

    const r = el.getBoundingClientRect();

    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;

    gsap.to(el, {
      rotateY: x * 14,
      rotateX: -y * 14,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
    });

    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const onLeave = () =>
    gsap.to(ref.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="reveal tilt-card relative overflow-hidden rounded-xl p-6"
      style={{
        background: C.panel,
        border: `1px solid ${C.line}`,
        borderTop: `4px solid ${accent}`,
        ["--accent-rgb" as any]: hexToRgb(accent),
        transformStyle: "preserve-3d",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function ServiceTerminal({ running }: { running: boolean }) {
  return (
    <div
      className="anpr-mono text-xs rounded-md px-4 py-3 flex items-center gap-2"
      style={{
        background: C.lineStrong,
        color: "#D8D4C4",
      }}
    >
      <span style={{ color: running ? "#7FBE8F" : "#C97B6C" }}>●</span>

      home-security-service —{" "}
      {running
        ? "online, monitoring active zones"
        : "offline, monitoring paused"}

      <span className="term-cursor"></span>
    </div>
  );
}

function Corner({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 18,
    height: 18,
    borderColor: C.lineStrong,
  };

  const byPos: Record<string, React.CSSProperties> = {
    tl: {
      top: 10,
      left: 10,
      borderTop: "2px solid",
      borderLeft: "2px solid",
    },
    tr: {
      top: 10,
      right: 10,
      borderTop: "2px solid",
      borderRight: "2px solid",
    },
    bl: {
      bottom: 10,
      left: 10,
      borderBottom: "2px solid",
      borderLeft: "2px solid",
    },
    br: {
      bottom: 10,
      right: 10,
      borderBottom: "2px solid",
      borderRight: "2px solid",
    },
  };

  return <div style={{ ...base, ...byPos[position] }} />;
}

function StepTracker({ step }: { step: 1 | 2 | 3 }) {
  const steps = ["Upload", "Analyze", "Result"];

  return (
    <div
      className="flex items-center gap-3 px-8 py-5 border-b"
      style={{ borderColor: C.line }}
    >
      {steps.map((label, i) => {
        const n = i + 1;
        const active = n === step;
        const done = n < step;

        return (
          <React.Fragment key={label}>
            <div className="flex items-center gap-2">
              <span
                className="flex items-center justify-center rounded-full text-[11px] font-medium"
                style={{
                  width: 20,
                  height: 20,
                  border: `1px solid ${
                    active || done ? C.lineStrong : C.line
                  }`,
                  color: done
                    ? C.panel
                    : active
                    ? C.ink
                    : C.inkFaint,
                  background: done ? C.lineStrong : "transparent",
                }}
              >
                {n}
              </span>

              <span
                className="text-xs font-medium"
                style={{
                  color: active ? C.ink : C.inkFaint,
                }}
              >
                {label}
              </span>
            </div>

            {i < steps.length - 1 && (
              <div
                className="flex-1 h-px"
                style={{ background: C.line }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function InteractiveTimeline() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <div className="relative w-full py-4">
      <div className="relative flex justify-between items-start">
        {HOME_JOURNEY.map((step, i) => {
          const isHovered = hoveredStep === i;

          const showLineToNext =
            hoveredStep !== null &&
            i <= hoveredStep &&
            i < HOME_JOURNEY.length - 1;

          return (
            <motion.div
              key={step.step}
              className="relative flex flex-col items-center group cursor-default"
              style={{ width: "11.11%" }}
              onMouseEnter={() => setHoveredStep(i)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              {showLineToNext && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  className="absolute top-10 left-1/2 w-full border-t-2 border-dashed border-blue-300 origin-left z-0"
                />
              )}

              <motion.div
                className="w-20 h-20 rounded-full bg-white border-2 flex items-center justify-center relative z-10 transition-colors duration-300 shadow-sm"
                animate={{
                  borderColor: isHovered ? C.accent : C.line,
                  color: isHovered ? C.accent : C.inkFaint,
                  scale: isHovered ? 1.15 : 1,
                  y: isHovered ? -8 : 0,
                  boxShadow: isHovered
                    ? "0 0 20px rgba(37, 99, 235, 0.3)"
                    : "none",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <step.icon size={28} />

                {isHovered && (
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-blue-400"
                    initial={{
                      opacity: 1,
                      scale: 1,
                    }}
                    animate={{
                      opacity: 0,
                      scale: 1.4,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  />
                )}
              </motion.div>

              <motion.div
                className="mt-3 text-center"
                animate={{
                  y: isHovered ? -8 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <div className="text-[11px] font-mono text-blue-500 mb-1 font-semibold tracking-wider">
                  STEP {step.step}
                </div>

                <div className="text-base font-bold text-slate-900 mb-1">
                  {step.title}
                </div>

                <div className="text-xs text-slate-500 leading-snug max-w-[160px] mx-auto">
                  {step.desc}
                </div>

                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={
                    isHovered
                      ? {
                          opacity: 1,
                          height: "auto",
                        }
                      : {
                          opacity: 0,
                          height: 0,
                        }
                  }
                  className="overflow-hidden"
                >
                  <div className="inline-block px-3 py-1.5 bg-blue-50 text-blue-700 text-[11px] font-mono font-medium rounded-lg border border-blue-100 mt-2">
                    {step.detail}
                  </div>
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

export default function HomeSurveillancePage() {
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);

  const [processingState, setProcessingState] = useState<
    "idle" | "uploading" | "processing" | "complete" | "failed"
  >("idle");

  const [messageIndex, setMessageIndex] = useState(0);

  const [mediaUrl, setMediaUrl] = useState<string | null>(null);

  const [jobId, setJobId] = useState<number | null>(null);

  const [errorMessage, setErrorMessage] = useState("");

  const [processedVideoUrl, setProcessedVideoUrl] =
    useState<string | null>(null);

  const [analyticsData, setAnalyticsData] = useState<any[]>([]);

  // -------------------------------------------------------
  // EMAIL ALERT STATE
  // -------------------------------------------------------

  const [alertEmail, setAlertEmail] = useState<string | null>(null);

  const [emailAlertsSent, setEmailAlertsSent] = useState(0);

  const [emailAlertStatus, setEmailAlertStatus] = useState<
    "pending" | "sent" | "none" | "unavailable"
  >("pending");

  // HISTORY STATES
  const [showHistory, setShowHistory] = useState(false);

  const [history, setHistory] = useState<any[]>([]);

  const [selectedLog, setSelectedLog] = useState<any>(null);

  const [loadingHistory, setLoadingHistory] = useState(false);

  const [serviceRunning, setServiceRunning] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pageRef = useRef<HTMLDivElement>(null);

  // -------------------------------------------------------
  // POLLING LOGIC
  // -------------------------------------------------------

  useEffect(() => {
    if (processingState !== "processing" || !jobId) return;

    pollingRef.current = setInterval(async () => {
      try {
        // 1. Check Status
        const statusRes = await fetch(
          `${API_BASE}/api/surveillance/status/${jobId}`,
          {
            headers: getAuthHeaders(),
          }
        );

        if (!statusRes.ok) {
          throw new Error("Failed to check status");
        }

        const statusData = await statusRes.json();

        // -------------------------------------------------------
        // UPDATE EMAIL ALERT INFORMATION
        // -------------------------------------------------------

        if (
          typeof statusData.alert_email === "string" &&
          statusData.alert_email.trim()
        ) {
          setAlertEmail(statusData.alert_email);
        } else {
          setAlertEmail(null);
        }

        const sentCount = Number(statusData.email_alerts_sent || 0);

        setEmailAlertsSent(sentCount);

        if (sentCount > 0) {
          setEmailAlertStatus("sent");
        } else if (
          typeof statusData.alert_email === "string" &&
          statusData.alert_email.trim()
        ) {
          setEmailAlertStatus("pending");
        } else {
          setEmailAlertStatus("unavailable");
        }

        // Update progress based on status
        setUploadProgress((prev) => Math.min(prev + 5, 95));

        // -------------------------------------------------------
        // COMPLETED
        // -------------------------------------------------------

        if (statusData.status === "completed") {
          if (pollingRef.current) {
            clearInterval(pollingRef.current);
            pollingRef.current = null;
          }

          // Use final status values
          const finalSentCount = Number(
            statusData.email_alerts_sent || 0
          );

          setEmailAlertsSent(finalSentCount);

          if (
            typeof statusData.alert_email === "string" &&
            statusData.alert_email.trim()
          ) {
            setAlertEmail(statusData.alert_email);

            setEmailAlertStatus(
              finalSentCount > 0 ? "sent" : "none"
            );
          } else {
            setAlertEmail(null);
            setEmailAlertStatus("unavailable");
          }

          // 2. Fetch Final Results
          const resultsRes = await fetch(
            `${API_BASE}/api/surveillance/results`,
            {
              headers: getAuthHeaders(),
            }
          );

          if (!resultsRes.ok) {
            throw new Error("Failed to fetch final results");
          }

          const resultsData = await resultsRes.json();

          // Find our job in results
          const myJob = resultsData.find(
            (j: any) => j.id === jobId
          );

          if (myJob) {
            setUploadProgress(100);

            setProcessingState("complete");

            // -------------------------------------------------------
            // FINAL EMAIL DATA FROM RESULT
            // -------------------------------------------------------

            if (
              typeof myJob.alert_email === "string" &&
              myJob.alert_email.trim()
            ) {
              setAlertEmail(myJob.alert_email);
            }

            const finalResultEmailCount = Number(
              myJob.email_alerts_sent || finalSentCount || 0
            );

            setEmailAlertsSent(finalResultEmailCount);

            if (
              typeof myJob.alert_email === "string" &&
              myJob.alert_email.trim()
            ) {
              setEmailAlertStatus(
                finalResultEmailCount > 0 ? "sent" : "none"
              );
            } else {
              setEmailAlertStatus("unavailable");
            }

            // -------------------------------------------------------
            // ANALYTICS
            // -------------------------------------------------------

            const incidents: any[] = [];

            if (myJob.fire_detected) {
              incidents.push({
                type: "Fire",
                confidence: myJob.max_fire_confidence,
              });
            }

            if (myJob.crowd_detected) {
              incidents.push({
                type: "Crowd",
                confidence: myJob.max_person_count,
              });
            }

            if (myJob.violence_detected) {
              incidents.push({
                type: "Violence",
                confidence: myJob.max_violence_confidence,
              });
            }

            setAnalyticsData(incidents);

            // Load the processed video with the authenticated request.
            // A <video src="..."> request cannot attach the Bearer token.
            const videoResponse = await fetch(
              `${API_BASE}/api/surveillance/video/${jobId}`,
              {
                headers: getAuthHeaders(),
              }
            );

            if (!videoResponse.ok) {
              throw new Error(
                `Failed to load processed video: ${videoResponse.status}`
              );
            }

            const videoBlob = await videoResponse.blob();
            const videoUrl = URL.createObjectURL(videoBlob);

            setProcessedVideoUrl(videoUrl);
          }
        } else if (statusData.status === "failed") {
          if (pollingRef.current) {
            clearInterval(pollingRef.current);
            pollingRef.current = null;
          }

          setProcessingState("failed");

          setErrorMessage(
            statusData.error_message || "Processing failed"
          );
        }
      } catch (err) {
        console.error("[POLLING] Error:", err);

        // Don't fail immediately on network blip.
      }
    }, 2000);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, [processingState, jobId]);

  // -------------------------------------------------------
  // PROCESSING MESSAGE ROTATION
  // -------------------------------------------------------

  useEffect(() => {
    if (
      processingState !== "uploading" &&
      processingState !== "processing"
    ) {
      setMessageIndex(0);
      return;
    }

    const t = setInterval(
      () =>
        setMessageIndex(
          (p) => (p + 1) % PROCESSING_MESSAGES.length
        ),
      2500
    );

    return () => clearInterval(t);
  }, [processingState]);

  // -------------------------------------------------------
  // FILE PREVIEW
  // -------------------------------------------------------

  useEffect(() => {
    if (!file) {
      setMediaUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);

    setMediaUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  // -------------------------------------------------------
  // PROCESSED VIDEO URL CLEANUP
  // -------------------------------------------------------

  useEffect(() => {
    return () => {
      if (processedVideoUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(processedVideoUrl);
      }
    };
  }, [processedVideoUrl]);

  // -------------------------------------------------------
  // GSAP
  // -------------------------------------------------------

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .from(".hero-tag", {
          y: -10,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        })
        .from(
          ".hero-title",
          {
            y: 30,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          ".hero-sub",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          ".hero-chip",
          {
            y: 10,
            opacity: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          ".hero-stat",
          {
            y: 16,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.2"
        );

      gsap.utils
        .toArray<HTMLElement>(".reveal")
        .forEach((el, i) => {
          gsap.fromTo(
            el,
            {
              y: 24,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: (i % 4) * 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
              },
            }
          );
        });

      gsap.utils
        .toArray<HTMLElement>(".how-line")
        .forEach((el) => {
          gsap.fromTo(
            el,
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              ease: "none",
              transformOrigin: "left",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "top 25%",
                scrub: 0.3,
              },
            }
          );
        });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // -------------------------------------------------------
  // FILE HANDLERS
  // -------------------------------------------------------

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();

    if (serviceRunning) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    setIsDragging(false);

    if (!serviceRunning) return;

    const f = e.dataTransfer.files[0];

    if (f) {
      setFile(f);
    }
  };

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!serviceRunning) return;

    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    if (serviceRunning) {
      fileInputRef.current?.click();
    }
  };

  // -------------------------------------------------------
  // START PROCESSING
  // -------------------------------------------------------

  const startProcessing = async () => {
    if (!file || !serviceRunning) return;

    setProcessingState("uploading");

    setUploadProgress(10);

    setErrorMessage("");

    setAlertEmail(null);

    setEmailAlertsSent(0);

    setEmailAlertStatus("pending");

    const formData = new FormData();

    formData.append("file", file);

    try {
      // -------------------------------------------------------
      // STEP 1: UPLOAD VIDEO
      // -------------------------------------------------------

      const uploadResponse = await fetch(
        `${API_BASE}/api/v1/surveillance/upload`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        let message = `Upload failed: ${uploadResponse.statusText}`;

        try {
          const errorData = await uploadResponse.json();

          if (errorData?.detail) {
            message = errorData.detail;
          }
        } catch {
          // Ignore JSON parsing error.
        }

        throw new Error(message);
      }

      const uploadData = await uploadResponse.json();

      const newJobId = uploadData.id;

      setJobId(newJobId);

      // -------------------------------------------------------
      // EMAIL DATA RETURNED DURING UPLOAD
      // -------------------------------------------------------

      if (
        typeof uploadData.alert_email === "string" &&
        uploadData.alert_email.trim()
      ) {
        setAlertEmail(uploadData.alert_email);

        setEmailAlertStatus("pending");
      } else {
        setAlertEmail(null);

        setEmailAlertStatus("unavailable");
      }

      setEmailAlertsSent(
        Number(uploadData.email_alerts_sent || 0)
      );

      setUploadProgress(50);

      // -------------------------------------------------------
      // STEP 2: TRIGGER DETECTION
      // -------------------------------------------------------

      const detectResponse = await fetch(
        `${API_BASE}/api/surveillance/detect/${newJobId}`,
        {
          method: "POST",
          headers: getAuthHeaders(),
        }
      );

      if (!detectResponse.ok) {
        if (detectResponse.status !== 409) {
          let message = `Detection trigger failed: ${detectResponse.statusText}`;

          try {
            const errorData = await detectResponse.json();

            if (errorData?.detail) {
              message = errorData.detail;
            }
          } catch {
            // Ignore JSON parsing error.
          }

          throw new Error(message);
        }
      }

      setProcessingState("processing");
    } catch (err: any) {
      console.error("[UPLOAD] Error:", err);

      setProcessingState("failed");

      setErrorMessage(
        err.message || "Failed to process video"
      );
    }
  };

  // -------------------------------------------------------
  // RESET
  // -------------------------------------------------------

  const resetUpload = () => {
    setFile(null);

    setProcessingState("idle");

    setUploadProgress(0);

    setMessageIndex(0);

    setJobId(null);

    setProcessedVideoUrl((currentUrl) => {
      if (currentUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(currentUrl);
      }
      return null;
    });

    setAnalyticsData([]);

    setErrorMessage("");

    // Reset email state
    setAlertEmail(null);

    setEmailAlertsSent(0);

    setEmailAlertStatus("pending");

    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // -------------------------------------------------------
  // SERVICE TOGGLE
  // -------------------------------------------------------

  const handleServiceToggle = (newState: boolean) => {
    resetUpload();

    setServiceRunning(newState);
  };

  // -------------------------------------------------------
  // HISTORY
  // -------------------------------------------------------

  const openHistory = async () => {
    setShowHistory(true);

    setLoadingHistory(true);

    try {
      const response = await fetch(
        `${API_BASE}/api/surveillance/incidents`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (response.ok) {
        const data = await response.json();

        const mappedHistory = data.map((item: any) => ({
          id: item.id,

          zone: "Main Feed",

          event: item.event_type
            ? item.event_type.charAt(0).toUpperCase() +
              item.event_type.slice(1)
            : "Unknown",

          confidence: item.confidence
            ? item.confidence * 100
            : 0,

          timestamp: item.timestamp,

          severity:
            item.confidence > 0.8 ? "High" : "Low",
        }));

        setHistory(mappedHistory);
      } else {
        throw new Error("Failed to fetch history");
      }
    } catch (err) {
      console.error("[HISTORY] Error:", err);

      setErrorMessage(
        "Could not load incident history"
      );
    } finally {
      setLoadingHistory(false);
    }
  };

  const totalLogs = history.length;

  const uniqueZones = new Set(
    history.map((l) => l.zone)
  ).size;

  const criticalAlerts = history.filter(
    (l) => l.confidence > 95
  ).length;

  const avgConfidence =
    history.length > 0
      ? (
          history.reduce(
            (acc, curr) =>
              acc + (curr.confidence || 0),
            0
          ) / history.length
        ).toFixed(1)
      : "0.0";

  const step: 1 | 2 | 3 =
    processingState === "complete"
      ? 3
      : processingState === "idle"
      ? 1
      : 2;

  const power3Out: [number, number, number, number] = [
    0.16,
    1,
    0.3,
    1,
  ];

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------

  return (
    <div
      ref={pageRef}
      className="min-h-screen relative"
      style={{
        background: C.bg,
        color: C.ink,
        fontFamily: "'IBM Plex Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .anpr-serif {
          font-family: 'Fraunces', serif;
        }

        .anpr-mono {
          font-family: 'IBM Plex Mono', monospace;
        }

        .anpr-btn {
          border-radius: 4px;
          transition: transform .15s ease;
        }

        .anpr-btn:active {
          transform: scale(0.98);
        }

        .anpr-btn:focus-visible {
          outline: 2px solid ${C.lineStrong};
          outline-offset: 2px;
        }

        .anpr-btn-strong {
          transition:
            transform .18s ease,
            box-shadow .18s ease,
            opacity .18s ease;
        }

        .anpr-btn-strong:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.04);
        }

        .anpr-btn-strong:active:not(:disabled) {
          transform: scale(0.96) translateY(0);
        }

        .anpr-btn-strong:disabled {
          opacity: 0.55;
        }

        .anpr-btn-strong:focus-visible {
          outline: 2px solid ${C.lineStrong};
          outline-offset: 3px;
        }

        @keyframes pulse-glow {
          0%,100% {
            box-shadow: 0 10px 26px -8px var(--glow);
          }

          50% {
            box-shadow: 0 14px 38px -4px var(--glow);
          }
        }

        .pulse-glow {
          animation: pulse-glow 2.4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .pulse-glow {
            animation: none;
          }
        }

        .blueprint-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: .4;

          background-image:
            radial-gradient(
              circle,
              ${C.lineStrong}1c 1px,
              transparent 1px
            );

          background-size: 28px 28px;

          mask-image:
            radial-gradient(
              ellipse 80% 60% at 50% 0%,
              black,
              transparent 75%
            );
        }

        .tilt-card {
          perspective: 900px;
          transition:
            box-shadow .35s ease,
            border-color .35s ease;

          box-shadow:
            0 14px 30px -22px rgba(15,23,42,0.1);
        }

        .tilt-card:hover {
          box-shadow:
            0 34px 60px -20px rgba(15,23,42,0.15);
        }

        .tilt-card::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity .3s ease;
          pointer-events: none;

          background:
            radial-gradient(
              280px circle at var(--mx,50%) var(--my,50%),
              rgba(var(--accent-rgb),0.12),
              transparent 60%
            );
        }

        .tilt-card:hover::before {
          opacity: 1;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #4C7A5D;
          animation: dot-pulse 1.8s ease-in-out infinite;
        }

        @keyframes dot-pulse {
          0%,100% {
            opacity:1
          }

          50% {
            opacity:.35
          }
        }

        .term-cursor {
          animation: term-blink 1s steps(1) infinite;
        }

        @keyframes term-blink {
          50% {
            opacity: 0;
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${C.bg};
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${C.line};
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${C.lineStrong};
        }

        @keyframes driftA {
          0%,100% {
            transform: translate(0,0) scale(1);
          }

          50% {
            transform: translate(40px,-30px) scale(1.08);
          }
        }

        @keyframes driftB {
          0%,100% {
            transform: translate(0,0) scale(1);
          }

          50% {
            transform: translate(-50px,25px) scale(1.05);
          }
        }

        @keyframes driftC {
          0%,100% {
            transform: translate(0,0) scale(1);
          }

          50% {
            transform: translate(30px,35px) scale(1.1);
          }
        }

        .glow-blob {
          position: fixed;
          border-radius: 9999px;
          pointer-events: none;
          z-index: 0;
          filter: blur(90px);
        }

        .glow-blob-a {
          top: -10%;
          left: -8%;
          width: 480px;
          height: 480px;
          background:
            radial-gradient(
              circle,
              rgba(37,99,235,0.22),
              transparent 70%
            );
          animation: driftA 18s ease-in-out infinite;
        }

        .glow-blob-b {
          top: 20%;
          right: -10%;
          width: 420px;
          height: 420px;
          background:
            radial-gradient(
              circle,
              rgba(14,165,233,0.18),
              transparent 70%
            );
          animation: driftB 22s ease-in-out infinite;
        }

        .glow-blob-c {
          bottom: -12%;
          left: 30%;
          width: 520px;
          height: 520px;
          background:
            radial-gradient(
              circle,
              rgba(59,130,246,0.15),
              transparent 70%
            );
          animation: driftC 26s ease-in-out infinite;
        }

        @keyframes sparkleFloat {
          0%,100% {
            transform: translateY(0);
            opacity: 0.25;
          }

          50% {
            transform: translateY(-18px);
            opacity: 0.9;
          }
        }

        .sparkle {
          position: absolute;
          border-radius: 9999px;
          pointer-events: none;
          animation-name: sparkleFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .shine-text {
          background:
            linear-gradient(
              90deg,
              #0F172A 0%,
              #2563EB 45%,
              #0EA5E9 55%,
              #0F172A 100%
            );

          background-size: 220% auto;

          -webkit-background-clip: text;
          background-clip: text;

          color: transparent;

          animation: shineSweep 6s linear infinite;
        }

        @keyframes shineSweep {
          to {
            background-position: -220% center;
          }
        }

        .anpr-btn-strong {
          position: relative;
          overflow: hidden;
        }

        .anpr-btn-strong::after {
          content: '';
          position: absolute;
          top: 0;
          left: -60%;
          width: 40%;
          height: 100%;

          background:
            linear-gradient(
              120deg,
              transparent,
              rgba(255,255,255,0.5),
              transparent
            );

          transform: skewX(-20deg);
          transition: left .6s ease;
        }

        .anpr-btn-strong:hover::after {
          left: 130%;
        }

        .section-heading {
          position: relative;
          display: inline-flex;
        }

        .heading-line {
          height: 3px;
          width: 100%;
          border-radius: 2px;
          margin-top: 8px;

          background:
            linear-gradient(
              90deg,
              #2563EB,
              #0EA5E9,
              #2563EB
            );

          background-size: 200% auto;

          animation:
            headingLineShimmer 3s linear infinite;

          transform-origin: left;
        }

        @keyframes headingLineShimmer {
          to {
            background-position: -200% center;
          }
        }

        .dot-pulse-glow {
          box-shadow:
            0 0 0 0 rgba(37,99,235,0.6);

          animation:
            dotPulseGlow 2s ease-in-out infinite;
        }

        @keyframes dotPulseGlow {
          0% {
            box-shadow:
              0 0 0 0 rgba(37,99,235,0.55);
          }

          70% {
            box-shadow:
              0 0 0 8px rgba(37,99,235,0);
          }

          100% {
            box-shadow:
              0 0 0 0 rgba(37,99,235,0);
          }
        }
      `}</style>

      <div className="blueprint-bg" />

      <div className="glow-blob glow-blob-a" />

      <div className="glow-blob glow-blob-b" />

      <div className="glow-blob glow-blob-c" />

      {[
        {
          top: "8%",
          left: "12%",
          size: 5,
          color: "#2563EB",
          delay: "0s",
          duration: "6s",
        },
        {
          top: "22%",
          left: "88%",
          size: 4,
          color: "#0EA5E9",
          delay: "1.2s",
          duration: "7s",
        },
        {
          top: "62%",
          left: "6%",
          size: 6,
          color: "#3B82F6",
          delay: "2s",
          duration: "5.5s",
        },
        {
          top: "78%",
          left: "92%",
          size: 4,
          color: "#0EA5E9",
          delay: "0.6s",
          duration: "8s",
        },
        {
          top: "45%",
          left: "50%",
          size: 3,
          color: "#2563EB",
          delay: "1.6s",
          duration: "6.5s",
        },
      ].map((s, i) => (
        <span
          key={i}
          className="sparkle"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            background: s.color,
            boxShadow: `0 0 10px 3px ${s.color}88`,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}

      <div
        className="max-w-6xl mx-auto px-6 relative"
        style={{ zIndex: 1 }}
      >
        {/* HEADER */}

        <div className="py-4">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: C.inkSoft }}
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />

            Back to Dashboard
          </button>
        </div>

        {/* HERO SECTION */}

        <section className="py-10 md:py-16 grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="hero-title anpr-serif text-5xl lg:text-[3.5rem] leading-[1.1] mb-6 shine-text">
              Smart Home
              <br />
              &amp; Safety Intelligence
            </h1>

            <p
              className="hero-sub text-lg leading-relaxed"
              style={{ color: C.inkSoft }}
            >
              Advanced residential monitoring utilizing parallel AI
              models to detect crowds, violence, and fire threats in
              real-time.
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {[
                "Indoor Cameras",
                "Outdoor Perimeter",
                "Baby Monitors",
                "NVR Feeds",
              ].map((w) => (
                <span
                  key={w}
                  className="hero-chip text-xs px-3 py-1.5 rounded-full font-medium"
                  style={{
                    border: `1px solid ${C.line}`,
                    color: C.inkSoft,
                  }}
                >
                  {w}
                </span>
              ))}
            </div>

            <div
              className="flex gap-8 mt-6 pt-4 border-t"
              style={{ borderColor: C.line }}
            >
              {HOME_STATS.map((s) => (
                <div key={s.label} className="hero-stat">
                  <div className="anpr-serif text-4xl text-blue-700">
                    <Counter
                      value={s.value}
                      suffix={s.suffix}
                      decimals={s.decimals}
                    />
                  </div>

                  <div
                    className="text-xs mt-2 font-semibold uppercase tracking-wider"
                    style={{ color: C.inkFaint }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center md:justify-end relative">
            <div
              className="absolute inset-0 m-auto w-[85%] h-[85%] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(37,99,235,0.18), transparent 70%)",
                filter: "blur(50px)",
              }}
            />

            <motion.div
              initial={{
                opacity: 0,
                x: 40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
                ease: power3Out,
              }}
              className="w-full max-w-xl lg:max-w-3xl relative"
            >
              <img
                src="/Gemini_Generated_Image_mhmp30mhmp30mhmp.png"
                alt="Home Security Example"
                className="w-full h-auto rounded-xl shadow-lg object-contain"
              />
            </motion.div>
          </div>
        </section>

        {/* CORE FEATURES */}

        <section className="py-10">
          <div className="mb-4">
            <h2 className="reveal anpr-serif text-2xl text-slate-900 section-heading flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 dot-pulse-glow" />
              Core Protection Modules
            </h2>

            <div className="how-line heading-line" />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {HOME_FEATURES.map((f, i) => (
              <TiltCard
                key={f.title}
                accent={TRIO[i % TRIO.length]}
                delay={i * 80}
              >
                <FloatIcon
                  accent={TRIO[i % TRIO.length]}
                  delay={i * 0.3}
                >
                  <f.icon size={18} />
                </FloatIcon>

                <h3 className="text-sm font-semibold mb-2 text-slate-900">
                  {f.title}
                </h3>

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: C.inkSoft }}
                >
                  {f.desc}
                </p>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* WORKFLOW */}

        <section className="py-10">
          <div className="mb-2">
            <h2 className="reveal anpr-serif text-2xl text-slate-900 section-heading flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 dot-pulse-glow" />
              How it works
            </h2>

            <div className="how-line heading-line" />
          </div>

          <p
            className="reveal text-sm mb-6"
            style={{ color: C.inkFaint }}
          >
            Four-step automated residential threat assessment.
          </p>

          <div className="grid md:grid-cols-4 gap-4">
            {HOME_WORKFLOW.map((s, i) => (
              <TiltCard
                key={s.n}
                accent={TRIO[i % TRIO.length]}
                delay={i * 80}
              >
                <div
                  className="anpr-mono text-xs mb-3"
                  style={{
                    color: TRIO[i % TRIO.length],
                  }}
                >
                  {s.n}
                </div>

                <h3 className="text-sm font-semibold mb-2 text-slate-900">
                  {s.title}
                </h3>

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: C.inkSoft }}
                >
                  {s.desc}
                </p>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* SPECS */}

        <section className="py-10">
          <div className="mb-4">
            <h2 className="reveal anpr-serif text-2xl text-slate-900 section-heading flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 dot-pulse-glow" />
              Under the hood
            </h2>

            <div className="how-line heading-line" />
          </div>

          <div
            className="reveal grid sm:grid-cols-4 rounded-lg overflow-hidden"
            style={{
              border: `1px solid ${C.line}`,
              background: C.panel,
            }}
          >
            {HOME_SPECS.map((s, i) => (
              <div
                key={s.label}
                className="p-4"
                style={{
                  borderLeft:
                    i > 0
                      ? `1px solid ${C.line}`
                      : "none",
                }}
              >
                <div
                  className="text-xs mb-1"
                  style={{ color: C.inkFaint }}
                >
                  {s.label}
                </div>

                <div className="anpr-mono text-base text-slate-900">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TIMELINE */}

        <section
          id="journey"
          className="scroll-mt-32 py-14 bg-white rounded-2xl border border-blue-100 my-10 relative overflow-hidden shadow-[0_0_40px_-10px_rgba(37,99,235,0.1)]"
        >
          <div
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(37,99,235,0.12), transparent 70%)",
            }}
          />

          <div
            className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(14,165,233,0.10), transparent 70%)",
            }}
          />

          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              className="text-center mb-8"
            >
              <div className="text-[11.5px] font-mono tracking-widest uppercase text-blue-600 mb-4 font-semibold">
                Security Pipeline Journey
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight anpr-serif">
                From Camera Feed to Instant Alert
              </h2>

              <p className="text-slate-500 max-w-3xl mx-auto">
                Parallel AI processing ensures zero-latency threat
                detection across all residential zones.
              </p>
            </motion.div>

            <InteractiveTimeline />
          </div>
        </section>

        {/* UPLOAD / ANALYSIS SECTION */}

        <section className="py-10">
          <div className="mb-2">
            <h2 className="reveal anpr-serif text-2xl text-slate-900 section-heading flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 dot-pulse-glow" />
              Run a Security Scan
            </h2>

            <div className="how-line heading-line" />
          </div>

          <p
            className="reveal text-sm mb-6"
            style={{ color: C.inkFaint }}
          >
            Upload footage to test Crowd, Violence, and Fire
            detection models.
          </p>

          <div className="reveal flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <ServiceTerminal running={serviceRunning} />

            <div className="flex gap-3 shrink-0 flex-wrap">
              {/* START */}

              <button
                onClick={() => handleServiceToggle(true)}
                disabled={serviceRunning}
                className={`anpr-btn-strong flex items-center gap-2 px-6 py-3.5 text-sm font-bold rounded-full disabled:cursor-not-allowed ${
                  !serviceRunning ? "pulse-glow" : ""
                }`}
                style={
                  !serviceRunning
                    ? {
                        background: C.accent,
                        color: "#FFF",
                        ["--glow" as any]:
                          "rgba(37,99,235,0.55)",
                        boxShadow:
                          "0 10px 26px -8px rgba(37,99,235,0.6)",
                      }
                    : {
                        background: "transparent",
                        border: `1.5px solid ${C.line}`,
                        color: C.inkFaint,
                      }
                }
              >
                <Power size={16} />
                Start Monitoring
              </button>

              {/* STOP */}

              <button
                onClick={() => handleServiceToggle(false)}
                disabled={!serviceRunning}
                className={`anpr-btn-strong flex items-center gap-2 px-6 py-3.5 text-sm font-bold rounded-full disabled:cursor-not-allowed ${
                  serviceRunning ? "pulse-glow" : ""
                }`}
                style={
                  serviceRunning
                    ? {
                        background: C.danger,
                        color: "#FFF",
                        ["--glow" as any]:
                          "rgba(220,38,38,0.55)",
                        boxShadow:
                          "0 10px 26px -8px rgba(220,38,38,0.6)",
                      }
                    : {
                        background: "transparent",
                        border: `1.5px solid ${C.line}`,
                        color: C.inkFaint,
                      }
                }
              >
                <PowerOff size={16} />
                Stop Monitoring
              </button>

              <button
                onClick={openHistory}
                className="anpr-btn-strong flex items-center gap-2 px-6 py-3.5 text-sm font-bold rounded-full"
                style={{
                  background: C.ink,
                  color: "#FFF",
                  boxShadow:
                    "0 10px 26px -8px rgba(15,23,42,0.4)",
                }}
              >
                <ListVideo size={16} />
                View Incident Logs
              </button>
            </div>
          </div>

          {errorMessage &&
            processingState !== "failed" && (
              <p
                className="flex items-center gap-2 text-sm mb-4 font-medium"
                style={{ color: C.danger }}
              >
                <AlertTriangle size={14} />
                {errorMessage}
              </p>
            )}

          <div
            className="reveal rounded-lg overflow-hidden"
            style={{
              background: C.panel,
              border: `1px solid ${C.line}`,
            }}
          >
            <StepTracker step={step} />

            <div className="p-5">
              <input
                type="file"
                ref={fileInputRef}
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={
                  processingState === "idle" &&
                  !file &&
                  serviceRunning
                    ? triggerFileInput
                    : undefined
                }
                className="relative rounded-md p-6 text-center transition-colors duration-200"
                style={{
                  border: `1px dashed ${
                    isDragging
                      ? C.lineStrong
                      : C.line
                  }`,
                  background: isDragging
                    ? "#F1F5F9"
                    : "transparent",
                  minHeight: 260,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor:
                    processingState === "idle" &&
                    !file &&
                    serviceRunning
                      ? "pointer"
                      : "default",
                  opacity:
                    !serviceRunning &&
                    processingState === "idle"
                      ? 0.55
                      : 1,
                }}
              >
                <Corner position="tl" />
                <Corner position="tr" />
                <Corner position="bl" />
                <Corner position="br" />

                {/* IDLE - SERVICE OFF */}

                {processingState === "idle" &&
                  !serviceRunning && (
                    <>
                      <PowerOff
                        size={28}
                        style={{
                          color: C.danger,
                        }}
                        className="mb-4"
                      />

                      <h3 className="anpr-serif text-xl mb-2 text-slate-900">
                        Monitoring Service Offline
                      </h3>

                      <p
                        className="text-sm"
                        style={{
                          color: C.inkFaint,
                        }}
                      >
                        Start the service above to enable
                        uploads
                      </p>
                    </>
                  )}

                {/* IDLE - NO FILE */}

                {processingState === "idle" &&
                  !file &&
                  serviceRunning && (
                    <>
                      <Fingerprint
                        size={30}
                        className="mb-4 text-blue-600"
                      />

                      <h3 className="anpr-serif text-xl mb-2 text-slate-900">
                        Drop footage to begin scan
                      </h3>

                      <p
                        className="text-sm mb-5"
                        style={{
                          color: C.inkFaint,
                        }}
                      >
                        MP4 or MOV from any residential
                        camera
                      </p>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerFileInput();
                        }}
                        className="anpr-btn px-5 py-2.5 text-sm font-medium"
                        style={{
                          background: C.ink,
                          color: C.panel,
                        }}
                      >
                        Select file
                      </button>
                    </>
                  )}

                {/* FILE SELECTED */}

                {processingState === "idle" &&
                  file && (
                    <div className="w-full max-w-sm">
                      <div className="flex items-center gap-3 mb-5 text-left">
                        <Video
                          size={20}
                          className="text-blue-600"
                        />

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate text-slate-900">
                            {file.name}
                          </p>

                          <p
                            className="anpr-mono text-xs"
                            style={{
                              color: C.inkFaint,
                            }}
                          >
                            {(
                              file.size /
                              1024 /
                              1024
                            ).toFixed(2)}{" "}
                            MB
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={startProcessing}
                        disabled={!serviceRunning}
                        className="anpr-btn w-full px-6 py-3 text-sm font-medium disabled:cursor-not-allowed"
                        style={{
                          background: serviceRunning
                            ? C.ink
                            : C.line,
                          color: serviceRunning
                            ? C.panel
                            : C.inkFaint,
                        }}
                      >
                        {serviceRunning
                          ? "Run Security Scan"
                          : "Service offline"}
                      </button>
                    </div>
                  )}

                {/* PROCESSING */}

                {(processingState === "uploading" ||
                  processingState === "processing") && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="w-full max-w-2xl bg-slate-50 rounded-xl border p-6 text-left"
                    style={{
                      borderColor: C.line,
                    }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <Loader2
                            className="animate-spin text-blue-600"
                            size={20}
                          />

                          Multi-Model Inference Active
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          Please be patient. Complex analysis
                          is underway.
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600 font-mono">
                          {uploadProgress}%
                        </div>

                        <div className="text-xs text-slate-400 uppercase tracking-wider">
                          Estimated Progress
                        </div>
                      </div>
                    </div>

                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mb-8">
                      <motion.div
                        className="h-full bg-blue-600 rounded-full"
                        initial={{
                          width: "0%",
                        }}
                        animate={{
                          width: `${uploadProgress}%`,
                        }}
                        transition={{
                          duration: 0.5,
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div
                        className="bg-white p-4 rounded-lg border shadow-sm flex flex-col items-center text-center"
                        style={{
                          borderColor: C.line,
                        }}
                      >
                        <Users
                          className="text-purple-600 mb-2"
                          size={24}
                        />

                        <div className="text-xs font-bold text-slate-900 uppercase">
                          Crowd Density AI
                        </div>

                        <div className="text-[10px] text-slate-500 mt-1">
                          Zone breach detection
                        </div>

                        <div className="mt-2 flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse delay-75" />
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse delay-150" />
                        </div>
                      </div>

                      <div
                        className="bg-white p-4 rounded-lg border shadow-sm flex flex-col items-center text-center"
                        style={{
                          borderColor: C.line,
                        }}
                      >
                        <Swords
                          className="text-indigo-600 mb-2"
                          size={24}
                        />

                        <div className="text-xs font-bold text-slate-900 uppercase">
                          Violence AI
                        </div>

                        <div className="text-[10px] text-slate-500 mt-1">
                          Aggression recognition
                        </div>

                        <div className="mt-2 flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse delay-75" />
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse delay-150" />
                        </div>
                      </div>

                      <div
                        className="bg-white p-4 rounded-lg border shadow-sm flex flex-col items-center text-center"
                        style={{
                          borderColor: C.line,
                        }}
                      >
                        <Flame
                          className="text-orange-600 mb-2"
                          size={24}
                        />

                        <div className="text-xs font-bold text-slate-900 uppercase">
                          Fire & Smoke AI
                        </div>

                        <div className="text-[10px] text-slate-500 mt-1">
                          Thermal signature scan
                        </div>

                        <div className="mt-2 flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse delay-75" />
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse delay-150" />
                        </div>
                      </div>
                    </div>

                    {/* EMAIL ALERT MONITOR */}

                    <div className="mb-6 rounded-lg border bg-white p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center"
                            style={{
                              background:
                                emailAlertStatus ===
                                "sent"
                                  ? "#DCFCE7"
                                  : emailAlertStatus ===
                                    "unavailable"
                                  ? "#FEF2F2"
                                  : "#EFF6FF",
                              color:
                                emailAlertStatus ===
                                "sent"
                                  ? "#15803D"
                                  : emailAlertStatus ===
                                    "unavailable"
                                  ? "#DC2626"
                                  : "#2563EB",
                            }}
                          >
                            <Mail size={17} />
                          </div>

                          <div>
                            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                              Email Alert Delivery
                            </div>

                            <div className="text-xs text-slate-500 mt-1">
                              {alertEmail
                                ? `Alerts will be sent to ${alertEmail}`
                                : "No email address is linked to this account."}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-bold text-slate-900 font-mono">
                            {emailAlertsSent}
                          </div>

                          <div className="text-[10px] uppercase tracking-wider text-slate-400">
                            Sent
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100">
                      <p className="text-sm text-blue-800 leading-relaxed font-medium">
                        {PROCESSING_MESSAGES[messageIndex]}
                      </p>

                      <p className="text-xs text-blue-600/70 mt-2">
                        Our system is currently running 3
                        specialized AI models in parallel to
                        ensure maximum accuracy. This process
                        may take a few moments depending on
                        video length and complexity.
                      </p>
                    </div>

                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={resetUpload}
                        className="text-xs font-medium text-red-500 hover:text-red-700 flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors"
                      >
                        <XCircle size={14} />
                        Cancel Processing
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* COMPLETE */}

                {processingState === "complete" && (
                  <div className="w-full text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                          <CheckCircle2 size={20} />
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-slate-900">
                            Scan Complete
                          </h3>

                          <p className="text-xs text-slate-500 font-mono">
                            JOB ID: {jobId}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={resetUpload}
                        className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
                      >
                        Process New Feed
                      </button>
                    </div>

                    {/* -------------------------------------------------------
                        EMAIL ALERT RESULT
                    ------------------------------------------------------- */}

                    <div
                      className="mb-6 rounded-xl border p-4"
                      style={{
                        borderColor:
                          emailAlertStatus === "sent"
                            ? "#BBF7D0"
                            : emailAlertStatus ===
                              "unavailable"
                            ? "#FECACA"
                            : C.line,
                        background:
                          emailAlertStatus === "sent"
                            ? "#F0FDF4"
                            : emailAlertStatus ===
                              "unavailable"
                            ? "#FEF2F2"
                            : "#F8FAFC",
                      }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{
                              background:
                                emailAlertStatus ===
                                "sent"
                                  ? "#DCFCE7"
                                  : emailAlertStatus ===
                                    "unavailable"
                                  ? "#FEE2E2"
                                  : "#E2E8F0",
                              color:
                                emailAlertStatus ===
                                "sent"
                                  ? "#15803D"
                                  : emailAlertStatus ===
                                    "unavailable"
                                  ? "#DC2626"
                                  : "#475569",
                            }}
                          >
                            <Mail size={18} />
                          </div>

                          <div>
                            {emailAlertStatus ===
                              "sent" && (
                              <>
                                <div className="text-sm font-bold text-green-800">
                                  Email alert sent successfully
                                </div>

                                <div className="text-xs text-green-700 mt-1">
                                  {emailAlertsSent} alert
                                  {emailAlertsSent !== 1
                                    ? "s"
                                    : ""}{" "}
                                  sent to{" "}
                                  <span className="font-semibold">
                                    {alertEmail}
                                  </span>
                                </div>
                              </>
                            )}

                            {emailAlertStatus ===
                              "none" && (
                              <>
                                <div className="text-sm font-bold text-slate-800">
                                  No email alert was triggered
                                </div>

                                <div className="text-xs text-slate-500 mt-1">
                                  No security threat required
                                  an email notification.
                                </div>
                              </>
                            )}

                            {emailAlertStatus ===
                              "unavailable" && (
                              <>
                                <div className="text-sm font-bold text-red-800">
                                  Email alerts unavailable
                                </div>

                                <div className="text-xs text-red-700 mt-1">
                                  No email address is linked
                                  to this account.
                                </div>
                              </>
                            )}

                            {emailAlertStatus ===
                              "pending" && (
                              <>
                                <div className="text-sm font-bold text-slate-800">
                                  Email alert status
                                </div>

                                <div className="text-xs text-slate-500 mt-1">
                                  Checking alert delivery...
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div
                            className={`text-2xl font-bold font-mono ${
                              emailAlertsSent > 0
                                ? "text-green-700"
                                : "text-slate-700"
                            }`}
                          >
                            {emailAlertsSent}
                          </div>

                          <div className="text-[10px] uppercase tracking-wider text-slate-400">
                            Alerts Sent
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div
                          className="rounded-xl overflow-hidden bg-black border"
                          style={{
                            borderColor: C.line,
                          }}
                        >
                          {processedVideoUrl ? (
                            <video
                              src={processedVideoUrl}
                              controls
                              autoPlay
                              muted
                              className="w-full aspect-video object-contain"
                            />
                          ) : (
                            <div className="aspect-video flex flex-col items-center justify-center text-slate-500">
                              <PlayCircle
                                size={48}
                                className="mb-2 opacity-50"
                              />

                              <span className="text-sm font-mono">
                                Analysis visualization ready
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between px-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Processed Output
                          </span>

                          <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            MP4 Stream
                          </span>
                        </div>
                      </div>

                      <div
                        className="rounded-xl border overflow-hidden"
                        style={{
                          borderColor: C.line,
                        }}
                      >
                        <div
                          className="px-6 py-4 bg-slate-50 border-b flex items-center justify-between"
                          style={{
                            borderColor: C.line,
                          }}
                        >
                          <h4 className="font-bold text-slate-900 flex items-center gap-2">
                            <Database
                              size={16}
                              className="text-blue-600"
                            />

                            Threat Detection Log
                          </h4>

                          <span className="text-xs font-mono text-slate-500">
                            {analyticsData.length} Events Found
                          </span>
                        </div>

                        <div className="overflow-x-auto max-h-[400px] custom-scrollbar">
                          <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 sticky top-0 z-10">
                              <tr>
                                <th
                                  className="px-6 py-3 font-semibold text-slate-500 border-b"
                                  style={{
                                    borderColor: C.line,
                                  }}
                                >
                                  Threat Type
                                </th>

                                <th
                                  className="px-6 py-3 font-semibold text-slate-500 border-b"
                                  style={{
                                    borderColor: C.line,
                                  }}
                                >
                                  Confidence
                                </th>

                                <th
                                  className="px-6 py-3 font-semibold text-slate-500 border-b"
                                  style={{
                                    borderColor: C.line,
                                  }}
                                >
                                  Timestamp
                                </th>
                              </tr>
                            </thead>

                            <tbody
                              className="divide-y"
                              style={{
                                borderColor: C.line,
                              }}
                            >
                              {analyticsData.length > 0 ? (
                                analyticsData.map(
                                  (
                                    row: any,
                                    idx: number
                                  ) => (
                                    <tr
                                      key={idx}
                                      className="hover:bg-blue-50/50 transition-colors"
                                    >
                                      <td className="px-6 py-3 font-mono text-slate-700">
                                        {row.type}
                                      </td>

                                      <td className="px-6 py-3 font-mono font-bold text-blue-700">
                                        {row.confidence}%
                                      </td>

                                      <td className="px-6 py-3 text-slate-500 flex items-center gap-2">
                                        <Clock size={14} />

                                        {new Date().toLocaleTimeString()}
                                      </td>
                                    </tr>
                                  )
                                )
                              ) : (
                                <tr>
                                  <td
                                    colSpan={3}
                                    className="px-6 py-12 text-center text-slate-400 italic"
                                  >
                                    No threats detected in this
                                    session.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* FAILED */}

                {processingState === "failed" && (
                  <div className="w-full text-center max-w-sm">
                    <AlertTriangle
                      size={26}
                      style={{
                        color: C.danger,
                      }}
                      className="mx-auto mb-4"
                    />

                    <h4
                      className="anpr-serif text-lg mb-2"
                      style={{
                        color: C.danger,
                      }}
                    >
                      Scan failed
                    </h4>

                    <p
                      className="text-sm mb-6"
                      style={{
                        color: C.inkSoft,
                      }}
                    >
                      {errorMessage}
                    </p>

                    <button
                      onClick={resetUpload}
                      className="anpr-btn px-6 py-2.5 text-sm font-medium"
                      style={{
                        border: `1px solid ${C.lineStrong}`,
                        color: C.ink,
                      }}
                    >
                      Try again
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* -------------------------------------------------------
          HISTORY PANEL
      ------------------------------------------------------- */}

      <AnimatePresence>
        {showHistory && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHistory(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{
                duration: 0.3,
                ease: power3Out,
              }}
              className="fixed inset-0 m-auto z-50 w-[92%] max-w-[1500px] h-[88vh] bg-white rounded-2xl flex flex-col overflow-hidden border"
              style={{
                borderColor: C.line,
                boxShadow:
                  "0 40px 100px -20px rgba(37,99,235,0.25), 0 0 0 1px rgba(37,99,235,0.06)",
              }}
            >
              <div
                className="px-6 py-4 border-b flex items-center justify-between bg-white"
                style={{
                  borderColor: C.line,
                }}
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <ListVideo
                      className="text-blue-600"
                      size={20}
                    />

                    Residential Incident Logs
                  </h2>

                  <p className="text-xs text-slate-500 mt-1">
                    Historical record of all detected home
                    security threats
                  </p>
                </div>

                <button
                  onClick={() => setShowHistory(false)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div
                className="px-6 py-3 grid grid-cols-4 gap-3 bg-slate-50 border-b"
                style={{
                  borderColor: C.line,
                }}
              >
                <div
                  className="p-4 rounded-xl bg-white border shadow-sm"
                  style={{
                    borderColor: C.line,
                  }}
                >
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Total Incidents
                  </div>

                  <div className="text-2xl font-bold text-slate-900">
                    {totalLogs}
                  </div>
                </div>

                <div
                  className="p-4 rounded-xl bg-white border shadow-sm"
                  style={{
                    borderColor: C.line,
                  }}
                >
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Hash size={12} />
                    Monitored Zones
                  </div>

                  <div className="text-2xl font-bold text-blue-700">
                    {uniqueZones}
                  </div>
                </div>

                <div
                  className="p-4 rounded-xl bg-white border shadow-sm"
                  style={{
                    borderColor: C.line,
                  }}
                >
                  <div className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <AlertTriangle size={12} />
                    Critical Alerts
                  </div>

                  <div className="text-2xl font-bold text-red-700">
                    {criticalAlerts}
                  </div>
                </div>

                <div
                  className="p-4 rounded-xl bg-white border shadow-sm"
                  style={{
                    borderColor: C.line,
                  }}
                >
                  <div className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <TrendingUp size={12} />
                    Avg Confidence
                  </div>

                  <div className="text-2xl font-bold text-purple-700">
                    {avgConfidence}%
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col overflow-hidden">
                <div
                  className="px-6 py-3 border-b bg-slate-50 flex items-center justify-between"
                  style={{
                    borderColor: C.line,
                  }}
                >
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    All Incidents
                  </h3>

                  <span className="text-xs text-slate-500 font-mono">
                    {history.length} records loaded
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {loadingHistory ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                      <Loader2
                        className="animate-spin mb-2"
                        size={32}
                      />

                      <span className="text-xs font-mono">
                        Fetching historical data...
                      </span>
                    </div>
                  ) : history.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                      <Database
                        size={48}
                        className="mb-3 opacity-20"
                      />

                      <p className="text-sm font-medium">
                        No historical incidents found
                      </p>
                    </div>
                  ) : (
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm">
                        <tr>
                          <th
                            className="px-6 py-3 font-semibold text-slate-500 border-b"
                            style={{
                              borderColor: C.line,
                            }}
                          >
                            ID
                          </th>

                          <th
                            className="px-6 py-3 font-semibold text-slate-500 border-b"
                            style={{
                              borderColor: C.line,
                            }}
                          >
                            Zone
                          </th>

                          <th
                            className="px-6 py-3 font-semibold text-slate-500 border-b"
                            style={{
                              borderColor: C.line,
                            }}
                          >
                            Event Type
                          </th>

                          <th
                            className="px-6 py-3 font-semibold text-slate-500 border-b"
                            style={{
                              borderColor: C.line,
                            }}
                          >
                            Confidence
                          </th>

                          <th
                            className="px-6 py-3 font-semibold text-slate-500 border-b"
                            style={{
                              borderColor: C.line,
                            }}
                          >
                            Timestamp
                          </th>
                        </tr>
                      </thead>

                      <tbody
                        className="divide-y"
                        style={{
                          borderColor: C.line,
                        }}
                      >
                        {history.map(
                          (log: any, idx: number) => (
                            <motion.tr
                              key={log.id}
                              initial={{
                                opacity: 0,
                                y: 8,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              transition={{
                                duration: 0.3,
                                delay: Math.min(
                                  idx,
                                  12
                                ) * 0.03,
                              }}
                              onClick={() =>
                                setSelectedLog(log)
                              }
                              className={`cursor-pointer transition-colors ${
                                selectedLog?.id ===
                                log.id
                                  ? "bg-blue-50 border-l-4 border-l-blue-600"
                                  : "hover:bg-slate-50 border-l-4 border-l-transparent"
                              }`}
                              style={{
                                borderColor: C.line,
                              }}
                            >
                              <td className="px-6 py-3 font-mono text-slate-700">
                                #{log.id}
                              </td>

                              <td className="px-6 py-3 font-mono text-slate-700">
                                {log.zone}
                              </td>

                              <td className="px-6 py-3 font-mono font-bold text-blue-700">
                                {log.event}
                              </td>

                              <td className="px-6 py-3 font-mono text-slate-700">
                                {log.confidence.toFixed(1)}%
                              </td>

                              <td className="px-6 py-3 text-slate-500 text-xs flex items-center gap-2">
                                <Clock size={14} />

                                {new Date(
                                  log.timestamp
                                ).toLocaleString()}
                              </td>
                            </motion.tr>
                          )
                        )}
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