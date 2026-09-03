'use client';

import React from 'react';
import { Eye, Scan, Smile, AlertTriangle, Sparkles } from 'lucide-react';

interface VisualBreakdownProps {
  breakdown: string;
  modelUsed?: string;
}

export default function VisualBreakdown({ breakdown, modelUsed }: VisualBreakdownProps) {
  const formattedModel = modelUsed ? modelUsed.replace('models/', '') : 'gemini-3.5-flash-lite';

  return (
    <div className="bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-purple-950/40 border border-purple-500/30 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-md">
            <Scan className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-purple-200 flex items-center gap-2">
              Hasil Analisis Wajah & Bukti Visual Selfie
            </h3>
            <p className="text-[11px] text-zinc-400 font-medium">
              Multimodal AI Vision Facial Recognition & Mood Log
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
          <Sparkles className="w-3 h-3 text-amber-400" /> {formattedModel}
        </span>
      </div>

      <div className="bg-zinc-950/90 border border-zinc-800/90 p-4 rounded-xl text-zinc-200 text-sm leading-relaxed font-mono shadow-inner flex items-start gap-3">
        <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-purple-400 shrink-0 mt-0.5">
          <Smile className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <p className="whitespace-pre-line">{breakdown}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400 font-medium pt-2 border-t border-zinc-800/60">
        <span className="flex items-center gap-1.5 text-zinc-400">
          <Eye className="w-3.5 h-3.5 text-purple-400" /> Deteksi raut muka & tatapan mata otomatis oleh Google {formattedModel}
        </span>
        <span className="text-amber-400 flex items-center gap-1 font-semibold">
          <AlertTriangle className="w-3.5 h-3.5" /> Bukti Otentik Alibi
        </span>
      </div>
    </div>
  );
}
