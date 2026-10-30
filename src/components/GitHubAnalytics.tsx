import React, { useState } from 'react';
import { ExternalLink, Github, Star, GitFork, ArrowUpRight, BarChart2, Radio, Check, Layers, Sparkles } from 'lucide-react';
import { ProfileData } from '../types';
import { FEATURED_PROJECTS } from '../data/defaultProfile';

interface GitHubAnalyticsProps {
  profile: ProfileData;
  onThemeChange: (theme: string) => void;
}

const STATS_THEMES = [
  { id: 'tokyonight', label: 'Tokyo Night' },
  { id: 'radical', label: 'Radical' },
  { id: 'github_dark', label: 'GitHub Dark' },
  { id: 'dracula', label: 'Dracula' },
  { id: 'nord', label: 'Nord' },
];

export const GitHubAnalytics: React.FC<GitHubAnalyticsProps> = ({ profile, onThemeChange }) => {
  const [selectedTheme, setSelectedTheme] = useState(profile.statsTheme || 'tokyonight');
  const [activeRepoFilter, setActiveRepoFilter] = useState<'all' | 'ai_ml' | 'systems' | 'web'>('all');
  const [showStatsCard, setShowStatsCard] = useState(false);

  const handleSelectTheme = (th: string) => {
    setSelectedTheme(th);
    onThemeChange(th);
  };

  const topLangsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.githubUsername}&layout=compact&langs_count=6&theme=${selectedTheme}&hide_border=true&hide=jupyter%20notebook`;

  const filteredRepos = FEATURED_PROJECTS.filter((proj) => {
    if (activeRepoFilter === 'ai_ml') {
      return proj.tags.some((t) => ['Python', 'Optuna', 'Scikit-Learn', 'AssemblyAI', 'XGBoost'].includes(t));
    }
    if (activeRepoFilter === 'systems') {
      return proj.tags.some((t) => ['C', 'Data Structures', 'CLI'].includes(t));
    }
    if (activeRepoFilter === 'web') {
      return proj.tags.some((t) => ['TypeScript', 'JavaScript', 'CSS3', 'Vercel', 'Render'].includes(t));
    }
    return true;
  });

  return (
    <section id="analytics" className="py-14 border-t border-indigo-950/40 relative">
      <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-10">
        {/* Section Header: Featured Pinned Repositories */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-indigo-950/60">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Authentic Pinned Work</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mt-1 flex items-center gap-3">
              <span>Featured Open Source Systems</span>
            </h2>
            <p className="mt-1.5 text-sm text-slate-300 max-w-xl leading-relaxed">
              Real public repositories and architectures from Swaroop Khan&apos;s GitHub, demonstrating applied machine learning, voice agents, and low-level graphics.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`${profile.githubUrl}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 text-xs font-mono text-cyan-300 bg-cyan-950/30 hover:bg-cyan-900/40 border border-cyan-500/30 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>github.com/{profile.githubUsername}</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-medium">
          <button
            onClick={() => setActiveRepoFilter('all')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              activeRepoFilter === 'all'
                ? 'bg-indigo-500/20 text-white border-indigo-500/50 shadow-sm'
                : 'bg-[#080C1B]/80 text-slate-400 border-indigo-950/60 hover:text-white'
            }`}
          >
            All Projects ({FEATURED_PROJECTS.length})
          </button>
          <button
            onClick={() => setActiveRepoFilter('ai_ml')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              activeRepoFilter === 'ai_ml'
                ? 'bg-indigo-500/20 text-white border-indigo-500/50 shadow-sm'
                : 'bg-[#080C1B]/80 text-slate-400 border-indigo-950/60 hover:text-white'
            }`}
          >
            AI, ML & Voice Agents
          </button>
          <button
            onClick={() => setActiveRepoFilter('systems')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              activeRepoFilter === 'systems'
                ? 'bg-indigo-500/20 text-white border-indigo-500/50 shadow-sm'
                : 'bg-[#080C1B]/80 text-slate-400 border-indigo-950/60 hover:text-white'
            }`}
          >
            Systems & C Graphics
          </button>
          <button
            onClick={() => setActiveRepoFilter('web')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              activeRepoFilter === 'web'
                ? 'bg-indigo-500/20 text-white border-indigo-500/50 shadow-sm'
                : 'bg-[#080C1B]/80 text-slate-400 border-indigo-950/60 hover:text-white'
            }`}
          >
            Full-Stack & Web
          </button>
        </div>

        {/* Pinned Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRepos.map((repo) => (
            <div
              key={repo.id}
              className="rounded-xl border border-indigo-950/80 bg-[#080C1B]/80 backdrop-blur-sm p-5 hover:border-cyan-500/40 hover:bg-[#0A1026]/90 transition-all duration-300 flex flex-col justify-between group shadow-lg shadow-black/30"
            >
              <div>
                {/* Title & External Link */}
                <div className="flex items-start justify-between gap-2">
                  <a
                    href={repo.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-white group-hover:text-cyan-300 transition-colors text-sm flex items-center gap-1.5 tracking-tight"
                  >
                    <span className="line-clamp-1">{repo.title}</span>
                  </a>
                  <a
                    href={repo.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-cyan-400 transition-colors p-1"
                    title="View GitHub Repository"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed line-clamp-3">
                  {repo.description}
                </p>

                {/* Live demo link if available */}
                {repo.liveUrl && (
                  <div className="mt-3">
                    <a
                      href={repo.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span>Live Deployment</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Tags & Tech Footer */}
              <div className="mt-5 pt-3 border-t border-indigo-950/60 flex items-center justify-between text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  {repo.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono text-slate-400">
                      {tag} ·
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono shrink-0 ml-2">
                  {repo.stars !== undefined && repo.stars > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{repo.stars}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Secondary GitHub Statistics Dock */}
        <div className="rounded-xl border border-indigo-950/70 bg-[#070A18]/90 p-4 md:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-950/60">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-indigo-950/40 text-cyan-400">
                <BarChart2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-mono font-semibold text-white tracking-wide uppercase">
                  Compact GitHub Statistics
                </span>
                <span className="text-xs text-slate-400 ml-2 font-mono">
                  (Secondary Activity Metric)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Compact theme selector */}
              <div className="flex items-center gap-1 text-[11px] font-mono bg-[#050711] border border-indigo-950/80 px-2 py-1 rounded-md">
                <span className="text-slate-400">Theme:</span>
                {STATS_THEMES.map((th) => (
                  <button
                    key={th.id}
                    onClick={() => handleSelectTheme(th.id)}
                    className={`px-1.5 py-0.5 rounded transition-colors ${
                      selectedTheme === th.id
                        ? 'bg-indigo-600/30 text-cyan-300'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {th.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowStatsCard(!showStatsCard)}
                className="px-2.5 py-1 text-xs font-mono text-slate-300 hover:text-white bg-indigo-950/40 border border-indigo-900/40 rounded-md transition-colors"
              >
                {showStatsCard ? 'Hide Card' : 'View Card'}
              </button>
            </div>
          </div>

          {/* Compact summary line */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-[#050711] border border-indigo-950/60">
              <span className="text-slate-400 text-[10px]">PRIMARY STACK</span>
              <p className="text-cyan-300 font-semibold mt-0.5">Python · C · TypeScript</p>
            </div>
            <div className="p-2.5 rounded-lg bg-[#050711] border border-indigo-950/60">
              <span className="text-slate-400 text-[10px]">PINNED REPOS</span>
              <p className="text-indigo-300 font-semibold mt-0.5">6 Active Systems</p>
            </div>
            <div className="p-2.5 rounded-lg bg-[#050711] border border-indigo-950/60">
              <span className="text-slate-400 text-[10px]">ML FRAMEWORKS</span>
              <p className="text-purple-300 font-semibold mt-0.5">Optuna · Scikit · XGB</p>
            </div>
            <div className="p-2.5 rounded-lg bg-[#050711] border border-indigo-950/60">
              <span className="text-slate-400 text-[10px]">LIVE AGENTS</span>
              <p className="text-emerald-300 font-semibold mt-0.5">VoxHire (Render)</p>
            </div>
          </div>

          {/* Collapsible card graphic for README preview */}
          {showStatsCard && (
            <div className="pt-2 flex justify-center overflow-x-auto">
              <img
                src={topLangsUrl}
                alt="GitHub Language Breakdown"
                className="rounded-lg border border-indigo-950/60 max-w-full shadow-lg"
              />
            </div>
          )}
        </div>

        {/* Connect & Collaborate Banner with Refined Futuristic Aesthetic */}
        <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-[#080C1B] via-indigo-950/30 to-[#080C1B] p-8 md:p-10 text-center space-y-4 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-2xl pointer-events-none" />
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Connect & Collaborate with Swaroop
          </h3>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Whether you&apos;re looking to discuss AI system architectures, machine learning modeling, or building intelligent tools, let&apos;s connect!
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={profile.portfolioUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-lg transition-all flex items-center gap-1.5 shadow-md shadow-blue-500/10"
            >
              <span>Portfolio Website</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-indigo-500/10"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="px-4 py-2 text-xs font-semibold text-slate-200 bg-[#0B1024] hover:bg-slate-800 border border-indigo-500/30 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>{profile.email}</span>
            </a>
          </div>

          <div className="pt-4 text-[11px] text-slate-500 font-mono">
            Designed with precision for @{profile.githubUsername} · AI & ML Systems
          </div>
        </div>
      </div>
    </section>
  );
};
