import React, { useState, useRef, useEffect } from "react";
import { 
  UploadCloud, FileVideo, CheckCircle2, ArrowLeft, Sparkles, Clock,
} from "lucide-react";

// --- Design Tokens - MATCHING LANDING PAGE ---
const C = {
  bg: "#F5F5F0",
  ink: "#2D2D2D",
  inkSoft: "#4A4A4A",
  inkFaint: "#6B6B6B",
  border: "#E0E0E0",
  accent: "#2D2D2D",
  cardBorder: "#3D3832",
};

interface EggCountingUploadProps {
  onBack: () => void;
}

export default function EggCountingUpload({ onBack }: EggCountingUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingState, setProcessingState] = useState<'idle' | 'uploading' | 'processing' | 'complete'>('idle');
  const [, setElapsedTime] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (processingState !== 'processing') return;
    
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
      setUploadProgress(prev => Math.min(prev + 0.5, 100));
    }, 100);

    const timeout = setTimeout(() => {
      setProcessingState('complete');
      clearInterval(interval);
    }, 10000); 

    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [processingState]);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('video/')) {
      setFile(droppedFile);
      startProcessing();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      startProcessing();
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const startProcessing = () => {
    setProcessingState('uploading');
    setTimeout(() => setProcessingState('processing'), 1500);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: C.bg, color: C.ink, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* Background Blobs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute rounded-full" style={{ width: 600, height: 600, top: -200, right: -100, background: "radial-gradient(circle at 35% 35%, #E8E8E0, transparent 70%)", filter: "blur(80px)", opacity: 0.5 }} />
        <div className="absolute rounded-full" style={{ width: 500, height: 500, bottom: -150, left: -100, background: "radial-gradient(circle at 35% 35%, #DCDCD5, transparent 70%)", filter: "blur(80px)", opacity: 0.4 }} />
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <header className="max-w-7xl mx-auto px-8 py-6">
          <button onClick={onBack} className="group flex items-center gap-2 text-sm font-bold transition-colors hover:opacity-70" style={{ color: C.ink }}>
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
          </button>
        </header>

        <main className="max-w-7xl mx-auto px-8 pb-20">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            
            {/* Left: Editorial Headline */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-gray-300 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-gray-600 animate-pulse" />
                <span className="text-xs font-bold text-gray-700 uppercase tracking-[0.2em]">Module Upload</span>
              </div>

              <h1 className="font-bold leading-[0.95]" style={{ fontSize: "clamp(40px, 6vw, 64px)", color: C.ink, fontFamily: "'Cinzel', serif", textShadow: "2px 2px 0 #ccc, 4px 4px 0 #bbb" }}>
                EGG & CHICKEN<br/>
                <span style={{ color: C.inkSoft }}>COUNTING</span>
              </h1>

              <p className="text-lg font-medium leading-relaxed max-w-md" style={{ color: C.inkSoft, fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                / Upload hatchery footage for AI-powered census /
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: "rgba(255,255,255,0.7)", color: C.ink, border: `1px solid ${C.cardBorder}` }}>
                  MP4 / MOV Only
                </span>
                <span className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: "rgba(255,255,255,0.7)", color: C.ink, border: `1px solid ${C.cardBorder}` }}>
                  Max 2GB
                </span>
                <span className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: "rgba(255,255,255,0.7)", color: C.ink, border: `1px solid ${C.cardBorder}` }}>
                  ~10 Min Processing
                </span>
              </div>
            </div>

            {/* Right: Floating Upload Card */}
            <div className="relative">
              <div className="relative rounded-[2rem] overflow-hidden" style={{ background: "#FFFFFF", boxShadow: "0 40px 80px -20px rgba(45,45,45,0.2)" }}>
                {/* Card Header */}
                <div className="px-8 py-6 border-b" style={{ borderColor: C.border }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300" />
                      <div className="w-3 h-3 rounded-full bg-gray-300" />
                      <div className="w-3 h-3 rounded-full bg-gray-300" />
                    </div>
                    <span className="text-xs font-mono" style={{ color: C.inkFaint }}>iedge.upload</span>
                  </div>
                </div>
                
                {/* Upload Area */}
                <div className="p-8">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="video/mp4,video/mov"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={processingState === 'idle' && !file ? triggerFileInput : undefined}
                    className={`rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-300 ${
                      isDragging ? 'scale-[1.02]' : 'hover:shadow-lg'
                    }`}
                    style={{ 
                      borderColor: isDragging ? C.accent : C.cardBorder,
                      background: isDragging ? '#EAEAE5' : 'transparent',
                      minHeight: '280px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {processingState === 'idle' && !file && (
                      <>
                        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ background: C.bg, border: `1px solid ${C.cardBorder}` }}>
                          <UploadCloud size={32} style={{ color: C.ink }} />
                        </div>
                        <h3 className="text-lg font-bold mb-2" style={{ color: C.ink, fontFamily: "'Cinzel', serif" }}>Upload Video</h3>
                        <p className="text-sm mb-4" style={{ color: C.inkFaint }}>Drag & drop or click to browse</p>
                        <button className="px-6 py-3 rounded-full text-sm font-bold transition-all hover:scale-105" style={{ background: C.accent, color: "#F5F5F0" }}>
                          Select File
                        </button>
                      </>
                    )}

                    {(processingState !== 'idle' || file) && (
                      <div className="w-full">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: C.bg, border: `1px solid ${C.cardBorder}` }}>
                            <FileVideo size={20} style={{ color: C.ink }} />
                          </div>
                          <div className="text-left flex-1">
                            <p className="text-sm font-bold truncate" style={{ color: C.ink }}>{file?.name || "hatchery_footage.mp4"}</p>
                            <p className="text-xs" style={{ color: C.inkFaint }}>{file ? (file.size / 1024 / 1024).toFixed(2) : "142.8"} MB</p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-3 flex justify-between text-xs font-mono" style={{ color: C.inkSoft }}>
                          <span>{processingState === 'uploading' ? 'Uploading...' : processingState === 'processing' ? 'Processing...' : 'Complete'}</span>
                          <span>{Math.round(uploadProgress)}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: C.bg, border: `1px solid ${C.cardBorder}` }}>
                          <div 
                            className="h-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%`, background: C.accent }}
                          />
                        </div>

                        {processingState === 'complete' && (
                          <div className="mt-4 p-3 rounded-lg flex items-center gap-2 text-sm" style={{ background: "#F0FDF4", color: "#166534", border: "1px solid #BBF7D0" }}>
                            <CheckCircle2 size={16} />
                            <span className="font-bold">Analysis Complete</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-white shadow-lg border" style={{ borderColor: C.border }}>
                <div className="flex items-center gap-2">
                  <Sparkles size={14} style={{ color: C.ink }} />
                  <span className="text-xs font-bold" style={{ color: C.ink }}>AI Powered</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Two Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Left Card: What It Does (Light) */}
            <div className="rounded-[2rem] p-10 relative overflow-hidden" style={{ background: `linear-gradient(135deg, #E8E8E0 0%, #DCDCD5 100%)`, boxShadow: "0 20px 40px -10px rgba(45,45,45,0.1)" }}>
              <div className="relative z-10">
                <div className="text-xs uppercase tracking-[0.2em] font-bold mb-4" style={{ color: C.inkFaint }}>
                  What It Does
                </div>
                <h3 className="text-3xl font-bold mb-6" style={{ color: C.ink, fontFamily: "'Cinzel', serif", textShadow: "2px 2px 0 #ccc, 4px 4px 0 #bbb" }}>
                  Automated<br/>Census System
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: C.inkSoft }}>
                  Upload your hatchery footage and our AI analyzes every frame to count birds and eggs with 99.9% accuracy. No manual counting, no errors—just precise data synced to your inventory.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["99.9% Accuracy", "Real-time Processing", "ERP Sync"].map((tag, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "rgba(255,255,255,0.7)", color: C.ink, border: `1px solid ${C.border}` }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full" style={{ background: "rgba(255,255,255,0.3)", filter: "blur(20px)" }} />
            </div>

            {/* Right Card: Stats (Dark) */}
            <div className="rounded-[2rem] p-10 relative overflow-hidden flex flex-col justify-between" style={{ background: C.accent, color: "#F5F5F0", boxShadow: "0 20px 40px -10px rgba(45,45,45,0.2)" }}>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] font-bold mb-4" style={{ color: "#9A9A9A" }}>
                  Processing Power
                </div>
                <h3 className="text-3xl font-bold mb-8" style={{ fontFamily: "'Cinzel', serif", textShadow: "2px 2px 0 #4A4A4A, 4px 4px 0 #5A5A5A" }}>
                  YOLOv8<br/>Pipeline
                </h3>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-5xl font-bold" style={{ fontFamily: "'Cinzel', serif", textShadow: "3px 3px 0 #4A4A4A" }}>
                    30<span className="text-2xl ml-1">FPS</span>
                  </div>
                  <div className="text-sm mt-2" style={{ color: "#9A9A9A" }}>Real-time Analysis</div>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: "#9A9A9A" }}>
                  <Clock size={16} />
                  <span>~10 min processing</span>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full" style={{ background: "rgba(255,255,255,0.05)", filter: "blur(20px)" }} />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}