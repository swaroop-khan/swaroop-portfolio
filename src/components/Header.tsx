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
    <header className="sticky top-0 z-40 bg-[#060814]/90 backdrop-blur-md border-b border-indigo-950/70 px-4 md:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a 
          href="#top" 
          className="text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2.5 group"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 group-hover:rotate-45 transition-transform" />
          <span>Swaroop Khan</span>
        </a>

        {/* Zone 2: Clean Nav Links */}
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
            Terminal CLI
          </a>
          <a href="#analytics" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Pinned Projects
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action & View Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center p-1 bg-[#090D1C] border border-indigo-950/80 rounded-lg">
            <button
              onClick={() => setActiveTab('showcase')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'showcase'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
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
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>README Studio</span>
            </button>
          </div>

          <button
            onClick={onOpenAiEnhance}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-950/30 border border-cyan-800/40 rounded-lg hover:bg-cyan-900/40 transition-colors whitespace-nowrap shrink-0"
            title="AI Profile Enhancer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Polish</span>
          </button>

          <button
            onClick={onCopyReadme}
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#0D122B] hover:bg-indigo-950/70 border border-indigo-500/30 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
          >
            <Copy className="w-3.5 h-3.5 text-cyan-400" />
            <span>Copy .md</span>
          </button>
        </div>
      </div>
    </header>
  );
};
