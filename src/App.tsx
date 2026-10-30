/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { DirectivesAndVision } from './components/DirectivesAndVision';
import { TechStackMatrix } from './components/TechStackMatrix';
import { TerminalCard } from './components/TerminalCard';
import { GitHubAnalytics } from './components/GitHubAnalytics';
import { ReadmeStudio } from './components/ReadmeStudio';
import { AIEnhanceModal } from './components/AIEnhanceModal';
import { DeployGuideModal } from './components/DeployGuideModal';
import { INITIAL_PROFILE, ALL_TECH_BADGES, generateMarkdown } from './data/defaultProfile';
import { ProfileData } from './types';
import { Check, Github } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(INITIAL_PROFILE);
  const [activeTab, setActiveTab] = useState<'showcase' | 'studio'>('showcase');
  const [isAiEnhanceOpen, setIsAiEnhanceOpen] = useState(false);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopyReadme = () => {
    const md = generateMarkdown(profile, ALL_TECH_BADGES);
    navigator.clipboard.writeText(md);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#38BDF8', '#818CF8', '#C084FC'],
    });
    showToast('GitHub Profile README.md copied to clipboard!');
  };

  const handleDownloadReadme = () => {
    const md = generateMarkdown(profile, ALL_TECH_BADGES);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'README.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded README.md');
  };

  const handleToggleBadge = (badgeId: string) => {
    setProfile((prev) => {
      const exists = prev.selectedTech.includes(badgeId);
      return {
        ...prev,
        selectedTech: exists
          ? prev.selectedTech.filter((id) => id !== badgeId)
          : [...prev.selectedTech, badgeId],
      };
    });
  };

  const handleBadgeStyleChange = (style: 'flat-square' | 'for-the-badge' | 'plastic') => {
    setProfile((prev) => ({ ...prev, badgeStyle: style }));
  };

  const handleThemeChange = (theme: string) => {
    setProfile((prev) => ({ ...prev, statsTheme: theme }));
  };

  const handleRunAiTerminalQuery = async (query: string): Promise<string> => {
    try {
      const res = await fetch('/api/ai/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.answer || 'Inference computed successfully.';
      }
    } catch {
      // fallback
    }
    return `Swaroop Khan designs resilient machine learning pipelines, Optuna Bayesian hyperparameter workflows, and low-latency deployed backends for intelligent systems.`;
  };

  return (
    <div className="min-h-screen bg-[#050711] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#090D1C] border border-cyan-500/80 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-mono animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onCopyReadme={handleCopyReadme}
        onDownloadReadme={handleDownloadReadme}
        onOpenAiEnhance={() => setIsAiEnhanceOpen(true)}
      />

      {/* Primary Content View */}
      <main className="flex-1">
        {activeTab === 'showcase' ? (
          <div>
            <HeroBanner
              profile={profile}
              onOpenAiEnhance={() => setIsAiEnhanceOpen(true)}
            />
            <DirectivesAndVision profile={profile} />
            <TechStackMatrix
              profile={profile}
              onToggleBadge={handleToggleBadge}
              onBadgeStyleChange={handleBadgeStyleChange}
            />
            <TerminalCard
              profile={profile}
              onRunAiQuery={handleRunAiTerminalQuery}
            />
            <GitHubAnalytics
              profile={profile}
              onThemeChange={handleThemeChange}
            />
          </div>
        ) : (
          <ReadmeStudio
            profile={profile}
            setProfile={setProfile}
            allBadges={ALL_TECH_BADGES}
            onOpenDeployGuide={() => setIsDeployGuideOpen(false)}
            onOpenAiEnhance={() => setIsAiEnhanceOpen(true)}
            onResetDefaults={() => setProfile(INITIAL_PROFILE)}
          />
        )}
      </main>

      {/* Modals */}
      <AIEnhanceModal
        isOpen={isAiEnhanceOpen}
        onClose={() => setIsAiEnhanceOpen(false)}
        profile={profile}
        onApplyPhilosophy={(p) => setProfile((prev) => ({ ...prev, philosophy: p }))}
        onApplyTaglines={(t) => setProfile((prev) => ({ ...prev, taglineLines: t }))}
        onApplyFocus={(f, s) =>
          setProfile((prev) => ({ ...prev, currentFocus: f, specialization: s }))
        }
      />

      <DeployGuideModal
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
        githubUsername={profile.githubUsername}
        onCopyReadme={handleCopyReadme}
      />

      {/* Footer */}
      <footer className="border-t border-indigo-950/60 bg-[#04060E] py-8 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Swaroop Khan</span>
            <span className="text-indigo-800">·</span>
            <span>Bangalore, India 🇮🇳</span>
            <span className="text-indigo-800">·</span>
            <span>Applied AI & Machine Learning Systems</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <a
              href={profile.portfolioUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              Portfolio
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
