'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import CameraCapture from '@/components/CameraCapture';
import VisualBreakdown from '@/components/VisualBreakdown';
import ExcuseCard from '@/components/ExcuseCard';
import QuotaCountdownBanner from '@/components/QuotaCountdownBanner';
import { ExcuseResponse, TargetRecipient } from '@/types/excuse';
import { Zap, UserCheck, AlertCircle, RefreshCw, MessageSquareWarning } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'nature'>('nature'); // Default to nature emerald theme
  const [problem, setProblem] = useState('');
  const [recipient, setRecipient] = useState<TargetRecipient>('Teman / Tongkrongan');
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quotaSeconds, setQuotaSeconds] = useState<number | null>(null);
  const [result, setResult] = useState<ExcuseResponse | null>(null);

  // Short & punchy quick presets
  const presets = [
    'Mager ngerjain task, mau main game',
    'Batal ngedate besok bareng doi',
    'Telat meeting pagi gara-gara kesiangan',
    'Batal nongkrong malam ini',
  ];

  const recipients: TargetRecipient[] = [
    'Teman / Tongkrongan',
    'Bos / Atasan',
    'Dosen / Kampus',
    'Pasangan / Doi',
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

  const bgUrl = theme === 'nature' ? "bg-[url('/bg-nature.jpg')]" : "bg-[url('/bg-pattern.jpg')]";

  return (
    <div className={`min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-zinc-950 ${bgUrl} bg-repeat bg-fixed relative overflow-x-hidden transition-all duration-500`}>
      {/* Ambient Blur Gradient Background Lights */}
      {theme === 'nature' ? (
        <>
          <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/25 rounded-full blur-[150px] pointer-events-none transition-all duration-500" />
          <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[150px] pointer-events-none transition-all duration-500" />
          <div className="fixed top-[40%] right-[15%] w-[350px] h-[350px] bg-lime-500/15 rounded-full blur-[130px] pointer-events-none transition-all duration-500" />
        </>
      ) : (
        <>
          <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none transition-all duration-500" />
          <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[150px] pointer-events-none transition-all duration-500" />
          <div className="fixed top-[40%] right-[15%] w-[350px] h-[350px] bg-rose-500/15 rounded-full blur-[130px] pointer-events-none transition-all duration-500" />
        </>
      )}

      <Navbar currentTheme={theme} onThemeChange={(t) => setTheme(t)} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 flex flex-col gap-8 relative z-10">
        {/* Hero Banner */}
        <section className="text-center flex flex-col items-center gap-3 py-2">
          <h2 className={`text-4xl sm:text-6xl font-black tracking-tight bg-clip-text text-transparent drop-shadow-md transition-colors duration-500 ${
            theme === 'nature'
              ? 'bg-gradient-to-r from-emerald-100 via-teal-200 to-lime-300'
              : 'bg-gradient-to-r from-zinc-100 via-amber-200 to-rose-300'
          }`}>
            Berialasan
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 max-w-4xl font-normal leading-relaxed drop-shadow">
            Engine alibi otomatis berbasis <span className={`${theme === 'nature' ? 'text-emerald-400' : 'text-amber-400'} font-semibold`}>Multimodal AI Vision</span>. Analisis raut wajah selfie kamu & kondisi sekitar untuk menghasilkan 3 tier alasan ngeles kocak yang bikin lawan bicara pasrah memaklumi!
          </p>
        </section>

        {/* Input Form Section - 2 Matching Outside Box Containers */}
        {!result && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {/* Left Column: Clean, Spacious Outside Box Container */}
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4.5 sm:p-5 shadow-2xl backdrop-blur-md h-full flex flex-col justify-between gap-4">
                {/* Target Recipient Selector */}
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                    <UserCheck className={`w-4 h-4 ${theme === 'nature' ? 'text-emerald-400' : 'text-amber-400'}`} /> Target Penerima Alasan
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {recipients.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRecipient(r)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                          recipient === r
                            ? theme === 'nature'
                              ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                              : 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                            : 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 border border-zinc-700'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="w-full h-px bg-zinc-800/80 my-0.5" />

                {/* Problem Input with Extra Large Textarea (h-44 / rows={5}) */}
                <div className="flex flex-col gap-3 flex-1 justify-between">
                  <label className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                    <MessageSquareWarning className={`w-4 h-4 ${theme === 'nature' ? 'text-emerald-400' : 'text-amber-400'}`} /> Masalah / Situasi yang Dihadapi
                  </label>

                  {/* Spacious Textarea Box (h-44 / rows 5) */}
                  <textarea
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    placeholder="Contoh: Telat meeting 30 menit, belum ngerjain laporan, batal nongkrong..."
                    rows={5}
                    className={`w-full h-44 bg-zinc-950/90 border border-zinc-800 rounded-xl p-3.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition resize-none leading-relaxed ${
                      theme === 'nature'
                        ? 'focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50'
                        : 'focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50'
                    }`}
                  />

                  {/* Preset Chips */}
                  <div className="flex flex-wrap gap-1.5 items-center mt-1">
                    <span className="text-[11px] font-semibold text-zinc-400 w-full mb-0.5">Contoh Cepat:</span>
                    {presets.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setProblem(preset)}
                        className="text-[11px] px-2.5 py-1.5 rounded-lg bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 hover:text-zinc-100 border border-zinc-700/60 transition text-left leading-tight"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Camera / Selfie Upload Outside Box Container */}
              <div className="flex flex-col h-full">
                <CameraCapture
                  onImageCaptured={(img) => setSelfieImage(img)}
                  imagePreview={selfieImage}
                />
              </div>
            </div>

            {/* Bottom Actions: Interactive Quota Banner, Error, & Big Submit Button */}
            <div className="flex flex-col gap-4 mt-2">
              {quotaSeconds !== null && (
                <QuotaCountdownBanner
                  initialSeconds={quotaSeconds}
                  onTimerFinished={() => setQuotaSeconds(null)}
                />
              )}

              {error && (
                <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold p-4 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || quotaSeconds !== null}
                className={`w-full py-4 rounded-2xl text-zinc-950 font-black text-base tracking-wide shadow-2xl transition-all hover:scale-[1.005] active:scale-[0.995] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 ${
                  theme === 'nature'
                    ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-lime-400 hover:from-emerald-400 hover:via-teal-400 hover:to-lime-300 shadow-emerald-500/30'
                    : 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-400 hover:via-rose-400 hover:to-purple-500 shadow-rose-500/30'
                }`}
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
            </div>
          </form>
        )}

        {/* Results Section */}
        {result && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                  <Zap className={`w-5 h-5 ${theme === 'nature' ? 'text-emerald-400 fill-emerald-400' : 'text-amber-400 fill-amber-400'}`} /> Hasil Rekomendasi Alasan
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Target: <span className={`${theme === 'nature' ? 'text-emerald-400' : 'text-amber-400'} font-semibold`}>{recipient}</span> • Masalah: "{problem}"
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
      <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-600 relative z-10 backdrop-blur-md bg-zinc-950/80">
        <p>Berialasan • Built for Absurd Hackathon 2026 • Powered by Next.js & Google Gemini Vision AI</p>
      </footer>
    </div>
  );
}
