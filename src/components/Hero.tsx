import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Copy,
  Check,
  Linkedin,
  Youtube,
  MessageCircle,
  Sparkles,
  Layers,
  Compass,
  Cpu
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  motionEnabled: boolean;
}

export const Hero: React.FC<HeroProps> = ({ motionEnabled }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!motionEnabled) {
      setMousePos({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      // Normalized between -1 and 1
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [motionEnabled]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Parallax transform calculations
  const rotX = motionEnabled ? -mousePos.y * 6 : 0;
  const rotY = motionEnabled ? mousePos.x * 8 : 0;
  const transX = motionEnabled ? mousePos.x * 12 : 0;
  const transY = motionEnabled ? mousePos.y * 8 : 0;

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#07090e] border-b border-slate-800/80 pt-6 pb-12"
      style={{ perspective: '1200px' }}
    >
      {/* Studio Lighting & Ambient Fog */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft overhead key light */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-cyan-500/15 via-blue-600/5 to-transparent blur-3xl opacity-70" />

        {/* Subtle warm rim light on right */}
        <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-amber-500/5 blur-3xl rounded-full" />

        {/* Ambient deep navy glow on left */}
        <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-blue-900/10 blur-3xl rounded-full" />

        {/* Cinematic Studio Floor with 3D Grid Perspective */}
        <div
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[180vw] h-[360px] opacity-25"
          style={{
            transform: 'rotateX(72deg) translateZ(0)',
            transformOrigin: 'bottom center',
            backgroundImage: `
              linear-gradient(to right, rgba(56, 189, 248, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(56, 189, 248, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Presence & Actionable CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean unboxed kicker with typographic separators */}
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>AI RESEARCH &amp; DISCOVERY</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>AEO &amp; GEO ARCHITECT</span>
            </div>

            {/* Primary Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] text-balance">
                {PERSONAL_INFO.name}
              </h1>
              <h2 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-cyan-300 via-slate-100 to-slate-400 bg-clip-text text-transparent">
                {PERSONAL_INFO.headline}
              </h2>
            </div>

            {/* Value Proposition */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Bridging artificial intelligence research, search &amp; generative engine optimization (AEO/GEO), and data-driven marketing architecture to drive measurable enterprise visibility and qualified growth.
            </p>

            {/* Specializations Quick Matrix */}
            <div className="pt-1 flex flex-wrap gap-2 text-xs text-slate-400">
              <span className="text-slate-300 font-medium">Core Expertise:</span>
              <span>Answer Engine Optimization (AEO)</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Generative Engine Optimization (GEO)</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Nammaweb AI Index Research</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Inbound Lead Generation</span>
            </div>

            {/* CTA Buttons & Email Copy */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo('projects')}
                className="px-6 py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all transform active:scale-95 flex items-center gap-2 group cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="px-6 py-3.5 text-sm font-semibold text-slate-200 bg-slate-900/90 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
              >
                Contact Me
              </button>

              <button
                onClick={handleCopyEmail}
                className="px-3.5 py-3 text-xs font-mono text-slate-400 hover:text-cyan-300 bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Email Copied!' : 'Copy Email'}</span>
              </button>
            </div>

            {/* Direct Verified Social Connections */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center gap-5">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Direct Connect:</span>
              
              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-400 transition-colors py-1"
                aria-label="Rajiv Kumar H N LinkedIn Profile"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-400">
                  <Linkedin className="w-3.5 h-3.5" />
                </div>
                <span className="hidden sm:inline font-medium">LinkedIn</span>
              </a>

              {/* YouTube */}
              <a
                href={PERSONAL_INFO.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-red-400 transition-colors py-1"
                aria-label="Rajiv Kumar H N YouTube Channel"
              >
                <div className="w-7 h-7 rounded-lg bg-red-950/60 border border-red-800/60 flex items-center justify-center text-red-400">
                  <Youtube className="w-3.5 h-3.5" />
                </div>
                <span className="hidden sm:inline font-medium">YouTube</span>
              </a>

              {/* WhatsApp */}
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-emerald-400 transition-colors py-1"
                aria-label="Direct WhatsApp Message to Rajiv Kumar H N"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="w-3.5 h-3.5" />
                </div>
                <span className="hidden sm:inline font-medium">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Cinematic 3D Studio Portrait Presentation */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className="relative w-full max-w-[420px] transition-transform duration-300 ease-out"
              style={{
                transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(${transX}px, ${transY}px, 0)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Studio Backlight Aura */}
              <div
                className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-transparent rounded-3xl blur-2xl -z-10"
                style={{ transform: 'translateZ(-40px)' }}
              />

              {/* Main Portrait Frame with Studio Precision */}
              <div
                className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/90 shadow-2xl shadow-black/80 group"
                style={{ transform: 'translateZ(20px)' }}
              >
                {/* Genuine Unaltered Photograph of Rajiv */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-950">
                  <img
                    src={PERSONAL_INFO.portraitImage}
                    alt="Rajiv Kumar H N - AI Research & Marketing Specialist"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />

                  {/* Refined Dark Studio Scrim & Reflection Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-transparent to-transparent opacity-75" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#080a0f]/20 via-transparent to-transparent" />

                  {/* Top-Right Verified Badge */}
                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-[11px] font-mono px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Verified Profile</span>
                  </div>

                  {/* Bottom Studio Slate overlay with verified credential label */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800/80 text-left">
                    <p className="text-sm font-bold text-white tracking-wide">
                      {PERSONAL_INFO.name}
                    </p>
                    <p className="text-xs text-cyan-400 font-medium">
                      AI Research &amp; Marketing Specialist
                    </p>
                    <div className="mt-1 pt-1 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>Nammaweb AI Index Research</span>
                      <span>India</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Depth Accents (Simulating 3D Studio Layers) */}
              <div
                className="absolute -bottom-5 -left-5 bg-slate-900/90 border border-slate-700/80 p-3 rounded-xl shadow-xl backdrop-blur-md hidden sm:flex items-center gap-2.5 text-xs text-slate-200"
                style={{ transform: 'translateZ(45px)' }}
              >
                <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">AEO &amp; GEO Architecture</div>
                  <div className="text-[10px] text-slate-400 font-mono">AI Search Optimization</div>
                </div>
              </div>

              <div
                className="absolute -top-4 -right-4 bg-slate-900/90 border border-slate-700/80 p-3 rounded-xl shadow-xl backdrop-blur-md hidden sm:flex items-center gap-2.5 text-xs text-slate-200"
                style={{ transform: 'translateZ(50px)' }}
              >
                <div className="w-7 h-7 rounded-lg bg-blue-950 border border-blue-800/60 flex items-center justify-center text-blue-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Nammaweb Research</div>
                  <div className="text-[10px] text-slate-400 font-mono">AI Index Survey</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Discipline Strip Below Split (per Frontend Design Guidelines) */}
      <div className="w-full border-t border-slate-800/80 bg-slate-950/60 backdrop-blur-sm mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">01</span>
            <span className="text-slate-200 font-medium">Answer Engine Optimization (AEO)</span>
          </div>
          <div className="hidden sm:inline text-slate-700" aria-hidden="true">/</div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">02</span>
            <span className="text-slate-200 font-medium">Generative Engine Optimization (GEO)</span>
          </div>
          <div className="hidden md:inline text-slate-700" aria-hidden="true">/</div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">03</span>
            <span className="text-slate-200 font-medium">AI-Driven Lead Generation</span>
          </div>
          <div className="hidden lg:inline text-slate-700" aria-hidden="true">/</div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">04</span>
            <span className="text-slate-200 font-medium">Data-Backed Growth Systems</span>
          </div>
        </div>
      </div>
    </section>
  );
};
