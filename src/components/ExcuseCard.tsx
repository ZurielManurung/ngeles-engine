'use client';

import React, { useState } from 'react';
import { ExcuseRecommendation } from '@/types/excuse';
import { Copy, Check, MessageSquare, Flame, ShieldCheck, Theater, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExcuseCardProps {
  recommendation: ExcuseRecommendation;
  index: number;
}

export default function ExcuseCard({ recommendation, index }: ExcuseCardProps) {
  const [copied, setCopied] = useState(false);

  const getTierTheme = (tier: string, idx: number) => {
    if (tier.toLowerCase().includes('smooth') || idx === 0) {
      return {
        badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        cardBorder: 'border-emerald-500/20 hover:border-emerald-500/40',
        icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
        accentBg: 'from-emerald-500/10 to-transparent',
        tag: 'TIER 1 • AMAN & NATURAL',
      };
    }
    if (tier.toLowerCase().includes('drama') || idx === 1) {
      return {
        badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
        cardBorder: 'border-amber-500/20 hover:border-amber-500/40',
        icon: <Theater className="w-4 h-4 text-amber-400" />,
        accentBg: 'from-amber-500/10 to-transparent',
        tag: 'TIER 2 • DRAMATIS & HIPERBOLIS',
      };
    }
    return {
      badgeBg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
      cardBorder: 'border-rose-500/30 hover:border-rose-500/50 shadow-rose-500/5',
      icon: <Flame className="w-4 h-4 text-rose-400 fill-rose-400" />,
      accentBg: 'from-rose-500/15 via-purple-500/10 to-transparent',
      tag: 'TIER 3 • ULTIMATE CHAOS / ABSURD',
    };
  };

  const theme = getTierTheme(recommendation.tier, index);

  const handleCopy = () => {
    navigator.clipboard.writeText(recommendation.excuse);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(recommendation.excuse);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div
      className={`bg-zinc-900/80 border ${theme.cardBorder} rounded-2xl p-5 shadow-xl relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between`}
    >
      <div className={`absolute top-0 right-0 left-0 h-1 bg-gradient-to-r ${theme.accentBg}`} />

      <div>
        {/* Tier Header */}
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${theme.badgeBg}`}>
            {theme.icon}
            {recommendation.tier}
          </span>
          <span className="text-[10px] font-bold text-zinc-400 tracking-wider">
            {theme.tag}
          </span>
        </div>

        {/* Excuse Text Box */}
        <div className="bg-zinc-950/90 border border-zinc-800 rounded-xl p-4 mb-4 text-zinc-100 text-sm leading-relaxed font-medium select-all shadow-inner">
          "{recommendation.excuse}"
        </div>

        {/* Tactic Advice */}
        {recommendation.tactic && (
          <div className="bg-zinc-900 border border-zinc-800/80 rounded-xl p-3 mb-4 flex items-start gap-2 text-xs text-zinc-400">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-zinc-300">Taktik Pengiriman: </span>
              {recommendation.tactic}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/60">
        <button
          type="button"
          onClick={handleCopy}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
            copied
              ? 'bg-emerald-500 text-zinc-950'
              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" /> Tersalin!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" /> Salin Teks
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleSendWhatsApp}
          className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 flex items-center justify-center gap-1.5 transition"
        >
          <MessageSquare className="w-3.5 h-3.5" /> Kirim ke WA
        </button>
      </div>
    </div>
  );
}
