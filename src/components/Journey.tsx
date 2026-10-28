import React from 'react';
import { TIMELINE } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';

export const Journey: React.FC = () => {
  return (
    <section id="journey" className="py-24 bg-[#090b11] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            04. Experience &amp; Trajectory
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Professional Journey &amp; Milestones
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            A chronological record of verified contributions, AI research initiatives, and strategic organic growth advisory.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {TIMELINE.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Node Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-cyan-400 group-hover:scale-125 transition-transform" />

              {/* Milestone Card */}
              <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 hover:border-slate-700 transition-all">
                {/* Header Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-semibold">{item.period}</span>
                    <span aria-hidden="true" className="text-slate-700">·</span>
                    <span className="text-slate-300">{item.organization}</span>
                  </div>
                  {item.isVerified && (
                    <div className="flex items-center gap-1 text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Milestone</span>
                    </div>
                  )}
                </div>

                {/* Role Title */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {item.role}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Key Contributions</div>
                  <ul className="space-y-1.5">
                    {item.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
