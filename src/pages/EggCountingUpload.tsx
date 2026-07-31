import React, { useState, useRef, useEffect } from "react";
import { 
  UploadCloud, FileVideo, CheckCircle2, Cpu, ArrowLeft, Zap, Info 
} from "lucide-react";

const C = {
  bg: "#F4F7ED", ink: "#111827", inkSoft: "#374151", inkFaint: "#6B7280",
  green700: "#166534", green600: "#15803D", green100: "#dcfce7",
};

interface EggCountingUploadProps {
  onBack: () => void;
}

export default function EggCountingUpload({ onBack }: EggCountingUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingState, setProcessingState] = useState<'idle' | 'uploading' | 'processing' | 'complete'>('idle');
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulate Processing Timeline
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

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen p-8 overflow-y-auto" style={{ background: C.bg, color: C.ink, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in-down">
          <button onClick={onBack} className="group flex items-center gap-2 text-sm font-bold transition-colors cursor-pointer" style={{ color: C.ink }}>
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
          </button>
          <div className="text-right">
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: C.ink }}>Poultry Vision AI</h1>
            <p className="text-sm mt-1 font-medium" style={{ color: C.inkSoft }}>Module ID: PV-2026-X8 · Enterprise Sync Enabled</p>
          </div>
        </div>

        {/* ✅ SELF-EXPLANATORY INTRO SECTION */}
        <div className="mb-8 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm animate-fade-in-up">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <Info size={20} className="text-green-700" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2" style={{ color: C.ink }}>What does this module do?</h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: C.inkSoft }}>
                Upload raw hatchery footage to generate an auditable census of birds and eggs. Our YOLOv8 pipeline processes every frame to eliminate manual counting errors and syncs structured data directly to your enterprise ledger.
              </p>
              <div className="flex flex-wrap gap-3 text-xs font-mono font-bold uppercase tracking-wider" style={{ color: C.inkFaint }}>
                <span className="px-2 py-1 rounded bg-gray-100">MP4 / MOV Only</span>
                <span className="px-2 py-1 rounded bg-gray-100">Max 2GB</span>
                <span className="px-2 py-1 rounded bg-gray-100">~10 Min Processing</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column: Premium Upload Zone */}
          <div className="lg:col-span-2 space-y-6">
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
              className={`relative rounded-3xl border-2 border-dashed p-12 flex flex-col items-center justify-center text-center transition-all duration-300 ${
                isDragging ? 'border-green-600 bg-green-50 scale-[1.02]' : 'border-gray-300 bg-white hover:border-green-400 hover:shadow-xl'
              }`}
              style={{ minHeight: '400px', cursor: processingState === 'idle' && !file ? 'pointer' : 'default' }}
              onClick={processingState === 'idle' && !file ? triggerFileInput : undefined}
            >
              {processingState === 'idle' && !file && (
                <>
                  <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6 animate-pulse-slow">
                    <UploadCloud size={40} className="text-green-700" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: C.ink }}>Upload Hatchery Footage</h3>
                  <p className="max-w-md mb-8 leading-relaxed" style={{ color: C.inkSoft }}>Drag & drop your MP4 video here, or click the button below to browse. Ensure footage has clear overhead visibility for optimal detection.</p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); triggerFileInput(); }}
                    className="px-8 py-4 rounded-full bg-green-700 text-white font-bold text-base shadow-lg hover:bg-green-800 hover:shadow-green-900/20 transition-all pointer-events-auto active:scale-95"
                  >
                    Select Video File
                  </button>
                </>
              )}

              {(processingState !== 'idle' || file) && (
                <div className="w-full max-w-md">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                      <FileVideo size={24} className="text-gray-600" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-bold truncate" style={{ color: C.ink }}>{file?.name || "RJP_HATCHERY_CAM04.mp4"}</p>
                      <p className="text-xs font-mono" style={{ color: C.inkSoft }}>{file ? (file.size / 1024 / 1024).toFixed(2) : "142.8"} MB · MP4 Container</p>
                    </div>
                  </div>

                  {/* Shimmer Progress Bar */}
                  <div className="mb-2 flex justify-between text-xs font-mono font-bold uppercase tracking-wider" style={{ color: C.inkSoft }}>
                    <span>{processingState === 'uploading' ? 'Ingesting Stream...' : processingState === 'processing' ? 'AI Analysis Active' : 'Complete'}</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden relative">
                    <div 
                      className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-300 relative"
                      style={{ width: `${uploadProgress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-shimmer" />
                    </div>
                  </div>

                  {processingState === 'processing' && (
                    <div className="mt-6 p-4 rounded-xl bg-gray-900 text-green-300 font-mono text-xs space-y-2 border border-gray-800">
                      <div className="flex justify-between"><span>FRAME_EXTRACT</span><span className="text-green-500">OK</span></div>
                      <div className="flex justify-between"><span>YOLOv8_INFERENCE</span><span className="animate-pulse text-yellow-400">RUNNING...</span></div>
                      <div className="flex justify-between"><span>ERP_SYNC</span><span className="text-gray-600">PENDING</span></div>
                      <div className="pt-2 border-t border-gray-800 flex justify-between">
                        <span>EST. REMAINING</span>
                        <span>{formatTime(Math.max(0, 600 - elapsedTime))}</span>
                      </div>
                    </div>
                  )}

                  {processingState === 'complete' && (
                    <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm font-bold flex items-center gap-3 animate-fade-in-up">
                      <CheckCircle2 size={20} />
                      Analysis Complete. Results synced to Enterprise Ledger.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: How It Works + Specs */}
          <div className="space-y-6">
            
            {/* ✅ HOW IT WORKS SECTION (Replaces empty space) */}
            <div className="tech-specs p-6 rounded-2xl bg-white border border-gray-200 shadow-sm animate-fade-in-right" style={{ animationDelay: '0.1s' }}>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] font-bold mb-4 flex items-center gap-2" style={{ color: "#9CA3AF" }}>
                <Zap size={12} /> How It Works
              </h3>
              <ol className="space-y-4 text-sm counter-reset-step" style={{ color: C.inkSoft }}>
                <li className="flex gap-3 relative pl-6 before:content-['01'] before:absolute before:left-0 before:top-0 before:text-xs before:font-mono before:font-bold before:text-green-700">
                  <span><strong className="text-gray-900">Upload:</strong> Submit raw video via secure multipart endpoint. System validates format and size instantly.</span>
                </li>
                <li className="flex gap-3 relative pl-6 before:content-['02'] before:absolute before:left-0 before:top-0 before:text-xs before:font-mono before:font-bold before:text-green-700">
                  <span><strong className="text-gray-900">Process:</strong> YOLOv8n model analyzes every frame. Birds and eggs are detected, counted, and classified.</span>
                </li>
                <li className="flex gap-3 relative pl-6 before:content-['03'] before:absolute before:left-0 before:top-0 before:text-xs before:font-mono before:font-bold before:text-green-700">
                  <span><strong className="text-gray-900">Sync:</strong> Structured JSON payload is written to PostgreSQL and pushed to your ERP inventory ledger automatically.</span>
                </li>
              </ol>
            </div>

            <div className="tech-specs p-6 rounded-2xl bg-white border border-gray-200 shadow-sm animate-fade-in-right" style={{ animationDelay: '0.2s' }}>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] font-bold mb-4 flex items-center gap-2" style={{ color: "#9CA3AF" }}>
                <Cpu size={12} /> Pipeline Architecture
              </h3>
              <ul className="space-y-4 text-sm" style={{ color: C.inkSoft }}>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 shrink-0" />
                  <span><strong className="text-gray-900">Ingestion:</strong> Raw MP4 stream buffered via secure multipart endpoint.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 shrink-0" />
                  <span><strong className="text-gray-900">Detection:</strong> YOLOv8n model optimized for high-density poultry environments.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 shrink-0" />
                  <span><strong className="text-gray-900">Persistence:</strong> Metadata (path, ts, counts) written to PostgreSQL JSONB column.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 shrink-0" />
                  <span><strong className="text-gray-900">Integration:</strong> REST API triggers automated inventory ledger update.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
      
      {/* Native CSS Animations (Zero Dependencies) */}
      <style>{`
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseSlow { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        
        .animate-fade-in-down { animation: fadeInDown 0.6s ease-out forwards; }
        .animate-fade-in-right { animation: fadeInRight 0.5s ease-out forwards; opacity: 0; }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
        .animate-pulse-slow { animation: pulseSlow 3s infinite ease-in-out; }
        .animate-shimmer { animation: shimmer 2s infinite linear; }
      `}</style>
    </div>
  );
}