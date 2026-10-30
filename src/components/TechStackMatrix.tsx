import React, { useState } from 'react';
import { Layers, Copy, Check, Terminal, ExternalLink, Cpu, Binary, Brain, Globe, Wrench, Sparkles, SlidersHorizontal } from 'lucide-react';
import { TechBadge, ProfileData } from '../types';
import { ALL_TECH_BADGES } from '../data/defaultProfile';
import confetti from 'canvas-confetti';

interface TechStackMatrixProps {
  profile: ProfileData;
  onToggleBadge: (badgeId: string) => void;
  onBadgeStyleChange: (style: 'flat-square' | 'for-the-badge' | 'plastic') => void;
}

interface CategoryConfig {
  key: TechBadge['category'];
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  borderClass: string;
  badgeGlow: string;
  summary: string;
}

const CATEGORY_CONFIGS: CategoryConfig[] = [
  {
    key: 'languages',
    title: 'Programming Languages',
    icon: Binary,
    accentColor: 'text-cyan-400',
    borderClass: 'border-cyan-500/20 hover:border-cyan-500/40',
    badgeGlow: 'from-cyan-500/10 to-transparent',
    summary: 'Core algorithmic, procedural, and full-stack development foundations.'
  },
  {
    key: 'ml_ds',
    title: 'Machine Learning & Data Science',
    icon: Brain,
    accentColor: 'text-indigo-400',
    borderClass: 'border-indigo-500/20 hover:border-indigo-500/40',
    badgeGlow: 'from-indigo-500/10 to-transparent',
    summary: 'Predictive modeling, Bayesian optimization, ensemble learning, and SMOTE resampling.'
  },
  {
    key: 'ai_ecosystem',
    title: 'AI & Voice Intelligence Ecosystem',
    icon: Sparkles,
    accentColor: 'text-purple-400',
    borderClass: 'border-purple-500/20 hover:border-purple-500/40',
    badgeGlow: 'from-purple-500/10 to-transparent',
    summary: 'Speech-to-text intelligence, conversational AI agents, and reactive inference applications.'
  },
  {
    key: 'web',
    title: 'Web Engineering & Infrastructure',
    icon: Globe,
    accentColor: 'text-sky-400',
    borderClass: 'border-sky-500/20 hover:border-sky-500/40',
    badgeGlow: 'from-sky-500/10 to-transparent',
    summary: 'Responsive client architectures, backend REST APIs, and edge deployment platforms.'
  },
  {
    key: 'tools',
    title: 'Developer Systems & Hardware',
    icon: Wrench,
    accentColor: 'text-blue-400',
    borderClass: 'border-blue-500/20 hover:border-blue-500/40',
    badgeGlow: 'from-blue-500/10 to-transparent',
    summary: 'Version management, source collaboration, and embedded physical computing.'
  }
];

