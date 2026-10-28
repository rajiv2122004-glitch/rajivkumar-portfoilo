import React from 'react';
import { Target, Search, BarChart3, Database, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#080a0f] border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            01. Professional Overview
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Engineering Organic Visibility in the Era of Conversational &amp; Generative AI
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Search is no longer a static list of blue links. It is a multi-modal, conversational synthesis engine. My focus is ensuring enterprise brands remain discoverable, cited, and authoritative.
          </p>
        </div>

        {/* 2-Column Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative Biography */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 text-base leading-relaxed">
            {PERSONAL_INFO.bioDetailed.map((paragraph, idx) => (
              <p key={idx} className="text-slate-300 leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Core Working Philosophy Pillars */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-800/50 flex items-center justify-center text-cyan-400 mb-3">
                  <Search className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">Entity-First Discovery</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Moving beyond basic keywords to semantic triples, knowledge graphs, and structured JSON-LD schemas that answer engines require.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-teal-950/60 border border-teal-800/50 flex items-center justify-center text-teal-400 mb-3">
                  <Target className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">Predictable Lead Pipelines</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Translating AI discovery into qualified inbound business opportunities through tailored buyer-intent content flows.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800/50 flex items-center justify-center text-blue-400 mb-3">
                  <Database className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">Empirical AI Research</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Practical survey frameworks such as the Nammaweb AI Index to monitor how models retrieve, summarize, and attribute sources.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-indigo-950/60 border border-indigo-800/50 flex items-center justify-center text-indigo-400 mb-3">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">Conversion Rigor</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Focusing on authentic bottom-line engagement rather than inflated vanity impressions or low-relevance clicks.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Profile Summary Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Verified Identity
                </span>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Data</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-xs text-slate-500 font-mono">FULL NAME</div>
                  <div className="text-base font-semibold text-white">{PERSONAL_INFO.name}</div>
                </div>

                <div>
                  <div className="text-xs text-slate-500 font-mono">PRIMARY ROLE</div>
                  <div className="text-base font-semibold text-cyan-300">{PERSONAL_INFO.headline}</div>
                </div>

                <div>
                  <div className="text-xs text-slate-500 font-mono">RESEARCH INITIATIVE</div>
                  <div className="text-sm font-medium text-slate-200">
                    Nammaweb AI Index Survey &amp; Marketing Research
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Assessing organizational AI readiness &amp; generative search dynamics
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-500 font-mono">PRIMARY DISCIPLINES</div>
                  <div className="text-xs text-slate-300 mt-1 space-y-1">
                    <div>· Search Engine Optimization (SEO)</div>
                    <div>· Answer Engine Optimization (AEO)</div>
                    <div>· Generative Engine Optimization (GEO)</div>
                    <div>· AI-Driven Lead Generation</div>
                    <div>· Content Marketing &amp; Intent Architecture</div>
                    <div>· Analytics &amp; Performance Measurement</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-500 font-mono">LOCATION &amp; COLLABORATION</div>
                  <div className="text-sm text-slate-300">
                    India (Available for Remote Global &amp; Hybrid Engagements)
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <a
                  href="#contact"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                >
                  Initiate Discussion →
                </a>
                <span className="font-mono text-slate-500">+91 7676546577</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
