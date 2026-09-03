'use client';

import React, { useState, useEffect } from 'react';
import { Clock, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

interface QuotaCountdownBannerProps {
  initialSeconds: number;
  onTimerFinished: () => void;
}

export default function QuotaCountdownBanner({
  initialSeconds,
  onTimerFinished,
}: QuotaCountdownBannerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
    if (initialSeconds <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimerFinished();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialSeconds, onTimerFinished]);

  const percentage = Math.max(0, Math.min(100, (secondsLeft / initialSeconds) * 100));

  return (
    <div className="bg-gradient-to-r from-amber-950/80 via-zinc-900 to-rose-950/80 border border-amber-500/40 rounded-2xl p-5 shadow-2xl relative overflow-hidden flex flex-col gap-3.5 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-amber-300 flex items-center gap-2">
              Batas Kuota Gratisan Gemini AI Sesaat
            </h4>
            <p className="text-xs text-zinc-400">
              Google AI Studio sedang mendinginkan server (*Free Tier Rate Limit*).
            </p>
          </div>
        </div>

        <span className="text-xl font-black text-amber-400 font-mono px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 shadow-inner">
          {secondsLeft}s
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-zinc-800">
        <div
          className="bg-gradient-to-r from-amber-500 via-rose-500 to-amber-400 h-full transition-all duration-1000 ease-linear rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
        <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          {secondsLeft > 0
            ? `Silakan tunggu ${secondsLeft} detik lagi...`
            : 'Kuota sudah kembali! Tombol siap digunakan.'}
        </span>

        {secondsLeft <= 0 && (
          <button
            type="button"
            onClick={onTimerFinished}
            className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 underline underline-offset-2"
          >
            <RefreshCw className="w-3 h-3" /> Coba Lagi Sekarang
          </button>
        )}
      </div>
    </div>
  );
}
