import React, { useState } from 'react';
import { Terminal, Cpu, Database, Compass, CheckCircle2, Layers, Sliders, Server, Rocket } from 'lucide-react';
import { ProfileData } from '../types';

interface DirectivesAndVisionProps {
  profile: ProfileData;
}

const ML_PIPELINE_STEPS = [
  {
    step: '01',
    name: 'Data Engineering & Resampling',
    tools: ['Pandas', 'NumPy', 'Imbalanced-Learn (SMOTE)'],
    desc: 'Handling class imbalances in subscriber and behavioral datasets using SMOTE, structured feature transformations, and distribution audits.',
    metric: 'Zero data leakage across folds',
  },
  {
    step: '02',
    name: 'Model Selection & Training',
    tools: ['Scikit-Learn', 'XGBoost', 'Gradient Boosting'],
    desc: 'Gradient boosted decision trees, stratified k-fold cross-validation, and cost-sensitive loss formulations for high-precision inference.',
    metric: 'Optimal ROC-AUC / F1 balance',
  },
  {
    step: '03',
    name: 'Bayesian Hyperparameter Tuning',
    tools: ['Optuna', 'Joblib'],
    desc: 'Tree-structured Parzen Estimator (TPE) Bayesian search, automated trial pruning, and parallel multi-core parameter sweeps.',
    metric: 'Pareto objective convergence',
  },
  {
    step: '04',
    name: 'Serving & Real-Time UX',
    tools: ['Streamlit', 'AssemblyAI', 'Supabase', 'Vercel'],
    desc: 'Packaging predictive pipelines into reactive web interfaces (Streamlit churn dashboard, VoxHire conversational voice agent, and REST endpoints).',
    metric: '<150ms inference latency',
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
    <section id="directives" className="py-14 border-t border-indigo-950/40 relative">
      <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-8">
        {/* Section Heading & View Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-indigo-950/60">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Core Directives</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mt-1 flex items-center gap-2.5">
              <span>Directives & System Vision</span>
            </h2>
            <p className="mt-1.5 text-sm text-slate-300">
              Transforming statistical formulations and research notebooks into robust, production-grade software architectures.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-[#090D1C] border border-indigo-950/80 rounded-lg text-xs font-mono">
            <button
              onClick={() => setViewMode('visual')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'visual'
                  ? 'bg-indigo-600/30 text-cyan-300 border border-indigo-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Visual Cards
            </button>
            <button
              onClick={() => setViewMode('json')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'json'
                  ? 'bg-indigo-600/30 text-cyan-300 border border-indigo-500/40 shadow-sm'
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
            <div className="p-6 rounded-xl border border-indigo-950/80 bg-[#080C1B]/80 hover:border-cyan-500/30 transition-all shadow-lg shadow-black/30">
              <div className="flex items-center justify-between pb-4 border-b border-indigo-950/60">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-sm bg-cyan-400" />
                  <span>Core Directives</span>
                </h3>
                <span className="text-xs text-cyan-400/80 font-mono">sys://bangalore-node</span>
              </div>
              <ul className="mt-5 space-y-4 text-xs font-mono text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold shrink-0">LOC:</span>
                  <div>
                    <span className="font-semibold text-white">Location</span>
                    <p className="text-slate-400 mt-0.5 font-sans">Bangalore, Karnataka, India 🇮🇳</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold shrink-0">FOCUS:</span>
                  <div>
                    <span className="font-semibold text-white">Current Focus</span>
                    <p className="text-slate-400 mt-0.5 font-sans">{profile.currentFocus}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold shrink-0">SPEC:</span>
                  <div>
                    <span className="font-semibold text-white">Specialization</span>
                    <p className="text-slate-400 mt-0.5 font-sans">{profile.specialization}</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right Card: Vision & Objective */}
            <div className="p-6 rounded-xl border border-indigo-950/80 bg-[#080C1B]/80 hover:border-indigo-500/40 transition-all shadow-lg shadow-black/30">
              <div className="flex items-center justify-between pb-4 border-b border-indigo-950/60">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-sm bg-purple-400" />
                  <span>Vision & Objective</span>
                </h3>
                <span className="text-xs text-purple-400/80 font-mono">sys://applied-vision</span>
              </div>
              <ul className="mt-5 space-y-4 text-xs font-mono text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 font-bold shrink-0">BUILD:</span>
                  <div>
                    <span className="font-semibold text-white">Production Reliability</span>
                    <p className="text-slate-400 mt-0.5 font-sans">Resilient AI-driven tools with clean UX and predictable inference.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 font-bold shrink-0">EXPLORE:</span>
                  <div>
                    <span className="font-semibold text-white">End-to-End ML Lifecycle</span>
                    <p className="text-slate-400 mt-0.5 font-sans">Data cleaning, feature engineering, loss formulation, serving.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 font-bold shrink-0">CONNECT:</span>
                  <div>
                    <span className="font-semibold text-white">Applied Collaboration</span>
                    <p className="text-slate-400 mt-0.5 font-sans">Open to research discussions and impactful open-source tooling.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-indigo-500/25 bg-[#050711] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#080C1B] border-b border-indigo-950/70">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]/80" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/80" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]/80" />
                <span className="ml-2 font-mono text-xs text-slate-400">profile.jsonc</span>
              </div>
              <span className="text-xs text-cyan-400 font-mono">read-only</span>
            </div>
            <pre className="p-5 font-mono text-xs md:text-sm text-cyan-300 overflow-x-auto leading-relaxed">
              <code>{jsonSnippet}</code>
            </pre>
          </div>
        )}

        {/* Applied Machine Learning Pipeline Architecture */}
        <div className="rounded-xl border border-indigo-950/80 bg-[#080C1B]/80 p-5 md:p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-indigo-950/50">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Applied Machine Learning Pipeline Architecture</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Inspect technical choices and tooling across Swaroop&apos;s end-to-end ML workflow.
              </p>
            </div>
            <span className="text-xs text-cyan-400 font-mono">Stage 0{selectedPipelineStep + 1} / 04</span>
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
                    : 'border-indigo-950/70 bg-[#050711] text-slate-400 hover:text-slate-200 hover:border-indigo-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono text-cyan-400 font-semibold">{step.step}</span>
                  {selectedPipelineStep === idx && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                </div>
                <div className="text-xs font-semibold truncate">{step.name}</div>
              </button>
            ))}
          </div>

          {/* Active Step Details */}
          <div className="p-4 rounded-lg bg-[#050711] border border-indigo-950/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2 font-mono">
                <span className="text-xs text-cyan-400 font-semibold">
                  Phase {ML_PIPELINE_STEPS[selectedPipelineStep].step}
                </span>
                <span className="text-slate-600">/</span>
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

            <div className="px-4 py-2.5 rounded bg-[#080C1B] border border-indigo-950/80 text-right shrink-0">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">Target Validation</div>
              <div className="text-xs font-semibold text-cyan-300 mt-0.5 font-mono">
                {ML_PIPELINE_STEPS[selectedPipelineStep].metric}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
