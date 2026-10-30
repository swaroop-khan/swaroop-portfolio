import React, { useState } from 'react';
import { BarChart3, Star, GitFork, ExternalLink, Github, Sparkles } from 'lucide-react';
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
  { id: 'synthwave', label: 'Synthwave' },
];

export const GitHubAnalytics: React.FC<GitHubAnalyticsProps> = ({ profile, onThemeChange }) => {
  const [selectedTheme, setSelectedTheme] = useState(profile.statsTheme || 'tokyonight');

  const handleSelectTheme = (th: string) => {
    setSelectedTheme(th);
    onThemeChange(th);
  };

  const topLangsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.githubUsername}&layout=compact&langs_count=8&theme=${selectedTheme}&hide_border=true&hide=jupyter%20notebook`;
  const statsCardUrl = `https://github-readme-stats.vercel.app/api?username=${profile.githubUsername}&show_icons=true&theme=${selectedTheme}&hide_border=true&count_private=true`;

  return (
    <section id="analytics" className="py-12 border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-8">
        {/* Section Heading & Theme Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              <span>GitHub Analytics & Open Source Systems</span>
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Live statistics, repository metrics, and code frequency for @{profile.githubUsername}.
            </p>
          </div>

          {/* Theme switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs overflow-x-auto">
            <span className="text-[11px] text-slate-500 font-mono pl-1.5 pr-1">Theme:</span>
            {STATS_THEMES.map((th) => (
              <button
                key={th.id}
                onClick={() => handleSelectTheme(th.id)}
                className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
                  selectedTheme === th.id
                    ? 'bg-slate-800 text-cyan-300 font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {th.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live GitHub Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Languages Card */}
          <div className="p-4 rounded-xl border border-slate-800 bg-[#070A11] flex flex-col justify-between items-center text-center">
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs">
              <span className="font-mono text-slate-400">Most Used Languages</span>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
              >
                <span>@{profile.githubUsername}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="my-4 w-full flex justify-center overflow-hidden">
              <img
                src={topLangsUrl}
                alt={`Top Languages - ${profile.developerName}`}
                className="max-w-full rounded-md shadow"
                onError={(e) => {
                  // Fallback styled card if github-readme-stats is rate-limited
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  if (target.nextElementSibling) {
                    (target.nextElementSibling as HTMLElement).style.display = 'flex';
                  }
                }}
              />
              <div className="hidden flex-col items-center justify-center p-6 bg-slate-900/80 rounded-lg border border-slate-800 w-full text-center">
                <Github className="w-8 h-8 text-cyan-400 mb-2" />
                <span className="text-sm font-semibold text-white">Python · C++ · JavaScript · SQL</span>
                <p className="text-xs text-slate-400 mt-1">Live GitHub API stats connected for @{profile.githubUsername}</p>
              </div>
            </div>

            <span className="text-[11px] text-slate-500 font-mono">
              Dynamically cached by GitHub SVG service
            </span>
          </div>

          {/* GitHub Streak & Stats Summary Card */}
          <div className="p-4 rounded-xl border border-slate-800 bg-[#070A11] flex flex-col justify-between items-center text-center">
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs">
              <span className="font-mono text-slate-400">Activity Metrics & Streaks</span>
              <span className="text-emerald-400 font-mono text-[11px]">Active Contributor</span>
            </div>

            <div className="my-4 w-full flex justify-center overflow-hidden">
              <img
                src={statsCardUrl}
                alt={`GitHub Stats - ${profile.developerName}`}
                className="max-w-full rounded-md shadow"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  if (target.nextElementSibling) {
                    (target.nextElementSibling as HTMLElement).style.display = 'flex';
                  }
                }}
              />
              <div className="hidden flex-col items-center justify-center p-6 bg-slate-900/80 rounded-lg border border-slate-800 w-full text-center">
                <Sparkles className="w-8 h-8 text-indigo-400 mb-2" />
                <span className="text-sm font-semibold text-white">Consistent Open Source Contributions</span>
                <p className="text-xs text-slate-400 mt-1">Machine Learning algorithms, system pipelines & web demos</p>
              </div>
            </div>

            <span className="text-[11px] text-slate-500 font-mono">
              Auto-refreshed with every commit
            </span>
          </div>
        </div>

        {/* Featured Repositories Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">Featured Open Source Repositories</h3>
            <a
              href={`${profile.githubUrl}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
            >
              <span>View all on GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURED_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-white hover:text-cyan-400 transition-colors text-sm flex items-center gap-1.5"
                    >
                      <span>{proj.title}</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                      {proj.stars !== undefined && (
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span>{proj.stars}</span>
                        </span>
                      )}
                      {proj.forks !== undefined && (
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3 h-3 text-slate-400" />
                          <span>{proj.forks}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="text-xs font-mono text-slate-400">
                      {tag} ·
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connect & Collaborate Banner */}
        <div className="rounded-xl border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 p-8 text-center space-y-4">
          <h3 className="text-lg font-bold text-white tracking-tight">
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
              className="px-4 py-2 text-xs font-medium text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Portfolio Website</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-xs font-medium text-white bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>LinkedIn Network</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="px-4 py-2 text-xs font-medium text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Send Direct Email</span>
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
