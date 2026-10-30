import React, { useState } from 'react';
import { Terminal, Cpu, Database, Compass, CheckCircle2, ArrowRight, Layers, Sliders, Server, Rocket } from 'lucide-react';
import { ProfileData } from '../types';

interface DirectivesAndVisionProps {
  profile: ProfileData;
}

const ML_PIPELINE_STEPS = [
  {
    step: '01',
    name: 'Data & Feature Engineering',
    tools: ['Pandas', 'NumPy', 'Imbalanced-Learn'],
    desc: 'Handling class imbalances with SMOTE, structured feature transformations, outlier handling, and tabular distribution analysis.',
    metric: 'Zero data leakage guarantee',
  },
  {
    step: '02',
    name: 'Model Architecture & Training',
    tools: ['Scikit-Learn', 'XGBoost', 'PyTorch'],
    desc: 'Gradient boosted decision trees, stratified k-fold cross-validation, and cost-sensitive loss functions for high-precision inference.',
    metric: 'Optimal ROC-AUC & F1-score balance',
  },
  {
    step: '03',
    name: 'Hyperparameter Tuning',
    tools: ['Optuna', 'Joblib'],
    desc: 'Bayesian optimization with tree-structured Parzen estimators (TPE) and automated trial pruning for rapid convergence.',
    metric: 'Multi-objective Pareto optimization',
  },
  {
    step: '04',
    name: 'Serving & Real-Time UX',
    tools: ['Streamlit', 'Supabase', 'Vercel', 'Node.js'],
    desc: 'Converting mathematical models into reactive web interfaces with low latency API endpoints and persistent cloud storage.',
    metric: '<150ms inference roundtrip',
  },
];

export const DirectivesAndVision: React.FC<DirectivesAndVisionProps> = ({ profile }) => {
  const [selectedPipelineStep, setSelectedPipelineStep] = useState(0);
  const [viewMode, setViewMode] = useState<'visual' | 'json'>('visual');

  const jsonSnippet = `{
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
}`;

  return (
    <section id="directives" className="py-12 border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-10">
        {/* Section Heading & View Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-cyan-400" />
              <span>Core Directives & System Vision</span>
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Bridging statistical modeling research with dependable production infrastructure.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium">
            <button
              onClick={() => setViewMode('visual')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                viewMode === 'visual'
                  ? 'bg-slate-800 text-cyan-300 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Visual Cards
            </button>
            <button
              onClick={() => setViewMode('json')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                viewMode === 'json'
                  ? 'bg-slate-800 text-cyan-300 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Terminal JSON
            </button>
          </div>
        </div>

        {/* View Mode: Visual Cards or JSON */}
        {viewMode === 'visual' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Card: Core Directives */}
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-700/80 transition-all">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-base font-semibold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-sm bg-cyan-400" />
                  <span>Core Directives</span>
                </h3>
                <span className="text-xs text-slate-500 font-mono">bangalore-node</span>
              </div>
              <ul className="mt-5 space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-semibold text-xs mt-0.5 font-mono">LOC:</span>
                  <div>
                    <span className="font-medium text-white">Location</span>
                    <p className="text-xs text-slate-400 mt-0.5">Bangalore, Karnataka, India 🇮🇳</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-semibold text-xs mt-0.5 font-mono">FOCUS:</span>
                  <div>
                    <span className="font-medium text-white">Current Focus</span>
                    <p className="text-xs text-slate-400 mt-0.5">{profile.currentFocus}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-semibold text-xs mt-0.5 font-mono">SPEC:</span>
                  <div>
                    <span className="font-medium text-white">Specialization</span>
                    <p className="text-xs text-slate-400 mt-0.5">{profile.specialization}</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right Card: Vision & Objective */}
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-700/80 transition-all">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-base font-semibold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-sm bg-indigo-400" />
                  <span>Vision & Objective</span>
                </h3>
                <span className="text-xs text-slate-500 font-mono">ml-lifecycle</span>
              </div>
              <ul className="mt-5 space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 font-semibold text-xs mt-0.5 font-mono">BUILD:</span>
                  <div>
                    <span className="font-medium text-white">Production Reliability</span>
                    <p className="text-xs text-slate-400 mt-0.5">Resilient AI-driven tools with clean UX and predictable inference.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 font-semibold text-xs mt-0.5 font-mono">EXPLORE:</span>
                  <div>
                    <span className="font-medium text-white">End-to-End ML Lifecycle</span>
                    <p className="text-xs text-slate-400 mt-0.5">Data cleaning, feature engineering, loss formulation, serving.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 font-semibold text-xs mt-0.5 font-mono">CONNECT:</span>
                  <div>
                    <span className="font-medium text-white">Applied Collaboration</span>
                    <p className="text-xs text-slate-400 mt-0.5">Open to research discussions and impactful open-source tooling.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-slate-800 bg-[#090D16] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-xs text-slate-400">profile.jsonc</span>
              </div>
              <span className="text-xs text-slate-500 font-mono">read-only</span>
            </div>
            <pre className="p-5 font-mono text-xs md:text-sm text-cyan-300 overflow-x-auto leading-relaxed">
              <code>{jsonSnippet}</code>
            </pre>
          </div>
        )}

        {/* Interactive Applied ML Lifecycle Flowchart */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Applied Machine Learning Pipeline Architecture</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Click any pipeline stage to inspect engineering decisions and frameworks.
              </p>
            </div>
            <span className="text-xs text-slate-500 font-mono">Stage {selectedPipelineStep + 1} of 4</span>
          </div>

          {/* Stepper buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {ML_PIPELINE_STEPS.map((step, idx) => (
              <button
                key={step.step}
                onClick={() => setSelectedPipelineStep(idx)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  selectedPipelineStep === idx
                    ? 'border-cyan-500/80 bg-cyan-950/20 text-white shadow-sm'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono text-cyan-400 font-semibold">{step.step}</span>
                  {selectedPipelineStep === idx && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                </div>
                <div className="text-xs font-medium truncate">{step.name}</div>
              </button>
            ))}
          </div>

          {/* Active Step Details */}
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-cyan-400 font-semibold">
                  Phase {ML_PIPELINE_STEPS[selectedPipelineStep].step}
                </span>
                <span className="text-xs text-slate-600">/</span>
                <span className="text-xs font-semibold text-white">
                  {ML_PIPELINE_STEPS[selectedPipelineStep].name}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {ML_PIPELINE_STEPS[selectedPipelineStep].desc}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] text-slate-400 font-mono">Stack:</span>
                {ML_PIPELINE_STEPS[selectedPipelineStep].tools.map((tool) => (
                  <span key={tool} className="text-xs font-mono text-slate-300">
                    {tool} ·
                  </span>
                ))}
              </div>
            </div>

            <div className="px-3.5 py-2 rounded bg-slate-900 border border-slate-800 text-right shrink-0">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Validation Target</div>
              <div className="text-xs font-medium text-cyan-300 mt-0.5">
                {ML_PIPELINE_STEPS[selectedPipelineStep].metric}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
