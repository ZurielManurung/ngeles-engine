'use client';

import React from 'react';
import BerialasanLogo from '@/components/BerialasanLogo';
import { Sparkles, ShieldCheck, Leaf, Moon } from 'lucide-react';

interface NavbarProps {
  currentTheme?: 'dark' | 'nature';
  onThemeChange?: (theme: 'dark' | 'nature') => void;
}

export default function Navbar({ currentTheme = 'dark', onThemeChange }: NavbarProps) {
  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="relative group flex items-center justify-center">
            <BerialasanLogo className="w-10 h-10" />
          </div>
          <div>
            <h1 className={`font-black text-xl tracking-tight bg-clip-text text-transparent transition-colors duration-500 ${
              currentTheme === 'nature'
                ? 'bg-gradient-to-r from-emerald-300 via-teal-200 to-lime-300'
                : 'bg-gradient-to-r from-amber-300 via-rose-300 to-purple-300'
            }`}>
              berialasan
            </h1>
            <p className="text-[10px] text-zinc-400 font-medium tracking-wide">
              Ngeles Engine & Multimodal AI Vision
            </p>
          </div>
        </div>

        {/* Theme Switcher & Badges */}
        <div className="flex items-center gap-2">
          {/* Interactive Theme Switcher Toggle */}
          {onThemeChange && (
            <div className="flex items-center bg-zinc-900/90 border border-zinc-800 p-1 rounded-full shadow-inner">
              <button
                type="button"
                onClick={() => onThemeChange('dark')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                  currentTheme === 'dark'
                    ? 'bg-amber-500 text-zinc-950 shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Tema Cyber Dark"
              >
                <Moon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cyber</span>
              </button>
              <button
                type="button"
                onClick={() => onThemeChange('nature')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                  currentTheme === 'nature'
                    ? 'bg-emerald-500 text-zinc-950 shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Tema Emerald Nature"
              >
                <Leaf className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Nature</span>
              </button>
            </div>
          )}

          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
            <Sparkles className={`w-3.5 h-3.5 ${currentTheme === 'nature' ? 'text-emerald-400' : 'text-amber-400'}`} />
            <span>Absurd Hackathon 2026</span>
          </div>

          <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-sm transition-colors ${
            currentTheme === 'nature'
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
          }`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AI Powered</span>
          </div>
        </div>
      </div>
    </header>
  );
}
