import React, { useState } from 'react';
import { Menu, X, Sparkles, Send, EyeOff, Eye } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeaderProps {
  motionEnabled: boolean;
  toggleMotion: () => void;
}

export const Header: React.FC<HeaderProps> = ({ motionEnabled, toggleMotion }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#080a0f]/85 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('hero');
          }}
          className="text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="font-display">{PERSONAL_INFO.name}</span>
          <span className="text-[11px] font-mono text-cyan-400/80 uppercase tracking-widest hidden sm:inline-block">
            / AI & Growth
          </span>
        </a>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('about');
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
          >
            About
          </a>
          <a
            href="#specializations"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('specializations');
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Specializations
          </a>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('projects');
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Projects
          </a>
          <a
            href="#journey"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('journey');
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Journey
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('contact');
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action + Motion Control */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleMotion}
            title={motionEnabled ? 'Cinematic 3D Parallax is Active (Click to reduce)' : 'Parallax Reduced (Click to activate)'}
            className={`p-2 rounded-lg text-xs font-mono transition-all border flex items-center gap-1.5 ${
              motionEnabled
                ? 'bg-slate-900/90 text-cyan-400 border-cyan-500/30 hover:border-cyan-400'
                : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            {motionEnabled ? <Eye className="w-3.5 h-3.5 text-cyan-400" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden xl:inline text-[11px]">{motionEnabled ? '3D Active' : 'Reduced Motion'}</span>
          </button>

          <button
            onClick={() => scrollTo('contact')}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 rounded-lg hover:from-cyan-300 hover:to-teal-200 shadow-md shadow-cyan-500/20 transition-all transform active:scale-95 whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Connect</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0b0e14] px-4 pt-3 pb-6 space-y-3">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('about');
            }}
            className="block py-2 text-base font-medium text-slate-200 hover:text-cyan-400"
          >
            About Rajiv
          </a>
          <a
            href="#specializations"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('specializations');
            }}
            className="block py-2 text-base font-medium text-slate-200 hover:text-cyan-400"
          >
            Specializations (SEO, AEO, GEO)
          </a>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('projects');
            }}
            className="block py-2 text-base font-medium text-slate-200 hover:text-cyan-400"
          >
            Featured Projects & Case Studies
          </a>
          <a
            href="#journey"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('journey');
            }}
            className="block py-2 text-base font-medium text-slate-200 hover:text-cyan-400"
          >
            Professional Journey
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('contact');
            }}
            className="block py-2 text-base font-medium text-slate-200 hover:text-cyan-400"
          >
            Contact & Inquiries
          </a>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>India (+91 7676546577)</span>
            <a
              href={PERSONAL_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              Direct WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
