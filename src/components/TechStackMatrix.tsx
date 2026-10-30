import React, { useState } from 'react';
import { Layers, Search, Plus, Check, SlidersHorizontal, ExternalLink, Code } from 'lucide-react';
import { TechBadge, ProfileData } from '../types';
import { ALL_TECH_BADGES } from '../data/defaultProfile';

interface TechStackMatrixProps {
  profile: ProfileData;
  onToggleBadge: (badgeId: string) => void;
  onBadgeStyleChange: (style: 'flat-square' | 'for-the-badge' | 'plastic') => void;
}

export const TechStackMatrix: React.FC<TechStackMatrixProps> = ({
  profile,
  onToggleBadge,
  onBadgeStyleChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayMode, setDisplayMode] = useState<'badges' | 'cards'>('badges');
  const [showManageModal, setShowManageModal] = useState(false);

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'languages', label: 'Languages' },
    { id: 'ml_ds', label: 'Machine Learning & DS' },
    { id: 'ai_ecosystem', label: 'AI Ecosystem' },
    { id: 'web', label: 'Web & Infra' },
    { id: 'tools', label: 'Tools & Hardware' },
  ];

  const activeBadges = ALL_TECH_BADGES.filter((b) => profile.selectedTech.includes(b.id));

  const filteredBadges = activeBadges.filter((badge) => {
    const matchesCat = selectedCategory === 'all' || badge.category === selectedCategory;
    const matchesSearch = badge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      badge.highlight?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="tech-stack" className="py-12 border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>Tech Stack & Engineering Matrix</span>
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Curated functional toolkit organized by production engineering domains.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Badge Style Switcher */}
            <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
              <button
                onClick={() => onBadgeStyleChange('flat-square')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  profile.badgeStyle === 'flat-square' ? 'bg-slate-800 text-cyan-300' : 'text-slate-400'
                }`}
                title="GitHub Standard Flat-Square"
              >
                Flat-Square
              </button>
              <button
                onClick={() => onBadgeStyleChange('for-the-badge')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  profile.badgeStyle === 'for-the-badge' ? 'bg-slate-800 text-cyan-300' : 'text-slate-400'
                }`}
                title="Prominent For-the-Badge"
              >
                For-The-Badge
              </button>
            </div>

            <button
              onClick={() => setShowManageModal(true)}
              className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-cyan-400" />
              <span>Manage Stack ({profile.selectedTech.length})</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 border border-slate-800/80 p-2.5 rounded-xl">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar & display mode */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-48">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Filter tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-md pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center p-0.5 bg-slate-950 border border-slate-800 rounded-md text-xs">
              <button
                onClick={() => setDisplayMode('badges')}
                className={`px-2 py-1 rounded ${displayMode === 'badges' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
                title="Badge View"
              >
                Badges
              </button>
              <button
                onClick={() => setDisplayMode('cards')}
                className={`px-2 py-1 rounded ${displayMode === 'cards' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
                title="Detail View"
              >
                Specs
              </button>
            </div>
          </div>
        </div>

        {/* Display: Badges or Cards */}
        {displayMode === 'badges' ? (
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-6">
            {/* Grouped by category if viewing all */}
            {['languages', 'ml_ds', 'ai_ecosystem', 'web', 'tools'].map((catKey) => {
              if (selectedCategory !== 'all' && selectedCategory !== catKey) return null;
              const catBadges = filteredBadges.filter((b) => b.category === catKey);
              if (catBadges.length === 0) return null;

              const titleMap: Record<string, string> = {
                languages: 'Programming Languages',
                ml_ds: 'Machine Learning & Data Science',
                ai_ecosystem: 'AI & Development Ecosystem',
                web: 'Web Development & Infrastructure',
                tools: 'Developer Tools & Hardware',
              };

              return (
                <div key={catKey} className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">
                      {titleMap[catKey]}
                    </span>
                    <span className="text-xs text-slate-600 font-mono">({catBadges.length})</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {catBadges.map((badge) => (
                      <div key={badge.id} className="relative group">
                        <img
                          src={`https://img.shields.io/badge/${encodeURIComponent(badge.name)}-${badge.badgeColor}?style=${profile.badgeStyle}&logo=${badge.logo}&logoColor=${badge.logoColor || 'white'}`}
                          alt={badge.name}
                          height="28"
                          className="h-7 cursor-pointer hover:opacity-90 transition-opacity"
                          title={badge.highlight}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredBadges.map((badge) => (
              <div
                key={badge.id}
                className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white text-sm">{badge.name}</span>
                    <span className="text-[11px] font-mono text-cyan-400">{badge.level}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {badge.highlight || 'Integrated in production pipeline'}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 uppercase font-mono">Domain: {badge.category}</span>
                  <img
                    src={`https://img.shields.io/badge/-${badge.badgeColor}?style=flat-square&logo=${badge.logo}&logoColor=${badge.logoColor || 'white'}`}
                    alt=""
                    className="h-3.5 opacity-80"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Manage Stack Modal */}
        {showManageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white">Select Stack Badges</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Click any badge to toggle its presence in your live README markdown.
                  </p>
                </div>
                <button
                  onClick={() => setShowManageModal(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-md"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 overflow-y-auto space-y-6 flex-1">
                {['languages', 'ml_ds', 'ai_ecosystem', 'web', 'tools'].map((catKey) => {
                  const items = ALL_TECH_BADGES.filter((b) => b.category === catKey);
                  return (
                    <div key={catKey} className="space-y-2">
                      <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase">
                        {catKey.replace('_', ' ')}
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {items.map((badge) => {
                          const isSelected = profile.selectedTech.includes(badge.id);
                          return (
                            <button
                              key={badge.id}
                              onClick={() => onToggleBadge(badge.id)}
                              className={`p-2 rounded-lg border text-left text-xs flex items-center justify-between transition-all ${
                                isSelected
                                  ? 'border-cyan-500 bg-cyan-950/20 text-white'
                                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                              }`}
                            >
                              <span className="truncate">{badge.name}</span>
                              {isSelected ? (
                                <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 ml-1" />
                              ) : (
                                <Plus className="w-3.5 h-3.5 text-slate-600 shrink-0 ml-1" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/50">
                <span className="text-xs text-slate-400">
                  {profile.selectedTech.length} technologies active
                </span>
                <button
                  onClick={() => setShowManageModal(false)}
                  className="px-4 py-1.5 text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors"
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
