'use client';

import React from 'react';

export default function BerialasanLogo({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-transform hover:scale-105 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]`}
    >
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id="lensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Speech Bubble Ring with Tail */}
      <path
        d="M 50 10 C 25 10 10 25 10 48 C 10 63 20 75 34 81 L 28 92 C 27 94 29 96 31 95 L 47 86 C 48 86 49 86 50 86 C 75 86 90 71 90 48 C 90 25 75 10 50 10 Z"
        stroke="url(#logoGrad)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
      />

      {/* Stylized Chameleon Silhouette */}
      <path
        d="M 32 52 C 32 40 42 30 55 30 C 65 30 73 36 75 45 C 76 52 72 58 65 62 C 58 66 48 65 42 61 C 37 57 32 55 32 52 Z"
        stroke="url(#logoGrad)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Camera Lens / Chameleon Eye */}
      <circle cx="56" cy="44" r="10" stroke="url(#logoGrad)" strokeWidth="3.5" fill="#09090b" />
      <circle cx="56" cy="44" r="5" fill="url(#lensGrad)" />
      <circle cx="54" cy="42" r="1.5" fill="#FFFFFF" opacity="0.9" />

      {/* Chameleon Smile / Alibi Curve */}
      <path
        d="M 38 52 Q 48 57 58 52"
        stroke="url(#logoGrad)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