export const TechStackMatrix: React.FC<TechStackMatrixProps> = ({
  profile,
  onToggleBadge,
  onBadgeStyleChange,
}) => {
  const [copiedCategory, setCopiedCategory] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showManageModal, setShowManageModal] = useState<boolean>(false);

  const activeBadges = ALL_TECH_BADGES.filter((b) => profile.selectedTech.includes(b.id));

  const handleCopyCategoryMarkdown = (catKey: TechBadge['category']) => {
    const badgesInCat = activeBadges.filter((b) => b.category === catKey);
    const md = badgesInCat
      .map(
        (b) =>
          `<img src="https://img.shields.io/badge/${encodeURIComponent(b.name)}-${b.badgeColor}?style=${profile.badgeStyle}&logo=${b.logo}&logoColor=${b.logoColor || 'white'}" alt="${b.name}" height="28" />`
      )
      .join('  \n');

    navigator.clipboard.writeText(md);
    setCopiedCategory(catKey);
    confetti({ particleCount: 30, spread: 45, origin: { y: 0.8 }, colors: ['#38BDF8', '#818CF8'] });
    setTimeout(() => setCopiedCategory(null), 2000);
  };

  const handleCopyAllBadges = () => {
    const md = activeBadges
      .map(
        (b) =>
          `<img src="https://img.shields.io/badge/${encodeURIComponent(b.name)}-${b.badgeColor}?style=${profile.badgeStyle}&logo=${b.logo}&logoColor=${b.logoColor || 'white'}" alt="${b.name}" height="28" />`
      )
      .join('  \n');

    navigator.clipboard.writeText(md);
    setCopiedCategory('all');
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 }, colors: ['#38BDF8', '#818CF8', '#C084FC'] });
    setTimeout(() => setCopiedCategory(null), 2000);
  };

  return (
    <section id="tech-stack" className="py-14 border-t border-indigo-950/40 relative">
      {/* Background radial accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-8">
        {/* Section Heading & Global Stack Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-indigo-950/60">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Modular Architecture Matrix</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mt-1 flex items-center gap-3">
              <span>Categorized Tech Stack</span>
            </h2>
            <p className="mt-1.5 text-sm text-slate-300 max-w-xl leading-relaxed">
              Structured across 5 specialized engineering domains for immediate clarity and rapid visual scanning.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Badge Style Switcher */}
            <div className="flex items-center p-1 bg-[#090D1C] border border-indigo-950/80 rounded-lg text-xs font-mono">
              <button
                onClick={() => onBadgeStyleChange('flat-square')}
                className={`px-2.5 py-1 rounded transition-all ${
                  profile.badgeStyle === 'flat-square'
                    ? 'bg-indigo-600/30 text-cyan-300 border border-indigo-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                flat-square
              </button>
              <button
                onClick={() => onBadgeStyleChange('for-the-badge')}
                className={`px-2.5 py-1 rounded transition-all ${
                  profile.badgeStyle === 'for-the-badge'
                    ? 'bg-indigo-600/30 text-cyan-300 border border-indigo-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                for-the-badge
              </button>
            </div>

            <button
              onClick={handleCopyAllBadges}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-[#0B1024] hover:bg-indigo-950/60 border border-indigo-500/30 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              title="Copy markdown for all active badges"
            >
              {copiedCategory === 'all' ? (
                <Check className="w-3.5 h-3.5 text-cyan-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
              )}
              <span>{copiedCategory === 'all' ? 'Copied All!' : 'Copy Stack .md'}</span>
            </button>

            <button
              onClick={() => setShowManageModal(true)}
              className="px-3.5 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg transition-all shadow-sm"
            >
              Manage ({activeBadges.length})
            </button>
          </div>
        </div>

        {/* Category Domain Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-medium">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-indigo-500/20 text-white border-indigo-500/50 shadow-sm'
                : 'bg-[#080C1B]/80 text-slate-400 border-indigo-950/60 hover:text-white hover:border-indigo-800'
            }`}
          >
            All Domains ({activeBadges.length})
          </button>
          {CATEGORY_CONFIGS.map((cat) => {
            const count = activeBadges.filter((b) => b.category === cat.key).length;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeFilter === cat.key
                    ? 'bg-indigo-500/20 text-white border-indigo-500/50 shadow-sm'
                    : 'bg-[#080C1B]/80 text-slate-400 border-indigo-950/60 hover:text-white hover:border-indigo-800'
                }`}
              >
                <span>{cat.title}</span>
                <span className="font-mono text-[10px] text-cyan-400">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Categorized Tech Stack Blocks */}
        <div className="space-y-5">
          {CATEGORY_CONFIGS.map((cat) => {
            if (activeFilter !== 'all' && activeFilter !== cat.key) return null;
            const items = activeBadges.filter((b) => b.category === cat.key);
            if (items.length === 0) return null;

            const Icon = cat.icon;

            return (
              <div
                key={cat.key}
                className={`rounded-xl border ${cat.borderClass} bg-[#080C1B]/80 backdrop-blur-sm p-5 md:p-6 transition-all duration-300 relative overflow-hidden group shadow-lg shadow-black/20`}
              >
                {/* Subtle top gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${cat.badgeGlow}`} />

                {/* Category Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-indigo-950/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-950/50 border border-indigo-900/40 text-cyan-400 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                        <span>{cat.title}</span>
                        <span className="text-xs font-mono font-medium text-slate-400">
                          [{items.length} tools]
                        </span>
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">{cat.summary}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyCategoryMarkdown(cat.key)}
                    className="self-start sm:self-auto px-2.5 py-1 text-[11px] font-mono text-slate-400 hover:text-cyan-300 bg-indigo-950/30 hover:bg-indigo-900/30 border border-indigo-900/40 rounded-md transition-colors flex items-center gap-1.5"
                    title={`Copy markdown badges for ${cat.title}`}
                  >
                    {copiedCategory === cat.key ? (
                      <Check className="w-3 h-3 text-cyan-400" />
                    ) : (
                      <Copy className="w-3 h-3 text-cyan-400" />
                    )}
                    <span>{copiedCategory === cat.key ? 'Copied' : 'Copy Badges'}</span>
                  </button>
                </div>

                {/* Badges Grid with context tooltips */}
                <div className="mt-4 flex flex-wrap items-center gap-2.5">
                  {items.map((badge) => (
                    <div key={badge.id} className="relative group/badge">
                      <img
                        src={`https://img.shields.io/badge/${encodeURIComponent(badge.name)}-${badge.badgeColor}?style=${profile.badgeStyle}&logo=${badge.logo}&logoColor=${badge.logoColor || 'white'}`}
                        alt={badge.name}
                        height="30"
                        className="h-7 hover:scale-[1.03] transition-transform duration-200 cursor-pointer shadow-sm"
                      />
                      {/* Futuristic quick hover info */}
                      {badge.highlight && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/badge:flex flex-col z-30 pointer-events-none w-52 p-2 rounded-lg bg-[#050711] border border-cyan-500/40 text-[11px] text-slate-200 shadow-xl shadow-black/80 font-mono">
                          <span className="text-cyan-400 font-bold">{badge.name}</span>
                          <span className="text-slate-400 text-[10px] mt-0.5">{badge.highlight}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Manage Stack Modal */}
        {showManageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
            <div className="bg-[#090D1C] border border-indigo-500/30 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl relative">
              <div className="p-5 border-b border-indigo-950/80 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span>Customize Your Stack Matrix</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Toggle individual technologies to update the live profile and generated README.
                  </p>
                </div>
                <button
                  onClick={() => setShowManageModal(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-md"
                >
                  ✕
                </button>
              </div>

              <div className="p-5 overflow-y-auto space-y-6 flex-1 text-xs">
                {CATEGORY_CONFIGS.map((cat) => {
                  const items = ALL_TECH_BADGES.filter((b) => b.category === cat.key);
                  return (
                    <div key={cat.key} className="space-y-2.5">
                      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-slate-400">
                        <span>{cat.title}</span>
                        <span>{items.filter((b) => profile.selectedTech.includes(b.id)).length} selected</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {items.map((badge) => {
                          const isSelected = profile.selectedTech.includes(badge.id);
                          return (
                            <button
                              key={badge.id}
                              onClick={() => onToggleBadge(badge.id)}
                              className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                                isSelected
                                  ? 'border-cyan-500/70 bg-cyan-950/20 text-white'
                                  : 'border-indigo-950/60 bg-[#050711] text-slate-400 hover:border-indigo-800'
                              }`}
                            >
                              <span className="truncate font-medium">{badge.name}</span>
                              {isSelected ? (
                                <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 ml-1.5" />
                              ) : (
                                <span className="w-3.5 h-3.5 rounded-sm border border-slate-700 shrink-0 ml-1.5" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 border-t border-indigo-950/80 flex items-center justify-between bg-[#060814]/80">
                <span className="text-xs text-slate-400 font-mono">
                  {profile.selectedTech.length} active technologies
                </span>
                <button
                  onClick={() => setShowManageModal(false)}
                  className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
