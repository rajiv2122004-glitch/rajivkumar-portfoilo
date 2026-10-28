import React from 'react';
import { EDUCATION_AND_CREDENTIALS } from '../data/portfolioData';
import { Award, BookOpen, ShieldCheck, Edit3 } from 'lucide-react';

export const EducationCertifications: React.FC = () => {
  return (
    <section className="py-20 bg-[#080a0f] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            05. Credentials &amp; Continuous Learning
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Specialized Credentials &amp; Applied Study
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Validated domain expertise and continuous research in emerging search engine algorithms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDUCATION_AND_CREDENTIALS.map((cred, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                cred.isPlaceholder
                  ? 'bg-slate-900/30 border-dashed border-slate-800 text-slate-400'
                  : 'bg-slate-900/60 border-slate-800 text-slate-200 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className={cred.isPlaceholder ? 'text-amber-400' : 'text-cyan-400'}>
                    {cred.category}
                  </span>
                  {cred.verified ? (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-400/80">
                      <Edit3 className="w-3.5 h-3.5" /> Customizable Slot
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                  {cred.title}
                </h3>
                <p className="text-xs font-medium text-slate-400 mb-3">
                  {cred.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {cred.description}
                </p>
              </div>

              {cred.isPlaceholder && (
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-500">
                  Ready to link verified degree / transcript once provided by owner.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
