import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Linkedin, Youtube, MessageCircle, ArrowUp, Mail, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05070a] border-t border-slate-800 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          {/* Identity & Headline */}
          <div className="md:col-span-6 space-y-3">
            <div className="text-xl font-bold text-white tracking-tight font-display">
              {PERSONAL_INFO.name}
            </div>
            <div className="text-sm text-cyan-400 font-medium">
              {PERSONAL_INFO.headline}
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Specializing in Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), AI research benchmarks, and data-driven marketing architecture.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-mono text-slate-300 uppercase tracking-wider mb-3">
              Navigation
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">
                  About Rajiv
                </a>
              </li>
              <li>
                <a href="#specializations" className="hover:text-cyan-400 transition-colors">
                  Specializations (SEO / AEO / GEO)
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">
                  Featured Projects &amp; Case Studies
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-cyan-400 transition-colors">
                  Professional Journey
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-400 transition-colors">
                  Contact &amp; Collaboration
                </a>
              </li>
            </ul>
          </div>

          {/* Social Channels */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono text-slate-300 uppercase tracking-wider mb-3">
              Verified Channels
            </div>
            <div className="flex flex-col space-y-2 text-xs">
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn Profile</span>
              </a>

              <a
                href={PERSONAL_INFO.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
                aria-label="YouTube channel"
              >
                <Youtube className="w-4 h-4 text-red-400" />
                <span>YouTube Channel</span>
              </a>

              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
                aria-label="WhatsApp conversation"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp (+91 7676546577)</span>
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="font-mono">{PERSONAL_INFO.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {currentYear} {PERSONAL_INFO.name}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px] text-slate-500">
              India · Open to Global Remote Opportunities
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-all flex items-center gap-1 cursor-pointer"
              title="Return to top of page"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[11px]">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
