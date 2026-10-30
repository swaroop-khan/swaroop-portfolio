import React from 'react';
import { Download, Copy, Sparkles, Terminal as TerminalIcon, Code2 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'showcase' | 'studio';
  setActiveTab: (tab: 'showcase' | 'studio') => void;
  onCopyReadme: () => void;
  onDownloadReadme: () => void;
  onOpenAiEnhance: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onCopyReadme,
  onDownloadReadme,
  onOpenAiEnhance,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a 
          href="#top" 
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2.5 group"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-tr from-cyan-400 to-indigo-500 group-hover:rotate-45 transition-transform" />
          <span>Swaroop Khan</span>
        </a>

        {/* Zone 2: 4-5 Clean Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#overview" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Overview
          </a>
          <a href="#directives" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            ML Directives
          </a>
          <a href="#tech-stack" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Tech Stack
          </a>
          <a href="#terminal" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Terminal
          </a>
          <a href="#playground" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            ML Playground
          </a>
          <a href="#analytics" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Analytics
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action & View Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => setActiveTab('showcase')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'showcase'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>Showcase</span>
            </button>
            <button
              onClick={() => setActiveTab('studio')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'studio'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>README Studio</span>
            </button>
          </div>

          <button
            onClick={onOpenAiEnhance}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-950/40 border border-cyan-800/60 rounded-lg hover:bg-cyan-900/40 transition-colors whitespace-nowrap shrink-0"
            title="AI Profile Enhancer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Polish</span>
          </button>

          <button
            onClick={onCopyReadme}
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy .md</span>
          </button>
        </div>
      </div>
    </header>
  );
};
