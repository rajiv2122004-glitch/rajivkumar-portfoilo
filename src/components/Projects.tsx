import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import { ArrowUpRight, CheckCircle, ShieldCheck, Sparkles, Database, Layers } from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 bg-[#080a0f] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            03. Verified Projects &amp; Research
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Case Studies in AI Research, AEO &amp; Inbound Systems
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Detailed case studies derived from verifiable initiatives—including the Nammaweb AI Index Survey and conversational search architecture.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl max-w-fit">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            All Work ({PROJECTS.length})
          </button>
          <button
            onClick={() => setSelectedCategory('AI Research & AEO')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'AI Research & AEO'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            AI Research &amp; AEO
          </button>
          <button
            onClick={() => setSelectedCategory('Digital Growth')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'Digital Growth'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Digital Growth
          </button>
          <button
            onClick={() => setSelectedCategory('Analytics & Search')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'Analytics & Search'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Analytics &amp; Search
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl bg-gradient-to-b from-slate-900/70 to-slate-950/90 border border-slate-800 hover:border-slate-700/90 transition-all p-6 sm:p-8 flex flex-col justify-between group hover:shadow-xl hover:shadow-cyan-950/20"
            >
              <div>
                {/* Top unboxed metadata line per anti-slop guidelines */}
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4 pb-3 border-b border-slate-800/80">
                  <span className="text-cyan-400">{project.category}</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 mb-4 font-medium">
                  {project.subtitle}
                </p>

                {/* Short Summary */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {project.summary}
                </p>

                {/* Structured Overview: Problem & Approach */}
                <div className="space-y-3 mb-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 text-xs">
                  <div>
                    <span className="font-semibold text-rose-400 font-mono">CHALLENGE: </span>
                    <span className="text-slate-300">{project.problem}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-cyan-400 font-mono">SOLUTION: </span>
                    <span className="text-slate-300">{project.approach}</span>
                  </div>
                </div>
              </div>

              <div>
                {/* Tools Applied */}
                <div className="mb-6">
                  <div className="text-[11px] font-mono text-slate-500 uppercase mb-2">Key Tooling &amp; Rubrics</div>
                  <div className="flex flex-wrap gap-1.5 text-xs font-mono text-slate-400">
                    {project.tools.slice(0, 3).map((tool, idx) => (
                      <span key={idx} className="bg-slate-900 border border-slate-800/80 px-2 py-0.5 rounded text-[11px]">
                        {tool}
                      </span>
                    ))}
                    {project.tools.length > 3 && (
                      <span className="text-[11px] text-slate-500 py-0.5">
                        +{project.tools.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Interactive Action Button to open Modal */}
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-slate-200 hover:text-white text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Full Case Study &amp; Findings</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
