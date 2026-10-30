import React, { useState } from 'react';
import { Copy, Download, Sparkles, Check, RefreshCw, Eye, Code, HelpCircle, Palette, Type, Sliders, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProfileData, TechBadge } from '../types';
import { generateMarkdown } from '../data/defaultProfile';

interface ReadmeStudioProps {
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
  allBadges: TechBadge[];
  onOpenDeployGuide: () => void;
  onOpenAiEnhance: () => void;
  onResetDefaults: () => void;
}

export const ReadmeStudio: React.FC<ReadmeStudioProps> = ({
  profile,
  setProfile,
  allBadges,
  onOpenDeployGuide,
  onOpenAiEnhance,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'split'>('split');
  const [editorSubTab, setEditorSubTab] = useState<'general' | 'banner' | 'taglines' | 'socials' | 'raw'>('general');
  const [copied, setCopied] = useState(false);
  const [rawMarkdownOverride, setRawMarkdownOverride] = useState<string | null>(null);

  const currentGeneratedMarkdown = generateMarkdown(profile, allBadges);
  const activeMarkdown = rawMarkdownOverride !== null ? rawMarkdownOverride : currentGeneratedMarkdown;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeMarkdown);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#0EA5E9', '#6366F1', '#10B981'],
    });
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownload = () => {
    const blob = new Blob([activeMarkdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'README.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Preset color gradients for banner
  const bannerGradients = [
    { name: 'Tokyo Cyan', colors: ['0EA5E9', '6366F1', '8B5CF6', 'A855F7'] },
    { name: 'Emerald AI', colors: ['10B981', '059669', '047857', '065F46'] },
    { name: 'Sunset Amber', colors: ['F59E0B', 'EF4444', 'DC2626', '991B1B'] },
    { name: 'Cyber Neon', colors: ['06B6D4', '3B82F6', '8B5CF6', 'EC4899'] },
    { name: 'Monochrome', colors: ['334155', '1E293B', '0F172A', '020617'] },
  ];

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 md:px-8 space-y-6">
      {/* Studio Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border border-indigo-500/20 bg-[#080C1B]/90 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500" />
            <span>Interactive GitHub README Studio</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1 font-mono">
            Real-time visual editor & markdown compiler configured for GitHub Profile Readme standard.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={onOpenAiEnhance}
            className="px-3 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-950/30 border border-cyan-800/40 rounded-lg hover:bg-cyan-900/40 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Polish</span>
          </button>

          <button
            onClick={onOpenDeployGuide}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-[#090D1C] hover:bg-indigo-950/60 border border-indigo-950/80 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Deploy Guide</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Markdown'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#0B1024] hover:bg-indigo-950/60 border border-indigo-500/30 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Download .md</span>
          </button>

          <button
            onClick={onResetDefaults}
            className="p-1.5 text-slate-400 hover:text-white bg-[#0B1024] border border-indigo-950/80 rounded-lg transition-colors"
            title="Reset to Original Swaroop Profile"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* View Switcher Bar */}
      <div className="flex items-center justify-between border-b border-indigo-950/70 pb-3">
        {/* Editor Sub-tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs font-mono">
          <button
            onClick={() => setEditorSubTab('general')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              editorSubTab === 'general' ? 'bg-indigo-600/30 text-cyan-300 border border-indigo-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3 h-3" />
            <span>Bio & Directives</span>
          </button>
          <button
            onClick={() => setEditorSubTab('banner')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              editorSubTab === 'banner' ? 'bg-indigo-600/30 text-cyan-300 border border-indigo-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-3 h-3" />
            <span>Banner Styling</span>
          </button>
          <button
            onClick={() => setEditorSubTab('taglines')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              editorSubTab === 'taglines' ? 'bg-indigo-600/30 text-cyan-300 border border-indigo-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Type className="w-3 h-3" />
            <span>Typing Taglines</span>
          </button>
          <button
            onClick={() => setEditorSubTab('socials')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              editorSubTab === 'socials' ? 'bg-indigo-600/30 text-cyan-300 border border-indigo-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ExternalLink className="w-3 h-3" />
            <span>Socials & Links</span>
          </button>
          <button
            onClick={() => setEditorSubTab('raw')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              editorSubTab === 'raw' ? 'bg-indigo-600/30 text-cyan-300 border border-indigo-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code className="w-3 h-3" />
            <span>Raw Code</span>
          </button>
        </div>

        {/* Layout split buttons */}
        <div className="hidden md:flex items-center p-0.5 bg-[#090D1C] border border-indigo-950/80 rounded-lg text-xs font-mono">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-2.5 py-1 rounded ${activeTab === 'editor' ? 'bg-indigo-600/30 text-cyan-300' : 'text-slate-400'}`}
          >
            Editor Only
          </button>
          <button
            onClick={() => setActiveTab('split')}
            className={`px-2.5 py-1 rounded ${activeTab === 'split' ? 'bg-indigo-600/30 text-cyan-300' : 'text-slate-400'}`}
          >
            Split View
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-2.5 py-1 rounded ${activeTab === 'preview' ? 'bg-indigo-600/30 text-cyan-300' : 'text-slate-400'}`}
          >
            GitHub Preview
          </button>
        </div>
      </div>

      {/* Main Studio Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Editor */}
        {(activeTab === 'editor' || activeTab === 'split') && (
          <div className={`${activeTab === 'split' ? 'lg:col-span-5' : 'lg:col-span-12'} space-y-4`}>
            {editorSubTab === 'general' && (
              <div className="p-5 rounded-xl border border-indigo-950/80 bg-[#080C1B]/90 space-y-4 text-xs shadow-lg">
                <h3 className="font-semibold text-white text-sm">Developer Bio & Overview</h3>

                <div className="space-y-1">
                  <label className="text-slate-400">Developer Name</label>
                  <input
                    type="text"
                    value={profile.developerName}
                    onChange={(e) => setProfile({ ...profile, developerName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Role / Title</label>
                  <input
                    type="text"
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Location</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Current Focus (Directive)</label>
                  <input
                    type="text"
                    value={profile.currentFocus}
                    onChange={(e) => setProfile({ ...profile, currentFocus: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Specialization</label>
                  <input
                    type="text"
                    value={profile.specialization}
                    onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Core Engineering Philosophy</label>
                  <textarea
                    rows={3}
                    value={profile.philosophy}
                    onChange={(e) => setProfile({ ...profile, philosophy: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            )}

            {editorSubTab === 'banner' && (
              <div className="p-5 rounded-xl border border-indigo-950/80 bg-[#080C1B]/90 space-y-4 text-xs shadow-lg">
                <h3 className="font-semibold text-white text-sm">Header Banner Configuration</h3>

                <div className="space-y-2">
                  <label className="text-slate-400">Banner Preset Palettes</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {bannerGradients.map((g) => (
                      <button
                        key={g.name}
                        onClick={() =>
                          setProfile({
                            ...profile,
                            bannerTheme: { ...profile.bannerTheme, gradientColors: g.colors },
                          })
                        }
                        className="p-2.5 rounded-lg border border-slate-800 bg-slate-950 hover:border-slate-700 flex items-center justify-between text-left"
                      >
                        <span className="text-slate-300 font-medium">{g.name}</span>
                        <div className="flex gap-1">
                          {g.colors.map((c, i) => (
                            <span
                              key={i}
                              className="w-3.5 h-3.5 rounded-full"
                              style={{ backgroundColor: `#${c}` }}
                            />
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Capsule Wave Type</label>
                  <select
                    value={profile.bannerTheme.type}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        bannerTheme: {
                          ...profile.bannerTheme,
                          type: e.target.value as 'waving' | 'slice' | 'rect' | 'soft',
                        },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="waving">Waving Header (Standard)</option>
                    <option value="slice">Slice Diagonal</option>
                    <option value="rect">Clean Rectangle</option>
                    <option value="soft">Soft Flow</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Banner Height (px)</label>
                  <input
                    type="number"
                    min="150"
                    max="320"
                    value={profile.bannerTheme.height}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        bannerTheme: { ...profile.bannerTheme, height: parseInt(e.target.value) || 220 },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>
            )}

            {editorSubTab === 'taglines' && (
              <div className="p-5 rounded-xl border border-indigo-950/80 bg-[#080C1B]/90 space-y-4 text-xs shadow-lg">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white text-sm">Typing Effect Lines</h3>
                  <button
                    onClick={() =>
                      setProfile({
                        ...profile,
                        taglineLines: [...profile.taglineLines, 'New dynamic tagline'],
                      })
                    }
                    className="text-cyan-400 hover:underline"
                  >
                    + Add Line
                  </button>
                </div>

                <div className="space-y-2">
                  {profile.taglineLines.map((line, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-slate-500 font-mono w-4">{idx + 1}.</span>
                      <input
                        type="text"
                        value={line}
                        onChange={(e) => {
                          const updated = [...profile.taglineLines];
                          updated[idx] = e.target.value;
                          setProfile({ ...profile, taglineLines: updated });
                        }}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-md px-3 py-1.5 text-white focus:outline-none focus:border-cyan-500"
                      />
                      {profile.taglineLines.length > 1 && (
                        <button
                          onClick={() => {
                            const updated = profile.taglineLines.filter((_, i) => i !== idx);
                            setProfile({ ...profile, taglineLines: updated });
                          }}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {editorSubTab === 'socials' && (
              <div className="p-5 rounded-xl border border-indigo-950/80 bg-[#080C1B]/90 space-y-4 text-xs shadow-lg">
                <h3 className="font-semibold text-white text-sm">Handles & Social Profiles</h3>

                <div className="space-y-1">
                  <label className="text-slate-400">Portfolio URL</label>
                  <input
                    type="text"
                    value={profile.portfolioUrl}
                    onChange={(e) => setProfile({ ...profile, portfolioUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">GitHub Username</label>
                  <input
                    type="text"
                    value={profile.githubUsername}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        githubUsername: e.target.value,
                        githubUrl: `https://github.com/${e.target.value}`,
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">LinkedIn URL</label>
                  <input
                    type="text"
                    value={profile.linkedinUrl}
                    onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">LeetCode Username</label>
                  <input
                    type="text"
                    value={profile.leetcodeUsername}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        leetcodeUsername: e.target.value,
                        leetcodeUrl: `https://leetcode.com/u/${e.target.value}/`,
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            )}

            {editorSubTab === 'raw' && (
              <div className="p-4 rounded-xl border border-slate-800 bg-[#070A11] space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Direct Markdown Editor</span>
                  <button
                    onClick={() => setRawMarkdownOverride(null)}
                    className="text-cyan-400 hover:underline"
                  >
                    Reset to Generated
                  </button>
                </div>
                <textarea
                  rows={20}
                  value={activeMarkdown}
                  onChange={(e) => setRawMarkdownOverride(e.target.value)}
                  className="w-full bg-transparent font-mono text-xs text-slate-200 focus:outline-none resize-y leading-relaxed"
                />
              </div>
            )}
          </div>
        )}

        {/* Right Column: GitHub Real-Time Render Preview */}
        {(activeTab === 'preview' || activeTab === 'split') && (
          <div className={`${activeTab === 'split' ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-3`}>
            <div className="flex items-center justify-between px-2 text-xs">
              <span className="font-mono text-slate-400 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>Simulated GitHub.com Markdown Render</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">GFM (GitHub Flavored Markdown)</span>
            </div>

            {/* Container mimicking GitHub Dark theme card */}
            <div className="rounded-xl border border-slate-800 bg-[#0D1117] p-6 md:p-8 space-y-6 shadow-2xl overflow-x-auto text-slate-200">
              {/* Header Banner */}
              <div className="text-center space-y-3">
                <a href={profile.portfolioUrl} target="_blank" rel="noreferrer" className="block">
                  <img
                    src={`https://capsule-render.vercel.app/api?type=${profile.bannerTheme.type}&color=gradient&customColorList=0,1,2,3&customColors=${profile.bannerTheme.gradientColors.join(',')}&height=${profile.bannerTheme.height}&section=header&text=${encodeURIComponent(profile.developerName)}&fontSize=${profile.bannerTheme.fontSize}&fontAlignY=38&desc=${encodeURIComponent(`${profile.role} | Applied AI Developer`)}&descAlignY=62&descSize=19&fontColor=ffffff&stroke=0EA5E9&strokeWidth=0`}
                    alt="Banner preview"
                    className="w-full rounded-lg"
                  />
                </a>

                {/* Typing SVG */}
                <div className="flex justify-center py-1">
                  <img
                    src={`https://readme-typing-svg.demolab.com?font=${profile.typingConfig.font}&weight=${profile.typingConfig.weight}&size=${profile.typingConfig.size}&duration=${profile.typingConfig.duration}&pause=${profile.typingConfig.pause}&color=${profile.typingConfig.color}&center=true&vCenter=true&multiline=false&width=620&height=45&lines=${profile.taglineLines.map((l) => encodeURIComponent(l)).join(';')}`}
                    alt="Typing SVG preview"
                    className="max-w-full"
                  />
                </div>

                {/* Social Badges preview */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  <img
                    src="https://img.shields.io/badge/Portfolio-0EA5E9?style=for-the-badge&logo=googlechrome&logoColor=white"
                    alt="Portfolio"
                    height="28"
                  />
                  <img
                    src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"
                    alt="LinkedIn"
                    height="28"
                  />
                  <img
                    src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"
                    alt="GitHub"
                    height="28"
                  />
                  <img
                    src="https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=black"
                    alt="LeetCode"
                    height="28"
                  />
                  <img
                    src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white"
                    alt="Email"
                    height="28"
                  />
                </div>

                <p className="text-xs italic text-slate-400 pt-2">
                  &ldquo;{profile.philosophy}&rdquo;
                </p>
              </div>

              <hr className="border-slate-800" />

              {/* JSON Profile Preview */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white font-mono">⚡ Overview & Terminal Profile</h3>
                <pre className="p-4 rounded-lg bg-[#161B22] border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
{`{
  "developer": "${profile.developerName}",
  "location": "${profile.location}",
  "role": "${profile.role}",
  "focus": [
    "Artificial Intelligence",
    "Machine Learning",
    "System Design & Architecture"
  ],
  "currently_building": "${profile.currentlyBuilding}",
  "philosophy": "${profile.philosophy}"
}`}
                </pre>
              </div>

              {/* Directives table preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-slate-800 rounded-lg p-4 bg-[#161B22]/50 text-xs">
                <div className="space-y-1.5">
                  <h4 className="font-semibold text-white">📍 Core Directives</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                    <li><strong>Location:</strong> Bangalore, Karnataka, India</li>
                    <li><strong>Current Focus:</strong> {profile.currentFocus}</li>
                    <li><strong>Specialization:</strong> {profile.specialization}</li>
                  </ul>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-semibold text-white">🎯 Vision & Objective</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                    <li><strong>Building:</strong> Resilient AI-driven tools with clean UX.</li>
                    <li><strong>Exploration:</strong> End-to-end ML lifecycle.</li>
                    <li><strong>Collaboration:</strong> Open to research discussions.</li>
                  </ul>
                </div>
              </div>

              {/* Stack Preview */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white font-mono">🛠️ Tech Stack & Architecture</h3>
                <div className="flex flex-wrap items-center gap-1.5">
                  {allBadges
                    .filter((b) => profile.selectedTech.includes(b.id))
                    .map((badge) => (
                      <img
                        key={badge.id}
                        src={`https://img.shields.io/badge/${encodeURIComponent(badge.name)}-${badge.badgeColor}?style=${profile.badgeStyle}&logo=${badge.logo}&logoColor=${badge.logoColor || 'white'}`}
                        alt={badge.name}
                        className="h-6"
                      />
                    ))}
                </div>
              </div>

              {/* Stats Card Preview */}
              <div className="space-y-3 text-center">
                <h3 className="text-sm font-bold text-white font-mono">📊 GitHub Analytics & Most Used Languages</h3>
                <div className="flex justify-center">
                  <img
                    src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.githubUsername}&layout=compact&langs_count=8&theme=${profile.statsTheme}&hide_border=true&hide=jupyter%20notebook`}
                    alt="Top Languages"
                    className="max-w-full rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
