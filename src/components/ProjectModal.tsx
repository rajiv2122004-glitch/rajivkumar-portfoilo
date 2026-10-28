import React, { useEffect } from 'react';
import { X, CheckCircle2, Wrench, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-3xl bg-[#0c0f17] border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 text-slate-200 my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-2">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Project
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {project.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors"
            aria-label="Close case study details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Executive Summary */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs font-mono text-slate-400 uppercase mb-1">Executive Summary</div>
          <p className="text-sm text-slate-200 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Problem vs Approach Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-semibold uppercase">
              <AlertCircle className="w-4 h-4" />
              <span>Problem Addressed</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase">
              <Wrench className="w-4 h-4" />
              <span>Strategic Approach</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.approach}
            </p>
          </div>
        </div>

        {/* Tools & Frameworks Used */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Methodologies &amp; Tooling Applied
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300">
            {project.tools.map((tool, idx) => (
              <span
                key={idx}
                className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Documented Outcomes & Findings */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
            Verified Outcomes &amp; Deliverables
          </div>
          <ul className="space-y-2">
            {project.outcomes.map((outcome, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Authored by Rajiv Kumar H N
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};
