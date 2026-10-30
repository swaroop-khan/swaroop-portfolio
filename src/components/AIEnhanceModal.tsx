import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, RefreshCw, X, Lightbulb } from 'lucide-react';
import { ProfileData } from '../types';

interface AIEnhanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onApplyPhilosophy: (newPhilosophy: string) => void;
  onApplyTaglines: (newTaglines: string[]) => void;
  onApplyFocus: (newFocus: string, newSpec: string) => void;
}

export const AIEnhanceModal: React.FC<AIEnhanceModalProps> = ({
  isOpen,
  onClose,
  profile,
  onApplyPhilosophy,
  onApplyTaglines,
  onApplyFocus,
}) => {
  const [activeMode, setActiveMode] = useState<'philosophy' | 'taglines' | 'focus'>('philosophy');
  const [isGenerating, setIsGenerating] = useState(false);

  // Suggestions state
  const [suggestedPhilosophy, setSuggestedPhilosophy] = useState<string>(
    'Synthesizing deep mathematical formulations with production-grade engineering to deliver resilient, scalable machine learning systems and autonomous agentic workflows.'
  );

  const [suggestedTaglines, setSuggestedTaglines] = useState<string[]>([
    'Applied AI & Machine Learning Systems Architect',
    'From Loss Optimization to Scalable Microservices',
    'Bayesian Hyperparameter Tuning & High-Throughput Inference',
    'Bridging Mathematical Theory with Resilient Deployments'
  ]);

  const [suggestedFocus, setSuggestedFocus] = useState({
    focus: 'Agentic ML Architectures, Distributed Training Pipelines & Production Vector Backends',
    specialization: 'Bayesian Optimization (Optuna), Gradient Boosted Trees & High-Precision Inferencing'
  });

  const [appliedCategory, setAppliedCategory] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: activeMode,
          developerName: profile.developerName,
          role: profile.role,
          currentPhilosophy: profile.philosophy,
          currentFocus: profile.currentFocus,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (activeMode === 'philosophy' && data.philosophy) {
          setSuggestedPhilosophy(data.philosophy);
        } else if (activeMode === 'taglines' && Array.isArray(data.taglines)) {
          setSuggestedTaglines(data.taglines);
        } else if (activeMode === 'focus' && data.focus) {
          setSuggestedFocus({ focus: data.focus, specialization: data.specialization });
        }
      } else {
        // Fallback intelligent variations
        if (activeMode === 'philosophy') {
          setSuggestedPhilosophy(
            'Engineering high-precision machine learning backends that translate mathematical algorithms into fault-tolerant, low-latency production applications.'
          );
        } else if (activeMode === 'taglines') {
          setSuggestedTaglines([
            'Architecting Intelligent Systems & Agentic Workflows',
            'Full Stack Applied AI & Machine Learning Engineering',
            'Precision Model Tuning & Low-Latency API Serving',
            'Bridging Notebook Research with Scalable Cloud Deployments'
          ]);
        }
      }
    } catch {
      // Local fallback on error
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApply = () => {
    if (activeMode === 'philosophy') {
      onApplyPhilosophy(suggestedPhilosophy);
      setAppliedCategory('philosophy');
    } else if (activeMode === 'taglines') {
      onApplyTaglines(suggestedTaglines);
      setAppliedCategory('taglines');
    } else if (activeMode === 'focus') {
      onApplyFocus(suggestedFocus.focus, suggestedFocus.specialization);
      setAppliedCategory('focus');
    }

    setTimeout(() => {
      setAppliedCategory(null);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-800/80 text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">AI Profile Enhancer</h3>
              <p className="text-xs text-slate-400">
                Calibrate Swaroop&apos;s copy for senior Applied AI & ML system engineering standards.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-lg text-xs">
          <button
            onClick={() => setActiveMode('philosophy')}
            className={`flex-1 py-1.5 rounded-md transition-colors ${
              activeMode === 'philosophy' ? 'bg-slate-800 text-cyan-300 font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Engineering Philosophy
          </button>
          <button
            onClick={() => setActiveMode('taglines')}
            className={`flex-1 py-1.5 rounded-md transition-colors ${
              activeMode === 'taglines' ? 'bg-slate-800 text-cyan-300 font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Typing Taglines
          </button>
          <button
            onClick={() => setActiveMode('focus')}
            className={`flex-1 py-1.5 rounded-md transition-colors ${
              activeMode === 'focus' ? 'bg-slate-800 text-cyan-300 font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Focus & Directives
          </button>
        </div>

        {/* Suggestion Box */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-400 font-mono">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Recommended Formulation</span>
            </span>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>Regenerate</span>
            </button>
          </div>

          {activeMode === 'philosophy' && (
            <p className="text-sm text-slate-200 italic leading-relaxed">
              &ldquo;{suggestedPhilosophy}&rdquo;
            </p>
          )}

          {activeMode === 'taglines' && (
            <ul className="space-y-1.5 text-xs text-slate-200 font-mono">
              {suggestedTaglines.map((t, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-cyan-400">{idx + 1}.</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          )}

          {activeMode === 'focus' && (
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-500 font-mono">Focus:</span>
                <p className="text-slate-200 mt-0.5">{suggestedFocus.focus}</p>
              </div>
              <div>
                <span className="text-slate-500 font-mono">Specialization:</span>
                <p className="text-slate-200 mt-0.5">{suggestedFocus.specialization}</p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] text-slate-500">
            Powered by Google Gemini 3.8 Flash
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={appliedCategory !== null}
              className="px-4 py-1.5 text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {appliedCategory ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              <span>{appliedCategory ? 'Applied!' : 'Apply to Profile'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
