'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import CameraCapture from '@/components/CameraCapture';
import VisualBreakdown from '@/components/VisualBreakdown';
import ExcuseCard from '@/components/ExcuseCard';
import QuotaCountdownBanner from '@/components/QuotaCountdownBanner';
import { ExcuseResponse, TargetRecipient } from '@/types/excuse';
import { Zap, Sparkles, UserCheck, AlertCircle, RefreshCw, MessageSquareWarning } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Home() {
  const [problem, setProblem] = useState('');
  const [recipient, setRecipient] = useState<TargetRecipient>('Teman / Tongkrongan');
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quotaSeconds, setQuotaSeconds] = useState<number | null>(null);
  const [result, setResult] = useState<ExcuseResponse | null>(null);

  const presets = [
    'gak bisa nyelesaiin task hari ini mau main game dulu',
    'Telat meeting pagi 30 menit',
    'Batal nongkrong malam ini',
    'Deadline laporan/tugas terlewat',
  ];

  const recipients: TargetRecipient[] = [
    'Teman / Tongkrongan',
    'Bos / Atasan',
    'Dosen / Kampus',
    'Pasangan / Doang',
    'Umum',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem.trim()) {
      setError('Harap masukkan masalah atau situasi yang kamu hadapi!');
      return;
    }

    setError(null);
    setQuotaSeconds(null);
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/generate-excuse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_problem: problem,
          target_recipient: recipient,
          user_selfie: selfieImage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.isQuotaError) {
          setQuotaSeconds(data.retrySeconds || 30);
          return;
        }
        throw new Error(data.error || 'Gagal memproses alasan.');
      }

      setResult(data);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setQuotaSeconds(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col selection:bg-amber-500 selection:text-zinc-950">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 flex flex-col gap-8">
        {/* Hero Banner */}
        <section className="text-center flex flex-col items-center gap-3 py-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold shadow-lg">
            <Sparkles className="w-3.5 h-3.5" /> Absurd Hackathon 2026 Submission
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-zinc-100 via-amber-200 to-rose-300 bg-clip-text text-transparent">
            The Master of Excuses
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-normal leading-relaxed">
            Engine alibi otomatis berbasis <span className="text-amber-400 font-semibold">Multimodal AI Vision</span>. Analisis raut wajah selfie kamu & kondisi sekitar untuk menghasilkan 3 tier alasan ngeles kocak yang bikin lawan bicara pasrah memaklumi!
          </p>
        </section>

        {/* Input Form Section */}
        {!result && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
            {/* Target Recipient Selector */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 shadow-xl flex flex-col gap-3">
              <label className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-amber-400" /> Target Penerima Alasan
              </label>
              <div className="flex flex-wrap gap-2">
                {recipients.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRecipient(r)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      recipient === r
                        ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Problem Input */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 shadow-xl flex flex-col gap-3">
              <label className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                <MessageSquareWarning className="w-4 h-4 text-amber-400" /> Masalah / Situasi yang Dihadapi
              </label>
              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Contoh: Telat meeting 30 menit, belum ngerjain laporan, batal nongkrong..."
                rows={3}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition resize-none"
              />

              {/* Preset Chips */}
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-[11px] font-semibold text-zinc-500">Contoh Cepat:</span>
                {presets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setProblem(preset)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 border border-zinc-700/60 transition"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Camera / Selfie Upload */}
            <CameraCapture
              onImageCaptured={(img) => setSelfieImage(img)}
              imagePreview={selfieImage}
            />

            {/* Interactive Quota Countdown Banner */}
            {quotaSeconds !== null && (
              <QuotaCountdownBanner
                initialSeconds={quotaSeconds}
                onTimerFinished={() => setQuotaSeconds(null)}
              />
            )}

            {/* General Error Message */}
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold p-4 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || quotaSeconds !== null}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-400 hover:via-rose-400 hover:to-purple-500 text-zinc-950 font-black text-base tracking-wide shadow-xl shadow-rose-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-zinc-950" />
                  <span>Sedang Menganalisis Visual Selfie & Mengarang Alasan...</span>
                </>
              ) : quotaSeconds !== null ? (
                <span>Menunggu Kuota Reset ({quotaSeconds}s)...</span>
              ) : (
                <>
                  <Zap className="w-5 h-5 fill-zinc-950" />
                  <span>Hasilkan 3 Tier Alasan Ngeles!</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Results Section */}
        {result && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400 fill-amber-400" /> Hasil Rekomendasi Alasan
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Target: <span className="text-amber-400 font-semibold">{recipient}</span> • Masalah: "{problem}"
                </p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold border border-zinc-700 flex items-center gap-1.5 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Buat Alasan Baru
              </button>
            </div>

            {/* Visual Breakdown */}
            {result.visual_breakdown && (
              <VisualBreakdown
                breakdown={result.visual_breakdown}
                modelUsed={result.model_used}
              />
            )}

            {/* 3 Tier Recommendations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {result.recommendations.map((rec, index) => (
                <ExcuseCard key={rec.tier || index} recommendation={rec} index={index} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-600">
        <p>Built for Absurd Hackathon 2026 • Powered by Next.js & Google Gemini Vision AI</p>
      </footer>
    </div>
  );
}
