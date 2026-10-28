import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Search, Brain, TrendingUp, Terminal, CheckCircle2 } from 'lucide-react';

export const Skills: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');

  const filteredCategories =
    activeCategoryId === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === activeCategoryId);

  return (
    <section id="specializations" className="py-24 bg-[#090b11] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            02. Core Capabilities &amp; Stack
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Specialized in Modern Search, Generative Engines &amp; Inbound Systems
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            From technical SEO audits to Answer Engine Optimization (AEO) and generative search citation modeling. Structured methodologies engineered for reproducible organic growth.
          </p>
        </div>

        {/* Interactive Filter Control Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl max-w-fit">
          <button
            onClick={() => setActiveCategoryId('all')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeCategoryId === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            All Specializations
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategoryId === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="space-y-12">
          {filteredCategories.map((category) => (
            <div key={category.id} className="space-y-4">
              <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>{category.name}</span>
                </h3>
                <p className="text-xs text-slate-400 max-w-xl">
                  {category.description}
                </p>
              </div>

              {/* Skills cards inside category */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all hover:bg-slate-900/80 group flex flex-col justify-between"
                  >
                    <div>
                      {/* Skill Name & Level */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {skill.name}
                        </h4>
                        <span className="text-[11px] font-mono text-cyan-400 shrink-0">
                          {skill.level}
                        </span>
                      </div>

                      {/* Practical Focus Description */}
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        {skill.focus}
                      </p>
                    </div>

                    {/* Tags rendered as clean unboxed text with separators per Zero-Pill rule */}
                    <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex flex-wrap items-center gap-1.5">
                      {skill.tags.map((tag, tIdx) => (
                        <React.Fragment key={tIdx}>
                          <span className="text-slate-400">{tag}</span>
                          {tIdx < skill.tags.length - 1 && (
                            <span aria-hidden="true" className="text-slate-700">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
