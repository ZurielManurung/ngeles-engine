'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Camera, RefreshCw, Upload, Check, AlertCircle, Sparkles, ShieldCheck, Cpu, Lightbulb } from 'lucide-react';

interface CameraCaptureProps {
  onImageCaptured: (base64Image: string | null) => void;
  imagePreview: string | null;
}

export default function CameraCapture({ onImageCaptured, imagePreview }: CameraCaptureProps) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Tips with balanced text length to keep container height rock-solid & fixed
  const tips = [
    'Selalu sertakan emoji pasrah (🙏/😭) untuk meningkatkan keabsahan alibi hingga +45%.',
    'Kirim Voice Note (VN) di jam ganjil (misal 07:14) agar alibi terkesan spontan & dadakan.',
    'Gunakan fitur View Once (sekali lihat) di WA untuk alibi Tier 3 agar misterius & aman.',
    'Raut muka cengengesan polos biasanya langsung membuat lawan bicara pasrah memaklumi.',
  ];

  const [currentTipIdx, setCurrentTipIdx] = useState(0);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTipIdx((prev) => (prev + 1) % tips.length);
    }, 6000);
    return () => clearInterval(tipInterval);
  }, [tips.length]);

  // Callback ref to bind stream safely as soon as video DOM element mounts
  const setVideoRef = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (node && streamRef.current && node.srcObject !== streamRef.current) {
      node.srcObject = streamRef.current;
      node.play().catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('Play video error:', err);
        }
      });
    }
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = stream;
      
      setIsCameraActive(true);

      if (videoRef.current && videoRef.current.srcObject !== stream) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch((err) => {
          if (err.name !== 'AbortError') console.error(err);
        });
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError('Gagal mengakses kamera. Silakan gunakan tombol Upload Foto!');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      onImageCaptured(dataUrl);
      stopCamera();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onImageCaptured(reader.result as string);
      stopCamera();
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4.5 flex flex-col gap-3 shadow-xl h-full justify-between">
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
            <Camera className="w-4 h-4 text-amber-400" />
            <span>Upload / Ambil Foto Selfie (Bukti Visual)</span>
          </label>
          {imagePreview ? (
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 font-medium">
              <Check className="w-3 h-3" /> Foto Siap!
            </span>
          ) : (
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1 font-medium">
              <Sparkles className="w-3 h-3 text-amber-400" /> Auto Face Scan
            </span>
          )}
        </div>

        {/* Main View Area */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center group shadow-inner">
          {/* Case 1: Active Video Camera */}
          {isCameraActive && (
            <div className="relative w-full h-full">
              <video
                ref={setVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
              <button
                type="button"
                onClick={capturePhoto}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-5 py-2 rounded-full shadow-lg shadow-amber-500/30 flex items-center gap-2 transition-transform active:scale-95 z-10 text-xs"
              >
                <Camera className="w-4 h-4" /> Jepret Foto!
              </button>
            </div>
          )}

          {/* Case 2: Captured/Uploaded Image Preview */}
          {!isCameraActive && imagePreview && (
            <div className="relative w-full h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Selfie Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={startCamera}
                  className="bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold px-3.5 py-1.5 rounded-xl border border-zinc-700 flex items-center gap-1.5 shadow-lg"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Foto Ulang Kamera
                </button>
                <label className="cursor-pointer bg-amber-500/90 hover:bg-amber-400 text-zinc-950 text-xs font-bold px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg">
                  <Upload className="w-3.5 h-3.5" /> Ganti File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Case 3: Initial Empty State */}
          {!isCameraActive && !imagePreview && (
            <div className="p-5 text-center flex flex-col items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center text-zinc-400 shadow-md">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-300">Ambil Selfie atau Upload Foto</p>
                <p className="text-[11px] text-zinc-500 mt-0.5 max-w-xs">
                  AI akan menganalisis raut wajah (senyum/muka bantal) & suasana foto secara real-time.
                </p>
              </div>

              {cameraError && (
                <p className="text-[11px] text-rose-400 flex items-center gap-1 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20">
                  <AlertCircle className="w-3 h-3" /> {cameraError}
                </p>
              )}

              <div className="flex flex-wrap justify-center items-center gap-2 mt-1">
                <button
                  type="button"
                  onClick={startCamera}
                  className="bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition hover:scale-105 active:scale-95"
                >
                  <Camera className="w-3.5 h-3.5" /> Buka Kamera
                </button>
                <label className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-semibold px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition">
                  <Upload className="w-3.5 h-3.5 text-zinc-400" /> Upload Gambar
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>

      {/* AI Radar Stats & Compact Tips Widget */}
      <div className="flex flex-col gap-2">
        {/* Radar Metrics Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-2 flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <div>
              <p className="text-[9px] text-zinc-500 font-semibold uppercase">Vision Model</p>
              <p className="text-[10px] font-bold text-zinc-200">Gemini 3.5 Lite</p>
            </div>
          </div>
          <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-2 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <div>
              <p className="text-[9px] text-zinc-500 font-semibold uppercase">Alibi Safety</p>
              <p className="text-[10px] font-bold text-emerald-400">High Confidence</p>
            </div>
          </div>
        </div>

        {/* Dynamic Tips Box with Compact Padding & Paten Height */}
        <div className="bg-gradient-to-r from-purple-950/30 via-zinc-950 to-amber-950/30 border border-purple-500/20 rounded-xl p-2.5 flex flex-col justify-center shadow-md min-h-[56px]">
          <div className="flex items-center gap-1.5">
            <Lightbulb className="w-3 h-3 text-amber-400 shrink-0 animate-pulse" />
            <p className="text-[9px] font-extrabold text-purple-300 uppercase tracking-wider">
              Tips Guru Ngeles #{(currentTipIdx % 4) + 1}
            </p>
          </div>
          <p className="text-[11px] text-zinc-300 font-medium leading-tight transition-all duration-300 mt-0.5">
            "{tips[currentTipIdx]}"
          </p>
        </div>
      </div>
    </div>
  );
}
