import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, Send, RotateCcw, CornerDownLeft } from 'lucide-react';
import { ProfileData } from '../types';
import { ALL_TECH_BADGES, FEATURED_PROJECTS } from '../data/defaultProfile';

interface TerminalCardProps {
  profile: ProfileData;
  onRunAiQuery?: (query: string) => Promise<string>;
}

interface CommandLog {
  command: string;
  output: React.ReactNode;
  time: string;
}

export const TerminalCard: React.FC<TerminalCardProps> = ({ profile, onRunAiQuery }) => {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      command: 'whoami',
      output: (
        <div className="text-slate-300 space-y-1 font-mono text-xs">
          <p><span className="text-cyan-400 font-semibold">{profile.developerName}</span> — {profile.role}</p>
          <p className="text-slate-400">📍 {profile.location} | Applied AI & ML Systems</p>
          <p className="text-slate-400">🚀 Active Architecture: {profile.currentlyBuilding}</p>
        </div>
      ),
      time: '00:01',
    },
  ]);
  const [history, setHistory] = useState<string[]>(['whoami']);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isProcessing, setIsProcessing] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = async (cmdString: string) => {
    const trimmed = cmdString.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    let resultOutput: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        resultOutput = (
          <div className="space-y-1 font-mono text-xs text-slate-300">
            <p className="text-cyan-400 font-semibold">Available Terminal Directives:</p>
            <p><span className="text-amber-400">whoami</span> — Developer profile specs and current status</p>
            <p><span className="text-amber-400">skills</span> — Categorized engineering tech stack</p>
            <p><span className="text-amber-400">projects</span> — List authentic pinned GitHub repositories</p>
            <p><span className="text-amber-400">pipeline</span> — End-to-end ML lifecycle stages</p>
            <p><span className="text-amber-400">contact</span> — Direct communication endpoints</p>
            <p><span className="text-amber-400">ai-ask &lt;query&gt;</span> — Query AI assistant about Swaroop&apos;s work</p>
            <p><span className="text-amber-400">clear</span> — Clear terminal output buffer</p>
          </div>
        );
        break;

      case 'whoami':
        resultOutput = (
          <div className="text-slate-300 space-y-1 font-mono text-xs">
            <p><span className="text-cyan-400 font-semibold">{profile.developerName}</span></p>
            <p>Role: {profile.role}</p>
            <p>Location: {profile.location}</p>
            <p>Focus: {profile.currentFocus}</p>
            <p>Specialization: {profile.specialization}</p>
            <p className="italic text-slate-400 mt-1">&quot;{profile.philosophy}&quot;</p>
          </div>
        );
        break;

      case 'skills':
        const activeBadges = ALL_TECH_BADGES.filter((b) => profile.selectedTech.includes(b.id));
        resultOutput = (
          <div className="space-y-2 font-mono text-xs text-slate-300">
            <p className="text-cyan-400 font-semibold">Categorized Tech Stack ({activeBadges.length} technologies):</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-amber-400">[Languages]</span>:{' '}
                {activeBadges.filter((b) => b.category === 'languages').map((b) => b.name).join(', ')}
              </div>
              <div>
                <span className="text-purple-400">[ML & Data Science]</span>:{' '}
                {activeBadges.filter((b) => b.category === 'ml_ds').map((b) => b.name).join(', ')}
              </div>
              <div>
                <span className="text-sky-400">[AI Ecosystem]</span>:{' '}
                {activeBadges.filter((b) => b.category === 'ai_ecosystem').map((b) => b.name).join(', ')}
              </div>
              <div>
                <span className="text-emerald-400">[Web & Infra]</span>:{' '}
                {activeBadges.filter((b) => b.category === 'web').map((b) => b.name).join(', ')}
              </div>
            </div>
          </div>
        );
        break;

      case 'projects':
        resultOutput = (
          <div className="space-y-2 font-mono text-xs text-slate-300">
            <p className="text-cyan-400 font-semibold">Authentic Pinned GitHub Systems:</p>
            {FEATURED_PROJECTS.map((p, i) => (
              <p key={p.id}>
                <span className="text-amber-400">[{i + 1}] {p.title}</span> — {p.description}
              </p>
            ))}
          </div>
        );
        break;

      case 'pipeline':
        resultOutput = (
          <div className="space-y-1.5 font-mono text-xs text-slate-300">
            <p className="text-cyan-400 font-semibold">End-to-End ML Architecture Flow:</p>
            <p><span className="text-amber-400">[01] Ingestion & Resampling</span> → Pandas, NumPy, Imbalanced-Learn (SMOTE)</p>
            <p><span className="text-amber-400">[02] Modeling & Cross-Val</span> → Scikit-Learn, XGBoost, PyTorch</p>
            <p><span className="text-amber-400">[03] Optimization & Pruning</span> → Optuna Bayesian TPE, Joblib parallelization</p>
            <p><span className="text-amber-400">[04] Serving & Reactive UX</span> → Streamlit, Supabase, Vercel REST APIs</p>
          </div>
        );
        break;

      case 'contact':
        resultOutput = (
          <div className="space-y-1 font-mono text-xs text-slate-300">
            <p className="text-cyan-400 font-semibold">Direct Communication Channels:</p>
            <p>📧 Email: <a href={`mailto:${profile.email}`} className="text-cyan-300 underline">{profile.email}</a></p>
            <p>💼 LinkedIn: <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="text-cyan-300 underline">{profile.linkedinUrl}</a></p>
            <p>🐙 GitHub: <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="text-cyan-300 underline">{profile.githubUrl}</a></p>
            <p>🌐 Portfolio: <a href={profile.portfolioUrl} target="_blank" rel="noreferrer" className="text-cyan-300 underline">{profile.portfolioUrl}</a></p>
          </div>
        );
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      case 'ai-ask':
      case 'ai':
        if (!arg) {
          resultOutput = <span className="text-amber-400">Usage: ai-ask &lt;your question about Swaroop or ML&gt;</span>;
        } else {
          setIsProcessing(true);
          try {
            let answer = '';
            if (onRunAiQuery) {
              answer = await onRunAiQuery(arg);
            } else {
              answer = `Swaroop Khan develops intelligent software architectures and voice agents (VoxHire). His tech stack features Python, Scikit-Learn, Optuna, Streamlit, and C graphics.`;
            }
            resultOutput = (
              <div className="text-slate-300 space-y-1 font-mono text-xs">
                <span className="text-cyan-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI Assistant Response:
                </span>
                <p className="leading-relaxed">{answer}</p>
              </div>
            );
          } catch {
            resultOutput = <span className="text-rose-400">Error processing query.</span>;
          } finally {
            setIsProcessing(false);
          }
        }
        break;

      default:
        resultOutput = (
          <span className="text-rose-400 font-mono text-xs">
            zsh: command not found: {cmd}. Type <span className="text-cyan-400">&apos;help&apos;</span> to inspect available directives.
          </span>
        );
    }

    setLogs((prev) => [...prev, { command: trimmed, output: resultOutput, time: now }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < history.length) {
          setHistoryIndex(nextIndex);
          setInputVal(history[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInputVal('');
        }
      }
    }
  };

  const quickCommands = ['whoami', 'skills', 'projects', 'pipeline', 'contact', 'help'];

  return (
    <section id="terminal" className="py-14 border-t border-indigo-950/40 relative">
      <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Shell Interface</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mt-1 flex items-center gap-2.5">
              <span>Interactive Developer Terminal</span>
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              Interactive CLI environment into Swaroop&apos;s real repositories, stack, and machine learning directives.
            </p>
          </div>

          <button
            onClick={() => setLogs([])}
            className="self-start sm:self-auto px-2.5 py-1 text-xs text-slate-400 hover:text-white bg-[#090D1C] border border-indigo-950/80 rounded-md transition-colors flex items-center gap-1.5 font-mono"
            title="Clear Terminal Output"
          >
            <RotateCcw className="w-3 h-3 text-cyan-400" />
            <span>Clear Buffer</span>
          </button>
        </div>

        {/* Terminal Window with Dark Futuristic Aesthetic */}
        <div className="rounded-xl border border-indigo-500/25 bg-[#050711] shadow-2xl shadow-black/80 overflow-hidden font-mono relative">
          {/* Subtle top cyan/indigo line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 opacity-70" />

          {/* Terminal Titlebar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#080C1B] border-b border-indigo-950/70">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
              <span className="ml-2 text-xs text-slate-300 font-medium">swaroop@bangalore-ai: ~ (zsh)</span>
            </div>
            <span className="text-[11px] text-cyan-400/70 font-mono">zsh 5.9</span>
          </div>

          {/* Terminal Content Buffer */}
          <div className="p-4 md:p-6 space-y-4 max-h-[340px] overflow-y-auto text-xs md:text-sm">
            {logs.map((log, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-emerald-400 font-semibold">swaroop@bangalore</span>
                  <span className="text-indigo-400">:</span>
                  <span className="text-cyan-400">~</span>
                  <span className="text-slate-500">$</span>
                  <span className="text-white font-medium">{log.command}</span>
                </div>
                <div className="pl-4 border-l border-indigo-900/60 my-1">
                  {log.output}
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="flex items-center gap-2 text-xs text-cyan-400 animate-pulse font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Running query through intelligence kernel...</span>
              </div>
            )}

            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Input Bar */}
          <div className="px-4 py-3 bg-[#070914] border-t border-indigo-950/80 flex items-center gap-2 text-xs md:text-sm">
            <span className="text-emerald-400 font-semibold shrink-0">swaroop@bangalore</span>
            <span className="text-indigo-400 shrink-0">:</span>
            <span className="text-cyan-400 shrink-0">~</span>
            <span className="text-slate-500 shrink-0">$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help', 'projects', 'skills', or 'ai-ask <question>'..."
              className="flex-1 bg-transparent text-white focus:outline-none placeholder-slate-600 caret-cyan-400"
              autoFocus
            />
            <button
              onClick={() => handleCommand(inputVal)}
              disabled={!inputVal.trim() || isProcessing}
              className="text-slate-400 hover:text-cyan-400 disabled:opacity-30 transition-colors p-1"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Command Suggestions */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 font-mono">Quick Run:</span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2.5 py-1 text-xs font-mono bg-[#090D1C] hover:bg-indigo-950/50 border border-indigo-950/80 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-300 rounded transition-colors"
            >
              ${cmd}
            </button>
          ))}
          <button
            onClick={() => handleCommand('ai-ask Tell me about VoxHire voice interviewer and tech stack')}
            className="px-2.5 py-1 text-xs font-mono bg-cyan-950/30 hover:bg-cyan-900/40 border border-cyan-800/40 text-cyan-300 rounded transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            <span>$ai-ask &quot;VoxHire agent&quot;</span>
          </button>
        </div>
      </div>
    </section>
  );
};
